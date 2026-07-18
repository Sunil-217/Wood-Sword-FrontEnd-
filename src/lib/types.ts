export type CategorySlug =
  | "bats"
  | "batting-gloves"
  | "leg-guards"
  | "helmets"
  | "wicket-keeping"
  | "cricket-balls"
  | "kit-bags"
  | "clothing"
  | "accessories";

/** Which SVG illustration to render for a product / category. */
export type ArtKind =
  | "bat"
  | "gloves"
  | "pads"
  | "helmet"
  | "ball"
  | "keeping"
  | "bag"
  | "jersey"
  | "misc";

export type Badge = "New" | "Bestseller" | "Sale" | "Pro";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategorySlug;
  art: ArtKind;
  /** Selling price in INR. */
  price: number;
  /** Optional MRP to show a strikethrough + discount. */
  mrp?: number;
  rating: number;
  reviews: number;
  /** Accent hex used to tint the product artwork. */
  accent: string;
  colors: string[];
  sizes: string[];
  hands?: string[];
  badge?: Badge;
  tagline: string;
  description: string;
  features: string[];
  inStock: boolean;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  blurb: string;
  art: ArtKind;
  accent: string;
}

export interface CartLine {
  id: string; // product id + variant key
  productId: string;
  slug: string;
  name: string;
  brand: string;
  art: ArtKind;
  accent: string;
  price: number;
  size?: string;
  color?: string;
  hand?: string;
  qty: number;
}
