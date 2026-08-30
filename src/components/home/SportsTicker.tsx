import { Marquee } from "@/components/Marquee";
import { groups } from "@/lib/catalog";

/**
 * Big outlined sport names scrolling across the page — pure CSS ticker.
 */
export function SportsTicker() {
  return (
    <Marquee duration={45} className="py-8 sm:py-10">
      {groups.map((g) => (
        <span key={g.slug} className="mx-5 flex items-center gap-10 sm:mx-7">
          <span className="font-display text-3xl font-extrabold uppercase tracking-tight text-transparent [-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--color-ink)_30%,transparent)] sm:text-5xl">
            {g.name}
          </span>
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rotate-45 bg-brand-500/70 sm:h-3 sm:w-3"
          />
        </span>
      ))}
    </Marquee>
  );
}
