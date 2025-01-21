import { LanguageToggle } from "@/components/LanguageToggle";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/components/LanguageToggle";

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageToggle />
      
      <header className="bg-primary text-white py-8 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl opacity-90">{t.subtitle}</p>
        </div>
      </header>

      <main className="container py-8">
        <div className="text-center mb-8">
          <Button asChild>
            <Link to="/terms">{t.terms}</Link>
          </Button>
        </div>

        <ProductForm />
      </main>
    </div>
  );
};

export default Index;