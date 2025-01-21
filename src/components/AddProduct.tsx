import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from './ImageUpload';
import { ExchangeSection } from './ExchangeSection';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface NewProduct {
  title: string;
  price: number;
  description: string;
  images: File[];
  isExchangeable: boolean;
  exchangeDescription: string;
  listingType: 'sale' | 'exchange' | 'auction';
  auctionEndTime?: Date;
}

export const AddProduct = () => {
  const { toast } = useToast();
  const [product, setProduct] = useState<NewProduct>({
    title: '',
    price: 0,
    description: '',
    images: [],
    isExchangeable: false,
    exchangeDescription: '',
    listingType: 'sale'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New product data:', product);
    
    toast({
      title: "تم إضافة المنتج",
      description: "تم إضافة المنتج بنجاح"
    });
  };

  const handleImagesChange = (images: File[]) => {
    setProduct(prev => ({ ...prev, images }));
    console.log('Images updated:', images);
  };

  const handleListingTypeChange = (value: 'sale' | 'exchange' | 'auction') => {
    setProduct(prev => ({
      ...prev,
      listingType: value,
      isExchangeable: value === 'exchange'
    }));
    console.log('Listing type changed:', value);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">إضافة منتج جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-medium">نوع الإعلان</Label>
            <RadioGroup
              value={product.listingType}
              onValueChange={handleListingTypeChange}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="sale" id="sale" />
                <Label htmlFor="sale" className="mr-2">بيع</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="exchange" id="exchange" />
                <Label htmlFor="exchange" className="mr-2">تبديل</Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="auction" id="auction" />
                <Label htmlFor="auction" className="mr-2">مزايدة</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <label className="block text-lg">عنوان المنتج</label>
            <Input
              value={product.title}
              onChange={(e) => setProduct(prev => ({ ...prev, title: e.target.value }))}
              placeholder="أدخل عنوان المنتج"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">
              {product.listingType === 'auction' ? 'السعر الابتدائي' : 'السعر'}
            </label>
            <Input
              type="number"
              value={product.price}
              onChange={(e) => setProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
              placeholder={product.listingType === 'auction' ? 'أدخل السعر الابتدائي' : 'أدخل سعر المنتج'}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg">وصف المنتج</label>
            <Textarea
              value={product.description}
              onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
              placeholder="اكتب وصفاً تفصيلياً للمنتج"
              required
              rows={4}
            />
          </div>

          <ImageUpload onImagesChange={handleImagesChange} />

          {product.listingType === 'exchange' && (
            <ExchangeSection
              isExchangeable={product.isExchangeable}
              exchangeDescription={product.exchangeDescription}
              onExchangeableChange={(value) => setProduct(prev => ({ ...prev, isExchangeable: value }))}
              onDescriptionChange={(value) => setProduct(prev => ({ ...prev, exchangeDescription: value }))}
            />
          )}

          {product.listingType === 'auction' && (
            <div className="space-y-2">
              <label className="block text-lg">موعد انتهاء المزاد</label>
              <Input
                type="datetime-local"
                onChange={(e) => setProduct(prev => ({ ...prev, auctionEndTime: new Date(e.target.value) }))}
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            <Plus className="ml-2" />
            إضافة المنتج
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};