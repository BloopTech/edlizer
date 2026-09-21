"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  ArrowRight,
  Star,
  ChevronRight,
  ShieldCheck,
  Tag,
  Gift,
  Palette,
  Heart,
  Layers,
} from "lucide-react";

export interface CategoryData {
  name: string;
  count: number;
  subcategories?: string[];
  featuredImage?: string;
  badge?: string;
  description?: string;
}

export const shopCategories: CategoryData[] = [
  {
    name: "Bath & Body",
    count: 1,
    subcategories: [
      "Body Lotion",
      "Body Scrub",
      "Body Wash / Shower Gel",
      "Hand Cream",
      "Hand Sanitizer",
      "Hand Wash",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    description: "Invigorating botanical cleansers, nourishing body washes & rich moisture balms.",
  },
  {
    name: "Brushes",
    count: 3,
    badge: "3 STYLES",
    featuredImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
    description: "Ultra-plush synthetic artistry brushes for precision blending and seamless application.",
  },
  {
    name: "Fragrance",
    count: 0,
    subcategories: ["Body Mist / Body Splash", "Perfumes"],
    featuredImage:
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=600&auto=format&fit=crop",
    description: "Captivating eau de parfums and all-day sensorial body splashes.",
  },
  {
    name: "Gift Sets",
    count: 0,
    badge: "CURATED",
    featuredImage:
      "https://images.unsplash.com/photo-1512290900672-1f02e604f8dd?q=80&w=600&auto=format&fit=crop",
    description: "Luxury bundled beauty rituals and skincare starter kits for effortless gifting.",
  },
  {
    name: "Hair Accessories",
    count: 0,
    featuredImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    description: "Pure mulberry silk bands, spa headbands, and vanity claw clips.",
  },
  {
    name: "Lip Care",
    count: 2,
    badge: "POPULAR",
    subcategories: [
      "Lip Balms & Treatment",
      "Lip Gloss",
      "Lip Liners",
      "Lip Mask",
      "Lip Scrub",
      "Lipstains",
      "Lipsticks",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
    description: "Plumping peptide elixirs, velvet lipstains, and barrier hydration balms.",
  },
  {
    name: "Makeup",
    count: 1,
    badge: "TOP BRAND SELECTION",
    subcategories: [
      "Blush",
      "Bronzer & Contour",
      "Concealer",
      "Eye Lash Adhesive",
      "Eyebrow Pencils",
      "Eyelashes",
      "Eyeliner",
      "Eyeshadow",
      "Eyeshadow Primer",
      "Face Powder",
      "Face Primer",
      "Foundation",
      "Highlighter",
      "Makeup Wipes & Removers",
      "Mascara",
      "Setting & Finishing Spray",
      "Setting Powder",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    description: "High-performance foundations, setting powders, and pigments from world-renowned brands.",
  },
  {
    name: "Nails",
    count: 0,
    featuredImage:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop",
    description: "Nourishing cuticle oils, salon-grade nail treatments, and glossy finishes.",
  },
  {
    name: "Skincare",
    count: 3,
    badge: "GLOW ESSENTIALS",
    subcategories: [
      "Eye Creams",
      "Eye Patches / Mask",
      "Face Creams",
      "Face Masks and Sheet Masks",
      "Face Moisturizer",
      "Face Serums",
      "Face Toners",
      "Face Wash or Cleanser",
      "Suncare and Sunscreen",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
    description: "Targeted clinical correctors, barrier toners, and potent antioxidant serums.",
  },
  {
    name: "Tools & Accessories",
    count: 0,
    featuredImage:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
    description: "Gua sha stones, precision beauty sponges, and compact vanity mirrors.",
  },
];

interface MegaMenuProps {
  activeMenu: string | null;
  onClose: () => void;
  onAddToCart?: (product: any) => void;
  onSelectCategory?: (category: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeMenu,
  onClose,
  onAddToCart,
  onSelectCategory,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<CategoryData>(
    shopCategories[6] // Default to Makeup
  );

  if (!activeMenu) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/60 shadow-[0_25px_60px_-15px_rgba(32,28,23,0.12)] z-50 animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* SHOP ALL MEGA MENU */}
        {activeMenu === "SHOP_ALL" && (
          <div className="grid grid-cols-12 gap-8">
            {/* Column 1: Category Directory */}
            <div className="col-span-4 border-r border-[#e6e0d3]/80 pr-6">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#e6e0d3]/60">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6f6a60] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C58E2A]" />
                  All Departments (10)
                </span>
                <span className="text-[10px] text-[#A49E91] font-mono">100% Genuine</span>
              </div>

              <div className="space-y-1 max-h-105 overflow-y-auto pr-2">
                {shopCategories.map((cat) => {
                  const isSelected = hoveredCategory.name === cat.name;
                  return (
                    <div
                      key={cat.name}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onClick={() => {
                        onSelectCategory?.(cat.name);
                        onClose();
                      }}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#171512] text-white shadow-sm"
                          : "text-[#201c17] hover:bg-[#f7f4ee]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${
                            isSelected ? "bg-[#C58E2A]" : "bg-[#e6e0d3] group-hover:bg-[#C58E2A]"
                          }`}
                        />
                        <span className="font-medium tracking-wide">
                          {cat.name}
                        </span>
                        {cat.badge && (
                          <span
                            className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              isSelected
                                ? "bg-[#C58E2A] text-white"
                                : "bg-[#fde6d2] text-[#c06a1c]"
                            }`}
                          >
                            {cat.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-mono text-[11px] ${
                            isSelected ? "text-[#C58E2A]" : "text-[#a49e91]"
                          }`}
                        >
                          ({cat.count})
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isSelected ? "translate-x-0.5 text-[#C58E2A]" : "text-[#e6e0d3]"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[#e6e0d3]/60 flex items-center justify-between">
                <Link
                  href="#shop-all"
                  onClick={onClose}
                  className="text-xs uppercase font-bold text-[#C58E2A] hover:text-[#9B6B18] transition-colors flex items-center gap-1.5"
                >
                  <span>View All Cosmetic & Skincare</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Column 2: Selected Department Subcategories breakdown */}
            <div className="col-span-4 border-r border-[#e6e0d3]/80 pr-6">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e6e0d3]/60">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#171512]">
                  {hoveredCategory.name} Subcategories
                </span>
                <span className="text-[10px] text-[#6f6a60] uppercase">
                  {hoveredCategory.subcategories
                    ? `${hoveredCategory.subcategories.length} Formats`
                    : "Curated Range"}
                </span>
              </div>

              {hoveredCategory.subcategories && hoveredCategory.subcategories.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 max-h-95 overflow-y-auto pr-1">
                  {hoveredCategory.subcategories.map((sub, i) => (
                    <Link
                      key={i}
                      href="#shop-all"
                      onClick={() => {
                        onSelectCategory?.(sub);
                        onClose();
                      }}
                      className="group p-2 rounded-lg hover:bg-[#f7f4ee] transition-colors flex items-center justify-between text-xs"
                    >
                      <span className="text-[#6f6a60] group-hover:text-[#171512] group-hover:font-medium transition-colors line-clamp-1">
                        {sub}
                      </span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#C58E2A] transition-opacity shrink-0" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#f7f4ee] border border-[#e6e0d3] text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-white text-[#C58E2A] flex items-center justify-center mx-auto shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-display font-medium text-sm text-[#171512]">
                      Curated {hoveredCategory.name} Edit
                    </h5>
                    <p className="text-xs text-[#6f6a60] mt-1 leading-relaxed">
                      {hoveredCategory.description ||
                        "Explore our verified authentic products sourced straight from top international beauty houses."}
                    </p>
                  </div>
                  <Link
                    href="#shop-all"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 bg-[#171512] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-full hover:bg-[#C58E2A] transition-colors"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {/* Verified Authentic Brands Sourced Marquee Indicator */}
              <div className="mt-4 p-3 bg-[#f7f4ee] rounded-xl border border-[#e6e0d3]">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a60] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2f8f5c]" />
                  <span>100% Genuine Brands Sourced:</span>
                </div>
                <div className="text-[11px] text-[#201c17] font-medium">
                  Fenty Beauty, NARS, Lancôme, MAC, Maybelline, NYX & Good Molecules
                </div>
              </div>
            </div>

            {/* Column 3: Featured Spotlight Product & Visual Editorial Card */}
            <div className="col-span-4 space-y-4">
              {/* Product Card */}
              <div className="bg-[#f7f4ee] rounded-2xl p-4 border border-[#e6e0d3] group relative flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6f6a60]">
                    Featured Top Pick
                  </span>
                  <span className="text-[10px] bg-[#fde6d2] text-[#c06a1c] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Global Bestseller
                  </span>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-xl bg-white p-2 border border-[#e6e0d3] shrink-0 overflow-hidden flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop"
                      alt="NARS Radiant Foundation"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-semibold text-[#6f6a60] uppercase tracking-wider">
                      Foundation • NARS
                    </div>
                    <h4 className="font-display text-sm font-semibold text-[#171512] group-hover:text-[#C58E2A] transition-colors truncate">
                      NARS Radiant Foundation
                    </h4>
                    <div className="flex items-center gap-1 my-1">
                      <div className="flex text-[#eea431]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#6f6a60]">5.0 (420)</span>
                    </div>
                    <div className="font-bold text-sm text-[#171512]">
                      GHS 740.00
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onAddToCart?.({
                      id: "nars-radiant-foundation",
                      name: "NARS Radiant Foundation",
                      category: "Foundation",
                      price: 740.0,
                      rating: 5.0,
                      reviewCount: 420,
                      stockCount: 8,
                      isBestSeller: true,
                      image:
                        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
                    })
                  }
                  className="mt-3 w-full bg-[#171512] text-white hover:bg-[#C58E2A] text-xs uppercase font-bold py-2.5 rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <span>Quick Add to Bag</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Visual Campaign Banner */}
              <div className="relative rounded-2xl overflow-hidden aspect-video group border border-[#e6e0d3]">
                <img
                  src={hoveredCategory.featuredImage || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop"}
                  alt={hoveredCategory.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#E3B358]">
                    Edlizer Beauty Outlet
                  </span>
                  <h4 className="font-display text-base font-bold leading-tight">
                    Beauty On Your Terms
                  </h4>
                  <p className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                    Empowering you to express yourself freely and be whoever you want to be.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEALS & OFFERS MEGA MENU */}
        {activeMenu === "DEALS" && (
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 p-6 rounded-2xl bg-linear-to-br from-[#f7f4ee] to-[#efe9de] border border-[#e6e0d3] flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] bg-[#d6552e] text-white font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <Flame className="w-3 h-3" /> Special Promo Deals
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#171512] mt-3">
                  High-Quality Cosmetic & Beauty Offers
                </h3>
                <p className="text-xs text-[#6f6a60] mt-2 leading-relaxed">
                  Discover unbeatable prices on genuine liquid foundations, face toners, discoloration serums, and ultra-fine baking powders.
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-[#e6e0d3]">
                <div className="text-xs font-semibold text-[#171512]">
                  Mondays - Saturdays, 9am - 5pm
                </div>
                <div className="text-xs text-[#6f6a60]">
                  Direct Boutique Line: <strong className="text-[#171512]">055 964 0640</strong>
                </div>
              </div>
            </div>

            <div className="col-span-8 grid grid-cols-2 gap-4">
              {[
                {
                  title: "Flawless Liquid Foundation",
                  category: "Foundation",
                  price: "GHS 55.00",
                  badge: "EVERYDAY VALUE",
                  image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
                  desc: "Silky, lightweight coverage that effortlessly evens complexion.",
                },
                {
                  title: "Simple Soothing Facial Toner",
                  category: "Face Toners, Skincare",
                  price: "GHS 100.00",
                  badge: "SKINCARE ESSENTIAL",
                  image: "https://images.unsplash.com/photo-1608248597359-00994d4d1685?q=80&w=600&auto=format&fit=crop",
                  desc: "100% alcohol-free calming toner with pro-vitamin B5 & chamomile.",
                },
                {
                  title: "Good Molecules Discoloration Correcting Serum",
                  category: "Face Serums, Skincare",
                  price: "GHS 250.00",
                  badge: "VIRAL FAVORITE",
                  image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
                  desc: "Formulated with tranexamic acid and niacinamide to fade hyperpigmentation.",
                },
                {
                  title: "Beauty Creations Setting Powder",
                  category: "Setting Powder",
                  price: "GHS 200.00",
                  badge: "FLAWLESS FINISH",
                  image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
                  desc: "Micro-milled pore-blurring baking powder for all-day matte perfection.",
                },
              ].map((deal, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#f7f4ee] border border-[#e6e0d3] flex gap-3.5 items-center group hover:border-[#C58E2A]/50 transition-all"
                >
                  <div className="w-16 h-16 rounded-lg bg-white p-1 overflow-hidden shrink-0 border border-[#e6e0d3]">
                    <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold uppercase text-[#C58E2A] bg-white px-1.5 py-0.5 rounded">
                      {deal.badge}
                    </span>
                    <h5 className="font-display font-semibold text-xs text-[#171512] group-hover:text-[#C58E2A] transition-colors truncate mt-1">
                      {deal.title}
                    </h5>
                    <p className="text-[10px] text-[#6f6a60] truncate">{deal.desc}</p>
                    <div className="font-bold text-xs text-[#d0263c] mt-0.5">{deal.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

