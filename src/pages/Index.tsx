import { LanguageToggle } from "@/components/LanguageToggle";
import { ProductForm } from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <LanguageToggle />
      
      <header className="bg-primary text-white py-8 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Swaply</h1>
          <p className="text-xl opacity-90">منصتك المثالية لبيع وشراء السلع</p>
        </div>
      </header>

      <main className="container py-8">
        <div className="text-center mb-8">
          <Button asChild>
            <Link to="/terms">شروط الاستخدام</Link>
          </Button>
        </div>

        <ProductForm />
      </main>
    </div>
  );
};

export default Index;