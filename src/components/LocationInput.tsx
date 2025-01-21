import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

interface LocationInputProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export const LocationInput = ({ location, onLocationChange }: LocationInputProps) => {
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        onLocationChange(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  };

  return (
    <div>
      <label className="block text-lg mb-2">الموقع</label>
      <div className="flex gap-2">
        <Input value={location} placeholder="حدد موقعك" readOnly />
        <Button type="button" onClick={handleLocationClick}>
          <MapPin className="h-4 w-4 ml-2" />
          تحديد الموقع
        </Button>
      </div>
    </div>
  );
};