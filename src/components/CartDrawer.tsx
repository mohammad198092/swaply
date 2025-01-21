import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  formatCurrency: (price: number, discount?: number) => string;
}

export const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  formatCurrency,
}: CartDrawerProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateTotal = useCallback(() => {
    console.log('💰 حساب إجمالي السلة لـ', items.length, 'منتج');
    return items.reduce((total, item) => {
      const itemPrice = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [items]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    console.log('🛒 بدء عملية الدفع');

    try {
      // محاكاة معالجة الطلب
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم تأكيد الطلب",
        description: "جاري تحويلك إلى صفحة الدفع",
      });
      
      onClose();
      navigate('/payment');
    } catch (error) {
      console.error('❌ خطأ في عملية الدفع:', error);
      toast({
        title: "حدث خطأ",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuantityUpdate = (id: number, newQuantity: number) => {
    console.log(`تحديث الكمية للمنتج ${id} إلى ${newQuantity}`);
    onUpdateQuantity(id, Math.max(0, newQuantity));
  };

  const handleRemoveItem = (id: number) => {
    console.log(`حذف المنتج ${id} من السلة`);
    onRemoveItem(id);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="text-right">
          <DrawerTitle className="text-xl font-bold">سلة المشتريات</DrawerTitle>
          <DrawerDescription>
            {items.length === 0
              ? "السلة فارغة"
              : `${items.length} منتجات في السلة`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b py-4 animate-fade-in"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatCurrency(item.price, item.discount)}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="mr-auto"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DrawerFooter className="border-t pt-4">
          <div className="mb-4 flex justify-between text-lg font-semibold">
            <span>المجموع:</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full"
            disabled={items.length === 0 || isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                جاري المعالجة...
              </div>
            ) : (
              'متابعة عملية الشراء'
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              متابعة التسوق
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
