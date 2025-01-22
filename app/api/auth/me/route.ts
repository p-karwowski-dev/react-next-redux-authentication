import clientPromise from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { decrypt, deleteSession } from '@/lib/session'
import { UserDetails } from '@/lib/types/user'

export async function GET(request: NextRequest) {
  const isUnauthorized = request.headers.get('x-unauthorized')

  if (isUnauthorized) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized request.',
      },
      { status: 401 }
    )
  }

  try {
    const client = await clientPromise
    const db = client.db('authProject')
    const collection = db.collection('users')
    const bearerToken = request.cookies.get('shortSession')?.value
    const { username } = await decrypt(bearerToken)
    let payload = await collection.findOne({ username })

    if (!payload) {
      throw new Error('User cannot be find in database.')
    }

    const user: UserDetails = {
      userId: payload._id,
      username: payload.username,
      age: payload.age,
      city: payload.city,
    }

    return NextResponse.json(
      {
        success: true,
        data: { user },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Internal server Error.',
        error,
      },
      { status: 500 }
    )
  }
}
