import { NextResponse } from 'next/server';
import { createClient } from '@/lib/db/dbServer';
import { cookies } from 'next/headers';

export async function middleware(req) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const token = cookieStore.get('sb-access-token');

  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);
  const staticFileExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  const isStaticFile = staticFileExtensions.some(ext => req.nextUrl.pathname.endsWith(ext));

  if (isPublicPath || isStaticFile || req.nextUrl.pathname.startsWith('/_next/static/')) {
    return NextResponse.next();
  }

  if (!token) {
    console.log('No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    console.log('Error or no user found, redirecting to /login', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('User authenticated:', user);
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};