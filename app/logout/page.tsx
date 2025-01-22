'use client'
import { useLogoutMutation } from '@/lib/features/auth/authApiSlice'
import { useEffect } from 'react'

export default function RestrictedPage() {
  const [logout, { isSuccess }] = useLogoutMutation()

  useEffect(() => {
    logout()
  }, [])

  return (
    <>
      <h1>Logout</h1>
      {isSuccess ? (
        <p>You are logged out, both short and long session have been closed.</p>
      ) : (
        <p>Something went wrong, you are still logged in.</p>
      )}
    </>
  )
}
