import { cookies } from 'next/headers'
import {
  createLongSession,
  createShortSession,
  decrypt,
  ExtendedSessionPayload,
} from '@/lib/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const refreshToken = request.cookies.get('longSession')?.value

  if (!refreshToken) {
    return NextResponse.json({}, { status: 401 })
  }

  try {
    const sessionPayload = (await decrypt(
      refreshToken
    )) as ExtendedSessionPayload
    await createShortSession(sessionPayload)
    await createLongSession(sessionPayload)
  } catch {
    return NextResponse.json({}, { status: 401 })
  }

  return NextResponse.json(
    {
      success: true,
    },
    { status: 200 }
  )
}
