import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from './ImageUpload';
import { SearchBar } from './SearchBar';
import { ExchangeSection } from './ExchangeSection';
import { LocationInput } from './LocationInput';
import { RatingSystem } from './RatingSystem';
import { InteractionButtons } from './InteractionButtons';
import { SocialShare } from './SocialShare';
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export const ProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExchangeable, setIsExchangeable] = useState(false);
  const [exchangeDescription, setExchangeDescription] = useState('');
  const [rating, setRating] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const categories = [
    'إلكترونيات',
    'ملابس',
    'أثاث',
    'سيارات',
    'عقارات',
    'أخرى'
  ];

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
    // Create URLs for preview
    const urls = newImages.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', {
      images,
      title,
      category,
      price,
      isExchangeable,
      exchangeDescription,
      location
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUpload
          images={imageUrls}
          onImagesChange={handleImagesChange}
        />

        <div>
          <label className="block text-lg mb-2">{t.productTitle}</label>
          <Input 
            placeholder={t.enterProductTitle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg mb-2">{t.category}</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder={t.selectCategory} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-lg mb-2">{t.price}</label>
          <Input
            type="number"
            placeholder={t.enterPrice}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <ExchangeSection
          isExchangeable={isExchangeable}
          exchangeDescription={exchangeDescription}
          onExchangeableChange={setIsExchangeable}
          onDescriptionChange={setExchangeDescription}
        />

        <div>
          <label className="block text-lg mb-2">{t.description}</label>
          <Textarea placeholder={t.productDescription} rows={5} />
        </div>

        <LocationInput location={location} onLocationChange={setLocation} />

        <div className="flex flex-col gap-4">
          <RatingSystem rating={rating} onRatingChange={setRating} />

          <div className="flex justify-between items-center">
            <Button type="submit" className="w-1/3">{t.publishProduct}</Button>
            <InteractionButtons 
              isFavorite={isFavorite}
              onFavoriteClick={handleFavoriteClick}
            />
          </div>

          <SocialShare title={title} />
        </div>
      </form>
    </div>
  );
};