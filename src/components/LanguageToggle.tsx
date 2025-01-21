import { createContext, useContext, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from 'lucide-react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleLanguage}
        className="fixed top-4 right-4"
      >
        <Languages className="h-5 w-5" />
        <span className="ml-2">{language === 'ar' ? 'EN' : 'عربي'}</span>
      </Button>
      {/* @ts-ignore */}
      {window.__LOVABLE_LANGUAGE_CONTEXT__ = { language, toggleLanguage }}
    </LanguageContext.Provider>
  );
};