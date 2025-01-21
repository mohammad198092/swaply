import { Input } from "@/components/ui/input";

interface CardFormProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  isProcessing: boolean;
}

export const CardForm = ({
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  isProcessing
}: CardFormProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <Input
        placeholder="رقم البطاقة"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
        disabled={isProcessing}
        type="text"
        maxLength={16}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="تاريخ الانتهاء (MM/YY)"
          value={expiryDate}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 4) {
              setExpiryDate(
                value.length > 2 
                  ? value.slice(0, 2) + '/' + value.slice(2)
                  : value
              );
            }
          }}
          disabled={isProcessing}
          maxLength={5}
        />
        <Input
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
          type="password"
          maxLength={3}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
};