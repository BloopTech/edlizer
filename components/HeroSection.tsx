"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Award,
  Heart,
} from "lucide-react";
import { Product } from "./ProductCard";
import { siteAssets } from "@/lib/assets";

interface HeroSectionProps {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export const heroSpotlightProduct: Product = {
  id: "nars-radiant-foundation",
  name: "NARS Radiant Foundation",
  category: "Foundation",
  price: 740.0,
  originalPrice: 790.0,
  rating: 5.0,
  reviewCount: 420,
  stockCount: 8,
  isBestSeller: true,
  discountBadge: "TOP BRAND",
  image:
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
  hoverImage:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
  description:
    "Iconic breathable medium-to-full buildable coverage foundation with 16-hour fade-resistant glow and skin-optimizing radiance.",
  sizes: ["Light", "Medium", "Tan", "Deep"],
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#171512] text-white">
      {/* Editorial High-Fashion Background Photo with Atmospheric Lighting */}
      <div className="absolute inset-0 z-0">
        <img
          src={siteAssets.hero.mainImage}
          alt="Edlizer Beauty Editorial Model"
          className="w-full h-full object-cover object-[center_18%] lg:object-[75%_20%] filter brightness-[0.92] contrast-[1.05] scale-105 animate-in fade-in duration-1000"
        />
        {/* Left-side scrim only: keeps text legible without darkening the model's face on the right */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(23,21,18,0.95)_0%,rgba(23,21,18,0.7)_30%,rgba(23,21,18,0.25)_55%,rgba(23,21,18,0)_70%)]" />
        <div className="absolute inset-0 bg-linear-to-t from-[#171512] via-transparent to-black/20" />
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C58E2A]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#efe9de] shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#E3B358] animate-ping" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white font-sans">
              Be Whoever You Want
            </span>
            <span className="text-white/40">|</span>
            <span className="text-[11px] font-medium text-[#E3B358] flex items-center gap-1 font-sans">
              <Sparkles className="w-3.5 h-3.5" /> Ghana's Premier Beauty House
            </span>
          </div>

          {/* Headline in Boska Serif */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-normal tracking-tight text-white leading-[1.02]">
            Beauty On{" "}
            <span className="italic font-normal text-[#E3B358] block sm:inline">
              Your Terms
            </span>
          </h1>

          {/* Subtext in Satoshi Sans */}
          <p className="font-body text-base sm:text-lg md:text-xl text-[#efe9de]/90 leading-relaxed font-light max-w-2xl">
            We empower you to express yourself freely and be whoever you want to be. Unleash your inner beauty with our wide range of authentic cosmetics and clinical skincare sourced straight from renowned global houses.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#featured-products"
              className="bg-[#C58E2A] hover:bg-[#E3B358] text-[#171512] transition-all duration-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] px-8 py-4 rounded-full shadow-xl hover:shadow-2xl flex items-center gap-2 group font-sans"
            >
              <span>Shop Cosmetics</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#skincare-highlights"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white transition-all duration-300 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] px-8 py-4 rounded-full backdrop-blur-md flex items-center gap-2 font-sans"
            >
              <span>Skincare Highlights</span>
            </Link>
          </div>

          {/* Social Proof & Trust Strip */}
          <div className="pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white/60 object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Client review"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white/60 object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop"
                  alt="Client review"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white/60 object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                  alt="Client review"
                />
                <div className="inline-flex h-9 w-9 rounded-full bg-[#C58E2A] text-[#171512] text-[10px] font-bold items-center justify-center ring-2 ring-white">
                  5.0★
                </div>
              </div>
              <div>
                <div className="flex text-[#eea431] items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-white font-sans">
                  5.0 out of 5 stars{" "}
                  <span className="font-light text-[#efe9de]/70">
                    (Verified Client Reviews)
                  </span>
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#efe9de]/80 font-sans">
              <ShieldCheck className="w-4 h-4 text-[#2f8f5c]" />
              <span>100% Genuine Guaranteed • Ghana Nationwide Delivery</span>
            </div>
          </div>
        </div>

        {/* 3 Core Value Propositions Ticker */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-full bg-[#C58E2A]/20 text-[#E3B358] flex items-center justify-center shrink-0">
              <Award className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                Genuine Quality Products
              </div>
              <div className="text-xs text-[#efe9de]/75 mt-0.5 font-light font-sans">
                We source products straight from renowned international brands. Genuine products you can trust.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-full bg-[#C58E2A]/20 text-[#E3B358] flex items-center justify-center shrink-0">
              <Heart className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                Inclusive Beauty
              </div>
              <div className="text-xs text-[#efe9de]/75 mt-0.5 font-light font-sans">
                We believe beauty is for everyone, regardless of age, gender, or skin tone.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-9 h-9 rounded-full bg-[#C58E2A]/20 text-[#E3B358] flex items-center justify-center shrink-0">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-sans">
                Personalized Solutions
              </div>
              <div className="text-xs text-[#efe9de]/75 mt-0.5 font-light font-sans">
                Beauty is personal. We offer solutions tailored to your unique needs and preferences.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
