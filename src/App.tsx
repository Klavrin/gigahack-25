import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { createClient } from '@supabase/supabase-js'
import Register from './pages/Register'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
