import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Avatar, Stack, Toolbar, Typography, Box } from '@mui/material';
import Search from './Search';
import ball from "../assets/ball.png";
import pokemonLogo from '../assets/pokemonlogo.png';

export default function PokeBar() {
  return (
    <AppBar position='static' sx={{ background: '#333' }}>
      <Toolbar sx={{ justifyContent: 'space-between'}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img to={'/'} alt='Pokelogo' src={pokemonLogo} width={200} height={120} />
          <NavLink to={'/'} style={{ textDecoration: 'none', color: '#fff' }}>
            <Avatar alt='Pokelogo' src={ball} sx={{ marginLeft: '1rem' }} />
          </NavLink>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Search />
          {/* Add your icon component here */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
