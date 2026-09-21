"use client";

import React from "react";
import { ProductCard, Product } from "./ProductCard";
import { Droplets, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const skincareHighlightsProducts: Product[] = [
  {
    id: "simple-soothing-facial-toner",
    name: "Simple Soothing Facial Toner",
    category: "Face Toners, Skincare",
    price: 100.0,
    rating: 4.9,
    reviewCount: 310,
    stockCount: 14,
    isBestSeller: true,
    image:
      "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    description:
      "A 100% alcohol-free, vitamin-infused toner enriched with Pro-Vitamin B5, Chamomile, Witch Hazel, and Allantoin to restore skin's natural pH and soothe irritation.",
    sizes: ["200ml"],
  },
  {
    id: "good-molecules-acne-foaming-cleanser",
    name: "Good Molecules Acne Foaming Cleanser",
    category: "Face Wash/Cleanser, Skincare",
    price: 280.0,
    rating: 5.0,
    reviewCount: 240,
    stockCount: 7,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    description:
      "Formulated with 2% salicylic acid, witch hazel, and zinc PCA to deeply unclog pores, eliminate acne-causing bacteria, and calm active redness.",
    sizes: ["120ml"],
  },
  {
    id: "good-molecules-discoloration-serum",
    name: "Good Molecules Discoloration Correcting Serum",
    category: "Face Serums, Skincare",
    price: 250.0,
    rating: 5.0,
    reviewCount: 520,
    stockCount: 11,
    isBestSeller: true,
    discountBadge: "VIRAL SERUM",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    description:
      "An advanced clinical dual-action serum powered by 3% Tranexamic Acid and 4% Niacinamide to visibly erase stubborn dark spots, sun damage, and post-acne marks.",
    sizes: ["30ml", "75ml Jumbo"],
  },
  {
    id: "good-molecules-clarify-cleanse-bar",
    name: "Good Molecules Clarify & Cleanse Bar",
    category: "Bath & Body, Face Wash/Cleanser",
    price: 150.0,
    rating: 4.8,
    reviewCount: 175,
    stockCount: 9,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    description:
      "Soap-free cleansing bar infused with salicylic acid, tea tree oil, and willow bark to deeply clarify face and body blemishes while preserving moisture balance.",
    sizes: ["89g Bar"],
  },
];

interface SkincareHighlightsProps {
  products?: Product[];
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const SkincareHighlights: React.FC<SkincareHighlightsProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const displayProducts = products && products.length > 0 ? products : skincareHighlightsProducts;
  return (
    <section id="skincare-highlights" className="py-20 bg-[#f7f4ee] border-b border-[#e6e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="rs-eyebrow text-[#C58E2A]">
              Targeted Clinical Formulations
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171512] leading-tight">
              Skincare Highlights
            </h2>
            <p className="text-base text-[#6f6a60] font-light">
              Scientifically proven serums, toners, and clarifying washes designed to clear hyperpigmentation, soothe inflammation, and restore skin barrier health.
            </p>
          </div>

          <Link
            href="#shop-all"
            className="inline-flex items-center gap-2 bg-[#171512] text-white hover:bg-[#C58E2A] text-xs font-semibold uppercase tracking-widest px-6 py-3.5 rounded-full transition-all shrink-0"
          >
            <span>View All Skincare</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product) => (
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
      </div>
    </section>
  );
};
