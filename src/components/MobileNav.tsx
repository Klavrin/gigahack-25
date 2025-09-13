import { BookTemplate, Home, User, Map, Plus } from 'lucide-react'

const contentItems = [
  {
    title: 'Home',
    url: '#',
    icon: Home
  },
  {
    title: 'Map',
    url: '#',
    icon: Map
  },
  {
    title: 'Add',
    url: '#',
    icon: Plus
  },
  {
    title: 'Subsidy',
    url: '#',
    icon: BookTemplate
  },
  {
    title: 'Profile',
    url: '#',
    icon: User
  }
]

const MobileNav = () => {
  return (
    <div className="md:hidden block w-screen fixed bottom-0 font-['Nunito'] py-2 border-t bg-neutral-100 dark:bg-neutral-900">
      <div className="flex w-full justify-between px-6 cursor-pointer">
        {contentItems.map((item) => (
          <div
            className={`flex flex-col items-center justify-center rounded-full min-w-18 min-h-18 ${
              item.title === 'Add' ? 'bg-blue-700 text-white' : ''
            }`}
          >
            <item.icon className={`${item.title === 'Add' ? 'size-8' : ''}`} />
            <span className={`${item.title === 'Add' ? 'hidden' : 'block'}`}>
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MobileNav
