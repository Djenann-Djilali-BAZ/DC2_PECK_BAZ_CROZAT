const Film = require('../models/filmModel');
const User = require('../models/userModel');
const {
  searchMovies,
  getMovieDetails,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getMovieGenres,
  getMovieImages,
  getMoviesByGenre,
} = require('../services/tmdbservice');

exports.searchFilms = async (req, res) => {
  try {
    const { query, genre, note } = req.query;
    const searchQuery = {};

    if (query) {
      searchQuery.title = { $regex: new RegExp(query, 'i') };
    }

    if (genre) {
      searchQuery.genre = genre;
    }

    if (note) {
      searchQuery.rating = { $gte: parseInt(note) };
    }

    const films = await Film.find(searchQuery);
    res.status(200).json({ success: true, data: films });
  } catch (error) {
    console.error('Erreur lors de la recherche de films :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la recherche de films' });
  }
};

exports.getGenres = async (req, res) => {
  try {
    const genres = await getMovieGenres();
    res.status(200).json({ success: true, data: genres });
  } catch (error) {
    console.error('Erreur lors de la récupération des genres de films :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des genres de films' });
  }
};

exports.addWatchedFilm = async (req, res) => {
  try {
    const { userId, filmId, rating, comment, watchedDate } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    const filmIndex = user.watchedFilms.findIndex(film => film.filmId === filmId);

    if (filmIndex !== -1) {
      return res.status(400).json({ success: false, message: 'Le film est déjà présent dans la liste de l\'utilisateur' });
    }

    user.watchedFilms.push({ filmId, rating, comment, watchedDate });
    await user.save();

    res.status(200).json({ success: true, message: 'Film ajouté à la liste de l\'utilisateur avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du film à la liste de l\'utilisateur :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de l\'ajout du film à la liste de l\'utilisateur' });
  }
};

exports.getFilmDetails = async (req, res) => {
  try {
    const { filmId } = req.params;
    const film = await Film.findById(filmId);

    if (!film) {
      return res.status(404).json({ success: false, message: 'Film non trouvé' });
    }

    res.status(200).json({ success: true, data: film });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails d\'un film :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des détails d\'un film' });
  }
};

exports.getWatchedFilms = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    const watchedFilms = user.watchedFilms;
    res.status(200).json({ success: true, data: watchedFilms });
  } catch (error) {
    console.error('Erreur lors de la récupération des films visionnés par l\'utilisateur :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des films visionnés par l\'utilisateur' });
  }
};

exports.getFilmsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const films = await Film.find({ genre: category });
    res.status(200).json({ success: true, data: films });
  } catch (error) {
    console.error('Erreur lors de la récupération des films triés par catégorie :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des films triés par catégorie' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Erreur lors de la récupération du profil de l\'utilisateur :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération du profil de l\'utilisateur' });
  }
};

exports.getUserTopGenresAndFilms = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    const topGenres = user.topGenres.slice(0, 3); // Prendre les 3 premiers
    const topFilms = user.topFilms.slice(0, 3); // Prendre les 3 premiers

    res.status(200).json({ success: true, data: { topGenres, topFilms } });
  } catch (error) {
    console.error('Erreur lors de la récupération du top genres et films de l\'utilisateur :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération du top genres et films de l\'utilisateur' });
  }
};

exports.rateWatchedFilm = async (req, res) => {
  try {
    const { userId, filmId, rating, comment } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    // Trouver le film dans la liste des films visionnés par l'utilisateur
    const watchedFilmIndex = user.watchedFilms.findIndex(film => film.filmId.toString() === filmId);

    if (watchedFilmIndex === -1) {
      // Si le film n'est pas trouvé dans la liste
      return res.status(404).json({ success: false, message: 'Film non trouvé dans la liste des films visionnés par l\'utilisateur' });
    }

    // Mise à jour de la note et du commentaire
    user.watchedFilms[watchedFilmIndex].rating = rating;
    user.watchedFilms[watchedFilmIndex].comment = comment;

    await user.save();

    res.status(200).json({ success: true, message: 'Film noté et commenté avec succès' });
  } catch (error) {
    console.error('Erreur lors de la notation et du commentaire d\'un film visionné :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la notation et du commentaire d\'un film visionné' });
  }
};

exports.getFilmsByGenre = async (req, res) => {
  try {
    const { genreId } = req.params;
    const films = await getMoviesByGenre(genreId);
    res.status(200).json({ success: true, data: films });
  } catch (error) {
    console.error('Erreur lors de la récupération des films par genre :', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des films par genre' });
  }
};
