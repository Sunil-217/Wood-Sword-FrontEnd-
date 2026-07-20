/** Top-level menu groups (mirror the reference store's structure). */
export type GroupSlug =
  | "bats"
  | "protection"
  | "wicket-keeping"
  | "full-kit-bags"
  | "ipl-kit-bags"
  | "accessories"
  | "bundles"
  | "clothing";

/** Leaf categories products belong to. */
export type CategorySlug =
  | "english-willow-bats"
  | "kashmir-willow-bats"
  | "fine-wood-willow-bats"
  | "batting-gloves"
  | "leg-guards"
  | "helmets"
  | "other-protection"
  | "wk-gloves"
  | "wk-leg-guards"
  | "boys-kit"
  | "youth-kit"
  | "adult-kit"
  | "ipl-kit-bags"
  | "accessories"
  | "bundles"
  | "clothing";

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

export interface Group {
  slug: GroupSlug;
  name: string;
  blurb: string;
  art: ArtKind;
  accent: string;
}

export interface Category {
  slug: CategorySlug;
  group: GroupSlug;
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
