"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShopCatalogue } from "@/components/ShopCatalogue";
import { useStore } from "@/components/StoreShell";

function ShopContents() {
  const searchParams = useSearchParams();
  const {
    products,
    wishlistIds,
    addToCart,
    toggleWishlist,
    openQuickView,
  } = useStore();

  // The mega menu and every "shop" link route here with ?category=…
  const department = searchParams.get("category") ?? undefined;

  return (
    // The header is fixed and out of flow, so this route clears it itself —
    // only the hero deliberately runs underneath the navigation.
    <div className="pt-[72px] lg:pt-[80px]">
      <ShopCatalogue
        // Remount on department change so the filter state follows the URL
        // rather than sticking on the first value it saw.
        key={department ?? "all"}
        products={products}
        initialDepartment={department}
        onQuickView={openQuickView}
        onAddToCart={(product) => addToCart(product)}
        onToggleWishlist={toggleWishlist}
        wishlistIds={wishlistIds}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    // useSearchParams needs a Suspense boundary so the route can still be
    // prerendered; the fallback holds the page height to avoid a jump.
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContents />
    </Suspense>
  );
}
