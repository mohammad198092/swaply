import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CartDrawer } from "../CartDrawer";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

export const CartManager = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

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
    
    toast({
      title: "تمت الإضافة إلى السلة",
      description: `تم إضافة ${product.title} إلى سلة المشتريات`,
    });
  };

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

  const handleRemoveFromCart = (id: number) => {
    console.log('🗑️ حذف منتج من السلة:', id);
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "تم الحذف من السلة",
      description: "تم حذف المنتج من سلة المشتريات",
    });
  };

  return (
    <>
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

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        formatCurrency={(price) => `${price} ريال`}
      />
    </>
  );
};