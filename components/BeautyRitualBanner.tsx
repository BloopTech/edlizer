"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Eye, X } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export const BeautyRitualBanner: React.FC = () => {
  const { gallery: galleryImages, details } = useSiteContent();
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <section id="beauty-ritual" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Heroic Ritual Banner Box */}
        <div className="relative rounded-3xl overflow-hidden bg-[#171512] text-white p-8 sm:p-14 lg:p-20 shadow-2xl mb-16 border border-[#2e2a24]">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C58E2A]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#d6552e]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-[11px] font-semibold tracking-[0.2em] uppercase text-[#E3B358]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Daily Regimen</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Elevate Your Beauty Ritual With Edlizer
            </h2>

            <p className="text-base sm:text-lg text-[#efe9de]/85 font-light leading-relaxed max-w-2xl">
              Elevate your beauty ritual with authentic products from Edlizer Beauty. From morning radiance awakenings to high-glam evening self-expression, experience beauty on your own terms.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/beauty-ritual"
                className="bg-[#C58E2A] hover:bg-[#E3B358] text-[#171512] font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] px-8 py-4 rounded-full transition-all shadow-lg flex items-center gap-2 group"
              >
                <span>Explore The Ritual</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={details.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] px-7 py-4 rounded-full backdrop-blur-md transition-colors"
              >
                <svg className="w-4 h-4 text-[#E3B358] fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span>Follow {details.social.instagram.handle}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 10-Image Lifestyle Photo Gallery */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="rs-eyebrow text-[#C58E2A]">
                Visual Inspiration
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#171512] mt-1">
                The 10-Photo Lifestyle & Beauty Gallery
              </h3>
            </div>
            <p className="text-xs text-[#6f6a60] uppercase tracking-wider font-semibold">
              Tap any photo to view in high resolution
            </p>
          </div>

          {/* 10-Image Grid (Responsive 2 / 5 columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhoto(img.url)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[#efe9de] border border-[#e6e0d3] cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#E3B358]">
                    {img.tag}
                  </span>
                  <div className="font-display text-xs font-semibold truncate">
                    {img.title}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-white/80 mt-1">
                    <Eye className="w-3 h-3" /> View Zoom
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal for Gallery */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative max-w-3xl w-full max-h-[90vh] bg-transparent flex flex-col items-center">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#E3B358] p-2"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={activePhoto}
                alt="Enlarged beauty ritual"
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
