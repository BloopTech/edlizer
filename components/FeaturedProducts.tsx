"use client";

import React from "react";
import { ProductCard, Product } from "./ProductCard";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";


interface FeaturedProductsProps {
  products?: Product[];
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const displayProducts = products ?? [];
  return (
    <section id="featured-products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (from md file) */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="rs-eyebrow justify-center text-[#C58E2A]">
            High-Quality Cosmetic And Beauty Products
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171512] leading-tight">
            Featured Products — From Top Brands Around The World
          </h2>
          <p className="text-base text-[#6f6a60] font-light">
            Indulge in certified authentic complexion perfection from NARS, Rimmel London, and top cosmetic formulators.
          </p>
        </div>

        {/* 4-Product Foundation Grid */}
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

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#f7f4ee] border border-[#e6e0d3] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#2f8f5c]" />
            <span className="text-xs sm:text-sm font-medium text-[#171512]">
              All makeup & foundations are batch-verified 100% genuine directly from authorized distributors.
            </span>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#C58E2A] hover:text-[#9B6B18] flex items-center gap-1 shrink-0"
          >
            <span>Explore All Foundations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
