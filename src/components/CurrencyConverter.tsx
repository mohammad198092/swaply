import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { useToast } from "@/hooks/use-toast";
import { Calculator } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CurrencyRate = {
  [key: string]: { [key: string]: number };
};

const CURRENCY_RATES: CurrencyRate = {
  USD: {
    SAR: 3.75,
    EUR: 0.91,
    GBP: 0.79,
    JPY: 147.50,
    AED: 3.67,
    KWD: 0.31,
    BHD: 0.38,
    QAR: 3.64,
    OMR: 0.38
  },
  SAR: {
    USD: 0.27,
    EUR: 0.24,
    GBP: 0.21,
    JPY: 39.33,
    AED: 0.98,
    KWD: 0.082,
    BHD: 0.10,
    QAR: 0.97,
    OMR: 0.10
  }
};

export const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('SAR');
  const { language } = useLanguage();
  const { toast } = useToast();
  const t = translations[language];

  const currencies = [
    { value: 'USD', label: t.currency.usd },
    { value: 'SAR', label: t.currency.sar },
    { value: 'EUR', label: t.currency.eur },
    { value: 'GBP', label: t.currency.gbp },
    { value: 'JPY', label: t.currency.jpy },
    { value: 'AED', label: t.currency.aed },
    { value: 'KWD', label: t.currency.kwd },
    { value: 'BHD', label: t.currency.bhd },
    { value: 'QAR', label: t.currency.qar },
    { value: 'OMR', label: t.currency.omr }
  ];

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

    let rate = 1;
    if (fromCurrency === 'USD') {
      rate = CURRENCY_RATES.USD[toCurrency] || 1;
    } else if (fromCurrency === 'SAR') {
      rate = CURRENCY_RATES.SAR[toCurrency] || 1;
    }

    const result = (numAmount * rate).toFixed(2);
    setConvertedAmount(result);

    toast({
      title: t.currency.conversionSuccess,
      description: `${numAmount} ${fromCurrency} = ${result} ${toCurrency}`,
    });

    console.log('Currency conversion:', { 
      amount: numAmount, 
      result, 
      fromCurrency, 
      toCurrency,
      rate 
    });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md animate-fade-in">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-semibold text-center">
          {t.currency.converter}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t.currency.from}
            </label>
            <Select
              value={fromCurrency}
              onValueChange={setFromCurrency}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.currency.selectCurrency} />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-600 dark:text-gray-400">
              {t.currency.to}
            </label>
            <Select
              value={toCurrency}
              onValueChange={setToCurrency}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.currency.selectCurrency} />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.value} value={currency.value}>
                    {currency.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

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
              {convertedAmount} {toCurrency}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};