import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImageUpload } from "./ImageUpload";

export const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("الرجاء إدخال عنوان المنتج");
      return false;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      toast.error("الرجاء إدخال سعر صحيح");
      return false;
    }
    if (!description.trim()) {
      toast.error("الرجاء إدخال وصف المنتج");
      return false;
    }
    if (images.length === 0) {
      toast.error("الرجاء إضافة صورة واحدة على الأقل");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("محاولة إضافة منتج جديد");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // محاكاة إرسال البيانات للخادم
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("تم إضافة المنتج بنجاح:", {
        title,
        price,
        description,
        images
      });
      
      toast.success("تم إضافة المنتج بنجاح");
      
      // إعادة تعيين النموذج
      setTitle("");
      setPrice("");
      setDescription("");
      setImages([]);
    } catch (error) {
      console.error("خطأ في إضافة المنتج:", error);
      toast.error("حدث خطأ أثناء إضافة المنتج");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImagesChange = (uploadedImages: File[]) => {
    // تحويل الملفات إلى URLs
    const imageUrls = uploadedImages.map(file => URL.createObjectURL(file));
    setImages(imageUrls);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium">عنوان المنتج</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="أدخل عنوان المنتج"
          disabled={isSubmitting}
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">السعر</label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="أدخل سعر المنتج"
          disabled={isSubmitting}
          min="0"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">الوصف</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="أدخل وصف المنتج"
          disabled={isSubmitting}
          required
        />
      </div>

      <ImageUpload
        images={images}
        onImagesChange={handleImagesChange}
        disabled={isSubmitting}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "جاري الإضافة..." : "إضافة المنتج"}
      </Button>
    </form>
  );
};