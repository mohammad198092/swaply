import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useToast } from "@/hooks/use-toast";
import { Calculator } from 'lucide-react';

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = translations[language];

  const handleConvert = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      toast({
        title: t.currency.invalidAmount,
        description: t.currency.enterValidAmount,
        variant: "destructive"
      });
      return;
    }

    // سعر التحويل الثابت (يمكن تغييره لاحقاً ليكون ديناميكياً)
    const rate = language === 'ar' ? 0.27 : 3.75;
    const result = (numAmount * rate).toFixed(2);
    setConvertedAmount(result);

    toast({
      title: t.currency.conversionSuccess,
      description: `${numAmount} ${language === 'ar' ? t.currency.sar : t.currency.usd} = ${result} ${language === 'ar' ? t.currency.usd : t.currency.sar}`,
    });

    console.log('Currency conversion:', { amount: numAmount, result, fromCurrency: language === 'ar' ? 'SAR' : 'USD' });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold text-center">
          {t.currency.converter}
        </h3>
        
        <div className="flex gap-2">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t.currency.enterAmount}
            className="flex-1"
          />
          <Button onClick={handleConvert} variant="outline">
            <Calculator className="h-4 w-4 mr-2" />
            {t.currency.convert}
          </Button>
        </div>

        {convertedAmount && (
          <div className="text-center p-2 bg-secondary rounded-md">
            <span className="font-semibold">
              {convertedAmount} {language === 'ar' ? t.currency.usd : t.currency.sar}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};