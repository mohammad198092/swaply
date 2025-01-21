import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RatingSystem } from "./RatingSystem";
import { useState } from "react";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  discount?: number;
  isNew?: boolean;
}

export const ProductGrid = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  
  const products: Product[] = [
    {
      id: 1,
      title: t.products.smartphone.title,
      price: 999,
      image: "/placeholder.svg",
      description: t.products.smartphone.description,
      discount: 10,
      isNew: true
    },
    {
      id: 2,
      title: t.products.laptop.title,
      price: 1499,
      image: "/placeholder.svg",
      description: t.products.laptop.description,
      isNew: true
    },
    {
      id: 3,
      title: t.products.headphones.title,
      price: 199,
      image: "/placeholder.svg",
      description: t.products.headphones.description,
      discount: 15
    }
  ];

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
    console.log(`Rating for product ${productId} changed to:`, rating);
  };

  const formatCurrency = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount / 100) : price;
    return language === 'ar' 
      ? `${finalPrice} ${t.currency}`
      : `$${finalPrice}`;
  };

  const handleAddToCart = (product: Product) => {
    console.log('Adding to cart:', product);
    toast({
      title: language === 'ar' ? "تمت الإضافة للسلة" : "Added to Cart",
      description: language === 'ar' 
        ? `تمت إضافة ${product.title} إلى سلة التسوق`
        : `${product.title} has been added to your cart`,
    });
  };

  const handleShare = (product: Product) => {
    console.log('Sharing product:', product);
    toast({
      title: language === 'ar' ? "مشاركة المنتج" : "Share Product",
      description: language === 'ar' 
        ? `تمت مشاركة ${product.title}`
        : `${product.title} has been shared`,
    });
  };

  const handleFavorite = (product: Product) => {
    console.log('Adding to favorites:', product);
    toast({
      title: language === 'ar' ? "المفضلة" : "Favorites",
      description: language === 'ar' 
        ? `تمت إضافة ${product.title} إلى المفضلة`
        : `${product.title} has been added to favorites`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="flex flex-col h-full hover:shadow-lg transition-all duration-300 dark:bg-gray-800 group animate-fade-in"
          >
            <CardHeader className="flex-none relative">
              <CardTitle className="text-xl font-semibold text-primary dark:text-primary-foreground line-clamp-2">
                {product.title}
              </CardTitle>
              <div className="absolute top-2 right-2 space-x-2 rtl:space-x-reverse">
                {product.isNew && (
                  <Badge className="bg-green-500 animate-scale-in">
                    {language === 'ar' ? 'جديد' : 'New'}
                  </Badge>
                )}
                {product.discount && (
                  <Badge className="bg-red-500 animate-scale-in">
                    {`${product.discount}% ${language === 'ar' ? 'خصم' : 'OFF'}`}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-4">
              <div className="relative group-hover:transform group-hover:scale-105 transition-all duration-300 aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full hover:scale-110 transition-transform"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full hover:scale-110 transition-transform"
                    onClick={() => handleShare(product)}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full hover:scale-110 transition-transform"
                    onClick={() => handleFavorite(product)}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                {product.description}
              </p>
              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(product.price, product.discount)}
                    </p>
                    {product.discount && (
                      <p className="text-sm text-gray-500 line-through">
                        {formatCurrency(product.price)}
                      </p>
                    )}
                  </div>
                  <RatingSystem
                    rating={ratings[product.id] || 0}
                    onRatingChange={(rating) => handleRatingChange(product.id, rating)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};