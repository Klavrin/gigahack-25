import { Home, User, Map, Plus, FilePen, Settings, History } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const contentItems = [
  {
    title: 'Home',
    url: '/home',
    icon: Home
  },
  {
    title: 'Map',
    url: '/map',
    icon: Map
  },
  {
    title: 'Add',
    url: '',
    icon: Plus
  },
  {
    title: 'Subsidy',
    url: '/subsidy',
    icon: FilePen
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: User
  }
]

const MobileNav = () => {
  const location = useLocation()

  return (
    <div className="md:hidden block w-screen fixed bottom-0 z-50 font-['Nunito']">
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800"></div>

      <div className="relative px-4 py-3">
        <div className="flex justify-between items-center w-full">
          {contentItems.map((item, index) => {
            const isActive = location.pathname === item.url
            const isAddButton = item.title === 'Add'

            return (
              <Link
                key={item.title}
                to={item.url}
                className={`relative flex flex-col items-center justify-center transition-all duration-200 ${
                  isAddButton
                    ? 'w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg hover:shadow-xl active:scale-95 hover:from-green-600 hover:to-emerald-700'
                    : 'w-12 h-12 rounded-xl hover:scale-110 active:scale-95'
                }`}
              >
                {isActive && !isAddButton && (
                  <div className="absolute -top-1 w-1 h-1 bg-green-500 rounded-full"></div>
                )}

                <item.icon
                  className={`${
                    isAddButton
                      ? 'w-7 h-7 text-white'
                      : isActive
                      ? 'w-6 h-6 text-green-600 dark:text-green-400'
                      : 'w-6 h-6 text-gray-500 dark:text-gray-400'
                  } transition-colors duration-200`}
                  fill={isActive && !isAddButton ? 'currentColor' : 'none'}
                />

                <span
                  className={`${
                    isAddButton
                      ? 'hidden'
                      : `text-xs mt-1 font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`
                  }`}
                >
                  {item.title}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MobileNav
