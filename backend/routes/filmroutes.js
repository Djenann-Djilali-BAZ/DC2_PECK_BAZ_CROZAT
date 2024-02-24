const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmcontroller');

// Recherche de films par nom, genre, note ou tirage aléatoire
router.get('/films/search', filmController.searchFilms);

// Enregistrement d'un film visionné par l'utilisateur avec note et commentaire
router.post('/films/watched', filmController.addWatchedFilm);

// Consultation du catalogue des films visionnés par l'utilisateur
router.get('/users/:userId/watchedfilms', filmController.getWatchedFilms);

// Tri des films par catégorie
router.get('/films/category/:category', filmController.getFilmsByCategory);

// Consultation du profil des autres membres pour voir les films visionnés et les films préférés
router.get('/users/profile/:userId', filmController.getUserProfile);

// Affichage du top 3 des genres et des films préférés de l'utilisateur
router.get('/users/profile/:userId/top', filmController.getUserTopGenresAndFilms);

// Notation et commentaire d'un film visionné par l'utilisateur
router.post('/films/:filmId/rating', filmController.rateWatchedFilm);

// Consultation des détails d'un film
router.get('/films/:filmId', filmController.getFilmDetails);

// Récupérer tous les films
router.get('/films', filmController.getAllFilms);

// Récupérer un film par son identifiant
router.get('/films/:id', filmController.getFilmById);

// Créer un nouveau film
router.post('/films', filmController.createFilm);

// Mettre à jour un film existant
router.put('/films/:id', filmController.updateFilm);

// Supprimer un film
router.delete('/films/:id', filmController.deleteFilm);

module.exports = router;
