import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, RotateCcw } from "lucide-react";

export default function Usuarios() {
  const mockUsuarios = [
    {
      id: "1",
      nome: "Super Admin",
      email: "admin@detailsolucoes.com",
      role: "super_admin",
      empresa: "Sistema",
      status: "Ativo",
    },
    {
      id: "2",
      nome: "Empresa 1 Admin",
      email: "empresa1@test.com",
      role: "admin",
      empresa: "Detail Soluções",
      status: "Ativo",
    },
    {
      id: "3",
      nome: "Empresa 2 Admin",
      email: "empresa2@test.com",
      role: "admin",
      empresa: "Pizzaria do João",
      status: "Ativo",
    },
    {
      id: "4",
      nome: "Atendente 1",
      email: "atendente1@detail.com",
      role: "attendant",
      empresa: "Detail Soluções",
      status: "Bloqueado",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Usuários Globais</h1>
        <p className="text-muted-foreground">Gerenciar todos os usuários do sistema</p>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Buscar por nome ou email..." className="max-w-sm" />
        <select className="px-3 py-2 border rounded-md bg-background">
          <option value="">Todos os Roles</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="attendant">Atendente</option>
        </select>
        <select className="px-3 py-2 border rounded-md bg-background">
          <option value="">Todas as Empresas</option>
          <option value="detail">Detail Soluções</option>
          <option value="pizzaria">Pizzaria do João</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>Total: {mockUsuarios.length} usuários</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Nome</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 font-semibold">Empresa</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockUsuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{usuario.nome}</td>
                    <td className="py-3 px-4">{usuario.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {usuario.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{usuario.empresa}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        usuario.status === "Ativo"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {usuario.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="Bloquear">
                          <Lock className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Resetar senha">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
