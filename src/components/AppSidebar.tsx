import { useLocation } from 'react-router-dom'
import { Home, Settings, History, Map, Plus, BookTemplate, User } from 'lucide-react'
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
    url: '#',
    icon: Map
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

const footerItems = [
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

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="md:block hidden">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-sans text-xl mb-2">
            FarmXpert
          </SidebarGroupLabel>
          <SidebarGroupContent className="font-sans">
            <SidebarMenu>
              <SidebarMenuItem key="add" className="mb-2">
                <SidebarMenuButton
                  asChild
                  className="active:scale-95 transition-all cursor-pointer"
                >
                  <Button className="bg-blue-700">
                    <Plus />
                    <span>Add</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {contentItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`active:scale-95 transition-all ${
                      location.pathname === item.url
                        ? 'bg-neutral-300 dark:bg-neutral-700'
                        : ''
                    }`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="font-sans">
        {footerItems.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              className="active:scale-95 transition-all hover:bg-neutral-200"
            >
              <a href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarFooter>
    </Sidebar>
  )
}
