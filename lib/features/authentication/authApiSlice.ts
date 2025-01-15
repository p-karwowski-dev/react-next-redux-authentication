import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../../store'

interface UserLogin {
  username: string
  password: string
}

interface UserSignup extends UserLogin {
  rePassword: string
}

interface LoginApiResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

interface MeApiResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers, { getState }) => {
      const { bearerToken } = (getState() as RootState).auth
      if (bearerToken) {
        headers.set('Authorization', `Bearer ${bearerToken}`)
      }
      headers.set('credentials', 'omit')
      return headers
    },
  }),
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    login: build.mutation<LoginApiResponse, UserLogin>({
      query: (userLogin) => ({
        url: 'auth/login',
        method: 'POST',
        body: userLogin,
        headers: {
          'Cache-Control': 'max-age=3600, private',
        },
      }),
      invalidatesTags: ['Auth'],
      transformResponse: (response: LoginApiResponse) => response,
    }),
    getMe: build.query<MeApiResponse, void>({
      query: () => 'auth/me',
      providesTags: ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authApiSlice
