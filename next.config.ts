import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — Wix managed hosting serves the `out` directory.
  output: "export",
  images: {
    // Static export can't run the default optimizer server-side, so we use a
    // custom loader that leans on Unsplash's on-the-fly resizing to emit a
    // real responsive srcset (phones fetch phone-sized images). Local static
    // assets pass through unchanged.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
