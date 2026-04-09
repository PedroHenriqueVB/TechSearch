import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PriceHistory } from '../types';

interface PriceHistoryChartProps {
  data: PriceHistory[];
  title?: string;
}

export function PriceHistoryChart({ data, title }: PriceHistoryChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
  };

  const formatPrice = (value: number) => {
    return `R$ ${value.toFixed(2)}`;
  };

  // Add unique index to each data point to prevent duplicate key warnings
  const chartData = data.map((item, index) => ({
    ...item,
    id: `${item.date}-${index}`
  }));

  const minPrice = Math.min(...data.map(d => d.price));
  const maxPrice = Math.max(...data.map(d => d.price));

  return (
    <div className="w-full">
      {title && <h3 className="mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            stroke="#9ca3af"
          />
          <YAxis 
            domain={[minPrice * 0.95, maxPrice * 1.05]}
            tickFormatter={(value) => `R$ ${value.toFixed(0)}`}
            stroke="#9ca3af"
          />
          <Tooltip 
            formatter={(value: number) => formatPrice(value)}
            labelFormatter={formatDate}
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #374151',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#f3f4f6' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 3 }}
            activeDot={{ r: 5 }}
            name="Preço"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
