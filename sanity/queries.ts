import { groq } from "next-sanity";

/**
 * Image fields are dereferenced to plain CDN URLs because the storefront's
 * `Product` type expects `image: string`. Returning the raw asset reference
 * here would render every card broken.
 */
const productFields = groq`
  "id": coalesce(slug.current, _id),
  name,
  brand,
  categories,
  "category": coalesce(categories[0], "Makeup"),
  price,
  originalPrice,
  stockCount,
  isBestSeller,
  isFlashDeal,
  isNew,
  discountBadge,
  // Falls back to the branded placeholder so a product awaiting photography
  // still appears in the shop rather than vanishing from the catalogue.
  "image": coalesce(image.asset->url, "/assets/products/placeholder.svg"),
  "gallery": gallery[].asset->url,
  description,
  sizes
`;

/** Every product with at least a name and a price. Photography is optional —
 *  the storefront shows a placeholder tile and keeps it out of the homepage. */
export const allProductsQuery = groq`
  *[_type == "product" && defined(name) && defined(price)]
    | order(coalesce(isBestSeller, false) desc, name asc) {
    ${productFields}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;
