import clientPromise from '@/lib/mongodb'
import argon2 from 'argon2'
import { createLongSession, createShortSession, decrypt } from '@/lib/session'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    // Verify reg payload
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Username and password are required',
        },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('authProject')
    const collection = db.collection('users')

    // Find user by username
    let user = await collection.findOne({ username })
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid username or password',
        },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid username or password',
        },
        { status: 401 }
      )
    }

    const sessionPayload = { username: user.username, userId: user._id }
    await createShortSession(sessionPayload)
    await createLongSession(sessionPayload)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
