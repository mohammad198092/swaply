import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { toast } from "sonner";

const languages = [
  { code: 'ar', label: '🇸🇦 العربية' },
  { code: 'en', label: '🇺🇸 English' },
  { code: 'fr', label: '🇫🇷 Français' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'ja', label: '🇯🇵 日本語' },
  { code: 'zh', label: '🇨🇳 中文' }
] as const;

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLang: typeof languages[number]['code']) => {
    setLanguage(newLang);
    console.log('تغيير اللغة:', newLang);
    toast.success(
      newLang === 'ar' 
        ? 'تم تغيير اللغة بنجاح'
        : 'Language changed successfully'
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer ${
              language === lang.code ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};