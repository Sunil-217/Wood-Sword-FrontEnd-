"use client";

import { useRouter } from "next/navigation";
import { buildQuery, SORT_OPTIONS } from "@/lib/filters";

export function SortSelect({ params }: { params: Record<string, string> }) {
  const router = useRouter();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const merged = { ...params };
    if (value && value !== "featured") merged.sort = value;
    else delete merged.sort;
    router.push(`/shop${buildQuery(merged)}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="hidden text-brand-900/55 sm:inline">Sort</span>
      <select
        value={params.sort || "featured"}
        onChange={onChange}
        className="cursor-pointer rounded-full border border-brand-900/15 bg-white py-2 pl-3.5 pr-8 text-sm font-medium text-brand-900 outline-none transition-colors hover:border-brand-900/30 focus:border-brand-500"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
