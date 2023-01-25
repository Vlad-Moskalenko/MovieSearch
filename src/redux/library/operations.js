import {db} from 'firebase.js'
import { setDoc, deleteDoc, doc, onSnapshot, collection} from "firebase/firestore";

import { createAsyncThunk } from '@reduxjs/toolkit';

const addMovie = createAsyncThunk('library/addMovie', async ({userId, movieData}, thunkApi) => {
  try {
    await setDoc(doc(db, `${userId}`, `${movieData.id}`), movieData);
  } catch (e) {
    thunkApi.rejectWithValue(e.message)
  }
})

const deleteMovie = createAsyncThunk('library/deleteMovie', async ({userId, movieId}, thunkApi) => {
  try{
    await deleteDoc(doc(db, `${userId}`, `${movieId}`));
  }
  catch(e){
    thunkApi.rejectWithValue(e.message)
  }
})

const getSavedMovies = createAsyncThunk('library/getSavedMovies', async ({userId, setSavedMovies}, thunkApi) => {
  try{
    onSnapshot(collection(db, `${userId}`), snapshot => {
      let data = []

      snapshot.docs.forEach(doc => {
        data = [...data, doc.data()];
      });

      setSavedMovies(data)
    });

    console.log(db.snapshot(collection(db, `${userId}`)))
  }
  catch(e){
    thunkApi.rejectWithValue(e.message)
  }
})

export {addMovie, deleteMovie, getSavedMovies}
