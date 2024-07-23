import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req:any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow the requests if the following is true...
  // 1) It's a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.startsWith('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect to login if trying to access a protected route without a token
//   if (!token && pathname.startsWith('/protected')) {
//     return NextResponse.redirect(new URL('/public/login', req.url));
//   }

  // Allow public routes and any static files
  if (pathname.startsWith('/public') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/protected/:path*', '/api/auth/:path*', '/public/:path*'],
};
