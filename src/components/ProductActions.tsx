import { Button } from "@/components/ui/button";
import { Heart, Share2, ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  onAddToCart: () => void;
  onShare: () => void;
  onFavorite: () => void;
}

export const ProductActions = ({ onAddToCart, onShare, onFavorite }: ProductActionsProps) => {
  return (
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full hover:scale-110 transition-transform"
        onClick={onAddToCart}
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full hover:scale-110 transition-transform"
        onClick={onShare}
      >
        <Share2 className="h-5 w-5" />
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full hover:scale-110 transition-transform"
        onClick={onFavorite}
      >
        <Heart className="h-5 w-5" />
      </Button>
    </div>
  );
};