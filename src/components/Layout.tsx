import { AppSidebar } from './AppSidebar'
import MobileHeader from './MobileHeader'
import MobileNav from './MobileNav'
import { ThemeTogglerButton } from './animate-ui/components/buttons/theme-toggler'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="px-4 py-2 w-full md:flex hidden items-center justify-between">
            <SidebarTrigger size="lg" className="active:scale-95 cursor-pointer" />
            <ThemeTogglerButton className="active:scale-95 transition-all" />
          </div>
          <MobileHeader />
          <div className="min-h-full w-full font-['Nunito'] px-4 overflow-y-scroll mt-[65px] pb-12 md:mt-0">
            {children}
          </div>
          <MobileNav />
        </main>
      </SidebarProvider>
    </>
  )
}
