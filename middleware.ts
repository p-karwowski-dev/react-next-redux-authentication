import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/session'

export async function middleware(request: NextRequest) {
  let bearerToken = request.cookies.get('shortSession')?.value

  if (!bearerToken) {
    return setUnauthorizedHeader(request)
  }

  try {
    await decrypt(bearerToken)
  } catch (error) {
    console.error('Auth error in middleware.', error)
    return setUnauthorizedHeader(request)
  }

  return NextResponse.next()
}

const setUnauthorizedHeader = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-unauthorized', 'true')
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  return response
}

export const config = {
  matcher: ['/api/auth/me/:path*'],
}
