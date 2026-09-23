import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Served from Sanity's CDN: this is a public storefront reading published
  // content, so cached responses are the right trade-off.
  useCdn: true,
  // Only published documents. "raw" would leak work-in-progress drafts onto
  // the live shop.
  perspective: "published",
});

const builder = createImageUrlBuilder(client);

/** Build a transformed image URL from a Sanity image reference. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
