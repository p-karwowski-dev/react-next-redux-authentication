import { useExpireBearerMutation } from '@/lib/features/auth/authApiSlice'

export const ExpireButton = () => {
  const [expireToken, { isSuccess }] = useExpireBearerMutation()

  if (isSuccess) {
    return (
      <p>
        Short session was closed and reopened. Check the network tab in
        developer tool.
      </p>
    )
  }

  return (
    <button
      onClick={() => {
        expireToken()
      }}
    >
      Expire short session
    </button>
  )
}
