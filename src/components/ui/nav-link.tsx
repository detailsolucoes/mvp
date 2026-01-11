"use client";

import * as React from "react";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { cn } from "@/lib/utils";

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        className={(navData) => {
          const baseClasses = "flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200";
          const activeClasses = navData.isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";
          
          // Se className das props for uma função, chame-a com navData
          const userProvidedClasses = typeof className === 'function' ? className(navData) : className;

          return cn(baseClasses, activeClasses, userProvidedClasses);
        }}
        {...props}
      >
        {children}
      </RouterNavLink>
    );
  }
);
NavLink.displayName = "NavLink";

export { NavLink };