import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";

const getMovieDetails = createAsyncThunk('movieDetails/getMovieDetails', async (movieId, thunkApi) => {
  try{
    const {data, request} = await axios.get(`/movie/${movieId}?`)

    if(request.status !== 200 || data.total_results === 0){
      throw new Error(request.status)
    }

    return data
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
})

const getMovieCast = createAsyncThunk('movieDetails/getMovieCast', async (movieId, thunkApi) => {
  try{
    const {data, request} = await axios.get(`/movie/${movieId}/credits?`)

    if(request.status !== 200){
      throw new Error(request.status)
    }

    return data
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
})

const getMovieReviews = createAsyncThunk('movieDetails/getMovieReviews', async (movieId, thunkApi) => {
  try{
    const {data, request} = await axios.get(`/movie/${movieId}/reviews?`)

    if(request.status !== 200){
      throw new Error(request.status)
    }

    return data
  }
  catch(e){
    return thunkApi.rejectWithValue(e.message)
  }
})

export { getMovieReviews, getMovieCast, getMovieDetails}
