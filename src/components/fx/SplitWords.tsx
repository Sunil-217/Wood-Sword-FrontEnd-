/**
 * Kinetic type — each word rises out of its own mask on a stagger.
 * Renders as a single accessible string; the split is presentational.
 */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  /** ms before the first word animates */
  delay?: number;
  /** ms between words */
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-flex overflow-hidden py-[0.08em] align-bottom">
            <span
              className="animate-word inline-block"
              style={{ animationDelay: `${delay + i * step}ms` }}
            >
              {word}
            </span>
            {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </span>
  );
}
