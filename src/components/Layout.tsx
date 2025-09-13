import { AppSidebar } from './AppSidebar'
import { ThemeTogglerButton } from './animate-ui/components/buttons/theme-toggler'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="px-4 py-2 w-full flex items-center justify-between">
          <SidebarTrigger size="lg" className="active:scale-95 cursor-pointer" />
          <ThemeTogglerButton className="active:scale-95 transition-all" />
        </div>
        <div className="min-h-screen w-full font-sans px-4">{children}</div>
      </main>
    </SidebarProvider>
  )
}
