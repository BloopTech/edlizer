"use client";

import React from "react";
import { ProductCard, Product } from "./ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";


interface LatestProductsProps {
  products?: Product[];
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

export const LatestProducts: React.FC<LatestProductsProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const displayProducts = products ?? [];
  return (
    <section id="latest-products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="rs-eyebrow justify-center text-[#C58E2A]">
            Explore our collection now and discover your new favorites
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171512] leading-tight">
            Latest Products
          </h2>
          <p className="text-base text-[#6f6a60] font-light">
            New arrivals in high-definition baking powders, SPF setting mists, and all-day finishing sprays.
          </p>
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

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#171512] hover:bg-[#C58E2A] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] px-8 py-4 rounded-full transition-all shadow-md"
          >
            <span>Explore All 10 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
