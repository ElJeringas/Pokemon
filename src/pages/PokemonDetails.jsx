import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography, LinearProgress, Chip } from '@mui/material';
import { green } from '@mui/material/colors';

function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();

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

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, id: pokemonId, stats, types } = pokemon; // Destructure the required attributes

  return (
    <Paper elevation={2} sx={{ marginTop: '2rem', display: 'flex' }}>
      <Box sx={{ flex: 1 }}>
        <Typography sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} variant='h4'>
          {name}
        </Typography>

        <Box>
          <Typography variant='h6'>Statistics:</Typography>
          {stats.map((stat) => (
            <Box key={stat.stat.name} sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Typography sx={{ minWidth: '100px' }}>{stat.stat.name}</Typography>
              <Box sx={{ width: '100%', marginLeft: '8px' }}>
                <LinearProgress variant='determinate' value={stat.base_stat} />
              </Box>
              <Typography sx={{ marginLeft: '8px' }}>{stat.base_stat}</Typography>
            </Box>
          ))}
        </Box>
        <Box marginTop={'3rem'}>
          <Typography variant='h6'>Type:</Typography>
          {types.map((type) => (
            <Chip
                key={type.slot}
                label={type.type.name}
                variant='outlined'
                style={{
                        color: 'black',
                        backgroundColor: green[200],
                    }}
              />
          
          ))}
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={name}
          width={'500'}
          height={'500'}
        />
      </Box>
    </Paper>
  );
}

export default PokemonDetails;
