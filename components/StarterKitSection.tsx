"use client";

import React, { useState } from "react";
import { ProductCard, Product } from "./ProductCard";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface StarterKitSectionProps {
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const starterKitProducts: Product[] = [
  {
    id: "balancing-cleanser",
    name: "Balancing Cleanser 16.9 oz.",
    category: "CLEANSERS",
    price: 25.0,
    rating: 4.9,
    reviewCount: 225,
    stockCount: 3,
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    description: "A gentle pH-balanced foaming cleanser enriched with green tea catechins and aloe vera to dissolve impurities without stripping essential skin lipids.",
    sizes: ["200ml", "500ml"],
  },
  {
    id: "vitamin-c-serum",
    name: "Vitamin C Serum with 10% Ethyl Ascorbic Acid",
    category: "SERUMS",
    price: 45.0,
    originalPrice: 55.0,
    rating: 4.8,
    reviewCount: 190,
    stockCount: 5,
    isFlashDeal: true,
    discountBadge: "Flash Deal",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    description: "Ultra-stable 10% Ethyl Ascorbic Acid synergized with ferulic acid and Kakadu plum to visibly fade sun spots and boost natural collagen synthesis.",
    sizes: ["30ml", "50ml"],
  },
  {
    id: "liquid-gold-kit",
    name: "Liquid Gold Trial Kit with 5% Glycolic",
    category: "MASKS",
    price: 16.0,
    rating: 5.0,
    reviewCount: 108,
    stockCount: 4,
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1512290900672-1f02e604f8dd?q=80&w=800&auto=format&fit=crop",
    description: "Resurface and revitalize dull epidermal layers with buffered 5% glycolic acid and silk proteins for an overnight radiance transformation.",
    sizes: ["15ml Mini", "30ml Full"],
  },
];

export const allCatalogProducts: Product[] = [
  ...starterKitProducts,
  {
    id: "clear-skin-tonic",
    name: "Clear Skin Tonic PHA Toner",
    category: "TONERS",
    price: 22.0,
    rating: 5.0,
    reviewCount: 340,
    stockCount: 9,
    isNew: true,
    image: "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    description: "Gentle polyhydroxy acid toner formulated to refine skin texture and micro-exfoliate while infusing soothing botanical hydration.",
    sizes: ["150ml"],
  },
  {
    id: "botanical-radiance-serum",
    name: "Botanical Radiance Serum",
    category: "SERUMS",
    price: 14.0,
    originalPrice: 17.5,
    rating: 4.9,
    reviewCount: 1245,
    stockCount: 5,
    isFlashDeal: true,
    discountBadge: "Save 25%",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    description: "100% organic cold-pressed rose hip seed oil and botanical antioxidants for supreme hydration, brightening, and barrier defense.",
    sizes: ["30ml", "50ml", "75ml"],
  },
  {
    id: "face-milk-essence",
    name: "The Base Face Milk Essence",
    category: "CREAMS",
    price: 42.0,
    rating: 5.0,
    reviewCount: 412,
    stockCount: 7,
    isBestSeller: true,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    description: "Weightless multi-ceramide and oat lipid milk emulsion that quenches parched skin and seals moisture for 48 continuous hours.",
    sizes: ["50ml", "100ml"],
  },
  {
    id: "multivitamin-body-serum",
    name: "Multivitamin Glow Body Serum",
    category: "BODY",
    price: 34.0,
    rating: 4.0,
    reviewCount: 88,
    stockCount: 12,
    image: "https://images.unsplash.com/photo-1512290900672-1f02e604f8dd?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    description: "Niacinamide, Vitamin E, and Marula oil treatment for silk-soft body nourishment and all-over radiant tone.",
    sizes: ["200ml"],
  },
  {
    id: "peptide-barrier-cream",
    name: "Calm & Repair Moisture Cream",
    category: "CREAMS",
    price: 38.0,
    originalPrice: 48.0,
    rating: 4.9,
    reviewCount: 310,
    stockCount: 6,
    discountBadge: "Save 20%",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    hoverImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop",
    description: "Infused with 5 biomimetic peptides, ectoin, and gotu kola to rapidly soothe irritation and replenish cellular elasticity.",
    sizes: ["50ml"],
  },
];

export const StarterKitSection: React.FC<StarterKitSectionProps> = ({
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  return (
    <section id="starter-kit" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="rs-eyebrow justify-center text-[#b58124]">
            Botanical Morning Ritual
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171512] leading-tight">
            The Edlizer Starter Kit
          </h2>
          <p className="text-base text-[#6f6a60] font-light">
            Your perfect morning ritual to boost radiance, strengthen your moisture barrier, and awaken a healthy, unfiltered glow.
          </p>
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {starterKitProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
            />
          ))}
        </div>

        {/* Section Bottom Banner & CTA */}
        <div className="mt-14 bg-[#f7f4ee] rounded-2xl p-6 sm:p-8 border border-[#e6e0d3] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#171512] text-[#d6a44f] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-[#171512]">
                Bundle & Receive 20% Off Plus a Complimentary Silk Headband
              </h3>
              <p className="text-xs text-[#6f6a60] mt-0.5">
                Automatically applied at checkout on all starter routine trios.
              </p>
            </div>
          </div>

          <Link
            href="#shop-all"
            className="shrink-0 bg-[#171512] text-white hover:bg-[#b58124] text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all flex items-center gap-2"
          >
            <span>Customize Your Bundle</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
