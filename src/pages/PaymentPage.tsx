import { PaymentSystem } from "@/components/PaymentSystem";

export const PaymentPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-right">صفحة الدفع</h1>
      <div className="max-w-xl mx-auto">
        <PaymentSystem />
      </div>
    </div>
  );
};