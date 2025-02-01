import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/components/ProductData";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Share2, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductPrice } from "@/components/ProductPrice";
import { RatingSystem } from "@/components/RatingSystem";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { toast } from "sonner";
import { ExchangeSection } from "@/components/ExchangeSection";
import { AuctionSystem } from "@/components/AuctionSystem";
import { InteractionButtons } from "@/components/InteractionButtons";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExchangeable, setIsExchangeable] = useState(false);
  const [exchangeDescription, setExchangeDescription] = useState("");

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
        <Button onClick={() => navigate(-1)}>العودة للصفحة السابقة</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log("تمت إضافة المنتج للسلة:", product);
    toast.success("تمت إضافة المنتج إلى السلة");
  };

  const handleShare = () => {
    console.log("تمت مشاركة المنتج:", product);
    toast.success("تم نسخ رابط المنتج");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-gray-100"
      >
        <ArrowRight className="ml-2 h-4 w-4" />
        العودة للمنتجات
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* صور المنتج */}
          <Card>
            <CardContent className="p-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images?.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt={`${product.title} - ${index + 1}`}
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                    </CarouselItem>
                  )) || (
                    <CarouselItem>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          {/* نظام المزاد إذا كان متاحاً */}
          {product.status === 'available' && (
            <AuctionSystem
              productId={product.id.toString()}
              currentPrice={product.price}
              endTime={new Date(Date.now() + 24 * 60 * 60 * 1000)}
            />
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold">{product.title}</h1>
                  <div className="flex gap-2">
                    {product.isNew && (
                      <Badge variant="secondary">جديد</Badge>
                    )}
                    {product.discount && (
                      <Badge variant="destructive">{product.discount}% خصم</Badge>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>

                <ProductPrice
                  price={product.price}
                  discount={product.discount}
                  language={language}
                />

                <div className="flex items-center justify-between">
                  <RatingSystem
                    rating={rating}
                    onRatingChange={setRating}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1"
                  >
                    <ShoppingCart className="ml-2 h-4 w-4" />
                    إضافة للسلة
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <ExchangeSection
            isExchangeable={isExchangeable}
            exchangeDescription={exchangeDescription}
            onExchangeableChange={setIsExchangeable}
            onDescriptionChange={setExchangeDescription}
          />

          <InteractionButtons
            isFavorite={isFavorite}
            onFavoriteClick={() => setIsFavorite(!isFavorite)}
          />
        </div>
      </div>
    </div>
  );
};