import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export const GET = async () => {
  try {
    let client = await clientPromise
    console.info('MongoDB connected successfully!')

    const db = client.db('authProject')
    console.info('Connected to database:', db.databaseName)

    return NextResponse.json({
      message: 'MongoDB connection successful',
      database: db.databaseName,
    })
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    return NextResponse.json(
      { message: 'MongoDB connection failed', error: (error as any).message },
      { status: 500 }
    )
  }
}
