import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — Wix managed hosting serves the `out` directory.
  output: "export",
  images: {
    // The default image-optimization loader needs a server; not available
    // in a static export.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
