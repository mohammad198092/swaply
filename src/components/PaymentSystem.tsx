import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

interface PaymentMethod {
  id: string;
  type: 'card';
  name: string;
  icon: typeof CreditCard;
}

export const PaymentSystem = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  
  const paymentMethods: PaymentMethod[] = [
    { id: "card", type: "card", name: "بطاقة ائتمانية", icon: CreditCard },
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      toast.error("الرجاء اختيار طريقة دفع");
      return;
    }
    
    console.log("تم اختيار طريقة الدفع:", selectedMethod);
    toast.success("تم تأكيد عملية الدفع بنجاح!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>الدفع الآمن</CardTitle>
        <CardDescription>اختر طريقة الدفع المناسبة</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {paymentMethods.map((method) => (
            <Button
              key={method.id}
              variant={selectedMethod === method.id ? "default" : "outline"}
              className="flex items-center justify-center gap-2 h-20"
              onClick={() => setSelectedMethod(method.id)}
            >
              <method.icon className="w-6 h-6" />
              <span>{method.name}</span>
            </Button>
          ))}
        </div>
        
        {selectedMethod === "card" && (
          <div className="space-y-4">
            <Input placeholder="رقم البطاقة" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="تاريخ الانتهاء" />
              <Input placeholder="CVV" type="password" maxLength={3} />
            </div>
          </div>
        )}
        
        <Button 
          className="w-full" 
          onClick={handlePayment}
          disabled={!selectedMethod}
        >
          إتمام عملية الدفع
        </Button>
      </CardContent>
    </Card>
  );
};