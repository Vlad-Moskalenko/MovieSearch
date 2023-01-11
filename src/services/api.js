import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: "dc26557b281e26d9f878e92da4703242"
}

class movieDataBaseApi {

  getTrendingMovies(page=1){
    return axios.get('/trending/movie/day?', {
      params: {
        page
      }
    })
    .then(({data, request}) => {
      if(request.status !== 200 || data.total_results === 0){
        throw new Error(request.status)
      }
      return data
    })
  }

  searchMovie(query, page=1){
    return axios.get('/search/movie?', {
      params: {
        query,
        page
      }
    }).then(({data, request}) => {
      if(request.status !== 200 || data.total_results === 0){
        throw new Error(request.status)
      }
      return data
    })
  }

  getMovieDetails(movieId){
    return axios.get(`/movie/${movieId}?`)
    .then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }

  getMovieCredits(movieId) {
    return axios.get(`/movie/${movieId}/credits?`)
    .then(({data, request}) => {
      if(request.status !== 200 || data.cast.length === 0){
        throw new Error(request.status)
      }
      return data
    })
  }

  getMovieReviews(movieId) {
    return axios.get(`/movie/${movieId}/reviews?`)
    .then(({data, request}) => {
      if(request.status !== 200 || data.results.length === 0){
        throw new Error(request.status)
      }
      return data
    })
  }

  getGenres(){
    return axios.get('/genre/movie/list?')
    .then(({data, request}) => {
      if(request.status !== 200){
        throw new Error(request.status)
      }
      return data
    })
  }
}

export const movieApi = new movieDataBaseApi()
