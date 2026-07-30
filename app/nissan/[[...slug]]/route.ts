import { NextRequest } from "next/server";
import path from "node:path";
import { serveGatedSite } from "@/lib/gated-static";

// Real (confidential) customer build. Password from env; FAIL CLOSED -
// no env var set means no password, which means nobody gets in, ever.
const USER = process.env.NISSAN_SITE_USER || "nissan";
const PASS = process.env.NISSAN_SITE_PASSWORD;
const CONTENT_ROOT = path.join(process.cwd(), "gated-content", "nissan");

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug?: string[] }> }) {
  if (!PASS) {
    return new Response("Access control is not configured.", {
      status: 503,
      headers: { "cache-control": "no-store" },
    });
  }
  const { slug } = await ctx.params;
  return serveGatedSite(req, slug, {
    contentRoot: CONTENT_ROOT,
    user: USER,
    pass: PASS,
    realm: 'Basic realm="CivOps restricted (Nissan)", charset="UTF-8"',
  });
}
