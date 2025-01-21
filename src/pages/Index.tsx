import { LanguageToggle } from "@/components/LanguageToggle";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageToggle />
      
      <header className="bg-primary text-white py-12 text-center">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </header>

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