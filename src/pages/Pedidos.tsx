import { useState } from 'react';
import { mockOrders } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import type { Order, OrderStatus } from '@/types';

const columns: { id: OrderStatus; label: string }[] = [
  { id: 'recebido', label: 'Recebido' },
  { id: 'em_preparo', label: 'Em Preparo' },
  { id: 'pronto', label: 'Pronto / Saiu' },
  { id: 'entregue', label: 'Entregue' },
  { id: 'cancelado', label: 'Cancelado' },
];

const paymentLabels: Record<string, string> = {
  pix: 'PIX',
  dinheiro: 'Dinheiro',
  cartao: 'Cartão',
  pendente: 'Pendente',
};

function OrderCard({ 
  order, 
  onDragStart 
}: { 
  order: Order; 
  onDragStart: (e: React.DragEvent, orderId: string) => void;
}) {
  const lastFourDigits = order.customerWhatsapp.slice(-4);
  const orderTime = new Date(order.createdAt).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, order.id)}
      className="gradient-border-card cursor-grab active:cursor-grabbing hover:bg-muted/30 transition-colors"
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium">{order.customerName}</p>
            <p className="text-xs text-muted-foreground">****{lastFourDigits}</p>
          </div>
          <span className="text-xs text-muted-foreground">{orderTime}</span>
        </div>

        <div className="text-sm text-muted-foreground">
          {order.items.slice(0, 3).map((item, i) => (
            <p key={item.id}>
              {item.quantity}x {item.productName}
            </p>
          ))}
          {order.items.length > 3 && (
            <p className="text-xs">+{order.items.length - 3} item(s)</p>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-xs px-2 py-1 bg-muted rounded">
            {paymentLabels[order.paymentMethod]}
          </span>
          <span className="font-bold text-primary">
            R$ {order.total.toFixed(2).replace('.', ',')}
          </span>
        </div>

        {order.notes && (
          <p className="text-xs text-muted-foreground italic border-l-2 border-primary pl-2">
            {order.notes}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function KanbanColumn({
  column,
  orders,
  onDragStart,
  onDrop,
  onDragOver,
}: {
  column: { id: OrderStatus; label: string };
  orders: Order[];
  onDragStart: (e: React.DragEvent, orderId: string) => void;
  onDrop: (e: React.DragEvent, status: OrderStatus) => void;
  onDragOver: (e: React.DragEvent) => void;
}) {
  return (
    <div
      className="flex-1 min-w-[280px] max-w-[350px]"
      onDrop={(e) => onDrop(e, column.id)}
      onDragOver={onDragOver}
    >
      <Card className="h-full bg-card border-border">
        <CardHeader className="pb-2 border-b border-border">
          <CardTitle className="text-sm font-medium flex items-center justify-between">
            <span>{column.label}</span>
            <span className="text-xs px-2 py-1 bg-muted rounded-full">
              {orders.length}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 space-y-2 min-h-[calc(100vh-300px)] overflow-y-auto">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onDragStart={onDragStart} />
          ))}
          {orders.length === 0 && (
            <div className="py-8 text-center text-muted-foreground text-sm">
              Nenhum pedido
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function Pedidos() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [draggedOrderId, setDraggedOrderId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    setDraggedOrderId(orderId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: OrderStatus) => {
    e.preventDefault();
    if (!draggedOrderId) return;

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === draggedOrderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
    setDraggedOrderId(null);

    // Here we would trigger a webhook for n8n integration
    console.log(`Order ${draggedOrderId} moved to ${newStatus} - webhook would be triggered`);
  };

  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ShoppingCart className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold gradient-text">Pedidos</h1>
          <p className="text-muted-foreground">Arraste os pedidos para alterar o status</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            orders={getOrdersByStatus(column.id)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        ))}
      </div>
    </div>
  );
}