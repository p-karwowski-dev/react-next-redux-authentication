import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' })

export const appFetchBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let firstCallResult = await baseQuery(args, api, extraOptions)
  if (firstCallResult?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const releaseMutex = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          '/auth/refresh',
          api,
          extraOptions
        )
        if (refreshResult.meta?.response?.ok) {
          firstCallResult = await baseQuery(args, api, extraOptions)
        } else {
          // place to dispatch action to redirect
        }
      } finally {
        releaseMutex()
      }
    } else {
      await mutex.waitForUnlock()
      firstCallResult = await baseQuery(args, api, extraOptions)
    }
  }
  return firstCallResult
}
