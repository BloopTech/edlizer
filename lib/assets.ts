/**
 * Central asset registry for Edlizer Beauty.
 * Import image references from here instead of hardcoding URLs/paths across components,
 * so hero art, brand imagery, and fallback product photos stay easy to swap in one place.
 */

export const siteAssets = {
  hero: {
    // Local override: drop the campaign photo at public/assets/hero/hero-model.jpg to use it.
    mainImage: "/assets/hero/hero-model.jpg",
  },
  brand: {
    logoMark: "/assets/brand/edlizer-logo.png",
    logoWordmark: "/assets/brand/edlizer-wordmark.png",
  },
} as const;

export type SiteAssets = typeof siteAssets;
