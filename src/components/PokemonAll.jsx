import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import {React, useEffect,useState } from 'react'
import './Pokestyle.css'
function PokemonAll() {

    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        const getPokemon = async() => {

                const api = await fetch ('https://pokeapi.co/api/v2/pokemon')
                const data = await api.json();
                const {results} = data;
                setPokemons(results)
                
                const newPokemons = results.map(async (pokemon) =>{
                    const response = await fetch(pokemon.url)
                    const poke = await response.json()
                    
                    return{
                        id: poke.id,
                        name:poke.name,
                        img:poke.sprites.other.dream_world.front_default
                    }
                })
                //console.log(await Promise.all(newPokemons))
        }
            getPokemon();
    }, []);


    return (
        <div className='div'>
          <h3>Pokémon List</h3>
          <Grid container direction="row" justifyContent="center" alignItems="center" padding={3} spacing={3}>
            {pokemons.map((pokemon, index) => (
              <Grid item xs={6} md={3} sm={4} key={index}>
              <Card  sx={{ maxWidth: 130 }} key={index}>
                <CardMedia component="img" width="100" height="100" image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} alt={pokemon.name}/>
              <CardContent>
                <Typography variant='p' component="div">
                    {pokemon.name}
                </Typography>
              </CardContent>
              </Card>
              </Grid>
            ))}
            </Grid>
        </div>
      );
}

export default PokemonAll