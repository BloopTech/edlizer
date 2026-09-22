import React from "react";
import Link from "next/link";

export interface LegalSection {
  heading: string;
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  points?: string[];
}

/**
 * Shared shell for the policy pages so Privacy and Returns stay visually
 * identical and only their content differs.
 */
export const LegalPage: React.FC<{
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}> = ({ title, intro, updated, sections }) => (
  <div className="pt-[72px] lg:pt-[80px] bg-white">
    <header className="bg-[#f7f4ee] border-b border-[#e6e0d3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <nav
          aria-label="Breadcrumb"
          className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#a49e91] flex items-center gap-2 mb-6"
        >
          <Link href="/" className="hover:text-[#171512] transition-colors">
            Home
          </Link>
          <span aria-hidden>—</span>
          <span className="text-[#171512]">{title}</span>
        </nav>

        <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.05] text-[#171512]">
          {title}
        </h1>
        <p className="mt-5 text-[15px] text-[#6f6a60] font-light leading-relaxed max-w-2xl">
          {intro}
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#a49e91]">
          Last updated {updated}
        </p>
      </div>
    </header>

    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div className="space-y-12">
        {sections.map(({ heading, body, points }) => (
          <section key={heading}>
            <h2 className="font-display text-2xl text-[#171512] mb-4">
              {heading}
            </h2>
            <div className="space-y-4">
              {body.map((para) => (
                <p
                  key={para.slice(0, 40)}
                  className="text-[14.5px] text-[#6f6a60] font-light leading-[1.85]"
                >
                  {para}
                </p>
              ))}
            </div>
            {points && (
              <ul className="mt-5 space-y-2.5">
                {points.map((point) => (
                  <li
                    key={point.slice(0, 40)}
                    className="flex gap-3 text-[14.5px] text-[#6f6a60] font-light leading-[1.8]"
                  >
                    <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#C58E2A] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <div className="mt-16 pt-10 border-t border-[#e6e0d3]">
        <p className="text-[14px] text-[#6f6a60] font-light">
          Questions about this policy?{" "}
          <Link
            href="/contact"
            className="text-[#C58E2A] hover:text-[#171512] transition-colors font-medium"
          >
            Get in touch
          </Link>{" "}
          and we will talk it through.
        </p>
      </div>
    </article>
  </div>
);
