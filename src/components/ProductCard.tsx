import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductBadges } from "./ProductBadges";
import { ProductActions } from "./ProductActions";
import { ProductPrice } from "./ProductPrice";
import { RatingSystem } from "./RatingSystem";
import { Badge } from "@/components/ui/badge";
import { Repeat } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  discount?: number;
  isNew?: boolean;
  isExchangeable?: boolean;
  exchangeDescription?: string;
}

interface ProductCardProps {
  product: Product;
  language: string;
  rating: number;
  onRatingChange: (rating: number) => void;
  onAddToCart: (product: Product) => void;
  onShare: (product: Product) => void;
  onFavorite: (product: Product) => void;
  formatCurrency: (price: number, discount?: number) => string;
}

export const ProductCard = ({
  product,
  language,
  rating,
  onRatingChange,
  onAddToCart,
  onShare,
  onFavorite,
  formatCurrency
}: ProductCardProps) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-all duration-300 dark:bg-gray-800 group animate-fade-in">
      <CardHeader className="flex-none relative">
        <CardTitle className="text-xl font-semibold text-primary dark:text-primary-foreground line-clamp-2">
          {product.title}
        </CardTitle>
        <div className="flex flex-wrap gap-2">
          <ProductBadges
            isNew={product.isNew}
            discount={product.discount}
            language={language}
          />
          {product.isExchangeable && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Repeat className="h-4 w-4" />
              قابل للتبادل
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-4">
        <div className="relative group-hover:transform group-hover:scale-105 transition-all duration-300 aspect-square mb-4 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <ProductActions
            onAddToCart={() => onAddToCart(product)}
            onShare={() => onShare(product)}
            onFavorite={() => onFavorite(product)}
          />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
          {product.description}
        </p>
        {product.isExchangeable && product.exchangeDescription && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium mb-1">يقبل التبادل مع:</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {product.exchangeDescription}
            </p>
          </div>
        )}
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <ProductPrice
              price={product.price}
              discount={product.discount}
              language={language}
              formatCurrency={formatCurrency}
            />
            <RatingSystem
              rating={rating}
              onRatingChange={onRatingChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};