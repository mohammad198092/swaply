import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from './ImageUpload';
import { ExchangeSection } from './ExchangeSection';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface NewProduct {
  title: string;
  price: number;
  description: string;
  images: File[];
  isExchangeable: boolean;
  exchangeDescription: string;
}

export const AddProduct = () => {
  const { toast } = useToast();
  const [product, setProduct] = useState<NewProduct>({
    title: '',
    price: 0,
    description: '',
    images: [],
    isExchangeable: false,
    exchangeDescription: ''
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

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">إضافة منتج جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-lg">السعر</label>
            <Input
              type="number"
              value={product.price}
              onChange={(e) => setProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
              placeholder="أدخل سعر المنتج"
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

          <ExchangeSection
            isExchangeable={product.isExchangeable}
            exchangeDescription={product.exchangeDescription}
            onExchangeableChange={(value) => setProduct(prev => ({ ...prev, isExchangeable: value }))}
            onDescriptionChange={(value) => setProduct(prev => ({ ...prev, exchangeDescription: value }))}
          />

          <Button type="submit" className="w-full">
            <Plus className="ml-2" />
            إضافة المنتج
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};