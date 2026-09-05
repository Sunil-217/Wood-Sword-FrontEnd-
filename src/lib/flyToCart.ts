/**
 * Fly-to-cart: launches a little ball from the clicked element that
 * arcs into the header cart icon (#cart-icon), then removes itself.
 * Skipped under prefers-reduced-motion or when either end is missing.
 */
export function flyToCart(from: HTMLElement | null) {
  if (!from || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // The header icon is hidden below lg, where the bottom nav owns the bag.
  // Aim at whichever one is actually on screen.
  const target = [
    document.getElementById("cart-icon"),
    document.getElementById("cart-icon-mobile"),
  ].find((el) => el && el.getBoundingClientRect().width > 0);
  if (!target) return;

  const f = from.getBoundingClientRect();
  const t = target.getBoundingClientRect();
  const sx = f.left + f.width / 2;
  const sy = f.top + f.height / 2;
  const dx = t.left + t.width / 2 - sx;
  const dy = t.top + t.height / 2 - sy;

  const ball = document.createElement("div");
  ball.className = "fly-ball";
  ball.style.left = `${sx - 9}px`;
  ball.style.top = `${sy - 9}px`;
  document.body.appendChild(ball);

  const anim = ball.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      {
        transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 90}px) scale(0.85)`,
        opacity: 1,
        offset: 0.55,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(0.25)`, opacity: 0.5 },
    ],
    { duration: 700, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
  );
  anim.onfinish = () => ball.remove();
  anim.oncancel = () => ball.remove();
}
