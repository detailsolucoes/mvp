import React from 'react';
import { Sidebar } from '@/components/ui/sidebar'; // Importa Sidebar
import { AppSidebarContent } from '@/components/AppSidebarContent'; // Importa o componente renomeado
import logo from '@/assets/logo.jpeg';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = React.useState(false); // Gerencia o estado 'open' do sidebar aqui
  
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar open={open} setOpen={setOpen} className="border-r border-border">
        <AppSidebarContent /> {/* Renderiza o conteúdo do sidebar aqui */}
      </Sidebar>
      <main 
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
          open ? 'ml-[300px]' : 'ml-[60px]'
        }`}
      >
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/95 backdrop-blur px-4 md:hidden">
          <img src={logo} alt="Detail Soluções" className="h-8 w-auto" />
        </header>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}