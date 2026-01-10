import { NavLink } from '@/components/NavLink';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import logo from '@/assets/logo.jpeg';

const menuItems = [
  { title: 'Dashboard', url: '/' },
  { title: 'Pedidos', url: '/pedidos' },
  { title: 'Clientes', url: '/clientes' },
  { title: 'Produtos', url: '/produtos' },
  { title: 'Menu Público', url: '/menu' },
  { title: 'Relatórios', url: '/relatorios' },
  { title: 'Configurações', url: '/configuracoes' },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center justify-between gap-3">
          <img 
            src={logo} 
            alt="Detail Soluções" 
            className="h-10 w-auto object-contain"
          />
          <SidebarTrigger className="text-foreground hover:bg-muted p-2 rounded-md" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/'}
                      className="w-full px-4 py-3 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                      activeClassName="bg-muted text-primary"
                    >
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <NavLink
          to="/login"
          className="w-full px-4 py-2 rounded-md text-sm font-medium text-center bg-muted hover:bg-muted/80 transition-colors block"
        >
          Sair
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}
