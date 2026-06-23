import Image from "next/image";
import { cn } from "@/lib/utils";

/** Renders a real country flag image from flagcdn (public-domain). */
export default function Flag({
  code,
  name = "",
  className,
}: {
  code: string;
  name?: string;
  className?: string;
}) {
  return (
    <Image
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={name ? `${name} flag` : ""}
      width={28}
      height={20}
      className={cn("inline-block rounded-[3px] object-cover align-middle ring-1 ring-black/5", className)}
    />
  );
}
