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
    toggleLanguage();
    
    // Show toast notification
    toast({
      title: language === 'ar' ? "Language Changed" : "تم تغيير اللغة",
      description: language === 'ar' ? "Switched to English" : "تم التغيير إلى العربية",
      duration: 2000,
    });

    // Force re-render of RTL/LTR sensitive components
    window.dispatchEvent(new Event('languagechange'));
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={handleLanguageToggle}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 hover:bg-primary/10"
      aria-label={language === 'ar' ? 'Switch to English' : 'التغيير إلى العربية'}
    >
      <Languages className="h-5 w-5" />
      <span className="text-sm font-medium">
        {language === 'ar' ? 'EN' : 'عربي'}
      </span>
    </Button>
  );
};