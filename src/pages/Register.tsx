import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Dither from '@/components/Dither'
import { Link } from 'react-router-dom'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [idnp, setIdnp] = useState('')
  const [idno, setIdno] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    const req = {
      userId: idnp,
      businessId: idno,
      firstName,
      lastName,
      email,
      phone,
      isOwner: true,
      password
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        req
      )
      console.log('Registration successful:', res.data)
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div>
      <div className="flex min-h-screen font-sans">
        <div className="w-[60%] xl:block hidden overflow-hidden invert">
          <Dither mouseRadius={0.2} colorNum={5} />
        </div>

        <div className="xl:w-[40%] w-full flex flex-col p-6 justify-center items-center">
          <div className="flex flex-col gap-1 items-center mb-4">
            <h1 className="text-3xl font-semibold">Create an account</h1>
            <p className="leading-7 opacity-55 max-w-xl">
              Fill in all the data to register
            </p>
          </div>

          <div className="w-[80%] flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <Input
              placeholder="IDNP"
              type="number"
              onChange={(e) => setIdnp(e.target.value)}
            />
            <Input
              placeholder="IDNO"
              type="number"
              onChange={(e) => setIdno(e.target.value)}
            />
            <Input
              placeholder="Phone number"
              type="number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="passworde"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="w-full mt-2">
              <Button className="w-full" onClick={handleRegister}>
                Register
              </Button>
              <div className="w-full flex justify-between">
                <Link to="#">
                  <small className="text-sm leading-none font-medium opacity-50">
                    Need help
                  </small>
                </Link>
                <Link to="/login">
                  <small className="text-sm leading-none font-medium opacity-50">
                    Already have an account
                  </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
