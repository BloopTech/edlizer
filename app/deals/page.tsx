"use client";

import Link from "next/link";
import { Flame, Tag, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import {
  getOnOffer,
  getBestSellers,
  getLowStock,
  discountPercent,
} from "@/lib/products";
import { useStore } from "@/components/StoreShell";

/**
 * Deals & Offers. Everything here is driven by real catalogue data — a product
 * only appears under "on offer" if it actually carries an `originalPrice`, and
 * "last few left" reads the real stock count. Nothing is discounted for show.
 */
export default function DealsPage() {
  // Read the live catalogue so a price change in Sanity lands here immediately.
  const { products } = useStore();
  const productsOnOffer = getOnOffer(products);
  const bestSellers = getBestSellers(products);
  const lowStock = getLowStock(products);

  const topSaving = productsOnOffer.reduce(
    (best, p) => Math.max(best, discountPercent(p)),
    0
  );

  return (
    <div className="pt-[72px] lg:pt-[80px] bg-white">
      {/* ---------- Masthead ---------- */}
      <header className="bg-[#171512] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-[#C58E2A]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50 flex items-center gap-2 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden>—</span>
            <span className="text-white">Deals &amp; Offers</span>
          </nav>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03]">
            Deals &amp; <span className="italic text-[#E3B358]">Offers</span>
          </h1>

          <p className="mt-5 text-[15px] sm:text-base text-white/70 font-light leading-relaxed max-w-xl">
            Price cuts on genuine stock — never on authenticity. Every reduction
            here is a real one, on a product sourced straight from the house that
            makes it.
          </p>

          {productsOnOffer.length > 0 && (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#C58E2A] text-[#171512] px-5 py-2.5">
              <Flame className="w-4 h-4 fill-current" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                Up to {topSaving}% off right now
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ---------- Live offers ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[#e6e0d3]">
          <div>
            <div className="rs-eyebrow rs-eyebrow-gold text-[#C58E2A] mb-3">
              Live right now
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#171512]">
              On offer this week
            </h2>
          </div>
          <span className="text-[13px] text-[#6f6a60] tabular-nums">
            {productsOnOffer.length}{" "}
            {productsOnOffer.length === 1 ? "product" : "products"} reduced
          </span>
        </div>

        <div className="pt-8">
          {productsOnOffer.length > 0 ? (
            <ProductGrid products={productsOnOffer} />
          ) : (
            <div className="py-16 text-center">
              <Tag className="w-6 h-6 text-[#C58E2A] mx-auto" strokeWidth={1.5} />
              <p className="font-display text-2xl text-[#171512] mt-4">
                No active offers today
              </p>
              <p className="text-[14px] text-[#6f6a60] font-light mt-2 max-w-md mx-auto">
                New reductions land regularly. Follow us on Instagram or browse
                the full collection in the meantime.
              </p>
            </div>
          )}
        </div>

        {productsOnOffer.length > 0 && productsOnOffer.length < 4 && (
          <p className="mt-8 text-[13.5px] text-[#6f6a60] font-light leading-relaxed max-w-2xl">
            We would rather run a short honest list than mark everything
            &ldquo;reduced&rdquo;. More lines go on offer as stock moves — the two
            edits below are worth a look while you are here.
          </p>
        )}
      </section>

      {/* ---------- Last few left ---------- */}
      {lowStock.length > 0 && (
        <section className="bg-[#f7f4ee] border-y border-[#e6e0d3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-[#e6e0d3]">
              <div>
                <div className="rs-eyebrow rs-eyebrow-gold text-[#C58E2A] mb-3">
                  Before it goes
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-[#171512]">
                  Last few left
                </h2>
                <p className="text-[14px] text-[#6f6a60] font-light mt-2 max-w-lg">
                  Eight units or fewer on the shelf. Restocks depend on the brand,
                  so these are not guaranteed to come back quickly.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-[#6f6a60]">
                <Clock className="w-4 h-4 text-[#C58E2A]" />
                {lowStock.length} lines
              </span>
            </div>

            <div className="pt-8">
              <ProductGrid products={lowStock.slice(0, 8)} />
            </div>
          </div>
        </section>
      )}

      {/* ---------- Best sellers ---------- */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="pb-6 border-b border-[#e6e0d3]">
            <div className="rs-eyebrow rs-eyebrow-gold text-[#C58E2A] mb-3">
              Customer favourites
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#171512]">
              What keeps selling out
            </h2>
          </div>

          <div className="pt-8">
            <ProductGrid products={bestSellers} />
          </div>
        </section>
      )}

      {/* ---------- Guarantee strip ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="rounded-3xl border border-[#e6e0d3] bg-[#f7f4ee] px-8 sm:px-12 py-12 flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
          <div className="max-w-xl">
            <ShieldCheck className="w-5 h-5 text-[#C58E2A]" strokeWidth={1.75} />
            <h3 className="font-display text-2xl text-[#171512] mt-4">
              A lower price is still the real product
            </h3>
            <p className="text-[14px] text-[#6f6a60] font-light leading-relaxed mt-3">
              Reduced lines carry the same 100% genuine guarantee as everything
              else we sell. Nothing here is a tester, a short-dated clearance or a
              parallel import.
            </p>
          </div>

          <Link
            href="/shop"
            className="shrink-0 inline-flex items-center gap-2.5 bg-[#171512] hover:bg-[#C58E2A] hover:text-[#171512] text-white transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full group"
          >
            <span>Shop everything</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
