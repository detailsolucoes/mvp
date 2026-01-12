import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EmpresaDetalhe() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Detalhes da Empresa</h1>
        <p className="text-muted-foreground">ID: {id}</p>
      </div>

      <Tabs defaultValue="visao-geral" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="operacao">Operação</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="suporte">Suporte</TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Gerais</CardTitle>
              <CardDescription>Dados básicos da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="text-lg font-semibold">Detail Soluções</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Segmento</p>
                  <p className="text-lg font-semibold">Pizza</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold text-green-600">Ativa</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Plano</p>
                  <p className="text-lg font-semibold">Premium</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dados Operacionais</CardTitle>
              <CardDescription>Informações de operação da empresa</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo placeholder para operação</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuários da Empresa</CardTitle>
              <CardDescription>Gerenciar usuários cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo placeholder para usuários</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Métricas de desempenho</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo placeholder para performance</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suporte" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suporte</CardTitle>
              <CardDescription>Informações de suporte</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo placeholder para suporte</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
