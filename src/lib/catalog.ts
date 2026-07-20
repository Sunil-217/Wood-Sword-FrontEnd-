import type {
  ArtKind,
  Badge,
  Category,
  CategorySlug,
  Group,
  GroupSlug,
  Product,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Groups (top-level menu, mirrors the reference store)               */
/* ------------------------------------------------------------------ */

export const groups: Group[] = [
  {
    slug: "bats",
    name: "Bats",
    blurb: "English willow, Kashmir willow, scoop & custom bats.",
    art: "bat",
    accent: "#c8901c",
  },
  {
    slug: "protection",
    name: "Protection",
    blurb: "Gloves, leg guards, helmets and body protection.",
    art: "gloves",
    accent: "#256e49",
  },
  {
    slug: "wicket-keeping",
    name: "Wicket Keeping",
    blurb: "Keeping gloves, inners and leg guards.",
    art: "keeping",
    accent: "#a3521c",
  },
  {
    slug: "luggage",
    name: "Luggage",
    blurb: "Duffle bags, trolley kit bags and bat covers.",
    art: "bag",
    accent: "#184530",
  },
  {
    slug: "cricket-balls",
    name: "Cricket Balls",
    blurb: "Leather match balls for red and white-ball cricket.",
    art: "ball",
    accent: "#b92b22",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Grips, tapes, mallets, shoes and essentials.",
    art: "misc",
    accent: "#7c5cbf",
  },
  {
    slug: "bundles",
    name: "Bundles",
    blurb: "Team and individual kit bundles that save money.",
    art: "bag",
    accent: "#0f766e",
  },
  {
    slug: "clothing",
    name: "Clothing",
    blurb: "Caps, pants and tees for training and match day.",
    art: "jersey",
    accent: "#2f6fb0",
  },
];

export const groupMap: Record<GroupSlug, Group> = Object.fromEntries(
  groups.map((g) => [g.slug, g]),
) as Record<GroupSlug, Group>;

/* ------------------------------------------------------------------ */
/*  Leaf categories                                                    */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  { slug: "english-willow-bats", group: "bats", name: "English Willow", blurb: "Tournament-grade English willow bats.", art: "bat", accent: "#c8901c" },
  { slug: "kashmir-willow-bats", group: "bats", name: "Kashmir Willow", blurb: "Durable Kashmir willow for leather ball.", art: "bat", accent: "#b98328" },
  { slug: "fine-wood-willow-bats", group: "bats", name: "Fine Wood Willow", blurb: "Light, forgiving willow for club & tape ball.", art: "bat", accent: "#e0a82e" },
  { slug: "batting-gloves", group: "protection", name: "Batting Gloves", blurb: "The Armour-GX batting glove series.", art: "gloves", accent: "#256e49" },
  { slug: "leg-guards", group: "protection", name: "Batting Leg Guards", blurb: "Armour-LX pads, light and tough.", art: "pads", accent: "#2f6fb0" },
  { slug: "helmets", group: "protection", name: "Helmets", blurb: "Head protection that takes the knocks.", art: "helmet", accent: "#3b4252" },
  { slug: "other-protection", group: "protection", name: "Other Protection", blurb: "Arm, chest and thigh guards.", art: "pads", accent: "#7c5cbf" },
  { slug: "wk-gloves", group: "wicket-keeping", name: "WK Gloves", blurb: "Armour-GK keeping gloves.", art: "keeping", accent: "#a3521c" },
  { slug: "wk-leg-guards", group: "wicket-keeping", name: "WK Leg Guards", blurb: "Armour-LK keeping pads.", art: "pads", accent: "#8a5a2b" },
  { slug: "duffle-bags", group: "luggage", name: "Duffle Bags", blurb: "Wheelie duffles that swallow full kits.", art: "bag", accent: "#184530" },
  { slug: "trolley-bags", group: "luggage", name: "Trolley Bags", blurb: "Rolling kit bags for heavy loads.", art: "bag", accent: "#256e49" },
  { slug: "bat-covers", group: "luggage", name: "Bat Covers", blurb: "Padded covers for your willow.", art: "bag", accent: "#3a3f4a" },
  { slug: "cricket-balls", group: "cricket-balls", name: "Cricket Balls", blurb: "Cannon leather balls, red and white.", art: "ball", accent: "#b92b22" },
  { slug: "accessories", group: "accessories", name: "Accessories", blurb: "Grips, tapes, mallets, shoes and more.", art: "misc", accent: "#7c5cbf" },
  { slug: "bundles", group: "bundles", name: "Bundles", blurb: "Kit bundles for teams and individuals.", art: "bag", accent: "#0f766e" },
  { slug: "clothing", group: "clothing", name: "Clothing", blurb: "Caps, pants and tees.", art: "jersey", accent: "#2f6fb0" },
];

export const categoryMap: Record<CategorySlug, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;

/* ------------------------------------------------------------------ */
/*  Product helpers                                                    */
/* ------------------------------------------------------------------ */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[().']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Deterministic pseudo-rating so the catalog is stable between builds. */
function seeded(id: string): { rating: number; reviews: number } {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  const rating = 4.2 + (h % 9) / 10; // 4.2 – 5.0
  const reviews = 15 + (h % 380);
  return { rating: Math.round(rating * 10) / 10, reviews };
}

/** Tint the SVG art from the first recognisable colour in a colourway. */
function accentFor(colorway: string, fallback: string): string {
  const table: [string, string][] = [
    ["black", "#3a3f4a"],
    ["navy", "#27436e"],
    ["royal blue", "#2f6fb0"],
    ["blue", "#2f6fb0"],
    ["green", "#256e49"],
    ["red", "#b92b22"],
    ["maroon", "#7d2231"],
    ["pink", "#d6478e"],
    ["purple", "#7c5cbf"],
    ["yellow", "#d8a415"],
    ["fluorescent", "#87a832"],
    ["grey", "#5b6472"],
    ["gray", "#5b6472"],
    ["gold", "#c8901c"],
    ["camo", "#5a6b4f"],
    ["silver", "#8a8f99"],
    ["white", "#2f8f5e"],
  ];
  const lower = colorway.toLowerCase();
  for (const [word, hex] of table) if (lower.includes(word)) return hex;
  return fallback;
}

interface Partial {
  name: string;
  category: CategorySlug;
  price: number;
  mrp?: number;
  art?: ArtKind;
  accent?: string;
  colors?: string[];
  sizes?: string[];
  hands?: string[];
  badge?: Badge;
  brand?: string;
  tagline: string;
  description: string;
  features: string[];
  inStock?: boolean;
}

function P(p: Partial): Product {
  const cat = categoryMap[p.category];
  const id = slugify(p.name);
  const { rating, reviews } = seeded(id);
  return {
    id,
    slug: id,
    name: p.name,
    brand: p.brand ?? "Woodsword",
    category: p.category,
    art: p.art ?? cat.art,
    price: p.price,
    mrp: p.mrp,
    rating,
    reviews,
    accent: p.accent ?? cat.accent,
    colors: p.colors ?? ["Natural"],
    sizes: p.sizes ?? ["One Size"],
    hands: p.hands,
    badge: p.badge,
    tagline: p.tagline,
    description: p.description,
    features: p.features,
    inStock: p.inStock ?? true,
  };
}

/* ---------------------------- Bats ---------------------------- */

const EW_SIZES = ["Harrow", "Men's"];

function ewBat(
  name: string,
  price: number,
  mrp: number | undefined,
  grade: string,
  range: string,
  badge?: Badge,
): Product {
  return P({
    name: `${name} English Willow Bat`,
    category: "english-willow-bats",
    price,
    mrp,
    sizes: EW_SIZES,
    badge,
    tagline: `${grade} English willow · ${range} range`,
    description: `The ${name} from our ${range} range is pressed from ${grade.toLowerCase()} English willow and shaped for a clean pick-up with a generous sweet spot. Ping-tested and match-ready out of the wrapper.`,
    features: [
      `${grade} English willow cleft`,
      `${range} range profile`,
      "Ping-tested, pre-knocked face",
      "Sizes: Harrow & Men's",
    ],
  });
}

function kwBat(
  name: string,
  price: number,
  mrp: number | undefined,
  grade: string,
  profile: string,
): Product {
  return P({
    name: `${name} Kashmir Willow Bat`,
    category: "kashmir-willow-bats",
    price,
    mrp,
    sizes: ["Men's"],
    tagline: `${grade} Kashmir willow · ${profile} profile`,
    description: `The ${name} is seasoned ${grade.toLowerCase()} Kashmir willow with a ${profile.toLowerCase()} profile — a dependable leather-ball bat that shrugs off a full club season.`,
    features: [
      `${grade} Kashmir willow`,
      `${profile} profile`,
      "Cane handle with rubber grip",
      "Ready to play",
    ],
  });
}

function fineWoodBat(
  name: string,
  price: number,
  mrp: number | undefined,
  note: string,
  badge?: Badge,
): Product {
  return P({
    name: `${name} Fine Wood Willow Bat`,
    category: "fine-wood-willow-bats",
    price,
    mrp,
    sizes: ["Size 6", "Harrow", "Men's"],
    badge,
    tagline: "Fine wood willow · club & tape ball",
    description: `The ${name} is a fine wood willow bat — ${note}. A light, forgiving pick-up that's just as happy against a leather ball on a Sunday as a tennis ball in the gully.`,
    features: [
      "Seasoned fine wood willow",
      "Light, forgiving pick-up",
      "Full profile with thick edges",
      "Leather & tennis ball ready",
    ],
  });
}

/* ------------------------- Batting Gloves ------------------------- */

const GLOVE_SIZES = ["Youth", "Medium", "Large"];
const HANDS = ["Right Hand", "Left Hand"];

const GLOVE_FAMILY_NOTES: Record<string, string> = {
  "GX1": "flagship multi-piece sausage fingers with a Pittards-style palm",
  "GX2": "split-finger build for stroke-players who want mobility",
  "GX3": "top-of-the-line protection with floating side bars",
  "GX4": "lightweight match glove with a ventilated mesh back",
  "GX5": "colour-pop series with high-density foam shields",
  "GX6": "classic all-rounder with towelling wrist",
  "GX7": "pro-spec glove with reinforced lead-hand shielding",
  "GX8": "value match glove that punches above its price",
};

function glove(
  model: string,
  version: string,
  colorway: string,
  price: number,
  opts: { badge?: Badge; inStock?: boolean } = {},
): Product {
  const note = GLOVE_FAMILY_NOTES[model] ?? "protective match glove";
  return P({
    name: `Armour-${model} (${version}) Batting Gloves (${colorway})`,
    category: "batting-gloves",
    price,
    accent: accentFor(colorway, "#256e49"),
    colors: [colorway],
    sizes: GLOVE_SIZES,
    hands: HANDS,
    badge: opts.badge,
    inStock: opts.inStock,
    tagline: `Armour ${model} series · ${colorway}`,
    description: `The Armour-${model} (${version}) in ${colorway} — ${note}. Built for long innings with sweat-wicking lining and a secure wrap-around cuff.`,
    features: [
      `Armour ${model} series construction`,
      "High-density finger protection",
      "Sweat-wicking palm lining",
      "Youth to Large, left & right hand",
    ],
  });
}

/* ------------------------- Leg Guards ------------------------- */

const PAD_SIZES = ["Small Boys", "Boys", "Youth", "Medium", "Large"];
const PAD_HANDS = ["Right Hand", "Left Hand", "Ambidextrous"];

function legGuard(
  model: string,
  colorway: string,
  price: number,
  note: string,
  badge?: Badge,
): Product {
  return P({
    name: `Armour-${model} Batting Leg Guard (${colorway})`,
    category: "leg-guards",
    price,
    accent: accentFor(colorway.split("-").pop() ?? colorway, "#2f6fb0"),
    colors: [colorway],
    sizes: PAD_SIZES,
    hands: PAD_HANDS,
    badge,
    tagline: `Armour ${model} · ${colorway}`,
    description: `The Armour-${model} leg guard in ${colorway} — ${note}. Moulded knee roll, bolstered instep and quick-release straps.`,
    features: [
      "High-density foam bolsters",
      "Moulded knee roll",
      "Quick-release straps",
      "Small Boys to Large",
    ],
  });
}

/* ------------------------------------------------------------------ */
/*  The catalog                                                        */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  /* ---- Bats · English Willow (Monarchy & Cavalry ranges) ---- */
  ewBat("Emperor 1.0", 28000, undefined, "Grade 1", "Monarchy", "Pro"),
  ewBat("King 1.1", 22050, 24500, "Grade 1", "Monarchy", "Bestseller"),
  ewBat("King 1.2", 17550, 19500, "Grade 1", "Monarchy"),
  ewBat("King 1.3", 13950, 15500, "Grade 1", "Monarchy"),
  ewBat("Knight 1.1", 22050, 24500, "Grade 1", "Cavalry"),
  ewBat("Knight 1.2", 22050, 24500, "Grade 1", "Cavalry"),
  ewBat("Knight 1.3", 13950, 15500, "Grade 1", "Cavalry"),
  ewBat("Duke 2.0", 10350, 11500, "Grade 2", "Monarchy"),
  ewBat("Esquire 2.0", 10350, 11500, "Grade 2", "Cavalry"),
  ewBat("Prince 2.0", 10350, 11500, "Grade 2", "Monarchy"),
  ewBat("Trooper 2.1", 9450, 10500, "Grade 2", "Cavalry"),
  ewBat("Raw 3.0", 7650, 8500, "Grade 3", "Cavalry"),
  ewBat("Raw 4.0", 5850, 6500, "Grade 4", "Cavalry"),

  /* ---- Bats · Kashmir Willow ---- */
  kwBat("King", 2949, undefined, "Grade 1", "Mid-Low"),
  kwBat("Knight", 2949, 3949, "Grade 1", "Full Spine (Mid-Swell)"),
  kwBat("Duke", 2399, 2999, "Grade 2", "Low-Middle"),
  kwBat("Prince", 2399, undefined, "Grade 2", "Mid-Low"),
  kwBat("Raw", 1949, 2499, "Grade 3", "Full Spine (Mid-Swell)"),

  /* ---- Bats · Fine Wood Willow ---- */
  fineWoodBat("Sixer", 1899, 2499, "our best-value all-rounder with a big middle", "Bestseller"),
  fineWoodBat("Slogger", 1649, 2299, "a high-middle profile built for clean hitting"),
  fineWoodBat("Rookie", 1349, 1799, "a lighter junior-friendly starter bat"),
  fineWoodBat("Gully King", 1149, 1599, "the go-to bat for street and gully cricket"),

  /* ---- Protection · Batting Gloves (Armour-GX series) ---- */
  glove("GX1", "3.0", "Black-Gold", 1699),
  glove("GX1", "3.0", "Black-Silver", 1699),
  glove("GX1", "3.0", "Navy-Silver", 1699),
  glove("GX1", "3.0", "Royal Blue-Gold", 1699),
  glove("GX1", "3.0", "White-Gold", 1675, { badge: "Bestseller" }),
  glove("GX1", "3.0", "White-Silver", 1675),
  glove("GX2", "3.0", "White-Gray-Silver", 1675),
  glove("GX2", "3.0", "White-Red-Silver", 1675),
  glove("GX3", "3.0", "Black-Gray", 1725),
  glove("GX3", "3.0", "White-Gold", 1725, { badge: "Pro" }),
  glove("GX3", "3.0", "White-Maroon", 1725),
  glove("GX3", "3.0", "White-Red", 1699),
  glove("GX4", "3.0", "White-Camo-Black", 1675),
  glove("GX4", "3.0", "White-Navy-Green", 1675),
  glove("GX4", "4.0", "Black-Silver-Fluorescent", 1449),
  glove("GX4", "4.0", "White-Silver-Black", 1425),
  glove("GX4", "4.0", "White-Silver-Blue", 1425),
  glove("GX4", "4.0", "White-Silver-Red", 1399),
  glove("GX5", "3.0", "Fluorescent-Black", 1699),
  glove("GX5", "3.0", "Pink-Black", 1699),
  glove("GX5", "3.0", "Pink-Blue", 1699),
  glove("GX5", "3.0", "Purple-Gold", 1699),
  glove("GX5", "3.0", "Red-Gold", 1699),
  glove("GX5", "3.0", "White-Black-Grey", 1685),
  glove("GX5", "3.0", "White-Blue-Silver", 1685),
  glove("GX5", "3.0", "White-Green", 1685),
  glove("GX5", "3.0", "White-Red-Grey", 1685),
  glove("GX5", "3.0", "White-Silver", 1675),
  glove("GX5", "3.0", "Yellow-Blue", 1699),
  glove("GX6", "3.0", "White-Silver", 1675),
  glove("GX7", "3.0", "White-Black-Gold", 1699, { inStock: false }),
  glove("GX7", "3.0", "White-Navy-Red", 1699, { inStock: false }),
  glove("GX8", "3.0", "White-Silver", 1649),
  glove("GX8", "4.0", "White-Black", 1599, { badge: "New" }),
  glove("GX8", "4.0", "White-Blue", 1599, { badge: "New" }),
  glove("GX8", "4.0", "White-Red", 1599, { badge: "New" }),
  glove("GX8", "4.0", "White-Silver", 1599, { badge: "New" }),

  /* ---- Protection · Batting Leg Guards (Armour-LX series) ---- */
  legGuard("LX Lite", "White-Black", 1679, "the lightest pad in the range for quick singles"),
  legGuard("LX Lite", "White-Blue", 1679, "the lightest pad in the range for quick singles"),
  legGuard("LX Lite", "White-Green", 1679, "the lightest pad in the range for quick singles"),
  legGuard("LX Lite", "White-Red", 1679, "the lightest pad in the range for quick singles"),
  legGuard("LX1", "White-Gold", 2999, "our tournament flagship with cane-and-foam bolsters", "Pro"),
  legGuard("LX2", "White-Grey", 2999, "flagship-level protection in a stealth colourway"),
  legGuard("LX3", "White-Red", 2399, "a balanced club pad with reinforced side wings"),
  legGuard("LX4", "White-Blue", 2399, "a balanced club pad with reinforced side wings"),
  legGuard("LX5", "White-Black", 1699, "the everyday match pad that lasts seasons"),

  /* ---- Protection · Helmets ---- */
  P({
    name: "Armour-HXA1 Cricket Helmet (Green)",
    category: "helmets",
    price: 1099,
    colors: ["Green"],
    sizes: PAD_SIZES,
    tagline: "Adjustable club helmet · steel grille",
    description:
      "The Armour-HXA1 in green — an adjustable club helmet with a powder-coated steel grille and impact-absorbing shell liner.",
    features: ["Powder-coated steel grille", "Adjustable fit", "Vented ABS shell", "Small Boys to Large"],
  }),
  P({
    name: "Armour-HXA1 Cricket Helmet (Navy)",
    category: "helmets",
    price: 1099,
    colors: ["Navy"],
    sizes: PAD_SIZES,
    accent: "#27436e",
    tagline: "Adjustable club helmet · steel grille",
    description:
      "The Armour-HXA1 in navy — an adjustable club helmet with a powder-coated steel grille and impact-absorbing shell liner.",
    features: ["Powder-coated steel grille", "Adjustable fit", "Vented ABS shell", "Small Boys to Large"],
  }),
  P({
    name: "Armour-HXF1 Cricket Helmet (Navy)",
    category: "helmets",
    price: 1849,
    colors: ["Navy"],
    sizes: PAD_SIZES,
    accent: "#27436e",
    badge: "Bestseller",
    tagline: "Fixed-grille match helmet",
    description:
      "The Armour-HXF1 — our fixed-grille match helmet with a high-impact shell and moisture-wicking liner for long days at the crease.",
    features: ["Fixed steel grille", "High-impact shell", "Moisture-wicking liner", "Small Boys to Large"],
  }),
  P({
    name: "Armour-HXS1 Cricket Helmet (Navy)",
    category: "helmets",
    price: 799,
    colors: ["Navy"],
    sizes: PAD_SIZES,
    accent: "#27436e",
    tagline: "Entry club helmet · honest protection",
    description:
      "The Armour-HXS1 — entry-level protection that still takes the knocks. Ideal for academies and school squads.",
    features: ["Steel grille", "Vented shell", "Great academy value", "Small Boys to Large"],
  }),
  P({
    name: "DSC Defender Cricket Helmet",
    category: "helmets",
    brand: "DSC",
    price: 7890,
    colors: ["Navy", "Black", "Green"],
    sizes: PAD_SIZES,
    badge: "Pro",
    tagline: "Pro-tier third-party helmet",
    description:
      "The DSC Defender — a premium third-party helmet we stock for players who want top-shelf head protection.",
    features: ["Premium impact shell", "Pro-level grille", "Multiple colours", "Boys to Large"],
  }),
  P({
    name: "DSC Guard Cricket Helmet",
    category: "helmets",
    brand: "DSC",
    price: 8890,
    colors: ["Navy", "Black", "Grey"],
    sizes: PAD_SIZES,
    tagline: "Premium protection · DSC",
    description:
      "The DSC Guard — heavyweight protection from DSC with a reinforced grille and plush internal padding.",
    features: ["Reinforced grille", "Plush inner padding", "Multiple colours", "Boys to Large"],
  }),
  P({
    name: "DSC Scud Cricket Helmet",
    category: "helmets",
    brand: "DSC",
    price: 8900,
    colors: ["Navy", "Blue", "Black"],
    sizes: PAD_SIZES,
    tagline: "Top-line DSC match helmet",
    description:
      "The DSC Scud — DSC's top-line match helmet, built for serious cricket at every level.",
    features: ["Top-line impact rating", "Ventilated shell", "Multiple colours", "Boys to Large"],
  }),

  /* ---- Protection · Other ---- */
  P({
    name: "Armour-AX1 Arm Guard (White-Gold)",
    category: "other-protection",
    price: 399,
    colors: ["White-Gold"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    hands: ["Ambidextrous"],
    tagline: "Forearm shield · high-density foam",
    description:
      "The Armour-AX1 arm guard — high-density foam over the forearm with an elasticated wrap that stays put.",
    features: ["High-density foam shield", "Elastic strap wrap", "Ambidextrous", "Boys to Large"],
  }),
  P({
    name: "Armour-CX1 Chest Guard (White-Gold)",
    category: "other-protection",
    price: 699,
    colors: ["White-Gold"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    hands: ["Ambidextrous"],
    tagline: "Moulded chest protection",
    description:
      "The Armour-CX1 chest guard — contoured, moulded protection that sits flush under the shirt without restricting the pull shot.",
    features: ["Contoured moulded shell", "Breathable backing", "Ambidextrous", "Boys to Large"],
  }),
  P({
    name: "Armour-TX1 Thigh Pad (White-Gold)",
    category: "other-protection",
    price: 1199,
    colors: ["White-Gold"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    hands: ["Ambidextrous"],
    tagline: "Combo thigh protection",
    description:
      "The Armour-TX1 thigh pad — full-coverage foam sections that flex with your stride and shrug off the short ball.",
    features: ["Full-coverage foam", "Flexes with the stride", "Ambidextrous", "Boys to Large"],
  }),
  P({
    name: "Armour-TX2 Thigh Pad (Navy-Gold)",
    category: "other-protection",
    price: 999,
    colors: ["Navy-Gold"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    hands: ["Ambidextrous"],
    accent: "#27436e",
    tagline: "Club thigh pad · navy trim",
    description:
      "The Armour-TX2 thigh pad — club-grade protection with a navy trim, lighter than the TX1 for players who value speed.",
    features: ["Lightweight foam core", "Secure twin straps", "Ambidextrous", "Boys to Large"],
  }),

  /* ---- Wicket Keeping · Gloves ---- */
  P({
    name: "Armour-GK1 Wicket Keeping Gloves (Grey-Black)",
    category: "wk-gloves",
    price: 1749,
    colors: ["Grey-Black"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    accent: "#5b6472",
    badge: "Bestseller",
    tagline: "Flagship keeping glove · tacky web",
    description:
      "The Armour-GK1 — our flagship keeping glove with a super-tacky catching web and pre-curved finger stalls that swallow edges.",
    features: ["Tacky catching web", "Pre-curved stalls", "Reinforced palm", "Boys to Large"],
  }),
  P({
    name: "Armour-GK2 Wicket Keeping Gloves (White-Blue)",
    category: "wk-gloves",
    price: 1699,
    colors: ["White-Blue"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    accent: "#2f6fb0",
    tagline: "Club keeping glove · white-blue",
    description:
      "The Armour-GK2 in white-blue — a dependable club keeping glove with a padded palm and towelling cuff.",
    features: ["Padded catching palm", "Towelling cuff", "Flexible stalls", "Boys to Large"],
  }),
  P({
    name: "Armour-GK2 Wicket Keeping Gloves (White-Red)",
    category: "wk-gloves",
    price: 1699,
    colors: ["White-Red"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    accent: "#b92b22",
    tagline: "Club keeping glove · white-red",
    description:
      "The Armour-GK2 in white-red — a dependable club keeping glove with a padded palm and towelling cuff.",
    features: ["Padded catching palm", "Towelling cuff", "Flexible stalls", "Boys to Large"],
  }),
  P({
    name: "Tourney Wicket Keeping Gloves",
    category: "wk-gloves",
    price: 4500,
    colors: ["White", "Black", "Blue", "Grey", "Orange", "Red"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    badge: "Pro",
    tagline: "Tournament-grade keeping glove",
    description:
      "Our tournament-grade keeping glove for serious stumpers — premium leather palm, deep pocket and six colourways.",
    features: ["Premium leather palm", "Deep catching pocket", "Six colourways", "Boys to Large"],
  }),

  /* ---- Wicket Keeping · Leg Guards ---- */
  P({
    name: "Armour-LK1 Wicket Keeping Leg Guard (White-Grey)",
    category: "wk-leg-guards",
    price: 1749,
    colors: ["White-Grey"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    tagline: "Flagship keeping pad · low cut",
    description:
      "The Armour-LK1 — a low-cut keeping pad shaped for crouching long sessions, with reinforced knee blocks.",
    features: ["Low-cut keeping shape", "Reinforced knee block", "Twin straps", "Boys to Large"],
  }),
  P({
    name: "Armour-LK2 Wicket Keeping Leg Guard (White-Blue)",
    category: "wk-leg-guards",
    price: 1699,
    colors: ["White-Blue"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    accent: "#2f6fb0",
    tagline: "Club keeping pad · white-blue",
    description:
      "The Armour-LK2 in white-blue — agile club keeping pads that never slow your dive down leg.",
    features: ["Agile low profile", "Foam bolsters", "Twin straps", "Boys to Large"],
  }),
  P({
    name: "Armour-LK2 Wicket Keeping Leg Guard (White-Red)",
    category: "wk-leg-guards",
    price: 1699,
    colors: ["White-Red"],
    sizes: ["Boys", "Youth", "Medium", "Large"],
    accent: "#b92b22",
    tagline: "Club keeping pad · white-red",
    description:
      "The Armour-LK2 in white-red — agile club keeping pads that never slow your dive down leg.",
    features: ["Agile low profile", "Foam bolsters", "Twin straps", "Boys to Large"],
  }),

  /* ---- Luggage ---- */
  P({
    name: "DVX2 Duffle Wheelie Cricket Kit Bag (Black-Gold)",
    category: "duffle-bags",
    price: 3499,
    mrp: 5499,
    colors: ["Black-Gold"],
    sizes: ["One Size"],
    accent: "#3a3f4a",
    inStock: false,
    tagline: "Wheelie duffle · swallows a full kit",
    description:
      "The DVX2 duffle wheelie — a cavernous main compartment on rugged inline wheels, with a ventilated boot pocket and padded pull handle.",
    features: ["Rugged inline wheels", "Ventilated boot pocket", "Holds 2 bats + full kit", "Padded pull handle"],
  }),
  P({
    name: "Cricket Kit Bag with Trolley",
    category: "trolley-bags",
    price: 9890,
    colors: ["Blue", "Green"],
    sizes: ["Junior", "Senior", "Team"],
    tagline: "Rolling team kit bag",
    description:
      "Our trolley kit bag rolls the whole squad's gear to the ground — reinforced base, telescopic handle and three sizes up to full Team.",
    features: ["Telescopic trolley handle", "Reinforced base", "Junior / Senior / Team sizes", "Heavy-duty zips"],
  }),
  P({
    name: "Spartan Cricket Bat Cover",
    category: "bat-covers",
    brand: "Spartan",
    price: 1890,
    colors: ["Black"],
    sizes: ["Junior", "Senior"],
    accent: "#3a3f4a",
    tagline: "Padded single-bat cover",
    description:
      "A padded Spartan bat cover that keeps your willow safe in transit — plush lining, tough outer and a comfortable carry strap.",
    features: ["Padded plush lining", "Tough water-resistant outer", "Carry strap", "Junior & Senior"],
  }),

  /* ---- Cricket Balls (Cannon series) ---- */
  P({
    name: "Cannon 100 Leather Cricket Ball (Red)",
    category: "cricket-balls",
    price: 249,
    colors: ["Red"],
    sizes: ["Standard"],
    tagline: "Practice leather ball · red",
    description:
      "The Cannon 100 in red — an honest practice leather ball for nets and throwdowns, machine-stitched for consistency.",
    features: ["Machine-stitched seam", "2-piece leather", "Nets & practice", "Sold singly"],
  }),
  P({
    name: "Cannon 100 Leather Cricket Ball (White)",
    category: "cricket-balls",
    price: 275,
    colors: ["White"],
    sizes: ["Standard"],
    accent: "#8a8f99",
    tagline: "Practice leather ball · white",
    description:
      "The Cannon 100 in white — an honest practice leather ball for limited-overs nets, machine-stitched for consistency.",
    features: ["Machine-stitched seam", "2-piece leather", "White-ball practice", "Sold singly"],
  }),
  P({
    name: "Cannon 300 Leather Cricket Ball (Red)",
    category: "cricket-balls",
    price: 299,
    colors: ["Red"],
    sizes: ["Standard"],
    badge: "Bestseller",
    tagline: "Club match ball · red",
    description:
      "The Cannon 300 in red — a club match ball with a cork core and hand-finished seam that holds shape past 30 overs.",
    features: ["Cork & wool core", "Hand-finished seam", "Club match grade", "Sold singly"],
  }),
  P({
    name: "Cannon 300 Leather Cricket Ball (White)",
    category: "cricket-balls",
    price: 325,
    colors: ["White"],
    sizes: ["Standard"],
    accent: "#8a8f99",
    tagline: "Club match ball · white",
    description:
      "The Cannon 300 in white — a club match ball for limited-overs cricket, lacquered to stay visible under lights.",
    features: ["Cork & wool core", "Bright lacquer finish", "Limited-overs grade", "Sold singly"],
  }),
  P({
    name: "Cannon 500 Leather Cricket Ball (Red)",
    category: "cricket-balls",
    price: 399,
    colors: ["Red"],
    sizes: ["Standard"],
    badge: "Pro",
    tagline: "Premium match ball · alum-tanned",
    description:
      "The Cannon 500 — our premium 4-piece match ball. Alum-tanned leather and a proud hand-stitched seam for 40+ over spells.",
    features: ["4-piece alum-tanned leather", "Proud hand-stitched seam", "Tournament grade", "Sold singly"],
  }),

  /* ---- Accessories ---- */
  P({
    name: "Bat Mallet Hammer",
    category: "accessories",
    price: 1890,
    inStock: false,
    tagline: "Hardwood knocking-in mallet",
    description:
      "A hardwood mallet for knocking in new willow — weighted head, comfortable grip and the tool every new bat deserves.",
    features: ["Weighted hardwood head", "Comfort grip handle", "Knock-in essential", "Lifetime tool"],
  }),
  P({
    name: "Cricket Bat Grip Cone",
    category: "accessories",
    price: 1900,
    mrp: 2000,
    tagline: "Fit grips in seconds",
    description:
      "The grip cone every kit room needs — roll a fresh rubber grip onto any handle in seconds without tearing it.",
    features: ["Steel cone build", "Fits all grips", "Kit-room essential", "Saves torn grips"],
  }),
  P({
    name: "Cricket Bat Tapes",
    category: "accessories",
    price: 199,
    tagline: "Protective face & edge tape",
    description:
      "Protective fibre tape for faces and edges — extends bat life through hard seasons and rough practice decks.",
    features: ["Tough fibre weave", "Easy to apply", "Face & edge protection", "One roll"],
  }),
  P({
    name: "DSC Beamer Cricket Shoes",
    category: "accessories",
    brand: "DSC",
    price: 13211,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["White-Blue"],
    accent: "#2f6fb0",
    tagline: "All-rounder cricket shoes",
    description:
      "The DSC Beamer — cushioned all-rounder shoes with rubber studs for turf and hard grounds alike.",
    features: ["Cushioned midsole", "Rubber stud outsole", "Breathable upper", "UK 7–11"],
  }),
  P({
    name: "DSC Hawk 2.0 with Velcro",
    category: "accessories",
    brand: "DSC",
    price: 14565,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["White-Red"],
    accent: "#b92b22",
    tagline: "Velcro-lock bowling shoes",
    description:
      "The DSC Hawk 2.0 — bowling shoes with a velcro lock-down strap for a planted front foot at the crease.",
    features: ["Velcro lock-down strap", "Reinforced toe box", "High-impact heel", "UK 7–11"],
  }),
  P({
    name: "DSC Zooter Cricket Shoe",
    category: "accessories",
    brand: "DSC",
    price: 12345,
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["White-Green"],
    accent: "#256e49",
    tagline: "Lightweight batting shoes",
    description:
      "The DSC Zooter — lightweight batting shoes built for quick singles, with a grippy sole and snug lockdown fit.",
    features: ["Lightweight build", "Grippy outsole", "Snug lockdown fit", "UK 7–11"],
  }),
  P({
    name: "Face Protection Tape",
    category: "accessories",
    price: 125,
    tagline: "Clear anti-scuff facing",
    description:
      "Clear anti-scuff tape that guards the bat face against cracking without deadening the ping.",
    features: ["Crystal-clear finish", "Anti-scuff protection", "Doesn't deaden ping", "One sheet"],
  }),
  P({
    name: "S4C Coil Cricket Bat Grip (Multicolour)",
    category: "accessories",
    brand: "S4C",
    price: 1150,
    colors: ["Multicolour"],
    tagline: "Coil-pattern replacement grip",
    description:
      "The S4C coil grip in multicolour — extra cushion and a distinctive coil texture for bats that get noticed.",
    features: ["Coil tack pattern", "Shock-absorbing rubber", "Fits all handles", "Multicolour"],
  }),
  P({
    name: "Toe Guard",
    category: "accessories",
    price: 2345,
    tagline: "Fitted toe protection",
    description:
      "A fitted toe guard kit that shields the most vulnerable inch of your bat from yorkers and damp decks.",
    features: ["Tough composite shield", "Fitted application", "Yorker & moisture protection", "Kit for one bat"],
  }),

  /* ---- Bundles ---- */
  P({
    name: "Club Team Kit Bundle – Junior",
    category: "bundles",
    price: 12345,
    sizes: ["Junior"],
    tagline: "Full junior squad starter kit",
    description:
      "Everything a junior squad needs in one box — bats, pads, gloves, helmet and a kit bag, matched and sized for juniors.",
    features: ["Complete junior kit", "Matched protection set", "Kit bag included", "Team pricing"],
  }),
  P({
    name: "Cricket Team Kit Bundle",
    category: "bundles",
    price: 2599,
    badge: "Bestseller",
    tagline: "Starter bundle · unbeatable value",
    description:
      "Our most popular starter bundle — the essentials to get a new cricketer match-ready without breaking the bank.",
    features: ["Starter essentials", "Great first kit", "Gift-ready", "Best value"],
  }),
  P({
    name: "Senior Pack Cricket Bundle",
    category: "bundles",
    price: 14543,
    sizes: ["Senior"],
    tagline: "Full senior match-day pack",
    description:
      "The full senior pack — match-grade bat, pads, gloves, helmet and luggage, curated so every piece works together.",
    features: ["Match-grade selection", "Complete protection", "Luggage included", "Senior sizing"],
  }),

  /* ---- Clothing ---- */
  P({
    name: "Cricket Cap",
    category: "clothing",
    price: 1123,
    colors: ["Blue", "White", "Yellow"],
    sizes: ["Boys", "Small", "Medium", "Large", "X Large"],
    tagline: "Classic on-field cap",
    description:
      "A classic six-panel cricket cap in team colours — breathable cotton with an adjustable strap.",
    features: ["Six-panel cotton", "Adjustable strap", "Three colours", "Boys to X Large"],
  }),
  P({
    name: "Cricket Pants",
    category: "clothing",
    price: 10211,
    colors: ["White", "Blue"],
    sizes: ["Boys", "Small", "Medium", "Large", "X Large"],
    tagline: "Pro-fit match trousers",
    description:
      "Pro-fit cricket pants with a stretch waistband and crease-resistant weave that stays sharp through the last over.",
    features: ["Stretch waistband", "Crease-resistant weave", "Reinforced knees", "Boys to X Large"],
  }),
  P({
    name: "Cricket T-shirt",
    category: "clothing",
    price: 8999,
    colors: ["Blue", "White", "Yellow"],
    sizes: ["Boys", "Small", "Medium", "Large", "X Large"],
    tagline: "Dri-fit training tee",
    description:
      "A moisture-wicking training tee with raglan sleeves for a full swing — ready for names and numbers.",
    features: ["Moisture-wicking knit", "Raglan stretch sleeves", "Print-ready", "Boys to X Large"],
  }),
];

/* ------------------------------------------------------------------ */
/*  Lookups                                                            */
/* ------------------------------------------------------------------ */

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function productsByGroup(slug: GroupSlug): Product[] {
  return products.filter((p) => categoryMap[p.category].group === slug);
}

export function categoriesInGroup(slug: GroupSlug): Category[] {
  return categories.filter((c) => c.group === slug);
}

export function featuredProducts(count = 8): Product[] {
  return [...products]
    .filter((p) => p.inStock)
    .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    .slice(0, count);
}

export function relatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, count);
}
