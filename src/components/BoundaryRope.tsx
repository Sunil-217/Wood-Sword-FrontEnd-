/**
 * Boundary-rope section divider — a twisted gold rope with a
 * cricket-ball marker at the centre, like the boundary line at a ground.
 */
export function BoundaryRope() {
  return (
    <div className="container-page" aria-hidden>
      <div className="relative flex items-center py-2">
        <div className="boundary-rope flex-1" />
        <span className="mx-3 inline-flex h-7 w-7 items-center justify-center">
          <svg viewBox="0 0 28 28" className="h-full w-full">
            <circle cx="14" cy="14" r="11" fill="#c23227" />
            <circle cx="14" cy="14" r="11" fill="url(#ws-rope-ball)" />
            <path d="M14 4.5 q6 9.5 0 19" fill="none" stroke="#f6e7d8" strokeWidth="1.4" opacity="0.9" />
            <defs>
              <radialGradient id="ws-rope-ball" cx="0.35" cy="0.3" r="1">
                <stop offset="0%" stopColor="#e8564a" />
                <stop offset="100%" stopColor="#8f1f16" />
              </radialGradient>
            </defs>
          </svg>
        </span>
        <div className="boundary-rope flex-1" />
      </div>
    </div>
  );
}
