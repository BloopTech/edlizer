"use client";

import React from "react";
import { Sparkles, Droplets, Sun, Shield, Leaf, HeartHandshake } from "lucide-react";

export const SensorialFeatures: React.FC = () => {
  return (
    <section className="py-20 bg-[#f7f4ee] border-y border-[#e6e0d3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="rs-eyebrow justify-center text-[#b58124]">
            Unfiltered Science
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171512]">
            High-Bioavailability Botanical Formulations
          </h2>
          <p className="text-base text-[#6f6a60] font-light leading-relaxed">
            Every drop is consciously formulated with bio-compatible lipids and clinically active botanical concentrations that penetrate deeply without disrupting your skin's natural microbiome.
          </p>
        </div>

        {/* 3 Interactive Feature Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#e6e0d3] flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f7f4ee] text-[#b58124] flex items-center justify-center group-hover:bg-[#171512] group-hover:text-white transition-colors">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#171512]">
                Lipid Barrier Restoration
              </h3>
              <p className="text-sm text-[#6f6a60] font-light leading-relaxed">
                Biomimetic ceramides 1, 3, and 6-II lock in multi-depth hydration and fortify the stratum corneum against urban particulate matter.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e6e0d3] flex items-center justify-between text-xs font-semibold text-[#b58124] uppercase tracking-wider">
              <span>98% Barrier Repair Rate</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#e6e0d3] flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f7f4ee] text-[#b58124] flex items-center justify-center group-hover:bg-[#171512] group-hover:text-white transition-colors">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#171512]">
                Instant Glass Radiance
              </h3>
              <p className="text-sm text-[#6f6a60] font-light leading-relaxed">
                High-purity botanical Vitamin C from Kakadu plum combined with ferulic acid provides steady photo-protection and eliminates dullness.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e6e0d3] flex items-center justify-between text-xs font-semibold text-[#b58124] uppercase tracking-wider">
              <span>Zero Oxidation Formula</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#e6e0d3] flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#f7f4ee] text-[#b58124] flex items-center justify-center group-hover:bg-[#171512] group-hover:text-white transition-colors">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#171512]">
                Cold-Pressed Bio-Potency
              </h3>
              <p className="text-sm text-[#6f6a60] font-light leading-relaxed">
                Heat-free extraction processes preserve essential omega fatty acids 3, 6, and 9 for maximum cellular nourishment and firm elasticity.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e6e0d3] flex items-center justify-between text-xs font-semibold text-[#b58124] uppercase tracking-wider">
              <span>100% Active Ingredients</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
