import { useRef } from 'react'
import { Button } from './ui/button'
import { Menu, Sun } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger
} from '@/components/ui/sheet'
import { Settings, History } from 'lucide-react'
import { ThemeTogglerButton } from './animate-ui/components/buttons/theme-toggler'

const sidebarItems = [
  {
    title: 'History',
    url: '#',
    icon: History
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings
  }
]

const MobileHeader = () => {
  const togglerRef = useRef<HTMLButtonElement>(null)

  return (
    <header className="py-2 px-4 bg-neutral-100 dark:bg-neutral-900 md:hidden block border-b fixed w-full">
      <Sheet>
        <SheetTrigger>
          <Button className="min-w-12 min-h-12 cursor-pointer" variant="ghost">
            <Menu className="min-w-6 min-h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="font-['Nunito'] px-4 gap-1" side="left">
          <SheetHeader className="mb-8"></SheetHeader>
          {sidebarItems.map((item) => (
            <Button
              key={item.title}
              asChild
              className="active:scale-95 transition-all h-14 bg-neutral-200 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-900"
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </Button>
          ))}
          <SheetFooter className="w-full flex items-end px-0">
            <Button
              asChild
              className="active:scale-95 transition-all h-14 bg-neutral-200 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-900 w-full cursor-pointer"
              onClick={() => togglerRef.current?.click()}
            >
              <div>
                <Sun />
                <span>Toggle Theme</span>
              </div>
            </Button>
            <ThemeTogglerButton ref={togglerRef} size="lg" className="hidden" />
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* <SidebarTrigger
        size="lg"
        className="min-w-12 min-h-12 cursor-pointer bg-blue-500"
      /> */}
    </header>
  )
}

export default MobileHeader
