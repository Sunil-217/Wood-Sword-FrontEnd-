import { SITE_URL } from "@/lib/site";
import type { Product } from "@/lib/types";
import { categoryMap } from "@/lib/catalog";

/**
 * schema.org markup. Every field is read from the catalog — offers carry the
 * real price and stock state, and `aggregateRating` is deliberately absent
 * because the store has no ratings to report.
 */
export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.slug,
    brand: { "@type": "Brand", name: product.brand },
    category: categoryMap[product.category].name,
    ...(product.image
      ? { image: [`${SITE_URL}${product.image}`] }
      : {}),
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Oneup Sports" },
    },
  };

  return (
    <script
      type="application/ld+json"
      // Values come from our own catalog, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Store identity + the real Chromepet address and opening hours. */
export function StoreJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: "Oneup Sports",
    url: SITE_URL,
    telephone: "+91-80561-26269",
    email: "support@oneupsports.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No.37, Ramachandra Road, Nehru Nagar, Chromepet",
      addressLocality: "Chennai",
      postalCode: "600044",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "21:00",
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=100076878750874",
      "https://www.instagram.com/oneupsportsstore/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
