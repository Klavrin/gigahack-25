import { Home, User, Map, Plus, FilePen } from 'lucide-react'
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
    <div className="md:hidden block w-screen fixed bottom-0 font-['Nunito'] py-2 border-t bg-neutral-100 dark:bg-neutral-900">
      <div className="flex w-full justify-between px-2 cursor-pointer">
        {contentItems.map((item) => (
          <Link
            to={item.url}
            className={`flex flex-col items-center justify-center rounded-full min-w-18 min-h-18 ${
              item.title === 'Add' ? 'bg-blue-500 text-white' : ''
            }`}
          >
            <item.icon
              fill={location.pathname === item.url ? 'color' : 'none'}
              className={`${item.title === 'Add' ? 'size-8' : ''}`}
            />
            <span className={`${item.title === 'Add' ? 'hidden' : 'block'}`}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
