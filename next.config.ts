import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/nissan", destination: "/nissan/index.html" },
      { source: "/nissan/", destination: "/nissan/index.html" },
    ];
  },
};

export default nextConfig;
