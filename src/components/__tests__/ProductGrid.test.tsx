import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductGrid } from '../ProductGrid';
import { LanguageProvider } from '@/lib/language-context';

describe('ProductGrid Component', () => {
  it('يعرض قائمة المنتجات', () => {
    render(
      <LanguageProvider>
        <ProductGrid />
      </LanguageProvider>
    );
    
    // التحقق من وجود المنتجات
    expect(screen.getByText('هاتف ذكي')).toBeInTheDocument();
    expect(screen.getByText('لابتوب')).toBeInTheDocument();
    expect(screen.getByText('سماعات')).toBeInTheDocument();
  });

  it('يعرض الأسعار بالتنسيق الصحيح', () => {
    render(
      <LanguageProvider>
        <ProductGrid />
      </LanguageProvider>
    );
    
    // التحقق من تنسيق الأسعار
    expect(screen.getByText('999 ريال')).toBeInTheDocument();
    expect(screen.getByText('1499 ريال')).toBeInTheDocument();
    expect(screen.getByText('199 ريال')).toBeInTheDocument();
  });
});