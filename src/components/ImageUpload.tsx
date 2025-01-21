import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Upload, X } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
}

export const ImageUpload = ({ onImagesChange }: ImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      
      // التحقق من حجم وعدد الصور
      const validImages = newImages.filter(image => {
        if (image.size > 5 * 1024 * 1024) { // 5MB
          toast({
            title: "حجم الصورة كبير جداً",
            description: `الصورة ${image.name} يجب أن تكون أقل من 5MB`,
            variant: "destructive"
          });
          return false;
        }
        return true;
      });

      if (images.length + validImages.length > 5) {
        toast({
          title: "عدد الصور كثير",
          description: "يمكنك تحميل 5 صور كحد أقصى",
          variant: "destructive"
        });
        return;
      }

      const updatedImages = [...images, ...validImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);
      console.log('تم تحميل الصور:', updatedImages);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
    console.log('تم حذف الصورة رقم:', index);
  };

  return (
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
        <label htmlFor="images" className="cursor-pointer block">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2">انقر لرفع الصور أو اسحبها وأفلتها هنا</p>
          <p className="text-sm text-gray-500 mt-1">
            (الحد الأقصى: 5 صور، حجم كل صورة لا يتجاوز 5MB)
          </p>
        </label>
        
        {images.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  className="rounded-lg object-cover w-full h-24 hover:opacity-75 transition-opacity"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};