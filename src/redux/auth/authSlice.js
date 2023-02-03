import { createSlice } from "@reduxjs/toolkit";

import { logIn, register, googleAuth } from "./operations";
import { handlePending } from "services/handleFetch";

const handleFulfilled = (state, {payload}) => {
  state.isAuth = true;
  state.user.email = payload.email
  state.user.id = payload.id
  state.token = payload.token
  state.isModal = false
  state.status = 'success'
  state.errorMessage = null
}

const handleError = (state, {payload}) => {
  state.errorMessage = payload
  state.status = 'error'
}

const initialState = {
  isAuth: false,
  user: {email: null, id: null},
  token: null,
  isModal: false,
  status: null,
  errorMessage: null
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    removeUser(state){
      state.isAuth = false;
      state.user.email = null
      state.user.id = null
      state.token = null
      state.isModal = false
      state.status = null
      state.errorMessage = null
    },

    toggleModal(state, {payload}){
      state.isModal = payload
    }
  },

  extraReducers: builder => builder
  .addCase(logIn.pending, handlePending)
  .addCase(register.pending, handlePending)
  .addCase(googleAuth.pending, handlePending)

  .addCase(logIn.rejected, handleError)
  .addCase(register.rejected, handleError)
  .addCase(googleAuth.rejected, handleError)

  .addCase(logIn.fulfilled, handleFulfilled)
  .addCase(register.fulfilled, handleFulfilled)
  .addCase(googleAuth.fulfilled, handleFulfilled)
})

export const { removeUser, toggleModal} = authSlice.actions;
export const authReducer = authSlice.reducer
