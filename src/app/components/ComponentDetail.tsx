import { ComputerComponent } from '../types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { PriceHistoryChart } from './PriceHistoryChart';
import { Star, ExternalLink, TrendingDown, TrendingUp, Heart } from 'lucide-react';

interface ComponentDetailProps {
  component: ComputerComponent | null;
  open: boolean;
  onClose: () => void;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
}

export function ComponentDetail({ component, open, onClose, isInWishlist, onToggleWishlist }: ComponentDetailProps) {
  if (!component) return null;

  const isPriceDown = component.priceChange < 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{component.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{component.category}</Badge>
                <span>•</span>
                <span>{component.brand}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{component.rating} ({component.reviews} avaliações)</span>
                </div>
              </DialogDescription>
            </div>
            <Button
              variant={isInWishlist ? "default" : "outline"}
              size="sm"
              onClick={onToggleWishlist}
            >
              <Heart className={`w-4 h-4 mr-2 ${isInWishlist ? 'fill-current' : ''}`} />
              {isInWishlist ? 'Remover da Lista' : 'Adicionar à Lista'}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-900">
            <img 
              src={component.image} 
              alt={component.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Price Info */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex items-end gap-3 mb-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Preço Atual</p>
                <span className="text-4xl text-blue-500">
                  R$ {component.currentPrice.toFixed(2)}
                </span>
              </div>
              <div className={`flex items-center text-lg mb-2 ${isPriceDown ? 'text-green-500' : 'text-red-500'}`}>
                {isPriceDown ? <TrendingDown className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                <span>{Math.abs(component.priceChange).toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Menor Preço (6 meses)</p>
                <p className="text-xl text-green-500">R$ {component.lowestPrice.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Maior Preço (6 meses)</p>
                <p className="text-xl text-red-500">R$ {component.highestPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history">Histórico de Preços</TabsTrigger>
              <TabsTrigger value="specs">Especificações</TabsTrigger>
              <TabsTrigger value="stores">Lojas</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-4">
              <PriceHistoryChart 
                data={component.priceHistory} 
                title="Variação de Preço (Últimos 6 Meses)"
              />
              <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-400">
                  Economia máxima: <span className="text-green-500">
                    R$ {(component.highestPrice - component.lowestPrice).toFixed(2)}
                  </span> ({((component.highestPrice - component.lowestPrice) / component.highestPrice * 100).toFixed(1)}%)
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(component.specs).map(([key, value]) => (
                  <div key={key} className="p-4 bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">{key}</p>
                    <p className="text-lg text-[#ffffff]">{value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stores" className="mt-4">
              <div className="space-y-3">
                {component.stores.map((store) => (
                  <div key={store} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className="text-[#4c3232] text-[#4f3535] text-[#593d3d] text-[#5f4343] text-[#745656] text-[#7b5e5e] text-[#bca1a1] text-[#cbb2b2] text-[#f9ebeb] text-[#fff8f8] text-[#fffefe] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff] text-[#ffffff]" variant="outline">{store}</Badge>
                      <span className="text-lg text-[#ffffff]">R$ {component.currentPrice.toFixed(2)}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visitar
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
