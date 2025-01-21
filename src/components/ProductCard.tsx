import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductHeader } from "./product/ProductHeader";
import { ProductImage } from "./product/ProductImage";
import { ProductDetails } from "./product/ProductDetails";
import { ProductFooter } from "./product/ProductFooter";

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
  status?: 'swapped' | 'sold' | 'available';
  seller: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
  };
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
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    console.log('فشل تحميل الصورة:', product.image);
    setImageError(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('.seller-info')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      className="group relative flex flex-col h-full overflow-hidden hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 dark:bg-gray-800 animate-fade-in cursor-pointer"
      onClick={handleCardClick}
    >
      <ProductHeader
        title={product.title}
        isNew={product.isNew}
        discount={product.discount}
        isExchangeable={product.isExchangeable}
        status={product.status}
        language={language}
      />
      
      <CardContent className="flex-grow flex flex-col p-3 md:p-6">
        {!imageError ? (
          <ProductImage
            image={product.image}
            title={product.title}
            onImageError={handleImageError}
            onAddToCart={() => onAddToCart(product)}
            onShare={() => onShare(product)}
            onFavorite={() => onFavorite(product)}
          />
        ) : (
          <div className="w-full h-full aspect-square flex items-center justify-center text-gray-400">
            صورة غير متوفرة
          </div>
        )}
        
        <ProductDetails
          description={product.description}
          isExchangeable={product.isExchangeable}
          exchangeDescription={product.exchangeDescription}
        />
        
        <ProductFooter
          price={product.price}
          discount={product.discount}
          language={language}
          rating={rating}
          onRatingChange={onRatingChange}
          seller={product.seller}
          formatCurrency={formatCurrency}
        />
      </CardContent>
    </Card>
  );
};