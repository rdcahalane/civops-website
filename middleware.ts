import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate the Nissan conceptual demo behind a shared password.
// Password is supplied via env vars on Vercel (NISSAN_SITE_USER / NISSAN_SITE_PASSWORD).
// Fail closed: if no password is configured, block access rather than leak content.
export const config = {
  matcher: ["/nissan", "/nissan/:path*"],
};

const REALM = 'Basic realm="CivOps restricted (Nissan)", charset="UTF-8"';

export function middleware(req: NextRequest) {
  const expectedUser = process.env.NISSAN_SITE_USER || "nissan";
  const expectedPass = process.env.NISSAN_SITE_PASSWORD;

  // No password configured → fail closed so nothing is ever served unprotected.
  if (!expectedPass) {
    return new NextResponse("Access control is not configured.", {
      status: 503,
      headers: { "cache-control": "no-store" },
    });
  }

  const auth = req.headers.get("authorization");
  if (auth) {
    const [scheme, encoded] = auth.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const sep = decoded.indexOf(":");
      const user = decoded.slice(0, sep);
      const pass = decoded.slice(sep + 1);
      if (user === expectedUser && pass === expectedPass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": REALM, "cache-control": "no-store" },
  });
}
