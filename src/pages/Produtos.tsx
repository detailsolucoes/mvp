import { useState } from 'react';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { Product } from '@/types';

function ProductForm({ product, onClose }: { product?: Product; onClose: () => void }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" defaultValue={product?.name} placeholder="Nome do produto" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input id="description" defaultValue={product?.description} placeholder="Descrição do produto" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select defaultValue={product?.categoryId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {mockCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Preço (R$)</Label>
        <Input 
          id="price" 
          type="number" 
          step="0.01"
          defaultValue={product?.price} 
          placeholder="0,00" 
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="active">Produto Ativo</Label>
        <Switch id="active" defaultChecked={product?.active ?? true} />
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

export default function Produtos() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const filteredProducts = mockProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    return mockCategories.find((c) => c.id === categoryId)?.name || '-';
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleNew = () => {
    setSelectedProduct(undefined);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Produtos</h1>
          <p className="text-muted-foreground">Gerencie seu cardápio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNew}>Novo Produto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
            </DialogHeader>
            <ProductForm product={selectedProduct} onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {mockCategories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Categories Summary */}
      <div className="flex flex-wrap gap-2">
        {mockCategories.map((category) => {
          const count = mockProducts.filter((p) => p.categoryId === category.id).length;
          return (
            <Button
              key={category.id}
              variant={categoryFilter === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter(categoryFilter === category.id ? 'all' : category.id)}
            >
              {category.name} ({count})
            </Button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className={`gradient-border-card ${!product.active ? 'opacity-60' : ''}`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{product.name}</CardTitle>
                {!product.active && (
                  <span className="text-xs px-2 py-1 bg-muted rounded">Inativo</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {product.description && (
                <p className="text-sm text-muted-foreground">{product.description}</p>
              )}
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-muted rounded">
                  {getCategoryName(product.categoryId)}
                </span>
                <span className="text-lg font-bold text-primary">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => handleEdit(product)}
              >
                Editar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
}
