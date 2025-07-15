import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Use standalone output for production builds (Docker)
  output: 'standalone',
};

export default nextConfig;
