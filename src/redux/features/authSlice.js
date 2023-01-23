import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {email: null, id: null},
  token: null,
  isModal: false
}

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setUser(state, {payload}){
      state.isAuth = true;
      state.user.email = payload.email
      state.user.id = payload.id
      state.token = payload.token
      state.isModal = false
    },

    removeUser(state){
      state.isAuth = false;
      state.token = null;
      state.user = initialState.user
    },

    toggleModal(state, {payload}){
      state.isModal = payload
    }
  }
})

export const {setUser, removeUser, toggleModal} = authSlice.actions;
export const authReducer = authSlice.reducer
