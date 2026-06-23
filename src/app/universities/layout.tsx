import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Medical Universities — NMC & WHO Approved",
  description:
    "Browse top NMC & WHO-approved medical universities abroad, featuring George Emil Palade University (UMPhST) Targu Mures and leading English-medium MBBS schools across Europe.",
  path: "/universities",
  keywords: ["medical universities abroad", "NMC approved universities", "WHO approved medical college", "MBBS university Europe", "UMFST Targu Mures"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
