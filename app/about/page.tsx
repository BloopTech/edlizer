import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, Heart, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { siteAssets } from "@/lib/assets";
import { siteDetails } from "@/lib/site";
import { brandCounts, edlizerProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "About | Edlizer Beauty",
  description:
    "Edlizer Beauty is Ghana's premier beauty outlet — 100% genuine cosmetics and clinical skincare sourced straight from the houses that make them.",
};

const PILLARS = [
  {
    icon: Award,
    title: "Genuine, always",
    copy:
      "Every product is sourced straight from the house that makes it. No grey imports, no lookalikes — if it carries a brand name here, it came from that brand.",
  },
  {
    icon: Heart,
    title: "Beauty is for everyone",
    copy:
      "Age, gender, skin tone — none of it decides who gets to feel good. We stock complexion that runs from Ivory to Ebony Dark because a shade range should not stop halfway.",
  },
  {
    icon: Sparkles,
    title: "Personal, not prescriptive",
    copy:
      "Nobody needs the same routine as everyone else. We would rather help you find the two things that work than sell you ten that don't.",
  },
];

export default function AboutPage() {
  const departmentCount = new Set(
    edlizerProducts.flatMap((p) => p.categories ?? [p.category])
  ).size;

  return (
    <div className="pt-[72px] lg:pt-[80px] bg-white">
      {/* ---------- Masthead ---------- */}
      <header className="relative overflow-hidden bg-[#0d0b09] text-white">
        <div className="absolute inset-0">
          <Image
            src={siteAssets.hero.afroGlow}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[48%_35%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(97deg,rgba(8,6,5,0.95)_0%,rgba(11,8,6,0.82)_35%,rgba(24,16,11,0.5)_62%,rgba(40,26,17,0.18)_85%)]" />
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
            <span className="text-white">About</span>
          </nav>

          <h1 className="font-display text-[clamp(2.75rem,6.5vw,4.5rem)] leading-[1.02] max-w-3xl">
            Beauty on <span className="italic text-[#E3B358]">your terms</span>
          </h1>

          <p className="mt-6 text-[15px] sm:text-[17px] text-white/75 font-light leading-[1.75] max-w-xl">
            Edlizer Beauty is a beauty house in {siteDetails.location.city}. We
            exist to put genuine, international-standard cosmetics and clinical
            skincare within reach — and to let you decide what to do with them.
          </p>
        </div>
      </header>

      {/* ---------- Numbers ---------- */}
      <section className="border-b border-[#e6e0d3] bg-[#f7f4ee]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { figure: `${brandCounts.length}`, label: "Global houses stocked" },
            { figure: `${departmentCount}`, label: "Beauty departments" },
            { figure: "100%", label: "Genuine guarantee" },
            { figure: "Nationwide", label: "Delivery across Ghana" },
          ].map(({ figure, label }) => (
            <div key={label}>
              <div className="font-display text-3xl sm:text-4xl text-[#171512]">
                {figure}
              </div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#6f6a60] mt-2">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Story ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="rs-eyebrow rs-eyebrow-gold text-[#C58E2A] mb-5">
              Our story
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#171512] leading-tight">
              We got tired of guessing whether a product was real
            </h2>

            <div className="mt-7 space-y-5 text-[15px] text-[#6f6a60] font-light leading-[1.8]">
              <p>
                Anyone who has shopped for beauty in Ghana knows the feeling: a
                foundation that looked right online, arrived in the wrong
                packaging, and behaved like nothing the brand ever made. Counterfeit
                cosmetics are not a small annoyance — they sit on your skin.
              </p>
              <p>
                Edlizer started as the answer to that. We buy directly from
                renowned international houses — NARS, Rimmel London, MAC, COSRX,
                CeraVe, Good Molecules, e.l.f. and more — so that what reaches you
                is the same product the brand shipped. That is the whole promise,
                and everything else we do sits on top of it.
              </p>
              <p>
                From there it became something bigger than authenticity. It became
                about range: complexion that actually covers deep skin, skincare
                that treats real concerns rather than selling a mood, and advice
                that starts with your skin instead of our stock levels.
              </p>
            </div>

            <Link
              href="/shop"
              className="mt-9 inline-flex items-center gap-2.5 bg-[#171512] hover:bg-[#C58E2A] hover:text-[#171512] text-white transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full group"
            >
              <span>Shop the collection</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#efe9de]">
              <Image
                src={siteAssets.hero.mainImage}
                alt="Edlizer Beauty campaign portrait"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_18%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- What we stand for ---------- */}
      <section className="bg-[#f7f4ee] border-y border-[#e6e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <div className="rs-eyebrow rs-eyebrow-gold text-[#C58E2A] mb-5">
              What we stand for
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#171512] leading-tight">
              Three things we refuse to compromise on
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {PILLARS.map(({ icon: Icon, title, copy }) => (
              <div key={title}>
                <Icon className="w-5 h-5 text-[#C58E2A]" strokeWidth={1.75} />
                <h3 className="font-display text-xl text-[#171512] mt-5">
                  {title}
                </h3>
                <p className="text-[14px] text-[#6f6a60] font-light leading-[1.8] mt-3">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Guarantee + CTA ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="rounded-3xl bg-[#171512] text-white px-8 sm:px-14 py-14 lg:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C58E2A]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl">
            <ShieldCheck className="w-6 h-6 text-[#E3B358]" strokeWidth={1.75} />
            <h2 className="font-display text-3xl sm:text-4xl mt-5 leading-tight">
              The 100% genuine guarantee
            </h2>
            <p className="text-[15px] text-white/70 font-light leading-[1.8] mt-5">
              Every item we sell is batch-verified against the manufacturer before
              it reaches our shelves. If anything you buy from Edlizer is ever
              found not to be authentic, we will replace it or refund you in full —
              no argument, no restocking fee.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-[#C58E2A] hover:bg-[#E3B358] text-[#171512] transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full"
              >
                Talk to us
              </Link>
              <Link
                href="/shop"
                className="border border-white/35 hover:border-[#E3B358] text-white hover:text-[#E3B358] transition-colors duration-300 text-[11px] font-semibold uppercase tracking-[0.2em] px-8 py-4 rounded-full"
              >
                Browse products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
