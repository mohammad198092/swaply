import { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";
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
  type: 'card' | 'apple_pay' | 'google_pay';
  name: string;
  icon: typeof CreditCard | typeof Smartphone;
}

export const PaymentSystem = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const paymentMethods: PaymentMethod[] = [
    { id: "card", type: "card", name: "بطاقة ائتمانية", icon: CreditCard },
    { id: "apple_pay", type: "apple_pay", name: "Apple Pay", icon: Smartphone },
    { id: "google_pay", type: "google_pay", name: "Google Pay", icon: Smartphone },
  ];

  const simulatePayment = () => {
    return new Promise((resolve) => {
      // محاكاة وقت المعالجة
      setTimeout(() => {
        // محاكاة نجاح العملية بنسبة 80%
        const isSuccess = Math.random() < 0.8;
        resolve(isSuccess);
      }, 2000);
    });
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error("الرجاء اختيار طريقة دفع");
      return;
    }
    
    setIsProcessing(true);
    console.log("بدء معالجة الدفع:", selectedMethod);
    toast.info("جاري معالجة عملية الدفع...");

    try {
      const isSuccess = await simulatePayment();
      
      if (isSuccess) {
        switch (selectedMethod) {
          case 'apple_pay':
            console.log("تم الدفع بنجاح عبر Apple Pay");
            toast.success("تم الدفع بنجاح عبر Apple Pay");
            break;
          case 'google_pay':
            console.log("تم الدفع بنجاح عبر Google Pay");
            toast.success("تم الدفع بنجاح عبر Google Pay");
            break;
          default:
            console.log("تم الدفع بنجاح عبر البطاقة الائتمانية");
            toast.success("تم الدفع بنجاح عبر البطاقة الائتمانية");
        }
      } else {
        throw new Error("فشلت عملية الدفع");
      }
    } catch (error) {
      console.error("خطأ في عملية الدفع:", error);
      toast.error("عذراً، فشلت عملية الدفع. الرجاء المحاولة مرة أخرى");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>الدفع الآمن</CardTitle>
        <CardDescription>اختر طريقة الدفع المناسبة</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <Button
              key={method.id}
              variant={selectedMethod === method.id ? "default" : "outline"}
              className="flex items-center justify-center gap-2 h-20"
              onClick={() => setSelectedMethod(method.id)}
              disabled={isProcessing}
            >
              <method.icon className="w-6 h-6" />
              <span>{method.name}</span>
            </Button>
          ))}
        </div>
        
        {selectedMethod === "card" && (
          <div className="space-y-4">
            <Input placeholder="رقم البطاقة" disabled={isProcessing} />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="تاريخ الانتهاء" disabled={isProcessing} />
              <Input placeholder="CVV" type="password" maxLength={3} disabled={isProcessing} />
            </div>
          </div>
        )}
        
        <Button 
          className="w-full" 
          onClick={handlePayment}
          disabled={!selectedMethod || isProcessing}
        >
          {isProcessing ? "جاري معالجة الدفع..." : "إتمام عملية الدفع"}
        </Button>
      </CardContent>
    </Card>
  );
};