import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
