import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Repeat } from "lucide-react";

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
  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Repeat className="h-5 w-5 text-primary" />
          <label className="text-lg font-medium">قابل للمبادلة</label>
          {isExchangeable && (
            <Badge variant="secondary" className="mr-2">
              متاح للتبادل
            </Badge>
          )}
        </div>
        <Switch
          checked={isExchangeable}
          onCheckedChange={onExchangeableChange}
        />
      </div>
      
      {isExchangeable && (
        <div className="animate-fade-in">
          <label className="block text-lg mb-2 font-medium">ما الذي تريد مبادلته به؟</label>
          <Textarea
            placeholder="اذكر المنتجات التي ترغب في مبادلة منتجك بها..."
            value={exchangeDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="min-h-[100px] resize-none"
            rows={3}
          />
          <p className="text-sm text-gray-500 mt-2">
            اكتب وصفاً واضحاً للمنتجات التي ترغب في مبادلة منتجك بها
          </p>
        </div>
      )}
    </div>
  );
};