import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function ConfiguracoesGlobal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações Globais</h1>
        <p className="text-muted-foreground">Configurar parâmetros gerais do CRM</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do CRM</CardTitle>
          <CardDescription>Dados principais do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nome do CRM</label>
            <Input placeholder="Detail Soluções CRM" defaultValue="Detail Soluções CRM" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <textarea
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="Descrição do CRM"
              defaultValue="CRM SaaS para gerenciamento de delivery"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Logo Padrão</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Logo</span>
              </div>
              <Button variant="outline">Fazer upload</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recursos Globais</CardTitle>
          <CardDescription>Habilitar/desabilitar funcionalidades</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="novo-empresas" defaultChecked />
            <label htmlFor="novo-empresas" className="text-sm font-medium cursor-pointer">
              Permitir cadastro de novas empresas
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="trial" defaultChecked />
            <label htmlFor="trial" className="text-sm font-medium cursor-pointer">
              Período de teste automático
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="notificacoes" defaultChecked />
            <label htmlFor="notificacoes" className="text-sm font-medium cursor-pointer">
              Enviar notificações por email
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="api" defaultChecked />
            <label htmlFor="api" className="text-sm font-medium cursor-pointer">
              Ativar API pública
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="integracao" defaultChecked />
            <label htmlFor="integracao" className="text-sm font-medium cursor-pointer">
              Permitir integrações de terceiros
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Limites Padrão</CardTitle>
          <CardDescription>Configurações padrão para novas empresas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Limite de Pedidos (Plano Basic)</label>
            <Input type="number" placeholder="100" defaultValue="100" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Limite de Usuários (Plano Basic)</label>
            <Input type="number" placeholder="2" defaultValue="2" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Dias de Período de Teste</label>
            <Input type="number" placeholder="14" defaultValue="14" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
          <CardDescription>Configurar integrações externas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Chave de API Stripe</label>
            <Input type="password" placeholder="sk_live_..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Webhook URL</label>
            <Input placeholder="https://seu-dominio.com/webhook" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Token SendGrid</label>
            <Input type="password" placeholder="SG...." />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button>Salvar Alterações</Button>
        <Button variant="outline">Cancelar</Button>
      </div>
    </div>
  );
}
