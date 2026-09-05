import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables React's <ViewTransition> during route navigation, used for the
    // product card → product page shared-element morph.
    viewTransition: true,
  },
};

export default nextConfig;
