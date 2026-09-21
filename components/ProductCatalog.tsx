"use client";

import React, { useState, useMemo } from "react";
import { ProductCard, Product } from "./ProductCard";
import {
  SlidersHorizontal,
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  ChevronDown,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { featuredFoundations } from "./FeaturedProducts";
import { skincareHighlightsProducts } from "./SkincareHighlights";
import { latestCatalogProducts } from "./LatestProducts";
import { shopCategories } from "./MegaMenu";

export const allEdlizerProducts: Product[] = [
  ...featuredFoundations,
  ...skincareHighlightsProducts,
  ...latestCatalogProducts,
  {
    id: "luxury-brush-set",
    name: "Precision Artistry Face & Eye Brush Set (3-Piece)",
    category: "Brushes",
    price: 195.0,
    rating: 5.0,
    reviewCount: 88,
    stockCount: 14,
    isBestSeller: true,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
    description:
      "Ultra-soft vegan micro-fiber bristles crafted for seamless foundation buffing, contour sculpting, and diffused powder application.",
    sizes: ["3-Brush Set"],
  },
  {
    id: "peptide-lip-glaze",
    name: "Nourishing Peptide Hydrating Lip Gloss",
    category: "Lip Care",
    price: 120.0,
    rating: 4.9,
    reviewCount: 210,
    stockCount: 18,
    isNew: true,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    description:
      "Non-sticky high-shine lip glaze with volumizing bio-peptides, shea butter, and vitamin E for pillow-soft, plump lips.",
    sizes: ["Rose Glaze", "Golden Honey", "Clear Shine"],
  },
];

interface ProductCatalogProps {
  products?: Product[];
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  wishlistIds?: string[];
  selectedCategoryProp?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  selectedCategoryProp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategoryProp || "ALL"
  );
  const [sortBy, setSortBy] = useState<string>("best-selling");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState<4 | 3 | 2>(4);

  const baseProductList = products && products.length > 0 ? products : allEdlizerProducts;

  const departments = [
    { id: "ALL", label: "All Departments" },
    { id: "Foundation", label: "Foundations & Base" },
    { id: "Skincare", label: "Skincare & Serums" },
    { id: "Setting Powder", label: "Setting & Baking Powder" },
    { id: "Setting & Finishing Spray", label: "Setting Mists & SPF" },
    { id: "Brushes", label: "Artistry Brushes" },
    { id: "Lip Care", label: "Lip Care & Stains" },
    { id: "Bath & Body", label: "Bath & Body Bars" },
  ];

  const sortOptions = [
    { id: "best-selling", label: "Best Selling" },
    { id: "price-asc", label: "Price: Low to High (GHS)" },
    { id: "price-desc", label: "Price: High to Low (GHS)" },
    { id: "rating", label: "Top Customer Rating" },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...baseProductList];
    if (selectedCategory !== "ALL") {
      list = list.filter(
        (p) =>
          p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          (selectedCategory === "Skincare" &&
            (p.category.includes("Toner") ||
              p.category.includes("Serum") ||
              p.category.includes("Cleanser")))
      );
    }
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "best-selling") {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }
    return list;
  }, [selectedCategory, sortBy]);

  return (
    <section id="shop-all" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#f7f4ee] border border-[#e6e0d3] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-4">
              <div className="text-xs font-semibold tracking-widest uppercase text-[#6f6a60] flex items-center gap-2">
                <a href="/" className="hover:text-[#171512]">
                  HOME
                </a>
                <span>&gt;</span>
                <span className="text-[#171512]">SHOP ALL</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171512] leading-tight">
                Shop All Products
              </h1>

              <p className="text-sm sm:text-base text-[#6f6a60] font-light max-w-xl leading-relaxed">
                From high-coverage liquid foundations to viral discoloration serums, find your perfect match across all 10 beauty departments.
              </p>

              {/* Quick Department Filter Chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {departments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedCategory(dept.id)}
                    className={`text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                      selectedCategory === dept.id
                        ? "bg-[#171512] text-white"
                        : "bg-white text-[#6f6a60] hover:bg-[#efe9de] border border-[#e6e0d3]"
                    }`}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Model Image */}
            <div className="lg:col-span-5 relative h-64 lg:h-full min-h-80 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000&auto=format&fit=crop"
                alt="Edlizer beauty model"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#f7f4ee] via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </div>

        {/* Filter & Sorting Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-8 border-y border-[#e6e0d3]">
          {/* Left: Filter Trigger Button */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#171512] hover:text-[#C58E2A] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
              <span>Filter Departments</span>
              {selectedCategory !== "ALL" && (
                <span className="w-2 h-2 rounded-full bg-[#C58E2A]" />
              )}
            </button>

            <span className="text-xs text-[#e6e0d3]">|</span>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#171512] hover:text-[#C58E2A] transition-colors"
              >
                <span>
                  SORT BY:{" "}
                  <span className="text-[#6f6a60] font-normal">
                    {sortOptions.find((s) => s.id === sortBy)?.label}
                  </span>
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6f6a60]" />
              </button>

              {sortDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#e6e0d3] py-2 z-30">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSortBy(opt.id);
                        setSortDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs flex items-center justify-between hover:bg-[#f7f4ee] ${
                        sortBy === opt.id
                          ? "font-semibold text-[#C58E2A]"
                          : "text-[#201c17]"
                      }`}
                    >
                      <span>{opt.label}</span>
                      {sortBy === opt.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Grid Switcher and Product Count */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-[#a49e91]">
              <button
                onClick={() => setGridCols(2)}
                className={`p-1.5 rounded hover:text-[#171512] transition-colors ${
                  gridCols === 2 ? "text-[#171512] bg-[#f7f4ee]" : ""
                }`}
                title="2 columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded hover:text-[#171512] transition-colors ${
                  gridCols === 3 ? "text-[#171512] bg-[#f7f4ee]" : ""
                }`}
                title="3 columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded hover:text-[#171512] transition-colors ${
                  gridCols === 4 ? "text-[#171512] bg-[#f7f4ee]" : ""
                }`}
                title="4 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <span className="text-xs font-semibold tracking-wider uppercase text-[#6f6a60]">
              {filteredProducts.length} Verified Products
            </span>
          </div>
        </div>

        {/* Filter Drawer / Panel when active */}
        {filterDrawerOpen && (
          <div className="mb-8 p-6 bg-[#f7f4ee] rounded-2xl border border-[#e6e0d3] animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#171512]">
                Refine by Department
              </span>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="text-xs text-[#6f6a60] hover:text-[#171512] flex items-center gap-1"
              >
                <X className="w-4 h-4" /> Close
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedCategory(dept.id)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === dept.id
                      ? "bg-[#C58E2A] border-[#C58E2A] text-white"
                      : "bg-white border-[#e6e0d3] text-[#201c17] hover:border-[#C58E2A]"
                  }`}
                >
                  {dept.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div
          className={`grid gap-6 sm:gap-8 ${
            gridCols === 4
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : gridCols === 3
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {filteredProducts.map((product) => (
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

