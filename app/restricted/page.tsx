'use client'
import { useGetMeQuery } from '@/lib/features/auth/authApiSlice'
import { ExpireButton } from '../components/buttons/ExpireButton'

export default function RestrictedPage() {
  const { data, isSuccess } = useGetMeQuery()
  const { username, userId, age, city } = data?.data?.user || {}

  return (
    <>
      <h1>Restricted content</h1>
      {isSuccess ? (
        <>
          <ExpireButton />
          <div>
            <h4>User information:</h4>
            <p>UserId: {userId?.toString()}</p>
            <p>Username: {username}</p>
            <p>Age: {age}</p>
            <p>City: {city}</p>
          </div>
        </>
      ) : (
        <p>Log in to the app to get the access.</p>
      )}
    </>
  )
}
