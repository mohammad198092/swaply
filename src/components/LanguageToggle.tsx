import { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Languages } from 'lucide-react';
import { LanguageContext } from '@/lib/language-context';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  if (!language || !toggleLanguage) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

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