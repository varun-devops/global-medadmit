export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="hero-gradient text-white">
      <div className="container-x py-14 md:py-20">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-white/85 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}
