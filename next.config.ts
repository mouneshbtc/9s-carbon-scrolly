import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  turbopack: {
    root: path.resolve(__dirname),
  },
  devIndicators: false,
};

export default nextConfig;
