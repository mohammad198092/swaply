import { LanguageToggle } from "@/components/LanguageToggle";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CarouselSection } from "@/components/sections/CarouselSection";
import { MainContent } from "@/components/sections/MainContent";
import { FooterSection } from "@/components/sections/FooterSection";
import { AddProduct } from "@/components/AddProduct";
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
          variant="outline" 
          size="icon"
          onClick={() => navigate(-1)}
          className="bg-white dark:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <HeaderSection />
      
      <div className="container px-4 my-8 md:my-12">
        <AddProduct />
        <FeaturesSection />
        <CarouselSection />
        <MainContent />
      </div>

      <FooterSection />
    </div>
  );
};

export default Index;