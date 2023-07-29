import { Button, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e)=>{
      e.preventDefault();
      navigate('/Searched/'+ input)
  }

  return (
    <div>
      <TextField
      onSubmit={submitHandler}
      variant='outlined'
      label={"Search"}
      onChange={(e)=> setInput(e.target.value)}
      type='text'
      value={input}
      />
      <Button variant='contained' onClick={submitHandler}>Search</Button>
    </div>
  )
}

export default Search