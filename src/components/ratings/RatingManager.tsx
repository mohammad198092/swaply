import { useState } from "react";

export const useRatingManager = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const handleRatingChange = (productId: number, rating: number) => {
    console.log('⭐ تم تغيير تقييم المنتج:', { productId, rating });
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
  };

  return {
    ratings,
    handleRatingChange
  };
};