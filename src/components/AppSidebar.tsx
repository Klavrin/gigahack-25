import { Link, useLocation } from 'react-router-dom'
import { Home, Settings, History, Map, Plus, User, FilePen } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Button } from './ui/button'

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

const footerItems = [
  {
    title: 'History',
    url: '/history',
    icon: History
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings
  }
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="md:block hidden border-r border-gray-200 dark:border-neutral-800 font-['Nunito']">
      <SidebarContent className="bg-slate-50 dark:bg-neutral-900">
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className="font-bold text-2xl mb-8 text-green-700 dark:text-green-400 tracking-tight">
            🌾 FarmXpert
          </SidebarGroupLabel>

          <SidebarGroupContent className="space-y-2">
            <SidebarMenu>
              <SidebarMenuItem className="mb-6">
                <SidebarMenuButton
                  asChild
                  className="hover:scale-[1.02] transition-all duration-200 shadow-sm"
                >
                  <Button className="w-full h-12 bg-emerald-600 active:scale-[0.98] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border-0">
                    <Plus className="w-5 h-5" />
                    <span className="text-base">Add</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {contentItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton
                    asChild
                    className={`h-11 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                      location.pathname === item.url
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 shadow-sm border border-green-200 dark:border-green-800'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Link to={item.url} className="flex items-center px-3 py-2">
                      <item.icon
                        className={`w-5 h-5 mr-3 ${
                          location.pathname === item.url
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      />
                      <span className="font-medium text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
        <SidebarMenu className="space-y-1">
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={`h-10 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  location.pathname === item.url
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    : 'hover:bg-gray-200/70 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Link to={item.url} className="flex items-center px-3 py-2">
                  <item.icon className="w-4 h-4 mr-3" />
                  <span className="font-medium text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
