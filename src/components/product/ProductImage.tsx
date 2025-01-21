import { ProductActions } from "../ProductActions";

interface ProductImageProps {
  image: string;
  title: string;
  onImageError: () => void;
  onAddToCart: () => void;
  onShare: () => void;
  onFavorite: () => void;
}

export const ProductImage = ({
  image,
  title,
  onImageError,
  onAddToCart,
  onShare,
  onFavorite
}: ProductImageProps) => {
  return (
    <div className="relative aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        loading="lazy"
        onError={onImageError}
      />
      <ProductActions
        onAddToCart={onAddToCart}
        onShare={onShare}
        onFavorite={onFavorite}
      />
    </div>
  );
};