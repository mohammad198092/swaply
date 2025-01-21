import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log('Searching for:', e.target.value, 'in category:', category);
    
    // إظهار رسالة توضيحية للمستخدم
    if (e.target.value.length > 2) {
      toast({
        title: language === 'ar' ? "جاري البحث..." : "Searching...",
        description: language === 'ar' 
          ? `البحث عن "${e.target.value}" في ${getCategoryName(category)}`
          : `Searching for "${e.target.value}" in ${getCategoryName(category)}`,
        duration: 2000,
      });
    }
  };

  const getCategoryName = (cat: string): string => {
    const categories = {
      all: language === 'ar' ? 'كل الفئات' : 'All Categories',
      electronics: language === 'ar' ? 'إلكترونيات' : 'Electronics',
      clothing: language === 'ar' ? 'ملابس' : 'Clothing',
      furniture: language === 'ar' ? 'أثاث' : 'Furniture'
    };
    return categories[cat as keyof typeof categories];
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    console.log('Category changed to:', newCategory);
    
    if (searchTerm) {
      toast({
        title: language === 'ar' ? "تم تغيير الفئة" : "Category Changed",
        description: language === 'ar' 
          ? `تم تحديث البحث في ${getCategoryName(newCategory)}`
          : `Search updated in ${getCategoryName(newCategory)}`,
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    console.log('Search component mounted with language:', language);
  }, [language]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder={language === 'ar' ? "ابحث عن المنتجات..." : "Search products..."}
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
        {['all', 'electronics', 'clothing', 'furniture'].map((cat) => (
          <Button
            key={cat}
            variant={category === cat ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(cat)}
            className="transition-all duration-200 hover:scale-105"
          >
            <Filter className="h-4 w-4 mr-2" />
            {getCategoryName(cat)}
          </Button>
        ))}
      </div>
    </div>
  );
};