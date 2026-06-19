export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="page-header-soft">
      <div className="blob right-10 top-0 h-40 w-40 bg-brand-100" />
      <div className="blob -left-10 bottom-0 h-32 w-32 bg-mint-bg" />
      <div className="dotgrid absolute right-8 bottom-6 h-20 w-28 text-ink-200" />
      <div className="container-x relative py-14 md:py-20">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-ink-900 md:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-2xl text-ink-500 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
