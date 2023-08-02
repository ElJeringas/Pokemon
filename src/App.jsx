import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Pages from './pages/Pages'
import './index.css'
import PokeBar from './components/PokeBar'
import Chips from './components/Chips'

function App() {
  return (
    <div className='index'>
    <BrowserRouter>
      <PokeBar/>
      <Chips/>
      <Pages />
    </BrowserRouter>
    </div>
  )
}

export default App