import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Remove 'standalone' output for development - only use for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
};

export default nextConfig;
