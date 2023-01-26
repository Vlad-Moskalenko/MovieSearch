import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from 'firebaseConfig.js';

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const logIn = createAsyncThunk('auth/logIn', async ({email, password}, thunkApi) => {
  try{
    const {user} = await signInWithEmailAndPassword(auth, email, password)
    return {id: user.uid, email: user.email, token: user.accessToken}
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
})

const register = createAsyncThunk('auth/register', async ({email, password}, thunkApi) => {
  try{
    const {user} = await createUserWithEmailAndPassword(auth, email, password)
    return {id: user.uid, email: user.email, token: user.accessToken}
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
});

const googleAuth = createAsyncThunk('auth/googleAuth', async (_, thunkApi) => {
  try{
    const {user} = await signInWithPopup(auth, new GoogleAuthProvider())
    return {id: user.uid, email: user.email, token: user.accessToken}
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
})

export {logIn, register, googleAuth}
