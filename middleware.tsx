// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { userType } from "./lib/userTypes";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    console.info("pathname", request.nextUrl.pathname);
    if (
      request.nextUrl.pathname.startsWith("/super-admin") &&
      request.nextauth.token?.UserType.user_type !== "requestor-admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/requestor") &&
      request.nextauth.token?.UserType.user_type !== "requestor"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/super-admin/:path*", "/requestor/:path*"],
};
