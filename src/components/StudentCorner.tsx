import Image from "next/image";

/**
 * Small decorative student photos tucked into a page corner — international
 * students (Ukrainian / Hungarian / European) to reinforce the study-abroad
 * theme. Purely presentational, hidden on small screens to avoid clutter.
 *
 * Drop inside a `relative` container.
 */
const STUDENTS = [
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", alt: "International student" },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80", alt: "European student" },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", alt: "Medical student abroad" },
];

export default function StudentCorner({
  position = "bottom-right",
  className = "",
}: {
  position?: "bottom-right" | "top-right" | "bottom-left";
  className?: string;
}) {
  const pos =
    position === "top-right"
      ? "right-4 top-4"
      : position === "bottom-left"
        ? "bottom-4 left-4"
        : "bottom-4 right-4";

  return (
    <div aria-hidden className={`pointer-events-none absolute hidden lg:block ${pos} ${className}`}>
      <div className="flex -space-x-4">
        {STUDENTS.map((s, i) => (
          <span
            key={i}
            className="relative h-14 w-14 overflow-hidden rounded-full border-[3px] border-white shadow-float"
            style={{ transform: `translateY(${i % 2 === 0 ? "0" : "-8px"})` }}
          >
            <Image src={s.src} alt={s.alt} fill sizes="56px" className="object-cover" />
          </span>
        ))}
      </div>
    </div>
  );
}
