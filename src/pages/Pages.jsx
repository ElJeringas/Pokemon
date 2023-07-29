import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Searched from './Searched'

function Pages() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Searched/:search' element={<Searched/>}/>
    </Routes>
  )
}

export default Pages