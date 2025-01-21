import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from 'lucide-react';
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

export const ProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExchangeable, setIsExchangeable] = useState(false);
  const [exchangeDescription, setExchangeDescription] = useState('');

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

        <div className="flex justify-between items-center">
          <Button type="submit" className="w-1/2">نشر المنتج</Button>
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
      </form>
    </div>
  );
};