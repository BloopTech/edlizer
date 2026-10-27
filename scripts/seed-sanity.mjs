/**
 * Importer: pushes the built-in catalogue in lib/products.ts and the site
 * content in lib/default-content.json (store details, homepage, delivery &
 * FAQs) into Sanity, uploading each local photograph as a Sanity image asset.
 *
 * Usage:
 *   node scripts/seed-sanity.mjs                       # dry run
 *   node scripts/seed-sanity.mjs --commit              # write missing documents
 *   node scripts/seed-sanity.mjs --commit --overwrite  # also replace existing ones
 *
 * The token is read from SANITY_WRITE_TOKEN, in the environment or .env.local.
 *
 * Safe to re-run: documents use deterministic ids, and without --overwrite a
 * document that already exists is left alone — so edits made in the Studio
 * are never clobbered by a second run.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const COMMIT = process.argv.includes("--commit");
const OVERWRITE = process.argv.includes("--overwrite");

// Pull env from .env.local so the script needs no extra setup. Values already
// in the environment win.
const envFile = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) process.env[m[1]] ??= m[2];
  }
}

const token = process.env.SANITY_WRITE_TOKEN;
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!PROJECT_ID) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID (checked env and .env.local).");
  process.exit(1);
}
if (COMMIT && !token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN.\n" +
      "Create one at sanity.io/manage -> API -> Tokens, with Editor permission,\n" +
      "and add it to .env.local as SANITY_WRITE_TOKEN=..."
  );
  process.exit(1);
}

/**
 * lib/products.ts is TypeScript, so rather than compiling it we lift out the
 * `catalogue` array literal — it is pure data — and evaluate just that.
 */
function readCatalogue() {
  const src = fs.readFileSync(path.join(process.cwd(), "lib/products.ts"), "utf8");
  const marker = "const catalogue: CatalogueEntry[] = ";
  const start = src.indexOf(marker);
  if (start < 0) throw new Error("Could not find the catalogue array in lib/products.ts");
  // Start at the array bracket itself, not the [] in the type annotation.
  const open = start + marker.length;

  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) { end = i + 1; break; }
    }
  }
  if (end < 0) throw new Error("Unbalanced brackets in the catalogue array");

  const literal = src.slice(open, end);
  return Function(`"use strict"; return (${literal});`)();
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  token,
  useCdn: false,
});

const PLACEHOLDER = "/assets/products/placeholder.svg";
const assetCache = new Map();

async function uploadImage(publicPath) {
  if (!publicPath || publicPath === PLACEHOLDER) return null;
  if (assetCache.has(publicPath)) return assetCache.get(publicPath);

  const file = path.join(process.cwd(), "public", publicPath);
  if (!fs.existsSync(file)) {
    console.warn(`  ! missing file, skipping image: ${publicPath}`);
    return null;
  }
  if (!COMMIT) {
    assetCache.set(publicPath, "<dry-run>");
    return "<dry-run>";
  }

  const asset = await client.assets.upload("image", fs.createReadStream(file), {
    filename: path.basename(file),
  });
  assetCache.set(publicPath, asset._id);
  return asset._id;
}

const imageRef = (id) =>
  id && id !== "<dry-run>"
    ? { _type: "image", asset: { _type: "reference", _ref: id } }
    : undefined;

/** Ids already in the dataset, so existing documents can be skipped. */
async function existingIds(ids) {
  const found = await client.fetch(`*[_id in $ids]._id`, { ids });
  return new Set(found);
}

/** Writes a document unless it exists and --overwrite was not given. */
async function write(doc, label, existing) {
  if (existing.has(doc._id) && !OVERWRITE) {
    console.log(`  - ${label}  (already in Sanity, kept)`);
    return false;
  }
  // Drop undefined so Sanity does not store empty keys.
  for (const k of Object.keys(doc)) if (doc[k] === undefined) delete doc[k];
  if (COMMIT) {
    await client.createOrReplace(doc);
    console.log(`  ✓ ${label}`);
  } else {
    console.log(`  · ${label}`);
  }
  return true;
}

async function seedProducts() {
  const catalogue = readCatalogue();
  const existing = await existingIds(catalogue.map((e) => e.id));
  console.log(`Products (${catalogue.length})`);

  let written = 0;
  for (const entry of catalogue) {
    // Skip the uploads too when the document will not be written.
    if (existing.has(entry.id) && !OVERWRITE) {
      await write({ _id: entry.id }, entry.name, existing);
      continue;
    }

    const mainId = await uploadImage(entry.image);
    const galleryIds = [];
    for (const g of entry.gallery ?? []) {
      const id = await uploadImage(g);
      if (id) galleryIds.push(id);
    }

    const doc = {
      // No dot in the id: Sanity reserves dotted ids for system documents and
      // hides them from unauthenticated reads, which would make every product
      // invisible to the storefront.
      _id: entry.id,
      _type: "product",
      name: entry.name,
      slug: { _type: "slug", current: entry.id },
      brand: entry.brand,
      categories: entry.categories ?? [],
      description: entry.description,
      sizes: entry.sizes,
      price: entry.price,
      originalPrice: entry.originalPrice,
      stockCount: entry.stockCount ?? 0,
      isBestSeller: Boolean(entry.isBestSeller),
      isNew: Boolean(entry.isNew),
      isFlashDeal: Boolean(entry.isFlashDeal),
      discountBadge: entry.discountBadge,
      image: imageRef(mainId),
      gallery: galleryIds.length
        ? galleryIds.map((id, i) => ({ ...imageRef(id), _key: `g${i}` }))
        : undefined,
    };
    if (await write(doc, entry.name, existing)) written++;
  }
  return written;
}

async function seedContent() {
  const content = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "lib/default-content.json"), "utf8")
  );
  const existing = await existingIds(["siteSettings", "homepage", "shopInfo"]);
  const key = (i) => `k${i}`;
  console.log("\nSite content");

  const { details } = content;
  await write(
    {
      _id: "siteSettings",
      _type: "siteSettings",
      phones: details.phones,
      email: details.email,
      hours: details.hours,
      location: details.location,
      instagram: details.social.instagram,
      tiktok: details.social.tiktok,
    },
    "Store details",
    existing
  );

  if (existing.has("homepage") && !OVERWRITE) {
    await write({ _id: "homepage" }, "Homepage", existing);
  } else {
    const heroSlides = [];
    for (const [i, s] of content.hero.slides.entries()) {
      heroSlides.push({
        _key: key(i),
        _type: "heroSlide",
        image: imageRef(await uploadImage(s.src)),
        alt: s.alt,
        kicker: s.kicker,
        lead: s.lead,
        accent: s.accent,
      });
    }
    const ritualGallery = [];
    for (const [i, g] of content.gallery.entries()) {
      ritualGallery.push({
        _key: key(i),
        _type: "galleryImage",
        image: imageRef(await uploadImage(g.url)),
        title: g.title,
        tag: g.tag,
      });
    }
    await write(
      {
        _id: "homepage",
        _type: "homepage",
        heroSlides,
        heroBody: content.hero.body,
        primaryCta: content.hero.primaryCta,
        secondaryCta: content.hero.secondaryCta,
        pillars: content.hero.pillars.map((p, i) => ({ _key: key(i), _type: "pillar", ...p })),
        testimonials: content.testimonials.map((t, i) => ({ _key: key(i), _type: "testimonial", ...t })),
        ritualGallery,
      },
      "Homepage (hero slider, testimonials, ritual gallery)",
      existing
    );
  }

  await write(
    {
      _id: "shopInfo",
      _type: "shopInfo",
      deliveryOptions: content.delivery.map((d) => ({
        // Keep the original ids as keys so checkout selections stay stable.
        _key: d.id,
        _type: "deliveryOption",
        label: d.label,
        note: d.note,
        fee: d.fee,
      })),
      faqs: content.faqs.map((f, i) => ({
        _key: key(i),
        _type: "faq",
        question: f.q,
        answer: f.a,
      })),
    },
    "Delivery & FAQs",
    existing
  );
}

async function run() {
  console.log(
    `${COMMIT ? "Seeding" : "Dry run for"} ${PROJECT_ID}/${DATASET}` +
      `${OVERWRITE ? " (overwriting existing documents)" : ""}\n`
  );
  await seedProducts();
  await seedContent();
  if (!COMMIT) console.log("\nRe-run with --commit to write to Sanity.");
}

run().catch((err) => {
  console.error("\nImport failed:", err.message);
  process.exit(1);
});
