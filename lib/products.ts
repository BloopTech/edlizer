import { Product } from "@/components/ProductCard";

/**
 * The Edlizer Beauty catalogue, transcribed from the store's product export
 * (name, price in GHS, departments, stock status).
 *
 * Adding photography to a product is a two-step change:
 *   1. save the files under `public/assets/products/<id>/`
 *   2. set `image` (and any `gallery` entries) on its record below
 * A product with no `image` falls back to the branded placeholder tile, so the
 * grid stays presentable while photography is still coming in.
 *
 * Note: `rating` / `reviewCount` are deliberately absent. They are shown only
 * where genuine review data exists, so the storefront never invents a score.
 */

export const PLACEHOLDER = "/assets/products/placeholder.svg";

/** True only when the product has its own photography, not the stand-in tile. */
export function hasPhoto(product: Product): boolean {
  return product.image !== PLACEHOLDER;
}

/** Department taxonomy, in the order it should appear in the shop filters. */
export const departments = [
  "Foundation",
  "Face Primer",
  "Setting Powder",
  "Setting & Finishing Spray",
  "Eyeshadow",
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
  "Eye Lash Adhesive",
] as const;

type CatalogueEntry = Omit<Product, "image" | "category"> & {
  category?: string;
  image?: string;
};

const catalogue: CatalogueEntry[] = [
  // ---------- Complexion ----------
  {
    id: "nars-radiant-foundation",
    name: "NARS Radiant Foundation",
    brand: "NARS",
    categories: ["Foundation"],
    price: 740,
    stockCount: 8,
    isBestSeller: true,
    image: "/assets/products/nars-radiant-foundation/1.jpg",
    gallery: [
      "/assets/products/nars-radiant-foundation/1.jpg",
      "/assets/products/nars-radiant-foundation/2.jpg",
    ],
    description:
      "Breathable medium-to-full buildable coverage with a luminous, skin-true finish.",
  },
  {
    id: "rimmel-lasting-finish-foundation",
    name: "Rimmel Lasting Finish Foundation",
    brand: "Rimmel London",
    categories: ["Foundation"],
    price: 180,
    stockCount: 0,
    image: "/assets/products/rimmel-lasting-finish-foundation/1.webp",
    gallery: [
      "/assets/products/rimmel-lasting-finish-foundation/1.webp",
      "/assets/products/rimmel-lasting-finish-foundation/2.webp",
    ],
    description: "Lasting Finish full-coverage lightweight foundation — up to 35 hours of wear with hyaluronic acid, 2% niacinamide and SPF 20. 30ml.",
  },
  {
    id: "rimmel-match-perfection",
    name: "Rimmel Match Perfection",
    brand: "Rimmel London",
    categories: ["Foundation"],
    price: 180,
    stockCount: 0,
    image: "/assets/products/rimmel-match-perfection/1.jpg",
    gallery: [
      "/assets/products/rimmel-match-perfection/1.jpg",
      "/assets/products/rimmel-match-perfection/2.jpg",
    ],
    description: "Match Perfection invisible-coverage foundation with 24-hour moisture, a pore-blurring finish and SPF 20. 30ml.",
  },
  {
    id: "flawless-liquid-foundation",
    name: "Flawless Liquid Foundation",
    brand: "Flawless Ivy",
    categories: ["Foundation"],
    price: 55,
    stockCount: 24,
    description: "A lightweight everyday liquid foundation that builds from sheer to medium without ever going cakey. Sits comfortably in humidity and leaves a natural, skin-like finish rather than a mask.",
  },
  {
    id: "flawless-matte-foundation",
    name: "Flawless Matte Foundation",
    brand: "Flawless Ivy",
    categories: ["Foundation"],
    price: 69,
    stockCount: 18,
    image: "/assets/products/flawless-matte-foundation/1.jpg",
    gallery: [
      "/assets/products/flawless-matte-foundation/1.jpg",
    ],
    sizes: [
      "Ivory",
      "Pearl",
      "Beige",
      "Honey",
      "Tan",
      "Caramel",
      "Nutmeg",
      "Ebony",
      "Ebony Dark",
    ],
    description: "HD high-definition foundation — 100% waterproof, 24-hour matte and oil free. Nine shades from Ivory through Ebony Dark.",
  },

  // ---------- Primers ----------
  {
    id: "rimmel-lasting-finish-primer",
    name: "Rimmel Lasting Finish Primer",
    brand: "Rimmel London",
    categories: ["Face Primer"],
    price: 120,
    stockCount: 12,
    image: "/assets/products/rimmel-lasting-finish-primer/1.jpg",
    gallery: [
      "/assets/products/rimmel-lasting-finish-primer/1.jpg",
      "/assets/products/rimmel-lasting-finish-primer/2.jpg",
    ],
    description: "Skin-perfecting primer that increases foundation wear for up to 8 hours. 30ml.",
  },
  {
    id: "rimmel-2in1-primer-setting-spray",
    name: "Rimmel 2in1 Primer & Setting Spray",
    brand: "Rimmel London",
    categories: ["Face Primer", "Setting & Finishing Spray"],
    price: 130,
    stockCount: 10,
    description: "Preps before makeup and locks it in after — one bottle, both steps.",
  },
  {
    id: "rimmel-matte-primer",
    name: "Rimmel Matte Primer",
    brand: "Rimmel London",
    categories: ["Face Primer"],
    price: 120,
    stockCount: 11,
    image: "/assets/products/rimmel-matte-primer/1.webp",
    gallery: [
      "/assets/products/rimmel-matte-primer/1.webp",
    ],
    description: "A lightweight mattifying base that blurs the look of pores and holds shine at bay all day. Grips foundation without pilling, and sits comfortably under powder or a dewy base. 30ml.",
  },
  {
    id: "flawless-ivy-eyeshadow-primer",
    name: "Flawless Ivy Eyeshadow Primer",
    brand: "Flawless Ivy",
    categories: ["Eyeshadow", "Face Primer"],
    price: 35,
    stockCount: 30,
    image: "/assets/products/flawless-ivy-eyeshadow-primer/1.png",
    gallery: [
      "/assets/products/flawless-ivy-eyeshadow-primer/1.png",
      "/assets/products/flawless-ivy-eyeshadow-primer/2.jpg",
    ],
    description: "A cream eyeshadow base in two shades — a neutralising nude and a brightening pearl. Grips pigment so shadow reads truer and richer, and stops the crease that turns a morning eye look into an afternoon one.",
  },
  {
    id: "elf-power-grip-primer-niacinamide",
    name: "e.l.f Power Grip Primer + 4% Niacinamide",
    brand: "e.l.f.",
    categories: ["Face Primer"],
    price: 200,
    stockCount: 0,
    image: "/assets/products/elf-power-grip-primer-niacinamide/1.png",
    gallery: [
      "/assets/products/elf-power-grip-primer-niacinamide/1.png",
      "/assets/products/elf-power-grip-primer-niacinamide/2.webp",
      "/assets/products/elf-power-grip-primer-niacinamide/3.webp",
    ],
    description:
      "The Power Grip formula with 4% niacinamide to even tone and smooth texture while it holds makeup in place. 0.8 fl oz / 24ml.",
  },
  {
    id: "elf-power-grip-primer",
    name: "e.l.f Power Grip Primer",
    brand: "e.l.f.",
    categories: ["Face Primer"],
    price: 200,
    stockCount: 0,
    image: "/assets/products/elf-power-grip-primer/1.jpg",
    gallery: [
      "/assets/products/elf-power-grip-primer/1.jpg",
      "/assets/products/elf-power-grip-primer/2.webp",
      "/assets/products/elf-power-grip-primer/3.jpg",
    ],
    description:
      "Clear gel primer packed with hyaluronic acid — pat it in, give it 30 seconds, and makeup grips all day. Cruelty free and vegan.",
  },
  {
    id: "mac-prep-prime-fix",
    name: "MAC Prep + Prime Fix+ Spray",
    brand: "MAC Cosmetics",
    categories: ["Face Primer", "Setting & Finishing Spray"],
    price: 450,
    stockCount: 7,
    isBestSeller: true,
    image: "/assets/products/mac-prep-prime-fix/1.webp",
    gallery: [
      "/assets/products/mac-prep-prime-fix/1.webp",
    ],
    description:
      "Prep + Prime Fix+ Matte — the pro-artistry mist that preps, refreshes and sets with a shine-free finish. 3.4 fl oz / 100ml.",
  },

  // ---------- Setting ----------
  {
    id: "beauty-creations-setting-powder",
    name: "Beauty Creations Bye Filter Setting Powder",
    brand: "Beauty Creations",
    categories: ["Makeup", "Setting Powder"],
    price: 200,
    stockCount: 14,
    isBestSeller: true,
    image: "/assets/products/beauty-creations-setting-powder/1.jpg",
    gallery: [
      "/assets/products/beauty-creations-setting-powder/1.jpg",
      "/assets/products/beauty-creations-setting-powder/2.webp",
      "/assets/products/beauty-creations-setting-powder/3.jpg",
      "/assets/products/beauty-creations-setting-powder/4.webp",
    ],
    description:
      "Talc-free loose setting powder that blurs texture and holds makeup without flashback.",
  },
  {
    id: "creme-shop-banana-powder",
    name: "The Crème Shop Go Bananas! Setting & Baking Powder",
    brand: "The Crème Shop",
    categories: ["Setting Powder"],
    price: 200,
    stockCount: 16,
    image: "/assets/products/creme-shop-banana-powder/1.webp",
    gallery: [
      "/assets/products/creme-shop-banana-powder/1.webp",
      "/assets/products/creme-shop-banana-powder/2.webp",
      "/assets/products/creme-shop-banana-powder/3.jpg",
    ],
    description:
      "Banana-scented brightening powder for setting, baking and concealing. Non-comedogenic, made in Korea.",
  },
  {
    id: "coola-setting-sunscreen-spray",
    name: "Coola Makeup Setting Sunscreen Spray",
    brand: "Coola",
    categories: ["Setting & Finishing Spray", "Suncare and Sunscreen"],
    price: 400,
    stockCount: 6,
    image: "/assets/products/coola-setting-sunscreen-spray/1.jpeg",
    gallery: [
      "/assets/products/coola-setting-sunscreen-spray/1.jpeg",
      "/assets/products/coola-setting-sunscreen-spray/2.webp",
      "/assets/products/coola-setting-sunscreen-spray/3.jpeg",
    ],
    description: "70%+ organic setting spray with broad-spectrum SPF 30 — the rare product that locks makeup down and tops up sun protection at the same time. Peony leaf, juniper berry and hyaluronic acid keep the finish dewy, not tacky. 44ml.",
  },
  {
    id: "morphe-2-3in1-face-mist",
    name: "Morphe 2 3in1 Face Mist",
    brand: "Morphe",
    categories: ["Face Toners", "Setting & Finishing Spray"],
    price: 200,
    stockCount: 9,
    image: "/assets/products/morphe-2-3in1-face-mist/1.webp",
    gallery: [
      "/assets/products/morphe-2-3in1-face-mist/1.webp",
      "/assets/products/morphe-2-3in1-face-mist/2.webp",
    ],
    description: "Li'l Pick-Me-Up 3-in-1 face mist — tones in the morning, refreshes over makeup at midday, and sets a finished face at night. Light enough to layer as often as you like.",
  },
  {
    id: "revlon-lock-setting-mist",
    name: "Revlon Lock Setting Mist",
    brand: "Revlon",
    categories: ["Setting & Finishing Spray"],
    price: 200,
    stockCount: 10,
    image: "/assets/products/revlon-lock-setting-mist/1.webp",
    gallery: [
      "/assets/products/revlon-lock-setting-mist/1.webp",
      "/assets/products/revlon-lock-setting-mist/2.jpg",
      "/assets/products/revlon-lock-setting-mist/3.jpg",
    ],
    description:
      "ColorStay Lock 24-hour setting mist with a superfood detox blend. Fine, weightless finish. 1.9 fl oz / 56ml.",
  },
  {
    id: "beth-mien-finishing-spray",
    name: "Beth Mien Finishing Spray",
    brand: "Beth Mien",
    categories: ["Setting & Finishing Spray"],
    price: 135,
    stockCount: 0,
    image: "/assets/products/beth-mien-finishing-spray/1.jpg",
    gallery: [
      "/assets/products/beth-mien-finishing-spray/1.jpg",
      "/assets/products/beth-mien-finishing-spray/2.jpg",
    ],
    description: "Locked Till Dawn — a mattifying, waterproof, rub-proof locking mist. 150ml.",
  },

  // ---------- Eyes & lips ----------
  {
    id: "no7-dusty-face-eye-palette",
    name: "No7 Dusty Face & Eye Palette",
    brand: "No7",
    categories: ["Eyeshadow"],
    price: 130,
    stockCount: 8,
    image: "/assets/products/no7-dusty-face-eye-palette/1.png",
    gallery: [
      "/assets/products/no7-dusty-face-eye-palette/1.png",
      "/assets/products/no7-dusty-face-eye-palette/2.jpg",
      "/assets/products/no7-dusty-face-eye-palette/3.png",
    ],
    description: "Dusty Rose face and eye palette — four eyeshadows, a highlighter and a blush in wearable rose neutrals.",
  },
  {
    id: "chanel-lipstick-466-carmen",
    name: "Chanel Lipstick — 466 Carmen",
    brand: "Chanel",
    categories: ["Lipsticks"],
    price: 59,
    stockCount: 5,
    image: "/assets/products/chanel-lipstick-466-carmen/1.jpg",
    gallery: [
      "/assets/products/chanel-lipstick-466-carmen/1.jpg",
    ],
    description: "Rouge Coco in 466 Carmen — a true couture red with a cushiony satin finish. The hydrating base keeps colour comfortable for hours without drying the lip, and the shade suits warm and cool undertones alike.",
  },
  {
    id: "nyx-lip-lingerie-ruffle-trim",
    name: "NYX Professional Makeup Lip Lingerie Liquid Lipstick — Ruffle Trim, 4ml",
    brand: "NYX Professional Makeup",
    categories: ["Lip Care", "Lipstains", "Lipsticks"],
    price: 80,
    originalPrice: 120,
    stockCount: 13,
    isFlashDeal: true,
    image: "/assets/products/nyx-lip-lingerie-ruffle-trim/1.webp",
    gallery: [
      "/assets/products/nyx-lip-lingerie-ruffle-trim/1.webp",
      "/assets/products/nyx-lip-lingerie-ruffle-trim/2.webp",
      "/assets/products/nyx-lip-lingerie-ruffle-trim/3.webp",
    ],
    description: "Lip Lingerie in Ruffle Trim — a weightless liquid lipstick that dries to a soft matte nude. Full opacity in one coat, comfortable enough to forget you are wearing it, and it will not print onto a glass. 4ml.",
  },
  {
    id: "nickak-4in1-lip-kit",
    name: "NicKak 4in1 Lip Kit (2 Matte Lipstains & Lip Liners)",
    brand: "NicKak",
    categories: ["Lip Care", "Lip Liners", "Lipstains"],
    price: 150,
    stockCount: 9,
    image: "/assets/products/nickak-4in1-lip-kit/1.webp",
    gallery: [
      "/assets/products/nickak-4in1-lip-kit/1.webp",
      "/assets/products/nickak-4in1-lip-kit/2.webp",
    ],
    description: "A four-piece lip kit: two long-wear matte lipstains with the liners cut to match them exactly. The stains set down without transferring, and the liners keep the edge sharp through a full evening.",
  },
  {
    id: "maybelline-vivid-hot-lacquer",
    name: "Maybelline Vivid Hot Lacquer",
    brand: "Maybelline",
    categories: ["Lip Gloss"],
    price: 40,
    stockCount: 21,
    image: "/assets/products/maybelline-vivid-hot-lacquer/1.jpg",
    gallery: [
      "/assets/products/maybelline-vivid-hot-lacquer/1.jpg",
    ],
    description: "Vivid Hot Lacquer delivers the pigment of a lipstick with the mirror shine of a gloss. The cushion applicator lays colour down in one pass, and the formula stays slick rather than sticky. 5ml.",
  },
  {
    id: "ienvy-eyelash-glue",
    name: "i•ENVY Eyelash Glue",
    brand: "i•ENVY",
    categories: ["Eye Lash Adhesive"],
    price: 90,
    stockCount: 26,
    image: "/assets/products/ienvy-eyelash-glue/1.jpg",
    gallery: [
      "/assets/products/ienvy-eyelash-glue/1.jpg",
      "/assets/products/ienvy-eyelash-glue/2.webp",
      "/assets/products/ienvy-eyelash-glue/3.webp",
    ],
    description:
      "Super Strong Hold clear lash adhesive with a precision brush applicator. Ophthalmologist tested, hypoallergenic, latex and formaldehyde free. 5g.",
  },

  // ---------- Skincare ----------
  {
    id: "simple-soothing-facial-toner",
    name: "Simple Soothing Facial Toner",
    brand: "Simple",
    categories: ["Face Toners", "Skincare"],
    price: 100,
    stockCount: 19,
    isBestSeller: true,
    image: "/assets/products/simple-soothing-facial-toner/1.jpg",
    gallery: [
      "/assets/products/simple-soothing-facial-toner/1.jpg",
      "/assets/products/simple-soothing-facial-toner/2.webp",
    ],
    description:
      "Alcohol-free toner with pro-vitamin B5, chamomile, allantoin and witch hazel. Gently clears pores and moisturises. 200ml.",
  },
  {
    id: "simple-moisturizing-facial-wash",
    name: "Simple Moisturizing Facial Wash",
    brand: "Simple",
    categories: ["Makeup Wipes & Removers", "Face Wash or Cleanser"],
    price: 80,
    stockCount: 17,
    image: "/assets/products/simple-moisturizing-facial-wash/1.webp",
    gallery: [
      "/assets/products/simple-moisturizing-facial-wash/1.webp",
      "/assets/products/simple-moisturizing-facial-wash/2.jpg",
    ],
    description: "Kind to Skin moisturizing facial wash that cleanses and hydrates. No artificial perfume or colour, no harsh chemicals. 148ml.",
  },
  {
    id: "simple-vitamin-cef-serum",
    name: "Simple Vitamin C+E+F Serum",
    brand: "Simple",
    categories: ["Face Serums", "Skincare"],
    price: 150,
    stockCount: 0,
    image: "/assets/products/simple-vitamin-cef-serum/1.jpg",
    gallery: [
      "/assets/products/simple-vitamin-cef-serum/1.jpg",
      "/assets/products/simple-vitamin-cef-serum/2.jpg",
    ],
    description: "10% Vitamins C+E+F booster serum for youthful, glowing skin — visible results in 7 days. All skin types, 30ml.",
  },
  {
    id: "good-molecules-acne-foaming-cleanser",
    name: "Good Molecules Acne Foaming Cleanser",
    brand: "Good Molecules",
    categories: ["Face Wash or Cleanser", "Skincare"],
    price: 280,
    stockCount: 12,
    isBestSeller: true,
    image: "/assets/products/good-molecules-acne-foaming-cleanser/1.webp",
    gallery: [
      "/assets/products/good-molecules-acne-foaming-cleanser/1.webp",
      "/assets/products/good-molecules-acne-foaming-cleanser/2.webp",
      "/assets/products/good-molecules-acne-foaming-cleanser/3.webp",
    ],
    description:
      "Formulated with 2% salicylic acid to cleanse and clarify acne-prone skin. 148ml / 5 fl oz.",
  },
  {
    id: "good-molecules-discoloration-serum",
    name: "Good Molecules Discoloration Correcting Serum",
    brand: "Good Molecules",
    categories: ["Face Serums", "Skincare"],
    price: 250,
    stockCount: 11,
    isBestSeller: true,
    image: "/assets/products/good-molecules-discoloration-serum/1.webp",
    gallery: [
      "/assets/products/good-molecules-discoloration-serum/1.webp",
      "/assets/products/good-molecules-discoloration-serum/2.jpg",
    ],
    description: "A lightweight serum built around tranexamic acid and niacinamide to fade post-acne marks, sun spots and general unevenness. Works gradually over four to eight weeks — it is a consistency product, not an overnight one. 30ml.",
  },
  {
    id: "good-molecules-clarify-cleanse-bar",
    name: "Good Molecules Clarify & Cleanse Bar",
    brand: "Good Molecules",
    categories: ["Bath & Body", "Face Wash or Cleanser"],
    price: 150,
    stockCount: 15,
    image: "/assets/products/good-molecules-clarify-cleanse-bar/1.jpeg",
    gallery: [
      "/assets/products/good-molecules-clarify-cleanse-bar/1.jpeg",
      "/assets/products/good-molecules-clarify-cleanse-bar/2.jpeg",
    ],
    description: "A solid cleansing bar for face and body that clarifies without the tightness of traditional soap. Gentle enough for daily use on congestion-prone skin, and it outlasts several bottles of liquid cleanser.",
  },
  {
    id: "neutrogena-oil-free-acne-wash",
    name: "Neutrogena Oil-Free Acne Wash with Salicylic Acid",
    brand: "Neutrogena",
    categories: ["Face Wash or Cleanser"],
    price: 220,
    stockCount: 13,
    image: "/assets/products/neutrogena-oil-free-acne-wash/1.jpeg",
    gallery: ["/assets/products/neutrogena-oil-free-acne-wash/1.jpeg"],
    description: "Oil-free salicylic acid wash that treats breakouts as it cleanses.",
  },
  {
    id: "salicylic-acid-cleanser",
    name: "Salicylic Acid Cleanser",
    brand: "COSRX",
    categories: ["Face Wash or Cleanser"],
    price: 180,
    stockCount: 14,
    image: "/assets/products/salicylic-acid-cleanser/1.jpg",
    gallery: [
      "/assets/products/salicylic-acid-cleanser/1.jpg",
    ],
    description: "Salicylic Acid Daily Gentle Cleanser with botanical ingredients and 0.5% salicylic acid to whisk away impurities and excess sebum. 150ml.",
  },
  {
    id: "ginseng-essence-water",
    name: "Ginseng Essence Water",
    brand: "Beauty of Joseon",
    categories: ["Face Toners", "Face Wash or Cleanser"],
    price: 280,
    stockCount: 8,
    image: "/assets/products/ginseng-essence-water/1.jpg",
    gallery: [
      "/assets/products/ginseng-essence-water/1.jpg",
      "/assets/products/ginseng-essence-water/2.jpg",
    ],
    description: "Ginseng-infused essence that hydrates and revitalises dull skin.",
  },
  {
    id: "cosrx-oil-free-lotion",
    name: "Cosrx Oil-Free Lotion",
    brand: "COSRX",
    categories: ["Face Moisturizer"],
    price: 250,
    stockCount: 10,
    image: "/assets/products/cosrx-oil-free-lotion/1.jpg",
    gallery: [
      "/assets/products/cosrx-oil-free-lotion/1.jpg",
    ],
    description: "Oil-Free Ultra-Moisturizing Lotion formulated with 70.8% birch sap to hydrate without heaviness.",
  },
  {
    id: "cosrx-aloe-suncream",
    name: "Cosrx Aloe Suncream",
    brand: "COSRX",
    categories: ["Suncare and Sunscreen"],
    price: 200,
    stockCount: 16,
    image: "/assets/products/cosrx-aloe-suncream/1.jpg",
    gallery: [
      "/assets/products/cosrx-aloe-suncream/1.jpg",
    ],
    description: "Aloe Soothing Sun Cream SPF50+ PA+++. Formulated with aloe leaf extract to protect against UVA and UVB rays while it hydrates.",
  },
  {
    id: "cerave-daily-moisturizing-lotion",
    name: "CeraVe Daily Moisturizing Lotion",
    brand: "CeraVe",
    categories: ["Face Moisturizer"],
    price: 250,
    stockCount: 18,
    isBestSeller: true,
    image: "/assets/products/cerave-daily-moisturizing-lotion/1.webp",
    gallery: [
      "/assets/products/cerave-daily-moisturizing-lotion/1.webp",
      "/assets/products/cerave-daily-moisturizing-lotion/2.jpeg",
    ],
    description: "Ceramide and hyaluronic acid lotion for 24-hour barrier hydration.",
  },
  {
    id: "cerave-facial-moisturizing-kit",
    name: "CeraVe Facial Moisturizing Kit",
    brand: "CeraVe",
    categories: ["Face Moisturizer"],
    price: 500,
    stockCount: 6,
    description: "The complete CeraVe facial pairing: a daytime lotion and a richer night cream, both built on three essential ceramides and hyaluronic acid. Developed with dermatologists for barrier repair on normal to dry skin.",
  },

  // ---------- Tools ----------
  {
    id: "bh-cosmetics-brush-set",
    name: "BH Cosmetics 12 Pieces Brush Set",
    brand: "BH Cosmetics",
    categories: ["Brushes"],
    price: 180,
    stockCount: 9,
    image: "/assets/products/bh-cosmetics-brush-set/1.jpeg",
    gallery: ["/assets/products/bh-cosmetics-brush-set/1.jpeg"],
    description: "A twelve-piece synthetic set covering the full face: buffing and blending brushes for base, a tapered brush for powder and contour, and fine eye brushes for shadow, crease and liner. Soft enough for sensitive skin and easy to wash.",
  },
  {
    id: "studio-london-brush-set",
    name: "Studio London Brush Set",
    brand: "Studio London",
    categories: ["Brushes"],
    price: 220,
    stockCount: 0,
    image: "/assets/products/studio-london-brush-set/1.png",
    gallery: [
      "/assets/products/studio-london-brush-set/1.png",
      "/assets/products/studio-london-brush-set/2.jpg",
    ],
    description:
      "Get Ready Ultimate Brush Collection — an 8-piece set of face and eye brushes with a blending sponge.",
  },
  {
    id: "double-sided-makeup-wash-bag",
    name: "Double Sided Makeup / Wash Bag",
    categories: ["Brushes"],
    price: 100,
    stockCount: 20,
    description: "A double-sided wash bag that keeps clean brushes apart from used ones — one waterproof compartment for what needs washing, another for what is ready to go. Wipes clean inside and folds flat for travel.",
  },
];

/** Every product, normalised: primary category resolved and images defaulted. */
export const edlizerProducts: Product[] = catalogue.map((entry) => ({
  ...entry,
  category: entry.category ?? entry.categories?.[0] ?? "Makeup",
  image: entry.image ?? PLACEHOLDER,
}));

export const inStockCount = edlizerProducts.filter((p) => p.stockCount > 0).length;

/** Departments that actually have products behind them, with their counts. */
export const departmentCounts = departments
  .map((name) => ({
    name,
    count: edlizerProducts.filter((p) => p.categories?.includes(name)).length,
  }))
  .filter((d) => d.count > 0);

/**
 * Departments grouped the way a shopper thinks about them, so the shop filter
 * can nest them instead of presenting one flat list of twenty-one checkboxes.
 */
const DEPARTMENT_GROUPS: { group: string; departments: string[] }[] = [
  {
    group: "Complexion",
    departments: [
      "Foundation",
      "Face Primer",
      "Setting Powder",
      "Setting & Finishing Spray",
    ],
  },
  { group: "Eyes", departments: ["Eyeshadow", "Eye Lash Adhesive"] },
  {
    group: "Lips",
    departments: ["Lipsticks", "Lipstains", "Lip Liners", "Lip Gloss", "Lip Care"],
  },
  {
    group: "Skincare",
    departments: [
      "Face Serums",
      "Face Moisturizer",
      "Face Toners",
      "Face Wash or Cleanser",
      "Suncare and Sunscreen",
      "Skincare",
      "Bath & Body",
    ],
  },
  {
    group: "Tools & Accessories",
    departments: ["Brushes", "Makeup", "Makeup Wipes & Removers"],
  },
];

/** The grouped taxonomy, with empty departments dropped and counts attached. */
export const departmentGroups = DEPARTMENT_GROUPS.map(({ group, departments }) => ({
  group,
  departments: departments
    .map((name) => ({
      name,
      count: edlizerProducts.filter((p) => p.categories?.includes(name)).length,
    }))
    .filter((d) => d.count > 0),
})).filter((g) => g.departments.length > 0);

/** Brands that actually have stock listed, with their counts. */
export const brandCounts = [
  ...new Set(edlizerProducts.map((p) => p.brand).filter(Boolean) as string[]),
]
  .sort((a, b) => a.localeCompare(b))
  .map((name) => ({
    name,
    count: edlizerProducts.filter((p) => p.brand === name).length,
  }));

export const priceBounds = {
  min: Math.min(...edlizerProducts.map((p) => p.price)),
  max: Math.max(...edlizerProducts.map((p) => p.price)),
};

/** Look a product up by id — used by the curated ritual routines. */
export function productById(id: string): Product | undefined {
  return edlizerProducts.find((p) => p.id === id);
}

/** Resolve a list of ids to products, dropping any that no longer exist. */
export function productsByIds(ids: string[]): Product[] {
  return ids.map(productById).filter(Boolean) as Product[];
}

/** Genuinely discounted lines — driven by `originalPrice`, never invented. */
export const productsOnOffer = edlizerProducts.filter((p) => p.originalPrice);

export const bestSellers = edlizerProducts.filter(
  (p) => p.isBestSeller && p.stockCount > 0
);

/** In stock, but not much of it. */
export const lowStock = edlizerProducts
  .filter((p) => p.stockCount > 0 && p.stockCount <= 8)
  .sort((a, b) => a.stockCount - b.stockCount);

export const outOfStock = edlizerProducts.filter((p) => p.stockCount === 0);

/** Percentage saved on a discounted line. */
export function discountPercent(p: Product): number {
  if (!p.originalPrice) return 0;
  return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
}

/** Homepage shelves, derived from the live catalogue rather than hand-listed. */
const photographed = edlizerProducts.filter(hasPhoto);

export const shelves = {
  featured: photographed.filter((p) => p.categories?.includes("Foundation")),
  skincare: photographed.filter((p) =>
    p.categories?.some((c) =>
      [
        "Skincare",
        "Face Serums",
        "Face Toners",
        "Face Wash or Cleanser",
        "Face Moisturizer",
      ].includes(c)
    )
  ),
  latest: photographed.filter((p) =>
    p.categories?.some((c) =>
      ["Setting Powder", "Setting & Finishing Spray"].includes(c)
    )
  ),
};

/* ------------------------------------------------------------------
 * Live derivations
 *
 * The exports above are computed from the built-in catalogue at module
 * load, so they cannot see anything authored in Sanity. Pages should call
 * these with `useStore().products` instead, which is the Sanity catalogue
 * when one exists and the built-in list otherwise.
 * ------------------------------------------------------------------ */

const SKINCARE_DEPARTMENTS = [
  "Skincare",
  "Face Serums",
  "Face Toners",
  "Face Wash or Cleanser",
  "Face Moisturizer",
];

const LATEST_DEPARTMENTS = ["Setting Powder", "Setting & Finishing Spray"];

const inAny = (p: Product, departments: string[]) =>
  (p.categories ?? [p.category]).some((c) => departments.includes(c));

/** Homepage shelves. Only photographed products — a placeholder tile on the
 *  landing page reads as a broken card. */
export function deriveShelves(products: Product[]) {
  const shot = products.filter(hasPhoto);
  return {
    featured: shot.filter((p) => inAny(p, ["Foundation"])),
    skincare: shot.filter((p) => inAny(p, SKINCARE_DEPARTMENTS)),
    latest: shot.filter((p) => inAny(p, LATEST_DEPARTMENTS)),
  };
}

export const getOnOffer = (products: Product[]) =>
  products.filter((p) => p.originalPrice);

export const getBestSellers = (products: Product[]) =>
  products.filter((p) => p.isBestSeller && p.stockCount > 0);

export const getLowStock = (products: Product[]) =>
  products
    .filter((p) => p.stockCount > 0 && p.stockCount <= 8)
    .sort((a, b) => a.stockCount - b.stockCount);

/** Resolve curated ids (the ritual routines) against the live catalogue. */
export const resolveByIds = (products: Product[], ids: readonly string[]) =>
  ids
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];
