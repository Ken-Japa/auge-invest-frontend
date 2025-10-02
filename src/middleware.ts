import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isHomePage = request.nextUrl.pathname === '/'
  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')

  // If it's homepage and user is authenticated, redirect to dashboard
  if (isHomePage && token) {
    return NextResponse.redirect(new URL('/visao-economia', request.url))
  }

  // Protected routes check
  if (!token && !isAuthPage && !isHomePage) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Prevent authenticated users from accessing auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/visao-economia', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/dashboard/:path*',
    '/visao-economia/:path*',
    '/alertas/:path*',
    '/perfil/:path*',
    '/perfil/configuracoes/:path*',
  ],
}
