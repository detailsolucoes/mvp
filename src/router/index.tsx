import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
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
import AdminGlobal from "@/pages/AdminGlobal";
import DashboardGlobal from "@/pages/admin-global/DashboardGlobal";
import Empresas from "@/pages/admin-global/Empresas";
import EmpresaDetalhe from "@/pages/admin-global/EmpresaDetalhe";
import Usuarios from "@/pages/admin-global/Usuarios";
import Planos from "@/pages/admin-global/Planos";
import RelatoriosGlobal from "@/pages/admin-global/RelatoriosGlobal";
import Sistema from "@/pages/admin-global/Sistema";
import Notificacoes from "@/pages/admin-global/Notificacoes";
import ConfiguracoesGlobal from "@/pages/admin-global/ConfiguracoesGlobal";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes with layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout><Dashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/pedidos" element={
        <ProtectedRoute>
          <MainLayout><Pedidos /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/clientes" element={
        <ProtectedRoute>
          <MainLayout><Clientes /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/produtos" element={
        <ProtectedRoute>
          <MainLayout><Produtos /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/menu" element={
        <ProtectedRoute>
          <MainLayout><MenuPublico /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/relatorios" element={
        <ProtectedRoute>
          <MainLayout><Relatorios /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/configuracoes" element={
        <ProtectedRoute>
          <MainLayout><Configuracoes /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute>
          <MainLayout><Chat /></MainLayout>
        </ProtectedRoute>
      } />
      {/* Admin Global routes - Super Admin only */}
      <Route path="/admin-global" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><AdminGlobal /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/dashboard" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><DashboardGlobal /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/empresas" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><Empresas /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/empresas/:id" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><EmpresaDetalhe /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/usuarios" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><Usuarios /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/planos" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><Planos /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/relatorios" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><RelatoriosGlobal /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/sistema" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><Sistema /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/notificacoes" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><Notificacoes /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/admin-global/configuracoes" element={
        <ProtectedRoute requiredRole="super_admin">
          <MainLayout><ConfiguracoesGlobal /></MainLayout>
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
