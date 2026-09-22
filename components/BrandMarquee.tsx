"use client";

import React from "react";

export interface Brand {
  name: string;
  tag: string;
  origin: string;
  /**
   * Drop the supplied logo file at this path and it replaces the wordmark
   * automatically — no code change needed. Transparent PNG or SVG works best;
   * the marquee normalises every logo to a 34px cap height.
   */
  logo?: string;
}

export const brandsList: Brand[] = [
  { name: "Fenty Beauty", tag: "Rihanna's Complexion Genius", origin: "USA", logo: "/assets/brands/fenty-beauty.svg" },
  { name: "Lancôme", tag: "Parisian High Luxury", origin: "France", logo: "/assets/brands/lancome.svg" },
  { name: "NARS", tag: "Radiant Skin Authority", origin: "USA", logo: "/assets/brands/nars.svg" },
  { name: "MAC Cosmetics", tag: "Artistry Standards", origin: "Canada", logo: "/assets/brands/mac-cosmetics.svg" },
  { name: "L'Oréal Paris", tag: "Global Beauty Pioneer", origin: "France", logo: "/assets/brands/loreal-paris.svg" },
  { name: "Garnier", tag: "Botanical Micellar & Care", origin: "France", logo: "/assets/brands/garnier.svg" },
  { name: "Morphe", tag: "Pro Brushes & Mist Tech", origin: "USA", logo: "/assets/brands/morphe.svg" },
  { name: "Sephora Collection", tag: "Trendsetting Formulas", origin: "France", logo: "/assets/brands/sephora.jpeg" },
  // No usable logo file yet — these render as Boska wordmarks until one lands
  // at the path named in public/assets/brands/README.md. The supplied Maybelline
  // SVG was a 6,091-path auto-trace (772KB) that turned to noise at marquee size.
  { name: "Maybelline", tag: "Everyday Icon", origin: "USA" },
  { name: "Good Molecules", tag: "Clinical Bio-Actives", origin: "USA" },
  { name: "NYX Professional", tag: "Vibrant Color Artistry", origin: "USA" },

];

const BrandItem: React.FC<{ brand: Brand; duplicate?: boolean }> = ({
  brand,
  duplicate,
}) => {
  const [logoFailed, setLogoFailed] = React.useState(false);
  const showLogo = Boolean(brand.logo) && !logoFailed;

  return (
    <div
      // The duplicated half of the track is decorative — it exists only so the
      // loop can be seamless, so it stays out of the accessibility tree.
      aria-hidden={duplicate}
      className="group shrink-0 flex items-center justify-center h-[72px] px-8 sm:px-11"
      title={`${brand.name} — ${brand.tag}`}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element -- vector logo, nothing for the optimiser to do
        <img
          src={brand.logo}
          alt={duplicate ? "" : brand.name}
          loading="lazy"
          decoding="async"
          onError={() => setLogoFailed(true)}
          className="h-[30px] sm:h-[34px] w-auto max-w-[150px] sm:max-w-[170px] object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span className="font-display text-xl sm:text-2xl whitespace-nowrap text-[#171512]/45 transition-colors duration-500 group-hover:text-[#C58E2A]">
          {brand.name}
        </span>
      )}
    </div>
  );
};

export const BrandMarquee: React.FC = () => {
  // Two identical copies: the track slides exactly one copy's width and loops.
  const track = [...brandsList, ...brandsList];

  return (
    <section
      id="brands"
      className="py-16 sm:py-20 bg-white border-b border-[#e6e0d3]/70 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center">
        <div className="rs-eyebrow rs-eyebrow-gold justify-center text-[#C58E2A] mb-3">
          Global Prestige Sourcing
        </div>
        <h3 className="font-display text-3xl sm:text-4xl font-normal text-[#171512]">
          Brands We Source From
        </h3>
        <p className="text-sm text-[#6f6a60] max-w-xl mx-auto mt-3 font-light leading-relaxed">
          We source authentic cosmetics directly from renowned international
          brands. 100% genuine formulation guarantee.
        </p>
      </div>

      <div className="brand-marquee brand-marquee-mask relative w-full">
        <div
          className="brand-marquee-track flex w-max items-center"
          style={{ ["--marquee-duration" as string]: "52s" }}
        >
          {track.map((brand, i) => (
            <BrandItem
              key={`${brand.name}-${i}`}
              brand={brand}
              duplicate={i >= brandsList.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
