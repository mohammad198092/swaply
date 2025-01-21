import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MapPin, Heart, Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'إلكترونيات',
    'ملابس',
    'أثاث',
    'سيارات',
    'عقارات',
    'أخرى'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      {/* Search Section */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="ابحث عن منتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 w-full"
          />
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-lg mb-2">صور المنتج</label>
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="images"
            />
            <label htmlFor="images" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2">انقر لرفع الصور أو اسحبها وأفلتها هنا</p>
            </label>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="rounded-lg object-cover h-24 w-full"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

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

        <div>
          <label className="block text-lg mb-2">الوصف</label>
          <Textarea placeholder="اكتب وصفاً تفصيلياً للمنتج" rows={5} />
        </div>

        <div>
          <label className="block text-lg mb-2">الموقع</label>
          <div className="flex gap-2">
            <Input value={location} placeholder="حدد موقعك" readOnly />
            <Button type="button" onClick={handleLocationClick}>
              <MapPin className="h-4 w-4 ml-2" />
              تحديد الموقع
            </Button>
          </div>
        </div>

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