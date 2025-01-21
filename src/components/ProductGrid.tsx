import { useEffect, useState } from "react";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useToast } from "@/hooks/use-toast";
import { ProductList } from "./ProductList";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { products } from "./ProductData";

export const ProductGrid = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();

  // Simulate loading state
  useEffect(() => {
    console.log('Loading products...');
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('Products loaded!');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
    console.log(`تم تغيير تقييم المنتج ${productId} إلى:`, rating);
  };

  const formatCurrency = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount / 100) : price;
    return language === 'ar' 
      ? `${finalPrice} ${t.currency}`
      : `$${finalPrice}`;
  };

  const handleAddToCart = (product: any) => {
    console.log('تمت إضافة المنتج للسلة:', product);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تمت إضافة ${product.title} إلى سلة التسوق`,
    });
  };

  const handleShare = (product: any) => {
    console.log('تمت مشاركة المنتج:', product);
    toast({
      title: "مشاركة المنتج",
      description: `تمت مشاركة ${product.title}`,
    });
  };

  const handleFavorite = (product: any) => {
    console.log('تمت إضافة المنتج للمفضلة:', product);
    toast({
      title: "المفضلة",
      description: `تمت إضافة ${product.title} إلى المفضلة`,
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <ProductList
        products={products}
        ratings={ratings}
        onRatingChange={handleRatingChange}
        onAddToCart={handleAddToCart}
        onShare={handleShare}
        onFavorite={handleFavorite}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};