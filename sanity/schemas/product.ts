import { defineField, defineType } from "sanity";

/**
 * Mirrors the `Product` interface in components/ProductCard.tsx so anything
 * authored here renders identically to the built-in catalogue.
 */
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "media", title: "Photography" },
    { name: "commerce", title: "Price & stock" },
    { name: "flags", title: "Badges" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      group: "content",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      description: "Used as the product id. Generate it from the name.",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "string",
      group: "content",
      description: "The house that makes it — powers the shop's brand filter.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description:
        "Must match the category names used by the shop filters, e.g. Foundation, Face Primer, Skincare.",
      options: {
        list: [
          "Foundation",
          "Face Primer",
          "Setting Powder",
          "Setting & Finishing Spray",
          "Eyeshadow",
          "Eye Lash Adhesive",
          "Lipsticks",
          "Lipstains",
          "Lip Liners",
          "Lip Gloss",
          "Lip Care",
          "Face Serums",
          "Face Moisturizer",
          "Face Toners",
          "Face Wash or Cleanser",
          "Suncare and Sunscreen",
          "Skincare",
          "Bath & Body",
          "Brushes",
          "Makeup",
          "Makeup Wipes & Removers",
        ],
      },
      validation: (r) => r.min(1).error("Pick at least one category."),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "content",
      description: "Shown in quick view. Two or three sentences reads best.",
    }),
    defineField({
      name: "sizes",
      title: "Shades / sizes",
      type: "array",
      group: "content",
      of: [{ type: "string" }],
      description:
        "Leave empty if the product has no variants — the selector is hidden when this is blank.",
    }),

    defineField({
      name: "image",
      title: "Main photo",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Additional photos",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Extra angles shown as thumbnails in quick view.",
    }),

    defineField({
      name: "price",
      title: "Price (GHS)",
      type: "number",
      group: "commerce",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Was price (GHS)",
      type: "number",
      group: "commerce",
      description:
        "Set this only for a genuine reduction — it puts the product on the Deals page and shows a strikethrough.",
      validation: (r) => r.min(0),
    }),
    defineField({
      name: "stockCount",
      title: "Units in stock",
      type: "number",
      group: "commerce",
      description: "0 marks the product out of stock.",
      initialValue: 0,
      validation: (r) => r.required().min(0),
    }),

    defineField({
      name: "isBestSeller",
      title: "Best seller",
      type: "boolean",
      group: "flags",
      initialValue: false,
    }),
    defineField({
      name: "isNew",
      title: "New arrival",
      type: "boolean",
      group: "flags",
      initialValue: false,
    }),
    defineField({
      name: "isFlashDeal",
      title: "Flash deal",
      type: "boolean",
      group: "flags",
      initialValue: false,
    }),
    defineField({
      name: "discountBadge",
      title: "Badge text",
      type: "string",
      group: "flags",
      description: 'Optional short label, e.g. "TOP BRAND".',
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "brand", media: "image", price: "price" },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
        subtitle: [subtitle, price != null ? `GHS ${price}` : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
