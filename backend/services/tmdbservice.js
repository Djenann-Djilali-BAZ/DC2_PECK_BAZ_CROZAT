const API_KEY = 'ca9c071c05f68d1a1a6664e3a808f641'; 

// Recherche de films
const searchMovies = async (query) => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=fr-FR&page=1&query=${encodeURIComponent(query)}&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erreur lors de la recherche de films sur TMDB :', error);
    throw error; // Il est souvent utile de propager l'erreur pour une gestion plus haut dans la chaîne.
  }
};

// Récupération des détails d'un film par son identifiant
const getMovieDetails = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data; // Retourne directement l'objet de données.
  } catch (err) {
    console.error('Erreur lors de la récupération des détails du film :', err);
    throw err;
  }
};

// Récupération des films les plus populaires
const getPopularMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error('Erreur lors de la récupération des films populaires :', err);
    throw err;
  }
};

// Récupération des films les mieux notés
const getTopRatedMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error('Erreur lors de la récupération des films les mieux notés :', err);
    throw err;
  }
};

// Récupération des films en tendance
const getTrendingMovies = async () => {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error('Erreur lors de la récupération des films en tendance :', err);
    throw err;
  }
};

// Récupération des genres de films
const getMovieGenres = async () => {
  try {
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.genres; // Assurez-vous que cette structure correspond à ce que l'API renvoie
  } catch (err) {
    console.error('Erreur lors de la récupération des genres de films :', err);
    throw err;
  }
};

// Récupération des images d'un film par son identifiant
const getMovieImages = async (movieId) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Erreur lors de la récupération des images du film :', err);
    throw err;
  }
};

// Fonction pour récupérer les films par genre triés par popularité depuis l'API TMDb
const getMoviesByGenre = async (genreId) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
      }
    };

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Erreur lors de la récupération des films par genre :', error);
    throw error;
  }
};

// Export des fonctions pour être utilisées dans d'autres parties de l'application
export { searchMovies, getMovieDetails, getPopularMovies, getTopRatedMovies, getTrendingMovies, getMovieGenres, getMovieImages, getMoviesByGenre };
