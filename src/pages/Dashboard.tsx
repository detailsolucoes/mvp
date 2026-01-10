import { mockDashboardStats, mockOrders } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

const statusLabels: Record<string, string> = {
  recebido: 'Recebido',
  em_preparo: 'Em Preparo',
  pronto: 'Pronto',
  entregue: 'Entregue',
  cancelado: 'Cancelado',
};

function StatCard({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) {
  return (
    <Card className="gradient-border-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const stats = mockDashboardStats;
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Pedidos Hoje" 
          value={stats.ordersToday} 
          subtitle="Total de pedidos do dia" 
        />
        <StatCard 
          title="Receita Hoje" 
          value={`R$ ${stats.revenueToday.toFixed(2).replace('.', ',')}`} 
          subtitle="Faturamento do dia" 
        />
        <StatCard 
          title="Clientes Recorrentes" 
          value={stats.returningCustomers} 
          subtitle="Voltaram a comprar" 
        />
        <StatCard 
          title="Ticket Médio" 
          value={`R$ ${(stats.revenueToday / stats.ordersToday).toFixed(2).replace('.', ',')}`} 
          subtitle="Valor médio por pedido" 
        />
      </div>

      {/* Orders by Status */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="gradient-border-card">
          <CardHeader>
            <CardTitle className="text-lg">Pedidos por Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{statusLabels[status]}</span>
                  <span className="text-sm font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="gradient-border-card">
          <CardHeader>
            <CardTitle className="text-lg">Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topProducts.slice(0, 5).map((product, index) => (
                <div key={product.productName} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {index + 1}. {product.productName}
                  </span>
                  <span className="text-sm font-medium">{product.quantity} un.</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="gradient-border-card">
        <CardHeader>
          <CardTitle className="text-lg">Últimos Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div 
                key={order.id} 
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.items.map(i => i.productName).join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">R$ {order.total.toFixed(2).replace('.', ',')}</p>
                  <p className="text-xs text-muted-foreground">{statusLabels[order.status]}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}