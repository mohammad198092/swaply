import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from 'lucide-react';

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleLanguage}
      className="fixed top-4 right-4"
    >
      <Languages className="h-5 w-5" />
      <span className="ml-2">{language === 'ar' ? 'EN' : 'عربي'}</span>
    </Button>
  );
};