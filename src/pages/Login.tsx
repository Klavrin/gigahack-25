import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Dither from '@/components/Dither'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    const req = {
      phone,
      password
    }

    const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/login', req)
    console.log('Login response:', res)
    if (res.status === 201) {
      localStorage.setItem('accessToken', res.data['access_token'])
      navigate('/home')
    }
  }

  return (
    <div>
      <div className="flex min-h-screen font-sans">
        <div className="xl:w-[40%] w-full flex flex-col p-6 justify-center items-center">
          <div className="flex flex-col gap-1 items-center mb-4">
            <h1 className="text-3xl font-semibold">Login</h1>
            <p className="leading-7 opacity-55 max-w-xl">
              Enter your existing credentials to login into the application
            </p>
          </div>

          <div className="w-[80%] flex flex-col gap-2">
            <Input
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <div className="w-full mt-2">
              <Button className="w-full flex flex-col gap-1" onClick={handleLogin}>
                Login
              </Button>
              <div className="w-full flex justify-between">
                <Link to="#">
                  <small className="text-sm leading-none font-medium opacity-50">
                    Forgot password
                  </small>
                </Link>
                <Link to="#">
                  <small className="text-sm leading-none font-medium opacity-50">
                    Don't have an account
                  </small>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[60%] xl:block hidden overflow-hidden invert">
          <Dither mouseRadius={0.2} colorNum={5} />
        </div>
      </div>
    </div>
  )
}

export default Login
