"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Check, SlidersHorizontal, X } from "lucide-react";
import { ProductCard, Product } from "./ProductCard";
import { departmentGroups, priceBounds } from "@/lib/products";
import { ShopFilters, FilterState } from "./ShopFilters";
import { siteAssets } from "@/lib/assets";

interface ShopCatalogueProps {
  products: Product[];
  /** Department pre-selected from the URL (mega menu, footer links). */
  initialDepartment?: string;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
}

const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name", label: "Alphabetical" },
] as const;

type SortId = (typeof SORT_OPTIONS)[number]["id"];

/** Round out to tidy steps so the range labels read well. */
const CEILING = Math.ceil(priceBounds.max / 50) * 50;
const FLOOR = Math.floor(priceBounds.min / 10) * 10;

/** A removable chip describing one applied filter. */
const Pill: React.FC<{ children: React.ReactNode; onRemove: () => void }> = ({
  children,
  onRemove,
}) => (
  <button
    onClick={onRemove}
    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-[#171512] text-white hover:bg-[#C58E2A] hover:text-[#171512] transition-colors"
  >
    {children}
    <X className="w-3 h-3" />
  </button>
);

export const ShopCatalogue: React.FC<ShopCatalogueProps> = ({
  products,
  initialDepartment,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const emptyFilters: FilterState = {
    departments:
      initialDepartment && initialDepartment !== "ALL" ? [initialDepartment] : [],
    brands: [],
    minPrice: FLOOR,
    maxPrice: CEILING,
    inStockOnly: false,
    onOfferOnly: false,
  };

  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sortBy, setSortBy] = useState<SortId>("featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleDepartment = (name: string) =>
    setFilters((prev) => ({
      ...prev,
      departments: prev.departments.includes(name)
        ? prev.departments.filter((d) => d !== name)
        : [...prev.departments, name],
    }));

  const toggleBrand = (name: string) =>
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b !== name),
    }));

  const clearAll = () =>
    setFilters({
      departments: [],
      brands: [],
      minPrice: FLOOR,
      maxPrice: CEILING,
      inStockOnly: false,
      onOfferOnly: false,
    });

  const priceTouched = filters.minPrice > FLOOR || filters.maxPrice < CEILING;

  const activeCount =
    filters.departments.length +
    filters.brands.length +
    (priceTouched ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onOfferOnly ? 1 : 0);

  const visible = useMemo(() => {
    const list = products.filter((product) => {
      if (filters.departments.length > 0) {
        const departments = product.categories ?? [product.category];
        if (!departments.some((d) => filters.departments.includes(d))) return false;
      }
      if (filters.brands.length > 0) {
        if (!product.brand || !filters.brands.includes(product.brand)) return false;
      }
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      if (filters.inStockOnly && product.stockCount <= 0) return false;
      if (filters.onOfferOnly && !product.originalPrice) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        return [...list].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...list].sort((a, b) => b.price - a.price);
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        // Featured: in stock first, then the pieces we are pushing.
        return [...list].sort(
          (a, b) =>
            Number(b.stockCount > 0) - Number(a.stockCount > 0) ||
            Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller))
        );
    }
  }, [products, filters, sortBy]);

  const filterPanel = (
    <ShopFilters
      value={filters}
      onChange={setFilters}
      bounds={{ min: FLOOR, max: CEILING }}
      activeCount={activeCount}
      onClear={clearAll}
    />
  );

  return (
    <div className="bg-white">
      {/* ---------- Editorial masthead ---------- */}
      <header className="relative overflow-hidden bg-[#f7f4ee] border-b border-[#e6e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 py-14 lg:py-20">
            <div className="lg:col-span-7">
              <nav
                aria-label="Breadcrumb"
                className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#a49e91] flex items-center gap-2 mb-6"
              >
                <Link href="/" className="hover:text-[#171512] transition-colors">
                  Home
                </Link>
                <span aria-hidden>—</span>
                <span className="text-[#171512]">Shop</span>
              </nav>

              <h1 className="font-display text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.02] text-[#171512]">
                The Collection
              </h1>

              <p className="mt-5 text-[15px] sm:text-base text-[#6f6a60] font-light leading-relaxed max-w-lg">
                Every piece sourced straight from the house that makes it — from
                high-coverage complexion to clinical skincare, across{" "}
                {departmentGroups.reduce((n, g) => n + g.departments.length, 0)} departments.
              </p>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-[26rem] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative campaign art */}
              <img
                src={siteAssets.hero.goldCouture}
                alt=""
                className="w-full h-full object-cover object-[50%_16%]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Catalogue ---------- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Desktop filter rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">{filterPanel}</div>
          </aside>

          <div className="lg:col-span-9">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#e6e0d3]">
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#171512]"
              >
                <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
                Filter
                {activeCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#171512] text-white text-[10px] flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </button>

              <p className="hidden lg:block text-[13px] text-[#6f6a60] tabular-nums">
                <span className="text-[#171512] font-medium">{visible.length}</span>{" "}
                {visible.length === 1 ? "product" : "products"}
              </p>

              <div className="relative">
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  aria-expanded={sortOpen}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#171512] hover:text-[#C58E2A] transition-colors"
                >
                  Sort
                  <span className="font-normal normal-case tracking-normal text-[13px] text-[#6f6a60]">
                    {SORT_OPTIONS.find((s) => s.id === sortBy)?.label}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {sortOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setSortOpen(false)}
                      aria-hidden
                    />
                    <ul className="absolute right-0 top-full mt-3 z-20 w-56 bg-white border border-[#e6e0d3] rounded-xl shadow-[0_20px_45px_-15px_rgba(23,21,18,0.22)] overflow-hidden">
                      {SORT_OPTIONS.map((option) => (
                        <li key={option.id}>
                          <button
                            onClick={() => {
                              setSortBy(option.id);
                              setSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors flex items-center justify-between ${
                              sortBy === option.id
                                ? "bg-[#f7f4ee] text-[#171512] font-medium"
                                : "text-[#6f6a60] hover:bg-[#f7f4ee]"
                            }`}
                          >
                            {option.label}
                            {sortBy === option.id && (
                              <Check className="w-3.5 h-3.5 text-[#C58E2A]" />
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Active filter pills — every applied filter, each removable */}
            {activeCount > 0 && (
              <div className="flex flex-wrap gap-2 pt-5">
                {filters.departments.map((name) => (
                  <Pill key={`d-${name}`} onRemove={() => toggleDepartment(name)}>
                    {name}
                  </Pill>
                ))}
                {filters.brands.map((name) => (
                  <Pill key={`b-${name}`} onRemove={() => toggleBrand(name)}>
                    {name}
                  </Pill>
                ))}
                {priceTouched && (
                  <Pill
                    onRemove={() =>
                      setFilters((prev) => ({
                        ...prev,
                        minPrice: FLOOR,
                        maxPrice: CEILING,
                      }))
                    }
                  >
                    GHS {filters.minPrice}–{filters.maxPrice}
                  </Pill>
                )}
                {filters.inStockOnly && (
                  <Pill
                    onRemove={() =>
                      setFilters((prev) => ({ ...prev, inStockOnly: false }))
                    }
                  >
                    In stock
                  </Pill>
                )}
                {filters.onOfferOnly && (
                  <Pill
                    onRemove={() =>
                      setFilters((prev) => ({ ...prev, onOfferOnly: false }))
                    }
                  >
                    On offer
                  </Pill>
                )}
              </div>
            )}

            {/* Grid */}
            {visible.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-8">
                {visible.map((product) => (
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
            ) : (
              <div className="py-24 text-center">
                <p className="font-display text-2xl text-[#171512]">
                  Nothing matches those filters
                </p>
                <p className="text-[14px] text-[#6f6a60] mt-2 font-light">
                  Try widening the price range or clearing a department.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C58E2A] hover:text-[#171512] transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Mobile filter drawer ---------- */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-white flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#e6e0d3]">
              <span className="font-display text-xl text-[#171512]">Filter</span>
              <button
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="p-1.5 rounded-full hover:bg-[#f7f4ee] text-[#201c17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">{filterPanel}</div>

            <div className="px-5 py-4 border-t border-[#e6e0d3]">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full bg-[#171512] text-white py-3.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] hover:bg-[#C58E2A] hover:text-[#171512] transition-colors"
              >
                Show {visible.length} {visible.length === 1 ? "product" : "products"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
