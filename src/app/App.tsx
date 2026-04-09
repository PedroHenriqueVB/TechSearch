import { useState, useMemo, useEffect } from "react";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { ComponentCard } from "./components/ComponentCard";
import { ComponentDetail } from "./components/ComponentDetail";
import { mockComponents } from "./data/mockData";
import { ComputerComponent, Category } from "./types";
import {
  Search,
  Filter,
  TrendingDown,
  Tag,
  Package,
  Monitor,
  Heart,
} from "lucide-react";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

const categories: Category[] = [
  "Todos",
  "Processador",
  "Placa de Vídeo",
  "Memória RAM",
  "Placa-Mãe",
  "SSD",
  "HD",
  "Fonte",
  "Gabinete",
  "Cooler",
];

const sortOptions = [
  { value: "relevant", label: "Mais Relevantes" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "discount", label: "Maior Desconto" },
  { value: "rating", label: "Melhor Avaliação" },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Todos");
  const [selectedComponent, setSelectedComponent] =
    useState<ComputerComponent | null>(null);
  const [sortBy, setSortBy] = useState("relevant");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (componentId: string) => {
    setWishlist((prev) =>
      prev.includes(componentId)
        ? prev.filter((id) => id !== componentId)
        : [...prev, componentId],
    );
  };

  const isInWishlist = (componentId: string) =>
    wishlist.includes(componentId);

  const filteredComponents = useMemo(() => {
    let filtered = mockComponents;

    // Filter by wishlist
    if (showWishlist) {
      filtered = filtered.filter((c) =>
        wishlist.includes(c.id),
      );
    }

    // Filter by category
    if (selectedCategory !== "Todos") {
      filtered = filtered.filter(
        (c) => c.category === selectedCategory,
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.brand.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query),
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort(
          (a, b) => a.currentPrice - b.currentPrice,
        );
        break;
      case "price-desc":
        filtered = [...filtered].sort(
          (a, b) => b.currentPrice - a.currentPrice,
        );
        break;
      case "discount":
        filtered = [...filtered].sort(
          (a, b) => a.priceChange - b.priceChange,
        );
        break;
      case "rating":
        filtered = [...filtered].sort(
          (a, b) => b.rating - a.rating,
        );
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
    showWishlist,
    wishlist,
  ]);

  const stats = useMemo(() => {
    const totalComponents = filteredComponents.length;
    const avgDiscount =
      filteredComponents
        .filter((c) => c.priceChange < 0)
        .reduce((sum, c) => sum + Math.abs(c.priceChange), 0) /
      (filteredComponents.filter((c) => c.priceChange < 0)
        .length || 1);
    const onSale = filteredComponents.filter(
      (c) => c.priceChange < 0,
    ).length;

    return { totalComponents, avgDiscount, onSale };
  }, [filteredComponents]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Monitor className="w-8 h-8 text-blue-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-sm w-4 h-3 flex items-center justify-center -mt-1">
                    <Search className="w-2.5 h-2.5 text-gray-800" />
                  </div>
                </div>
              </div>
              <h1 className="text-[#f9f9f9] text-[24px]">
                TechSearch
              </h1>
            </div>

            <Button
              variant={showWishlist ? "default" : "outline"}
              onClick={() => setShowWishlist(!showWishlist)}
              className="relative"
            >
              <Heart
                className={`w-5 h-5 mr-2 ${showWishlist ? "fill-current" : ""}`}
              />
              Lista de Desejos
              {wishlist.length > 0 && (
                <Badge className="ml-2 bg-red-500">
                  {wishlist.length}
                </Badge>
              )}
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nome, marca ou categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  Total de Produtos
                </p>
                <p className="text-2xl text-[#ffffff]">
                  {stats.totalComponents}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingDown className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  Em Promoção
                </p>
                <p className="text-2xl text-[#ffffff]">
                  {stats.onSale}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Tag className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  Desconto Médio
                </p>
                <p className="text-2xl text-[#ffffff]">
                  {stats.avgDiscount.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg">Categorias</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  selectedCategory === category
                    ? "default"
                    : "outline"
                }
                className="cursor-pointer hover:bg-blue-500/20 transition-colors px-4 py-2 text-[#ffffff]"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400">
            {showWishlist ? (
              <>
                Lista de Desejos: {filteredComponents.length}{" "}
                {filteredComponents.length === 1
                  ? "item"
                  : "itens"}
              </>
            ) : (
              <>
                {filteredComponents.length}{" "}
                {filteredComponents.length === 1
                  ? "resultado encontrado"
                  : "resultados encontrados"}
              </>
            )}
          </p>
          {showWishlist && wishlist.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowWishlist(false)}
            >
              Voltar para todos os produtos
            </Button>
          )}
        </div>

        {/* Components Grid */}
        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredComponents.map((component) => (
              <ComponentCard
                key={component.id}
                component={component}
                onClick={() => setSelectedComponent(component)}
                isInWishlist={isInWishlist(component.id)}
                onToggleWishlist={(e) => {
                  e.stopPropagation();
                  toggleWishlist(component.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            {showWishlist ? (
              <>
                <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">
                  Sua lista de desejos está vazia
                </h3>
                <p className="text-gray-400 mb-4">
                  Adicione produtos clicando no ícone de coração
                </p>
                <Button onClick={() => setShowWishlist(false)}>
                  Ver todos os produtos
                </Button>
              </>
            ) : (
              <>
                <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-400">
                  Tente ajustar seus filtros ou buscar por outro
                  termo
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ComponentDetail
        component={selectedComponent}
        open={!!selectedComponent}
        onClose={() => setSelectedComponent(null)}
        isInWishlist={
          selectedComponent
            ? isInWishlist(selectedComponent.id)
            : false
        }
        onToggleWishlist={() => {
          if (selectedComponent) {
            toggleWishlist(selectedComponent.id);
          }
        }}
      />
    </div>
  );
}