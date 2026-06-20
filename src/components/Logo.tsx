import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * GLOBERA brand lockup — logo image + name + (optional) company line + tagline.
 * `light` switches text to white for dark backgrounds (footer / auth / hero).
 */
export default function Logo({
  size = 40,
  light = false,
  big = false,
  tagline = false,
  hideSubOnMobile = false,
}: {
  size?: number;
  light?: boolean;
  big?: boolean;
  tagline?: boolean;
  hideSubOnMobile?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/logo-1.png"
        alt="GLOBERA International Private Limited"
        width={size}
        height={size}
        priority
        className="shrink-0 object-contain"
      />
      <span className="min-w-0 leading-tight">
        <span
          className={cn(
            "block truncate font-extrabold tracking-tight",
            big ? "text-lg" : "text-[15px]",
            light ? "text-white" : "text-ink-900",
          )}
        >
          GLOBERA
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-wider",
            light ? "text-brand-200" : "text-brand-600",
            hideSubOnMobile ? "hidden sm:block" : "block",
          )}
        >
          International Private Limited
        </span>
        {tagline && (
          <span
            className={cn(
              "mt-0.5 block text-[11px] font-medium italic",
              light ? "text-white/75" : "text-ink-400",
            )}
          >
            From Dreams to Degrees
          </span>
        )}
      </span>
    </span>
  );
}
