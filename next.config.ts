import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires quality values to be allowlisted; 90 is used for the
    // full-bleed campaign photograph so skin texture stays crisp.
    qualities: [75, 90],
    remotePatterns: [
      {
        // Product photography served from Sanity's asset CDN. Without this,
        // every next/image using a Sanity URL throws at render.
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
