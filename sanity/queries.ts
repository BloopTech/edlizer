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
  "image": image.asset->url,
  "gallery": gallery[].asset->url,
  description,
  sizes
`;

/** Every product that has a name, a price and a photo — anything half-authored
 *  is skipped so a draft in progress cannot break the grid. */
export const allProductsQuery = groq`
  *[_type == "product" && defined(name) && defined(price) && defined(image.asset)]
    | order(coalesce(isBestSeller, false) desc, name asc) {
    ${productFields}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;
