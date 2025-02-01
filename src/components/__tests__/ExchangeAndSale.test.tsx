import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExchangeSection } from '../ExchangeSection';
import { PaymentSystem } from '../PaymentSystem';
import { ProductPrice } from '../ProductPrice';
import { toast } from 'sonner';

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('عمليات البيع والتبادل', () => {
  // اختبار عملية التبادل
  describe('نظام التبادل', () => {
    it('يجب أن يظهر وصف التبادل عند تفعيل خيار التبادل', () => {
      const mockOnChange = vi.fn();
      const mockDescChange = vi.fn();

      render(
        <ExchangeSection
          isExchangeable={true}
          exchangeDescription="آيفون 13 برو"
          onExchangeableChange={mockOnChange}
          onDescriptionChange={mockDescChange}
        />
      );

      expect(screen.getByText('متاح للتبادل')).toBeInTheDocument();
      expect(screen.getByText('آيفون 13 برو')).toBeInTheDocument();
    });

    it('يجب أن يختفي وصف التبادل عند إلغاء تفعيل خيار التبادل', () => {
      const mockOnChange = vi.fn();
      const mockDescChange = vi.fn();

      render(
        <ExchangeSection
          isExchangeable={false}
          exchangeDescription=""
          onExchangeableChange={mockOnChange}
          onDescriptionChange={mockDescChange}
        />
      );

      expect(screen.queryByText('متاح للتبادل')).not.toBeInTheDocument();
    });
  });

  // اختبار عملية الدفع
  describe('نظام الدفع', () => {
    it('يجب أن يظهر رسالة خطأ عند محاولة الدفع بدون اختيار طريقة دفع', () => {
      render(<PaymentSystem />);
      
      const submitButton = screen.getByText('إتمام عملية الدفع');
      fireEvent.click(submitButton);

      expect(toast.error).toHaveBeenCalledWith('الرجاء اختيار طريقة دفع');
    });

    it('يجب أن يظهر رسالة نجاح عند إتمام عملية الدفع', () => {
      render(<PaymentSystem />);
      
      // اختيار طريقة الدفع
      const cardButton = screen.getByText('بطاقة ائتمانية');
      fireEvent.click(cardButton);

      // إتمام عملية الدفع
      const submitButton = screen.getByText('إتمام عملية الدفع');
      fireEvent.click(submitButton);

      expect(toast.success).toHaveBeenCalledWith('تم تأكيد عملية الدفع بنجاح!');
    });
  });

  // اختبار حساب السعر والرسوم
  describe('حساب السعر والرسوم', () => {
    it('يجب حساب الرسوم الإدارية والمبلغ النهائي بشكل صحيح', () => {
      render(
        <ProductPrice
          price={1000}
          discount={10}
          language="ar"
        />
      );

      // السعر الأصلي: 1000
      // الخصم: 10% = 100
      // السعر بعد الخصم: 900
      // الرسوم الإدارية: 2% = 18
      // مبلغ البائع: 882

      expect(screen.getByText(/882.00/)).toBeInTheDocument();
    });
  });
});