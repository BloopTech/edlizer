/**
 * One-off importer: pushes the built-in catalogue in lib/products.ts into
 * Sanity, uploading each local photograph as a Sanity image asset.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs          # dry run
 *   SANITY_WRITE_TOKEN=sk... node scripts/seed-sanity.mjs --commit # write
 *
 * Safe to re-run: documents use a deterministic id (product.<slug>) so a
 * second run updates rather than duplicating.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

const COMMIT = process.argv.includes("--commit");
const token = process.env.SANITY_WRITE_TOKEN;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Pull env from .env.local so the script needs no extra setup.
if (!projectId) {
  const envFile = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) process.env[m[1]] ??= m[2];
    }
  }
}

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!PROJECT_ID) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID (checked env and .env.local).");
  process.exit(1);
}
if (COMMIT && !token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN.\n" +
      "Create one at sanity.io/manage -> API -> Tokens, with Editor permission."
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

async function run() {
  const catalogue = readCatalogue();
  console.log(
    `${COMMIT ? "Importing" : "Dry run for"} ${catalogue.length} products ` +
      `-> ${PROJECT_ID}/${DATASET}\n`
  );

  let created = 0;
  let skippedImages = 0;

  for (const entry of catalogue) {
    const mainId = await uploadImage(entry.image);
    if (!mainId) skippedImages++;

    const galleryIds = [];
    for (const g of entry.gallery ?? []) {
      const id = await uploadImage(g);
      if (id) galleryIds.push(id);
    }

    const doc = {
      _id: `product.${entry.id}`,
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

    // Drop undefined so Sanity does not store empty keys.
    for (const k of Object.keys(doc)) if (doc[k] === undefined) delete doc[k];

    if (COMMIT) {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${entry.name}`);
    } else {
      console.log(`  · ${entry.name}  (${entry.categories?.join(", ") || "no dept"})`);
    }
    created++;
  }

  console.log(
    `\n${COMMIT ? "Imported" : "Would import"} ${created} products` +
      (skippedImages ? `, ${skippedImages} without photography` : "")
  );
  if (!COMMIT) console.log("Re-run with --commit to write to Sanity.");
}

run().catch((err) => {
  console.error("\nImport failed:", err.message);
  process.exit(1);
});
