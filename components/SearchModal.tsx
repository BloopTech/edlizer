"use client";

import React, { useState } from "react";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { edlizerProducts } from "@/lib/products";
import { Product } from "./ProductCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  products?: Product[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  products,
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const productPool = products && products.length > 0 ? products : edlizerProducts;

  const results = query.trim()
    ? productPool.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = [
    "NARS Radiant Foundation",
    "Good Molecules Serum",
    "Simple Facial Toner",
    "Beauty Creations Powder",
    "Rimmel Foundation",
    "Acne Cleanser",
    "Morphe Face Mist",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e6e0d3] z-10 animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Header */}
        <div className="p-4 sm:p-6 border-b border-[#e6e0d3] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C58E2A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search foundations, discoloration serums, powders, toners..."
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-none text-[#171512] placeholder-[#a49e91]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#a49e91] hover:text-[#171512]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#efe9de] text-[#6f6a60] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {query.trim() === "" ? (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6f6a60] block mb-3">
                  Popular Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 bg-[#f7f4ee] hover:bg-[#efe9de] rounded-full text-xs text-[#171512] border border-[#e6e0d3] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-linear-to-r from-[#f7f4ee] to-[#efe9de] rounded-2xl border border-[#e6e0d3] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#171512] text-[#E3B358] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-[#171512]">
                      Looking for a shade match or routine help?
                    </h5>
                    <p className="text-[11px] text-[#6f6a60]">
                      WhatsApp our beauty consultant directly at 055 964 0640.
                    </p>
                  </div>
                </div>
                <a
                  href="https://wa.me/233559640640"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold uppercase tracking-wider text-[#C58E2A] hover:underline shrink-0"
                >
                  Chat on WhatsApp →
                </a>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6f6a60] block mb-2">
                Found {results.length} Product{results.length > 1 ? "s" : ""}
              </span>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#f7f4ee] cursor-pointer transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-white overflow-hidden shrink-0 flex items-center justify-center p-1 border border-[#e6e0d3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase font-semibold text-[#6f6a60]">
                      {product.category}
                    </div>
                    <div className="font-display font-medium text-sm text-[#171512] group-hover:text-[#C58E2A] transition-colors truncate">
                      {product.name}
                    </div>
                    <div className="text-xs font-bold text-[#171512] mt-0.5">
                      GHS {product.price.toFixed(2)}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#a49e91] group-hover:text-[#171512] group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-[#6f6a60]">
              No products found matching &ldquo;{query}&rdquo;. Try searching for NARS, Good Molecules, or Toner.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

