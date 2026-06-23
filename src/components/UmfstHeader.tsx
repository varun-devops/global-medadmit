import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TriangleField from "@/components/TriangleField";
import { umfst } from "@/lib/umfst";

/**
 * Dark triangle-background header used across the UMPhST microsite, matching
 * the new hero/footer look. Server-rendered for SEO (real <h1> in the HTML).
 */
export default function UmfstHeader({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumb?: string;
}) {
  return (
    <section className="tri-bg-dark relative overflow-hidden text-white">
      <span className="tri-mesh-light right-0 top-0 hidden h-full w-1/2 md:block" aria-hidden />
      <TriangleField tone="dark" className="right-0 top-0 hidden h-full w-1/2 lg:block" />
      <div className="container-x relative py-14 md:py-20">
        <nav className="flex flex-wrap items-center gap-1 text-sm text-ink-300">
          <Link href="/universities" className="hover:text-white">
            Universities
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/universities/${umfst.slug}`} className="hover:text-white">
            {umfst.shortName}
          </Link>
          {crumb && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">{crumb}</span>
            </>
          )}
        </nav>

        {eyebrow && (
          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-200">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-[1.12] tracking-tight md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-ink-200 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
