import { Heart, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface InteractionButtonsProps {
  isFavorite: boolean;
  onFavoriteClick: () => void;
}

export const InteractionButtons = ({ isFavorite, onFavoriteClick }: InteractionButtonsProps) => {
  const { toast } = useToast();

  const handleMessageClick = () => {
    toast({
      title: "المحادثة المباشرة",
      description: "سيتم فتح المحادثة قريباً"
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={handleMessageClick}
        className="flex items-center gap-2"
      >
        <MessageCircle className="h-4 w-4" />
        محادثة
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onFavoriteClick}
        className={`flex items-center gap-2 ${isFavorite ? 'text-red-500' : ''}`}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        {isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
      </Button>
    </div>
  );
};