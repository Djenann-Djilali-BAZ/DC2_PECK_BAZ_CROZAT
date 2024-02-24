const mongoose = require('mongoose');

// Définition du schéma du modèle de film
const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  watchedDate: {
    type: Date,
    default: null
  },
  watched: {
    type: Boolean,
    default: false
  },
  comment: {
    type: String,
    default: ''
  },
  imagePath: {
    type: String,
    default: '' // Chemin vers l'image du film
  },
  videoPath: {
    type: String,
    default: '' // Chemin vers la vidéo du film
  }
});

// Création du modèle de film à partir du schéma
const Film = mongoose.model('Film', filmSchema);

// Export du modèle de film
module.exports = Film;
