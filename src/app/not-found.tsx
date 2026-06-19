import Link from "next/link";

export default function NotFound() {
  return (
    <div className="hero-gradient grid min-h-[70vh] place-items-center p-6 text-center text-white">
      <div>
        <p className="text-6xl font-extrabold">404</p>
        <h1 className="mt-3 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-white/80">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-gold mt-6">Back to Home</Link>
      </div>
    </div>
  );
}
