import { Badge } from "@/components/ui/badge";

interface ProductBadgesProps {
  isNew?: boolean;
  discount?: number;
  language: string;
}

export const ProductBadges = ({ isNew, discount, language }: ProductBadgesProps) => {
  if (!isNew && !discount) return null;
  
  return (
    <div className="absolute top-2 right-2 space-x-2 rtl:space-x-reverse">
      {isNew && (
        <Badge className="bg-green-500 animate-scale-in">
          {language === 'ar' ? 'جديد' : 'New'}
        </Badge>
      )}
      {discount && (
        <Badge className="bg-red-500 animate-scale-in">
          {`${discount}% ${language === 'ar' ? 'خصم' : 'OFF'}`}
        </Badge>
      )}
    </div>
  );
};