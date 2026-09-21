"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  Clock,
  Send,
  ArrowUp,
  Check,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Logo } from "./Logo";

export const Footer: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().length > 3 && firstName.trim().length > 1) {
      setSubscribed(true);
      setTimeout(() => {
        setFirstName("");
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-[#171512] text-white pt-16 pb-12 border-t border-[#2e2a24] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup (from md file) */}
        <div id="newsletter" className="pb-16 border-b border-[#2e2a24]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Heading & Body copy */}
            <div className="lg:col-span-5 space-y-2">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E3B358]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join The VIP Beauty Circle</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-normal text-white">
                Subscribe To Our Newsletter
              </h3>
              <p className="text-sm text-[#a49e91] font-light leading-relaxed">
                Be the first to get the best deals and offers, all year round from Edlizer Beauty.
              </p>
            </div>

            {/* Form with First Name* and Email Address* */}
            <div className="lg:col-span-7">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-xl lg:ml-auto"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="FIRST NAME *"
                    className="w-full bg-white/5 border border-[#3f3a34] focus:border-[#C58E2A] rounded-full px-5 py-3.5 text-xs uppercase tracking-wider text-white placeholder-[#6f6a60] focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ADDRESS *"
                    className="w-full bg-white/5 border border-[#3f3a34] focus:border-[#C58E2A] rounded-full pl-9 pr-4 py-3.5 text-xs uppercase tracking-wider text-white placeholder-[#6f6a60] focus:outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-[#6f6a60] absolute left-3.5 top-4" />
                </div>
                <button
                  type="submit"
                  className="bg-[#C58E2A] hover:bg-[#E3B358] text-[#171512] text-xs font-semibold uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 text-[#171512]" /> Subscribed!
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Directory & Boutique Information (from md file) */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-[#2e2a24]">
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <Logo variant="light" size="md" />
            <p className="text-xs text-[#a49e91] font-light leading-relaxed">
              We empower you to express yourself freely and be whoever you want to be with genuine cosmetic & skincare products sourced straight from top brands around the world.
            </p>

            <div className="space-y-2.5 text-xs text-[#a49e91]">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C58E2A] shrink-0" />
                <span>Hours: Mondays - Saturdays, 9am - 5pm</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C58E2A] shrink-0" />
                <span>
                  Phone:{" "}
                  <a href="tel:0559640640" className="text-white hover:text-[#C58E2A] font-semibold">
                    055 964 0640
                  </a>
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C58E2A] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div>
                    <a href="mailto:admin@edlizerbeauty.com" className="hover:text-white">
                      admin@edlizerbeauty.com
                    </a>
                  </div>
                  <div>
                    <a href="mailto:Edlizerbeauty@gmail.com" className="hover:text-white">
                      Edlizerbeauty@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (from md file) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-lg font-medium text-white tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[#a49e91]">
              <li>
                <Link href="#shop-all" className="hover:text-[#E3B358] transition-colors">
                  Shop All Departments
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[#E3B358] transition-colors">
                  About Edlizer Beauty
                </Link>
              </li>
              <li>
                <Link href="#returns" className="hover:text-[#E3B358] transition-colors">
                  Returns & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-[#E3B358] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#deals" className="hover:text-[#E3B358] transition-colors">
                  Deals & Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Department Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-lg font-medium text-white tracking-wide">
              Departments
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[#a49e91]">
              <li>
                <a href="#shop-all" className="hover:text-[#E3B358] transition-colors">
                  Makeup (1)
                </a>
              </li>
              <li>
                <a href="#skincare-highlights" className="hover:text-[#E3B358] transition-colors">
                  Skincare (3)
                </a>
              </li>
              <li>
                <a href="#shop-all" className="hover:text-[#E3B358] transition-colors">
                  Brushes (3)
                </a>
              </li>
              <li>
                <a href="#shop-all" className="hover:text-[#E3B358] transition-colors">
                  Lip Care (2)
                </a>
              </li>
              <li>
                <a href="#shop-all" className="hover:text-[#E3B358] transition-colors">
                  Bath & Body (1)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Sourced Brands & Verified Authenticity */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-lg font-medium text-white tracking-wide">
              Top Brands Sourced
            </h4>
            <p className="text-xs text-[#a49e91] leading-relaxed">
              Fenty Beauty, Lancôme, NYX, Maybelline, Garnier, MAC Cosmetics, L'Oréal, NARS, Sephora, Morphe.
            </p>
            <div className="p-3.5 rounded-xl bg-white/5 border border-[#2e2a24] flex items-center gap-2.5 text-xs text-[#E3B358]">
              <ShieldCheck className="w-4 h-4 text-[#2f8f5c]" />
              <span>100% Batch-Verified Authenticity</span>
            </div>
          </div>
        </div>

        {/* Bottom Socials & Connect Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6f6a60]">
          <div>
            © 2026 EDLIZER BEAUTY. ALL RIGHTS RESERVED.
          </div>

          {/* Exact Social Links from markdown */}
          <div className="flex items-center gap-5 text-[#a49e91]">
            <span className="text-[11px] uppercase tracking-wider text-[#6f6a60]">Connect With Us:</span>
            <a
              href="https://www.instagram.com/edlizer_beauty_outlet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@edlizer_beauty_outlet</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100042219142355"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
              <span>Facebook Profile</span>
            </a>
          </div>

          {/* Quick Legal Links */}
          <div className="flex items-center gap-6 uppercase tracking-wider text-[11px]">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#returns" className="hover:text-white transition-colors">
              Returns
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-white text-[#171512] hover:bg-[#C58E2A] hover:text-white shadow-xl flex items-center justify-center transition-all duration-300 border border-[#e6e0d3]"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 stroke-2" />
      </button>
    </footer>
  );
};

