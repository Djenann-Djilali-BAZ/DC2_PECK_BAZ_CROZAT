<!-- src/components/Navbar.svelte -->
<script>
    // Nous ajouterons le script pour la recherche plus tard
  </script>
  
  <nav>
    <div class="brand">VotreApp</div>
    <button class="search-button">Rechercher</button>
  </nav>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background-color: #333;
      color: white;
    }
  
    .brand {
      font-weight: bold;
      font-size: 1.5rem;
    }
  
    .search-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
  </style>