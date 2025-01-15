'use client'
import { useGetMeQuery } from '@/lib/features/authentication/authApiSlice'
import { Quotes } from '../components/quotes/Quotes'
import { ExpireButton } from '../components/buttons/ExpireButton'

export default function RestrictedPage() {
  const { isSuccess } = useGetMeQuery()

  if (!isSuccess)
    return (
      <>
        <h1>Restricted content</h1>
        <p>You have to be logged in.</p>
      </>
    )

  return (
    <>
      <h1>Restricted content</h1>
      <ExpireButton />
      <Quotes />
    </>
  )
}
