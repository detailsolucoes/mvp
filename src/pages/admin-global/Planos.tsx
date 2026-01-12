import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Planos() {
  const mockPlanos = [
    {
      id: "1",
      nome: "Basic",
      limitePedidos: 100,
      limiteUsuarios: 2,
      status: "Ativo",
      preco: "R$ 99,00/mês",
    },
    {
      id: "2",
      nome: "Standard",
      limitePedidos: 500,
      limiteUsuarios: 5,
      status: "Ativo",
      preco: "R$ 199,00/mês",
    },
    {
      id: "3",
      nome: "Premium",
      limitePedidos: 2000,
      limiteUsuarios: 15,
      status: "Ativo",
      preco: "R$ 399,00/mês",
    },
    {
      id: "4",
      nome: "Enterprise",
      limitePedidos: -1,
      limiteUsuarios: -1,
      status: "Ativo",
      preco: "Customizado",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Planos</h1>
        <p className="text-muted-foreground">Gerenciar planos de assinatura do sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockPlanos.map((plano) => (
          <Card key={plano.id}>
            <CardHeader>
              <CardTitle className="text-lg">{plano.nome}</CardTitle>
              <CardDescription>{plano.preco}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Limite de Pedidos</p>
                <p className="text-lg font-semibold">
                  {plano.limitePedidos === -1 ? "Ilimitado" : plano.limitePedidos}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Limite de Usuários</p>
                <p className="text-lg font-semibold">
                  {plano.limiteUsuarios === -1 ? "Ilimitado" : plano.limiteUsuarios}
                </p>
              </div>
              <div>
                <Badge variant={plano.status === "Ativo" ? "default" : "secondary"}>
                  {plano.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tabela de Planos</CardTitle>
          <CardDescription>Visão detalhada de todos os planos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Plano</th>
                  <th className="text-left py-3 px-4 font-semibold">Limite de Pedidos</th>
                  <th className="text-left py-3 px-4 font-semibold">Limite de Usuários</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Preço</th>
                </tr>
              </thead>
              <tbody>
                {mockPlanos.map((plano) => (
                  <tr key={plano.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{plano.nome}</td>
                    <td className="py-3 px-4">{plano.limitePedidos === -1 ? "Ilimitado" : plano.limitePedidos}</td>
                    <td className="py-3 px-4">{plano.limiteUsuarios === -1 ? "Ilimitado" : plano.limiteUsuarios}</td>
                    <td className="py-3 px-4">
                      <Badge variant={plano.status === "Ativo" ? "default" : "secondary"}>
                        {plano.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{plano.preco}</td>
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
