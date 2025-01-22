import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/lib/language-context';
import { Smartphone, Laptop, Headphones, Car, Watch, Camera, Home } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const CategoryList = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: language === 'ar' ? 'الكل' : 'All', icon: Home },
    { id: 'electronics', name: language === 'ar' ? 'إلكترونيات' : 'Electronics', icon: Smartphone },
    { id: 'computers', name: language === 'ar' ? 'حواسيب' : 'Computers', icon: Laptop },
    { id: 'accessories', name: language === 'ar' ? 'اكسسوارات' : 'Accessories', icon: Headphones },
    { id: 'vehicles', name: language === 'ar' ? 'سيارات' : 'Vehicles', icon: Car },
    { id: 'watches', name: language === 'ar' ? 'ساعات' : 'Watches', icon: Watch },
    { id: 'cameras', name: language === 'ar' ? 'كاميرات' : 'Cameras', icon: Camera },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    console.log('تم اختيار التصنيف:', categoryId);
    
    toast({
      title: language === 'ar' ? 'تم تحديد التصنيف' : 'Category Selected',
      description: language === 'ar' ? `تم اختيار ${categories.find(c => c.id === categoryId)?.name}` : 
        `Selected ${categories.find(c => c.id === categoryId)?.name}`,
      duration: 2000,
    });
  };

  return (
    <div className="w-full overflow-x-auto py-4 animate-fade-in">
      <div className="flex space-x-2 rtl:space-x-reverse min-w-max px-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="flex items-center space-x-2 rtl:space-x-reverse transition-all hover:scale-105"
              onClick={() => handleCategoryClick(category.id)}
            >
              <Icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};