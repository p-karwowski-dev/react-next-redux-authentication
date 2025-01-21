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
  expiresAt: Date
  expiresIn: string | number
}

type SessionType = 'shortSession' | 'longSession'

const sessionKey = new TextEncoder().encode(
  process.env.USER_SESSION_KEY as string
)

export async function encrypt(
  sessionPayload: ExtendedSessionPayload
): Promise<string> {
  const { expiresIn, userId, username } = sessionPayload
  const token = await new SignJWT({ userId, username })
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

async function createSession(payload: ExtendedSessionPayload) {
  const sessionToken = await encrypt(payload)
  const cookieStore = await cookies()
  const path = payload.sessionType === 'longSession' ? '/refresh' : '/'

  cookieStore.set(payload.sessionType, sessionToken, {
    httpOnly: true,
    secure: false,
    expires: payload.expiresAt,
    sameSite: 'lax',
    path,
  })
}

export async function deleteSession(sessionType: SessionType): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(sessionType)
}

export async function createLongSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  return createSession({
    ...payload,
    expiresAt,
    expiresIn: '1d',
    sessionType: 'longSession',
  })
}

export async function createShortSession(payload: SessionPayload) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  return createSession({
    ...payload,
    expiresAt,
    expiresIn: '1h',
    sessionType: 'shortSession',
  })
}
