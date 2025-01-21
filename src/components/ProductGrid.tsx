import { useState } from "react";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useToast } from "@/hooks/use-toast";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  discount?: number;
  isNew?: boolean;
  isExchangeable?: boolean;
  exchangeDescription?: string;
}

export const ProductGrid = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const { toast } = useToast();
  
  const products: Product[] = [
    {
      id: 1,
      title: "آيفون 14 برو ماكس",
      price: 4999,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      description: "هاتف ذكي متطور مع كاميرا احترافية وشاشة عالية الدقة",
      discount: 10,
      isNew: true,
      isExchangeable: true,
      exchangeDescription: "آيفون 13 برو أو ما يعادله"
    },
    {
      id: 2,
      title: "ماك بوك برو M2",
      price: 8999,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      description: "حاسوب محمول احترافي مع معالج M2 وشاشة Retina",
      isNew: true,
      isExchangeable: true,
      exchangeDescription: "ماك بوك برو 2021 أو ما يعادله"
    },
    {
      id: 3,
      title: "سماعات آبل AirPods Pro",
      price: 999,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      description: "سماعات لاسلكية مع خاصية إلغاء الضوضاء",
      discount: 15
    },
    {
      id: 4,
      title: "ساعة آبل الإصدار 8",
      price: 1999,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
      description: "ساعة ذكية متطورة مع مزايا صحية وتتبع النشاط",
      isNew: true
    },
    {
      id: 5,
      title: "آيباد برو 2023",
      price: 3499,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      description: "جهاز لوحي متطور مثالي للرسم الرقمي والإنتاجية",
      isNew: true,
      discount: 5
    },
    {
      id: 6,
      title: "سامسونج جالكسي S23 الترا",
      price: 4799,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
      description: "هاتف أندرويد رائد مع كاميرا احترافية وأداء استثنائي",
      isExchangeable: true,
      exchangeDescription: "آيفون 14 برو أو ما يعادله"
    },
    {
      id: 7,
      title: "سوني بلايستيشن 5",
      price: 2199,
      image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
      description: "منصة ألعاب متطورة مع تحكم لمسي متقدم وجرافيكس عالي الدقة",
      discount: 8
    },
    {
      id: 8,
      title: "شاومي سمارت تي في 65",
      price: 2899,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
      description: "تلفاز ذكي بشاشة OLED مقاس 65 بوصة ودقة 4K",
      isNew: true,
      discount: 12
    }
  ];

  // Simulate loading state
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });

  const handleRatingChange = (productId: number, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [productId]: rating
    }));
    console.log(`تم تغيير تقييم المنتج ${productId} إلى:`, rating);
  };

  const formatCurrency = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount / 100) : price;
    return language === 'ar' 
      ? `${finalPrice} ${t.currency}`
      : `$${finalPrice}`;
  };

  const handleAddToCart = (product: Product) => {
    console.log('تمت إضافة المنتج للسلة:', product);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تمت إضافة ${product.title} إلى سلة التسوق`,
    });
  };

  const handleShare = (product: Product) => {
    console.log('تمت مشاركة المنتج:', product);
    toast({
      title: "مشاركة المنتج",
      description: `تمت مشاركة ${product.title}`,
    });
  };

  const handleFavorite = (product: Product) => {
    console.log('تمت إضافة المنتج للمفضلة:', product);
    toast({
      title: "المفضلة",
      description: `تمت إضافة ${product.title} إلى المفضلة`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">لا توجد منتجات متاحة حالياً</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            language={language}
            rating={ratings[product.id] || 0}
            onRatingChange={(rating) => handleRatingChange(product.id, rating)}
            onAddToCart={handleAddToCart}
            onShare={handleShare}
            onFavorite={handleFavorite}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  );
};