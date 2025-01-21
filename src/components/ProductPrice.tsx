interface ProductPriceProps {
  price: number;
  discount?: number;
  language: string;
  formatCurrency: (price: number, discount?: number) => string;
}

export const ProductPrice = ({ price, discount, language, formatCurrency }: ProductPriceProps) => {
  const originalPrice = discount ? price - (price * discount / 100) : price;
  const adminFee = originalPrice * 0.02; // 2% admin fee
  const sellerAmount = originalPrice - adminFee;

  console.log('Price breakdown:', {
    originalPrice,
    adminFee,
    sellerAmount,
    discount
  });

  return (
    <div className="space-y-1">
      <p className="text-lg font-bold text-primary">
        {language === 'ar' ? 'السعر النهائي:' : 'Final Price:'} {formatCurrency(originalPrice)}
      </p>
      <div className="text-sm text-gray-500 space-y-0.5">
        {discount && (
          <p className="line-through">
            {language === 'ar' ? 'السعر الأصلي:' : 'Original Price:'} {formatCurrency(price)}
          </p>
        )}
        <p className="text-xs">
          {language === 'ar' ? 'مبلغ البائع:' : "Seller's Amount:"} {formatCurrency(sellerAmount)}
        </p>
        <p className="text-xs text-primary-600">
          {language === 'ar' ? 'رسوم إدارية (2%):' : 'Admin fee (2%):'} {formatCurrency(adminFee)}
        </p>
      </div>
    </div>
  );
};