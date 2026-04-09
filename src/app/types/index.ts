export interface PriceHistory {
  date: string;
  price: number;
  store: string;
}

export interface ComputerComponent {
  id: string;
  name: string;
  category: string;
  brand: string;
  currentPrice: number;
  lowestPrice: number;
  highestPrice: number;
  image: string;
  specs: Record<string, string>;
  stores: string[];
  priceHistory: PriceHistory[];
  priceChange: number; // percentage
  rating: number;
  reviews: number;
}

export type Category = 
  | 'Todos'
  | 'Processador'
  | 'Placa de Vídeo'
  | 'Memória RAM'
  | 'Placa-Mãe'
  | 'SSD'
  | 'HD'
  | 'Fonte'
  | 'Gabinete'
  | 'Cooler';
