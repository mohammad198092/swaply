import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SellerRatingProps {
  sellerId: string;
  currentRating: number;
  totalRatings: number;
}

export const SellerRating = ({ sellerId, currentRating, totalRatings }: SellerRatingProps) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleRating = (value: number) => {
    setRating(value);
    console.log("تم تقييم البائع:", { sellerId, rating: value });
    toast.success("شكراً لتقييمك!");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3">تقييم البائع</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              className={`w-6 h-6 cursor-pointer transition-colors ${
                value <= (hoveredRating || currentRating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              onClick={() => handleRating(value)}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          ({totalRatings} تقييم)
        </span>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        متوسط التقييم: {currentRating.toFixed(1)} من 5
      </div>
    </div>
  );
};