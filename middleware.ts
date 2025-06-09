import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public paths that don't require authentication
const publicPaths = ['/', '/login', '/signup', '/verify-email', '/reset-password', '/forgot-password', '/hero-image.png']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Exclude static files and Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".webp") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".ttf")
  ) {
    return NextResponse.next()
  }

  // Allow access to public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const token = request.cookies.get('auth-token')?.value

  // If not authenticated and trying to access protected route, redirect to login
  if (!token && !publicPaths.includes(pathname)) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
} 