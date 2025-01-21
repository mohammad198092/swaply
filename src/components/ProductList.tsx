import { ProductCard } from "./ProductCard";
import { useLanguage } from '@/lib/language-context';

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

interface ProductListProps {
  products: Product[];
  ratings: { [key: number]: number };
  onRatingChange: (productId: number, rating: number) => void;
  onAddToCart: (product: Product) => void;
  onShare: (product: Product) => void;
  onFavorite: (product: Product) => void;
  formatCurrency: (price: number, discount?: number) => string;
}

export const ProductList = ({
  products,
  ratings,
  onRatingChange,
  onAddToCart,
  onShare,
  onFavorite,
  formatCurrency
}: ProductListProps) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          language={language}
          rating={ratings[product.id] || 0}
          onRatingChange={(rating) => onRatingChange(product.id, rating)}
          onAddToCart={onAddToCart}
          onShare={onShare}
          onFavorite={onFavorite}
          formatCurrency={formatCurrency}
        />
      ))}
    </div>
  );
};