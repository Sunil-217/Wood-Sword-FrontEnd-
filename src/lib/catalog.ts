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
/*  Groups (top-level menu — one per sport / department)               */
/* ------------------------------------------------------------------ */

export const groups: Group[] = [
  {
    slug: "cricket",
    name: "Cricket",
    blurb: "Bats, balls, protection, kit bags and whites.",
    art: "bat",
    accent: "#c8901c",
  },
  {
    slug: "badminton",
    name: "Badminton",
    blurb: "Racquets, shuttles, grips and kit bags.",
    art: "racquet",
    accent: "#0f766e",
  },
  {
    slug: "football",
    name: "Football",
    blurb: "Match & training balls and keeper gloves.",
    art: "football",
    accent: "#256e49",
  },
  {
    slug: "basketball",
    name: "Basketball",
    blurb: "Indoor and outdoor basketballs.",
    art: "basketball",
    accent: "#c2571f",
  },
  {
    slug: "volleyball",
    name: "Volleyball",
    blurb: "Soft-touch match and training volleyballs.",
    art: "volleyball",
    accent: "#2f6fb0",
  },
  {
    slug: "table-tennis",
    name: "Table Tennis",
    blurb: "Bats, balls and full-size tournament tables.",
    art: "tt-bat",
    accent: "#b92b22",
  },
  {
    slug: "shoes",
    name: "Shoes",
    blurb: "Sport-specific footwear for every surface.",
    art: "shoe",
    accent: "#3a3f4a",
  },
  {
    slug: "fitness",
    name: "Fitness",
    blurb: "Yoga, strength training and body supports.",
    art: "dumbbell",
    accent: "#7c5cbf",
  },
  {
    slug: "leisure",
    name: "Leisure Sports",
    blurb: "Carrom, chess and darts for indoors.",
    art: "carrom",
    accent: "#a3521c",
  },
  {
    slug: "swimming",
    name: "Swimming",
    blurb: "Jammers, trunks, goggles and caps.",
    art: "swim",
    accent: "#1f8fb2",
  },
  {
    slug: "skating",
    name: "Skating",
    blurb: "Skateboards, quad skates and inline skates.",
    art: "skate",
    accent: "#d6478e",
  },
  {
    slug: "throwball",
    name: "Throw Ball",
    blurb: "Match throw balls and nets.",
    art: "volleyball",
    accent: "#d8a415",
  },
  {
    slug: "tennikoit",
    name: "Tennikoit",
    blurb: "Rubber tennikoit rings and nets.",
    art: "misc",
    accent: "#87a832",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Grips, pumps, bottles, socks and spares.",
    art: "grip",
    accent: "#5b6472",
  },
];

export const groupMap: Record<GroupSlug, Group> = Object.fromEntries(
  groups.map((g) => [g.slug, g]),
) as Record<GroupSlug, Group>;

/* ------------------------------------------------------------------ */
/*  Leaf categories                                                    */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  /* Cricket */
  { slug: "cricket-bats", group: "cricket", name: "Bats", blurb: "English & Kashmir willow from SG, SS, GN, NB and more.", art: "bat", accent: "#c8901c" },
  { slug: "cricket-balls", group: "cricket", name: "Balls", blurb: "Leather, season and practice cricket balls.", art: "ball", accent: "#b92b22" },
  { slug: "batting-gloves", group: "cricket", name: "Batting Gloves", blurb: "Test, match and academy batting gloves.", art: "gloves", accent: "#256e49" },
  { slug: "batting-pads", group: "cricket", name: "Batting Pads", blurb: "Leg guards from boys to men's, LH & RH.", art: "pads", accent: "#2f6fb0" },
  { slug: "cricket-helmets", group: "cricket", name: "Helmets", blurb: "Steel-grille helmets from Shrey, SS and DSC.", art: "helmet", accent: "#3b4252" },
  { slug: "wk-gloves", group: "cricket", name: "WK Gloves", blurb: "Wicket-keeping gloves and inners.", art: "keeping", accent: "#a3521c" },
  { slug: "wk-pads", group: "cricket", name: "WK Pads", blurb: "Lightweight keeping leg guards.", art: "pads", accent: "#8a5a2b" },
  { slug: "cricket-guards", group: "cricket", name: "Guards & Protection", blurb: "Chest, thigh, arm and abdominal guards.", art: "pads", accent: "#7c5cbf" },
  { slug: "cricket-kit-bags", group: "cricket", name: "Kit Bags", blurb: "Duffle, wheelie and junior kit bags.", art: "bag", accent: "#184530" },
  { slug: "cricket-apparel", group: "cricket", name: "Apparel", blurb: "Whites, coloured kit, skins and compression.", art: "jersey", accent: "#2f6fb0" },
  { slug: "cricket-caps", group: "cricket", name: "Caps & Hats", blurb: "Match caps, sun hats and headbands.", art: "cap", accent: "#27436e" },
  { slug: "cricket-stumps", group: "cricket", name: "Stumps", blurb: "Wooden and spring-back stump sets.", art: "misc", accent: "#a3521c" },
  { slug: "bat-care", group: "cricket", name: "Bat Care & Grips", blurb: "Grips, anti-scuff, toe guards and mallets.", art: "grip", accent: "#d8a415" },

  /* Badminton */
  { slug: "badminton-racquets", group: "badminton", name: "Racquets", blurb: "Yonex, Li-Ning and FZ Forza racquets.", art: "racquet", accent: "#0f766e" },
  { slug: "shuttlecocks", group: "badminton", name: "Shuttlecocks", blurb: "Feather and nylon shuttles by speed.", art: "shuttle", accent: "#5b6472" },
  { slug: "badminton-grips", group: "badminton", name: "Grips & Strings", blurb: "Replacement grips, overgrips and string.", art: "grip", accent: "#87a832" },
  { slug: "badminton-kit-bags", group: "badminton", name: "Kit Bags", blurb: "Thermal racquet bags and backpacks.", art: "bag", accent: "#27436e" },

  /* Football */
  { slug: "football-balls", group: "football", name: "Footballs", blurb: "Match and trainer footballs, size 3–5.", art: "football", accent: "#256e49" },
  { slug: "gk-gloves", group: "football", name: "GK Gloves", blurb: "Goalkeeper gloves with latex palms.", art: "gloves", accent: "#b92b22" },

  /* Basketball / Volleyball */
  { slug: "basketball-balls", group: "basketball", name: "Basketballs", blurb: "Rubber and composite basketballs, size 5–7.", art: "basketball", accent: "#c2571f" },
  { slug: "volleyball-balls", group: "volleyball", name: "Volleyballs", blurb: "Soft-touch match and training volleyballs.", art: "volleyball", accent: "#2f6fb0" },

  /* Table tennis */
  { slug: "tt-bats", group: "table-tennis", name: "TT Bats", blurb: "Stag and GKI bats from 3 to 5 star.", art: "tt-bat", accent: "#b92b22" },
  { slug: "tt-balls", group: "table-tennis", name: "TT Balls", blurb: "ABS 40+ poly balls, 1 to 3 star.", art: "ball", accent: "#d8a415" },
  { slug: "tt-tables", group: "table-tennis", name: "TT Tables", blurb: "Full-size rollaway tournament tables.", art: "tt-table", accent: "#184530" },

  /* Shoes */
  { slug: "cricket-shoes", group: "shoes", name: "Cricket Shoes", blurb: "Spike and rubber-sole cricket shoes.", art: "shoe", accent: "#256e49" },
  { slug: "badminton-shoes", group: "shoes", name: "Badminton Shoes", blurb: "Non-marking indoor court shoes.", art: "shoe", accent: "#0f766e" },
  { slug: "football-shoes", group: "shoes", name: "Football Shoes", blurb: "Studs and turf boots.", art: "shoe", accent: "#3a3f4a" },
  { slug: "basketball-shoes", group: "shoes", name: "Basketball Shoes", blurb: "High-ankle cushioned basketball shoes.", art: "shoe", accent: "#c2571f" },
  { slug: "running-shoes", group: "shoes", name: "Running & Jogging", blurb: "Everyday running and athletics shoes.", art: "shoe", accent: "#2f6fb0" },
  { slug: "volleyball-shoes", group: "shoes", name: "Volleyball Shoes", blurb: "Grippy indoor volleyball shoes.", art: "shoe", accent: "#7c5cbf" },

  /* Fitness */
  { slug: "yoga", group: "fitness", name: "Yoga", blurb: "TPE and PE yoga mats and blocks.", art: "yoga", accent: "#7c5cbf" },
  { slug: "gym-training", group: "fitness", name: "Gym & Training", blurb: "Dumbbells, medicine balls and tubes.", art: "dumbbell", accent: "#3a3f4a" },
  { slug: "sports-support", group: "fitness", name: "Supports & Braces", blurb: "Nivia knee, waist and ankle supports.", art: "pads", accent: "#256e49" },

  /* Leisure */
  { slug: "carrom", group: "leisure", name: "Carrom", blurb: "Boards, coins, strikers, stands and powder.", art: "carrom", accent: "#a3521c" },
  { slug: "chess", group: "leisure", name: "Chess", blurb: "Wooden and magnetic chess sets.", art: "chess", accent: "#3a3f4a" },
  { slug: "darts", group: "leisure", name: "Darts", blurb: "Magnetic and steel-tip dart sets.", art: "dart", accent: "#b92b22" },

  /* Swimming */
  { slug: "swimwear", group: "swimming", name: "Swimwear", blurb: "Jammers, trunks, briefs and swim skins.", art: "swim", accent: "#1f8fb2" },
  { slug: "swim-accessories", group: "swimming", name: "Swim Accessories", blurb: "Goggles, caps, nose clips and floats.", art: "swim", accent: "#2f6fb0" },

  /* Singles */
  { slug: "skating", group: "skating", name: "Skating", blurb: "Skateboards, quad and inline skates.", art: "skate", accent: "#d6478e" },
  { slug: "throwball", group: "throwball", name: "Throw Ball", blurb: "Match-grade throw balls and nets.", art: "volleyball", accent: "#d8a415" },
  { slug: "tennikoit", group: "tennikoit", name: "Tennikoit", blurb: "Rubber rings and tennikoit nets.", art: "misc", accent: "#87a832" },

  /* Accessories */
  { slug: "cricket-accessories", group: "accessories", name: "Cricket Accessories", blurb: "Guards, cones, markers and spares.", art: "misc", accent: "#c8901c" },
  { slug: "badminton-accessories", group: "accessories", name: "Badminton Accessories", blurb: "Grips, strings, thermal covers.", art: "grip", accent: "#0f766e" },
  { slug: "football-accessories", group: "accessories", name: "Football Accessories", blurb: "Pumps, shin guards and markers.", art: "misc", accent: "#256e49" },
  { slug: "socks", group: "accessories", name: "Socks", blurb: "Ankle and crew sports socks.", art: "socks", accent: "#5b6472" },
  { slug: "water-bottles", group: "accessories", name: "Bottles & Hydration", blurb: "Sipper bottles and hydration packs.", art: "bottle", accent: "#2f6fb0" },
];

export const categoryMap: Record<CategorySlug, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[().'\\/*+]/g, " ")
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

const COLOUR_WORDS: [string, string][] = [
  ["black", "#3a3f4a"],
  ["navy", "#27436e"],
  ["royal", "#2f6fb0"],
  ["blue", "#2f6fb0"],
  ["green", "#256e49"],
  ["red", "#b92b22"],
  ["maroon", "#7d2231"],
  ["pink", "#d6478e"],
  ["purple", "#7c5cbf"],
  ["orange", "#e0742a"],
  ["yellow", "#d8a415"],
  ["fluorescent", "#87a832"],
  ["grey", "#5b6472"],
  ["gray", "#5b6472"],
  ["gold", "#c8901c"],
  ["camo", "#5a6b4f"],
  ["silver", "#8a8f99"],
  ["teal", "#0f766e"],
  ["white", "#2f8f5e"],
];

/** Tint the SVG art from the first recognisable colour word in a string. */
function accentFor(text: string, fallback: string): string {
  const lower = text.toLowerCase();
  for (const [word, hex] of COLOUR_WORDS) if (lower.includes(word)) return hex;
  return fallback;
}

/** Brands stocked in store, longest-first so "LI-NING" beats "LINING". */
const BRANDS = [
  "ADIDAS",
  "AIRAVAT",
  "ASICS",
  "BDM",
  "COSCO",
  "DSC",
  "FZ FORZA",
  "FORZA",
  "GKI",
  "GN",
  "HEAD",
  "HERCULES",
  "KAMATCHI",
  "LI-NING",
  "LINING",
  "MRF",
  "NB",
  "NIVIA",
  "ONEUP",
  "ONE UP",
  "RNS",
  "SG",
  "SHREY",
  "SPARTAN",
  "SPORTIFF",
  "SS",
  "STAG",
  "TON",
  "VECTOR X",
  "VINTAGE",
  "VIXEN",
  "YONEX",
];

const BRAND_LABEL: Record<string, string> = {
  "LI-NING": "Li-Ning",
  LINING: "Li-Ning",
  "FZ FORZA": "FZ Forza",
  FORZA: "FZ Forza",
  ONEUP: "Oneup Sports",
  "ONE UP": "Oneup Sports",
  "VECTOR X": "Vector X",
  ADIDAS: "Adidas",
  ASICS: "Asics",
  AIRAVAT: "Airavat",
  NIVIA: "Nivia",
  SHREY: "Shrey",
  SPARTAN: "Spartan",
  SPORTIFF: "Sportiff",
  STAG: "Stag",
  HEAD: "Head",
  HERCULES: "Hercules",
  KAMATCHI: "Kamatchi",
  VINTAGE: "Vintage",
  VIXEN: "Vixen",
  YONEX: "Yonex",
  COSCO: "Cosco",
};

/** Pull the brand out of a product name like "SG KLR ULTIMATE". */
function brandFor(name: string): string {
  const upper = name.toUpperCase();
  const hit = [...BRANDS]
    .sort((a, b) => b.length - a.length)
    .find((b) => upper.startsWith(b + " ") || upper === b);
  if (!hit) return "Oneup Sports";
  return BRAND_LABEL[hit] ?? hit;
}

/* --------------------- Per-category defaults ---------------------- */

const SIZES: Partial<Record<CategorySlug, string[]>> = {
  "cricket-bats": ["Size 5", "Size 6", "Harrow", "SH (Men's)", "LB (Long Blade)"],
  "batting-gloves": ["Boys", "Youth", "Men's"],
  "batting-pads": ["Boys", "Youth", "Men's"],
  "cricket-helmets": ["Junior", "Small", "Medium", "Large"],
  "wk-gloves": ["Boys", "Youth", "Men's"],
  "wk-pads": ["Boys", "Youth", "Men's"],
  "cricket-guards": ["Boys", "Youth", "Men's"],
  "cricket-apparel": ["S", "M", "L", "XL", "XXL"],
  "cricket-caps": ["Free Size"],
  "badminton-racquets": ["G4 (3U)", "G5 (4U)", "G6 (5U)"],
  "badminton-grips": ["Single", "3 in 1", "6 in 1"],
  "cricket-shoes": ["UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  "badminton-shoes": ["UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  "football-shoes": ["UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  "basketball-shoes": ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  "running-shoes": ["UK 5", "UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  "volleyball-shoes": ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
  swimwear: ["XS", "S", "M", "L", "XL"],
  "sports-support": ["S", "M", "L", "XL"],
  socks: ["Free Size", "S", "M", "L"],
  "football-balls": ["Size 3", "Size 4", "Size 5"],
  "basketball-balls": ["Size 5", "Size 6", "Size 7"],
};

const HANDS: Partial<Record<CategorySlug, string[]>> = {
  "batting-gloves": ["Right Hand", "Left Hand"],
  "batting-pads": ["Right Hand", "Left Hand"],
  "wk-gloves": ["Right Hand", "Left Hand"],
  "gk-gloves": ["Right Hand", "Left Hand"],
};

interface Copy {
  tagline: string;
  desc: (name: string, brand: string) => string;
  features: string[];
}

const COPY: Record<CategorySlug, Copy> = {
  "cricket-bats": {
    tagline: "English willow · ready to play",
    desc: (n, b) =>
      `The ${n} from ${b} is pressed for a clean pick-up and a big, forgiving middle. Cane handle with a rubber grip, ping-tested before it leaves the shop and knocked in on request.`,
    features: ["Grade-selected willow cleft", "Cane handle with rubber grip", "Ping-tested before dispatch", "Free knocking-in service"],
  },
  "cricket-balls": {
    tagline: "Leather · match & practice",
    desc: (n, b) => `The ${n} by ${b} — alum-tanned leather over a cork-and-wool core, hand-stitched with a raised seam that stays proud for overs on end.`,
    features: ["Alum-tanned leather", "Cork and wool wound core", "Hand-stitched raised seam", "Match & practice grades"],
  },
  "batting-gloves": {
    tagline: "Match gloves · LH & RH",
    desc: (n, b) => `The ${n} from ${b} — high-density foam over the fingers and thumb, a sweat-wicking palm and a wrap-around cuff that stays put through a long innings.`,
    features: ["High-density finger protection", "Sweat-wicking palm lining", "Wrap-around towelling cuff", "Boys, Youth & Men's · LH/RH"],
  },
  "batting-pads": {
    tagline: "Leg guards · LH & RH",
    desc: (n, b) => `The ${n} by ${b} — moulded knee roll, bolstered instep and quick-release straps. Light enough to run in, tough enough for the quicks.`,
    features: ["Moulded knee roll", "High-density foam bolsters", "Quick-release straps", "Boys, Youth & Men's · LH/RH"],
  },
  "cricket-helmets": {
    tagline: "Steel grille · adjustable fit",
    desc: (n, b) => `The ${n} from ${b} — a vented high-impact shell with a powder-coated steel grille and an adjustable harness that locks the fit in place.`,
    features: ["Powder-coated steel grille", "Vented high-impact shell", "Adjustable harness", "Junior to Large"],
  },
  "wk-gloves": {
    tagline: "Keeping gloves · webbed",
    desc: (n, b) => `The ${n} by ${b} — a deep, supple web for clean takes, reinforced finger protection and a snug cuff that keeps the inners in place.`,
    features: ["Deep supple web", "Reinforced finger protection", "Snug elasticated cuff", "Boys, Youth & Men's"],
  },
  "wk-pads": {
    tagline: "Keeping pads · low profile",
    desc: (n, b) => `The ${n} by ${b} — low-profile keeping pads that stay out of the way when you go down the leg side, with a moulded knee and light instep.`,
    features: ["Low-profile keeping build", "Moulded knee cup", "Lightweight instep", "Boys, Youth & Men's"],
  },
  "cricket-guards": {
    tagline: "Protection · chest, thigh & arm",
    desc: (n, b) => `The ${n} from ${b} — contoured padding that spreads impact without pinning your arms down. Breathable backing so it doesn't cook you in the middle.`,
    features: ["Contoured impact padding", "Breathable mesh backing", "Adjustable elastic straps", "Boys, Youth & Men's"],
  },
  "cricket-kit-bags": {
    tagline: "Kit bag · full-kit capacity",
    desc: (n, b) => `The ${n} by ${b} — swallows bats, pads, gloves and shoes with room to spare. Ventilated boot pocket and heavy-duty zips throughout.`,
    features: ["Holds a full kit + bats", "Ventilated boot pocket", "Heavy-duty zips", "Padded shoulder strap"],
  },
  "cricket-apparel": {
    tagline: "On-field kit · breathable",
    desc: (n, b) => `The ${n} from ${b} — moisture-wicking fabric with a four-way stretch that moves with the shot. Holds its shape and colour wash after wash.`,
    features: ["Moisture-wicking fabric", "Four-way stretch", "Flatlock seams", "S to XXL"],
  },
  "cricket-caps": {
    tagline: "Match cap · breathable cotton",
    desc: (n, b) => `The ${n} by ${b} — a breathable cotton cap with an adjustable strap and a sweatband that actually earns its name.`,
    features: ["Breathable cotton panels", "Adjustable strap", "Absorbent sweatband", "Free size"],
  },
  "cricket-stumps": {
    tagline: "Stump set · match spec",
    desc: (n, b) => `The ${n} from ${b} — a full set of turned stumps with bails, finished and sized to match regulations.`,
    features: ["Full set with bails", "Turned and lacquered", "Match-regulation sizing", "Carry bag included"],
  },
  "bat-care": {
    tagline: "Bat care · grips & guards",
    desc: (n, b) => `The ${n} by ${b} — bat-care essentials that add seasons to a good cleft without deadening the ping.`,
    features: ["Protects the blade", "Doesn't deaden ping", "Simple to fit", "Fits all standard handles"],
  },
  "badminton-racquets": {
    tagline: "Racquet · strung & covered",
    desc: (n, b) => `The ${n} from ${b} — a graphite frame tuned for a fast swing and a solid feel at contact. Supplied strung with a full-length cover.`,
    features: ["Graphite composite frame", "Supplied strung", "Full-length cover included", "G4 / G5 / G6 grips"],
  },
  shuttlecocks: {
    tagline: "Shuttles · speed graded",
    desc: (n, b) => `The ${n} by ${b} — consistent flight and a predictable drop, graded by speed so the tube plays the same from the first bird to the last.`,
    features: ["Consistent flight & drop", "Speed-graded batches", "Tube of 6/12", "Feather & nylon options"],
  },
  "badminton-grips": {
    tagline: "Grips & string · court spares",
    desc: (n, b) => `The ${n} from ${b} — tacky, sweat-resistant and quick to wrap. Keeps the racquet where you put it in the third game.`,
    features: ["Tacky sweat-resistant finish", "Quick to re-wrap", "Multi-packs available", "Fits all racquet handles"],
  },
  "badminton-kit-bags": {
    tagline: "Racquet bag · thermal lined",
    desc: (n, b) => `The ${n} by ${b} — a thermal-lined main compartment that keeps strings out of the heat, plus a separate shoe pocket.`,
    features: ["Thermal-lined racquet bay", "Separate shoe pocket", "Padded backpack straps", "Holds 3–6 racquets"],
  },
  "football-balls": {
    tagline: "Football · match & trainer",
    desc: (n, b) => `The ${n} from ${b} — a machine-stitched ball with a butyl bladder that keeps its shape and pressure across a season of training.`,
    features: ["Machine-stitched panels", "Butyl bladder, holds air", "True flight off the boot", "Sizes 3, 4 & 5"],
  },
  "gk-gloves": {
    tagline: "Keeper gloves · latex palm",
    desc: (n, b) => `The ${n} by ${b} — a grippy latex palm with finger-spine support and a wide wrist wrap for confident handling.`,
    features: ["High-grip latex palm", "Finger-spine support", "Wide wrist wrap", "LH/RH pair"],
  },
  "basketball-balls": {
    tagline: "Basketball · indoor/outdoor",
    desc: (n, b) => `The ${n} from ${b} — a deep-channel ball with a pebbled cover that grips in dry hands and survives outdoor courts.`,
    features: ["Deep-channel construction", "Pebbled grip cover", "Indoor & outdoor rated", "Sizes 5, 6 & 7"],
  },
  "volleyball-balls": {
    tagline: "Volleyball · soft touch",
    desc: (n, b) => `The ${n} by ${b} — a soft-touch cover that's kind on the forearms with a laminated build that holds its shape.`,
    features: ["Soft-touch cover", "Laminated construction", "Consistent rebound", "Match & training grade"],
  },
  "tt-bats": {
    tagline: "TT bat · star rated",
    desc: (n, b) => `The ${n} from ${b} — a balanced blade with ITTF-style pimpled rubber, rated by stars so you know what you're getting.`,
    features: ["Balanced plywood blade", "Pimpled rubber both faces", "Star-rated control/spin", "Flared grip"],
  },
  "tt-balls": {
    tagline: "TT balls · ABS 40+",
    desc: (n, b) => `The ${n} by ${b} — seamless ABS 40+ poly balls with consistent bounce and roundness, sold by the pack.`,
    features: ["ABS 40+ poly", "Seamless construction", "Consistent bounce", "White & orange"],
  },
  "tt-tables": {
    tagline: "TT table · rollaway",
    desc: (n, b) => `The ${n} from ${b} — a full-size rollaway table with an even bounce across the top, folding to a compact footprint for storage.`,
    features: ["Full-size tournament top", "Rollaway folding frame", "Locking castors", "Net & post set included"],
  },
  "cricket-shoes": {
    tagline: "Cricket shoes · UK 5–11",
    desc: (n, b) => `The ${n} by ${b} — a supportive cricket shoe with a cushioned midsole and a sole built for both the crease and the outfield.`,
    features: ["Cushioned midsole", "Supportive heel counter", "Cricket-specific outsole", "UK 5–11"],
  },
  "badminton-shoes": {
    tagline: "Court shoes · non-marking",
    desc: (n, b) => `The ${n} from ${b} — a non-marking gum sole with lateral support for the lunges, and a low profile that keeps you close to the floor.`,
    features: ["Non-marking gum sole", "Lateral support cage", "Low-profile ride", "UK 5–11"],
  },
  "football-shoes": {
    tagline: "Boots · studs & turf",
    desc: (n, b) => `The ${n} by ${b} — a locked-in fit with a stud pattern that bites on grass without dragging in the turn.`,
    features: ["Grip-tuned stud pattern", "Locked-in midfoot fit", "Durable synthetic upper", "UK 5–11"],
  },
  "basketball-shoes": {
    tagline: "Basketball · high ankle",
    desc: (n, b) => `The ${n} from ${b} — high-ankle support with a cushioned drop and a herringbone outsole that stops when you do.`,
    features: ["High-ankle support", "Cushioned heel drop", "Herringbone outsole", "UK 6–11"],
  },
  "running-shoes": {
    tagline: "Running · everyday miles",
    desc: (n, b) => `The ${n} by ${b} — a light, breathable trainer with enough cushioning for daily miles and a mesh upper that stays cool.`,
    features: ["Breathable mesh upper", "Cushioned EVA midsole", "Lightweight build", "UK 5–11"],
  },
  "volleyball-shoes": {
    tagline: "Volleyball · indoor grip",
    desc: (n, b) => `The ${n} from ${b} — indoor court shoes with a gum outsole and a padded collar built for repeated landings.`,
    features: ["Gum indoor outsole", "Padded ankle collar", "Shock-absorbing heel", "UK 6–11"],
  },
  yoga: {
    tagline: "Yoga · non-slip mat",
    desc: (n, b) => `The ${n} by ${b} — a cushioned, non-slip mat with a closed-cell surface that wipes clean and rolls up without curling.`,
    features: ["Non-slip textured surface", "Closed-cell, wipes clean", "Rolls flat, no curl", "Carry strap included"],
  },
  "gym-training": {
    tagline: "Training · home gym",
    desc: (n, b) => `The ${n} from ${b} — solid home-gym kit built to take a beating on a hard floor, sized for real training rather than a display shelf.`,
    features: ["Durable coated finish", "Floor-friendly", "Home & studio rated", "Multiple weights/levels"],
  },
  "sports-support": {
    tagline: "Support · adjustable brace",
    desc: (n, b) => `The ${n} by ${b} — adjustable compression support that stays put through movement without cutting off circulation.`,
    features: ["Adjustable compression", "Breathable knit", "Stays put in motion", "S to XL"],
  },
  carrom: {
    tagline: "Carrom · tournament finish",
    desc: (n, b) => `The ${n} from ${b} — a smooth, fast playing surface with a true rebound off the rails. Board, coins and strikers sold together or separately.`,
    features: ["Smooth fast playing surface", "True rebound rails", "Seasoned timber frame", "Tournament sizing"],
  },
  chess: {
    tagline: "Chess · wooden set",
    desc: (n, b) => `The ${n} by ${b} — a folding wooden board with weighted pieces that store inside. Travel-friendly and pleasant to play on.`,
    features: ["Folding wooden board", "Weighted pieces", "Pieces store inside", "Travel-friendly"],
  },
  darts: {
    tagline: "Darts · board & set",
    desc: (n, b) => `The ${n} from ${b} — a complete dart set that's safe indoors and quick to set up on any wall or door.`,
    features: ["Complete set", "Safe for indoor play", "Hangs on any wall", "Double-sided board"],
  },
  swimwear: {
    tagline: "Swimwear · chlorine resistant",
    desc: (n, b) => `The ${n} by ${b} — a chlorine-resistant weave that holds its shape and colour, with a flat drawcord that doesn't dig in.`,
    features: ["Chlorine-resistant fabric", "Shape-retaining weave", "Flat internal drawcord", "XS to XL"],
  },
  "swim-accessories": {
    tagline: "Swim gear · pool essentials",
    desc: (n, b) => `The ${n} from ${b} — anti-fog, snug and quick to adjust, so you can get in the water instead of fiddling on the deck.`,
    features: ["Anti-fog / snug fit", "Quick to adjust", "UV & chlorine resistant", "Adults & juniors"],
  },
  skating: {
    tagline: "Skating · board & skates",
    desc: (n, b) => `The ${n} by ${b} — a stable deck on smooth-rolling wheels, set up ready to ride out of the box.`,
    features: ["Ready to ride out of the box", "Smooth-rolling wheels", "Stable, forgiving deck", "Beginner-friendly"],
  },
  throwball: {
    tagline: "Throw ball · match grade",
    desc: (n, b) => `The ${n} from ${b} — a match-grade throw ball with a soft, grippy cover and reliable shape retention.`,
    features: ["Soft grippy cover", "Holds its shape", "Match & school grade", "Inflated ready to play"],
  },
  tennikoit: {
    tagline: "Tennikoit · rubber ring",
    desc: (n, b) => `The ${n} by ${b} — a solid rubber tennikoit ring with a consistent weight and grip for clean throws.`,
    features: ["Solid rubber ring", "Consistent weight", "Grippy finish", "Standard match size"],
  },
  "cricket-accessories": {
    tagline: "Cricket spares & extras",
    desc: (n, b) => `The ${n} from ${b} — the small stuff that keeps a kit bag working, priced so you can keep a spare.`,
    features: ["Kit-bag essential", "Durable build", "Great value", "Keep a spare"],
  },
  "badminton-accessories": {
    tagline: "Badminton spares & extras",
    desc: (n, b) => `The ${n} by ${b} — court-side spares for grips, strings and covers so a session never ends early.`,
    features: ["Court-side spare", "Fits most racquets", "Quick to fit", "Multi-packs available"],
  },
  "football-accessories": {
    tagline: "Football spares & extras",
    desc: (n, b) => `The ${n} from ${b} — training-ground kit that survives being thrown in a boot and used twice a week.`,
    features: ["Training-ground durable", "Packs down small", "Great value", "Club quantities available"],
  },
  socks: {
    tagline: "Sports socks · cushioned",
    desc: (n, b) => `The ${n} by ${b} — cushioned sports socks with an arch band and a cuff that stays up through a full match.`,
    features: ["Cushioned sole", "Supportive arch band", "Stay-up cuff", "Multi-packs"],
  },
  "water-bottles": {
    tagline: "Hydration · leak-proof",
    desc: (n, b) => `The ${n} from ${b} — a leak-proof sipper with a fast-flow spout that fits standard bottle cages and kit-bag pockets.`,
    features: ["Leak-proof cap", "Fast-flow spout", "BPA-free body", "Fits kit-bag pockets"],
  },
};

/* ------------------------------------------------------------------ */
/*  Product factory                                                    */
/* ------------------------------------------------------------------ */

interface Seed {
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
  tagline?: string;
  description?: string;
  features?: string[];
  inStock?: boolean;
}

const usedSlugs = new Set<string>();

function P(p: Seed): Product {
  const cat = categoryMap[p.category];
  const copy = COPY[p.category];
  const brand = p.brand ?? brandFor(p.name);

  // Source data has genuine duplicate names (different colourways / sizes),
  // so suffix any repeat to keep slugs and React keys unique.
  const base = slugify(p.name);
  let id = base;
  for (let n = 2; usedSlugs.has(id); n++) id = `${base}-${n}`;
  usedSlugs.add(id);

  const { rating, reviews } = seeded(id);
  return {
    id,
    slug: id,
    name: p.name,
    brand,
    category: p.category,
    art: p.art ?? cat.art,
    price: p.price,
    mrp: p.mrp,
    rating,
    reviews,
    accent: p.accent ?? accentFor(p.name, cat.accent),
    colors: p.colors ?? ["As shown"],
    sizes: p.sizes ?? SIZES[p.category] ?? ["One Size"],
    hands: p.hands ?? HANDS[p.category],
    badge: p.badge,
    tagline: p.tagline ?? copy.tagline,
    description: p.description ?? copy.desc(p.name, brand),
    features: p.features ?? copy.features,
    inStock: p.inStock ?? true,
  };
}

/** Compact seed helper: `c("cricket-bats")("SG KLR ULTIMATE", 27999, { badge: "Pro" })` */
function c(category: CategorySlug) {
  return (name: string, price: number, extra: Omit<Seed, "name" | "category" | "price"> = {}) =>
    P({ name, category, price, ...extra });
}

const bat = c("cricket-bats");
const cball = c("cricket-balls");
const bgloves = c("batting-gloves");
const bpads = c("batting-pads");
const helmet = c("cricket-helmets");
const wkg = c("wk-gloves");
const wkp = c("wk-pads");
const guard = c("cricket-guards");
const ckit = c("cricket-kit-bags");
const apparel = c("cricket-apparel");
const cap = c("cricket-caps");
const stumps = c("cricket-stumps");
const batcare = c("bat-care");
const racquet = c("badminton-racquets");
const shuttle = c("shuttlecocks");
const bgrip = c("badminton-grips");
const bbag = c("badminton-kit-bags");
const fball = c("football-balls");
const gk = c("gk-gloves");
const bball = c("basketball-balls");
const vball = c("volleyball-balls");
const ttbat = c("tt-bats");
const ttball = c("tt-balls");
const tttable = c("tt-tables");
const cshoe = c("cricket-shoes");
const bshoe = c("badminton-shoes");
const fshoe = c("football-shoes");
const bkshoe = c("basketball-shoes");
const rshoe = c("running-shoes");
const vshoe = c("volleyball-shoes");
const yoga = c("yoga");
const gym = c("gym-training");
const support = c("sports-support");
const carrom = c("carrom");
const chess = c("chess");
const dart = c("darts");
const swim = c("swimwear");
const swimacc = c("swim-accessories");
const skate = c("skating");
const throwball = c("throwball");
const tennikoit = c("tennikoit");
const cacc = c("cricket-accessories");
const bacc = c("badminton-accessories");
const facc = c("football-accessories");
const sock = c("socks");
const bottle = c("water-bottles");

/* ------------------------------------------------------------------ */
/*  The catalog                                                        */
/* ------------------------------------------------------------------ */

export const products: Product[] = [
  /* ------------------------- Cricket · Bats ------------------------- */
  bat("VINTAGE FINISHER ENGLISH WILLOW", 30000, { mrp: 34999, badge: "Pro" }),
  bat("TON SUPREME ENGLISH WILLOW", 28000, { mrp: 31999 }),
  bat("SG KLR ULTIMATE", 27999, { badge: "Bestseller" }),
  bat("SG SUNNY TONNY", 26999),
  bat("GN GOLD EDITION ENGLISH WILLOW", 25999, { mrp: 28999 }),
  bat("SG KLR ICON", 24999),
  bat("SG PLAYERS ULTIMATE", 24999),
  bat("SG SUNNY GOLD ICON", 24999),
  bat("SG TRIPLE CROWN XTREME", 23499, { badge: "Bestseller" }),
  bat("SS GG SMACKER PLAYER ENGLISH WILLOW", 23000),
  bat("NB TC 1040 ENGLISH WILLOW", 22999),
  bat("NB DC 1040 ENGLISH WILLOW", 22999),
  bat("SG RP ULTIMATE", 20499),
  bat("SG TRIPLECROWN XTREME", 20299),
  bat("SKY BLASTER ENGLISH WILLOW", 18000, { brand: "Vintage" }),
  bat("SS V.A-900 RETRO INSTINCT", 18000),
  bat("SG VENATOR", 17999),
  bat("SG E/W SUNNY TONNY CRICKET BAT", 17999),
  bat("NB TC 840 ENGLISH WILLOW", 17499),
  bat("SS MASTER 5000 ENGLISH WILLOW", 17000),
  bat("RNS G 777 ENGLISH WILLOW", 17000),
  bat("SG IK ULTIMATE", 16899),
  bat("SG HP ICON BAT", 16899),
  bat("SG SUNNY TONNY ICON", 16499),
  bat("SG ROAR ULTIMATE", 16119),
  bat("SG PLAYER XTREME", 15499),
  bat("SS MASTER 2000 ENGLISH WILLOW", 15000),
  bat("GN IGNITE BEAST ENGLISH WILLOW", 14999, { badge: "New" }),
  bat("SG RSD SELECT", 14499),
  bat("VINTAGE 4.0 SS", 14000),
  bat("GN OMEGA GN5.5 ENGLISH WILLOW", 13999),
  bat("GN COLOSSUS 5 ENGLISH WILLOW", 13999),
  bat("NB DC 740 ENGLISH WILLOW", 13999),
  bat("DSC BLU 222 ENGLISH WILLOW", 13669),
  bat("SS V.A-900 RETRO BLASTER ENGLISH WILLOW", 13000),
  bat("SS RETRO SUPER", 13000),
  bat("BDM MASTER BLASTER CRICKET BAT E/W", 13000),
  bat("SG RELIANT XTREME", 12999, { badge: "Bestseller" }),
  bat("SS VA-900 (6) ENGLISH WILLOW", 12800),
  bat("TON SINGLE S PRESTIGE ENGLISH WILLOW", 12800),
  bat("RNS MAX 7 ENGLISH WILLOW", 12700),

  /* ------------------------ Cricket · Balls ------------------------ */
  cball("SG TEST LEATHER BALL", 1599, { mrp: 1899, colors: ["Red"] }),
  cball("SG CLUB LEATHER BALL", 899, { colors: ["Red"] }),
  cball("SS COUNTY SPECIAL LEATHER BALL", 849, { colors: ["Red"] }),
  cball("SG SHIELD 20 LEATHER BALL WHITE", 799, { colors: ["White"] }),
  cball("SG SEAMER PRACTICE BALL", 549, { colors: ["Red"] }),
  cball("SPARTAN WIND BALL PACK OF 6", 360, { colors: ["Yellow"], badge: "Bestseller" }),
  cball("TENNIS CRICKET BALL HEAVY", 120, { colors: ["Yellow", "Green"] }),

  /* -------------------- Cricket · Batting Gloves -------------------- */
  bgloves("SS MILLENIUM PRO BATTING GLOVES - LH", 4625, { mrp: 5250, badge: "Pro", hands: ["Left Hand"] }),
  bgloves("SS BATTING GLOVES SS SUPERTEST MRH", 2970, { hands: ["Right Hand"] }),
  bgloves("SG TEST MEN BATTING GLOVES", 2399, { badge: "Bestseller" }),
  bgloves("SS BATTING GLOVES SS RANJIMAX YOUTH LH", 2195, { sizes: ["Youth"], hands: ["Left Hand"] }),
  bgloves("SS BATTING GLOVES SS RANJIMAX BOYS LH", 2150, { sizes: ["Boys"], hands: ["Left Hand"] }),
  bgloves("SG BATTING GLOVES HP LITE YOUTH +", 2099, { sizes: ["Youth"] }),
  bgloves("RNS PROLITE BATTING GLOVES", 1950),
  bgloves("MRF BATTING GLOVES DRIVE YOUTH", 1240, { sizes: ["Youth"] }),
  bgloves("SG BATTING GLOVES VS 319 SPARK YOUTH", 1199, { sizes: ["Youth"] }),
  bgloves("SG BATTING GLOVES VS 319 SPARK BOYS", 1099, { sizes: ["Boys"] }),
  bgloves("SG BATTING GLOVES CLUB", 849),
  bgloves("SG BATTING GLOVES OPTIPRO YOUTH", 729, { sizes: ["Youth"] }),
  bgloves("GN1 BLAZE MRH", 699, { brand: "GN", hands: ["Right Hand"] }),
  bgloves("SG BATTING GLOVES ECOLITE BOYS", 679, { sizes: ["Boys"] }),
  bgloves("SS ACADEMY BATTING GLOVES", 650, { badge: "Sale" }),
  bgloves("DSC BATTING INNER GLOVES DSC GLIDER", 259, { sizes: ["Boys", "Youth", "Men's"], hands: undefined }),

  /* --------------------- Cricket · Batting Pads --------------------- */
  bpads("SG B-LEGG HILITE WHITE MENS", 4729, { mrp: 5299, sizes: ["Men's"], badge: "Pro" }),
  bpads("SS BATTING LEGGUARD SS TEST OPENER MLH", 4115, { sizes: ["Men's"], hands: ["Left Hand"] }),
  bpads("SS BATTING LEGGUARD SS TEST OPENER MRH", 4115, { sizes: ["Men's"], hands: ["Right Hand"] }),
  bpads("MRF BATTING L/G GENIUS GRAND", 3790, { badge: "Bestseller" }),
  bpads("SG B-LEGG TEST WHITE MENS", 3679, { sizes: ["Men's"] }),
  bpads("SS BATTING LEGGUARD SS TEST PLAYERS MRH", 3535, { sizes: ["Men's"], hands: ["Right Hand"] }),
  bpads("MRF BATTING L/G DRIVE", 2110),
  bpads("SG B-LEGG LEAGUE MENS", 2089, { sizes: ["Men's"] }),
  bpads("SG BLEGG PROFLEX YOUTH", 1999, { sizes: ["Youth"] }),
  bpads("SS BATTING LEGGUARD SS MATCH YRH", 1910, { sizes: ["Youth"], hands: ["Right Hand"] }),
  bpads("SS CAMBRIDGE BATTING PADS", 1875),
  bpads("SS BATTING LEGGUARD SS MATCH BLH", 1870, { sizes: ["Boys"], hands: ["Left Hand"] }),
  bpads("SS BATTING LEGGUARD SS MATCH BRH", 1870, { sizes: ["Boys"], hands: ["Right Hand"] }),
  bpads("SS BATTING LEGGUARD SS CAMBRIDGE MLH", 1735, { sizes: ["Men's"], hands: ["Left Hand"] }),
  bpads("DSC BATTING LEGGUARD CONDOR MOTION (YOUTH) RH", 1719, { sizes: ["Youth"], hands: ["Right Hand"] }),
  bpads("DSC BATTING LEGGUARD CONDOR MOTION (BOYS) RH", 1679, { sizes: ["Boys"], hands: ["Right Hand"] }),

  /* ----------------------- Cricket · Helmets ----------------------- */
  helmet("SHREY CLASSIC STEEL NAVY LARGE HELMET", 2999, { sizes: ["Large"], colors: ["Navy"], badge: "Pro" }),
  helmet("DSC CRICKET HELMET DEFENDER S", 1559, { sizes: ["Small"] }),
  helmet("SHREY MATCH 2.0 STEEL NAVY LARGE HELMET", 1499, { sizes: ["Large"], colors: ["Navy"], badge: "Bestseller" }),
  helmet("SHREY MATCH 2.0 STEEL NAVY SMALL HELMET", 1499, { sizes: ["Small"], colors: ["Navy"] }),
  helmet("SS HELMET 0152 / HELMET ROYAL SMALL", 1450, { sizes: ["Small"] }),
  helmet("SHREY STAR STEEL NAVY LARGE HELMET", 1249, { sizes: ["Large"], colors: ["Navy"] }),
  helmet("SHREY STAR STEEL NAVY MEDIUM HELMET", 1249, { sizes: ["Medium"], colors: ["Navy"] }),
  helmet("SHREY STAR STEEL NAVY SMALL HELMET", 1249, { sizes: ["Small"], colors: ["Navy"] }),
  helmet("SHREY STAR NAVY JUNIOR HELMET", 1149, { sizes: ["Junior"], colors: ["Navy"] }),
  helmet("DSC CRICKET HELMET BOUNCER XS", 1129, { sizes: ["Junior"] }),

  /* --------------------- Cricket · Wicket keeping --------------------- */
  wkg("SG TEST WICKET KEEPING GLOVES", 3999, { mrp: 4599, sizes: ["Men's"], badge: "Pro" }),
  wkg("SS PLAYERS WICKET KEEPING GLOVES", 3250, { sizes: ["Men's"] }),
  wkg("SG CLUB WICKET KEEPING GLOVES", 1899),
  wkg("SS ACADEMY WICKET KEEPING GLOVES YOUTH", 1450, { sizes: ["Youth"] }),
  wkg("SG COTTON WK INNER GLOVES", 349, { hands: undefined }),
  wkp("SG TEST WICKET KEEPING LEG GUARD MENS", 3299, { sizes: ["Men's"] }),
  wkp("SS MATCH WICKET KEEPING PADS", 2450),
  wkp("SG CLUB WICKET KEEPING LEG GUARD YOUTH", 1699, { sizes: ["Youth"] }),

  /* --------------------- Cricket · Guards & Protection --------------------- */
  guard("SHREY CHEST GUARD PRO", 1599, { badge: "New" }),
  guard("SG THIGH PAD COMBO MENS", 1299, { sizes: ["Men's"] }),
  guard("SS ARM GUARD PLAYERS", 1150),
  guard("NECK GUARD", 799, { brand: "Shrey" }),
  guard("SG ABDOMINAL GUARD MENS", 449, { sizes: ["Men's"] }),
  guard("SG ABDOMINAL GUARD BOYS", 349, { sizes: ["Boys"] }),

  /* ---------------------- Cricket · Kit Bags ---------------------- */
  ckit("ONEUP TEAM KIT BAG", 4990, { mrp: 5990, badge: "Bestseller" }),
  ckit("ONEUP DUFFLE KIT BAG LIMITED EDITION", 4250, { badge: "New" }),
  ckit("KIT BAG SG MAXIPAK", 3189),
  ckit("SS KIT BAG - PLAYERS DUFFLE WITH 6 BAT SLEEVES", 2850),
  ckit("SS BAGS 0004 / KIT BAG - MATRIX", 2585),
  ckit("KIT BAG SG RP JR. DUFFLE", 1999),
  ckit("ONEUP WHEELIE KIT BAG", 1850, { badge: "Sale" }),
  ckit("SS BAGS 0027 / KIT BAG - ELITE PRO", 1770),
  ckit("KIT BAG SG COMFIPAK", 1539),
  ckit("ONE UP JUNIOR BAG", 1260),
  ckit("SS BAGS 0011 / KIT BAG - RANGER", 1140),
  ckit("KIT BAG / NEW GOAL S", 250),
  ckit("KIT BAG / NEW GOAL", 245),

  /* ----------------------- Cricket · Apparel ----------------------- */
  apparel("SHREY INTENSE LONG TIGHTS", 1299),
  apparel("SHREY INTENSE COMPRESSION LONG SLEEVES TOP", 1199, { badge: "Bestseller" }),
  apparel("SHREY INTENSE COMPRESSION L/S TOP", 1199),
  apparel("SHREY INTENSE SHORTS", 1099),
  apparel("SHREY INTENSE COMPRESSION SHORTS S", 1099, { sizes: ["S"] }),
  apparel("SS SKINS - TOP MEDIUM", 1010, { sizes: ["M"] }),
  apparel("SS SKINS - TOP SMALL", 1010, { sizes: ["S"] }),
  apparel("SS SKINS - TOP XL", 1010, { sizes: ["XL"] }),
  apparel("SS SKINS - TOP XXL", 1010, { sizes: ["XXL"] }),
  apparel("SHREY INTENSE COMPRESSION SLEEVELESS TOP", 899),
  apparel("SHREY CRICKET PREMIUM SHIRT L/S OFFWHITE 2XL", 899, { sizes: ["XXL"], colors: ["Off White"] }),
  apparel("SPORTIFF WHITE TROUSER", 825, { colors: ["White"] }),
  apparel("SHREY CRICKET MATCH COLOURED TROUSERS S", 799, { sizes: ["S"] }),
  apparel("SS SPW0228 / COMBO - MAGNUM SIZE 34", 790, { sizes: ["S"] }),
  apparel("SS COMBO - MAGNUM SIZE 30", 790, { sizes: ["XS"] }),
  apparel("SS SPW0366 / COMBO - MAGNUM SIZE 28", 790, { sizes: ["XS"] }),

  /* ------------------ Cricket · Caps, stumps, bat care ------------------ */
  cap("SG CRICKET MATCH CAP NAVY", 499, { colors: ["Navy"] }),
  cap("SS SUN HAT WIDE BRIM WHITE", 649, { colors: ["White"] }),
  cap("ONEUP TEAM CAP", 399, { colors: ["Navy", "Red", "White"] }),
  stumps("SG WOODEN STUMP SET WITH BAILS", 1899, { badge: "Bestseller" }),
  stumps("SS SPRING BACK STUMP SET", 3499),
  stumps("ONEUP PRACTICE STUMP SET PLASTIC", 649),
  batcare("SG CRICKET BAT GRIP OCTOPUS", 149, { colors: ["Assorted"] }),
  batcare("SS COIL BAT GRIP", 199, { colors: ["Multicolour"] }),
  batcare("ANTI SCUFF SHEET FACE PROTECTION TAPE", 125, { brand: "Oneup Sports" }),
  batcare("FIBRE TOE GUARD KIT", 245, { brand: "Oneup Sports" }),
  batcare("SG WOODEN BAT MALLET", 899, { art: "bat" }),
  batcare("GRIP CONE APPLICATOR", 99, { brand: "Oneup Sports" }),
  batcare("SG BAT OIL LINSEED 100ML", 299),

  /* --------------------- Badminton · Racquets --------------------- */
  racquet("YONEX AX 99 PRO", 20590, { mrp: 22500, badge: "Pro" }),
  racquet("YONEX ARC 11 PRO", 20590, { badge: "Pro" }),
  racquet("LINING TURBO Z DRIVE AYPR190-4", 7990),
  racquet("LINING TURBO Z COMBACT AYPR184-4", 7990),
  racquet("LINING TURBO Z BOOST AYPR180-4", 7990),
  racquet("LI-NING WIND STORM 79", 6990, { badge: "Bestseller" }),
  racquet("YONEX ASTROX 3 DG", 5590),
  racquet("YONEX AX 99 PLAY", 5390),
  racquet("YONEX ARC7 PLAY", 5190),
  racquet("YONEX ASTROX 0.7 DG", 4990),
  racquet("YONEX MP 33 LIGHT", 4590),
  racquet("LI-NING CHALLENGER 15", 4390),
  racquet("LINING ARMOUR 373 AYPP474-5", 4390),
  racquet("LINING ARMOUR 353 AYPP444-5", 4390),
  racquet("YONEX ASTROX 99 PLAY", 4390, { badge: "Bestseller" }),

  /* -------------------- Badminton · Shuttlecocks -------------------- */
  shuttle("FZ FORZA S 5000 (SPEED 77)", 2499, { sizes: ["Speed 77"], badge: "Pro" }),
  shuttle("FZ FORZA S 5000 (SPEED 76)", 2499, { sizes: ["Speed 76"] }),
  shuttle("FORZA S 2500 (SPEED 77)", 1599, { sizes: ["Speed 77"] }),
  shuttle("SHUTTLE COCK CHAMP SPEED 76 AYQF062-3", 1590, { brand: "Li-Ning", sizes: ["Speed 76"] }),
  shuttle("SHUTTLE COCK BOLT-GOLD (6 IN 1 SLOW AYQQ074-1)", 1399, { brand: "Li-Ning", sizes: ["Slow"] }),
  shuttle("LINING BOLT-GOLD YELLOW AYQQ072-1", 1399),
  shuttle("FORZA NS 10 NYLON SHUTTLE (SPEED 3)", 999, { sizes: ["Speed 3"] }),
  shuttle("LINING SWIFT X100-Y-S+", 869),
  shuttle("LINING SWIFT X100-YEL/SLOW", 869),
  shuttle("LINING BOLT-NEO (6 IN 1) AYQQ0041-1", 799),
  shuttle("KAMATCHI NYLON COCK 333", 400, { badge: "Bestseller" }),
  shuttle("KAMATCHI NYLON COCK 222", 325),
  shuttle("HEAD SHUTTLECOCK 505 GREEN PCS", 140),

  /* ------------------ Badminton · Grips & kit bags ------------------ */
  bgrip("REPL. GRIP GP16 (60 IN 1) YELLOW/MEDIUM AXJM001-T", 12600, { brand: "Yonex", sizes: ["60 in 1"] }),
  bgrip("LINING STRING NO-7 BOOST BLACK STORM AXJN022-3", 750),
  bgrip("REPLACEMENT GRIP 19 3 IN 1 ASSORTED AXJP048-T2", 690, { brand: "Yonex", sizes: ["3 in 1"] }),
  bgrip("REPLACEMENT GRIP 18 3 IN 1 BLACK AXJP048-T31", 690, { brand: "Yonex", sizes: ["3 in 1"] }),
  bgrip("REPLACEMENT GRIP 19 3 IN 1 ASSORTED AXJP028-T32", 690, { brand: "Yonex", sizes: ["3 in 1"] }),
  bgrip("REPLACEMENT GRIP 19 3 IN 1 BLACK AXJP028-T31", 690, { brand: "Yonex", sizes: ["3 in 1"] }),
  bgrip("GRIP GP25 (6 IN 1) AXJP038-T62", 599, { brand: "Yonex", sizes: ["6 in 1"] }),
  bbag("HEAD BADMINTON K/B INFERNO 70", 1990),
  bbag("HEAD BADMINTON K/B INFERNO 70+", 1990),
  bbag("HEAD BADMINTON K/B XENON 300", 1590, { badge: "Bestseller" }),

  /* ------------------------- Football ------------------------- */
  fball("SPARTAN FOOT BALL TRAINER", 780, { badge: "Bestseller" }),
  fball("NIVIA STORM FOOTBALL SIZE 5", 949, { sizes: ["Size 5"] }),
  fball("VECTOR X ROCKET FOOTBALL SIZE 4", 699, { sizes: ["Size 4"] }),
  fball("SPARTAN FOOTBALL SIZE 3 JUNIOR", 549, { sizes: ["Size 3"] }),
  gk("NIVIA GK GLOVES ARMOUR", 1299),
  gk("VECTOR X GK GLOVES PRO GRIP", 899),

  /* ----------------------- Basketball ----------------------- */
  bball("SPARTAN BASKETBALL PRO SIZE 7", 1199, { sizes: ["Size 7"], badge: "Bestseller" }),
  bball("NIVIA ENGRAVE BASKETBALL SIZE 7", 999, { sizes: ["Size 7"] }),
  bball("VECTOR X BASKETBALL SIZE 6", 799, { sizes: ["Size 6"] }),
  bball("SPARTAN BASKETBALL JUNIOR SIZE 5", 649, { sizes: ["Size 5"] }),

  /* ----------------------- Volleyball ----------------------- */
  vball("SPARTAN VOLLEYBALL PREMIER", 720, { badge: "Bestseller" }),
  vball("NIVIA COURT VOLLEYBALL", 899),
  vball("VECTOR X SOFT TOUCH VOLLEYBALL", 649),

  /* ---------------------- Table Tennis ---------------------- */
  tttable("HERCULES TABLE TENNIS TABLE TOP SPIN", 28125, { mrp: 32500, badge: "Pro" }),
  ttbat("GKI TT BAT EURO STAR", 1936),
  ttbat("STAG OFFICIAL BAT", 1050),
  ttbat("STAG 5 STAR BAT", 900, { badge: "Bestseller" }),
  ttbat("GKI TT BAT DRAGON", 895),
  ttbat("GKI TT BAT BEL BOT", 860),
  ttbat("STAG 4 STAR BAT", 650),
  ttbat("GKI TT BAT 4 STAR", 580),
  ttball("STAG 3 STAR SUPREME BALLS PCS", 450),
  ttball("SEAM TT BALLS", 186, { brand: "Oneup Sports" }),
  ttball("GKI TT BALL SUPERB 3 STAR ABS 40+ WHITE", 78, { colors: ["White"] }),
  ttball("GKI TT BALL KUNG FU 1 STAR ABS 40+ ORANGE", 31, { colors: ["Orange"] }),
  ttball("GKI TT BALL KUNG FU 1 STAR ABS 40+ WHITE", 31, { colors: ["White"] }),

  /* -------------------------- Shoes -------------------------- */
  bshoe("FZ FORZA FIERCE V2M", 7999, { mrp: 8999, badge: "Pro" }),
  bshoe("FZ FORZA TARAMI BADMINTON SHOES (BLUE)", 6999, { colors: ["Blue"] }),
  bshoe("ASICS UPCOURT 4", 4499, { badge: "Bestseller" }),
  bshoe("ULTRA FLY UK-8 AYTRO60-7", 3990, { brand: "Li-Ning", sizes: ["UK 8"] }),
  bshoe("ULTRA FLY UK-11 AYTRO60-5", 3990, { brand: "Li-Ning", sizes: ["UK 11"] }),
  bshoe("ULTRA FLY UK-4 AYTRO60-5", 3990, { brand: "Li-Ning", sizes: ["UK 5"] }),
  bshoe("ULTRA FLY UK-9 AYTRO60-4", 3990, { brand: "Li-Ning", sizes: ["UK 9"] }),
  cshoe("ADIDAS CRI RISE V2 PU WHITE 8 UK EY3748", 4599, { sizes: ["UK 8"], colors: ["White"] }),
  cshoe("ADIDAS CRI RISE V2 PU WHITE 7 UK EY3748", 4599, { sizes: ["UK 7"], colors: ["White"] }),
  cshoe("CRI RISE V2 PU EY 3748", 4599, { brand: "Adidas", badge: "Bestseller" }),
  cshoe("ASICS GEL CONTEND", 4499),
  cshoe("ASICS GEL-LETHAL FIELD", 4499, { badge: "Pro" }),
  cshoe("ADIDAS CRI HASE PU EX 3686", 3999),
  fshoe("NIVIA DOMINATOR FOOTBALL STUDS", 2299),
  fshoe("VECTOR X ARMOUR TURF SHOES", 1499),
  bkshoe("NIVIA COMBAT BASKETBALL SHOES", 2799),
  rshoe("ASICS JOGGER RUNNING SHOES", 3499),
  rshoe("NIVIA MARATHON RUNNING SHOES", 1899, { badge: "Sale" }),
  vshoe("NIVIA VOLLEYBALL COURT SHOES", 2199),

  /* ------------------------- Fitness ------------------------- */
  gym("MEDICINE BALL 4KG", 1849, { brand: "Oneup Sports", sizes: ["4 kg"], art: "ball" }),
  yoga("YOGA MATT PE TPE 2TONE PREMIUM", 1699, { brand: "Airavat", badge: "Bestseller" }),
  gym("VINYL DUMBBELL 5KG PAIR", 1600, { brand: "Oneup Sports", sizes: ["5 kg pair"] }),
  yoga("YOGA MATT PER MID SIZE", 1599, { brand: "Airavat" }),
  gym("VINYL DUMBBELL 4KG PAIR", 1280, { brand: "Oneup Sports", sizes: ["4 kg pair"] }),
  gym("MEDICINE BALL 2KG", 1099, { brand: "Oneup Sports", sizes: ["2 kg"], art: "ball" }),
  support("NIVIA ORTHOPEDIC WAIST SUPPORT ADJUSTABLE MB-6-S", 970, { sizes: ["S"] }),
  gym("VINYL DUMBBELL 3KG PAIR", 960, { brand: "Oneup Sports", sizes: ["3 kg pair"] }),
  yoga("AIRAVAT MID SIZE YOGA MATT 6MM PE", 949),
  gym("EXERCISE TUBE LEVEL-4", 899, { brand: "Oneup Sports", sizes: ["Level 4"], art: "grip" }),
  gym("GYM BALL 55", 850, { brand: "Oneup Sports", sizes: ["55 cm"], art: "ball" }),
  gym("EXERCISE TUBE LEVEL-3", 749, { brand: "Oneup Sports", sizes: ["Level 3"], art: "grip" }),
  support("NIVIA ORTHOPEDIC WAIST SUPPORT ADJUSTABLE MB-6-L", 710, { sizes: ["L"] }),
  gym("EXERCISE TUBE LEVEL-2", 699, { brand: "Oneup Sports", sizes: ["Level 2"], art: "grip" }),
  gym("EXERCISE TUBE LEVEL-1", 649, { brand: "Oneup Sports", sizes: ["Level 1"], art: "grip" }),
  support("NIVIA ORTHOPEDIC KNEE SUPPORT WITH PATELLA HOLE MB-09-L", 625, { sizes: ["L"] }),

  /* ---------------------- Leisure Sports ---------------------- */
  carrom("CARROM BOARD MATT HI SPEED (4X2 16MM)", 8875, { mrp: 9999, sizes: ["4 x 2 ft · 16 mm"], badge: "Pro" }),
  carrom("CARROM BOARD MATT HI SPEED (3X2 16MM)", 6938, { sizes: ["3 x 2 ft · 16 mm"], badge: "Bestseller" }),
  carrom("CARROM BOARD MATT HI SPEED (3X2 12MM)", 6463, { sizes: ["3 x 2 ft · 12 mm"] }),
  carrom("CARROM STAND", 1650),
  carrom("CARROM COIN LEGACY WOODEN", 399),
  carrom("CARROM STRIKER", 285),
  carrom("CARROM COIN POINTER WOODEN", 240),
  carrom("CARROM STRIKER BALL", 195),
  carrom("SSS CARROM POWDER", 25, { brand: "Oneup Sports" }),
  chess("WOODEN CHESS SMALL-954", 899, { brand: "Oneup Sports" }),
  chess("MAGNETIC TRAVEL CHESS SET", 549, { brand: "Oneup Sports" }),
  dart("MAGNETIC DART PIN-906", 160, { brand: "Oneup Sports" }),
  dart("STEEL TIP DART BOARD 17 INCH", 1299, { brand: "Oneup Sports" }),

  /* -------------------------- Swimming -------------------------- */
  swim("MENS JAMMER HYDRA", 899, { brand: "Vector X", badge: "Bestseller" }),
  swim("MENS SKIN VTD 024", 849, { brand: "Vector X" }),
  swim("ADULTS COMPRESSION FULL BOTTOM COMBAT 002 B", 779, { brand: "Vector X" }),
  swim("KIDS SKIN VTDK 024", 749, { brand: "Vector X", sizes: ["Kids S", "Kids M", "Kids L"] }),
  swim("MENS TRUNKS VST 011", 619, { brand: "Vector X" }),
  swim("MENS TRUNK VST 007", 619, { brand: "Vector X" }),
  swim("MENS BRIEFS VST 006", 619, { brand: "Vector X" }),
  swim("MENS TRUNK VST 004", 619, { brand: "Vector X" }),
  swim("KIDS JAMMER VSJK 006", 599, { brand: "Vector X", sizes: ["Kids S", "Kids M", "Kids L"] }),
  swim("KIDS JAMMER VSJK 005", 599, { brand: "Vector X", sizes: ["Kids S", "Kids M", "Kids L"] }),
  swim("KIDS JAMMER VSJK 004", 599, { brand: "Vector X", sizes: ["Kids S", "Kids M", "Kids L"] }),
  swimacc("ANTI FOG SWIMMING GOGGLES SENIOR", 549, { brand: "Vector X" }),
  swimacc("SILICONE SWIMMING CAP", 249, { brand: "Vector X", colors: ["Black", "Blue", "Red"], art: "cap" }),
  swimacc("NOSE CLIP AND EAR PLUG SET", 149, { brand: "Oneup Sports" }),

  /* --------------------------- Skating --------------------------- */
  skate("FIBRE SKATE BOARD-S", 1699, { brand: "Oneup Sports", badge: "Bestseller" }),
  skate("QUAD ROLLER SKATES ADJUSTABLE JUNIOR", 2299, { brand: "Oneup Sports", sizes: ["Small (UK 11–1)", "Medium (UK 1–4)", "Large (UK 4–7)"] }),
  skate("INLINE SKATES SENIOR", 2899, { brand: "Oneup Sports", sizes: ["Medium (UK 1–4)", "Large (UK 4–7)"] }),
  skate("SKATING PROTECTIVE GEAR SET", 899, { brand: "Oneup Sports", art: "pads" }),

  /* ------------------- Throw ball & Tennikoit ------------------- */
  throwball("SPARTAN THROW BALL PREMIER", 799, { badge: "Bestseller" }),
  throwball("NIVIA THROW BALL MATCH", 949),
  throwball("THROW BALL NET NYLON", 1299, { brand: "Oneup Sports", art: "misc" }),
  tennikoit("RUBBER TENNIKOIT RING STANDARD", 249, { brand: "Oneup Sports" }),
  tennikoit("RUBBER TENNIKOIT RING HEAVY", 349, { brand: "Oneup Sports" }),
  tennikoit("TENNIKOIT NET NYLON", 1099, { brand: "Oneup Sports", art: "misc" }),

  /* ------------------------- Accessories ------------------------- */
  bacc("LINING TURBO Z BOOST AYPR180-4 (SPARE)", 7990),
  facc("VIXEN FOOT PUMP MTR", 1300, { art: "misc" }),
  facc("NIVIA AIR PUMP CJ-K61P", 599, { badge: "Bestseller" }),
  facc("NIVIA SHIN GUARD ARMOUR", 449),
  facc("FLAT RING SET", 710, { brand: "Oneup Sports" }),
  facc("TRAINING CONE SET OF 20", 549, { brand: "Oneup Sports" }),
  bottle("LINING WATER BOTTLE - BLUE", 799, { colors: ["Blue"] }),
  bottle("ONEUP SIPPER BOTTLE 750ML", 349, { sizes: ["750 ml"] }),
  cacc("SG CRICKET SCOREBOOK", 299, { art: "misc" }),
  cacc("BOUNDARY MARKER DISC SET OF 30", 899, { brand: "Oneup Sports" }),
  sock("EM PACK OF 3 SOCKS WHITE", 379, { brand: "EM", colors: ["White"], sizes: ["Free Size"] }),
  sock("EM CRICKET SOCKS ANKLE", 249, { brand: "EM", colors: ["White"] }),
  sock("ONEUP CREW SPORTS SOCKS PACK OF 2", 299),
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
