export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-ink-100 bg-white">
      <div className="container-x py-14 md:py-20">
        <h1 className="text-balance text-3xl font-extrabold text-ink-900 md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-ink-500 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
