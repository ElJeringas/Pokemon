import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
function PokemonDetails() {

  const [Pokemon, setPokemon] = useState(null);
  const { id } = useParams();
  console.log(id)

const getSearched = async (id) => {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const poke = await data.json();
      setPokemon(poke);
      console.log('Fetched data:', poke);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
useEffect(() => {
    getSearched(id);
    console.log('Searched:', id);
  }, [id]);

  if (!Pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Pokémon Details</h3>
      <div>
        <p>ID: {id}</p>
        <p>Name: {Pokemon.name}</p>
        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${Pokemon.id}.png`} alt={Pokemon.name} />
      </div>
    </div>
  );
}

export default PokemonDetails;




