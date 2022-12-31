import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3"

class movieDataBaseApi {
  API_KEY = "dc26557b281e26d9f878e92da4703242"

  getTrendingMovies(page=1){
    return axios.get('/trending/movie/day?', {
      params: {
        api_key: this.API_KEY,
        page
      }
    }).then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }

  searchMovie(query, page=1){
    return axios.get('/search/movie?', {
      params: {
        api_key: this.API_KEY,
        query,
        page
      }
    }).then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }

  getMovieDetails(movieId){
    return axios.get(`/movie/${movieId}?`, {
      params: {
        api_key: this.API_KEY
      }
    }).then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }

  getMovieCredits(movieId) {
    return axios.get(`/movie/${movieId}/credits?`, {
      params: {
        api_key: this.API_KEY
      }
    }).then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }

  getMovieReviews(movieId) {
    return axios.get(`/movie/${movieId}/reviews?`, {
      params: {
        api_key: this.API_KEY
      }
    }).then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }

  getGenres(){
    return axios.get('/genre/movie/list?', {
      params: {
        api_key: this.API_KEY
      }
    }).then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }
}

export const movieApi = new movieDataBaseApi()
