"use client";

import React, { useState } from "react";
import { Star, Eye, Heart, ArrowLeftRight, Check, ShoppingBag, Flame } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  /** Primary department, shown as the card eyebrow. */
  category: string;
  /** Every department this product is filed under (WooCommerce allows several). */
  categories?: string[];
  /** House that makes it, used by the shop brand filter. */
  brand?: string;
  price: number;
  originalPrice?: number;
  /** Optional: real catalogue items carry no review data until customers leave it. */
  rating?: number;
  reviewCount?: number;
  stockCount: number;
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  isNew?: boolean;
  discountBadge?: string;
  image: string;
  hoverImage?: string;
  /** Extra shots shown as thumbnails in quick view. */
  gallery?: string[];
  description?: string;
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedAnimation(true);
    onAddToCart?.(product);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      className="group flex flex-col bg-[#f7f4ee] rounded-2xl overflow-hidden border border-transparent hover:border-[#e6e0d3] hover:shadow-[0_12px_30px_rgba(23,21,18,0.08)] transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Media Container */}
      <div className="relative aspect-square w-full bg-[#efe9de] overflow-hidden flex items-center justify-center p-6">
        {/*
          The photograph itself opens quick view. On touch there is no hover to
          reveal the eye button, so the image has to be the target.
        */}
        <button
          type="button"
          onClick={() => onQuickView?.(product)}
          aria-label={`Quick view: ${product.name}`}
          className="absolute inset-0 z-[5] cursor-pointer"
        />
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          loading="lazy"
        />

        {/* Stacked Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-[#e6e2fb] text-[#4a3fb0] text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-sm shadow-xs uppercase">
              Best Seller
            </span>
          )}
          {product.isFlashDeal && (
            <span className="bg-[#fde6d2] text-[#c06a1c] text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-sm shadow-xs uppercase flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Flash Deal
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#dceafc] text-[#1c5fb0] text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-sm shadow-xs uppercase">
              New
            </span>
          )}
          {product.discountBadge && (
            <span className="bg-[#f7f4ee] border border-[#e6e0d3] text-[#d0263c] text-[11px] font-semibold px-2 py-0.5 rounded-sm">
              {product.discountBadge}
            </span>
          )}
        </div>

        {/* Hover Action Buttons Top Right (Quick View, Wishlist, Compare) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView?.(product);
            }}
            className="w-9 h-9 rounded-full bg-white/95 text-[#201c17] hover:bg-[#171512] hover:text-white shadow-sm flex items-center justify-center transition-colors"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist?.(product);
            }}
            className={`w-9 h-9 rounded-full bg-white/95 shadow-sm flex items-center justify-center transition-colors ${
              isWishlisted
                ? "text-[#d6552e] bg-white"
                : "text-[#201c17] hover:bg-[#171512] hover:text-white"
            }`}
            title="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current text-[#d6552e]" : ""}`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-9 h-9 rounded-full bg-white/95 text-[#201c17] hover:bg-[#171512] hover:text-white shadow-sm items-center justify-center transition-colors hidden sm:inline-flex"
            title="Compare formulation"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide-Up Quick Add Button */}
        <div className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
              addedAnimation
                ? "bg-[#2f8f5c] text-white"
                : "bg-[#171512] text-white hover:bg-[#b58124]"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" /> Added to Bag
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Eyebrow / Category */}
          <div className="rs-eyebrow text-[11px] mb-1.5">
            {product.category}
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView?.(product)}
            className="font-display font-medium text-base sm:text-lg text-[#201c17] group-hover:text-[#b58124] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Rating — omitted entirely when the product has no reviews yet */}
          {typeof product.rating === "number" && (
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex text-[#eea431]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating!)
                        ? "fill-current"
                        : "text-[#e6e0d3]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#6f6a60] font-sans">
                {product.rating.toFixed(1)}
                {product.reviewCount ? ` (${product.reviewCount})` : ""}
              </span>
            </div>
          )}
        </div>

        {/* Pricing & Stock Availability */}
        <div className="pt-2 border-t border-[#e6e0d3]/60 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2 whitespace-nowrap">
            <span
              className={`font-semibold text-base font-sans ${
                product.originalPrice ? "text-[#d0263c]" : "text-[#201c17]"
              }`}
            >
              GHS {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#a49e91] line-through font-sans">
                GHS {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Availability Indicator */}
          <div className="flex items-center gap-1.5 text-xs text-[#6f6a60] whitespace-nowrap">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                product.stockCount > 0 ? "bg-[#2f8f5c]" : "bg-[#c72f5e]"
              }`}
            />
            <span className="text-[11px]">
              {product.stockCount > 0
                ? `${product.stockCount} in stock`
                : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
