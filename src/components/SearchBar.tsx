import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-4 md:mb-8 px-2 md:px-0">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
        <Input
          type="text"
          placeholder="ابحث عن منتجات..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 w-full h-10 md:h-12 text-sm md:text-base rounded-xl"
        />
      </div>
    </div>
  );
};