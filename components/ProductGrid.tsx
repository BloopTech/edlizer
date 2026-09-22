"use client";

import React from "react";
import { ProductCard, Product } from "./ProductCard";
import { useStore } from "./StoreShell";

/**
 * A grid of product cards already wired to the shared store, so pages can drop
 * products onto the page without re-threading cart/wishlist/quick-view props.
 */
export const ProductGrid: React.FC<{
  products: Product[];
  columns?: 3 | 4;
  emptyMessage?: string;
}> = ({ products, columns = 4, emptyMessage }) => {
  const { wishlistIds, addToCart, toggleWishlist, openQuickView } = useStore();

  if (products.length === 0) {
    return emptyMessage ? (
      <p className="text-[14px] text-[#6f6a60] font-light py-10">{emptyMessage}</p>
    ) : null;
  }

  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:gap-6 ${
        columns === 3 ? "lg:grid-cols-3" : "md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={openQuickView}
          onAddToCart={(p) => addToCart(p)}
          onToggleWishlist={toggleWishlist}
          isWishlisted={wishlistIds.includes(product.id)}
        />
      ))}
    </div>
  );
};
