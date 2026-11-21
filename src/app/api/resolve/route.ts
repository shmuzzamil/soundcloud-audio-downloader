import { NextRequest, NextResponse } from "next/server";
import { parseSoundCloudUrl } from "@/lib/soundcloud/regex";
import { resolveSoundCloudUrl } from "@/lib/soundcloud/client";
import { checkRateLimit } from "@/lib/security/ratelimit";
import { verifyCaptcha } from "@/lib/security/captcha";
import { ResolveApiResponse } from "@/types/soundcloud";

export const runtime = "nodejs";

export async function POST(req: NextRequest): Promise<NextResponse<ResolveApiResponse>> {
  try {
    // 1. Client IP & Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          code: "RATE_LIMITED",
          message: "Too many requests. Please wait a few seconds before trying again.",
          details: `Rate limit exceeded. Try again in ${Math.ceil(rateLimit.resetMs / 1000)}s.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil(rateLimit.resetMs / 1000).toString(),
          },
        }
      );
    }

    // 2. Parse Request Body
    const body = await req.json().catch(() => ({}));
    const { url, captchaToken } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_URL",
          message: "Please provide a valid SoundCloud URL.",
        },
        { status: 400 }
      );
    }

    // 3. CAPTCHA Verification (Optional / Turnstile)
    const captchaResult = await verifyCaptcha(captchaToken, clientIp);
    if (!captchaResult.success) {
      return NextResponse.json(
        {
          success: false,
          code: "CAPTCHA_FAILED",
          message: captchaResult.message || "CAPTCHA verification failed.",
        },
        { status: 400 }
      );
    }

    // 4. URL Validation & Cleaning
    const parsed = parseSoundCloudUrl(url);
    if (!parsed.isValid) {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_URL",
          message: "Invalid SoundCloud URL format. Please enter a valid track or playlist link.",
        },
        { status: 400 }
      );
    }

    // 5. Resolve via SoundCloud API Client
    const result = await resolveSoundCloudUrl(parsed.cleanUrl);

    if (!result.success) {
      const statusCode =
        result.code === "NOT_FOUND"
          ? 404
          : result.code === "PRIVATE_RESOURCE" || result.code === "GEO_BLOCKED"
          ? 403
          : 500;

      return NextResponse.json(
        {
          success: false,
          code: result.code,
          message: result.message,
        },
        { status: statusCode }
      );
    }

    // 6. Return Normalized Track or Playlist Data
    return NextResponse.json({
      success: true,
      kind: result.kind,
      data: result.data,
    });
  } catch (error: any) {
    console.error("Resolve route exception:", error);
    return NextResponse.json(
      {
        success: false,
        code: "API_ERROR",
        message: "An internal server error occurred while processing the request.",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}

