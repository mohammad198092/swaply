import { Star, Gift, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const LoyaltyProgram = () => {
  const points = 750;
  const nextTier = 1000;
  const currentTier = "فضي";
  
  const handleRedeemPoints = () => {
    console.log("محاولة استبدال النقاط");
    toast.success("تم تقديم طلب استبدال النقاط بنجاح!");
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">برنامج الولاء</CardTitle>
        <Award className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-medium">{points} نقطة</span>
          </div>
          <span className="text-sm text-gray-500">المستوى: {currentTier}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>التقدم للمستوى التالي</span>
            <span>{points}/{nextTier}</span>
          </div>
          <Progress value={(points/nextTier) * 100} className="h-2" />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Gift className="h-4 w-4" />
            المكافآت المتاحة
          </h4>
          <ul className="text-sm space-y-1">
            <li>خصم 10% على طلبك التالي</li>
            <li>شحن مجاني للطلب القادم</li>
            <li>نقاط مضاعفة على مشترياتك</li>
          </ul>
        </div>

        <Button 
          onClick={handleRedeemPoints}
          className="w-full"
        >
          استبدال النقاط
        </Button>
      </CardContent>
    </Card>
  );
};