import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function DELETE() {
  try {
    await deleteSession('longSession')
    await deleteSession('shortSession')

    return NextResponse.json(
      { success: true, message: 'User has been logged out.' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    return NextResponse.json(
      { message: 'MongoDB connection failed', error: (error as any).message },
      { status: 500 }
    )
  }
}
