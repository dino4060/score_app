import { NextRequest, NextResponse } from 'next/server';
const normalRoutes = ['/', '/search', '/reports', '/tops'];

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isNormal = normalRoutes.includes(path);

    if (!isNormal) return NextResponse.redirect(new URL('/search', request.nextUrl))

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - files.svg (public files)
         * - public/ file svg and jpg
         * - public/ images/
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.svg$|.*\\.jpg$|images).*)',
    ],
}
