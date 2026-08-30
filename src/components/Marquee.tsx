/**
 * Infinite horizontal ticker. Renders children twice and slides the
 * track by 50% on a loop, masked at both edges. Pure CSS — no JS.
 */
export function Marquee({
  children,
  duration = 30,
  className = "",
}: {
  children: React.ReactNode;
  /** seconds for one full loop */
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max items-center"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
