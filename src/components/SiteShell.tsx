"use client";

import { usePathname } from "next/navigation";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide public chrome on auth + admin areas (they have their own layout)
  const bare =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/admin");

  if (bare) return <>{children}</>;

  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
