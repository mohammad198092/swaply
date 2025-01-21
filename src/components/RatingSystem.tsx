import { Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

interface RatingSystemProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export const RatingSystem = ({ rating, onRatingChange }: RatingSystemProps) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const handleRatingClick = (value: number) => {
    onRatingChange(value);
    console.log('Rating changed to:', value);
    toast({
      title: language === 'ar' ? "تم التقييم بنجاح" : t.ratingSuccess,
      description: language === 'ar' 
        ? `لقد قمت بتقييم المنتج ${value} نجوم`
        : `${t.ratingDescription} ${value} stars`,
      duration: 2000
    });
  };

  return (
    <div className="flex items-center gap-2 animate-fade-in" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        {language === 'ar' ? 'التقييم:' : t.rating}
      </span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRatingClick(star)}
          className={`focus:outline-none transition-all duration-200 ${
            star <= rating ? 'text-yellow-400' : 'text-gray-300'
          } hover:text-yellow-500`}
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