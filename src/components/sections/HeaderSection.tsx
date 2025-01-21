import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export const HeaderSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
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
  );
};