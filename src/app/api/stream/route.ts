import { NextRequest, NextResponse } from "next/server";
import { streamQueue } from "@/lib/security/queue";
import { sanitizeFilename } from "@/lib/utils";
import { Readable } from "stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Audio Streaming Proxy (Zero Disk Storage)
 * Directly pipes audio stream chunks from remote provider to the client.
 */
export async function GET(req: NextRequest) {
  // Concurrency slot check
  if (!streamQueue.tryAcquire()) {
    return NextResponse.json(
      {
        error: "Server download queue is currently full. Please try again in a few moments.",
      },
      { status: 429 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const trackId = searchParams.get("trackId");
    const isMock = searchParams.get("mock") === "true";
    const filename = sanitizeFilename(searchParams.get("title") || `track-${trackId || "audio"}`) + ".mp3";

    if (!trackId && !isMock) {
      streamQueue.release();
      return NextResponse.json({ error: "Missing track ID parameter" }, { status: 400 });
    }

    // If mock mode or demo track is requested, generate a clean audio sample stream
    if (isMock || trackId === "1001" || trackId === "1002" || trackId === "1004" || trackId === "888123456") {
      // Use a public domain copyright-free audio stream sample for instant testing
      const sampleAudioUrl = "https://actions.google.com/sounds/v1/ambiences/outdoor_ambience.ogg";
      
      const upstreamRes = await fetch(sampleAudioUrl);
      if (!upstreamRes.ok || !upstreamRes.body) {
        streamQueue.release();
        return NextResponse.json({ error: "Could not retrieve audio sample stream" }, { status: 502 });
      }

      // Convert Web ReadableStream with cleanup on close
      const webStream = new ReadableStream({
        async start(controller) {
          const reader = upstreamRes.body!.getReader();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              controller.enqueue(value);
            }
            controller.close();
          } catch (err) {
            controller.error(err);
          } finally {
            streamQueue.release();
          }
        },
        cancel() {
          streamQueue.release();
        },
      });

      return new NextResponse(webStream, {
        status: 200,
        headers: {
          "Content-Type": "audio/mpeg",
          "Content-Disposition": `attachment; filename="${filename}"`,
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      });
    }

    // For live SoundCloud track with official client credentials
    const clientId = process.env.SOUNDCLOUD_CLIENT_ID;
    if (!clientId) {
      streamQueue.release();
      return NextResponse.json(
        { error: "SoundCloud credentials are required for live audio fetching." },
        { status: 500 }
      );
    }

    // Query SoundCloud official track endpoint to get stream URL
    const trackApiUrl = `https://api.soundcloud.com/tracks/${trackId}?client_id=${clientId}`;
    const trackMetaRes = await fetch(trackApiUrl);
    
    if (!trackMetaRes.ok) {
      streamQueue.release();
      return NextResponse.json({ error: "Failed to fetch track from SoundCloud" }, { status: trackMetaRes.status });
    }

    const trackMeta = await trackMetaRes.json();
    
    // Strict compliance check: only proceed if downloadable or streamable
    if (!trackMeta.downloadable && !trackMeta.streamable) {
      streamQueue.release();
      return NextResponse.json({ error: "Downloads are disabled for this track by the artist" }, { status: 403 });
    }

    let audioUrl = trackMeta.download_url;
    if (audioUrl) {
      audioUrl = `${audioUrl}?client_id=${clientId}`;
    } else {
      // Find progressive audio stream transcoding
      const transcodings = trackMeta.media?.transcodings || [];
      const progressive = transcodings.find((t: any) => t.format?.protocol === "progressive");
      if (progressive?.url) {
        const streamLinkRes = await fetch(`${progressive.url}?client_id=${clientId}`);
        if (streamLinkRes.ok) {
          const streamLinkJson = await streamLinkRes.json();
          audioUrl = streamLinkJson.url;
        }
      }
    }

    if (!audioUrl) {
      streamQueue.release();
      return NextResponse.json({ error: "No direct audio stream found" }, { status: 404 });
    }

    // Stream from source with zero disk storage
    const audioRes = await fetch(audioUrl);
    if (!audioRes.ok || !audioRes.body) {
      streamQueue.release();
      return NextResponse.json({ error: "Failed to stream audio from origin" }, { status: 502 });
    }

    const webStream = new ReadableStream({
      async start(controller) {
        const reader = audioRes.body!.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        } finally {
          streamQueue.release();
        }
      },
      cancel() {
        streamQueue.release();
      },
    });

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err: any) {
    streamQueue.release();
    console.error("Audio stream error:", err);
    return NextResponse.json({ error: "Streaming error occurred" }, { status: 500 });
  }
}
