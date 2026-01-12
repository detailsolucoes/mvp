import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Notificacoes() {
  const mockNotificacoes = [
    {
      id: "1",
      titulo: "Nova empresa cadastrada",
      descricao: "Sushi Express iniciou o período de teste",
      tipo: "info",
      timestamp: "Há 2 horas",
      lida: false,
    },
    {
      id: "2",
      titulo: "Limite de pedidos atingido",
      descricao: "Detail Soluções atingiu 80% do limite mensal",
      tipo: "warning",
      timestamp: "Há 4 horas",
      lida: false,
    },
    {
      id: "3",
      titulo: "Pagamento recebido",
      descricao: "Pizzaria do João realizou pagamento de R$ 199,00",
      tipo: "success",
      timestamp: "Há 1 dia",
      lida: true,
    },
    {
      id: "4",
      titulo: "Erro crítico detectado",
      descricao: "Falha na sincronização de dados em empresa-002",
      tipo: "error",
      timestamp: "Há 2 dias",
      lida: true,
    },
    {
      id: "5",
      titulo: "Empresa inativa",
      descricao: "Burger House não teve atividade nos últimos 30 dias",
      tipo: "warning",
      timestamp: "Há 3 dias",
      lida: true,
    },
  ];

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
        <p className="text-muted-foreground">Alertas e notificações do sistema</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Marcar todas como lidas</Button>
        <Button variant="outline">Limpar tudo</Button>
      </div>

      <div className="space-y-3">
        {mockNotificacoes.map((notif) => (
          <Card key={notif.id} className={notif.lida ? "opacity-60" : ""}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                {getIcon(notif.tipo)}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{notif.titulo}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notif.descricao}</p>
                    </div>
                    <Badge variant={
                      notif.tipo === "success" ? "default" :
                      notif.tipo === "error" ? "destructive" :
                      notif.tipo === "warning" ? "secondary" :
                      "outline"
                    }>
                      {notif.tipo}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{notif.timestamp}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
