"use client";

import React from "react";
import { ProductCard, Product } from "./ProductCard";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const featuredFoundations: Product[] = [
  {
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
      "A cult-favorite breathable formula that delivers a natural, lit-from-within radiant finish with 16-hour fade-resistant medium buildable coverage.",
    sizes: ["Light", "Medium", "Tan", "Deep"],
  },
  {
    id: "rimmel-lasting-finish",
    name: "Rimmel Lasting Finish Foundation",
    category: "Foundation",
    price: 180.0,
    rating: 4.8,
    reviewCount: 165,
    stockCount: 12,
    isBestSeller: true,
    image:
      "https://images.unsplash.com/photo-1512290900672-1f02e604f8dd?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    description:
      "Infused with comfort serum and hyaluronic acid for full-coverage comfort, sweat-proof wear, and a 25-hour flawless satin base.",
    sizes: ["Ivory", "Classic Beige", "Mocha", "Deep Bronze"],
  },
  {
    id: "rimmel-match-perfection",
    name: "Rimmel Match Perfection",
    category: "Foundation",
    price: 180.0,
    rating: 4.9,
    reviewCount: 198,
    stockCount: 9,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1512290900672-1f02e604f8dd?q=80&w=800&auto=format&fit=crop",
    description:
      "Smart-tone technology matches 99% of skin tones seamlessly with 24-hour hydration and 24HR moisture complex for an undetectable skin finish.",
    sizes: ["Light Porcelain", "Natural Buff", "Caramel", "Espresso"],
  },
  {
    id: "flawless-liquid-foundation",
    name: "Flawless Liquid Foundation",
    category: "Foundation",
    price: 55.0,
    originalPrice: 70.0,
    rating: 4.7,
    reviewCount: 92,
    stockCount: 15,
    isFlashDeal: true,
    discountBadge: "FLASH DEAL",
    image:
      "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    description:
      "Ultra-fluid, weightless foundation giving everyday seamless blur, velvet-matte control, and effortless buildable blending.",
    sizes: ["Fair", "Medium", "Warm Honey", "Rich Cocoa"],
  },
];

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
  const displayProducts = products && products.length > 0 ? products : featuredFoundations;
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
            href="#shop-all"
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
