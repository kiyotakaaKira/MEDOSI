import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('healthmesh_token')?.value;
  const path = request.nextUrl.pathname;

  if (!token && !path.startsWith('/log-in') && !path.startsWith('/sign-up')) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  // Prevent logged in users from visiting log-in page
  if (token && (path.startsWith('/log-in') || path.startsWith('/sign-up'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
