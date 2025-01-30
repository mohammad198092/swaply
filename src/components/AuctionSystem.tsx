import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Clock, DollarSign, TrendingUp, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Bid {
  amount: number;
  username: string;
  timestamp: Date;
}

interface AuctionProps {
  productId: string;
  currentPrice: number;
  endTime: Date;
}

export const AuctionSystem = ({ productId, currentPrice, endTime }: AuctionProps) => {
  const [bidAmount, setBidAmount] = useState<number>(currentPrice + 100);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [bidHistory, setBidHistory] = useState<Bid[]>([]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endTime).getTime() - now;
      setTimeLeft(distance);
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);
  
  const handleBid = () => {
    // تحقق من أن المبلغ أعلى من السعر الحالي بـ 100 ريال على الأقل
    if (bidAmount < currentPrice + 100) {
      toast.error("يجب أن يكون المبلغ أعلى من السعر الحالي بـ 100 ريال على الأقل");
      return;
    }
    
    // محاكاة إضافة مزايدة جديدة
    const newBid: Bid = {
      amount: bidAmount,
      username: "مستخدم" + Math.floor(Math.random() * 1000), // في الواقع سيكون اسم المستخدم الحقيقي
      timestamp: new Date()
    };
    
    setBidHistory(prev => [...prev, newBid]);
    console.log("تم تقديم عرض جديد:", { productId, ...newBid });
    toast.success("تم تقديم عرضك بنجاح!");
  };

  const formatTime = (ms: number) => {
    if (ms < 0) return { hours: 0, minutes: 0, seconds: 0 };
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return { hours, minutes, seconds };
  };

  const time = formatTime(timeLeft);
  const progress = (timeLeft / (24 * 60 * 60 * 1000)) * 100;

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">نظام المزاد</CardTitle>
        <TrendingUp className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span>
              {time.hours}:{time.minutes.toString().padStart(2, '0')}:{time.seconds.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-gray-500">الوقت المتبقي</span>
        </div>
        
        <Progress value={progress} className="h-2" />
        
        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="font-bold text-xl">{currentPrice} ريال</span>
          <span className="text-sm text-gray-500 mr-auto">السعر الحالي</span>
        </div>
        
        <ScrollArea className="h-32 rounded-md border p-2">
          {bidHistory.length > 0 ? (
            <div className="space-y-2">
              {bidHistory.map((bid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm p-2 bg-gray-50 dark:bg-gray-700 rounded"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span>{bid.username}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{bid.amount} ريال</span>
                    <span className="text-xs text-gray-500">
                      {bid.timestamp.toLocaleTimeString('ar-SA')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">لا توجد مزايدات حتى الآن</p>
          )}
        </ScrollArea>
        
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              placeholder="أدخل مبلغ المزايدة"
              className="flex-1"
              min={currentPrice + 100}
            />
            <Button onClick={handleBid} className="w-32">
              تقديم عرض
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            الحد الأدنى للمزايدة: {currentPrice + 100} ريال
          </p>
        </div>
      </CardContent>
    </Card>
  );
};