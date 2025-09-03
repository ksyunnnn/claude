import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { locales } from './i18n'

export async function middleware(request: NextRequest) {
  // Handle internationalization first - but since we don't want route-based locales,
  // we'll handle locale detection via cookies
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 
                 request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ||
                 'ja'
  
  // Ensure locale is valid
  const validLocale = locales.includes(locale as (typeof locales)[number]) ? locale : 'ja'
  
  let supabaseResponse = NextResponse.next({
    request,
  })

  // Set locale cookie if not set or different
  if (!request.cookies.get('NEXT_LOCALE') || request.cookies.get('NEXT_LOCALE')?.value !== validLocale) {
    supabaseResponse.cookies.set('NEXT_LOCALE', validLocale, { 
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make your users
  // vulnerable to session hijacking!

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedPaths = ['/new', '/settings']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (!user && isProtectedPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're trying to modify the response, do it above.
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}