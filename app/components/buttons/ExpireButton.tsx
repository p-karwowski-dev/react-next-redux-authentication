import { expireToken } from '@/lib/features/authentication/authSlice'
import { useAppDispatch } from '@/lib/hooks'
import { authApiSlice } from '@/lib/features/authentication/authApiSlice'

export const ExpireButton = () => {
  const dispatch = useAppDispatch()
  return (
    <button
      onClick={() => {
        dispatch(expireToken())
        dispatch(
          authApiSlice.util.invalidateTags([
            {
              type: 'Auth',
            },
          ])
        )
      }}
    >
      Simulate expired bearer token
    </button>
  )
}
