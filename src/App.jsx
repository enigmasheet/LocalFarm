import React from 'react'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Contact from './pages/Contact'
import GHdetail from './pages/GHdetail'

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/setting' element={<Settings />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/:id' element={<GHdetail />} />
        
       
     </Routes>
    </div>
  )
}

export default App