"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="hero-gradient grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex justify-center">
          <Logo size={52} light big tagline />
        </Link>
        <div className="card p-7 md:p-8">
          <h1 className="text-2xl font-extrabold text-ink-900">{title}</h1>
          <p className="mt-1 text-sm text-ink-500">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-5 text-center text-sm text-white/70">
          <Link href="/" className="hover:text-white">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
