import { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./i18n";

export type Language = "en" | "ar" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>((localStorage.getItem("language") as Language) || "en");

  const changeLanguage = (newLang: Language) => {
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      changeLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}