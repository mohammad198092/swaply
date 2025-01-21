import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from './ImageUpload';
import { SearchBar } from './SearchBar';
import { ExchangeSection } from './ExchangeSection';
import { LocationInput } from './LocationInput';
import { useToast } from "@/hooks/use-toast";

export const ProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExchangeable, setIsExchangeable] = useState(false);
  const [exchangeDescription, setExchangeDescription] = useState('');
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const categories = [
    'إلكترونيات',
    'ملابس',
    'أثاث',
    'سيارات',
    'عقارات',
    'أخرى'
  ];

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    toast({
      title: "تم التقييم بنجاح",
      description: `لقد قمت بتقييم المنتج ${value} نجوم`
    });
  };

  const handleMessageClick = () => {
    toast({
      title: "المحادثة المباشرة",
      description: "سيتم فتح المحادثة قريباً"
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <form className="space-y-6">
        <ImageUpload onImagesChange={setImages} />

        <div>
          <label className="block text-lg mb-2">عنوان المنتج</label>
          <Input placeholder="أدخل عنوان المنتج" />
        </div>

        <div>
          <label className="block text-lg mb-2">التصنيف</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="اختر تصنيف المنتج" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-lg mb-2">السعر</label>
          <Input
            type="number"
            placeholder="أدخل السعر"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <ExchangeSection
          isExchangeable={isExchangeable}
          exchangeDescription={exchangeDescription}
          onExchangeableChange={setIsExchangeable}
          onDescriptionChange={setExchangeDescription}
        />

        <div>
          <label className="block text-lg mb-2">الوصف</label>
          <Textarea placeholder="اكتب وصفاً تفصيلياً للمنتج" rows={5} />
        </div>

        <LocationInput location={location} onLocationChange={setLocation} />

        <div className="flex flex-col gap-4">
          {/* Rating System */}
          <div className="flex items-center gap-2">
            <span className="text-lg">التقييم:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className={`focus:outline-none ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                <Star className="h-6 w-6" fill={star <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button type="submit" className="w-1/3">نشر المنتج</Button>
            
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleMessageClick}
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                محادثة
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleFavoriteClick}
                className={`flex items-center gap-2 ${isFavorite ? 'text-red-500' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};