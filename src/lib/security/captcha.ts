/**
 * Cloudflare Turnstile / CAPTCHA verification
 */

export async function verifyCaptcha(token?: string | null, clientIp?: string): Promise<{ success: boolean; message?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If no secret key is set, CAPTCHA verification is optional/skipped (e.g., local dev)
  if (!secretKey) {
    return { success: true };
  }

  if (!token) {
    return { success: false, message: "CAPTCHA token is required." };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (clientIp) {
      formData.append("remoteip", clientIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      return { success: true };
    } else {
      return { success: false, message: "CAPTCHA validation failed. Please try again." };
    }
  } catch (err: any) {
    console.error("CAPTCHA verification error:", err);
    return { success: false, message: "Error verifying security challenge." };
  }
}

