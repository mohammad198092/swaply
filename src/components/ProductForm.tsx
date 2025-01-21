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
        <label className="block text-lg mb-2">Product Images</label>
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
            <p className="mt-2">Click to upload images or drag and drop here</p>
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
        <label className="block text-lg mb-2">Product Title</label>
        <Input placeholder="Enter product title" />
      </div>

      <div>
        <label className="block text-lg mb-2">Description</label>
        <Textarea placeholder="Write a detailed description of the product" rows={5} />
      </div>

      <div>
        <label className="block text-lg mb-2">Location</label>
        <div className="flex gap-2">
          <Input value={location} placeholder="Set your location" readOnly />
          <Button type="button" onClick={handleLocationClick}>
            <MapPin className="h-4 w-4 mr-2" />
            Set Location
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full">Post Product</Button>
    </form>
  );
};