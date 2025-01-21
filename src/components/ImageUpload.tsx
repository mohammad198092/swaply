import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
}

export const ImageUpload = ({ onImagesChange }: ImageUploadProps) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(newImages);
      onImagesChange(newImages);
    }
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
  );
};