export function Rating({
  value,
  reviews,
  size = "sm",
  className = "",
}: {
  value: number;
  reviews?: number;
  size?: "sm" | "md";
  className?: string;
}) {
  const px = size === "md" ? 18 : 14;
  const full = Math.floor(value);
  const frac = value - full;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = i < full ? 1 : i === full ? frac : 0;
          return <Star key={i} px={px} fill={fill} />;
        })}
      </div>
      <span className="text-xs font-medium text-ink/70">
        {value.toFixed(1)}
        {reviews != null && (
          <span className="text-ink/45"> ({reviews})</span>
        )}
      </span>
      <span className="sr-only">
        Rated {value} out of 5{reviews != null ? ` from ${reviews} reviews` : ""}
      </span>
    </div>
  );
}

function Star({ px, fill }: { px: number; fill: number }) {
  const id = `star-${Math.round(fill * 100)}-${px}`;
  return (
    <svg width={px} height={px} viewBox="0 0 20 20">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#e0a82e" />
          <stop offset={`${fill * 100}%`} stopColor="#e0a82e" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.9l-4.94 2.6.94-5.5-4-3.9 5.53-.8z"
        fill={`url(#${id})`}
      />
    </svg>
  );
}
