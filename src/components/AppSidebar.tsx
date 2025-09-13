import {
  Home,
  Settings,
  History,
  Map,
  Plus,
  BookTemplate,
  Book,
  User
} from 'lucide-react'

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
    url: '#',
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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-sans text-xl mb-2">
            FarmXpert
          </SidebarGroupLabel>
          <SidebarGroupContent className="font-sans">
            <SidebarMenu>
              <SidebarMenuItem key="add" className="mb-4">
                <SidebarMenuButton asChild className="active:scale-95 transition-all">
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
                    className="active:scale-95 transition-all hover:bg-neutral-200"
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
