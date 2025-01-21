import { useExpireBearerMutation } from '@/lib/features/auth/authApiSlice'

export const ExpireButton = () => {
  const [expireToken, { isSuccess }] = useExpireBearerMutation()

  if (isSuccess) {
    return <p>Short session has expired.</p>
  }

  return (
    <button
      onClick={() => {
        expireToken()
      }}
    >
      Simulate expired bearer token
    </button>
  )
}
