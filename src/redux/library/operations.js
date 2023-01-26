import {db} from 'firebaseConfig.js'
import { setDoc, deleteDoc, doc, onSnapshot, collection, orderBy, query, serverTimestamp} from "firebase/firestore";

import { createAsyncThunk } from '@reduxjs/toolkit';

const addMovie = createAsyncThunk('library/addMovie', async ({userId, movieData}, thunkApi) => {
  try {
    await setDoc(doc(db, `${userId}`, `${movieData.id}`), {...movieData, createdAt: serverTimestamp()});
  } catch (e) {
    return thunkApi.rejectWithValue(e.message)
  }
})

const deleteMovie = createAsyncThunk('library/deleteMovie', async ({userId, movieId}, thunkApi) => {
  try{
    await deleteDoc(doc(db, `${userId}`, `${movieId}`));
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
})

const getSavedMovies = createAsyncThunk('library/getSavedMovies', async ({userId, setSavedMovies}, thunkApi) => {
  try{
    const q = query(collection(db, `${userId}`), orderBy('createdAt', 'desc') )
    onSnapshot(q, snapshot => {
      let data = []

      snapshot.docs.forEach(doc => {
        data = [...data, doc.data()];
      });

      setSavedMovies(data)
    });

    console.log(db.snapshot(collection(db, `${userId}`)))
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
})

export {addMovie, deleteMovie, getSavedMovies}
