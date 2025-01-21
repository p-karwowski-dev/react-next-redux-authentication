import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function DELETE() {
  try {
    await deleteSession('shortSession')
    return NextResponse.json(
      { success: true, message: 'Short session has expired.' },
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
