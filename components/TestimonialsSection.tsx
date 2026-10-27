"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { useSiteContent } from "@/components/SiteContentProvider";

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useSiteContent();

  return (
    <section id="testimonials" className="py-20 bg-[#f7f4ee] border-b border-[#e6e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="rs-eyebrow justify-center text-[#C58E2A]">
            Real Experiences & Reviews
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171512] leading-tight">
            Testimonials — What Our Clients Say!
          </h2>
          <p className="text-base text-[#6f6a60] font-light">
            Discover why beauty lovers across Ghana trust Edlizer Beauty for 100% authentic international cosmetics and skincare.
          </p>
        </div>

        {/* 2 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e6e0d3] shadow-md flex flex-col justify-between relative group hover:border-[#C58E2A]/60 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* 5 Stars Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#eea431] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#C58E2A] uppercase tracking-wider">
                    5.0 / 5.0
                  </span>
                </div>

                {/* Quote Text */}
                <p className="font-display text-lg sm:text-xl text-[#171512] font-normal leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-[#e6e0d3] flex items-center gap-4">
                <div
                  aria-hidden
                  className="w-12 h-12 shrink-0 rounded-full bg-[#171512] text-[#E3B358] font-display text-lg flex items-center justify-center ring-2 ring-[#e6e0d3]"
                >
                  {t.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-semibold text-base text-[#171512]">
                      {t.author}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#2f8f5c] font-semibold bg-[#f7f4ee] px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                    </span>
                  </div>
                  <div className="text-xs text-[#6f6a60]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
