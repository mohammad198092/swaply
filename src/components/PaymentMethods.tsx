import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: 'card' | 'apple_pay' | 'google_pay';
  name: string;
  icon: typeof CreditCard | typeof Smartphone;
}

interface PaymentMethodsProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
  isProcessing: boolean;
}

export const PaymentMethods = ({ selectedMethod, setSelectedMethod, isProcessing }: PaymentMethodsProps) => {
  const paymentMethods: PaymentMethod[] = [
    { id: "card", type: "card", name: "بطاقة ائتمانية", icon: CreditCard },
    { id: "apple_pay", type: "apple_pay", name: "Apple Pay", icon: Smartphone },
    { id: "google_pay", type: "google_pay", name: "Google Pay", icon: Smartphone },
  ];

  return (
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
  );
};