import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/example",
        destination: "/example/index.html",
      },
      {
        source: "/example/:slug",
        destination: "/example/:slug.html",
      },
      // /nissan, /autoexample, /hackathon-kaizen, /axiomhackathon-kaizen are
      // handled entirely by their own app/<name>/[[...slug]]/route.ts - no
      // rewrite needed, and none of that content lives under /public.
    ];
  },
};

export default nextConfig;
