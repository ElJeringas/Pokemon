import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Searched from './Searched'
import PokemonDetails from './PokemonDetails'
import Categories from './Categories'

function Pages() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Searched/:search' element={<Searched/>}/>
        <Route path='/Pokemon/:id' element={<PokemonDetails/>}/>
        <Route path='/Pokemon/:type' element={<Categories/>}/>

    </Routes>
  )
}

export default Pages