import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Repeat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

interface ExchangeSectionProps {
  isExchangeable: boolean;
  exchangeDescription: string;
  onExchangeableChange: (value: boolean) => void;
  onDescriptionChange: (value: string) => void;
}

export const ExchangeSection = ({
  isExchangeable,
  exchangeDescription,
  onExchangeableChange,
  onDescriptionChange
}: ExchangeSectionProps) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  const handleExchangeToggle = (checked: boolean) => {
    onExchangeableChange(checked);
    console.log('تم تغيير حالة المبادلة:', checked);
    
    toast({
      title: checked ? t.exchangeEnabled : t.exchangeDisabled,
      description: checked ? t.exchangeEnabledDesc : t.exchangeDisabledDesc,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDescriptionChange(e.target.value);
    console.log('تم تحديث وصف المبادلة:', e.target.value);
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-primary animate-pulse" />
          <label className="text-lg font-medium">{t.exchangeable}</label>
          {isExchangeable && (
            <Badge variant="secondary" className="mr-2 animate-fade-in">
              {t.availableForExchange}
            </Badge>
          )}
        </div>
        <Switch
          checked={isExchangeable}
          onCheckedChange={handleExchangeToggle}
          className="data-[state=checked]:bg-primary"
        />
      </div>
      
      {isExchangeable && (
        <div className="animate-fade-in space-y-2">
          <label className="block text-lg mb-2 font-medium">{t.whatToExchange}</label>
          <Textarea
            placeholder={t.exchangeDescriptionPlaceholder}
            value={exchangeDescription}
            onChange={handleDescriptionChange}
            className="min-h-[100px] resize-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-2">
            {t.exchangeDescriptionHelp}
          </p>
        </div>
      )}
    </div>
  );
};