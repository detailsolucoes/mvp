import { useState } from 'react';
import { mockCustomers } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Users } from 'lucide-react';
import type { Customer } from '@/types';

function CustomerForm({ customer, onClose }: { customer?: Customer; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" defaultValue={customer?.name} placeholder="Nome do cliente" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="whatsapp">WhatsApp</Label>
        <Input id="whatsapp" defaultValue={customer?.whatsapp} placeholder="11999999999" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <Input id="address" defaultValue={customer?.address} placeholder="Endereço completo" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Input id="notes" defaultValue={customer?.notes} placeholder="Observações sobre o cliente" />
      </div>
      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={onClose} className="flex-1">
          Salvar
        </Button>
      </div>
    </div>
  );
}

export default function Clientes() {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>();

  const filteredCustomers = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.whatsapp.includes(search) ||
      c.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setSelectedCustomer(undefined);
    setIsDialogOpen(true);
  };

  const handleWhatsApp = (whatsapp: string) => {
    window.open(`https://wa.me/55${whatsapp}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold gradient-text">Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua base de clientes</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Buscar por nome, WhatsApp ou endereço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="gradient-border-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{customer.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">WhatsApp</p>
                <p className="font-medium">
                  ({customer.whatsapp.slice(0, 2)}) {customer.whatsapp.slice(2, 7)}-{customer.whatsapp.slice(7)}
                </p>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground">Endereço</p>
                <p className="font-medium">{customer.address}</p>
              </div>
              {customer.notes && (
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">Observações</p>
                  <p className="font-medium">{customer.notes}</p>
                </div>
              )}
              <div className="flex gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Pedidos</p>
                  <p className="font-medium">{customer.orderCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Gasto</p>
                  <p className="font-medium">R$ {customer.totalSpent.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleWhatsApp(customer.whatsapp)}
                >
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEdit(customer)}
                >
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum cliente encontrado</p>
        </div>
      )}
    </div>
  );
}