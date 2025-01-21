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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800"
          >
            <CardHeader className="flex-none">
              <CardTitle className="text-xl font-semibold text-primary dark:text-primary-foreground line-clamp-2">
                {product.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="relative group aspect-square mb-4 overflow-hidden rounded-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                {product.description}
              </p>
              <div className="mt-auto space-y-4">
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(product.price)}
                </p>
                <RatingSystem
                  rating={ratings[product.id] || 0}
                  onRatingChange={(rating) => handleRatingChange(product.id, rating)}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};