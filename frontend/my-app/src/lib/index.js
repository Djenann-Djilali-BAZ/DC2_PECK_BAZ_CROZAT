// Reexport your entry components here

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTljMDcxYzA1ZjY4ZDFhMWE2NjY0ZTNhODA4ZjY0MSIsInN1YiI6IjY1YzBmYzcwZmM2NTM4MDE2M2ViYTMzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H2rolHAsyeuj1tT3vQNvN9BnyYLNM1KckDNj3ntIa8U'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));