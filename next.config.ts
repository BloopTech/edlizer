import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires quality values to be allowlisted; 90 is used for the
    // full-bleed campaign photograph so skin texture stays crisp.
    qualities: [75, 90],
  },
};

export default nextConfig;
