/**
 * Downloads the product photography referenced by src/lib/productImages.ts,
 * resizes it to a sane web size, and writes it into public/products/ so the
 * storefront no longer depends on the WordPress media library at runtime.
 *
 *   node scripts/vendor-product-images.mjs
 *
 * Rewrites src/lib/productImages.ts to point at the local files.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const MAP_FILE = path.join(ROOT, "src/lib/productImages.ts");
const OUT_DIR = path.join(ROOT, "public/products");

/**
 * Long edge in px. The product hero renders at roughly 600 CSS px, so 800
 * still covers a 1.3x display and next/image downscales from here for the
 * grid. Effort 6 costs encode time but buys a real size reduction — at 900px
 * / q78 / effort 4 the files were about twice this size.
 */
const MAX_EDGE = 800;
const QUALITY = 72;
const EFFORT = 6;
const CONCURRENCY = 6;

/** Optional: read the source map from another file (e.g. a git revision). */
const SOURCE_MAP = process.env.SOURCE_MAP || MAP_FILE;

const source = await readFile(SOURCE_MAP, "utf8");
const entries = [...source.matchAll(/"([^"]+)":\s*"(https:\/\/[^"]+)"/g)].map(
  ([, slug, url]) => ({ slug, url }),
);

if (entries.length === 0) {
  console.error("No remote entries found — already vendored?");
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
console.log(`Vendoring ${entries.length} photos → public/products/`);

const results = [];
let done = 0;
let bytes = 0;

async function handle({ slug, url }) {
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "Mozilla/5.0 (oneup-sports build script)" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());

    const out = await sharp(input)
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: EFFORT })
      .toBuffer();

    const file = `${slug}.webp`;
    await writeFile(path.join(OUT_DIR, file), out);
    bytes += out.length;
    results.push({ slug, local: `/products/${file}` });
  } catch (err) {
    console.warn(`  ! ${slug}: ${err.message} — keeping remote URL`);
    results.push({ slug, local: url });
  } finally {
    done++;
    if (done % 25 === 0) console.log(`  ${done}/${entries.length}`);
  }
}

// Simple fixed-size worker pool so we don't hammer the origin.
const queue = [...entries];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    let next;
    while ((next = queue.shift())) await handle(next);
  }),
);

results.sort((a, b) => a.slug.localeCompare(b.slug));

const header = `/**
 * Product photography, vendored into public/products/ by
 * scripts/vendor-product-images.mjs — resized to ${MAX_EDGE}px and re-encoded
 * as WebP, so the storefront serves its own images.
 *
 * Generated — do not edit by hand.
 */
export const PRODUCT_IMAGES: Record<string, string> = {
`;
const body = results.map((r) => `  "${r.slug}": "${r.local}",`).join("\n");
await writeFile(MAP_FILE, `${header}${body}\n};\n`, "utf8");

console.log(
  `\nDone: ${results.length} photos, ${(bytes / 1024 / 1024).toFixed(1)} MB total`,
);
console.log("Rewrote src/lib/productImages.ts to local paths.");
