"use client";

import { useWishlist } from "@/context/WishlistContext";
import { showToast } from "./Toaster";

export function WishlistButton({
  slug,
  name,
  className = "",
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  const { has, toggle, ready } = useWishlist();
  const active = ready && has(slug);

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
    showToast(active ? `${name} removed from wishlist` : `${name} saved to wishlist`);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      className={`press inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-colors ${
        active
          ? "bg-ball-500 text-white"
          : "bg-white/85 text-brand-900 hover:bg-white"
      } ${className}`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"}>
        <path
          d="M12 20.5l-1.45-1.32C5.4 14.5 2 11.4 2 7.6 2 4.8 4.2 2.7 7 2.7c1.55 0 3.04.72 4 1.86.96-1.14 2.45-1.86 4-1.86 2.8 0 5 2.1 5 4.9 0 3.8-3.4 6.9-8.55 11.58L12 20.5z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
