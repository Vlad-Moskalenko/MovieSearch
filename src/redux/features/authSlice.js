import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {email: null, id: null},
  token: null
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
    },

    removeUser(state){
      state.isAuth = false;
      state.token = null;
      state.user = initialState.user
    }
  }
})

export const {setUser, removeUser} = authSlice.actions;
export const authReducer = authSlice.reducer
