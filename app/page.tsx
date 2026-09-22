"use client";


import { HeroSection } from "@/components/HeroSection";
import { BrandMarquee } from "@/components/BrandMarquee";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SkincareHighlights } from "@/components/SkincareHighlights";
import { BeautyRitualBanner } from "@/components/BeautyRitualBanner";
import { LatestProducts } from "@/components/LatestProducts";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { useStore } from "@/components/StoreShell";
import { shelves } from "@/lib/products";
import { Product } from "@/components/ProductCard";

export default function Home() {
  const {
    wishlistIds,
    addToCart,
    toggleWishlist,
    openQuickView,
  } = useStore();

  const shelfProps = {
    onQuickView: openQuickView,
    onAddToCart: (product: Product) => addToCart(product),
    onToggleWishlist: toggleWishlist,
    wishlistIds,
  };


  return (
    <>
      {/* 1. Campaign hero — "Beauty On Your Terms" */}
      <HeroSection />

      {/* 2. Brands we source from */}
      <BrandMarquee />

      {/* 3. Featured foundations from top global houses */}
      <FeaturedProducts
        products={shelves.featured}
        {...shelfProps}
      />

      {/* 4. Skincare highlights */}
      <SkincareHighlights
        products={shelves.skincare}
        {...shelfProps}
      />

      {/* 5. Beauty ritual banner & lifestyle gallery */}
      <BeautyRitualBanner />

      {/* 6. Latest arrivals */}
      <LatestProducts
        products={shelves.latest}
        {...shelfProps}
      />

      {/* 7. Client testimonials */}
      <TestimonialsSection />
    </>
  );
}
