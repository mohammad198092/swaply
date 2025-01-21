import { CardHeader, CardTitle } from "@/components/ui/card";
import { ProductBadges } from "../ProductBadges";
import { Badge } from "@/components/ui/badge";
import { Repeat, ShoppingBag } from "lucide-react";

interface ProductHeaderProps {
  title: string;
  isNew?: boolean;
  discount?: number;
  isExchangeable?: boolean;
  status?: 'swapped' | 'sold' | 'available';
  language: string;
}

export const ProductHeader = ({
  title,
  isNew,
  discount,
  isExchangeable,
  status,
  language
}: ProductHeaderProps) => {
  const getStatusBadge = () => {
    if (!status || status === 'available') return null;

    const statusConfig = {
      swapped: {
        icon: <Repeat className="h-3 w-3 mr-1" />,
        text: 'تم التبديل',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      },
      sold: {
        icon: <ShoppingBag className="h-3 w-3 mr-1" />,
        text: 'تم البيع',
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      }
    };

    const config = statusConfig[status];
    if (!config) return null;

    return (
      <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.className} animate-fade-in`}>
        {config.icon}
        {config.text}
      </div>
    );
  };

  return (
    <CardHeader className="flex-none relative p-4 md:p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg md:text-xl font-semibold text-primary dark:text-primary-foreground line-clamp-2 group-hover:text-primary-dark transition-colors">
          {title}
        </CardTitle>
        {getStatusBadge()}
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        <ProductBadges
          isNew={isNew}
          discount={discount}
          language={language}
        />
        {isExchangeable && (
          <Badge 
            variant="secondary" 
            className="flex items-center gap-1 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Repeat className="h-3 w-3 md:h-4 md:w-4 animate-pulse" />
            قابل للتبادل
          </Badge>
        )}
      </div>
    </CardHeader>
  );
};