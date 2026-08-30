/**
 * Remounts on every route change, giving each page a soft
 * fade-and-rise entrance without any JS.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
