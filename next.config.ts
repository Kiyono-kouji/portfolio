import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF then WebP to compatible browsers — typically 50-70% smaller than PNG
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
