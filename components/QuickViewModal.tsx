"use client";

import React, { useState } from "react";
import { Product } from "./ProductCard";
import {
  X,
  Star,
  Check,
  Truck,
  RotateCcw,
  Heart,
  HelpCircle,
  Share2,
  Minus,
  Plus,
  ShieldCheck,
} from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
  onBuyNow: (product: Product, quantity: number, size: string) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes?.[0] || "30ml"
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(product.image);

  const images = [
    product.image,
    product.hoverImage ||
      "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
  ];

  const handleDec = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handleInc = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e6e0d3] z-10 max-h-[92vh] flex flex-col my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-[#171512] hover:text-white text-[#201c17] flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Left (Thumbnails + Main Image) */}
            <div className="md:col-span-6 flex gap-4">
              {/* Thumbnail column */}
              <div className="flex flex-col gap-2.5 shrink-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-xl overflow-hidden bg-[#efe9de] border-2 transition-all ${
                      selectedImage === img
                        ? "border-[#171512]"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Photo */}
              <div className="flex-1 aspect-square bg-[#efe9de] rounded-2xl overflow-hidden relative flex items-center justify-center p-4">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Details Right */}
            <div className="md:col-span-6 space-y-4">
              {/* Breadcrumbs */}
              <div className="text-[11px] font-semibold tracking-widest uppercase text-[#6f6a60] flex items-center gap-1.5">
                <span>HOME</span>
                <span>&gt;</span>
                <span>SHOP</span>
                <span>&gt;</span>
                <span className="text-[#171512] truncate">{product.category}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-[#eea431]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-[#201c17] font-semibold">
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span className="text-xs text-[#6f6a60]">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Title */}
              <h2 className="font-display text-2xl sm:text-3xl font-normal text-[#171512]">
                {product.name}
              </h2>

              {/* Key Benefits */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#201c17]">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#2f8f5c]" /> Brightens
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#2f8f5c]" /> Firms & Smooths
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-[#2f8f5c]" /> Evens Tone
                </span>
              </div>

              {/* Pricing */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="font-display font-semibold text-2xl text-[#171512]">
                  GHS {product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#a49e91] line-through font-sans">
                    GHS {product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="bg-[#fde6d2] text-[#c06a1c] text-xs font-bold px-2 py-0.5 rounded uppercase">
                    {product.discountBadge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#6f6a60]">
                Delivery calculated at checkout. Express Accra & nationwide dispatch.
              </p>

              {/* Stock Urgency Bar */}
              <div className="bg-[#f7f4ee] p-3 rounded-xl border border-[#e6e0d3] space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#c06a1c] font-semibold">
                    Hurry up, only {product.stockCount} items left in stock!
                  </span>
                </div>
                <div className="w-full bg-[#efe9de] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2f8f5c] h-full rounded-full"
                    style={{ width: `${Math.min(100, product.stockCount * 20)}%` }}
                  />
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#6f6a60] block mb-2">
                  Size: <span className="text-[#171512]">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {(product.sizes || ["30ml", "50ml", "75ml"]).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-[#171512] text-white"
                          : "bg-white text-[#201c17] border border-[#e6e0d3] hover:border-[#b58124]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  {/* Quantity Counter */}
                  <div className="inline-flex items-center border border-[#e6e0d3] rounded-full bg-white px-3 py-2">
                    <button
                      onClick={handleDec}
                      className="text-[#6f6a60] hover:text-[#171512] p-1"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-semibold text-[#171512]">
                      {quantity}
                    </span>
                    <button
                      onClick={handleInc}
                      className="text-[#6f6a60] hover:text-[#171512] p-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      onAddToCart(product, quantity, selectedSize);
                      onClose();
                    }}
                    className="flex-1 bg-white hover:bg-[#f7f4ee] border-2 border-[#171512] text-[#171512] font-semibold text-xs uppercase tracking-widest py-3 px-6 rounded-full transition-colors"
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Buy It Now Button */}
                <button
                  onClick={() => {
                    onBuyNow(product, quantity, selectedSize);
                    onClose();
                  }}
                  className="w-full bg-[#171512] hover:bg-[#b58124] text-white font-semibold text-xs uppercase tracking-widest py-3.5 px-6 rounded-full transition-colors shadow-md"
                >
                  Buy It Now
                </button>
              </div>

              {/* Utility links */}
              <div className="flex items-center justify-between text-xs text-[#6f6a60] pt-2 border-t border-[#e6e0d3]">
                <button
                  onClick={() => onToggleWishlist?.(product)}
                  className="flex items-center gap-1.5 hover:text-[#171512]"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      isWishlisted ? "fill-[#d6552e] text-[#d6552e]" : ""
                    }`}
                  />
                  <span>
                    {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#171512]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Ask a Question</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-[#171512]">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Shipping & Return Perks */}
              <div className="p-3.5 bg-[#f7f4ee] rounded-xl border border-[#e6e0d3] space-y-2 text-xs text-[#6f6a60]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C58E2A]" />
                  <span>Prompt Nationwide Delivery across Ghana</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2f8f5c]" />
                  <span>100% Guaranteed Genuine Brand Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
