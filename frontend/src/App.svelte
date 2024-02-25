<script>
  import { onMount } from "svelte";
  import Navbar from './lib/navbar.svelte';
  import Search from './lib/search.svelte';
  import Top3 from './lib/top3.svelte';
  import Fichefilm from './lib/fichefilm.svelte';
  import Footer from './lib/footer.svelte';
  import Note from './lib/note.svelte';
  import Profil from './lib/profil.svelte';
  import Vufilm from './lib/vufilm.svelte';
  import Cartefilm from './lib/cartefilm.svelte';

  let name = "Dje";
  let user;
  onMount (async() => {
    try{
        const reponseServeur = await fetch('http://localhost:3000/api/test');
        if (reponseServeur.ok){
          user = await reponseServeur.json();
          console.log(user)
          
        }else{
          console.log ("Erreur")
        }
      }catch(error){
      console.log('Error:' +error.message)
    }
  });
</script>

<Navbar/>