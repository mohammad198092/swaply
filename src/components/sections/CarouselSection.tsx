import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export const CarouselSection = () => {
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

  return (
    <div className="mt-8 md:mt-12">
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">
          {t.advertiseHere} | {language === 'ar' ? 'Advertise Here' : 'أعلن هنا'}
        </p>
      </div>
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
  );
};