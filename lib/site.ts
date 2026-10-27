import defaults from "./default-content.json";

/**
 * Everything on the storefront that the shop edits in the Studio rather than
 * in code: contact details, homepage copy and photography, delivery options
 * and FAQs.
 *
 * `default-content.json` is both the fallback the site renders when Sanity is
 * unreachable or a field is left empty, and the source the seed script pushes
 * into Sanity — so the two never drift apart.
 */

export interface Phone {
  display: string;
  tel: string;
  whatsapp: string;
}

export interface SiteDetails {
  phones: Phone[];
  email: string;
  hours: { days: string; time: string; note: string };
  location: { city: string; country: string; delivery: string };
  social: {
    instagram: { handle: string; url: string };
    tiktok: { handle: string; url: string };
  };
}

export interface HeroSlide {
  src: string;
  alt: string;
  kicker: string;
  lead: string;
  accent: string;
  /** Original filename, used to pick up the art direction for the campaign
   *  photographs even after they have been moved to Sanity's CDN. */
  file?: string;
  /** CSS object-position from the Studio hotspot, when the editor set one. */
  objectPosition?: string;
}

export interface HeroContent {
  slides: HeroSlide[];
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  pillars: { title: string; copy: string }[];
}

export interface Testimonial {
  author: string;
  role: string;
  quote: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  tag: string;
}

export interface DeliveryOption {
  id: string;
  label: string;
  note: string;
  fee: number;
}

export interface Faq {
  q: string;
  a: string;
}

export interface SiteContent {
  details: SiteDetails;
  hero: HeroContent;
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  delivery: DeliveryOption[];
  faqs: Faq[];
}

/**
 * Turns a number as the shop writes it ("055 036 2752") into dialable and
 * WhatsApp links. Local Ghanaian numbers drop the leading 0 for +233.
 */
export function toPhone(display: string): Phone {
  let digits = display.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("0")) digits = `233${digits.slice(1)}`;
  return { display, tel: `+${digits}`, whatsapp: `https://wa.me/${digits}` };
}

export const defaultContent: SiteContent = {
  ...defaults,
  details: { ...defaults.details, phones: defaults.details.phones.map(toPhone) },
};

/** The number to lead with wherever only one will fit. */
export const primaryPhone = (details: SiteDetails) => details.phones[0];

/** "055 036 2752 / 055 964 0640" */
export const allPhonesDisplay = (details: SiteDetails) =>
  details.phones.map((p) => p.display).join(" / ");
