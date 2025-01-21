import { Share2, Facebook, Twitter, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface SocialShareProps {
  title?: string;
  url?: string;
}

export const SocialShare = ({ title = "", url = window.location.href }: SocialShareProps) => {
  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(url);

  const handleShare = (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${shareText}%20${shareUrl}`;
        break;
      default:
        if (navigator.share) {
          navigator.share({
            title: title,
            url: url
          }).then(() => {
            toast({
              title: "تم المشاركة بنجاح",
              description: "تم مشاركة المنتج على منصتك المفضلة",
            });
          }).catch(console.error);
          return;
        }
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'noopener,noreferrer');
      toast({
        title: "تم فتح نافذة المشاركة",
        description: "يمكنك الآن مشاركة المنتج",
      });
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('facebook')}
        className="hover:bg-blue-100"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('twitter')}
        className="hover:bg-sky-100"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('whatsapp')}
        className="hover:bg-green-100"
      >
        <Send className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('native')}
        className="hover:bg-gray-100"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};