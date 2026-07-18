import type { Category, CategorySlug, Product } from "./types";

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

export const categories: Category[] = [
  {
    slug: "bats",
    name: "Cricket Bats",
    blurb: "English & Kashmir willow, hand-crafted in Meerut.",
    art: "bat",
    accent: "#c8901c",
  },
  {
    slug: "batting-gloves",
    name: "Batting Gloves",
    blurb: "Sweat-wicking palms and high-density protection.",
    art: "gloves",
    accent: "#256e49",
  },
  {
    slug: "leg-guards",
    name: "Leg Guards",
    blurb: "Lightweight pads that never slow your sprint.",
    art: "pads",
    accent: "#2f6fb0",
  },
  {
    slug: "helmets",
    name: "Helmets",
    blurb: "Titanium-grade grilles tested to BS7928.",
    art: "helmet",
    accent: "#3b4252",
  },
  {
    slug: "wicket-keeping",
    name: "Wicket Keeping",
    blurb: "Gloves, inners and pads built for the long stand.",
    art: "keeping",
    accent: "#a3521c",
  },
  {
    slug: "cricket-balls",
    name: "Cricket Balls",
    blurb: "Alum-tanned leather with a proud seam.",
    art: "ball",
    accent: "#b92b22",
  },
  {
    slug: "kit-bags",
    name: "Kit Bags",
    blurb: "Wheelie and duffle bags that carry it all.",
    art: "bag",
    accent: "#184530",
  },
  {
    slug: "clothing",
    name: "Clothing",
    blurb: "Match whites and coloured pro-fit apparel.",
    art: "jersey",
    accent: "#0f766e",
  },
  {
    slug: "accessories",
    name: "Accessories",
    blurb: "Grips, guards, bails and the little essentials.",
    art: "misc",
    accent: "#7c5cbf",
  },
];

export const categoryMap: Record<CategorySlug, Category> = categories.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<CategorySlug, Category>,
);

/* ------------------------------------------------------------------ */
/*  Products (sample data — realistic, not scraped)                    */
/* ------------------------------------------------------------------ */

const GLOVE_SIZES = ["Youth", "Small Men", "Men", "Large"];
const PAD_SIZES = ["Youth", "Boys", "Men"];
const HANDS = ["Right Hand", "Left Hand"];
const APPAREL_SIZES = ["S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  /* ---------------------------- Bats ---------------------------- */
  {
    id: "bat-vanguard-pro",
    slug: "vanguard-pro-english-willow",
    name: "Vanguard Pro",
    brand: "Woodsword",
    category: "bats",
    art: "bat",
    price: 18999,
    mrp: 23999,
    rating: 4.9,
    reviews: 214,
    accent: "#c8901c",
    colors: ["Natural"],
    sizes: ["Short Handle", "Long Handle", "Harrow"],
    badge: "Bestseller",
    tagline: "Grade 1 English Willow · players edition",
    description:
      "Our flagship players' bat, pressed from Grade 1 English willow with 6–8 straight grains. A mid-to-low sweet spot, thick edges and a rounded spine deliver explosive pick-up without the weight.",
    features: [
      "Grade 1 English willow, 6–8 grains",
      "Thick 38–40mm edges, semi-oval handle",
      "Big mid-low sweet spot",
      "Weight 1180–1220g · knocked-in ready",
    ],
    inStock: true,
  },
  {
    id: "bat-sovereign-players",
    slug: "sovereign-players-english-willow",
    name: "Sovereign Players",
    brand: "Woodsword",
    category: "bats",
    art: "bat",
    price: 24999,
    mrp: 29999,
    rating: 5.0,
    reviews: 96,
    accent: "#a37014",
    colors: ["Natural"],
    sizes: ["Short Handle", "Long Handle"],
    badge: "Pro",
    tagline: "Grade 1+ English Willow · limited press",
    description:
      "A limited run of hand-selected clefts for the serious batter. Ping tested and toe-guarded, the Sovereign is as good as it gets short of a custom order.",
    features: [
      "Grade 1+ hand-selected cleft",
      "10+ straight grains",
      "Toe-guard fitted, anti-scuff sheet",
      "Concaved back for a lighter feel",
    ],
    inStock: true,
  },
  {
    id: "bat-blitz-t20",
    slug: "blitz-t20-english-willow",
    name: "Blitz T20",
    brand: "Woodsword",
    category: "bats",
    art: "bat",
    price: 14499,
    mrp: 17999,
    rating: 4.7,
    reviews: 158,
    accent: "#d69a1f",
    colors: ["Natural"],
    sizes: ["Short Handle", "Long Handle"],
    badge: "New",
    tagline: "Grade 2 English Willow · big hitter",
    description:
      "Built for the shortest format. A high sweet spot and duckbill toe make the Blitz T20 a launcher for anyone who bats to clear the ropes.",
    features: [
      "Grade 2 English willow",
      "High-middle profile for lofted shots",
      "Duckbill toe, bowed face",
      "Weight 1200–1250g",
    ],
    inStock: true,
  },
  {
    id: "bat-kashmir-classic",
    slug: "kashmir-classic-willow",
    name: "Kashmir Classic",
    brand: "Woodsword",
    category: "bats",
    art: "bat",
    price: 3499,
    mrp: 4999,
    rating: 4.5,
    reviews: 342,
    accent: "#b98328",
    colors: ["Natural"],
    sizes: ["Size 5", "Size 6", "Short Handle"],
    tagline: "Kashmir Willow · everyday leather ball bat",
    description:
      "The dependable club bat. Seasoned Kashmir willow that shrugs off a leather ball season after season, at a price that makes sense.",
    features: [
      "Seasoned Kashmir willow",
      "Full-profile edges",
      "Cane handle with rubber grip",
      "Ready to play out of the wrapper",
    ],
    inStock: true,
  },
  {
    id: "bat-tempest-tennis",
    slug: "tempest-tennis-ball-bat",
    name: "Tempest Tennis",
    brand: "Woodsword",
    category: "bats",
    art: "bat",
    price: 1299,
    mrp: 1899,
    rating: 4.4,
    reviews: 511,
    accent: "#e0a82e",
    colors: ["Black", "Blue", "Red"],
    sizes: ["Full Size"],
    badge: "Sale",
    tagline: "Poplar · tennis & softball tape ball",
    description:
      "Gully-cricket's best friend. A light, powerful poplar-willow bat scalloped for tape and tennis balls, finished with a shock-absorbing grip.",
    features: [
      "Poplar willow, scalloped face",
      "Ultra-light 950g pick-up",
      "Shock grip + toe protection",
      "Perfect for tape / tennis ball",
    ],
    inStock: true,
  },

  /* ------------------------- Batting Gloves ------------------------- */
  {
    id: "glove-fortress-g7",
    slug: "fortress-g7-batting-gloves",
    name: "Fortress G7",
    brand: "Woodsword",
    category: "batting-gloves",
    art: "gloves",
    price: 2199,
    mrp: 2799,
    rating: 4.8,
    reviews: 187,
    accent: "#256e49",
    colors: ["White / Green", "White / Gold", "Black / Grey"],
    sizes: GLOVE_SIZES,
    hands: HANDS,
    badge: "Bestseller",
    tagline: "Sausage-finger protection · pittard palm",
    description:
      "Multi-piece sausage fingers and a floating side bar spread impact away from the fingers, while a genuine Pittards leather palm keeps a dry grip through the longest innings.",
    features: [
      "High-density sausage fingers",
      "Pittards leather palm",
      "Floating cotton side bar",
      "Towelling wrist for sweat",
    ],
    inStock: true,
  },
  {
    id: "glove-titan-lite",
    slug: "titan-lite-batting-gloves",
    name: "Titan Lite",
    brand: "Woodsword",
    category: "batting-gloves",
    art: "gloves",
    price: 1699,
    mrp: 2099,
    rating: 4.6,
    reviews: 264,
    accent: "#2f8f5e",
    colors: ["White / Navy", "White / Red"],
    sizes: GLOVE_SIZES,
    hands: HANDS,
    badge: "New",
    tagline: "Split-finger · ventilated back",
    description:
      "A lighter, cooler glove for stroke-players. A split-finger design keeps the hand mobile and a laser-cut mesh back dumps heat fast.",
    features: [
      "Split-finger flexibility",
      "Laser-cut ventilated back",
      "Amara reinforced palm",
      "Weight 118g per glove",
    ],
    inStock: true,
  },
  {
    id: "glove-academy",
    slug: "academy-batting-gloves",
    name: "Academy",
    brand: "Woodsword",
    category: "batting-gloves",
    art: "gloves",
    price: 1199,
    rating: 4.4,
    reviews: 398,
    accent: "#3a9d6a",
    colors: ["White / Green", "White / Black"],
    sizes: GLOVE_SIZES,
    hands: HANDS,
    tagline: "Coaching-ground value glove",
    description:
      "The kit-bag staple for training and junior cricket. Honest protection, a comfy fit and a price that survives being left on the boundary.",
    features: [
      "PU roll-finger protection",
      "Cotton comfort lining",
      "Value price for clubs & schools",
      "Available youth to large",
    ],
    inStock: true,
  },

  /* --------------------------- Leg Guards --------------------------- */
  {
    id: "pads-aegis-pro",
    slug: "aegis-pro-batting-pads",
    name: "Aegis Pro",
    brand: "Woodsword",
    category: "leg-guards",
    art: "pads",
    price: 3299,
    mrp: 3999,
    rating: 4.8,
    reviews: 121,
    accent: "#2f6fb0",
    colors: ["White / Green", "White / Gold"],
    sizes: PAD_SIZES,
    hands: HANDS,
    badge: "Pro",
    tagline: "Cane & HDF · feather-light",
    description:
      "Traditional cane rods bonded to a high-density foam bolster give tournament-grade protection at just 620g a pad. Bolstered instep and a moulded knee roll finish it off.",
    features: [
      "3 cane rods + HDF bolster",
      "620g per pad",
      "Bolstered instep + side wing",
      "Quick-release elastic straps",
    ],
    inStock: true,
  },
  {
    id: "pads-guardian-club",
    slug: "guardian-club-batting-pads",
    name: "Guardian Club",
    brand: "Woodsword",
    category: "leg-guards",
    art: "pads",
    price: 1799,
    mrp: 2299,
    rating: 4.5,
    reviews: 176,
    accent: "#3f7ec2",
    colors: ["White / Navy"],
    sizes: PAD_SIZES,
    hands: HANDS,
    tagline: "All-round protection for match days",
    description:
      "A well-balanced club pad with foam-and-cane bolsters, breathable bolster wrap and three adjustable straps for a locked-in fit.",
    features: [
      "Foam & cane construction",
      "Breathable bolster wrap",
      "3 adjustable straps",
      "Reinforced knee roll",
    ],
    inStock: true,
  },

  /* ---------------------------- Helmets ---------------------------- */
  {
    id: "helmet-sentinel-ti",
    slug: "sentinel-titanium-helmet",
    name: "Sentinel Titanium",
    brand: "Woodsword",
    category: "helmets",
    art: "helmet",
    price: 4299,
    mrp: 4999,
    rating: 4.9,
    reviews: 89,
    accent: "#3b4252",
    colors: ["Navy", "Maroon", "Bottle Green"],
    sizes: ["Small (54-56)", "Medium (57-59)", "Large (60-62)"],
    badge: "Pro",
    tagline: "Titanium grille · BS7928 tested",
    description:
      "The lightest way to stay safe on a fast deck. A titanium grille shaves grams without giving up the BS7928:2013 impact rating, and a full-shell ABS keeps you cool.",
    features: [
      "Titanium fixed grille",
      "BS7928:2013 certified",
      "ABS shell + memory-foam liner",
      "Adjustable dial fit system",
    ],
    inStock: true,
  },
  {
    id: "helmet-steel-guard",
    slug: "steelguard-club-helmet",
    name: "SteelGuard Club",
    brand: "Woodsword",
    category: "helmets",
    art: "helmet",
    price: 2199,
    mrp: 2699,
    rating: 4.5,
    reviews: 143,
    accent: "#4c566a",
    colors: ["Navy", "Black", "Maroon"],
    sizes: ["Small (54-56)", "Medium (57-59)", "Large (60-62)"],
    badge: "Bestseller",
    tagline: "Steel grille · everyday match helmet",
    description:
      "Rugged, adjustable and comfortable — the helmet every club bag needs. A powder-coated steel grille and high-impact shell that takes the knocks.",
    features: [
      "Powder-coated steel grille",
      "High-impact ABS shell",
      "Moisture-wicking liner",
      "Rear dial size adjuster",
    ],
    inStock: true,
  },

  /* ------------------------- Wicket Keeping ------------------------- */
  {
    id: "wk-catchmaster-pro",
    slug: "catchmaster-pro-keeping-gloves",
    name: "Catchmaster Pro",
    brand: "Woodsword",
    category: "wicket-keeping",
    art: "keeping",
    price: 2899,
    mrp: 3499,
    rating: 4.8,
    reviews: 74,
    accent: "#a3521c",
    colors: ["White / Green", "White / Gold"],
    sizes: ["Boys", "Youth", "Men"],
    badge: "Pro",
    tagline: "Pittards catch web · pre-curved",
    description:
      "A pre-curved, close-fitting keeping glove with a super-tacky Pittards catching web that swallows edges and never lets a nick pop out.",
    features: [
      "Pittards tacky catching web",
      "Pre-curved close fit",
      "Reinforced finger stalls",
      "Towelling cuff",
    ],
    inStock: true,
  },
  {
    id: "wk-catchmaster-inners",
    slug: "catchmaster-cotton-inners",
    name: "Catchmaster Inners",
    brand: "Woodsword",
    category: "wicket-keeping",
    art: "keeping",
    price: 499,
    rating: 4.6,
    reviews: 210,
    accent: "#b5652a",
    colors: ["White"],
    sizes: ["Boys", "Youth", "Men"],
    tagline: "Chamois-palm cotton inners",
    description:
      "Sweat-absorbing cotton inners with a padded chamois palm to take the sting out of a long day behind the stumps.",
    features: [
      "Padded chamois palm",
      "Breathable cotton",
      "Full-finger design",
      "Machine washable",
    ],
    inStock: true,
  },

  /* --------------------------- Cricket Balls --------------------------- */
  {
    id: "ball-match-red",
    slug: "match-leather-ball-red",
    name: "Match Leather (Red)",
    brand: "Woodsword",
    category: "cricket-balls",
    art: "ball",
    price: 899,
    mrp: 1199,
    rating: 4.7,
    reviews: 302,
    accent: "#b92b22",
    colors: ["Red"],
    sizes: ["156g Men", "142g Youth"],
    badge: "Bestseller",
    tagline: "Alum-tanned · 4-piece · hand-stitched",
    description:
      "A proper 4-piece match ball. Alum-tanned leather over a cork-and-wool core, hand-stitched with a proud seam that holds its shape for 40+ overs.",
    features: [
      "Alum-tanned leather",
      "5-layer cork & wool core",
      "Hand-stitched proud seam",
      "MCC-approved weight",
    ],
    inStock: true,
  },
  {
    id: "ball-white-limited",
    slug: "white-limited-overs-ball",
    name: "White Limited-Overs",
    brand: "Woodsword",
    category: "cricket-balls",
    art: "ball",
    price: 949,
    rating: 4.6,
    reviews: 118,
    accent: "#8a8f99",
    colors: ["White"],
    sizes: ["156g Men"],
    badge: "New",
    tagline: "White leather · day-night ready",
    description:
      "A lacquered white ball built to stay visible under lights and swing hard for the powerplay.",
    features: [
      "Extra-white lacquer finish",
      "4-piece construction",
      "Reinforced seam",
      "Day-night visibility",
    ],
    inStock: true,
  },
  {
    id: "ball-practice-pink",
    slug: "practice-pink-ball",
    name: "Practice Ball (Pink)",
    brand: "Woodsword",
    category: "cricket-balls",
    art: "ball",
    price: 349,
    rating: 4.3,
    reviews: 96,
    accent: "#d6478e",
    colors: ["Pink"],
    sizes: ["156g Men"],
    tagline: "2-piece training ball",
    description:
      "An affordable 2-piece pink ball for nets and throwdowns — durable enough for daily practice.",
    features: [
      "2-piece machine-stitched",
      "Bright pink visibility",
      "Great for net sessions",
      "Sold singly",
    ],
    inStock: true,
  },

  /* ----------------------------- Kit Bags ----------------------------- */
  {
    id: "bag-voyager-wheelie",
    slug: "voyager-wheelie-kit-bag",
    name: "Voyager Wheelie",
    brand: "Woodsword",
    category: "kit-bags",
    art: "bag",
    price: 4999,
    mrp: 6499,
    rating: 4.8,
    reviews: 132,
    accent: "#184530",
    colors: ["Green / Gold", "Black / Grey"],
    sizes: ["One Size"],
    badge: "Bestseller",
    tagline: "Full kit · reinforced wheels",
    description:
      "Haul the whole kit without breaking your back. A cavernous main compartment, ventilated boot pocket and rugged inline wheels that survive the roughest ground.",
    features: [
      "90L capacity, holds 2 bats",
      "Reinforced inline wheels",
      "Ventilated shoe / boot pocket",
      "Padded pull handle",
    ],
    inStock: true,
  },
  {
    id: "bag-duffle-day",
    slug: "matchday-duffle-bag",
    name: "Matchday Duffle",
    brand: "Woodsword",
    category: "kit-bags",
    art: "bag",
    price: 1999,
    mrp: 2499,
    rating: 4.5,
    reviews: 208,
    accent: "#256e49",
    colors: ["Green / Gold", "Navy / Red"],
    sizes: ["One Size"],
    tagline: "Grab-and-go match bag",
    description:
      "A single-bat duffle for match days when you're travelling light. Padded straps and a separate shoe pocket keep everything sorted.",
    features: [
      "Holds 1 bat + full kit",
      "Padded shoulder strap",
      "Separate shoe pocket",
      "Water-resistant base",
    ],
    inStock: true,
  },

  /* ----------------------------- Clothing ----------------------------- */
  {
    id: "cloth-pro-whites",
    slug: "pro-match-whites-trousers",
    name: "Pro Match Whites",
    brand: "Woodsword",
    category: "clothing",
    art: "jersey",
    price: 1299,
    mrp: 1699,
    rating: 4.6,
    reviews: 154,
    accent: "#0f766e",
    colors: ["Cream", "White"],
    sizes: APPAREL_SIZES,
    badge: "New",
    tagline: "Poly-viscose · crease-resistant",
    description:
      "Tailored match trousers in a breathable poly-viscose that resists creasing and grass stains, with a stretch waistband for the quick single.",
    features: [
      "Crease-resistant poly-viscose",
      "Stretch waistband",
      "Reinforced knee panels",
      "Machine washable",
    ],
    inStock: true,
  },
  {
    id: "cloth-team-jersey",
    slug: "coloured-team-jersey",
    name: "Coloured Team Jersey",
    brand: "Woodsword",
    category: "clothing",
    art: "jersey",
    price: 999,
    rating: 4.5,
    reviews: 231,
    accent: "#1d8a6b",
    colors: ["Green", "Blue", "Maroon"],
    sizes: APPAREL_SIZES,
    tagline: "Dri-fit · sublimation ready",
    description:
      "A moisture-wicking coloured jersey with raglan sleeves for a full range of motion — ready for team names and numbers.",
    features: [
      "Dri-fit moisture wicking",
      "Raglan stretch sleeves",
      "Fade-resistant colour",
      "Customisable print area",
    ],
    inStock: true,
  },

  /* ---------------------------- Accessories ---------------------------- */
  {
    id: "acc-abdo-guard",
    slug: "moulded-abdo-guard",
    name: "Moulded Abdo Guard",
    brand: "Woodsword",
    category: "accessories",
    art: "misc",
    price: 349,
    rating: 4.6,
    reviews: 187,
    accent: "#7c5cbf",
    colors: ["White"],
    sizes: ["Boys", "Youth", "Men"],
    tagline: "Contoured moulded protection",
    description:
      "A contoured, impact-moulded abdominal guard with smooth edges that sits comfortably in any brief or jockstrap.",
    features: [
      "Impact-moulded shell",
      "Smooth rolled edges",
      "Lightweight & vented",
      "Three sizes",
    ],
    inStock: true,
  },
  {
    id: "acc-bat-grips",
    slug: "octopus-bat-grips-pack",
    name: "Octopus Bat Grips (3-Pack)",
    brand: "Woodsword",
    category: "accessories",
    art: "misc",
    price: 299,
    mrp: 449,
    rating: 4.7,
    reviews: 421,
    accent: "#8a6fd0",
    colors: ["Assorted"],
    sizes: ["One Size"],
    badge: "Sale",
    tagline: "Tacky octopus-pattern grips",
    description:
      "A three-pack of tacky octopus-pattern rubber grips that add cushion and control to any bat handle.",
    features: [
      "Pack of 3, assorted colours",
      "Octopus tack pattern",
      "Shock-absorbing rubber",
      "Fits all handles",
    ],
    inStock: true,
  },
  {
    id: "acc-stumps-set",
    slug: "spring-return-stumps-set",
    name: "Spring-Return Stumps Set",
    brand: "Woodsword",
    category: "accessories",
    art: "misc",
    price: 1299,
    mrp: 1699,
    rating: 4.4,
    reviews: 63,
    accent: "#6a53a8",
    colors: ["Natural / Yellow"],
    sizes: ["One Size"],
    tagline: "6 stumps + 4 bails · carry bag",
    description:
      "A full spring-return stump set that pops back up after every knock — six stumps, four bails and a carry bag for practice and matches.",
    features: [
      "6 spring-return stumps",
      "4 spring bails",
      "Steel base spikes",
      "Carry bag included",
    ],
    inStock: true,
  },
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

export function featuredProducts(count = 8): Product[] {
  return [...products]
    .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    .slice(0, count);
}

export function relatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, count);
}
