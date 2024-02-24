const API_KEY = 'ca9c071c05f68d1a1a6664e3a808f641'; // Votre clé API TMDB

// Recherche de films
const searchMovies = async (query) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=fr-FR&page=1&query=${query}`, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erreur lors de la recherche de films sur TMDB :', error);
    throw new Error('Erreur lors de la recherche de films sur TMDB');
  }
};

// Récupération des détails d'un film par son identifiant
const getMovieDetails = async (movieId) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
};

// Récupération des films les plus populaires
const getPopularMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ca9c071c05f68d1a1a6664e3a808f641'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
};

// Récupération des films les mieux notés
const getTopRatedMovies = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ca9c071c05f68d1a1a6664e3a808f641'
        }
      };
      
      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
};

// Récupération des films en tendance
const getTrendingMovies = async () => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
};

// Récupération des genres de films
const getMovieGenres = async () => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ca9c071c05f68d1a1a6664e3a808f641'
        }
      };
      
      fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
};

// Récupération des images d'un film par son identifiant
const getMovieImages = async (movieId) => {
    const options = {method: 'GET', headers: {accept: 'application/json'}};

fetch('https://api.themoviedb.org/3/movie/movie_id/images', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
  };
  

// Export des fonctions pour être utilisées dans d'autres parties de l'application
export { searchMovies, getMovieDetails, getPopularMovies, getTopRatedMovies, getTrendingMovies, getMovieGenres, getMovieImages };
