import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';

function Categories() {
    const [Pokemons, setPokemons] = useState([]);
    const { type } = useParams();
    console.log(type)

    
const getType = async (type) => {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const poke = await data.json();
      setPokemons(poke);
      console.log('Fetched data:', poke);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
useEffect(() => {
    getType(type);
    console.log('Searched:', type);
  }, [type]);

  if (!Pokemons) {
    return <div>Loading...</div>;
  }
  return (
    <div>Categories</div>
  )
}

export default Categories