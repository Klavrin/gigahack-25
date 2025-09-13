import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem
} from './animate-ui/components/radix/sidebar'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black">Label 1</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>Item 1</SidebarMenuItem>
            <SidebarMenuItem>Item 2</SidebarMenuItem>
            <SidebarMenuItem>Item 3</SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
