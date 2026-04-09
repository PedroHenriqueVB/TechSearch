import { ComputerComponent } from '../types';

// Gerar histórico de preços realista
const generatePriceHistory = (basePrice: number, months: number = 6) => {
  const history = [];
  const today = new Date();
  const stores = ['Kabum', 'Pichau', 'Terabyte', 'Amazon'];
  
  for (let i = months * 30; i >= 0; i -= 7) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Variação de preço realista (-20% a +30%)
    const variation = (Math.random() * 0.5 - 0.2);
    const price = basePrice * (1 + variation);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price: Math.round(price * 100) / 100,
      store: stores[Math.floor(Math.random() * stores.length)]
    });
  }
  
  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const calculateStats = (priceHistory: any[]) => {
  const prices = priceHistory.map(p => p.price);
  const currentPrice = prices[prices.length - 1];
  const previousPrice = prices[prices.length - 2] || currentPrice;
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  
  return { currentPrice, lowestPrice, highestPrice, priceChange };
};

export const mockComponents: ComputerComponent[] = [
  {
    id: '1',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'Processador',
    brand: 'AMD',
    image: 'https://images.unsplash.com/photo-1613483187550-1458bbdb0996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBTUQlMjBSeXplbiUyMHByb2Nlc3NvcnxlbnwxfHx8fDE3NzI3MTc3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Núcleos': '8',
      'Threads': '16',
      'Clock Base': '4.2 GHz',
      'Clock Boost': '5.0 GHz',
      'Cache': '96MB',
      'TDP': '120W'
    },
    stores: ['Kabum', 'Pichau', 'Terabyte'],
    rating: 4.9,
    reviews: 1247,
    ...calculateStats(generatePriceHistory(2499)),
    priceHistory: generatePriceHistory(2499)
  },
  {
    id: '2',
    name: 'NVIDIA GeForce RTX 4070 Ti',
    category: 'Placa de Vídeo',
    brand: 'NVIDIA',
    image: 'https://images.unsplash.com/photo-1578286788444-8c1487fcd823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOVklESUElMjBncmFwaGljcyUyMGNhcmQlMjBHUFV8ZW58MXx8fHwxNzcyNzE3NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'VRAM': '12GB GDDR6X',
      'Clock': '2310 MHz',
      'CUDA Cores': '7680',
      'TDP': '285W',
      'Interface': 'PCIe 4.0'
    },
    stores: ['Kabum', 'Pichau', 'Amazon'],
    rating: 4.7,
    reviews: 892,
    ...calculateStats(generatePriceHistory(4899)),
    priceHistory: generatePriceHistory(4899)
  },
  {
    id: '3',
    name: 'Corsair Vengeance DDR5 32GB',
    category: 'Memória RAM',
    brand: 'Corsair',
    image: 'https://images.unsplash.com/photo-1672165407836-4c376e7d72c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMFJBTSUyMG1lbW9yeXxlbnwxfHx8fDE3NzI2MDkwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Capacidade': '32GB (2x16GB)',
      'Tipo': 'DDR5',
      'Frequência': '6000 MHz',
      'Latência': 'CL36',
      'RGB': 'Sim'
    },
    stores: ['Kabum', 'Pichau', 'Terabyte', 'Amazon'],
    rating: 4.8,
    reviews: 643,
    ...calculateStats(generatePriceHistory(899)),
    priceHistory: generatePriceHistory(899)
  },
  {
    id: '4',
    name: 'Samsung 990 PRO 2TB',
    category: 'SSD',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1756836857559-4c8161fe07f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTU0QlMjBzdG9yYWdlJTIwZHJpdmV8ZW58MXx8fHwxNzcyNzE3NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Capacidade': '2TB',
      'Interface': 'NVMe PCIe 4.0',
      'Leitura': '7450 MB/s',
      'Gravação': '6900 MB/s',
      'DRAM': 'Sim'
    },
    stores: ['Kabum', 'Amazon', 'Terabyte'],
    rating: 4.9,
    reviews: 1521,
    ...calculateStats(generatePriceHistory(1099)),
    priceHistory: generatePriceHistory(1099)
  },
  {
    id: '5',
    name: 'ASUS ROG STRIX B650-A',
    category: 'Placa-Mãe',
    brand: 'ASUS',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vdGhlcmJvYXJkfGVufDF8fHx8MTc3MjY4NTIxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Socket': 'AM5',
      'Chipset': 'B650',
      'Formato': 'ATX',
      'Slots RAM': '4x DDR5',
      'M.2': '3x'
    },
    stores: ['Kabum', 'Pichau'],
    rating: 4.6,
    reviews: 387,
    ...calculateStats(generatePriceHistory(1599)),
    priceHistory: generatePriceHistory(1599)
  },
  {
    id: '6',
    name: 'Intel Core i9-14900K',
    category: 'Processador',
    brand: 'Intel',
    image: 'https://images.unsplash.com/photo-1613483187550-1458bbdb0996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBTUQlMjBSeXplbiUyMHByb2Nlc3NvcnxlbnwxfHx8fDE3NzI3MTc3MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Núcleos': '24 (8P+16E)',
      'Threads': '32',
      'Clock Base': '3.2 GHz',
      'Clock Boost': '6.0 GHz',
      'Cache': '36MB',
      'TDP': '125W'
    },
    stores: ['Kabum', 'Pichau', 'Terabyte', 'Amazon'],
    rating: 4.8,
    reviews: 956,
    ...calculateStats(generatePriceHistory(3299)),
    priceHistory: generatePriceHistory(3299)
  },
  {
    id: '7',
    name: 'AMD Radeon RX 7900 XTX',
    category: 'Placa de Vídeo',
    brand: 'AMD',
    image: 'https://images.unsplash.com/photo-1578286788444-8c1487fcd823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOVklESUElMjBncmFwaGljcyUyMGNhcmQlMjBHUFV8ZW58MXx8fHwxNzcyNzE3NzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'VRAM': '24GB GDDR6',
      'Clock': '2500 MHz',
      'Stream Processors': '6144',
      'TDP': '355W',
      'Interface': 'PCIe 4.0'
    },
    stores: ['Kabum', 'Pichau', 'Amazon'],
    rating: 4.5,
    reviews: 521,
    ...calculateStats(generatePriceHistory(5499)),
    priceHistory: generatePriceHistory(5499)
  },
  {
    id: '8',
    name: 'Corsair RM1000e 1000W',
    category: 'Fonte',
    brand: 'Corsair',
    image: 'https://images.unsplash.com/photo-1588382472578-8d8b337b277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHBvd2VyJTIwc3VwcGx5fGVufDF8fHx8MTc3MjYxMjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Potência': '1000W',
      'Certificação': '80 Plus Gold',
      'Modular': 'Totalmente',
      'PFC': 'Ativo',
      'Garantia': '10 anos'
    },
    stores: ['Kabum', 'Pichau', 'Terabyte'],
    rating: 4.9,
    reviews: 734,
    ...calculateStats(generatePriceHistory(899)),
    priceHistory: generatePriceHistory(899)
  },
  {
    id: '9',
    name: 'Kingston Fury Beast 16GB DDR4',
    category: 'Memória RAM',
    brand: 'Kingston',
    image: 'https://images.unsplash.com/photo-1672165407836-4c376e7d72c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMFJBTSUyMG1lbW9yeXxlbnwxfHx8fDE3NzI2MDkwMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Capacidade': '16GB (2x8GB)',
      'Tipo': 'DDR4',
      'Frequência': '3200 MHz',
      'Latência': 'CL16',
      'RGB': 'Não'
    },
    stores: ['Kabum', 'Pichau', 'Terabyte', 'Amazon'],
    rating: 4.7,
    reviews: 2145,
    ...calculateStats(generatePriceHistory(329)),
    priceHistory: generatePriceHistory(329)
  },
  {
    id: '10',
    name: 'WD Black SN850X 1TB',
    category: 'SSD',
    brand: 'Western Digital',
    image: 'https://images.unsplash.com/photo-1756836857559-4c8161fe07f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTU0QlMjBzdG9yYWdlJTIwZHJpdmV8ZW58MXx8fHwxNzcyNzE3NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Capacidade': '1TB',
      'Interface': 'NVMe PCIe 4.0',
      'Leitura': '7300 MB/s',
      'Gravação': '6300 MB/s',
      'DRAM': 'Sim'
    },
    stores: ['Kabum', 'Amazon', 'Terabyte', 'Pichau'],
    rating: 4.8,
    reviews: 1089,
    ...calculateStats(generatePriceHistory(649)),
    priceHistory: generatePriceHistory(649)
  },
  {
    id: '11',
    name: 'Seagate Barracuda 2TB',
    category: 'HD',
    brand: 'Seagate',
    image: 'https://images.unsplash.com/photo-1674303377230-204108fa43c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkJTIwZGlzayUyMGRyaXZlfGVufDF8fHx8MTc3MjcxNzcxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Capacidade': '2TB',
      'RPM': '7200',
      'Cache': '256MB',
      'Interface': 'SATA 6Gb/s',
      'Garantia': '2 anos'
    },
    stores: ['Kabum', 'Pichau', 'Amazon'],
    rating: 4.4,
    reviews: 3421,
    ...calculateStats(generatePriceHistory(449)),
    priceHistory: generatePriceHistory(449)
  },
  {
    id: '12',
    name: 'NZXT Kraken X63',
    category: 'Cooler',
    brand: 'NZXT',
    image: 'https://images.unsplash.com/photo-1754928504713-4d90d3899229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDUFUlMjBjb29sZXIlMjByYWRpYXRvcnxlbnwxfHx8fDE3NzI3MTc3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Tipo': 'Water Cooler',
      'Radiador': '280mm',
      'Ventoinhas': '2x 140mm',
      'RGB': 'Sim',
      'Socket': 'Intel/AMD'
    },
    stores: ['Kabum', 'Pichau', 'Terabyte'],
    rating: 4.7,
    reviews: 612,
    ...calculateStats(generatePriceHistory(799)),
    priceHistory: generatePriceHistory(799)
  },
  {
    id: '13',
    name: 'Lian Li O11 Dynamic EVO',
    category: 'Gabinete',
    brand: 'Lian Li',
    image: 'https://images.unsplash.com/photo-1760708825878-9e7ecf31565a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQQyUyMGNhc2UlMjB0b3dlcnxlbnwxfHx8fDE3NzI3MTc3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Formato': 'Mid Tower',
      'Painel Lateral': 'Vidro Temperado',
      'Ventoinhas': '3x 120mm (incluídas)',
      'Suporte Radiador': 'Até 360mm',
      'USB': 'USB-C frontal'
    },
    stores: ['Kabum', 'Pichau'],
    rating: 4.9,
    reviews: 845,
    ...calculateStats(generatePriceHistory(1199)),
    priceHistory: generatePriceHistory(1199)
  },
  {
    id: '14',
    name: 'MSI MAG B760 Tomahawk',
    category: 'Placa-Mãe',
    brand: 'MSI',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMG1vdGhlcmJvYXJkfGVufDF8fHx8MTc3MjY4NTIxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Socket': 'LGA1700',
      'Chipset': 'B760',
      'Formato': 'ATX',
      'Slots RAM': '4x DDR5',
      'M.2': '4x'
    },
    stores: ['Kabum', 'Pichau', 'Terabyte'],
    rating: 4.6,
    reviews: 534,
    ...calculateStats(generatePriceHistory(1399)),
    priceHistory: generatePriceHistory(1399)
  },
  {
    id: '15',
    name: 'be quiet! Dark Rock Pro 4',
    category: 'Cooler',
    brand: 'be quiet!',
    image: 'https://images.unsplash.com/photo-1754928504713-4d90d3899229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDUFUlMjBjb29sZXIlMjByYWRpYXRvcnxlbnwxfHx8fDE3NzI3MTc3MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    specs: {
      'Tipo': 'Air Cooler',
      'Ventoinhas': '2x 135mm/120mm',
      'Altura': '162.8mm',
      'TDP': '250W',
      'Socket': 'Intel/AMD'
    },
    stores: ['Kabum', 'Amazon', 'Terabyte'],
    rating: 4.8,
    reviews: 421,
    ...calculateStats(generatePriceHistory(549)),
    priceHistory: generatePriceHistory(549)
  }
];
