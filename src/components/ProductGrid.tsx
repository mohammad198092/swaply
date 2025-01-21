import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingSystem } from "./RatingSystem";
import { useState } from "react";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const ProductGrid = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const { language } = useLanguage();
  const t = translations[language];
  
  const products: Product[] = [
    {
      id: 1,
      title: t.products.smartphone.title,
      price: 999,
      image: "/placeholder.svg",
      description: t.products.smartphone.description
    },
    {
      id: 2,
      title: t.products.laptop.title,
      price: 1499,
      image: "/placeholder.svg",
      description: t.products.laptop.description
    },
    {
      id: 3,
      title: t.products.headphones.title,
      price: 199,
      image: "/placeholder.svg",
      description: t.products.headphones.description
    }
  ];

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
    console.log(`Rating for product ${productId} changed to:`, rating);
  };

  const formatCurrency = (price: number) => {
    return language === 'ar' 
      ? `${price} ${t.currency}`
      : `$${price}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 animate-fade-in">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-primary dark:text-primary-foreground">
              {product.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative group">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-hidden">
              {product.description}
            </p>
            <p className="text-lg font-bold text-primary mb-4">
              {formatCurrency(product.price)}
            </p>
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