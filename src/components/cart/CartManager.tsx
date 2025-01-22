import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export const CartManager = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const handleDeleteItem = (item: any) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("🗑️ تم حذف المنتج من السلة:", itemToDelete);
    toast.success("تم حذف المنتج من السلة");
    setIsDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4">
        <Button variant="outline" size="icon">
          <ShoppingCart className="h-5 w-5" />
        </Button>
        <Button 
          variant="destructive" 
          size="icon"
          onClick={() => handleDeleteItem({ id: 1, name: "منتج" })}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف هذا المنتج من السلة؟
              لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              تأكيد الحذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};