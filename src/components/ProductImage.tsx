import { useState, useEffect } from 'react';
import { ProductActions } from "./ProductActions";

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
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setImageSrc(image);
      setIsLoading(false);
      console.log('✅ تم تحميل الصورة بنجاح:', title);
    };
    img.onerror = () => {
      console.error('❌ فشل تحميل الصورة:', title);
      onImageError();
    };
  }, [image, title, onImageError]);

  return (
    <div className="relative aspect-square mb-3 md:mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title}
          className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          loading="lazy"
        />
      )}
      <ProductActions
        onAddToCart={onAddToCart}
        onShare={onShare}
        onFavorite={onFavorite}
      />
    </div>
  );
};