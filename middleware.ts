import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

// List of public paths that don't require authentication
const publicPaths = ['/', '/login', '/signup', '/verify-email', '/reset-password', '/forgot-password', '/hero-image.png']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('Middleware checking path:', pathname)

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
    console.log('Skipping auth check for static file:', pathname)
    return NextResponse.next()
  }

  // Allow access to public paths
  if (publicPaths.includes(pathname)) {
    console.log('Skipping auth check for public path:', pathname)
    return NextResponse.next()
  }

  // Only check authentication for dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    console.log('Skipping auth check for non-dashboard path:', pathname)
    return NextResponse.next()
  }

  // Check if user is authenticated
  const token = request.cookies.get('token')?.value
  console.log('Token in middleware:', token)

  // If not authenticated and trying to access protected route, redirect to login
  if (!token) {
    console.log('No token found, redirecting to login')
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // Validate JWT using jose
  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log('Decoded JWT payload:', payload);
    // If verification passes, continue
  } catch (error) {
    console.error('JWT verification error:', error);
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  console.log('Auth check passed for:', pathname)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 