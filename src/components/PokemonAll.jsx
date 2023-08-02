import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PokemonAll() {
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState(1);

  useEffect(() => {
    const fetchPokemons = async () => {
      const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(nextPage - 1) * 10}`);
      const data = await api.json();
      const { results } = data;

      // Fetch details for each Pokémon using their individual URLs
      const pokemonDetails = await Promise.all(results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return await response.json();
      }));

      const newPokemons = pokemonDetails.map(poke => ({
        id: poke.id,
        name: poke.name,
        img: poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default      }));

      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    };

    fetchPokemons();
  }, [nextPage]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = 100;

    if (windowHeight + scrollTop + offset >= documentHeight) {
      setNextPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <h3>Pokémon List</h3>
      <Grid container direction="row" justifyContent="center" alignItems="center" padding={3} spacing={3}>
        {pokemons.map((pokemon, index) => (
          <Grid item xs={6} md={3} sm={4} key={`${pokemon.id}-${index}`}>
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

export default PokemonAll;
