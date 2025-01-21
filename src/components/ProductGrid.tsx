import { useState } from "react";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  discount?: number;
  isNew?: boolean;
}

export const ProductGrid = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  
  const products: Product[] = [
    {
      id: 1,
      title: t.products.smartphone.title,
      price: 999,
      image: "/placeholder.svg",
      description: t.products.smartphone.description,
      discount: 10,
      isNew: true
    },
    {
      id: 2,
      title: t.products.laptop.title,
      price: 1499,
      image: "/placeholder.svg",
      description: t.products.laptop.description,
      isNew: true
    },
    {
      id: 3,
      title: t.products.headphones.title,
      price: 199,
      image: "/placeholder.svg",
      description: t.products.headphones.description,
      discount: 15
    }
  ];

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
    console.log(`Rating for product ${productId} changed to:`, rating);
  };

  const formatCurrency = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount / 100) : price;
    return language === 'ar' 
      ? `${finalPrice} ${t.currency}`
      : `$${finalPrice}`;
  };

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    toast({
      title: language === 'ar' ? "تمت الإضافة للسلة" : "Added to Cart",
      description: language === 'ar' 
        ? `تمت إضافة ${product.title} إلى سلة التسوق`
        : `${product.title} has been added to your cart`,
    });
  };

  const handleShare = (product: Product) => {
    console.log('Sharing product:', product);
    toast({
      title: language === 'ar' ? "مشاركة المنتج" : "Share Product",
      description: language === 'ar' 
        ? `تمت مشاركة ${product.title}`
        : `${product.title} has been shared`,
    });
  };

  const handleFavorite = (product: Product) => {
    console.log('Adding to favorites:', product);
    toast({
      title: language === 'ar' ? "المفضلة" : "Favorites",
      description: language === 'ar' 
        ? `تمت إضافة ${product.title} إلى المفضلة`
        : `${product.title} has been added to favorites`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            language={language}
            rating={ratings[product.id] || 0}
            onRatingChange={(rating) => handleRatingChange(product.id, rating)}
            onAddToCart={handleAddToCart}
            onShare={handleShare}
            onFavorite={handleFavorite}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  );
};