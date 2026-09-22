"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Award,
  Heart,
} from "lucide-react";
import { siteAssets } from "@/lib/assets";


/**
 * Hero copy is kept as a single structured object so it can be lifted into a
 * Sanity `heroSection` document later without touching the layout below.
 */
export const heroContent = {
  /**
   * Campaign slider. Each frame carries its own focal point because the crops
   * differ (a tall portrait, a landscape, a full-length) — object-position
   * keeps the face out of the copy and away from the frame edges.
   */
  slides: [
    {
      src: siteAssets.hero.mainImage,
      alt: "Edlizer Beauty campaign portrait — model wearing a weightless full-coverage foundation",
      position: "object-[52%_12%] lg:object-[50%_8%]",
      frame: "",
    },
    {
      src: siteAssets.hero.afroGlow,
      alt: "Edlizer Beauty campaign portrait — luminous complexion with sculptural gold earrings",
      position: "object-[46%_38%] lg:object-[48%_42%]",
      frame: "",
    },
    {
      src: siteAssets.hero.goldCouture,
      alt: "Edlizer Beauty campaign portrait — gold couture and graphic liner",
      position: "object-[50%_10%] lg:object-[50%_12%]",
      frame: "origin-top scale-[1.8] lg:scale-100",
    },
  ],
  /**
   * One headline per campaign frame. The rotation is driven by the slider, so
   * the words change with the photograph rather than on a timer of their own.
   */
  headlines: [
    { kicker: "Ghana's premier beauty house", lead: "Beauty On", accent: "Your Terms" },
    { kicker: "100% genuine, always", lead: "Real Products.", accent: "Real Results." },
    { kicker: "Ivory to Ebony Dark", lead: "Your Shade", accent: "Exists Here" },
  ],
  body:
    "We empower you to express yourself freely and be whoever you want to be. Unleash your inner beauty with our wide range of authentic cosmetics and clinical skincare sourced straight from renowned global houses.",
  primaryCta: { label: "Shop Cosmetics", href: "#featured-products" },
  secondaryCta: { label: "Skincare Highlights", href: "#skincare-highlights" },
  pillars: [
    {
      icon: Award,
      title: "Genuine Quality Products",
      copy:
        "We source products straight from renowned international brands. Genuine products you can trust.",
    },
    {
      icon: Heart,
      title: "Inclusive Beauty",
      copy:
        "We believe beauty is for everyone, regardless of age, gender, or skin tone.",
    },
    {
      icon: Sparkles,
      title: "Personalized Solutions",
      copy:
        "Beauty is personal. We offer solutions tailored to your unique needs and preferences.",
    },
  ],
} as const;

const SLIDE_DURATION_MS = 6500;

export const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const headline =
    heroContent.headlines[activeSlide % heroContent.headlines.length];

  /**
   * Autoplay, unless the visitor has asked for reduced motion. Keyed on the
   * active slide so picking one from the indicators restarts the dwell time
   * instead of letting a timer that was already running cut it short.
   */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(
      () => setActiveSlide((i) => (i + 1) % heroContent.slides.length),
      SLIDE_DURATION_MS
    );
    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  return (
    <section
      id="hero"
      // Read by the navigation so the logo/nav theme follows the section beneath it.
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-[#0d0b09] text-white min-h-[100svh] lg:min-h-screen flex items-end lg:items-center"
    >
      {/* ---------- Campaign photograph ---------- */}
      <div className="absolute inset-0 -z-10">
        {/*
          Mobile keeps the portrait as the top band so the face is never crowded
          by copy. Desktop hands the right of the frame to the model: a narrower
          panel means less of the portrait is cropped away, and its left edge
          dissolves into the espresso field rather than ending on a hard line.
        */}
        {/* overflow-hidden keeps the slow drift from spilling past the panel's fade */}
        <div className="absolute inset-x-0 top-0 h-[70svh] overflow-hidden lg:inset-y-0 lg:right-0 lg:h-full lg:left-[27%] xl:left-[31%] 2xl:left-[36%]">
          <div
            className="hero-fade absolute inset-0"
            style={{ animationDuration: "1800ms" }}
          >
            {heroContent.slides.map((slide, i) => (
              <div
                key={slide.src}
                aria-hidden={i !== activeSlide}
                // Long crossfade: the frames dissolve into one another rather
                // than sliding, so the grade over them never appears to move.
                className="absolute inset-0 transition-opacity duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ opacity: i === activeSlide ? 1 : 0 }}
              >
                {/*
                  Mobile art direction: on frames whose subject sits flush with
                  the top of the photograph, object-position has no room to work,
                  so a top-anchored zoom drops the face clear of the navigation.
                */}
                <div className={`absolute inset-0 ${slide.frame}`}>
                  <div className="hero-drift absolute inset-0">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      preload={i === 0 || undefined}
                      sizes="(min-width: 1024px) 74vw, 100vw"
                      quality={90}
                      className={`object-cover contrast-[1.04] saturate-[1.03] ${slide.position}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: the left edge of the frame dissolves into the espresso field */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[46%] bg-[linear-gradient(to_right,#0d0b09_0%,rgba(13,11,9,0.97)_14%,rgba(18,13,10,0.82)_34%,rgba(28,19,13,0.5)_58%,rgba(38,25,16,0.2)_80%,rgba(38,25,16,0)_100%)]" />

          {/* Mobile: the photograph dissolves into the espresso panel that carries the copy. */}
          <div className="lg:hidden absolute inset-x-0 bottom-0 h-[55%] bg-[linear-gradient(to_top,#0d0b09_0%,rgba(13,11,9,0.94)_22%,rgba(22,15,11,0.72)_46%,rgba(30,20,14,0.34)_72%,rgba(30,20,14,0)_100%)]" />
        </div>

        {/* ---------- Layered cinematic grade ----------
            Deep black where the copy sits, warm espresso through the middle,
            then the photograph's own skin tones carry the right of the frame. */}

        {/* Desktop: the long horizontal falloff — black, then espresso, then the photograph's own light */}
        <div className="hidden lg:block absolute inset-0 bg-[linear-gradient(97deg,rgba(8,6,5,0.92)_0%,rgba(11,8,6,0.7)_22%,rgba(24,16,11,0.4)_40%,rgba(40,26,17,0.18)_58%,rgba(40,26,17,0.05)_75%,rgba(40,26,17,0)_90%)]" />

        {/* Mobile: lighter left wash so the portrait stays open */}
        <div className="lg:hidden absolute inset-0 bg-[linear-gradient(105deg,rgba(9,7,5,0.6)_0%,rgba(18,13,9,0.34)_38%,rgba(30,20,14,0.12)_66%,rgba(30,20,14,0)_92%)]" />

        {/* Warm espresso bloom around the model — keeps the shadows brown, never grey */}
        <div className="absolute inset-0 bg-[radial-gradient(90%_75%_at_74%_34%,rgba(96,58,30,0.24)_0%,rgba(52,32,19,0.1)_45%,rgba(13,11,9,0)_72%)]" />

        {/* Low gold key light on the copy side */}
        <div className="absolute inset-0 bg-[radial-gradient(46%_46%_at_16%_36%,rgba(197,142,42,0.16)_0%,rgba(197,142,42,0.04)_45%,rgba(197,142,42,0)_72%)]" />

        {/* Base of frame: anchors the supporting information */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,rgba(8,6,5,0.94)_0%,rgba(8,6,5,0.66)_34%,rgba(8,6,5,0.24)_68%,rgba(8,6,5,0)_100%)]" />

        {/* Crown of frame: carries the navigation gradient into the image */}
        <div className="absolute inset-x-0 top-0 h-[26%] bg-[linear-gradient(to_bottom,rgba(7,5,4,0.62)_0%,rgba(7,5,4,0.22)_55%,rgba(7,5,4,0)_100%)]" />

        {/* Cinema vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(118%_104%_at_50%_44%,rgba(6,4,3,0)_52%,rgba(6,4,3,0.34)_82%,rgba(6,4,3,0.6)_100%)]" />
      </div>

      {/* ---------- Copy ---------- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-[46svh] pb-16 sm:pb-20 lg:pt-32 lg:pb-14">
        <div className="max-w-[34rem] xl:max-w-[38rem]">
          {/* Headline — staggered line by line */}
          {/* Kicker */}
          <div
            key={`kicker-${activeSlide}`}
            className="flex items-center gap-3.5 mb-5 sm:mb-6"
          >
            <span
              className="rule-draw block h-px w-10 bg-[#C58E2A]"
              style={{ animationDelay: "80ms" }}
            />
            <span
              className="word-rise text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E3B358]"
              style={{ animationDelay: "140ms" }}
            >
              {headline.kicker}
            </span>
          </div>

          {/*
            Keyed on the slide so React remounts the words and the reveal
            replays each time the campaign frame changes.
          */}
          <h1
            key={`headline-${activeSlide}`}
            className="font-display font-normal tracking-[-0.02em] text-white text-[clamp(3.4rem,11vw,5rem)] lg:text-[clamp(5rem,6.6vw,7rem)] leading-[0.94]"
          >
            <span className="block">
              {headline.lead.split(" ").map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="word-rise"
                  style={{ animationDelay: `${220 + i * 90}ms` }}
                >
                  {word}
                  {i < headline.lead.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </span>
            <span className="block italic text-[#E3B358]">
              {headline.accent.split(" ").map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="word-rise"
                  style={{
                    animationDelay: `${
                      220 + (headline.lead.split(" ").length + i) * 90
                    }ms`,
                  }}
                >
                  {word}
                  {i < headline.accent.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h1>

          {/* Supporting copy */}
          <p
            className="hero-rise mt-5 sm:mt-6 font-body text-[13px] sm:text-[13.5px] lg:text-[14px] text-white/65 leading-[1.7] font-light max-w-md"
            style={{ animationDelay: "430ms" }}
          >
            {heroContent.body}
          </p>

          {/* Calls to action */}
          <div
            className="hero-rise mt-8 sm:mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4"
            style={{ animationDelay: "580ms" }}
          >
            <Link
              href={heroContent.primaryCta.href}
              className="gold-sheen relative overflow-hidden isolate bg-[#C58E2A] hover:bg-[#D9A23C] text-[#171512] transition-colors duration-300 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.18em] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-[0_14px_32px_-18px_rgba(197,142,42,0.9)] flex items-center gap-2 group font-sans"
            >
              <span>{heroContent.primaryCta.label}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href={heroContent.secondaryCta.href}
              className="border border-white/35 hover:border-[#E3B358] text-white hover:text-[#E3B358] transition-colors duration-300 text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.18em] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full flex items-center gap-2 font-sans"
            >
              <span>{heroContent.secondaryCta.label}</span>
            </Link>
          </div>

        </div>

        {/* Supporting pillars — hairline editorial row, not cards */}
        <div
          className="hero-rise mt-11 lg:mt-12 pt-7 border-t border-white/12 grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-8 lg:gap-10 lg:max-w-3xl xl:max-w-4xl"
          style={{ animationDelay: "760ms" }}
        >
          {heroContent.pillars.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-start gap-3.5">
              <Icon className="w-4 h-4 text-[#C58E2A] mt-0.5 shrink-0" strokeWidth={1.75} />
              <div>
                <div className="text-[10.5px] font-bold text-white uppercase tracking-[0.16em] font-sans">
                  {title}
                </div>
                <div className="text-[12.5px] text-white/55 mt-1.5 leading-relaxed font-light font-sans">
                  {copy}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Slide indicators ---------- */}
      <div
        className="hero-fade absolute z-10 right-5 lg:right-10 top-[calc(70svh-4.5rem)] lg:top-[calc(100svh-13rem)] flex flex-col gap-1"
        style={{ animationDelay: "1400ms" }}
      >
        {heroContent.slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(i)}
            aria-label={`Show campaign image ${i + 1} of ${heroContent.slides.length}`}
            aria-current={i === activeSlide}
            className="group py-1.5 flex justify-end cursor-pointer"
          >
            <span
              className={`block h-px transition-all duration-500 ease-out ${
                i === activeSlide
                  ? "w-9 bg-[#E3B358]"
                  : "w-5 bg-white/35 group-hover:w-7 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>

      {/* ---------- Scroll indicator ---------- */}
      <div
        // Anchored to the first viewport, not the section: on shorter screens the
        // hero runs past the fold and a bottom-anchored cue would never be seen.
        className="hero-fade hidden sm:flex absolute top-[calc(100svh-6.5rem)] right-6 lg:right-10 z-10 flex-col items-center gap-3 pointer-events-none"
        style={{ animationDelay: "1400ms" }}
      >
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.42em] text-white/45 font-sans pl-[0.42em]">
          Scroll
        </span>
        <span className="relative block h-12 w-px bg-white/15 overflow-hidden">
          <span className="hero-scroll-cue absolute inset-0 block bg-[linear-gradient(to_bottom,rgba(227,179,88,0)_0%,rgba(227,179,88,0.95)_50%,rgba(227,179,88,0)_100%)]" />
        </span>
      </div>
    </section>
  );
};
