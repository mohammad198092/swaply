import { useEffect, useState, useCallback } from "react";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { ProductList } from "./ProductList";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { products } from "./ProductData";
import { CartManager } from "./cart/CartManager";
import { useRatingManager } from "./ratings/RatingManager";
import { useSocialActions } from "./social/SocialActions";

export const ProductGrid = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const { ratings, handleRatingChange } = useRatingManager();
  const { handleShare, handleFavorite } = useSocialActions();

  const handleAddToCart = (product: any) => {
    console.log('🛒 إضافة منتج للسلة:', product);
  };

  useEffect(() => {
    console.log('🔍 بدء تحميل ProductGrid');
    console.log('👀 حالة اللغة الحالية:', language);
    console.log('📦 عدد المنتجات المتوفرة:', products.length);
    
    const preloadImages = async () => {
      const imagePromises = products.map(product => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve(null);
          };
          img.onerror = () => {
            console.error(`❌ فشل تحميل الصورة: ${product.image}`);
            resolve(null);
          };
          img.src = product.image;
        });
      });

      await Promise.all(imagePromises);
      setIsLoading(false);
      console.log('✅ اكتمل تحميل جميع الصور');
    };

    preloadImages();
    
    return () => {
      console.log('🔄 تم تنظيف ProductGrid');
    };
  }, [language]);

  const formatCurrency = (price: number, discount?: number) => {
    console.log('💰 حساب السعر:', { price, discount });
    
    const priceAfterDiscount = discount ? price - (price * discount / 100) : price;
    const adminFee = priceAfterDiscount * 0.02;
    const finalPrice = priceAfterDiscount + adminFee;
    
    console.log('📊 تفاصيل السعر:', {
      سعر_أصلي: price,
      خصم: discount,
      سعر_بعد_الخصم: priceAfterDiscount,
      رسوم_إدارية: adminFee,
      سعر_نهائي: finalPrice
    });
    
    return language === 'ar' 
      ? `${finalPrice.toFixed(2)} ${t.currency}`
      : `$${finalPrice.toFixed(2)}`;
  };

  if (isLoading) {
    console.log('⏳ جاري تحميل المنتجات...');
    return <LoadingState />;
  }

  if (!products || products.length === 0) {
    console.log('⚠️ لا توجد منتجات متاحة');
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <CartManager />
      <ProductList
        products={products}
        ratings={ratings}
        onRatingChange={handleRatingChange}
        onAddToCart={handleAddToCart}
        onShare={handleShare}
        onFavorite={handleFavorite}
        formatCurrency={formatCurrency}
        language={language}
      />
    </div>
  );
};