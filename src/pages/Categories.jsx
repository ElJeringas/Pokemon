import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Import the Link component

function Categories() {
  const [pokemons, setPokemons] = useState([]); // Change the variable name to "pokemons"
  const { type } = useParams();
  const [nextPage, setNextPage] = useState(1);


  const getType = async (type) => {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
      const response = await data.json();
      const pokemonList = response.pokemon || [];

      // Check if the response contains an array
      if (Array.isArray(pokemonList)) {
        const pokemonDetails = await Promise.all(
          pokemonList.map(async (poke) => {
            const pokemonData = await fetch(poke.pokemon.url);
            const pokemonDetails = await pokemonData.json();
            return {
              id: pokemonDetails.id,
              name: pokemonDetails.name,
              img: pokemonDetails.sprites.other['official-artwork'].front_default || pokemonDetails.sprites.front_default            };
          })
        );
        setPokemons(pokemonDetails);
        console.log('Fetched data:', pokemonDetails);
      } else {
        console.error('Error fetching data: Invalid response format');
        setPokemons([]); // Reset the state to an empty array in case of an error
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setPokemons([]); // Reset the state to an empty array in case of an error
    }
  };

  useEffect(() => {
    getType(type);
  }, [type]);

  if (!pokemons.length) { // Change the variable name to "pokemons.length"
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Pokémon List</h3>
      <Grid container direction="row" justifyContent="center" alignItems="center" padding={3} spacing={3}>
        {pokemons.map((pokemon) => (
          <Grid item xs={6} md={3} sm={4} key={`${pokemon.id}`}>
            <Link to={{ pathname: `/pokemon/${pokemon.id}`, state: { pokemon } }} style={{ textDecoration: 'none', color: '#000' }}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia component="img" width="300" height="300" image={pokemon.img} alt={pokemon.name} />
              </Card>
            </Link>
            <CardContent>
              <Typography variant="p" component="div">
                {pokemon.name}
              </Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Categories;
