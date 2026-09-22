"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "./ProductCard";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu as MenuIcon,
  X,
  ChevronDown,
  User as UserIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import { MegaMenu, shopCategories } from "./MegaMenu";
import { useAuth } from "@/context/AuthContext";

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenSearch?: () => void;
  onOpenAuth?: () => void;
  onAddToCart?: (product: Product) => void;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount = 2,
  wishlistCount = 3,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAuth,
  onAddToCart,
  onSelectCategory,
}) => {
  const { user } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  // True while the header is still layered over a dark section (the campaign hero).
  const [overDarkSection, setOverDarkSection] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Drive the logo/nav theme off the section sitting underneath the header rather
   * than off a scroll offset: the header band is subtracted from the viewport, so the
   * dark treatment holds until the hero has fully passed behind the navigation.
   */
  useEffect(() => {
    const darkSection = document.querySelector("[data-nav-theme='dark']");

    if (!darkSection) {
      // Routes without a dark hero fall back to the light treatment. Deferring a
      // frame keeps the dark-first paint (and avoids a cascading render) for the
      // pages that do lead with the campaign hero.
      const frame = requestAnimationFrame(() => setOverDarkSection(false));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverDarkSection(entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(darkSection);
    return () => observer.disconnect();
  }, []);

  // The mega menu drops a light panel, so the header returns to its light treatment.
  const onDark = overDarkSection && !activeMenu;

  const navLinks = [
    { name: "SHOP ALL", id: "SHOP_ALL", hasMega: true, href: "/shop" },
    { name: "DEALS & OFFERS", id: "DEALS", hasMega: true, badge: "SAVE", href: "/deals" },
    { name: "BEAUTY RITUAL", href: "/beauty-ritual" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT US", href: "/contact" },
  ];

  // Shared themed class fragments — keeps the dark/light swap consistent across controls.
  const iconButtonClass = onDark
    ? "text-white/90 hover:text-[#E3B358] hover:bg-white/10"
    : "text-[#201c17] hover:text-[#C58E2A] hover:bg-[#f7f4ee]";
  const navLinkClass = onDark
    ? "text-white/90 hover:text-[#E3B358]"
    : "text-[#201c17] hover:text-[#C58E2A]";

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-40">
        {/* Text-safe gradient: strongest behind the nav, dissolving into the photograph */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-[260%] -z-10 transition-opacity duration-500 ease-out bg-[linear-gradient(to_bottom,rgba(8,6,5,0.8)_0%,rgba(8,6,5,0.62)_32%,rgba(8,6,5,0.34)_58%,rgba(8,6,5,0.12)_80%,rgba(8,6,5,0)_100%)] ${
            onDark && !isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Main Navigation Header — layered directly over the hero while it is dark */}
        <header
          className={`relative transition-[background-color,padding,box-shadow] duration-300 ease-out ${
            onDark
              ? isScrolled
                ? "bg-[#0d0b09]/80 backdrop-blur-xl border-b border-white/10"
                : "bg-transparent"
              : activeMenu
                ? // Solid while the mega menu is open so nothing bleeds through from the hero
                  "bg-[#fdfbf7] border-b border-[#e6e0d3]"
                : isScrolled
                  ? "bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/60 shadow-[0_10px_35px_-5px_rgba(23,21,18,0.08)]"
                  : "bg-white/90 backdrop-blur-md border-b border-[#e6e0d3]/60"
          } ${isScrolled ? "py-2.5" : "py-4"}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Hamburger Button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className={`p-2 -ml-2 rounded-full transition-colors duration-300 ${iconButtonClass}`}
                  aria-label="Open mobile menu"
                >
                  <MenuIcon className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              {/* Brand lockup — white over the dark hero, gold over light sections */}
              <div className="flex items-center">
                <Link href="/" className="focus:outline-none" aria-label="Edlizer Beauty — home">
                  <Logo
                    size={isScrolled ? "sm" : "md"}
                    crossfade
                    showWhite={onDark}
                    preload
                    className="transition-all duration-300"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Links with Mega Menus */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
                {navLinks.map((item) => (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => {
                      if (item.hasMega && item.id) setActiveMenu(item.id);
                      else setActiveMenu(null);
                    }}
                  >
                    {item.hasMega ? (
                      <Link
                        href={item.href || "#"}
                        onClick={() => setActiveMenu(null)}
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[12.5px] font-medium tracking-[0.08em] uppercase py-2 transition-colors duration-300 relative ${
                          activeMenu === item.id
                            ? "text-[#C58E2A]"
                            : navLinkClass
                        }`}
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-bold transition-colors duration-300 ${
                              onDark
                                ? "bg-[#C58E2A] text-[#171512]"
                                : "bg-[#fde6d2] text-[#c06a1c]"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <span
                          role="button"
                          tabIndex={0}
                          aria-label={`Toggle ${item.name} menu`}
                          aria-expanded={activeMenu === item.id}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveMenu(activeMenu === item.id ? null : item.id || null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveMenu(activeMenu === item.id ? null : item.id || null);
                            }
                          }}
                          className="inline-flex"
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              onDark ? "text-white/60" : "text-[#6f6a60]"
                            } ${activeMenu === item.id ? "rotate-180 text-[#C58E2A]" : ""}`}
                          />
                        </span>
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-[#C58E2A] transition-all duration-300 ${
                            activeMenu === item.id ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </Link>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        className={`inline-flex items-center gap-1 whitespace-nowrap text-[12.5px] font-medium tracking-[0.08em] uppercase py-2 transition-colors duration-300 relative group ${navLinkClass}`}
                      >
                        <span>{item.name}</span>
                        <span className="absolute bottom-0 left-0 h-0.5 bg-[#C58E2A] w-0 group-hover:w-full transition-all duration-300" />
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Right: Search, Account, Wishlist, Cart in GHS */}
              <div className="flex items-center gap-1 sm:gap-2.5">
                {/* Search */}
                <button
                  onClick={onOpenSearch}
                  className={`p-2 rounded-full transition-colors duration-300 flex items-center gap-1.5 text-xs uppercase font-medium tracking-wider ${iconButtonClass}`}
                  title="Search products"
                >
                  <Search className="w-5 h-5 stroke-[1.5]" />
                  <span className="hidden xl:inline text-[12px] font-sans">Search</span>
                </button>

                {/* User Account / Sign In */}
                <button
                  onClick={onOpenAuth}
                  className={`p-2 rounded-full transition-colors duration-300 flex items-center gap-1.5 text-xs uppercase font-medium tracking-wider ${iconButtonClass}`}
                  title={user ? "My Account" : "Sign In"}
                >
                  {user ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#C58E2A] text-[#171512] font-bold text-[11px] flex items-center justify-center">
                        {user.user_metadata?.full_name
                          ? user.user_metadata.full_name.charAt(0).toUpperCase()
                          : user.email?.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden xl:inline text-[12px] font-sans truncate max-w-20">
                        {user.user_metadata?.full_name?.split(" ")[0] || "Account"}
                      </span>
                    </div>
                  ) : (
                    <>
                      <UserIcon className="w-5 h-5 stroke-[1.5]" />
                      <span className="hidden xl:inline text-[12px] font-sans">Sign In</span>
                    </>
                  )}
                </button>

                {/* Wishlist */}
                <button
                  onClick={onOpenWishlist}
                  className={`p-2 rounded-full transition-colors duration-300 relative ${iconButtonClass}`}
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5 stroke-[1.5]" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-[#d6552e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                {/* Cart Drawer */}
                <button
                  onClick={onOpenCart}
                  className={`p-2 rounded-full transition-colors duration-300 relative flex items-center gap-1.5 ${iconButtonClass}`}
                  title="Shopping Bag"
                >
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                    {cartCount > 0 && (
                      <span
                        className={`absolute -top-1.5 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 shadow-xs transition-colors duration-300 ${
                          onDark
                            ? "bg-[#C58E2A] text-[#171512] ring-white/30"
                            : "bg-[#171512] text-white ring-white"
                        }`}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="hidden xl:inline text-[12px] font-sans uppercase font-semibold tracking-wider ml-1 whitespace-nowrap">
                    Bag ({cartCount})
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Mega Menu Overlay */}
          <MegaMenu
            activeMenu={activeMenu}
            onClose={() => setActiveMenu(null)}
            onAddToCart={onAddToCart}
            onSelectCategory={onSelectCategory}
          />
        </header>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="p-5 border-b border-[#e6e0d3] flex items-center justify-between bg-[#f7f4ee]">
              <Logo size="sm" variant="gold" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#efe9de] text-[#201c17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-[#e6e0d3]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch?.();
                }}
                className="w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-full pl-9 pr-4 py-2 text-xs text-left text-[#6f6a60] relative flex items-center"
              >
                <Search className="w-4 h-4 text-[#a49e91] absolute left-3" />
                <span>Search foundations, toners, powders...</span>
              </button>
            </div>

            {/* Navigation Accordion */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#a49e91] px-1 mb-1">
                Shop 10 Beauty Departments
              </div>

              {shopCategories.map((cat) => (
                <div key={cat.name} className="border-b border-[#e6e0d3]/60 pb-1.5">
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === cat.name ? null : cat.name
                      )
                    }
                    className="w-full flex items-center justify-between py-2 text-xs font-semibold text-[#201c17] uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-1.5">
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-sans tabular-nums text-[#a49e91]">
                        ({cat.count})
                      </span>
                    </span>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#6f6a60] transition-transform ${
                          mobileExpanded === cat.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {mobileExpanded === cat.name && cat.subcategories && (
                    <ul className="pl-3 py-1 space-y-1.5 text-xs text-[#6f6a60]">
                      {cat.subcategories.map((sub, idx) => (
                        <li key={idx}>
                          <a
                            href="/shop"
                            onClick={() => {
                              onSelectCategory?.(sub);
                              setMobileMenuOpen(false);
                            }}
                            className="block py-1 hover:text-[#C58E2A]"
                          >
                            • {sub}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="pt-4 space-y-2 text-xs uppercase font-semibold tracking-wider">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.();
                  }}
                  className="w-full text-left py-2 text-[#201c17] hover:text-[#C58E2A] flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-[#C58E2A]" />
                  <span>
                    {user
                      ? `Account (${user.user_metadata?.full_name || user.email})`
                      : "Sign In / Register"}
                  </span>
                </button>
                <Link
                  href="/beauty-ritual"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#201c17] hover:text-[#C58E2A]"
                >
                  Beauty Ritual
                </Link>
                <Link
                  href="/deals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#201c17] hover:text-[#C58E2A]"
                >
                  Deals & Offers
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#201c17] hover:text-[#C58E2A]"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-[#201c17] hover:text-[#C58E2A]"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Bottom Contact & Hours */}
            <div className="p-4 bg-[#f7f4ee] border-t border-[#e6e0d3] space-y-2 text-xs">
              <div className="font-semibold text-[#171512]">
                📞 055 964 0640
              </div>
              <div className="text-[#6f6a60] text-[11px]">
                Mondays - Saturdays, 9am - 5pm
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

