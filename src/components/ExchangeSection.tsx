import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Repeat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  const handleExchangeToggle = (checked: boolean) => {
    onExchangeableChange(checked);
    console.log('تم تغيير حالة المبادلة:', checked);
    
    toast({
      title: checked ? "تم تفعيل خيار المبادلة" : "تم إلغاء خيار المبادلة",
      description: checked 
        ? "يمكنك الآن تحديد المنتجات التي ترغب في مبادلتها" 
        : "تم إلغاء خيار المبادلة للمنتج",
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
          <label className="text-lg font-medium">قابل للمبادلة</label>
          {isExchangeable && (
            <Badge variant="secondary" className="mr-2 animate-fade-in">
              متاح للتبادل
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
          <label className="block text-lg mb-2 font-medium">ما الذي تريد مبادلته به؟</label>
          <Textarea
            placeholder="اذكر المنتجات التي ترغب في مبادلة منتجك بها..."
            value={exchangeDescription}
            onChange={handleDescriptionChange}
            className="min-h-[100px] resize-none focus:ring-2 focus:ring-primary"
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