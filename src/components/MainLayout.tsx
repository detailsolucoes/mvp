import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import logo from '@/assets/logo.jpeg';

interface MainLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-4 md:hidden">
          <SidebarTrigger className="text-foreground" />
          <img src={logo} alt="Detail Soluções" className="h-8 w-auto" />
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
