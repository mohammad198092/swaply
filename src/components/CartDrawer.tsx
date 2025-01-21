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

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const itemPrice = item.discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    console.log("التحويل إلى صفحة الدفع");
    toast({
      title: "تم تأكيد الطلب",
      description: "جاري تحويلك إلى صفحة الدفع",
    });
    onClose();
    navigate('/payment');
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
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="mr-auto"
                    onClick={() => onRemoveItem(item.id)}
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
            disabled={items.length === 0}
          >
            متابعة عملية الشراء
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