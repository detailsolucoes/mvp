import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import Dashboard from "@/pages/Dashboard";
import Pedidos from "@/pages/Pedidos";
import Clientes from "@/pages/Clientes";
import Produtos from "@/pages/Produtos";
import MenuPublico from "@/pages/MenuPublico";
import Relatorios from "@/pages/Relatorios";
import Configuracoes from "@/pages/Configuracoes";
import Chat from "@/pages/Chat";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* App routes with layout */}
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/pedidos" element={<MainLayout><Pedidos /></MainLayout>} />
          <Route path="/clientes" element={<MainLayout><Clientes /></MainLayout>} />
          <Route path="/produtos" element={<MainLayout><Produtos /></MainLayout>} />
          <Route path="/menu" element={<MainLayout><MenuPublico /></MainLayout>} />
          <Route path="/relatorios" element={<MainLayout><Relatorios /></MainLayout>} />
          <Route path="/configuracoes" element={<MainLayout><Configuracoes /></MainLayout>} />
          <Route path="/chat" element={<MainLayout><Chat /></MainLayout>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;