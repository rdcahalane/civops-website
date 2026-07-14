import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Gate the conceptual demo sites behind shared passwords.
// - /nissan       : real (confidential) customer build. Password from env; FAIL CLOSED.
// - /autoexample  : anonymized public example. Password from env with a demo fallback.
export const config = {
  matcher: ["/nissan", "/nissan/:path*", "/autoexample", "/autoexample/:path*"],
};

type Gate = { user: string; pass: string | undefined; realm: string };

function gateFor(path: string): Gate {
  if (path === "/autoexample" || path.startsWith("/autoexample/")) {
    return {
      user: process.env.AUTOEXAMPLE_SITE_USER || "demo",
      // Shareable anonymized example: env override, else the demo default.
      pass: process.env.AUTOEXAMPLE_SITE_PASSWORD || "2026Password!",
      realm: 'Basic realm="CivOps restricted (Example)", charset="UTF-8"',
    };
  }
  // Default: the confidential Nissan build. No password env -> block (never leak).
  return {
    user: process.env.NISSAN_SITE_USER || "nissan",
    pass: process.env.NISSAN_SITE_PASSWORD,
    realm: 'Basic realm="CivOps restricted (Nissan)", charset="UTF-8"',
  };
}

export function middleware(req: NextRequest) {
  const gate = gateFor(req.nextUrl.pathname);

  // No password configured -> block rather than serve unprotected.
  if (!gate.pass) {
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
      if (user === gate.user && pass === gate.pass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": gate.realm, "cache-control": "no-store" },
  });
}
