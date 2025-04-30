import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/auth';

// Paths that can be accessed without authentication
const publicPaths = ['/', '/login', '/forgot-password'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow access to public paths without authentication check
  if (publicPaths.includes(path)) {
    return NextResponse.next();
  }

  // Handle authentication for protected routes
  return updateSession(request);
}

export const config = {
  // Skip all internal paths like _next, and api routes
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};