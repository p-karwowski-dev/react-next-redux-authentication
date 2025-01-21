import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ObjectId } from 'mongodb'

interface UserLogin {
  username: string
  password: string
}

interface MeApiResponse {
  success: boolean
  data: {
    user: {
      userId: ObjectId
      username: string
      city: string
      age: number
    }
  }
}

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  }),
  reducerPath: 'authApi',
  tagTypes: ['UserInfo'],
  endpoints: (build) => ({
    login: build.mutation<void, UserLogin>({
      query: (userLogin) => ({
        url: 'auth/login',
        method: 'POST',
        body: userLogin,
      }),
      invalidatesTags: ['UserInfo'],
    }),
    getMe: build.query<MeApiResponse, void>({
      query: () => 'auth/me',
      providesTags: ['UserInfo'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'DELETE',
      }),
      invalidatesTags: ['UserInfo'],
    }),
    expireBearer: build.mutation<void, void>({
      query: () => ({
        url: 'auth/expireBearer',
        method: 'DELETE',
      }),
      invalidatesTags: ['UserInfo'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
  useExpireBearerMutation,
} = authApiSlice
