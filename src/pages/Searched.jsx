import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';

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

  // Prepare data for the pie chart
  const pieData = searchedPokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

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
          {/* Display the attributes as a pie chart */}
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
              //label={(entry) => entry.name}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Searched;
