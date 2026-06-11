import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Gzip/Brotli compression on all responses
  compress: true,
  // Remove the X-Powered-By: Next.js header — minor security + payload improvement
  poweredByHeader: false,
  images: {
    // Serve AVIF then WebP to compatible browsers — typically 50-70% smaller than PNG
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
