import { NextRequest } from "next/server";
import path from "node:path";
import { serveGatedSite } from "@/lib/gated-static";

// Anonymized public example. Password from env with a demo fallback.
const USER = process.env.AUTOEXAMPLE_SITE_USER || "demo";
const PASS = process.env.AUTOEXAMPLE_SITE_PASSWORD || "2026Password!";
const CONTENT_ROOT = path.join(process.cwd(), "gated-content", "autoexample");

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await ctx.params;
  return serveGatedSite(req, slug, {
    contentRoot: CONTENT_ROOT,
    user: USER,
    pass: PASS,
    realm: 'Basic realm="CivOps restricted (Example)", charset="UTF-8"',
  });
}
