import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, Star } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "أفضل الأسعار",
      description: "نضمن لك أفضل الأسعار في السوق"
    },
    {
      icon: Clock,
      title: "توصيل سريع",
      description: "خدمة توصيل سريعة وموثوقة"
    },
    {
      icon: Star,
      title: "جودة عالية",
      description: "منتجات ذات جودة عالية ومضمونة"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
      {features.map((feature, index) => (
        <Card key={index} className="p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
          <feature.icon className="h-8 w-8 md:h-12 md:w-12 text-primary mb-3 md:mb-4" />
          <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
        </Card>
      ))}
    </div>
  );
};