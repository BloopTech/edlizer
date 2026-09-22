/**
 * Central asset registry for Edlizer Beauty.
 * Import image references from here instead of hardcoding URLs/paths across components,
 * so hero art, brand imagery, and fallback product photos stay easy to swap in one place.
 *
 * Note: these are the real supplied brand/campaign files in `public/assets/` — they are the
 * canonical Edlizer artwork and must not be substituted with generated stand-ins.
 */

export const siteAssets = {
  hero: {
    // Supplied campaign photographs, in slider order.
    mainImage: "/assets/hero/hero-model.jpg",
    mainImageWidth: 1709,
    mainImageHeight: 2560,
    afroGlow: "/assets/hero/hero-afro-glow.jpg",
    goldCouture: "/assets/hero/hero-gold-couture.jpg",
  },
  brand: {
    // Supplied Edlizer Beauty wordmark lockups (mark + "EDLIZER BEAUTY").
    logoGold: "/assets/brand/edlizer-logo-gold.png",
    logoWhite: "/assets/brand/edlizer-logo-white.png",
    // Shared display ratio so the gold/white lockups crossfade without shifting.
    logoAspectRatio: 4.25,
  },
} as const;

export type SiteAssets = typeof siteAssets;
