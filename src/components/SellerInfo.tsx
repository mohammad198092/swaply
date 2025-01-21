import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

interface SellerInfoProps {
  seller: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
  };
}

export const SellerInfo = ({ seller }: SellerInfoProps) => {
  const navigate = useNavigate();

  const handleSellerClick = () => {
    console.log('Navigating to seller products:', seller.id);
    navigate(`/seller/${seller.id}`);
  };

  return (
    <div 
      onClick={handleSellerClick}
      className="flex items-center gap-3 p-3 mt-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
    >
      <Avatar className="h-10 w-10 border-2 border-primary">
        <AvatarImage src={seller.avatar} alt={seller.name} />
        <AvatarFallback>{seller.name.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium hover:text-primary transition-colors">
          {seller.name}
        </span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {seller.rating}
          </span>
        </div>
      </div>
    </div>
  );
};