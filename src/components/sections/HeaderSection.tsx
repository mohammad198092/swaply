import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export const HeaderSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <header className="relative min-h-[400px] text-white py-8 md:py-16 text-center overflow-hidden animate-fade-in">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-900/90"></div>
      </div>

      {/* Content */}
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 animate-slide-in bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 drop-shadow-lg font-cairo tracking-wide">
            SWAPLY
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-6 md:mb-8 animate-slide-in px-4 text-blue-100">
            {t.subtitle}
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="secondary" 
            className="animate-scale-in bg-white text-blue-900 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Link to="/terms" className="inline-flex items-center">
              {t.terms}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};