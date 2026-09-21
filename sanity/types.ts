export interface SanityProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stockCount: number;
  isBestSeller?: boolean;
  isFlashDeal?: boolean;
  isNew?: boolean;
  discountBadge?: string;
  image: string;
  hoverImage?: string;
  description?: string;
  sizes?: string[];
}
