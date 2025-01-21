import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { PaymentMethods } from "./PaymentMethods";
import { CardForm } from "./CardForm";

export const PaymentSystem = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const validateCardDetails = () => {
    if (selectedMethod === "card") {
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error("الرجاء إدخال جميع بيانات البطاقة");
        return false;
      }
      if (cardNumber.length < 16) {
        toast.error("رقم البطاقة غير صحيح");
        return false;
      }
      if (cvv.length < 3) {
        toast.error("رمز CVV غير صحيح");
        return false;
      }
    }
    return true;
  };

  const simulatePayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
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

    if (!validateCardDetails()) {
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
      if (selectedMethod === "card") {
        setCardNumber("");
        setExpiryDate("");
        setCvv("");
      }
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>الدفع الآمن</CardTitle>
        <CardDescription>اختر طريقة الدفع المناسبة</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <PaymentMethods
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          isProcessing={isProcessing}
        />
        
        {selectedMethod === "card" && (
          <CardForm
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
            cvv={cvv}
            setCvv={setCvv}
            isProcessing={isProcessing}
          />
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