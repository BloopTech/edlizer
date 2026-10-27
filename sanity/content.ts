import { client } from "./client";
import { siteContentQuery } from "./queries";
import {
  defaultContent,
  toPhone,
  type DeliveryOption,
  type Faq,
  type GalleryImage,
  type HeroSlide,
  type SiteContent,
  type Testimonial,
} from "@/lib/site";

/** How long the storefront serves cached content before checking Sanity
 *  again — Studio edits go live within this many seconds. */
const REVALIDATE_SECONDS = 60;

type Maybe<T> = { [K in keyof T]?: T[K] | null } | null | undefined;

interface RawContent {
  settings?: {
    phones?: string[] | null;
    email?: string | null;
    hours?: Maybe<SiteContent["details"]["hours"]>;
    location?: Maybe<SiteContent["details"]["location"]>;
    instagram?: Maybe<{ handle: string; url: string }>;
    tiktok?: Maybe<{ handle: string; url: string }>;
  } | null;
  homepage?: {
    slides?: (Maybe<HeroSlide> & { hotspot?: { x: number; y: number } | null })[] | null;
    body?: string | null;
    primaryCta?: Maybe<{ label: string; href: string }>;
    secondaryCta?: Maybe<{ label: string; href: string }>;
    pillars?: Maybe<{ title: string; copy: string }>[] | null;
    testimonials?: Maybe<Testimonial>[] | null;
    gallery?: Maybe<GalleryImage>[] | null;
  } | null;
  shopInfo?: {
    delivery?: Maybe<DeliveryOption>[] | null;
    faqs?: Maybe<Faq>[] | null;
  } | null;
}

/** Field-by-field fallback: anything the editor left empty keeps its default. */
function fill<T extends object>(value: Maybe<T>, fallback: T): T {
  const out = { ...fallback };
  for (const k of Object.keys(fallback) as (keyof T)[]) {
    const v = value?.[k];
    if (v !== null && v !== undefined && v !== "") out[k] = v as T[keyof T];
  }
  return out;
}

/** Keeps only list items with their required fields; an empty list falls back
 *  to the defaults rather than leaving a hole in the page. */
function list<T>(items: unknown[] | null | undefined, keep: (item: T) => boolean, fallback: T[]): T[] {
  const kept = ((items ?? []).filter(Boolean) as T[]).filter(keep);
  return kept.length ? kept : fallback;
}

export function mergeContent(raw: RawContent | null): SiteContent {
  const d = defaultContent;
  const s = raw?.settings;
  const h = raw?.homepage;
  const i = raw?.shopInfo;

  const phones = (s?.phones ?? []).map((p) => p?.trim()).filter(Boolean) as string[];

  return {
    details: {
      phones: phones.length ? phones.map(toPhone) : d.details.phones,
      email: s?.email || d.details.email,
      hours: fill(s?.hours, d.details.hours),
      location: fill(s?.location, d.details.location),
      social: {
        instagram: fill(s?.instagram, d.details.social.instagram),
        tiktok: fill(s?.tiktok, d.details.social.tiktok),
      },
    },
    hero: {
      slides: list<HeroSlide>(
        (h?.slides ?? []).map((slide) =>
          slide && {
            src: slide.src ?? "",
            alt: slide.alt ?? "",
            kicker: slide.kicker ?? "",
            lead: slide.lead ?? "",
            accent: slide.accent ?? "",
            file: slide.file ?? undefined,
            objectPosition: slide.hotspot
              ? `${Math.round(slide.hotspot.x * 100)}% ${Math.round(slide.hotspot.y * 100)}%`
              : undefined,
          }
        ),
        (slide) => Boolean(slide.src && slide.lead),
        d.hero.slides
      ),
      body: h?.body || d.hero.body,
      primaryCta: fill(h?.primaryCta, d.hero.primaryCta),
      secondaryCta: fill(h?.secondaryCta, d.hero.secondaryCta),
      pillars: list<{ title: string; copy: string }>(h?.pillars, (p) => Boolean(p.title), d.hero.pillars),
    },
    testimonials: list<Testimonial>(
      h?.testimonials,
      (t) => Boolean(t.author && t.quote),
      d.testimonials
    ),
    gallery: list<GalleryImage>(h?.gallery, (g) => Boolean(g.url), d.gallery).map((g) => ({
      url: g.url,
      title: g.title ?? "",
      tag: g.tag ?? "",
    })),
    delivery: list<DeliveryOption>(
      i?.delivery,
      (o) => Boolean(o.label) && typeof o.fee === "number",
      d.delivery
    ).map((o) => ({ ...o, note: o.note ?? "" })),
    faqs: list<Faq>(i?.faqs, (f) => Boolean(f.q && f.a), d.faqs),
  };
}

/**
 * Site content for server components. Cached by Next for REVALIDATE_SECONDS;
 * if Sanity cannot be reached the built-in defaults are served instead.
 */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const raw = await client.fetch<RawContent>(
      siteContentQuery,
      {},
      { next: { revalidate: REVALIDATE_SECONDS, tags: ["site-content"] } }
    );
    return mergeContent(raw);
  } catch (err) {
    console.error("Falling back to built-in site content:", err);
    return defaultContent;
  }
}
