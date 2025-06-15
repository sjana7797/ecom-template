import { betterFetch } from "@better-fetch/fetch";
import type { Auth } from "@repo/auth";
import { NextRequest, NextResponse } from "next/server";
import { env } from "./env";
import { ADMIN_PAGES, AUTH_PAGES } from "./constants/routes";

type Session = Auth["Session"];

const publicPages: string[] = [AUTH_PAGES.SIGN_IN, AUTH_PAGES.RESET_PASSWORD];

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: env.BETTER_AUTH_URL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  console.log({ session, p: request.nextUrl, s: env.BETTER_AUTH_URL });

  if (!session && !publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(AUTH_PAGES.SIGN_IN, request.url));
  }
  if (session && publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(ADMIN_PAGES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match everything except Next internals, static files, and /api or /trpc routes
    "/((?!_next|api|trpc|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
