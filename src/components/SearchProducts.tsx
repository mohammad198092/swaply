import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log('Searching for:', e.target.value);
  };

  return (
    <div className="relative max-w-md mx-auto mb-8 animate-fade-in">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        placeholder={language === 'ar' ? "ابحث عن المنتجات..." : "Search products..."}
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};