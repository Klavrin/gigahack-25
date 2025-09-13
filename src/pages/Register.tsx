import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Dither from '@/components/Dither'
import { Link } from 'react-router-dom'

const Register = () => {
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
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input placeholder="IDNP" type="number" />
            <Input placeholder="IDNO" type="number" />
            <Input placeholder="Phone number" type="number" />
            <Input placeholder="Email" type="email" />

            <div className="w-full mt-2">
              <Button className="w-full">Register</Button>
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
