"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/ui/nav-link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ open, setOpen, className, children, ...props }, ref) => {
    return (
      <SidebarContext.Provider value={{ open, setOpen }}>
        <motion.div
          ref={ref}
          initial={false}
          animate={{ width: open ? "300px" : "60px" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground shadow-lg",
            "border-r border-sidebar-border",
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

export const SidebarBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col flex-1 p-3 overflow-hidden", className)}
    {...props}
  />
));
SidebarBody.displayName = "SidebarBody";

interface SidebarLinkProps {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
}

export const SidebarLink = React.forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  ({ link }, ref) => {
    const { open } = useSidebar();

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <NavLink
            ref={ref}
            to={link.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          >
            {link.icon}
            <motion.span
              initial={false}
              animate={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={cn("whitespace-pre overflow-hidden")}
            >
              {link.label}
            </motion.span>
          </NavLink>
        </TooltipTrigger>
        {!open && (
          <TooltipContent side="right" className="flex items-center gap-4">
            {link.label}
          </TooltipContent>
        )}
      </Tooltip>
    );
  }
);
SidebarLink.displayName = "SidebarLink";