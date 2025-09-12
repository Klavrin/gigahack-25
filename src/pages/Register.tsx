import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Dither from '@/components/Dither'

const Register = () => {
  return (
    <div>
      <div className="flex min-h-screen">
        <div className="w-[60%] xl:block hidden overflow-hidden invert">
          <Dither mouseRadius={0.2} colorNum={5} />
        </div>

        <div className="xl:w-[40%] w-full flex flex-col gap-4 p-6 justify-center items-center">
          <h1 className="text-3xl font-semibold">Create an account</h1>

          <div className="w-[80%] flex flex-col gap-2">
            <div className="flex gap-2">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full font-normal text-neutral-600" variant="outline">
                  Select Legal Form of the Farm
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem>Household farm</DropdownMenuItem>
                <DropdownMenuItem>LLC</DropdownMenuItem>
                <DropdownMenuItem>Cooperative</DropdownMenuItem>
                <DropdownMenuItem>Individual enterprise</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
