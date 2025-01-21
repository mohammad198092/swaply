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

  useEffect(() => {
    console.log('Loading products...');
    console.log('Available products:', products);
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
    console.log(`Rating changed for product ${productId} to:`, rating);
  };

  const formatCurrency = (price: number, discount?: number) => {
    // Calculate price after discount if applicable
    const priceAfterDiscount = discount ? price - (price * discount / 100) : price;
    
    // Add 2% administrative fee (changed from 10%)
    const adminFee = priceAfterDiscount * 0.02;
    const finalPrice = priceAfterDiscount + adminFee;
    
    console.log(`Original price: ${price}, After discount: ${priceAfterDiscount}, Admin fee (2%): ${adminFee}, Final price: ${finalPrice}`);
    
    return language === 'ar' 
      ? `${finalPrice.toFixed(2)} ${t.currency}`
      : `$${finalPrice.toFixed(2)}`;
  };

  const handleAddToCart = (product: any) => {
    console.log('Product added to cart:', product);
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart`,
    });
  };

  const handleShare = (product: any) => {
    console.log('Product shared:', product);
    toast({
      title: "Share Product",
      description: `${product.title} has been shared`,
    });
  };

  const handleFavorite = (product: any) => {
    console.log('Product added to favorites:', product);
    toast({
      title: "Favorites",
      description: `${product.title} has been added to favorites`,
    });
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (!products || products.length === 0) {
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