const mongoose = require ('mongoose');

const connectDB = mongoose.connect("mongodb+srv://dbaz:XXR7I4pSdAYyCBj9@tmdb-dm.4evi7yj.mongodb.net/")
    .then(() => console.log ('Connexion MongoDB réussie'))
    .catch ((err) => console.log ('Connexion à MongoDB échouée !', err));

module.exports = connectDB