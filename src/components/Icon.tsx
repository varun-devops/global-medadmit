"use client";

import { icons, type LucideProps } from "lucide-react";

/**
 * Renders a lucide-react icon by its string name (so data files can reference
 * icons declaratively). Falls back to a neutral dot if the name is unknown.
 */
export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const LucideIcon = icons[name as keyof typeof icons] ?? icons.Circle;
  return <LucideIcon {...props} />;
}
