interface ProductPriceProps {
  price: number;
  discount?: number;
  language: string;
  formatCurrency: (price: number, discount?: number) => string;
}

export const ProductPrice = ({ price, discount, language, formatCurrency }: ProductPriceProps) => {
  return (
    <div>
      <p className="text-lg font-bold text-primary">
        {formatCurrency(price, discount)}
      </p>
      {discount && (
        <p className="text-sm text-gray-500 line-through">
          {formatCurrency(price)}
        </p>
      )}
    </div>
  );
};