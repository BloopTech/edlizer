"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, Sparkles, ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { productsByIds, productById } from "@/lib/products";
import { siteAssets } from "@/lib/assets";

/**
 * The ritual routines are curated by step, referencing real catalogue ids.
 * `productsByIds` drops anything that has been delisted, so a routine degrades
 * to fewer steps rather than rendering a broken card.
 */
const ROUTINES = [
  {
    key: "morning",
    icon: Sun,
    title: "The morning ritual",
    time: "5 minutes",
    intro:
      "Clean, calm, protected. The point of a morning routine is not to do a lot — it is to leave skin ready for whatever goes on top of it.",
    steps: [
      {
        step: "Cleanse",
        id: "simple-moisturizing-facial-wash",
        why: "A gentle wash that lifts the night off without stripping your barrier.",
      },
      {
        step: "Tone",
        id: "simple-soothing-facial-toner",
        why: "Chamomile and pro-vitamin B5 settle redness and prep skin to absorb what follows.",
      },
      {
        step: "Treat",
        id: "good-molecules-discoloration-serum",
        why: "Tranexamic acid works on dark marks over weeks, not days. Consistency beats intensity.",
      },
      {
        step: "Moisturise",
        id: "cerave-daily-moisturizing-lotion",
        why: "Ceramides and hyaluronic acid hold hydration in for the rest of the day.",
      },
      {
        step: "Protect",
        id: "cosrx-aloe-suncream",
        why: "SPF50+ PA+++ with no white cast. The single step that changes skin most over time.",
      },
    ],
  },
  {
    key: "evening",
    icon: Moon,
    title: "The evening ritual",
    time: "8 minutes",
    intro:
      "Take the day off properly, then let the actives do their work while you sleep. Skin repairs overnight — give it something to work with.",
    steps: [
      {
        step: "Remove",
        id: "good-molecules-acne-foaming-cleanser",
        why: "2% salicylic acid clears the pore-clogging residue makeup leaves behind.",
      },
      {
        step: "Clarify",
        id: "salicylic-acid-cleanser",
        why: "A second, gentler pass for anyone prone to congestion along the nose and chin.",
      },
      {
        step: "Essence",
        id: "ginseng-essence-water",
        why: "Ginseng-infused hydration that revives dull skin before your heavier steps.",
      },
      {
        step: "Seal",
        id: "cosrx-oil-free-lotion",
        why: "Oil-free birch sap moisture — enough for oily skin, never heavy under a pillow.",
      },
    ],
  },
  {
    key: "glam",
    icon: Sparkles,
    title: "The full-glam ritual",
    time: "20 minutes",
    intro:
      "For the nights that deserve it. Prep properly and the finish holds until you decide to take it off.",
    steps: [
      {
        step: "Grip",
        id: "elf-power-grip-primer",
        why: "A clear gel base that makeup genuinely sticks to. Give it 30 seconds to set.",
      },
      {
        step: "Base",
        id: "nars-radiant-foundation",
        why: "Buildable medium-to-full coverage with a luminous, skin-true finish.",
      },
      {
        step: "Set",
        id: "beauty-creations-setting-powder",
        why: "Talc-free and flashback-free — critical if there will be a camera.",
      },
      {
        step: "Lips",
        id: "nyx-lip-lingerie-ruffle-trim",
        why: "Weightless liquid lipstick that will not transfer onto a glass all night.",
      },
      {
        step: "Lock",
        id: "mac-prep-prime-fix",
        why: "The pro-artistry mist that melts powder into skin and holds the whole thing together.",
      },
    ],
  },
] as const;

export default function BeautyRitualPage() {
  return (
    <div className="pt-[72px] lg:pt-[80px] bg-white">
      {/* ---------- Masthead ---------- */}
      <header className="relative overflow-hidden bg-[#0d0b09] text-white">
        <div className="absolute inset-0">
          <Image
            src={siteAssets.hero.mainImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[52%_16%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(97deg,rgba(8,6,5,0.95)_0%,rgba(11,8,6,0.8)_38%,rgba(24,16,11,0.45)_65%,rgba(40,26,17,0.15)_88%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50 flex items-center gap-2 mb-7"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span aria-hidden>—</span>
            <span className="text-white">Beauty Ritual</span>
          </nav>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] max-w-2xl">
            Elevate your <span className="italic text-[#E3B358]">beauty ritual</span>
          </h1>

          <p className="mt-6 text-[15px] sm:text-[17px] text-white/75 font-light leading-[1.75] max-w-xl">
            Three routines built from what is actually on our shelves — morning,
            evening, and the nights that call for everything. Every step names the
            product and explains why it earns its place.
          </p>
        </div>
      </header>

      {/* ---------- Routine index ---------- */}
      <nav className="border-b border-[#e6e0d3] bg-[#f7f4ee] sticky top-[64px] lg:top-[72px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto no-scrollbar">
          {ROUTINES.map(({ key, icon: Icon, title, time }) => (
            <a
              key={key}
              href={`#${key}`}
              className="group shrink-0 flex items-center gap-2.5 px-4 sm:px-5 py-4 border-b-2 border-transparent hover:border-[#C58E2A] transition-colors"
            >
              <Icon className="w-4 h-4 text-[#C58E2A]" strokeWidth={1.75} />
              <span className="text-[13px] font-medium text-[#171512] whitespace-nowrap">
                {title.replace("The ", "").replace(" ritual", "")}
              </span>
              <span className="text-[11px] text-[#a49e91] whitespace-nowrap">
                {time}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- Routines ---------- */}
      {ROUTINES.map(({ key, icon: Icon, title, time, intro, steps }, routineIndex) => {
        const resolved = steps
          .map((s) => ({ ...s, product: productById(s.id) }))
          .filter((s) => s.product);

        return (
          <section
            key={key}
            id={key}
            className={`scroll-mt-32 ${
              routineIndex % 2 === 1 ? "bg-[#f7f4ee] border-y border-[#e6e0d3]" : ""
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-[#C58E2A]" strokeWidth={1.75} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a49e91]">
                    {time} · {resolved.length} steps
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-[#171512] mt-4 leading-tight">
                  {title}
                </h2>
                <p className="text-[15px] text-[#6f6a60] font-light leading-[1.8] mt-4">
                  {intro}
                </p>
              </div>

              {/* Numbered steps */}
              <ol className="mt-12 space-y-5">
                {resolved.map(({ step, why, product }, i) => (
                  <li
                    key={step}
                    className="group grid grid-cols-[auto_88px_1fr] sm:grid-cols-[auto_104px_1fr_auto] items-center gap-4 sm:gap-6 rounded-2xl border border-[#e6e0d3] bg-white p-4 sm:p-5 hover:border-[#C58E2A] transition-colors"
                  >
                    <span className="font-display text-2xl sm:text-3xl text-[#e6e0d3] group-hover:text-[#C58E2A] transition-colors tabular-nums w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f7f4ee]">
                      <Image
                        src={product!.image}
                        alt={product!.name}
                        fill
                        sizes="104px"
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[#C58E2A]">
                        {step}
                      </div>
                      <h3 className="font-display text-[17px] sm:text-xl text-[#171512] mt-1 leading-snug">
                        {product!.name}
                      </h3>
                      <p className="text-[13px] text-[#6f6a60] font-light leading-relaxed mt-1.5">
                        {why}
                      </p>
                    </div>

                    <div className="hidden sm:block text-right shrink-0">
                      <div className="font-semibold text-[15px] text-[#201c17] tabular-nums">
                        GHS {product!.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] mt-1 ${
                          product!.stockCount > 0
                            ? "text-[#2f8f5c]"
                            : "text-[#c72f5e]"
                        }`}
                      >
                        {product!.stockCount > 0 ? "In stock" : "Out of stock"}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>

              {/* The routine, shoppable */}
              <div className="mt-12">
                <h3 className="font-display text-xl text-[#171512] mb-6">
                  Shop the {title.replace("The ", "").replace(" ritual", "")} ritual
                </h3>
                <ProductGrid
                  products={productsByIds(steps.map((s) => s.id))}
                  columns={4}
                />
              </div>
            </div>
          </section>
        );
      })}

      {/* ---------- Close ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="rounded-3xl bg-[#171512] text-white px-8 sm:px-14 py-14 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C58E2A]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">
              Not sure where to start?
            </h2>
            <p className="text-[15px] text-white/70 font-light leading-[1.8] mt-5">
              Tell us your skin type and what you are trying to fix. We will build
              a routine around what is in stock and your budget — no upselling,
              and no five-step answer to a two-step problem.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-[#C58E2A] hover:bg-[#E3B358] text-[#171512] transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full"
              >
                Ask for advice
              </Link>
              <Link
                href="/shop?category=Skincare"
                className="inline-flex items-center gap-2 border border-white/35 hover:border-[#E3B358] text-white hover:text-[#E3B358] transition-colors duration-300 text-[11px] font-semibold uppercase tracking-[0.2em] px-8 py-4 rounded-full group"
              >
                <span>Browse skincare</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
