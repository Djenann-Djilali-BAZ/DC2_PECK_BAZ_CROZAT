<!-- Navbar.svelte -->

<script>
  import { onMount } from 'svelte';
  import { getPopularMovies, getTopRatedMovies, getTrendingMovies, getMovieGenres } from '../../../backend/services/tmdbservice';
  import Search from './Search.svelte';
  import Genre from './genre.svelte';
  let genres = [];

  onMount(async () => {
    try {
      genres = await getMovieGenres();
    } catch (error) {
      console.error('Erreur lors du chargement des genres :', error);
    }
  });

  async function showPopularMovies() {
    try {
      const popularMovies = await getPopularMovies();
      // Afficher les films populaires
      console.log(popularMovies);
    } catch (error) {
      console.error('Erreur lors du chargement des films populaires :', error);
    }
  }

  async function showTopRatedMovies() {
    try {
      const topRatedMovies = await getTopRatedMovies();
      // Afficher les films les mieux notés
      console.log(topRatedMovies);
    } catch (error) {
      console.error('Erreur lors du chargement des films les mieux notés :', error);
    }
  }

  async function showTrendingMovies() {
    try {
      const trendingMovies = await getTrendingMovies();
      // Afficher les films en tendance
      console.log(trendingMovies);
    } catch (error) {
      console.error('Erreur lors du chargement des films en tendance :', error);
    }
  }
</script>

<nav>
  <div class="nav-container">
    <ul>
      <li>
        <Search />
      </li>
      <li><button on:click={showPopularMovies}>Films populaires</button></li>
      <li><button on:click={showTopRatedMovies}>Films mieux notés</button></li>
      <li><button on:click={showTrendingMovies}>Films en tendance</button></li>
      <li>
        <Genre/>
      </li>
    </ul>
  </div>
</nav>

