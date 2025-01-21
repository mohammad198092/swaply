import { Card, CardContent } from "@/components/ui/card";
import { ProductGrid } from "@/components/ProductGrid";
import { UserVerification } from "@/components/UserVerification";
import { NotificationSystem } from "@/components/NotificationSystem";
import { LoyaltyProgram } from "@/components/LoyaltyProgram";
import { FavoriteProducts } from "@/components/FavoriteProducts";
import { ProductPrice } from "@/components/ProductPrice";
import { SocialShare } from "@/components/SocialShare";
import { AuctionSystem } from "@/components/AuctionSystem";
import { SellerRating } from "@/components/SellerRating";
import { PaymentSystem } from "@/components/PaymentSystem";
import { useLanguage } from "@/lib/language-context";

export const MainContent = () => {
  const { language } = useLanguage();

  const formatCurrency = (price: number, discount?: number) => {
    const finalPrice = discount ? price - (price * discount) / 100 : price;
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR'
    }).format(finalPrice);
  };

  return (
    <div className="container px-4 my-8 md:my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <UserVerification />
          <NotificationSystem />
          <LoyaltyProgram />
          <FavoriteProducts />
          <ProductPrice
            price={1500}
            discount={10}
            language={language}
            formatCurrency={formatCurrency}
          />
          <SocialShare
            title="منتج رائع من سوابلي"
            url={window.location.href}
          />
        </div>
        <div className="space-y-4">
          <AuctionSystem
            productId="123"
            currentPrice={1500}
            endTime={new Date(Date.now() + 24 * 60 * 60 * 1000)}
          />
          <SellerRating
            sellerId="456"
            currentRating={4.5}
            totalRatings={128}
          />
          <PaymentSystem />
        </div>
      </div>

      <main className="container px-4 py-8 md:py-12">
        <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg animate-scale-in">
          <CardContent className="p-4 md:p-6">
            <ProductGrid />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};