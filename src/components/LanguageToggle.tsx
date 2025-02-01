import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "🇺🇸 English" },
    { code: "ar", label: "🇦🇪 العربية" },
    { code: "es", label: "🇪🇸 Español" }
  ];

  useEffect(() => {
    // Set initial direction based on saved language
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, []);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
    
    const langLabel = languages.find(lang => lang.code === langCode)?.label;
    toast.success(`تم تغيير اللغة إلى: ${langLabel}`);
    console.log('تغيير اللغة:', langCode);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};