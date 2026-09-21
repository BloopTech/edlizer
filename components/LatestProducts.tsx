"use client";

import React from "react";
import { ProductCard, Product } from "./ProductCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const latestCatalogProducts: Product[] = [
  {
    id: "beauty-creations-setting-powder",
    name: "Beauty Creations Setting Powder",
    category: "Makeup, Setting Powder",
    price: 200.0,
    rating: 4.9,
    reviewCount: 142,
    stockCount: 10,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1512290900672-1f02e604f8dd?q=80&w=800&auto=format&fit=crop",
    description:
      "Finely-milled translucent setting powder that locks makeup in place for 16 hours with zero flashback and a soft-focus velvet matte blur.",
    sizes: ["Translucent", "Banana", "Honey"],
  },
  {
    id: "creme-shop-banana-powder",
    name: "The Creme Shop Banana Setting/Baking Powder",
    category: "Setting Powder",
    price: 200.0,
    rating: 4.8,
    reviewCount: 96,
    stockCount: 8,
    isBestSeller: true,
    image:
      "https://images.unsplash.com/photo-1512290900672-1f02e604f8dd?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
    description:
      "Brightening banana tone powder that neutralizes dark circles, absorbs excess midday oils, and keeps under-eyes flawlessly smooth.",
    sizes: ["Standard 25g"],
  },
  {
    id: "coola-setting-sunscreen-spray",
    name: "Coola Makeup Setting Sunscreen Spray",
    category: "Setting & Finishing Spray",
    price: 400.0,
    rating: 5.0,
    reviewCount: 180,
    stockCount: 6,
    discountBadge: "SPF DEFENSE",
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    description:
      "Weightless matte-finish setting mist infused with Broad Spectrum SPF 30, hyaluronic acid, and cucumber extract to reapply sun protection over makeup.",
    sizes: ["100ml Spray"],
  },
  {
    id: "morphe-2-3-in-1-face-mist",
    name: "Morphe 2 3-in-1 Face Mist",
    category: "Face Toners, Setting & Finishing Spray",
    price: 200.0,
    rating: 4.9,
    reviewCount: 115,
    stockCount: 11,
    image:
      "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    description:
      "Multi-tasking continuous mist that primes, hydrates with aloe water, and sets makeup with a luminous, dewy glow.",
    sizes: ["100ml Continuous Mist"],
  },
];

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
  const displayProducts = products && products.length > 0 ? products : latestCatalogProducts;
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
            href="#shop-all"
            className="inline-flex items-center gap-2 bg-[#171512] hover:bg-[#C58E2A] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] px-8 py-4 rounded-full transition-all shadow-md"
          >
            <span>Explore All 10 Departments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
