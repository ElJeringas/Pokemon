import { IconButton, Stack, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import {  red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const ColorButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[900],
  '&:hover': {
    backgroundColor: red[700],
  },
  
}));

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e)=>{
      e.preventDefault();
      navigate('/Searched/'+ input)
  }

  return (
    <Stack direction="row" spacing={2}>
      <TextField
      onSubmit={submitHandler}
      variant="filled"
      sx={{ '& input': { color: 'white' } }} 
      color="warning"
      label="Search..." 
      focused
      onChange={(e)=> setInput(e.target.value)}
      type='text'
      fullWidth
      value={input}
      />
      <ColorButton
      size="large"
      onClick={submitHandler}
      >
      <TravelExploreIcon />
      </ColorButton>
    </Stack>
  )
}

export default Search