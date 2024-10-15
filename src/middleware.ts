// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isUser = req.cookies.get('isUser');

  // Public routes for non-authenticated users
  const publicRoutes = ['/login', '/register'];

  // If the user is not logged in and tries to access any route except public routes
  if (!isUser && !publicRoutes.includes(pathname)) {
    // Redirect non-logged in users to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the user is logged in and tries to access the login or register pages
  if (isUser && publicRoutes.includes(pathname)) {
    // Redirect logged-in users from login/register to the default home page /links
    return NextResponse.redirect(new URL('/links', req.url));
  }

  // If the user is logged in and accesses the root (/), redirect to /links
  if (isUser && pathname === '/') {
    return NextResponse.redirect(new URL('/links', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
