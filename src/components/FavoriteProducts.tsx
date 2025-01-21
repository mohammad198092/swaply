import { useState } from "react";
import { Heart, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FavoriteProduct {
  id: string;
  title: string;
  price: number;
}

export const FavoriteProducts = () => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([
    { id: "1", title: "هاتف ذكي", price: 999 },
    { id: "2", title: "حاسوب محمول", price: 1499 }
  ]);

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
    console.log("تم إزالة المنتج من المفضلة:", id);
    toast.success("تم إزالة المنتج من المفضلة");
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">المنتجات المفضلة</CardTitle>
        <Heart className="h-5 w-5 text-red-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            لا توجد منتجات في المفضلة
          </p>
        ) : (
          <div className="space-y-3">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{product.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {product.price} ريال
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFavorite(product.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};