import { useEffect, useState } from "react";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useToast } from "@/hooks/use-toast";
import { ProductList } from "./ProductList";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { products } from "./ProductData";
import { CartDrawer } from "./CartDrawer";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

export const ProductGrid = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();

  // فحص تحميل المكون
  useEffect(() => {
    console.log('🔍 بدء تحميل ProductGrid');
    console.log('👀 حالة اللغة الحالية:', language);
    console.log('📦 عدد المنتجات المتوفرة:', products.length);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('✅ اكتمل تحميل ProductGrid');
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      console.log('🔄 تم تنظيف ProductGrid');
    };
  }, [language]);

  // فحص تغيير التقييمات
  const handleRatingChange = (productId: number, rating: number) => {
    console.log('⭐ تم تغيير تقييم المنتج:', { productId, rating });
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
  };

  // فحص تنسيق العملة
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

  // فحص إضافة منتج للسلة
  const handleAddToCart = (product: any) => {
    console.log('🛒 محاولة إضافة منتج للسلة:', product);
    
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      console.log('📝 تحديث كمية المنتج الموجود في السلة');
      setCartItems(prev =>
        prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      console.log('➕ إضافة منتج جديد للسلة');
      setCartItems(prev => [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
          discount: product.discount,
        },
      ]);
    }
    
    console.log('✅ تم تحديث السلة بنجاح');
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.title} إلى سلة المشتريات`,
    });
  };

  // فحص تحديث الكمية
  const handleUpdateQuantity = (id: number, quantity: number) => {
    console.log('🔄 تحديث كمية المنتج:', { id, quantity });
    
    if (quantity === 0) {
      handleRemoveFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // فحص حذف منتج من السلة
  const handleRemoveFromCart = (id: number) => {
    console.log('🗑️ حذف منتج من السلة:', id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "تم الحذف من السلة",
      description: "تم حذف المنتج من سلة المشتريات",
    });
  };

  // فحص مشاركة المنتج
  const handleShare = (product: any) => {
    console.log('🔗 مشاركة المنتج:', product);
    toast({
      title: "مشاركة المنتج",
      description: `تم مشاركة ${product.title}`,
    });
  };

  // فحص إضافة للمفضلة
  const handleFavorite = (product: any) => {
    console.log('❤️ إضافة منتج للمفضلة:', product);
    toast({
      title: "المفضلة",
      description: `تم إضافة ${product.title} إلى المفضلة`,
    });
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
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => {
            console.log('🛒 فتح/إغلاق سلة المشتريات');
            setIsCartOpen(true);
          }}
          variant="outline"
          className="relative"
        >
          <ShoppingCart className="h-5 w-5 ml-2" />
          سلة المشتريات
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </Button>
      </div>
      
      <ProductList
        products={products}
        ratings={ratings}
        onRatingChange={handleRatingChange}
        onAddToCart={handleAddToCart}
        onShare={handleShare}
        onFavorite={handleFavorite}
        formatCurrency={formatCurrency}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => {
          console.log('🛒 إغلاق سلة المشتريات');
          setIsCartOpen(false);
        }}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};