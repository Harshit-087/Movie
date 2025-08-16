import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'image.tmdb.org',
    },
  ],
},  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },

};

export default nextConfig;
