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
            "flex items-center justify-start gap-2 group/sidebar py-2",
            className,
            isActive && "text-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]",
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
                isActive && "text-[hsl(var(--primary))]"
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