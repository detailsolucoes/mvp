import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";

export default function RelatoriosGlobal() {
  const mockRelatorios = [
    {
      id: "1",
      nome: "Relatório de Faturamento",
      descricao: "Faturamento consolidado de todas as empresas",
      periodo: "Janeiro 2026",
      status: "Disponível",
    },
    {
      id: "2",
      nome: "Relatório de Crescimento",
      descricao: "Taxa de crescimento de empresas e usuários",
      periodo: "Últimos 30 dias",
      status: "Disponível",
    },
    {
      id: "3",
      nome: "Relatório de Churn",
      descricao: "Taxa de cancelamento e inatividade",
      periodo: "Últimos 90 dias",
      status: "Disponível",
    },
    {
      id: "4",
      nome: "Relatório de Performance",
      descricao: "Performance do sistema e tempo de resposta",
      periodo: "Últimos 7 dias",
      status: "Processando",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Gerar e baixar relatórios consolidados do sistema</p>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <input type="date" className="px-3 py-2 border rounded-md bg-background" />
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <input type="date" className="px-3 py-2 border rounded-md bg-background" />
        </div>
        <Button>Gerar Relatório</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {mockRelatorios.map((relatorio) => (
          <Card key={relatorio.id}>
            <CardHeader>
              <CardTitle className="text-lg">{relatorio.nome}</CardTitle>
              <CardDescription>{relatorio.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Período</p>
                  <p className="font-semibold">{relatorio.periodo}</p>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-medium ${
                  relatorio.status === "Disponível"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}>
                  {relatorio.status}
                </span>
              </div>
              {relatorio.status === "Disponível" && (
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
