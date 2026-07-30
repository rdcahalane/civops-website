import { NextRequest } from "next/server";
import path from "node:path";
import { serveGatedSite } from "@/lib/gated-static";

// Brooksource x CESMII pitch + engagement toolkit. Shared demo password.
const USER = process.env.HACKATHON_KAIZEN_SITE_USER || "Kaizen";
const PASS = process.env.HACKATHON_KAIZEN_SITE_PASSWORD || "BSHackathon";
const CONTENT_ROOT = path.join(process.cwd(), "gated-content", "hackathon-kaizen");

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await ctx.params;
  return serveGatedSite(req, slug, {
    contentRoot: CONTENT_ROOT,
    user: USER,
    pass: PASS,
    realm: 'Basic realm="CivOps restricted (Hackathon Kaizen)", charset="UTF-8"',
  });
}
