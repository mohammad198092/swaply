import { ProductPrice } from "../ProductPrice";
import { RatingSystem } from "../RatingSystem";
import { SellerInfo } from "../SellerInfo";

interface ProductFooterProps {
  price: number;
  discount?: number;
  language: string;
  rating: number;
  onRatingChange: (rating: number) => void;
  seller: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
  };
  formatCurrency: (price: number, discount?: number) => string;
}

export const ProductFooter = ({
  price,
  discount,
  language,
  rating,
  onRatingChange,
  seller,
  formatCurrency
}: ProductFooterProps) => {
  return (
    <div className="mt-auto space-y-3 md:space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <ProductPrice
          price={price}
          discount={discount}
          language={language}
          formatCurrency={formatCurrency}
        />
        <RatingSystem
          rating={rating}
          onRatingChange={onRatingChange}
        />
      </div>
      <div className="seller-info border-t pt-2">
        <SellerInfo seller={seller} />
      </div>
    </div>
  );
};