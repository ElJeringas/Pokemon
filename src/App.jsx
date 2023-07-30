import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Pages from './pages/Pages'
import './index.css'
import PokeBar from './components/PokeBar'

function App() {
  return (
    <div className='index'>
    <BrowserRouter>
    <PokeBar/>
      <Pages />
    </BrowserRouter>
    </div>
  )
}

export default App