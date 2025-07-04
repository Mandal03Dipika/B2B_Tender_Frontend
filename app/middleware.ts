import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;
  const publicPages = ["/", "/login", "/register"];
  const isPublicPage = publicPages.includes(pathname);
  if (isLoggedIn && isPublicPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!isLoggedIn && !isPublicPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard",
    "/application",
    "/company",
    "/tenders",
  ],
};
