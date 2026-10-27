import { defineArrayMember, defineField, defineType } from "sanity";

/** Delivery choices offered at checkout and the contact page FAQs. */
export const shopInfo = defineType({
  name: "shopInfo",
  title: "Delivery & FAQs",
  type: "document",
  fields: [
    defineField({
      name: "deliveryOptions",
      title: "Delivery options",
      type: "array",
      description: "Offered at checkout in this order. The first one is selected by default.",
      of: [
        defineArrayMember({
          type: "object",
          name: "deliveryOption",
          fields: [
            defineField({ name: "label", title: "Name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "note", title: "Description", type: "string", description: "e.g. Delivered within 24 hours" }),
            defineField({
              name: "fee",
              title: "Fee (GHS)",
              type: "number",
              description: "Enter 0 for free.",
              validation: (r) => r.required().min(0),
            }),
          ],
          preview: {
            select: { title: "label", fee: "fee", note: "note" },
            prepare: ({ title, fee, note }) => ({
              title,
              subtitle: `${fee ? `GHS ${fee}` : "Free"}${note ? ` — ${note}` : ""}`,
            }),
          },
        }),
      ],
      validation: (r) => r.min(1).error("Checkout needs at least one delivery option."),
    }),
    defineField({
      name: "faqs",
      title: "Frequently asked questions",
      type: "array",
      description: "Shown on the contact page.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "question", title: "Question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Delivery & FAQs" }) },
});
