/**
 * Canonical origin for metadata, sitemap and robots.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL — set this once a custom domain is attached
 *     (e.g. https://oneupsports.in).
 *  2. VERCEL_PROJECT_PRODUCTION_URL — the project's production domain,
 *     injected by Vercel, so previews still point at production.
 *  3. localhost, for local development.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
