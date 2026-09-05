import type { MetadataRoute } from "next";
import { groups, products } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only indexable routes — the cart/checkout/account pages are disallowed
  // in robots.ts, so listing them here would contradict it.
  const staticRoutes = ["", "/shop", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const groupRoutes = groups.map((g) => ({
    url: `${SITE_URL}/shop?group=${g.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...groupRoutes, ...productRoutes];
}
