import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface PriceComparisonProps {
  productTitle: string;
  ourPrice: number;
}

export const PriceComparison = ({ productTitle, ourPrice }: PriceComparisonProps) => {
  const [fbPrice, setFbPrice] = useState<number | null>(null);
  const [tradePrice, setTradePrice] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching prices from external APIs
    const simulatePriceFetch = () => {
      console.log('Fetching comparison prices for:', productTitle);
      // Simulate random prices around our price for demonstration
      const fbVariation = (Math.random() * 0.4) - 0.2; // ±20%
      const tradeVariation = (Math.random() * 0.4) - 0.2; // ±20%
      
      setFbPrice(ourPrice * (1 + fbVariation));
      setTradePrice(ourPrice * (1 + tradeVariation));
    };

    simulatePriceFetch();
  }, [productTitle, ourPrice]);

  const formatPrice = (price: number) => {
    return price.toFixed(2) + ' SAR';
  };

  const getPriceComparison = (comparisonPrice: number | null) => {
    if (!comparisonPrice) return null;
    const difference = ((ourPrice - comparisonPrice) / comparisonPrice) * 100;
    return difference > 0 ? 'أغلى' : 'أرخص';
  };

  return (
    <div className="mt-4 space-y-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg animate-fade-in">
      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
        مقارنة الأسعار
        <ExternalLink className="h-4 w-4" />
      </h4>
      
      {fbPrice && (
        <div className="flex items-center justify-between text-sm">
          <span>Facebook Marketplace:</span>
          <div className="flex items-center gap-2">
            <span>{formatPrice(fbPrice)}</span>
            <Badge variant={getPriceComparison(fbPrice) === 'أغلى' ? 'destructive' : 'success'}>
              {getPriceComparison(fbPrice)}
            </Badge>
          </div>
        </div>
      )}
      
      {tradePrice && (
        <div className="flex items-center justify-between text-sm">
          <span>Trade Me:</span>
          <div className="flex items-center gap-2">
            <span>{formatPrice(tradePrice)}</span>
            <Badge variant={getPriceComparison(tradePrice) === 'أغلى' ? 'destructive' : 'success'}>
              {getPriceComparison(tradePrice)}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};