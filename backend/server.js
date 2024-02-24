// Import des modules nécessaires
const express = require('express');
const connectDB = require('./config/db'); // Import du fichier de configuration de la base de données

// Définir le port d'écoute
const PORT = process.env.PORT || 3000;

// Créer une instance Express
const app = express();

// Connexion à la base de données MongoDB
connectDB(); // Appel de la fonction de connexion à la base de données

// Utiliser les middlewares pour parser les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Utiliser le routeur
// Ici, vous utiliserez le routeur pour définir les routes de votre application

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
