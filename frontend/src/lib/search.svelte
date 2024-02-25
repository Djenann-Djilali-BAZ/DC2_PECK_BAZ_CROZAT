<script>
    import { onMount } from 'svelte';
    import { searchMovies } from '../../../backend/services/tmdbservice';
  
    let searchQuery = '';
    let searchResults = [];
  
    async function performSearch() {
      if (searchQuery.trim() !== '') {
        try {
          searchResults = await searchMovies(searchQuery);
        } catch (error) {
          console.error('Erreur lors de la recherche de films :', error);
        }
      }
    }
  
    // Gestion de l'événement keypress pour détecter la touche "Entrée"
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        performSearch(); // Appeler la fonction de recherche lorsque la touche "Entrée" est pressée
      }
    }
  </script>
  
  <div class="search-container">
    <input type="text" bind:value={searchQuery} placeholder="Rechercher un film..." on:keypress={handleKeyPress} />
    <button on:click={performSearch}>Rechercher</button>
  
    {#if searchResults.length > 0}
      <div class="film-list">
        {#each searchResults as film}
          <div class="film">
            <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={film.title} />
            <p>{film.title}</p>
            <p>Note : {film.vote_average}</p>
          </div>
        {/each}
      </div>
    {:else}
      <p>Aucun résultat trouvé.</p>
    {/if}
  </div>
  