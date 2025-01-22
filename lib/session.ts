import 'server-only'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { ObjectId } from 'mongodb'

interface SessionPayload {
  userId: ObjectId
  username: string
}

export interface ExtendedSessionPayload extends SessionPayload {
  sessionType: SessionType
  expireDate: Date
  expiresIn: string | number
}

type SessionType = 'shortSession' | 'longSession'

const sessionKey = new TextEncoder().encode(
  process.env.USER_SESSION_KEY as string
)

export async function encrypt(
  sessionPayload: SessionPayload,
  expiresIn: string
): Promise<string> {
  const token = await new SignJWT({ ...sessionPayload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(sessionKey)
  return token
}

export async function decrypt(
  sessionToken: string | undefined = ''
): Promise<SessionPayload> {
  try {
    const { payload } = await jwtVerify(sessionToken, sessionKey)
    const { userId, username } = payload
    if (userId && username) {
      return { userId, username } as SessionPayload
    } else {
      throw new Error('Invalid session payload')
    }
  } catch (err) {
    throw err
  }
}

async function setCookie(
  sessionType: SessionType,
  sessionToken: string,
  expires: Date
) {
  const cookieStore = await cookies()
  const path = sessionType === 'longSession' ? '/api/auth/refresh' : '/'

  cookieStore.set(sessionType, sessionToken, {
    httpOnly: true,
    secure: false,
    expires,
    sameSite: 'lax',
    path,
  })
}

export async function deleteSession(sessionType: SessionType): Promise<void> {
  const expireDate = new Date(Date.now())
  await setCookie(sessionType, '', expireDate)
}

export async function createLongSession(payload: SessionPayload) {
  const expireDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  const sessionToken = await encrypt(payload, '1d')
  await setCookie('longSession', sessionToken, expireDate)
}

export async function createShortSession(payload: SessionPayload) {
  const expireDate = new Date(Date.now() + 60 * 60 * 1000)
  const sessionToken = await encrypt(payload, '1h')
  await setCookie('shortSession', sessionToken, expireDate)
}
