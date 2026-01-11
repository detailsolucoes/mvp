import React from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { AppSidebarContent } from '@/components/AppSidebarContent';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import logo from '@/assets/logo.jpeg';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar open={open} setOpen={setOpen} className="border-r border-border">
        <AppSidebarContent />
      </Sidebar>
      <main 
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
          open ? 'ml-[300px]' : 'ml-[60px]'
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur px-4">
          <div className="flex items-center gap-3 md:hidden">
            <img src={logo} alt="Detail Soluções" className="h-8 w-auto rounded" />
          </div>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user.name}</span>
              </div>
            )}
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>
        
        {/* Content with animation */}
        <motion.div 
          className="p-4 md:p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
