import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The editorial parts of the homepage: campaign slider, its supporting copy,
 * testimonials and the beauty-ritual photo gallery. Product shelves are not
 * here — they fill themselves from the catalogue.
 */
export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero slider", default: true },
    { name: "testimonials", title: "Testimonials" },
    { name: "gallery", title: "Ritual gallery" },
  ],
  fields: [
    defineField({
      name: "heroSlides",
      title: "Slides",
      type: "array",
      group: "hero",
      description:
        "Campaign photographs, in order. Each slide shows its own headline. Portrait photos work best; use the crop tool's circle to mark the face.",
      of: [
        defineArrayMember({
          type: "object",
          name: "heroSlide",
          fields: [
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "alt",
              title: "Photo description",
              type: "string",
              description: "What the photo shows, for screen readers and Google.",
            }),
            defineField({ name: "kicker", title: "Small line above the headline", type: "string" }),
            defineField({ name: "lead", title: "Headline (white)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "accent", title: "Headline (gold)", type: "string" }),
          ],
          preview: {
            select: { lead: "lead", accent: "accent", kicker: "kicker", media: "image" },
            prepare: ({ lead, accent, kicker, media }) => ({
              title: [lead, accent].filter(Boolean).join(" "),
              subtitle: kicker,
              media,
            }),
          },
        }),
      ],
      validation: (r) => r.min(1).error("Keep at least one slide."),
    }),
    defineField({
      name: "heroBody",
      title: "Paragraph under the headline",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "primaryCta",
      title: "Gold button",
      type: "object",
      group: "hero",
      options: { columns: 2 },
      fields: [
        defineField({ name: "label", title: "Text", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string", description: "A page such as /shop, or #featured-products to scroll down." }),
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Outline button",
      type: "object",
      group: "hero",
      options: { columns: 2 },
      fields: [
        defineField({ name: "label", title: "Text", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "pillars",
      title: "Three promises under the buttons",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          name: "pillar",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "copy", title: "Text", type: "text", rows: 2 }),
          ],
        }),
      ],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      description: "Two read best side by side.",
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          fields: [
            defineField({ name: "author", title: "Customer name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "role", title: "Line under the name", type: "string", description: "e.g. Loyal Client • Kumasi" }),
            defineField({ name: "quote", title: "What they said", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "author", subtitle: "quote" } },
        }),
      ],
    }),
    defineField({
      name: "ritualGallery",
      title: "Ritual gallery photos",
      type: "array",
      group: "gallery",
      description: "Shown as square tiles on the homepage, five to a row. Ten fills two rows.",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryImage",
          fields: [
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({ name: "title", title: "Caption", type: "string" }),
            defineField({ name: "tag", title: "Small tag", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "tag", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});
