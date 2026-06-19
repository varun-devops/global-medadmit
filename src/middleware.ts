import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // Always refresh the Supabase auth session first.
  const response = await updateSession(request);

  // ---- Admin subdomain handling ----
  // When the site is visited via an "admin." subdomain (e.g. admin.yourdomain.com),
  // send the root path straight to the /admin panel. This works automatically once
  // you add the subdomain to your Vercel project (see DEPLOYMENT.md). On localhost
  // you can test it via http://admin.localhost:3000
  const host = (request.headers.get("host") || "").split(":")[0];
  const isAdminHost = host.startsWith("admin.");

  if (isAdminHost && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    const rewrite = NextResponse.rewrite(url);
    // Preserve any auth cookies that updateSession set.
    response.cookies.getAll().forEach((c) => rewrite.cookies.set(c));
    return rewrite;
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
