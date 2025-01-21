import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Clock, DollarSign } from "lucide-react";

interface AuctionProps {
  productId: string;
  currentPrice: number;
  endTime: Date;
}

export const AuctionSystem = ({ productId, currentPrice, endTime }: AuctionProps) => {
  const [bidAmount, setBidAmount] = useState<number>(currentPrice);
  
  const handleBid = () => {
    if (bidAmount <= currentPrice) {
      toast.error("يجب أن يكون المبلغ أعلى من السعر الحالي");
      return;
    }
    
    console.log("تم تقديم عرض جديد:", { productId, bidAmount });
    toast.success("تم تقديم عرضك بنجاح!");
  };

  const timeLeft = new Date(endTime).getTime() - new Date().getTime();
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">نظام المزاد</h3>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <Clock className="w-4 h-4 mr-1" />
          <span>{hoursLeft} ساعة متبقية</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        <span className="font-bold text-xl">{currentPrice} ريال</span>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(Number(e.target.value))}
          placeholder="أدخل مبلغ المزايدة"
          className="flex-1"
        />
        <Button onClick={handleBid}>
          تقديم عرض
        </Button>
      </div>
    </div>
  );
};