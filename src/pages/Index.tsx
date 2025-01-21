import { LanguageToggle } from "@/components/LanguageToggle";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const ads = [
    {
      id: 1,
      title: "عرض خاص",
      description: "خصم 20% على جميع المنتجات الإلكترونية",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "عرض محدود",
      description: "اشترِ قطعة واحصل على الثانية مجاناً",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "توصيل مجاني",
      description: "لجميع الطلبات فوق 500 ريال",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageToggle />
      
      <header className="bg-primary text-white py-12 text-center">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </header>

      <div className="container my-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {ads.map((ad) => (
              <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/3">
                <div className={`${ad.color} rounded-lg p-6 h-32 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
                  <h3 className="text-xl font-bold mb-2">{ad.title}</h3>
                  <p className="text-sm opacity-90">{ad.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <main className="container py-8">
        <div className="text-center mb-8">
          <Button asChild variant="outline" className="mx-2">
            <Link to="/terms">{t.terms}</Link>
          </Button>
        </div>

        <Card className="max-w-4xl mx-auto bg-white shadow-lg">
          <CardContent className="p-0">
            <ProductForm />
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="container text-center text-gray-600">
          <p>&copy; 2024 {t.title}. {t.rights}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;