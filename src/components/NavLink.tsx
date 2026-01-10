import React from 'react';
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(
            "flex items-center justify-start gap-2 group/sidebar py-2 px-3 rounded-lg transition-all duration-200",
            className,
            isActive && "bg-primary/10 text-primary border-l-2 border-primary",
            isPending && pendingClassName
          )
        }
        {...props}
      >
        {({ isActive }) => (
          <>
            {React.cloneElement(props.children as React.ReactElement, {
              className: cn(
                (props.children as React.ReactElement).props.className,
                isActive && "text-primary"
              )
            })}
          </>
        )}
      </RouterNavLink>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };