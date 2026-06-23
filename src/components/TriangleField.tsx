/**
 * A decorative cluster of low-poly triangles, echoing the geometric mesh from
 * the reference design. Purely presentational — `aria-hidden` and non-interactive.
 *
 * Usage: drop inside a `relative` container.
 *   <TriangleField tone="dark" className="right-0 top-0 w-2/3" />
 *
 * tone "dark"  → light/violet triangles (for navy backgrounds)
 * tone "light" → violet triangles      (for white backgrounds)
 */

type Tri = {
  /** left % */ x: number;
  /** top %  */ y: number;
  /** size in rem (half-base) */ s: number;
  /** flip pointing down */ down?: boolean;
  /** 0..1 opacity */ o: number;
  /** color token */ c: string;
};

const DARK_TRIS: Tri[] = [
  { x: 4, y: 8, s: 2.6, o: 0.9, c: "text-brand-400", down: true },
  { x: 18, y: 0, s: 1.8, o: 0.55, c: "text-brand-300" },
  { x: 30, y: 22, s: 3.0, o: 0.8, c: "text-brand-500", down: true },
  { x: 48, y: 4, s: 2.2, o: 0.5, c: "text-white/30" },
  { x: 60, y: 28, s: 1.6, o: 0.7, c: "text-brand-300" },
  { x: 72, y: 6, s: 3.4, o: 0.85, c: "text-brand-600", down: true },
  { x: 86, y: 30, s: 2.0, o: 0.45, c: "text-white/25" },
  { x: 90, y: 2, s: 2.8, o: 0.75, c: "text-brand-400" },
  { x: 12, y: 50, s: 2.4, o: 0.4, c: "text-brand-500", down: true },
  { x: 40, y: 62, s: 1.8, o: 0.55, c: "text-brand-300" },
  { x: 66, y: 56, s: 3.0, o: 0.7, c: "text-brand-600" },
  { x: 82, y: 64, s: 2.2, o: 0.5, c: "text-white/20", down: true },
];

const LIGHT_TRIS: Tri[] = [
  { x: 8, y: 6, s: 2.4, o: 0.5, c: "text-brand-200", down: true },
  { x: 26, y: 24, s: 1.8, o: 0.35, c: "text-brand-300" },
  { x: 44, y: 2, s: 3.0, o: 0.45, c: "text-brand-100", down: true },
  { x: 62, y: 26, s: 2.0, o: 0.4, c: "text-brand-300" },
  { x: 80, y: 4, s: 3.4, o: 0.5, c: "text-brand-200", down: true },
  { x: 90, y: 30, s: 1.6, o: 0.35, c: "text-brand-300" },
];

export default function TriangleField({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const tris = tone === "dark" ? DARK_TRIS : LIGHT_TRIS;
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      {tris.map((t, i) => (
        <span
          key={i}
          className={`tri ${t.down ? "tri-down" : ""} ${t.c}`}
          style={{
            left: `${t.x}%`,
            top: `${t.y}%`,
            opacity: t.o,
            borderWidth: t.down
              ? `0 ${t.s}rem ${t.s * 1.7}rem ${t.s}rem`
              : `0 ${t.s}rem ${t.s * 1.7}rem ${t.s}rem`,
          }}
        />
      ))}
    </div>
  );
}
