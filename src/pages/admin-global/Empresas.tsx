import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Edit, ToggleRight } from "lucide-react";

export default function Empresas() {
  const mockEmpresas = [
    {
      id: "1",
      nome: "Detail Soluções",
      segmento: "Pizza",
      whatsapp: "11999999999",
      status: "Ativa",
      plano: "Premium",
      faturamento: "R$ 12.450,00",
    },
    {
      id: "2",
      nome: "Pizzaria do João",
      segmento: "Pizza",
      whatsapp: "11888888888",
      status: "Ativa",
      plano: "Standard",
      faturamento: "R$ 8.900,00",
    },
    {
      id: "3",
      nome: "Burger House",
      segmento: "Hamburger",
      whatsapp: "11777777777",
      status: "Inativa",
      plano: "Basic",
      faturamento: "R$ 0,00",
    },
    {
      id: "4",
      nome: "Sushi Express",
      segmento: "Sushi",
      whatsapp: "11666666666",
      status: "Ativa",
      plano: "Premium",
      faturamento: "R$ 15.200,00",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
        <p className="text-muted-foreground">Gerenciar todas as empresas cadastradas no sistema</p>
      </div>

      <div className="flex gap-4">
        <Input placeholder="Buscar empresa por nome ou WhatsApp..." className="max-w-sm" />
        <Button>+ Nova Empresa</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
          <CardDescription>Total: {mockEmpresas.length} empresas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Empresa</th>
                  <th className="text-left py-3 px-4 font-semibold">Segmento</th>
                  <th className="text-left py-3 px-4 font-semibold">WhatsApp</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Plano</th>
                  <th className="text-left py-3 px-4 font-semibold">Faturamento</th>
                  <th className="text-left py-3 px-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mockEmpresas.map((empresa) => (
                  <tr key={empresa.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{empresa.nome}</td>
                    <td className="py-3 px-4">{empresa.segmento}</td>
                    <td className="py-3 px-4">{empresa.whatsapp}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        empresa.status === "Ativa"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}>
                        {empresa.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{empresa.plano}</td>
                    <td className="py-3 px-4">{empresa.faturamento}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="Ver detalhes">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Editar">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Ativar/Inativar">
                          <ToggleRight className="h-4 w-4" />
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
