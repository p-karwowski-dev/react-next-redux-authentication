import { MongoClient, MongoClientOptions } from 'mongodb'

const url = process.env.MONGODB_URL
const options: MongoClientOptions = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!url) {
  throw new Error('Please add your MongoDB URI to .env')
}

if (process.env.NODE_ENV === 'production') {
  // In production, create a new client
  client = new MongoClient(url, options)
  clientPromise = client.connect()
} else {
  // In development, use a global variable so the connection is not lost on hot reloads
  const globalScope = global as any
  if (!globalScope._mongoClientPromise) {
    client = new MongoClient(url, options)
    globalScope._mongoClientPromise = client.connect()
  }
  clientPromise = globalScope._mongoClientPromise
}

export default clientPromise
