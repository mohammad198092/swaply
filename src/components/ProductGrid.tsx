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
    const priceAfterDiscount = discount ? price - (price * discount / 100) : price;
    const adminFee = priceAfterDiscount * 0.02;
    const finalPrice = priceAfterDiscount + adminFee;
    
    console.log(`Original price: ${price}, After discount: ${priceAfterDiscount}, Admin fee (2%): ${adminFee}, Final price: ${finalPrice}`);
    
    return language === 'ar' 
      ? `${finalPrice.toFixed(2)} ${t.currency}`
      : `$${finalPrice.toFixed(2)}`;
  };

  const handleAddToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
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
    
    console.log('Product added to cart:', product);
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.title} إلى سلة المشتريات`,
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    console.log(`Updated quantity for product ${id} to:`, quantity);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    console.log(`Removed product ${id} from cart`);
    toast({
      title: "تم الحذف من السلة",
      description: "تم حذف المنتج من سلة المشتريات",
    });
  };

  const handleShare = (product: any) => {
    console.log('Product shared:', product);
    toast({
      title: "مشاركة المنتج",
      description: `تم مشاركة ${product.title}`,
    });
  };

  const handleFavorite = (product: any) => {
    console.log('Product added to favorites:', product);
    toast({
      title: "المفضلة",
      description: `تم إضافة ${product.title} إلى المفضلة`,
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
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setIsCartOpen(true)}
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
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        formatCurrency={formatCurrency}
      />
    </div>
  );
};