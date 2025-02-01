import { useState, useCallback, useRef, useEffect } from 'react';
import { ProductCard } from "./ProductCard";
import { useLanguage } from '@/lib/language-context';
import { LoadingState } from './LoadingState';
import type { Language } from '@/lib/language-context';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  discount?: number;
  isNew?: boolean;
  isExchangeable?: boolean;
  exchangeDescription?: string;
  status?: 'swapped' | 'sold' | 'available';
  seller: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
  };
}

interface ProductListProps {
  products: Product[];
  ratings: { [key: number]: number };
  onRatingChange: (productId: number, rating: number) => void;
  onAddToCart: (product: Product) => void;
  onShare: (product: Product) => void;
  onFavorite: (product: Product) => void;
  formatCurrency: (price: number, discount?: number) => string;
  language: Language;
}

export const ProductList = ({
  products,
  ratings,
  onRatingChange,
  onAddToCart,
  onShare,
  onFavorite,
  formatCurrency,
  language
}: ProductListProps) => {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  const ITEMS_PER_PAGE = 12;

  const loadMoreProducts = useCallback(() => {
    setIsLoading(true);
    console.log('📦 جاري تحميل المزيد من المنتجات، الصفحة:', page);

    // محاكاة تحميل البيانات
    setTimeout(() => {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newProducts = products.slice(startIndex, endIndex);
      
      setVisibleProducts(prev => [...prev, ...newProducts]);
      setIsLoading(false);
      setPage(p => p + 1);
      
      console.log('✅ تم تحميل', newProducts.length, 'منتج جديد');
    }, 500);
  }, [page, products]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoading, loadMoreProducts]);

  useEffect(() => {
    // تحميل المنتجات الأولية
    loadMoreProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            language={language}
            rating={ratings[product.id] || 0}
            onRatingChange={(rating) => onRatingChange(product.id, rating)}
            onAddToCart={onAddToCart}
            onShare={onShare}
            onFavorite={onFavorite}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
      
      <div ref={loaderRef} className="mt-8">
        {isLoading && <LoadingState />}
      </div>
    </>
  );
};