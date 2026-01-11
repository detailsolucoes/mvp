"use client"
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  Pizza,
  Menu as MenuIcon,
  BarChart3,
  Settings,
  LogOut,
  MessageSquare,
  ChevronDown,
  ChevronsRight,
  Moon,
  Sun,
  Bell,
  User,
  ShieldCheck,
} from "lucide-react";
import logo from '@/assets/logo.jpeg';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { mockCompanies } from '@/data/mockData';

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
    icon: MenuIcon 
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

const adminItems = [
  {
    title: 'Admin Global',
    url: '/admin-global',
    icon: ShieldCheck
  }
];

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  const setIsDark = (dark: boolean) => setTheme(dark ? 'dark' : 'light');

  return (
    <div className={`flex min-h-screen w-full ${isDark ? 'dark' : ''}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Sidebar />
        <ExampleContent isDark={isDark} setIsDark={setIsDark}>
          {children}
        </ExampleContent>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const { user } = useAuth();

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? 'w-64' : 'w-16'
      } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm flex flex-col`}
    >
      <TitleSection open={open} />

      <div className="space-y-1 mb-8 flex-1 overflow-y-auto overflow-x-hidden">
        {user?.role === 'super_admin' && adminItems.map((item) => (
          <Option
            key={item.url}
            Icon={item.icon}
            title={item.title}
            url={item.url}
            selected={location.pathname === item.url}
            open={open}
          />
        ))}
        
        {user?.role === 'super_admin' && <div className="my-4 border-t border-gray-100 dark:border-gray-800" />}

        {menuItems.map((item) => (
          <Option
            key={item.url}
            Icon={item.icon}
            title={item.title}
            url={item.url}
            selected={location.pathname === item.url}
            open={open}
          />
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1 mb-12">
        <button
          onClick={handleLogout}
          className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200`}
        >
          <div className="grid h-full w-12 place-content-center">
            <LogOut className="h-4 w-4" />
          </div>
          {open && (
            <span className="text-sm font-medium">Sair</span>
          )}
        </button>
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

const Option = ({ Icon, title, url, selected, open }: any) => {
  return (
    <Link
      to={url}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        selected 
          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500" 
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      
      {open && (
        <span
          className={`text-sm font-medium transition-opacity duration-200 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title}
        </span>
      )}
    </Link>
  );
};

const TitleSection = ({ open }) => {
  const { user } = useAuth();
  const company = mockCompanies.find(c => c.id === user?.companyId) || mockCompanies[0];
  const displayName = user?.role === 'super_admin' ? 'Super Admin' : (company.customName || company.name);

  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <Logo open={open} company={company} />
          {open && (
            <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[120px]">
                    {displayName}
                  </span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                    {user?.role === 'super_admin' ? 'Administração Global' : 'Painel da Empresa'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && (
          <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        )}
      </div>
    </div>
  );
};

const Logo = ({ open, company }: { open: boolean, company: any }) => {
  return (
    <div className={`grid ${open ? 'size-10' : 'size-8'} shrink-0 place-content-center rounded-lg bg-white shadow-sm overflow-hidden`}>
      <img 
        src={company.logoUrl || logo} 
        alt={company.name} 
        className="h-full w-full object-cover"
      />
    </div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight
            className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
        {open && (
          <span
            className={`text-sm font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-200 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Recolher
          </span>
        )}
      </div>
    </button>
  );
};

const ExampleContent = ({ isDark, setIsDark, children }: any) => {
  const location = useLocation();
  const { user } = useAuth();
  const company = mockCompanies.find(c => c.id === user?.companyId) || mockCompanies[0];
  const pageTitle = [...menuItems, ...adminItems].find(item => item.url === location.pathname)?.title || 'Dashboard';

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {user?.role === 'super_admin' ? 'Gestão de Ecossistema' : `Painel Administrativo - ${company.customName || company.name}`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            {isDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Page Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
