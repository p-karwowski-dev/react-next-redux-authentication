import { cookies } from 'next/headers'
import {
  createLongSession,
  createShortSession,
  decrypt,
  ExtendedSessionPayload,
} from '@/lib/session'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('longSession')?.value

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const sessionPayload = (await decrypt(
      refreshToken
    )) as ExtendedSessionPayload
    await createShortSession(sessionPayload)
    await createLongSession(sessionPayload)
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const url = new URL(request.url, request.url)
  const originalUrl = url.searchParams.get('originalUrl') || '/login'
  return NextResponse.redirect(new URL(originalUrl, request.url))
}
