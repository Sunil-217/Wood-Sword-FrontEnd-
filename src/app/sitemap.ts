import type { MetadataRoute } from "next";
import { groups, products } from "@/lib/catalog";

const BASE = "https://wood-sword.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/cart", "/wishlist", "/checkout"].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const groupRoutes = groups.map((g) => ({
    url: `${BASE}/shop?group=${g.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE}/product/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...groupRoutes, ...productRoutes];
}
