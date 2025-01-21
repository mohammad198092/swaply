import { LanguageToggle } from "@/components/LanguageToggle";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CarouselSection } from "@/components/sections/CarouselSection";
import { MainContent } from "@/components/sections/MainContent";
import { FooterSection } from "@/components/sections/FooterSection";
import { AddProduct } from "@/components/AddProduct";
import { CustomerSupport } from "@/components/CustomerSupport";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
      </div>
      
      <div className="fixed top-4 left-4 z-50">
        <Button 
          variant="secondary"
          size="default"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>رجوع</span>
        </Button>
      </div>
      
      <HeaderSection />
      
      <div className="container px-4 my-8 md:my-12">
        <AddProduct />
        <FeaturesSection />
        <CarouselSection />
        <MainContent />
        
        {/* قسم تواصل معنا */}
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">تواصل معنا</h2>
          <div className="max-w-xl mx-auto">
            <CustomerSupport />
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default Index;