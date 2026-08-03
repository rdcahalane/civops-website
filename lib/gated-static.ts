import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

// Serves a folder of static files from OUTSIDE /public, with Basic Auth
// checked on every single request inside the same function.
//
// Why not /public + middleware: Vercel's edge/CDN treats anything under
// /public as a cacheable static asset regardless of what Cache-Control
// header the app sets at runtime. In practice that meant one successful
// login got cached and served to every next visitor with NO credentials
// at all. Serving everything through a dynamic route handler (reading
// from a directory that isn't /public) means there is no static asset
// for the CDN to have captured in the first place - every request runs
// this function, every time.

export type GatedSiteConfig = {
  contentRoot: string; // absolute path to the private content directory
  user: string;
  pass: string;
  realm: string;
};

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".pdf": "application/pdf",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function isAuthorized(req: NextRequest, cfg: GatedSiteConfig): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const [scheme, encoded] = auth.split(" ");
  if (scheme !== "Basic" || !encoded) return false;
  const decoded = atob(encoded);
  const sep = decoded.indexOf(":");
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);
  return user === cfg.user && pass === cfg.pass;
}

function unauthorized(realm: string): NextResponse {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": realm, "cache-control": "private, no-store" },
  });
}

async function resolveFile(contentRoot: string, slugPath: string): Promise<string | null> {
  const normalized = path.normalize(slugPath).replace(/^(\.\.[/\\])+/, "");
  let candidate = path.join(contentRoot, normalized);
  if (!candidate.startsWith(contentRoot)) return null;

  try {
    const s = await stat(candidate);
    if (s.isDirectory()) {
      candidate = path.join(candidate, "index.html");
      await stat(candidate);
    }
    return candidate;
  } catch {
    // If no file extension, try appending .html (e.g. /nissan/fascia → fascia.html)
    if (!path.extname(normalized)) {
      try {
        const htmlCandidate = candidate + ".html";
        await stat(htmlCandidate);
        return htmlCandidate;
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function serveGatedSite(req: NextRequest, slugParts: string[] | undefined, cfg: GatedSiteConfig): Promise<NextResponse> {
  if (!isAuthorized(req, cfg)) return unauthorized(cfg.realm);

  const slugPath = !slugParts || slugParts.length === 0 ? "/index.html" : "/" + slugParts.join("/");
  const filePath = await resolveFile(cfg.contentRoot, slugPath);
  if (!filePath) {
    return new NextResponse("Not found.", {
      status: 404,
      headers: { "cache-control": "private, no-store" },
    });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";
  const data = await readFile(filePath);

  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "content-type": contentType,
      "cache-control": "private, no-store",
    },
  });
}
