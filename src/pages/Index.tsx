import { LanguageToggle } from "@/components/LanguageToggle";
import { SearchProducts } from "@/components/SearchProducts";
import { ProductGrid } from "@/components/ProductGrid";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { UserVerification } from "@/components/UserVerification";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Clock, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AuctionSystem } from "@/components/AuctionSystem";
import { SellerRating } from "@/components/SellerRating";
import { NotificationSystem } from "@/components/NotificationSystem";
import { PaymentSystem } from "@/components/PaymentSystem";
import { LoyaltyProgram } from "@/components/LoyaltyProgram";
import { CustomerSupport } from "@/components/CustomerSupport";

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const ads = [
    {
      id: 1,
      title: "عرض خاص",
      description: "خصم 20% على جميع المنتجات الإلكترونية",
      color: "bg-blue-500 dark:bg-blue-600",
      badge: "جديد"
    },
    {
      id: 2,
      title: "عرض محدود",
      description: "اشترِ قطعة واحصل على الثانية مجاناً",
      color: "bg-green-500 dark:bg-green-600",
      badge: "حصري"
    },
    {
      id: 3,
      title: "توصيل مجاني",
      description: "لجميع الطلبات فوق 500 ريال",
      color: "bg-purple-500 dark:bg-purple-600",
      badge: "لفترة محدودة"
    },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "أفضل الأسعار",
      description: "نضمن لك أفضل الأسعار في السوق"
    },
    {
      icon: Clock,
      title: "توصيل سريع",
      description: "خدمة توصيل سريعة وموثوقة"
    },
    {
      icon: Star,
      title: "جودة عالية",
      description: "منتجات ذات جودة عالية ومضمونة"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      
      <header className="bg-primary dark:bg-primary-dark text-white py-8 md:py-16 text-center relative overflow-hidden animate-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90"></div>
        <div className="container px-4 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-slide-in">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-6 md:mb-8 animate-slide-in px-4">
            {t.subtitle}
          </p>
          <Button asChild size="lg" variant="secondary" className="animate-scale-in">
            <Link to="/terms" className="inline-flex items-center">
              {t.terms}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="container px-4 my-8 md:my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <UserVerification />
            <NotificationSystem />
            <LoyaltyProgram />
          </div>
          <div className="space-y-4">
            <AuctionSystem
              productId="123"
              currentPrice={1500}
              endTime={new Date(Date.now() + 24 * 60 * 60 * 1000)}
            />
            <SellerRating
              sellerId="456"
              currentRating={4.5}
              totalRatings={128}
            />
            <PaymentSystem />
            <CustomerSupport />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
              <feature.icon className="h-8 w-8 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8 md:mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {ads.map((ad) => (
                <CarouselItem key={ad.id} className="basis-full sm:basis-1/2 lg:basis-1/3 p-2">
                  <div className={`${ad.color} rounded-lg p-4 md:p-6 h-32 md:h-40 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden`}>
                    {ad.badge && (
                      <Badge className="absolute top-2 right-2 bg-white/20 text-white text-xs">
                        {ad.badge}
                      </Badge>
                    )}
                    <div className="relative z-10">
                      <h3 className="text-lg md:text-xl font-bold mb-2">{ad.title}</h3>
                      <p className="text-xs md:text-sm opacity-90">{ad.description}</p>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                      <Star className="h-24 w-24 md:h-32 md:w-32" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        <main className="container px-4 py-8 md:py-12">
          <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg animate-scale-in">
            <CardContent className="p-4 md:p-6">
              <ProductGrid />
            </CardContent>
          </Card>
        </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-right">
            <div>
              <h4 className="text-lg font-semibold mb-3 md:mb-4">{t.title}</h4>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{t.rights}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 md:mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/terms" className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary">
                    {t.terms}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 md:mb-4">تواصل معنا</h4>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                support@swaply.com
              </p>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;
