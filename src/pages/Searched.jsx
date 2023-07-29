import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, LinearProgress } from '@mui/material';

function Searched() {
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  let params = useParams();

  const getSearched = async (name) => {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLocaleLowerCase()}`);
      const poke = await data.json();
      setSearchedPokemon(poke);
      console.log('Fetched data:', poke);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getSearched(params.search);
    console.log('Searched:', params.search);
  }, [params.search]);

  if (!searchedPokemon) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container direction="column" alignItems="center" padding={3}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {searchedPokemon.name}
          </Typography>
          <CardMedia
            component="img"
            width="200"
            height="200"
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${searchedPokemon.id}.png`}
            alt={searchedPokemon.name}
          />
          {/* Display the attributes as progress bars */}
          {searchedPokemon.stats.map((stat) => (
            <div key={stat.stat.name}>
              <Typography variant="subtitle1" gutterBottom>
                {stat.stat.name}
              </Typography>
              <LinearProgress variant="determinate" value={stat.base_stat} />
            </div>
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Searched;
