"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile"; // Import useIsMobile

interface SidebarContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function Sidebar({ open, setOpen, children, className, ...props }: SidebarProps) {
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false); // Sidebar should be closed by default on mobile
    } else {
      setOpen(true); // Sidebar should be open by default on desktop
    }
  }, [isMobile, setOpen]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
          open ? "w-[300px]" : "w-[60px]",
          className
        )}
        {...props}
      >
        <div className="relative flex h-14 items-center justify-center border-b border-sidebar-border px-2">
          {children}
          {!isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => setOpen(!open)}
            >
              {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}

interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SidebarBody({ children, className, ...props }: SidebarBodyProps) {
  return (
    <div className={cn("flex flex-1 flex-col p-4", className)} {...props}>
      {children}
    </div>
  );
}

interface SidebarLinkProps extends React.HTMLAttributes<HTMLDivElement> {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
}

export function SidebarLink({ link }: SidebarLinkProps) {
  const { open } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        // Add active state styling if needed, similar to NavLink
      )}
    >
      {link.icon}
      {open && <span className="whitespace-pre">{link.label}</span>}
    </a>
  );
}