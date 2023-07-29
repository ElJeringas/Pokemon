import React from 'react'
import { BrowserRouter, NavLink } from 'react-router-dom'
import Pages from './pages/Pages'
import './index.css'
import Search from './components/Search'

function App() {
  return (
    <div className='index'>
    <BrowserRouter>
    <NavLink to={'/'}>
            <h1>Pokemon</h1>
    </NavLink>
    <Search/>
      <Pages />
    </BrowserRouter>
    </div>
  )
}

export default App