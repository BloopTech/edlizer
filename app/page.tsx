"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection, heroSpotlightProduct } from "@/components/HeroSection";
import { BrandMarquee } from "@/components/BrandMarquee";
import { FeaturedProducts, featuredFoundations } from "@/components/FeaturedProducts";
import { SkincareHighlights, skincareHighlightsProducts } from "@/components/SkincareHighlights";
import { BeautyRitualBanner } from "@/components/BeautyRitualBanner";
import { LatestProducts, latestCatalogProducts } from "@/components/LatestProducts";
import { ProductCatalog, allEdlizerProducts } from "@/components/ProductCatalog";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { QuickViewModal } from "@/components/QuickViewModal";
import { CartDrawer, CartItem } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { AuthModal } from "@/components/AuthModal";
import { Footer } from "@/components/Footer";
import { Product } from "@/components/ProductCard";
import { client } from "@/sanity/client";
import { allProductsQuery } from "@/sanity/queries";

export default function Home() {
  const [sanityProducts, setSanityProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await client.fetch(allProductsQuery);
        if (data && data.length > 0) {
          setSanityProducts(data);
        }
      } catch (error) {
        console.error("Failed to fetch products from Sanity:", error);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  const allDisplayProducts =
    sanityProducts.length > 0 ? sanityProducts : allEdlizerProducts;

  const featuredFoundationsList =
    sanityProducts.length > 0
      ? sanityProducts.filter((p) =>
          p.category.toLowerCase().includes("foundation")
        )
      : featuredFoundations;

  const skincareHighlightsList =
    sanityProducts.length > 0
      ? sanityProducts.filter(
          (p) =>
            p.category.toLowerCase().includes("skincare") ||
            p.category.toLowerCase().includes("toner") ||
            p.category.toLowerCase().includes("serum") ||
            p.category.toLowerCase().includes("cleanser")
        )
      : skincareHighlightsProducts;

  const latestProductsList =
    sanityProducts.length > 0
      ? sanityProducts.filter(
          (p) =>
            p.isNew ||
            p.category.toLowerCase().includes("setting") ||
            p.category.toLowerCase().includes("mist") ||
            p.category.toLowerCase().includes("spray")
        )
      : latestCatalogProducts;

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: heroSpotlightProduct,
      quantity: 1,
      size: "Medium",
    },
    {
      product: {
        id: "good-molecules-discoloration-serum",
        name: "Good Molecules Discoloration Correcting Serum",
        category: "Face Serums, Skincare",
        price: 250.0,
        rating: 5.0,
        reviewCount: 520,
        stockCount: 11,
        isBestSeller: true,
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
      },
      quantity: 1,
      size: "30ml",
    },
  ]);

  const [wishlistIds, setWishlistIds] = useState<string[]>([
    "nars-radiant-foundation",
    "good-molecules-discoloration-serum",
    "beauty-creations-setting-powder",
  ]);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>("ALL");

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    size: string = "Standard"
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, size }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleBuyNow = (
    product: Product,
    quantity: number = 1,
    size: string = "Standard"
  ) => {
    handleAddToCart(product, quantity, size);
    setIsCartOpen(true);
  };

  const handleSelectDepartment = (category: string) => {
    setSelectedCatalogCategory(category);
    const element = document.getElementById("shop-all");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#201c17] selection:bg-[#C58E2A] selection:text-white">
      {/* Navigation with Glass Mega Menu & 10 Departments Breakdown */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onAddToCart={(prod) => handleAddToCart(prod)}
        onSelectCategory={handleSelectDepartment}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* 1. Hero Section: "Be Whoever You Want", "Beauty On Your Terms", "Shop cosmetics" CTA */}
        <HeroSection
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
        />

        {/* 2. Brands We Source From: Fenty Beauty, Lancôme, NYX, Maybelline, Garnier, MAC, L'Oréal, NARS, Sephora, Morphe */}
        <BrandMarquee />

        {/* 3. Featured Products - From Top Brands Around The World (NARS, Rimmel, Flawless) */}
        <FeaturedProducts
          products={featuredFoundationsList}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 4. Skincare Highlights (Simple Toner, Good Molecules Cleanser, Discoloration Serum, Cleanse Bar) */}
        <SkincareHighlights
          products={skincareHighlightsList}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 5. Beauty Ritual Banner & 10-Photo Lifestyle Gallery ("Elevate Your Beauty Ritual With Edlizer") */}
        <BeautyRitualBanner />

        {/* 6. Latest Products (Beauty Creations Powder, Creme Shop, Coola Setting SPF, Morphe 2 Mist) */}
        <LatestProducts
          products={latestProductsList}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* 7. Shop All Products: Multi-department catalog filter across all 10 beauty departments */}
        <ProductCatalog
          products={allDisplayProducts}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          selectedCategoryProp={selectedCatalogCategory}
        />

        {/* 8. Testimonials - What Our Clients Say! (Marilyn & Maame 5-star reviews) */}
        <TestimonialsSection />
      </main>

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
      />

      {/* Cart Drawer Slide-Over */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          alert("Proceeding to secure checkout via Mobile Money & Card payment.");
        }}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setQuickViewProduct(prod)}
        products={allDisplayProducts}
      />

      {/* Supabase Authentication & Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Luxury Footer with Newsletter Form, Hours, Phone, and Instagram/Facebook Links */}
      <Footer />
    </div>
  );
}

