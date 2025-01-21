import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, MapPin } from 'lucide-react';

export const ProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [location, setLocation] = useState('');

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

  return (
    <form className="space-y-6 max-w-2xl mx-auto p-6">
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
            <p className="mt-2">اضغط لتحميل الصور أو اسحب وأفلت هنا</p>
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

      <Button type="submit" className="w-full">نشر المنتج</Button>
    </form>
  );
};