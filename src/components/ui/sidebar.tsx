"use client";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  forwardRef,
} from "react";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom"; // Correct import for Link
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  animate?: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  animate?: boolean;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  open: controlledOpen,
  setOpen: setControlledOpen,
  animate = true,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = setControlledOpen !== undefined ? setControlledOpen : setUncontrolledOpen;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

// --- Sidebar Component ---
interface SidebarProps extends HTMLMotionProps<"div"> { // Extend HTMLMotionProps for framer-motion props
  children: React.ReactNode;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  animate?: boolean;
}

export const Sidebar = ({
  children,
  open: controlledOpen,
  setOpen: setControlledOpen,
  animate = true,
  className,
  ...props
}: SidebarProps) => {
  const isMobile = useIsMobile();
  const { open, setOpen } = useSidebar();

  if (isMobile) {
    return (
      <>
        <MobileSidebar
          open={open}
          setOpen={setOpen}
          animate={animate}
          className={className}
          {...props}
        >
          {children}
        </MobileSidebar>
        <div className="fixed top-0 left-0 p-2 z-50 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </>
    );
  }

  return (
    <DesktopSidebar
      open={open}
      setOpen={setOpen}
      animate={animate}
      className={className}
      {...props}
    >
      {children}
    </DesktopSidebar>
  );
};

// --- Desktop Sidebar ---
interface DesktopSidebarProps extends HTMLMotionProps<"div"> { // Extend HTMLMotionProps
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  animate: boolean;
}

const DesktopSidebar = ({
  children,
  open,
  setOpen,
  animate,
  className,
  ...props
}: DesktopSidebarProps) => {
  return (
    <motion.div
      className={cn(
        "hidden md:flex flex-col h-screen fixed top-0 left-0 bg-sidebar text-sidebar-foreground z-50",
        className
      )}
      initial={animate ? { width: 60 } : false}
      animate={animate ? { width: open ? 300 : 60 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className="flex items-center justify-end p-4">
        <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
      {children}
    </motion.div>
  );
};

// --- Mobile Sidebar ---
interface MobileSidebarProps extends HTMLMotionProps<"div"> { // Extend HTMLMotionProps
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  animate: boolean;
}

const MobileSidebar = ({
  children,
  open,
  setOpen,
  animate,
  className,
  ...props
}: MobileSidebarProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn(
            "md:hidden flex flex-col h-screen fixed top-0 left-0 bg-sidebar text-sidebar-foreground z-[999]",
            className
          )}
          initial={animate ? { x: "-100%" } : false}
          animate={animate ? { x: 0 } : {}}
          exit={animate ? { x: "-100%" } : {}}
          transition={{ duration: 0.2 }}
          {...props}
        >
          <div className="flex items-center justify-end p-4">
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- SidebarBody ---
interface SidebarBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarBody = ({ children, className, ...props }: SidebarBodyProps) => {
  return (
    <div className={cn("flex flex-col p-4", className)} {...props}>
      {children}
    </div>
  );
};

// --- SidebarLink ---
interface SidebarLinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  link: {
    href: string;
    label: string;
    icon?: React.ElementType;
  };
}

export const SidebarLink = ({ link, className, ...props }: SidebarLinkProps) => {
  const { open } = useSidebar();
  return (
    <Link // This is the correct Link from react-router-dom
      to={link.href}
      className={cn(
        "flex items-center gap-2 py-2 px-3 rounded-lg transition-colors duration-200",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className
      )}
      {...props}
    >
      {link.icon && <link.icon className="h-5 w-5 flex-shrink-0" />}
      <motion.span
        animate={{ opacity: open ? 1 : 0, width: open ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        className="whitespace-pre overflow-hidden"
      >
        {link.label}
      </motion.span>
    </Link>
  );
};