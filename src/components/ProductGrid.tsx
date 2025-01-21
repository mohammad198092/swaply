import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingSystem } from "./RatingSystem";
import { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductGrid = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  
  // بيانات تجريبية للمنتجات
  const products: Product[] = [
    {
      id: 1,
      title: "هاتف ذكي",
      price: 999,
      image: "/placeholder.svg",
      description: "هاتف ذكي بمواصفات عالية"
    },
    {
      id: 2,
      title: "حاسوب محمول",
      price: 1499,
      image: "/placeholder.svg",
      description: "حاسوب محمول للاستخدام المهني"
    },
    {
      id: 3,
      title: "سماعات لاسلكية",
      price: 199,
      image: "/placeholder.svg",
      description: "سماعات لاسلكية بجودة صوت عالية"
    }
  ];

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
    console.log(`Rating for product ${productId} changed to:`, rating);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 animate-fade-in">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-primary mb-4">{product.price} ريال</p>
            <RatingSystem
              rating={ratings[product.id] || 0}
              onRatingChange={(rating) => handleRatingChange(product.id, rating)}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};