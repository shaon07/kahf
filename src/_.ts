import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.get("accessToken"); // Get the 'authToken' cookie, which determines if the user is logged in

  const url = req.nextUrl.clone(); // Clone the request URL to modify it

  // Paths that don't require authentication
  const publicPaths = ["/login", "/register"];

  // If the user is NOT logged in and trying to access a protected page (anything other than /login and /register)
  if (!token && !publicPaths.includes(url.pathname)) {
    // Redirect to login if not authenticated
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If the user is logged in and trying to access /login or /register, redirect to /home
  if (token && publicPaths.includes(url.pathname)) {
    url.pathname = "/links";
    return NextResponse.redirect(url);
  }

  // If the conditions aren't met, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/links", "/login", "/register", "/profile-detail"], // Define the routes where middleware will apply
};
