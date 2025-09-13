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
import { Link } from 'react-router-dom'

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
  const togglerRef = useRef(null)

  return (
    <header className="md:hidden block fixed top-0 w-full z-40 font-['Nunito']">
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800"></div>

      <div className="relative px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold text-green-700 dark:text-green-400 tracking-tight">
            🌾 FarmXpert
          </span>
        </div>

        <Sheet>
          <SheetTrigger asChild className='font-["Nunito"]'>
            <Button
              variant="ghost"
              size="sm"
              className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95 transition-all duration-200"
            >
              <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Button>
          </SheetTrigger>

          <SheetContent
            className="w-80 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 border-l border-gray-200 dark:border-gray-800 font-['Nunito']"
            side="right"
          >
            <SheetHeader className="mb-1 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 tracking-tight">
                  🌾 FarmXpert
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  We stand with farmers
                </p>
              </div>
            </SheetHeader>

            <div className="flex flex-col gap-3 mb-8">
              {sidebarItems.map((item) => (
                <Button
                  key={item.title}
                  asChild
                  variant="ghost"
                  className="h-12 justify-start rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 active:scale-[0.98] transition-all duration-200 text-gray-700 dark:text-gray-300"
                >
                  <Link to={item.url} className="flex items-center px-3">
                    <item.icon className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>

            <SheetFooter className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-auto">
              <Button
                variant="ghost"
                className="w-full h-12 justify-start rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 active:scale-[0.98] transition-all duration-200 text-gray-700 dark:text-gray-300"
                onClick={() => togglerRef.current?.click()}
              >
                <Sun className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400" />
                <span className="font-medium">Toggle Theme</span>
              </Button>
              <ThemeTogglerButton ref={togglerRef} size="lg" className="hidden" />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default MobileHeader
