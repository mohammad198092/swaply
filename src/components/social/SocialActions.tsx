import { useToast } from "@/hooks/use-toast";

export const useSocialActions = () => {
  const { toast } = useToast();

  const handleShare = (product: any) => {
    console.log('🔗 مشاركة المنتج:', product);
    toast({
      title: "مشاركة المنتج",
      description: `تم مشاركة ${product.title}`,
    });
  };

  const handleFavorite = (product: any) => {
    console.log('❤️ إضافة منتج للمفضلة:', product);
    toast({
      title: "المفضلة",
      description: `تم إضافة ${product.title} إلى المفضلة`,
    });
  };

  return {
    handleShare,
    handleFavorite
  };
};