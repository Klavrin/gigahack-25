import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import Subsidy from './pages/Subsidy'
import Map from './pages/Map'
import Profile from './pages/Profile'
import Livestock from './pages/Livestock'
import { useState } from 'react'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

const App = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home isOpen={isOpen} setIsOpen={setIsOpen} />} />
        <Route
          path="/subsidy"
          element={<Subsidy isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route path="/map" element={<Map />} />
        <Route
          path="/profile"
          element={<Profile isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route
          path="/livestock"
          element={<Livestock isOpen={isOpen} setIsOpen={setIsOpen} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing-page" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
