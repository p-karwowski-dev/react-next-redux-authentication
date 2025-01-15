import { createSlice } from '@reduxjs/toolkit'
import { authApiSlice } from './authApiSlice'

interface InitialState {
  bearerToken: null | string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: <InitialState>{
    bearerToken: null,
  },
  reducers: {
    expireToken: (state) => {
      state.bearerToken = null
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.bearerToken = payload.accessToken
      }
    )
  },
})

export const { expireToken } = authSlice.actions
