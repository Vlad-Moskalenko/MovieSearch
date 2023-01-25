import { createSlice } from "@reduxjs/toolkit";

import { logIn, register, googleAuth } from "./operations";
import { handleError, handlePending } from "services/handleFetch";

const handleFulfilled = (state, {payload}) => {
  state.isAuth = true;
  state.user.email = payload.email
  state.user.id = payload.id
  state.token = payload.token
  state.isModal = false
  state.status = 'success'
}

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    isAuth: false,
    user: {email: null, id: null},
    token: null,
    isModal: false,
    status: null
  },

  reducers: {
    removeUser(state){
      state.isAuth = false;
      state.token = null;
      state.user = {email: null, id: null};
      state.isModal = false;
      state.status = null;
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
