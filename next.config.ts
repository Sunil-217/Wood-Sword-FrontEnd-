import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oneupsports.in",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  experimental: {
    // Enables React's <ViewTransition> during route navigation, used for the
    // product card → product page shared-element morph.
    viewTransition: true,
  },
};

export default nextConfig;
