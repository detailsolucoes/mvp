import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Database, Zap, AlertCircle } from "lucide-react";

export default function Sistema() {
  const mockStatus = [
    {
      id: "1",
      nome: "API Principal",
      status: "Online",
      uptime: "99.9%",
      icon: Zap,
    },
    {
      id: "2",
      nome: "Banco de Dados",
      status: "Online",
      uptime: "99.95%",
      icon: Database,
    },
    {
      id: "3",
      nome: "Serviço de Fila",
      status: "Online",
      uptime: "99.8%",
      icon: Activity,
    },
    {
      id: "4",
      nome: "Cache Distribuído",
      status: "Degradado",
      uptime: "95.2%",
      icon: AlertCircle,
    },
  ];

  const mockLogs = [
    { id: "1", timestamp: "2026-01-12 10:30:45", evento: "Backup concluído com sucesso", tipo: "info" },
    { id: "2", timestamp: "2026-01-12 09:15:22", evento: "Atualização de segurança aplicada", tipo: "success" },
    { id: "3", timestamp: "2026-01-12 08:45:10", evento: "Limite de memória atingido em servidor 3", tipo: "warning" },
    { id: "4", timestamp: "2026-01-12 07:30:00", evento: "Sincronização de dados iniciada", tipo: "info" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sistema</h1>
        <p className="text-muted-foreground">Status e monitoramento da infraestrutura</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStatus.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{item.nome}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={item.status === "Online" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                  <p className="text-lg font-semibold">{item.uptime}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logs do Sistema</CardTitle>
          <CardDescription>Últimos eventos registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm font-medium">{log.evento}</p>
                  <p className="text-xs text-muted-foreground mt-1">{log.timestamp}</p>
                </div>
                <Badge variant={
                  log.tipo === "success" ? "default" :
                  log.tipo === "warning" ? "secondary" :
                  "outline"
                }>
                  {log.tipo}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrações Futuras</CardTitle>
          <CardDescription>Serviços que podem ser integrados</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Monitoramento em tempo real com Grafana</li>
            <li>• Alertas automáticos via Slack/Email</li>
            <li>• Análise de logs com ELK Stack</li>
            <li>• Backup automático em nuvem</li>
            <li>• Disaster recovery e failover</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
