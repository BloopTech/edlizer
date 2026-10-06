"use client";

import React, { useState } from "react";
import { Send, Check, AlertCircle } from "lucide-react";
import { siteDetails } from "@/lib/site";

const SUBJECTS = [
  "Product enquiry",
  "Order or delivery",
  "Returns & exchanges",
  "Shade matching advice",
  "Wholesale / bulk order",
  "Something else",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Contact form. There is no mail backend wired up yet, so on submit it composes
 * the message and hands it to the visitor's mail client — the enquiry reaches
 * the shop either way, and swapping in a real endpoint later means replacing
 * the body of `handleSubmit` only.
 */
export const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: SUBJECTS[0] as string,
    message: "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : null,
        "",
        form.message,
      ]
        .filter((line) => line !== null)
        .join("\n");

      const href =
        `mailto:${siteDetails.email}` +
        `?subject=${encodeURIComponent(`[${form.subject}] ${form.name}`)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = href;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const fieldClass =
    "w-full bg-[#f7f4ee] border border-[#e6e0d3] rounded-xl px-4 py-3 text-[14px] text-[#201c17] placeholder:text-[#a49e91] focus:outline-none focus:border-[#C58E2A] transition-colors";
  const labelClass =
    "block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#6f6a60] mb-2";

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[#e6e0d3] bg-[#f7f4ee] p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-[#2f8f5c]/10 text-[#2f8f5c] flex items-center justify-center mx-auto">
          <Check className="w-6 h-6" strokeWidth={2.5} />
        </div>
        <h3 className="font-display text-2xl text-[#171512] mt-5">
          Your mail app should be open
        </h3>
        <p className="text-[14px] text-[#6f6a60] font-light leading-relaxed mt-3 max-w-sm mx-auto">
          Send the draft and we will come back to you within one working day. If
          nothing opened, write to us directly at{" "}
          <a
            href={`mailto:${siteDetails.email}`}
            className="text-[#C58E2A] hover:text-[#171512] transition-colors"
          >
            {siteDetails.email}
          </a>
          .
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171512] hover:text-[#C58E2A] transition-colors"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Your name *
          </label>
          <input
            id="cf-name"
            required
            value={form.name}
            onChange={set("name")}
            placeholder="Ama Mensah"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email *
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone <span className="text-[#a49e91] normal-case">(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="055 000 0000"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cf-subject" className={labelClass}>
            What is it about?
          </label>
          <select
            id="cf-subject"
            value={form.subject}
            onChange={set("subject")}
            className={`${fieldClass} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23a49e91" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>')] bg-no-repeat bg-[right_1rem_center]`}
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message *
        </label>
        <textarea
          id="cf-message"
          required
          rows={6}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us what you need — the more detail the better, especially for shade matching."
          className={`${fieldClass} resize-y min-h-32`}
        />
      </div>

      {status === "error" && (
        <p className="flex items-center gap-2 text-[13px] text-[#c72f5e]">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please email us directly at{" "}
          {siteDetails.email}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2.5 bg-[#171512] hover:bg-[#C58E2A] hover:text-[#171512] disabled:opacity-60 text-white transition-colors duration-300 text-[11px] font-bold uppercase tracking-[0.2em] px-9 py-4 rounded-full group"
      >
        <span>{status === "sending" ? "Sending…" : "Send message"}</span>
        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>

      <p className="text-[12px] text-[#a49e91] font-light">
        We reply within one working day, {siteDetails.hours.days.toLowerCase()}.
      </p>
    </form>
  );
};
