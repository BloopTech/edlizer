import { defineField, defineType } from "sanity";

/**
 * Contact details shown in the footer, navigation, contact page, checkout and
 * policies. A singleton: there is exactly one, opened from "Store details".
 */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Store details",
  type: "document",
  fields: [
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Written the way customers should see them, e.g. 055 036 2752. The first number is the one used for WhatsApp.",
      validation: (r) => r.min(1).error("Add at least one phone number."),
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "object",
      options: { columns: 2 },
      fields: [
        defineField({ name: "days", title: "Days", type: "string", description: "e.g. Mondays – Saturdays" }),
        defineField({ name: "time", title: "Times", type: "string", description: "e.g. 9:00 AM – 8:00 PM" }),
        defineField({ name: "note", title: "Note", type: "string", description: "e.g. Closed Sundays and public holidays" }),
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      options: { columns: 2 },
      fields: [
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
        defineField({ name: "delivery", title: "Delivery summary", type: "string", description: "One line shown on the contact page and checkout." }),
      ],
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "object",
      options: { columns: 2 },
      fields: [
        defineField({ name: "handle", title: "Handle", type: "string", description: "e.g. @edlizer_beauty_outlet" }),
        defineField({ name: "url", title: "Link", type: "url" }),
      ],
    }),
    defineField({
      name: "tiktok",
      title: "TikTok",
      type: "object",
      options: { columns: 2 },
      fields: [
        defineField({ name: "handle", title: "Handle", type: "string" }),
        defineField({ name: "url", title: "Link", type: "url" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Store details" }) },
});
