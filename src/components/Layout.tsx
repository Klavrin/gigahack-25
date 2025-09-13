import { AppSidebar } from './AppSidebar'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="bg-red-500 px-3 py-2 w-full">
          <SidebarTrigger />
        </div>
        <div className="bg-blue-500 min-h-screen w-full">{children}</div>
      </main>
    </SidebarProvider>
  )
}
