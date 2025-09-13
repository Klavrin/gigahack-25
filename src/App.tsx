import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import Lenis from 'lenis'
import Subsidy from './pages/Subsidy'
import Map from './pages/Map'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/subsidy" element={<Subsidy />} />
        <Route path="/map" element={<Map />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing-page" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
