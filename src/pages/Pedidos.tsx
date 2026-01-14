import { useState } from 'react';
import { mockOrders } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Plus, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { OrderForm } from '@/components/forms/OrderForm';
import type { Order, OrderStatus } from '@/types';
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from '@/lib/constants';

const columns: { id: OrderStatus; label: string }[] = [
  { id: 'recebido', label: ORDER_STATUS_LABELS.recebido },
  { id: 'em_preparo', label: ORDER_STATUS_LABELS.em_preparo },
  { id: 'pronto', label: ORDER_STATUS_LABELS.pronto },
  { id: 'entregue', label: ORDER_STATUS_LABELS.entregue },
  { id: 'cancelado', label: ORDER_STATUS_LABELS.cancelado },
];

function OrderCard({ 
  order, 
  onDragStart,
  onAdvance
}: { 
  order: Order; 
  onDragStart: (e: React.DragEvent, orderId: string) => void;
  onAdvance: (orderId: string, currentStatus: OrderStatus) => void;
}) {
  const lastFourDigits = order.customerWhatsapp.slice(-4);
  const orderTime = new Date(order.createdAt).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const canAdvance = order.status !== 'entregue' && order.status !== 'cancelado';

  return (
    <Card
      draggable
      onDragStart={(e) => onDragStart(e, order.id)}
      className="gradient-border-card cursor-grab active:cursor-grabbing hover:bg-muted/30 transition-colors relative group"
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
            {PAYMENT_METHOD_LABELS[order.paymentMethod]}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary">
              R$ {order.total.toFixed(2).replace('.', ',')}
            </span>
            {canAdvance && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-all opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdvance(order.id, order.status);
                }}
                title="Avançar etapa"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
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
  onAdvance,
}: {
  column: { id: OrderStatus; label: string };
  orders: Order[];
  onDragStart: (e: React.DragEvent, orderId: string) => void;
  onDrop: (e: React.DragEvent, status: OrderStatus) => void;
  onDragOver: (e: React.DragEvent) => void;
  onAdvance: (orderId: string, currentStatus: OrderStatus) => void;
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
            <OrderCard 
              key={order.id} 
              order={order} 
              onDragStart={onDragStart} 
              onAdvance={onAdvance}
            />
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

    updateOrderStatus(draggedOrderId, newStatus);
    setDraggedOrderId(null);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const handleAdvance = (orderId: string, currentStatus: OrderStatus) => {
    const statusFlow: OrderStatus[] = ['recebido', 'em_preparo', 'pronto', 'entregue'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    
    if (currentIndex !== -1 && currentIndex < statusFlow.length - 1) {
      const nextStatus = statusFlow[currentIndex + 1];
      updateOrderStatus(orderId, nextStatus);
    }
  };

  const handleCreateOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setIsDialogOpen(false);
  };

  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold gradient-text">Pedidos</h1>
            <p className="text-muted-foreground">Gerencie o fluxo de pedidos</p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Pedido
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Pedido Manual</DialogTitle>
            </DialogHeader>
            <OrderForm onClose={() => setIsDialogOpen(false)} onSubmit={handleCreateOrder} />
          </DialogContent>
        </Dialog>
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
            onAdvance={handleAdvance}
          />
        ))}
      </div>
    </div>
  );
}
