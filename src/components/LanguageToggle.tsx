import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from 'lucide-react';
import { LanguageContext } from '@/lib/language-context';
import { useToast } from "@/hooks/use-toast";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { toast } = useToast();
  
  if (!language || !toggleLanguage) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  const handleLanguageToggle = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    toggleLanguage();
    console.log('Language changed to:', newLang);
    
    toast({
      title: language === 'ar' ? "Language Changed" : "تم تغيير اللغة",
      description: language === 'ar' ? "Switched to English" : "تم التغيير إلى العربية",
      duration: 2000,
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={handleLanguageToggle}
      className="fixed top-4 right-4 flex items-center gap-2"
    >
      <Languages className="h-5 w-5" />
      <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
    </Button>
  );
};