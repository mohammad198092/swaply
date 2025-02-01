import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('app-language');
    return (savedLang === 'ar' || savedLang === 'en') ? savedLang : 'en';
  });

  useEffect(() => {
    // Update localStorage and document properties
    localStorage.setItem('app-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.className = language === 'ar' ? 'rtl' : 'ltr';
    
    console.log('تم تحديث إعدادات اللغة:', {
      language,
      direction: document.documentElement.dir,
      storedLanguage: localStorage.getItem('app-language')
    });
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLang) => {
      const newLang = prevLang === 'ar' ? 'en' : 'ar';
      console.log('تم تغيير اللغة من', prevLang, 'إلى', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};