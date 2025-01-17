import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface UserLogin {
  username: string
  password: string
}

interface MeApiResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  bearerToken: string
  refreshToken: string
}

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
  }),
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    login: build.mutation<void, UserLogin>({
      query: (userLogin) => ({
        url: 'auth/login',
        method: 'POST',
        body: userLogin,
      }),
      invalidatesTags: ['Auth'],
    }),
    refreshLogin: build.mutation<void, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    getMe: build.query<MeApiResponse, void>({
      query: () => 'auth/me',
      providesTags: ['Auth'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'DELETE',
      }),
      invalidatesTags: ['Auth'],
    }),
    expireBearer: build.mutation<void, void>({
      query: () => ({
        url: 'auth/expireBearer',
        method: 'DELETE',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetMeQuery,
  useRefreshLoginMutation,
  useLogoutMutation,
  useExpireBearerMutation,
} = authApiSlice
