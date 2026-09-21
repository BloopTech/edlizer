"use client";

import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

export const brandsList = [
  { name: "Fenty Beauty", tag: "Rihanna's Complexion Genius", origin: "USA" },
  { name: "Lancôme", tag: "Parisian High Luxury", origin: "France" },
  { name: "NARS", tag: "Radiant Skin Authority", origin: "USA" },
  { name: "MAC Cosmetics", tag: "Artistry Standards", origin: "Canada" },
  { name: "Good Molecules", tag: "Clinical Bio-Actives", origin: "USA" },
  { name: "Maybelline", tag: "Everyday Icon", origin: "USA" },
  { name: "NYX Professional", tag: "Vibrant Color Artistry", origin: "USA" },
  { name: "L'Oréal Paris", tag: "Global Beauty Pioneer", origin: "France" },
  { name: "Garnier", tag: "Botanical Micellar & Care", origin: "France" },
  { name: "Sephora Collection", tag: "Trendsetting Formulas", origin: "France" },
  { name: "Morphe", tag: "Pro Brushes & Mist Tech", origin: "USA" },
];

export const BrandMarquee: React.FC = () => {
  return (
    <section id="brands" className="py-14 bg-white border-b border-[#e6e0d3]/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="rs-eyebrow justify-center text-[#C58E2A] mb-2">
          Global Prestige Sourcing
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#171512]">
          Brands We Source From
        </h3>
        <p className="text-xs sm:text-sm text-[#6f6a60] max-w-xl mx-auto mt-1 font-light">
          We source authentic cosmetics directly from renowned international brands. 100% genuine formulation guarantee.
        </p>
      </div>

      {/* Infinite scrolling brand badges */}
      <div className="relative w-full">
        <div className="flex gap-4 sm:gap-6 animate-none sm:animate-marquee whitespace-nowrap overflow-x-auto pb-4 sm:pb-0 px-4 no-scrollbar justify-start lg:justify-center">
          {brandsList.map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-[#f7f4ee] border border-[#e6e0d3] hover:border-[#C58E2A] hover:bg-white hover:shadow-md transition-all duration-300 shrink-0 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C58E2A] opacity-80 group-hover:scale-125 transition-transform" />
                <span className="font-display font-semibold text-sm sm:text-base text-[#171512] group-hover:text-[#C58E2A] transition-colors">
                  {brand.name}
                </span>
              </div>
              <span className="text-[10px] text-[#6f6a60] uppercase tracking-wider font-mono mt-0.5">
                {brand.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
