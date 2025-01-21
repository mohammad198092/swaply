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
    <Card className="group relative flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 dark:bg-gray-800 animate-fade-in">
      <CardHeader className="flex-none relative p-4 md:p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
        <CardTitle className="text-lg md:text-xl font-semibold text-primary dark:text-primary-foreground line-clamp-2 group-hover:text-primary-dark transition-colors">
          {product.title}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <ProductBadges
            isNew={product.isNew}
            discount={product.discount}
            language={language}
          />
          {product.isExchangeable && (
            <Badge variant="secondary" className="flex items-center gap-1 text-xs md:text-sm animate-scale-in">
              <Repeat className="h-3 w-3 md:h-4 md:w-4" />
              قابل للتبادل
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-3 md:p-6">
        <div className="relative aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            loading="lazy"
          />
          <ProductActions
            onAddToCart={() => onAddToCart(product)}
            onShare={() => onShare(product)}
            onFavorite={() => onFavorite(product)}
          />
        </div>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 md:mb-4 flex-grow line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {product.description}
        </p>
        {product.isExchangeable && product.exchangeDescription && (
          <div className="mb-3 md:mb-4 p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transform hover:scale-105 transition-transform">
            <p className="text-xs md:text-sm font-medium mb-1">يقبل التبادل مع:</p>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
              {product.exchangeDescription}
            </p>
          </div>
        )}
        <div className="mt-auto space-y-3 md:space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
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