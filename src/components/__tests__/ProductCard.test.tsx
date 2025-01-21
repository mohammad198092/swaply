import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { LanguageProvider } from '@/lib/language-context';

// Mock product data
const mockProduct = {
  id: 1,
  title: "هاتف ذكي",
  price: 999,
  image: "/placeholder.svg",
  description: "هاتف ذكي بمواصفات عالية",
  discount: 10,
  isNew: true,
  seller: {
    id: 1,
    name: "أحمد محمد",
    avatar: "/avatar-placeholder.png",
    rating: 4.5
  }
};

describe('ProductCard Component', () => {
  const setup = () => {
    const onRatingChange = vi.fn();
    const onAddToCart = vi.fn();
    const onShare = vi.fn();
    const onFavorite = vi.fn();

    return {
      onRatingChange,
      onAddToCart,
      onShare,
      onFavorite,
      ...render(
        <LanguageProvider>
          <ProductCard
            product={mockProduct}
            language="ar"
            rating={0}
            onRatingChange={onRatingChange}
            onAddToCart={onAddToCart}
            onShare={onShare}
            onFavorite={onFavorite}
            formatCurrency={(price: number) => `${price} ريال`}
          />
        </LanguageProvider>
      )
    };
  };

  it('يعرض عنوان المنتج', () => {
    setup();
    expect(screen.getByText('هاتف ذكي')).toBeInTheDocument();
  });

  it('يعرض وصف المنتج', () => {
    setup();
    expect(screen.getByText('هاتف ذكي بمواصفات عالية')).toBeInTheDocument();
  });

  it('يعرض شارة المنتج الجديد', () => {
    setup();
    expect(screen.getByText('جديد')).toBeInTheDocument();
  });

  it('يعرض شارة الخصم', () => {
    setup();
    expect(screen.getByText('10% خصم')).toBeInTheDocument();
  });

  it('يستدعي onAddToCart عند النقر على زر إضافة إلى السلة', async () => {
    const { onAddToCart } = setup();
    const addToCartButton = screen.getByLabelText('إضافة إلى السلة');
    fireEvent.click(addToCartButton);
    expect(onAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('يستدعي onShare عند النقر على زر المشاركة', () => {
    const { onShare } = setup();
    const shareButton = screen.getByLabelText('مشاركة');
    fireEvent.click(shareButton);
    expect(onShare).toHaveBeenCalledWith(mockProduct);
  });

  it('يستدعي onFavorite عند النقر على زر المفضلة', () => {
    const { onFavorite } = setup();
    const favoriteButton = screen.getByLabelText('إضافة إلى المفضلة');
    fireEvent.click(favoriteButton);
    expect(onFavorite).toHaveBeenCalledWith(mockProduct);
  });
});