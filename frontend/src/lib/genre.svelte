<script>
import { onMount } from 'svelte';
import {getMovieGenres, getMoviesByGenre } from '../../../backend/services/tmdbservice';

let genres = [];

onMount(async () => {
    try {
      genres = await getMovieGenres();
    } catch (error) {
      console.error('Erreur lors du chargement des genres :', error);
    }
  });

</script>

<select>
    <option value="">Sélectionnez un genre</option>
    {#each genres as { id, name }}
      <option value={id}>{name}</option>
    {/each}
  </select>