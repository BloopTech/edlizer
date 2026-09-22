"use client";

import React from "react";
import { ProductCard, Product } from "./ProductCard";
import { Droplets, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";


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
  const displayProducts = products ?? [];
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
            href="/shop"
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
