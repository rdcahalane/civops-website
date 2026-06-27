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
      {
        source: "/nissan",
        destination: "/nissan/index.html",
      },
      {
        source: "/nissan/",
        destination: "/nissan/index.html",
      },
      {
        source: "/nissan/:slug",
        destination: "/nissan/:slug.html",
      },
    ];
  },
};

export default nextConfig;
