import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from './animate-ui/components/radix/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
