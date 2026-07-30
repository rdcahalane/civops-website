import { NextRequest } from "next/server";
import path from "node:path";
import { serveGatedSite } from "@/lib/gated-static";

// Axiom x CESMII mirror of the same. Shared demo password.
const USER = process.env.AXIOM_HACKATHON_KAIZEN_SITE_USER || "Kaizen";
const PASS = process.env.AXIOM_HACKATHON_KAIZEN_SITE_PASSWORD || "AxiomHackathon";
const CONTENT_ROOT = path.join(process.cwd(), "gated-content", "axiomhackathon-kaizen");

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await ctx.params;
  return serveGatedSite(req, slug, {
    contentRoot: CONTENT_ROOT,
    user: USER,
    pass: PASS,
    realm: 'Basic realm="CivOps restricted (Axiom Hackathon Kaizen)", charset="UTF-8"',
  });
}
