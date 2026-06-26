import { useMemo } from "react";

export function AmbientBackground() {
  const rows = useMemo(() => Array.from({ length: 9 }), []);

  return (
    <div className="ambient" aria-hidden="true">
      <div className="grid-bg" />
      <div className="scanline" />
      <div className="data-rain">
        {rows.map((_, index) => (
          <span key={index} style={{ animationDelay: `${index * -1.4}s` }} />
        ))}
      </div>
    </div>
  );
}
