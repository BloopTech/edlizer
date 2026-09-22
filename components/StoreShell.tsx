"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer, CartItem } from "./CartDrawer";
import { QuickViewModal } from "./QuickViewModal";
import { SearchModal } from "./SearchModal";
import { AuthModal } from "./AuthModal";
import { Product } from "./ProductCard";
import { edlizerProducts } from "@/lib/products";
import { client } from "@/sanity/client";
import { allProductsQuery } from "@/sanity/queries";

/**
 * Cart, wishlist and every overlay live here rather than in a page, so the
 * homepage and /shop share one bag, one search and one navigation instance.
 * Pages read what they need through `useStore()`.
 */
interface StoreValue {
  products: Product[];
  cartItems: CartItem[];
  cartCount: number;
  wishlistIds: string[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  buyNow: (product: Product, quantity?: number, size?: string) => void;
  toggleWishlist: (product: Product) => void;
  openQuickView: (product: Product) => void;
  openCart: () => void;
  openSearch: () => void;
  openAuth: () => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  /** Sends the shopper to /shop filtered by department. */
  goToDepartment: (category: string) => void;
}

const CART_KEY = "edlizer.cart";
const WISHLIST_KEY = "edlizer.wishlist";

const StoreContext = createContext<StoreValue | null>(null);

export function useStore(): StoreValue {
  const value = useContext(StoreContext);
  if (!value) {
    throw new Error("useStore must be used inside <StoreShell>");
  }
  return value;
}

export const StoreShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  /**
   * One catalogue fetch for the whole app. Sanity is not wired up yet, so a
   * failure is expected and simply leaves the local product set in place.
   */
  const [sanityProducts, setSanityProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch<Product[]>(allProductsQuery)
      .then((data) => {
        if (!cancelled && data?.length) setSanityProducts(data);
      })
      .catch(() => {
        /* Sanity not configured yet — the local catalogue stands in. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  /** False until the first persist pass has been skipped — see below. */
  const hydrated = useRef(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  /**
   * The bag and wishlist survive a refresh or a hard navigation. Storage can
   * throw in private mode, so every access is guarded and failure just means
   * starting empty rather than breaking the page.
   */
  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(CART_KEY);
      const savedWishlist = window.localStorage.getItem(WISHLIST_KEY);
      // Reading browser-only storage has to happen after mount — it cannot be a
      // lazy initialiser without breaking server rendering. This runs once, so
      // the rule's cascading-render concern does not apply.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedCart) setCartItems(JSON.parse(savedCart));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (savedWishlist) setWishlistIds(JSON.parse(savedWishlist));
    } catch {
      /* Unreadable storage — carry on with an empty bag. */
    }
  }, []);

  useEffect(() => {
    // Skip the mount pass: at that point cartItems is still the empty initial
    // value and writing it would clobber what we just read back.
    if (!hydrated.current) {
      hydrated.current = true;
      return;
    }
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch {
      /* Quota or private mode — the bag still works for this session. */
    }
  }, [cartItems, wishlistIds]);

  const catalogue = sanityProducts.length > 0 ? sanityProducts : edlizerProducts;

  const addToCart = useCallback(
    (product: Product, quantity = 1, size = "Standard") => {
      setCartItems((prev) => {
        const idx = prev.findIndex(
          (item) => item.product.id === product.id && item.size === size
        );
        if (idx > -1) {
          const next = [...prev];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
          return next;
        }
        return [...prev, { product, quantity, size }];
      });
      setIsCartOpen(true);
    },
    []
  );

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.product.id !== id) return [item];
        const quantity = item.quantity + delta;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      })
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  }, []);

  const goToDepartment = useCallback(
    (category: string) => {
      router.push(`/shop?category=${encodeURIComponent(category)}`);
    },
    [router]
  );

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const value = useMemo<StoreValue>(
    () => ({
      products: catalogue,
      cartItems,
      cartCount,
      wishlistIds,
      addToCart,
      buyNow: addToCart,
      toggleWishlist,
      openQuickView: setQuickViewProduct,
      openCart: () => setIsCartOpen(true),
      openSearch: () => setIsSearchOpen(true),
      openAuth: () => setIsAuthOpen(true),
      updateQuantity,
      removeItem,
      clearCart,
      subtotal,
      goToDepartment,
    }),
    [
      catalogue,
      cartItems,
      cartCount,
      subtotal,
      wishlistIds,
      addToCart,
      toggleWishlist,
      updateQuantity,
      removeItem,
      clearCart,
      goToDepartment,
    ]
  );

  return (
    <StoreContext.Provider value={value}>
      <div className="min-h-screen flex flex-col bg-white text-[#201c17] selection:bg-[#C58E2A] selection:text-white">
        <Navbar
          cartCount={cartCount}
          wishlistCount={wishlistIds.length}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenWishlist={() => setIsCartOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onAddToCart={(product) => addToCart(product)}
          onSelectCategory={goToDepartment}
        />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>

      <QuickViewModal
        key={quickViewProduct?.id ?? "none"}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        onBuyNow={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push("/checkout");
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setQuickViewProduct}
        products={catalogue}
      />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </StoreContext.Provider>
  );
};
