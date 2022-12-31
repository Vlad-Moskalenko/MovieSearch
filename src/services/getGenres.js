export const getGenres = (genresArray, genreIdArray) => {
  let res = []
  if(genreIdArray && genresArray){
    for (let i = 0; i < genreIdArray.length; i++) {
      genresArray.forEach(({id, name}) => {
        if(id === genreIdArray[i]) res.push(name)
      })
    }
  }
  return res.join(', ')
}
