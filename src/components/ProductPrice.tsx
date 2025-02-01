import { formatCurrency } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  discount?: number;
  language: string;
}

export const ProductPrice = ({ price, discount, language }: ProductPriceProps) => {
  const calculateFinalPrice = (originalPrice: number, discountPercentage?: number) => {
    console.log('💰 حساب السعر:', { price: originalPrice, discount: discountPercentage });
    
    const priceAfterDiscount = discountPercentage 
      ? originalPrice - (originalPrice * discountPercentage / 100) 
      : originalPrice;
      
    const adminFee = priceAfterDiscount * 0.02;
    const finalPrice = priceAfterDiscount + adminFee;
    
    console.log('📊 تفاصيل السعر:', {
      سعر_أصلي: originalPrice,
      خصم: discountPercentage,
      سعر_بعد_الخصم: priceAfterDiscount,
      رسوم_إدارية: adminFee,
      سعر_نهائي: finalPrice
    });
    
    return formatCurrency(finalPrice, language);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2">
        {discount ? (
          <>
            <span className="text-lg font-bold text-primary">
              {calculateFinalPrice(price, discount)}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {calculateFinalPrice(price)}
            </span>
          </>
        ) : (
          <span className="text-lg font-bold text-primary">
            {calculateFinalPrice(price)}
          </span>
        )}
      </div>
      {discount && (
        <span className="text-sm text-green-600">
          {language === 'ar' ? `خصم ${discount}%` : `${discount}% OFF`}
        </span>
      )}
    </div>
  );
};