import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during build - run it separately with npm run lint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
