"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Truck,
  Check,
  ArrowLeft,
  Smartphone,
  CreditCard,
  Banknote,
} from "lucide-react";
import { useStore } from "@/components/StoreShell";
import { siteDetails, allPhonesDisplay } from "@/lib/site";

const DELIVERY = [
  {
    id: "accra",
    label: "Accra express",
    note: "Dispatched today, delivered within 24 hours",
    fee: 30,
  },
  {
    id: "nationwide",
    label: "Nationwide",
    note: "Two to three working days anywhere in Ghana",
    fee: 60,
  },
  {
    id: "pickup",
    label: "Collect in store",
    note: `${siteDetails.hours.days}, ${siteDetails.hours.time}`,
    fee: 0,
  },
] as const;

const PAYMENT = [
  { id: "momo", label: "Mobile Money", note: "MTN, Telecel or AirtelTigo", icon: Smartphone },
  { id: "card", label: "Card", note: "Visa or Mastercard", icon: CreditCard },
  { id: "cash", label: "Cash on delivery", note: "Accra deliveries only", icon: Banknote },
] as const;

export default function CheckoutPage() {
  const { cartItems, subtotal, updateQuantity, removeItem, clearCart } = useStore();

  const [delivery, setDelivery] = useState<string>(DELIVERY[0].id);
  const [payment, setPayment] = useState<string>(PAYMENT[0].id);
  const [placed, setPlaced] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const deliveryFee = DELIVERY.find((d) => d.id === delivery)?.fee ?? 0;
  const total = subtotal + (cartItems.length ? deliveryFee : 0);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handlePlace = (e: React.FormEvent) => {
    e.preventDefault();
    // No payment gateway is connected yet, so the order is confirmed locally and
    // the shop follows up to take payment. Wiring a provider in means replacing
    // this handler only.
    const reference = `EDL-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setPlaced(reference);
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fieldClass =
    "w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-xl px-4 py-3 text-[14px] text-[#201c17] placeholder:text-[#a49e91] focus:outline-none focus:border-[#C58E2A] transition-colors";
  const labelClass =
    "block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#6f6a60] mb-2";

  /* ---------- Confirmation ---------- */
  if (placed) {
    return (
      <div className="pt-[72px] lg:pt-[80px] bg-white min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-[#2f8f5c]/10 text-[#2f8f5c] flex items-center justify-center mx-auto">
            <Check className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#171512] mt-6">
            Order received
          </h1>
          <p className="text-[15px] text-[#6f6a60] font-light leading-relaxed mt-4">
            Your reference is{" "}
            <span className="font-medium text-[#171512] tabular-nums">{placed}</span>.
            We will message you on {allPhonesDisplay} to confirm payment
            and delivery — usually within the hour during opening times.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="bg-[#171512] hover:bg-[#C58E2A] hover:text-[#171512] text-white transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full"
            >
              Keep shopping
            </Link>
            <Link
              href="/contact"
              className="border border-[#e6e0d3] hover:border-[#C58E2A] text-[#171512] transition-colors duration-300 text-[11px] font-semibold uppercase tracking-[0.2em] px-8 py-4 rounded-full"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Empty bag ---------- */
  if (cartItems.length === 0) {
    return (
      <div className="pt-[72px] lg:pt-[80px] bg-white min-h-[70vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="font-display text-3xl sm:text-4xl text-[#171512]">
            Your bag is empty
          </h1>
          <p className="text-[15px] text-[#6f6a60] font-light leading-relaxed mt-4">
            Nothing to check out yet. Have a look through the collection and come
            back when something catches your eye.
          </p>
          <Link
            href="/shop"
            className="mt-9 inline-flex items-center gap-2.5 bg-[#171512] hover:bg-[#C58E2A] hover:text-[#171512] text-white transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse the collection</span>
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- Checkout ---------- */
  return (
    <div className="pt-[72px] lg:pt-[80px] bg-white">
      <header className="bg-[#f7f4ee] border-b border-[#e6e0d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#a49e91] flex items-center gap-2 mb-5"
          >
            <Link href="/shop" className="hover:text-[#171512] transition-colors">
              Shop
            </Link>
            <span aria-hidden>—</span>
            <span className="text-[#171512]">Checkout</span>
          </nav>
          <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-tight text-[#171512]">
            Checkout
          </h1>
        </div>
      </header>

      <form
        onSubmit={handlePlace}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12"
      >
        {/* ---- Left: details ---- */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h2 className="font-display text-2xl text-[#171512] mb-6">
              Delivery details
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="co-name" className={labelClass}>Full name *</label>
                  <input id="co-name" required value={form.name} onChange={set("name")} placeholder="Ama Mensah" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="co-phone" className={labelClass}>Phone *</label>
                  <input id="co-phone" type="tel" required value={form.phone} onChange={set("phone")} placeholder="055 000 0000" className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="co-email" className={labelClass}>Email *</label>
                <input id="co-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@example.com" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="co-address" className={labelClass}>
                  Delivery address {delivery === "pickup" ? "(not needed for pickup)" : "*"}
                </label>
                <textarea
                  id="co-address"
                  required={delivery !== "pickup"}
                  rows={3}
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Street, area, nearest landmark"
                  className={`${fieldClass} resize-y`}
                />
              </div>
              <div>
                <label htmlFor="co-notes" className={labelClass}>
                  Order notes <span className="text-[#a49e91] normal-case">(optional)</span>
                </label>
                <textarea id="co-notes" rows={2} value={form.notes} onChange={set("notes")} placeholder="Shade preference, delivery timing, anything else" className={`${fieldClass} resize-y`} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#171512] mb-6">Delivery method</h2>
            <div className="space-y-3">
              {DELIVERY.map(({ id, label, note, fee }) => (
                <label
                  key={id}
                  className={`flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
                    delivery === id ? "border-[#171512] bg-[#f7f4ee]" : "border-[#e6e0d3] hover:border-[#C58E2A]"
                  }`}
                >
                  <input type="radio" name="delivery" value={id} checked={delivery === id} onChange={() => setDelivery(id)} className="accent-[#171512] w-4 h-4" />
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[#171512]">{label}</div>
                    <div className="text-[12.5px] text-[#6f6a60] font-light">{note}</div>
                  </div>
                  <div className="text-[14px] font-semibold text-[#171512] tabular-nums">
                    {fee === 0 ? "Free" : `GHS ${fee}`}
                  </div>
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#171512] mb-6">Payment</h2>
            <div className="space-y-3">
              {PAYMENT.map(({ id, label, note, icon: Icon }) => (
                <label
                  key={id}
                  className={`flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-colors ${
                    payment === id ? "border-[#171512] bg-[#f7f4ee]" : "border-[#e6e0d3] hover:border-[#C58E2A]"
                  }`}
                >
                  <input type="radio" name="payment" value={id} checked={payment === id} onChange={() => setPayment(id)} className="accent-[#171512] w-4 h-4" />
                  <Icon className="w-4 h-4 text-[#C58E2A]" strokeWidth={1.75} />
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-[#171512]">{label}</div>
                    <div className="text-[12.5px] text-[#6f6a60] font-light">{note}</div>
                  </div>
                </label>
              ))}
            </div>
            <p className="text-[12.5px] text-[#a49e91] font-light mt-4 leading-relaxed">
              No payment is taken on this page. We confirm your order first, then
              send payment details on WhatsApp — so nothing leaves your account
              before we have confirmed stock.
            </p>
          </section>
        </div>

        {/* ---- Right: summary ---- */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 rounded-2xl border border-[#e6e0d3] bg-[#f7f4ee] p-6 sm:p-7">
            <h2 className="font-display text-xl text-[#171512] pb-5 border-b border-[#e6e0d3]">
              Your order
            </h2>

            <ul className="divide-y divide-[#e6e0d3] max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="py-4 flex gap-4">
                  <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-white">
                    <Image src={item.product.image} alt={item.product.name} fill sizes="64px" className="object-contain p-1.5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#171512] leading-snug line-clamp-2">
                      {item.product.name}
                    </div>
                    {item.size && item.size !== "Standard" && (
                      <div className="text-[11.5px] text-[#6f6a60] mt-0.5">{item.size}</div>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <button type="button" onClick={() => updateQuantity(item.product.id, -1)} aria-label="Decrease quantity" className="w-6 h-6 rounded-full border border-[#e6e0d3] bg-white flex items-center justify-center hover:border-[#C58E2A] transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[13px] tabular-nums w-5 text-center">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.product.id, 1)} aria-label="Increase quantity" className="w-6 h-6 rounded-full border border-[#e6e0d3] bg-white flex items-center justify-center hover:border-[#C58E2A] transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button type="button" onClick={() => removeItem(item.product.id)} aria-label={`Remove ${item.product.name}`} className="ml-auto text-[#a49e91] hover:text-[#c72f5e] transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-[13px] font-semibold text-[#171512] tabular-nums whitespace-nowrap">
                    GHS {(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <dl className="pt-5 border-t border-[#e6e0d3] space-y-2.5 text-[13.5px]">
              <div className="flex justify-between">
                <dt className="text-[#6f6a60]">Subtotal</dt>
                <dd className="tabular-nums text-[#171512]">GHS {subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#6f6a60]">Delivery</dt>
                <dd className="tabular-nums text-[#171512]">
                  {deliveryFee === 0 ? "Free" : `GHS ${deliveryFee.toFixed(2)}`}
                </dd>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#e6e0d3]">
                <dt className="font-display text-lg text-[#171512]">Total</dt>
                <dd className="font-display text-lg text-[#171512] tabular-nums">
                  GHS {total.toFixed(2)}
                </dd>
              </div>
            </dl>

            <button
              type="submit"
              className="w-full mt-6 bg-[#171512] hover:bg-[#C58E2A] hover:text-[#171512] text-white transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-full"
            >
              Place order
            </button>

            <div className="mt-5 space-y-2.5 text-[12px] text-[#6f6a60] font-light">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2f8f5c] shrink-0" />
                <span>100% genuine guarantee on every item</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#C58E2A] shrink-0" />
                <span>{siteDetails.location.delivery}</span>
              </div>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
