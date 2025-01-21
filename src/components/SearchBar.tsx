import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="ابحث عن منتجات..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 w-full"
        />
      </div>
    </div>
  );
};