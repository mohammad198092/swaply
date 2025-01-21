import { LanguageToggle } from "@/components/LanguageToggle";
import { HeaderSection } from "@/components/sections/HeaderSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { CarouselSection } from "@/components/sections/CarouselSection";
import { MainContent } from "@/components/sections/MainContent";
import { FooterSection } from "@/components/sections/FooterSection";
import { AddProduct } from "@/components/AddProduct";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle />
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