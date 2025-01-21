import { ObjectId } from 'mongodb'

export interface UserDetails {
  userId: ObjectId
  username: string
  age: number
  city: string
}
