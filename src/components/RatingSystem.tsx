import { Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RatingSystemProps {
  rating: number;
  onRatingChange: (value: number) => void;
}

export const RatingSystem = ({ rating, onRatingChange }: RatingSystemProps) => {
  const { toast } = useToast();

  const handleRatingClick = (value: number) => {
    onRatingChange(value);
    console.log('Rating changed to:', value);
    toast({
      title: "تم التقييم بنجاح",
      description: `لقد قمت بتقييم المنتج ${value} نجوم`
    });
  };

  return (
    <div className="flex items-center gap-2 animate-fade-in">
      <span className="text-lg">التقييم:</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRatingClick(star)}
          className={`focus:outline-none transition-colors duration-200 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star 
            className="h-6 w-6 hover:scale-110 transition-transform" 
            fill={star <= rating ? 'currentColor' : 'none'} 
          />
        </button>
      ))}
    </div>
  );
};