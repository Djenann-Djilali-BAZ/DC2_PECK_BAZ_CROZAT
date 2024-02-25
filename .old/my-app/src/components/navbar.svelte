<script>
  // Importer les fonctions du contrôleur de film et du service TMDB
  import { searchFilms, getRandomFilm } from '../filmcontroller.js';
  import { getAllGenres } from '../tmdbservice.js';

  // Déclarer une variable pour stocker les genres
  let genres = [];

  // Fonction pour effectuer une recherche de films par genre
  async function searchByGenre(genre) {
    await searchFilms({ genre: genre });
  }

  // Fonction pour effectuer une recherche de films aléatoire
  async function searchRandom() {
    await getRandomFilm();
  }

  // Fonction pour charger tous les genres
  async function loadGenres() {
    genres = await getAllGenres();
  }

  // Appeler la fonction pour charger les genres au chargement de la page
  loadGenres();
</script>

<nav>
  <!-- Boutons pour les fonctionnalités clés -->
  <button on:click={() => searchFilms({})}>Rechercher par nom</button>
  <button on:click={() => searchByGenre('')}>Rechercher par genre</button>
  <button on:click={() => searchFilms({ note: true })}>Rechercher par note</button>
  <button on:click={searchRandom}>Tirage aléatoire</button>

  <!-- Dropdown pour les genres -->
  <div class="dropdown">
    <button class="dropbtn">Genres</button>
    <div class="dropdown-content">
      <!-- Utiliser une boucle pour afficher chaque genre -->
      {#each genres as genre}
        <button on:click={() => searchByGenre(genre)}>{genre}</button>
      {/each}
    </div>
  </div>
</nav>