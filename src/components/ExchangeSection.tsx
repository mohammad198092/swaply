import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-lg">قابل للمبادلة</label>
        <Switch
          checked={isExchangeable}
          onCheckedChange={onExchangeableChange}
        />
      </div>
      
      {isExchangeable && (
        <div>
          <label className="block text-lg mb-2">ما الذي تريد مبادلته به؟</label>
          <Textarea
            placeholder="اذكر المنتجات التي ترغب في مبادلة منتجك بها..."
            value={exchangeDescription}
            onChange={(e) => onDescriptionChange(e.target.value)}
            rows={3}
          />
        </div>
      )}
    </div>
  );
};