import React from 'react';
import { NavLink } from '@/components/NavLink';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import logo from '@/assets/logo.jpeg';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Pizza, 
  Menu, 
  BarChart3, 
  Settings,
  LogOut,
  MessageSquare
} from 'lucide-react';

const menuItems = [
  { 
    title: 'Dashboard', 
    url: '/', 
    icon: LayoutDashboard 
  },
  { 
    title: 'Pedidos', 
    url: '/pedidos', 
    icon: ShoppingCart 
  },
  { 
    title: 'Clientes', 
    url: '/clientes', 
    icon: Users 
  },
  { 
    title: 'Produtos', 
    url: '/produtos', 
    icon: Pizza 
  },
  { 
    title: 'Menu Público', 
    url: '/menu', 
    icon: Menu 
  },
  { 
    title: 'Relatórios', 
    url: '/relatorios', 
    icon: BarChart3 
  },
  { 
    title: 'Chat', 
    url: '/chat', 
    icon: MessageSquare 
  },
  { 
    title: 'Configurações', 
    url: '/configuracoes', 
    icon: Settings 
  },
];

export function AppSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sidebar open={open} setOpen={setOpen} className="border-r border-border">
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {menuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.url}
                className="flex items-center justify-start gap-2 group/sidebar py-2 px-3 rounded-lg transition-all duration-200"
              >
                <item.icon className="text-foreground h-5 w-5 flex-shrink-0" />
                <span className="text-foreground">{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          <NavLink
            to="/login"
            className="flex items-center justify-start gap-2 group/sidebar py-2 px-3 rounded-lg transition-all duration-200"
          >
            <LogOut className="text-foreground h-5 w-5 flex-shrink-0" />
            <span className="text-foreground">Sair</span>
          </NavLink>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2 py-1 relative z-20">
      <img 
        src={logo} 
        alt="Detail Soluções" 
        className="h-8 w-auto object-contain"
      />
      <span className="font-medium text-foreground whitespace-pre">
        Detail Soluções
      </span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="flex items-center justify-center py-1 relative z-20">
      <img 
        src={logo} 
        alt="Detail Soluções" 
        className="h-10 w-auto object-contain"
      />
    </div>
  );
};