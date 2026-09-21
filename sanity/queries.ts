import { groq } from "next-sanity";

export const allProductsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    "id": coalesce(slug.current, _id),
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    stockCount,
    isBestSeller,
    isFlashDeal,
    isNew,
    discountBadge,
    image,
    hoverImage,
    description,
    sizes
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && category match "Foundation*"] | order(_createdAt desc) {
    "id": coalesce(slug.current, _id),
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    stockCount,
    isBestSeller,
    isFlashDeal,
    isNew,
    discountBadge,
    image,
    hoverImage,
    description,
    sizes
  }
`;

export const skincareProductsQuery = groq`
  *[_type == "product" && (category match "*Skincare*" || category match "*Toner*" || category match "*Cleanser*" || category match "*Serum*")] | order(_createdAt desc) {
    "id": coalesce(slug.current, _id),
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    stockCount,
    isBestSeller,
    isFlashDeal,
    isNew,
    discountBadge,
    image,
    hoverImage,
    description,
    sizes
  }
`;

export const latestProductsQuery = groq`
  *[_type == "product" && (category match "*Setting*" || isNew == true || category match "*Spray*")] | order(_createdAt desc) {
    "id": coalesce(slug.current, _id),
    name,
    category,
    price,
    originalPrice,
    rating,
    reviewCount,
    stockCount,
    isBestSeller,
    isFlashDeal,
    isNew,
    discountBadge,
    image,
    hoverImage,
    description,
    sizes
  }
`;
