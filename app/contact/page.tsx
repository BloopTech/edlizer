import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, MessageCircle, AtSign, Truck } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { siteDetails } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Edlizer Beauty",
  description:
    "Reach Edlizer Beauty by phone, WhatsApp or email. Open Mondays to Saturdays, 9am–5pm, with nationwide delivery across Ghana.",
};

const FAQS = [
  {
    q: "How long does delivery take?",
    a: "Accra orders are dispatched the same working day and usually arrive within 24 hours. Elsewhere in Ghana, allow two to three working days.",
  },
  {
    q: "Can you help me find my foundation shade?",
    a: "Yes — message us on WhatsApp with a photo of your face in natural daylight (no filter) and the shade you currently wear in any other brand. We will match you against what is in stock.",
  },
  {
    q: "Are your products authentic?",
    a: "Every item is sourced directly from the brand or its authorised distributor and batch-verified before it reaches our shelves. If anything is ever found not to be genuine, we replace it or refund you in full.",
  },
  {
    q: "Do you take returns?",
    a: "Unopened items in original packaging can be returned within seven days. For hygiene reasons opened cosmetics cannot be returned unless the product is faulty.",
  },
];

export default function ContactPage() {
  const channels = [
    {
      icon: Phone,
      label: "Call us",
      value: siteDetails.phone.display,
      href: `tel:${siteDetails.phone.tel}`,
      note: `${siteDetails.hours.days}, ${siteDetails.hours.time}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: siteDetails.phone.display,
      href: siteDetails.phone.whatsapp,
      note: "Fastest for shade matching and order updates",
      external: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: siteDetails.emails.general,
      href: `mailto:${siteDetails.emails.general}`,
      note: `Also on ${siteDetails.emails.alternate}`,
    },
    {
      icon: AtSign,
      label: "Instagram",
      value: siteDetails.social.instagram.handle,
      href: siteDetails.social.instagram.url,
      note: "New arrivals and restock announcements",
      external: true,
    },
  ];

  return (
    <div className="pt-[72px] lg:pt-[80px] bg-white">
      {/* ---------- Masthead ---------- */}
      <header className="bg-[#f7f4ee] border-b border-[#e6e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#a49e91] flex items-center gap-2 mb-6"
          >
            <Link href="/" className="hover:text-[#171512] transition-colors">
              Home
            </Link>
            <span aria-hidden>—</span>
            <span className="text-[#171512]">Contact</span>
          </nav>

          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.03] text-[#171512]">
            Talk to us
          </h1>
          <p className="mt-5 text-[15px] sm:text-base text-[#6f6a60] font-light leading-relaxed max-w-xl">
            Shade advice, order tracking, a product you cannot find — whichever it
            is, a real person at the shop will answer. We are quickest on WhatsApp.
          </p>
        </div>
      </header>

      {/* ---------- Channels ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map(({ icon: Icon, label, value, href, note, external }) => (
            <a
              key={label}
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group rounded-2xl border border-[#e6e0d3] p-6 hover:border-[#C58E2A] hover:shadow-[0_14px_35px_-18px_rgba(23,21,18,0.3)] transition-all duration-300"
            >
              <Icon
                className="w-5 h-5 text-[#C58E2A]"
                strokeWidth={1.75}
              />
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#a49e91] mt-4">
                {label}
              </div>
              <div className="font-display text-lg text-[#171512] mt-1.5 group-hover:text-[#C58E2A] transition-colors break-words">
                {value}
              </div>
              <p className="text-[12.5px] text-[#6f6a60] font-light leading-relaxed mt-2">
                {note}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* ---------- Form + details ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <div className="rs-eyebrow rs-eyebrow-gold text-[#C58E2A] mb-4">
              Send a message
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#171512] mb-8">
              Tell us what you need
            </h2>
            <ContactForm />
          </div>

          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-[#171512] text-white p-8">
              <h3 className="font-display text-xl">Opening hours</h3>
              <div className="mt-5 space-y-3.5 text-[13.5px]">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C58E2A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white">{siteDetails.hours.days}</div>
                    <div className="text-white/60 font-light">
                      {siteDetails.hours.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C58E2A] shrink-0 mt-0.5" />
                  <div className="text-white/70 font-light">
                    {siteDetails.location.city}, {siteDetails.location.country}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-[#C58E2A] shrink-0 mt-0.5" />
                  <div className="text-white/70 font-light">
                    {siteDetails.location.delivery}
                  </div>
                </div>
              </div>
              <p className="text-[12px] text-white/45 font-light mt-5 pt-5 border-t border-white/10">
                {siteDetails.hours.note}
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl text-[#171512] mb-5">
                Before you write
              </h3>
              <dl className="space-y-5">
                {FAQS.map(({ q, a }) => (
                  <div
                    key={q}
                    className="pb-5 border-b border-[#e6e0d3] last:border-b-0 last:pb-0"
                  >
                    <dt className="text-[13.5px] font-semibold text-[#171512]">
                      {q}
                    </dt>
                    <dd className="text-[13px] text-[#6f6a60] font-light leading-[1.75] mt-1.5">
                      {a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
