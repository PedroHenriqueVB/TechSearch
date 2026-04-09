import { ComputerComponent } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingDown, TrendingUp, Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from './ui/button';

interface ComponentCardProps {
  component: ComputerComponent;
  onClick: () => void;
  isInWishlist: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
}

export function ComponentCard({ component, onClick, isInWishlist, onToggleWishlist }: ComponentCardProps) {
  const isPriceDown = component.priceChange < 0;

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-gray-900">
          <img 
            src={component.image} 
            alt={component.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 right-3" variant="secondary">
            {component.category}
          </Badge>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-3 left-3 rounded-full"
            onClick={onToggleWishlist}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-1 line-clamp-2">{component.name}</CardTitle>
        <CardDescription className="mb-3">{component.brand}</CardDescription>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm">{component.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({component.reviews} avaliações)</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-end gap-2">
            <span className="text-2xl text-blue-500">
              R$ {component.currentPrice.toFixed(2)}
            </span>
            <div className={`flex items-center text-sm ${isPriceDown ? 'text-green-500' : 'text-red-500'}`}>
              {isPriceDown ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
              <span>{Math.abs(component.priceChange).toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            Menor: <span className="text-green-500">R$ {component.lowestPrice.toFixed(2)}</span> | 
            Maior: <span className="text-red-500"> R$ {component.highestPrice.toFixed(2)}</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {component.stores.slice(0, 3).map((store) => (
              <Badge key={store} variant="outline" className="text-xs">
                {store}
              </Badge>
            ))}
          </div>

          <Button className="w-full mt-2" variant="outline" size="sm">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Ver Ofertas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
