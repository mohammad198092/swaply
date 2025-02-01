import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

interface ProductDetailsProps {
  description: string;
  isExchangeable?: boolean;
  exchangeDescription?: string;
}

export const ProductDetails = ({
  description,
  isExchangeable,
  exchangeDescription
}: ProductDetailsProps) => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <div className="mb-3 md:mb-4">
        <p className="text-xs md:text-sm font-medium mb-1">
          {t.productDetails.description}
        </p>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 flex-grow line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
          {description || t.productDetails.noDescription}
        </p>
      </div>
      
      {isExchangeable && exchangeDescription && (
        <div className="mb-3 md:mb-4 p-2 md:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transform hover:scale-105 transition-transform">
          <p className="text-xs md:text-sm font-medium mb-1">
            {t.productDetails.exchangeWith}
          </p>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
            {exchangeDescription}
          </p>
        </div>
      )}
    </>
  );
};