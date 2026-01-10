"use client";

import React from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import { Home, Settings, Users } from "lucide-react"; // Example icons

// Define a functional component for the custom icon
const CustomIconComponent = () => (
  <div className="h-7 w-7 flex-shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
    CI
  </div>
);

export function SidebarDemo() {
  const links = [
    {
      label: "Home",
      href: "#",
      icon: Home, // Pass the component reference
    },
    {
      label: "Settings",
      href: "#",
      icon: Settings, // Pass the component reference
    },
    {
      label: "Users",
      href: "#",
      icon: Users, // Pass the component reference
    },
  ];

  const customIconLink = {
    href: "#",
    label: "Custom Icon",
    icon: CustomIconComponent, // Pass the component reference
  };

  return (
    <Sidebar open={true} setOpen={() => {}} animate={false}>
      <SidebarBody>
        {links.map((link, idx) => (
          <SidebarLink key={idx} link={link} />
        ))}
        <SidebarLink link={customIconLink} />
      </SidebarBody>
    </Sidebar>
  );
}