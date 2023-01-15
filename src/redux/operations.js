import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: "dc26557b281e26d9f878e92da4703242"
}

  const getTrendingMovies = createAsyncThunk('trendingMovies/getTrendingMovies', async (page=1, thunkApi) => {
    try{
      const {data, request} = await axios.get('/trending/movie/day?', {params: {page}})

      if(request.status !== 200 || data.total_results === 0){
        throw new Error(request.status)
      }

      return data
    }
    catch(e){
      return thunkApi.rejectWithValue(e.message)
    }
  })

  const getSearchMovie = createAsyncThunk('searchMovie/getSearchMovie', async ({query, page=1}, thunkApi) => {
    try{
      const {data, request} = await axios.get('/search/movie?', {params: {query,page}})

      if(request.status !== 200 || data.total_results === 0){
        throw new Error(request.status)
      }

      return data
    }

    catch(e){
      return thunkApi.rejectWithValue(e.message)
    }
  })

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

  const getMovieCast = createAsyncThunk('movieCast/getMovieCast', async (movieId, thunkApi)=>{
    try{
      const {data, request} = await axios.get(`/movie/${movieId}/credits?`)

      if(request.status !== 200 || data.total_results === 0){
        throw new Error(request.status)
      }

      return data
    }
    catch(e){
      return thunkApi.rejectWithValue(e.message)
    }
  })

  const getMovieReviews = createAsyncThunk('movieReviews/getMovieReviews', async (movieId, thunkApi) => {
    try{
      const {data, request} = await axios.get(`/movie/${movieId}/reviews?`)

      if(request.status !== 200 || data.total_results === 0){
        throw new Error(request.status)
      }

      return data
    }
    catch(e){
      return thunkApi.rejectWithValue(e.message)
    }
  })

  const getMoviesGenres = createAsyncThunk('moviesGenres/getMoviesGenres', async (_, thunkApi)=>{
    try{
      const {data, request} = await axios.get('/genre/movie/list?')
      if(request.status !== 200 || data.total_results === 0){
        throw new Error(request.status)
      }

      return data
    }
    catch(e){
      return thunkApi.rejectWithValue(e.message)
    }
  })

export {getMoviesGenres, getTrendingMovies, getSearchMovie, getMovieReviews, getMovieCast, getMovieDetails}
