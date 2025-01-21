interface ProductPriceProps {
  price: number;
  discount?: number;
  language: string;
  formatCurrency: (price: number, discount?: number) => string;
}

export const ProductPrice = ({ price, discount, language, formatCurrency }: ProductPriceProps) => {
  const originalPrice = discount ? price - (price * discount / 100) : price;
  const adminFee = originalPrice * 0.10;
  const finalPrice = originalPrice + adminFee;

  return (
    <div className="space-y-1">
      <p className="text-lg font-bold text-primary">
        {language === 'ar' ? 'السعر النهائي:' : 'Final Price:'} {formatCurrency(price, discount)}
      </p>
      <div className="text-sm text-gray-500 space-y-0.5">
        {discount && (
          <p className="line-through">
            {language === 'ar' ? 'السعر الأصلي:' : 'Original Price:'} {formatCurrency(price)}
          </p>
        )}
        <p className="text-xs">
          {language === 'ar' ? 'السعر بعد الخصم:' : 'Price after discount:'} {originalPrice.toFixed(2)}
        </p>
        <p className="text-xs text-primary-600">
          {language === 'ar' ? 'رسوم إدارية (10%):' : 'Admin fee (10%):'} {adminFee.toFixed(2)}
        </p>
      </div>
    </div>
  );
};