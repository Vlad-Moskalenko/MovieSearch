import axios from "axios"

export const getPoster = (poster_path) => {
  return axios.get(`https://image.tmdb.org/t/p/w500/${poster_path}`).then((data) => console.log(data))
}
