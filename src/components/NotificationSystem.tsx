import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NotificationItem } from "./NotificationItem";
import { Notification } from "@/types/notification";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // محاكاة جلب الإشعارات
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: language === 'ar' ? "طلب جديد" : "New Order",
        message: language === 'ar' ? "تم استلام طلبك بنجاح" : "Your order has been received successfully",
        type: "order",
        read: false,
        timestamp: new Date()
      },
      {
        id: "2",
        title: language === 'ar' ? "تأكيد الدفع" : "Payment Confirmation",
        message: language === 'ar' ? "تم تأكيد عملية الدفع" : "Payment has been confirmed",
        type: "payment",
        read: false,
        timestamp: new Date(Date.now() - 3600000)
      }
    ];

    setNotifications(mockNotifications);
    console.log(language === 'ar' ? 'تم تحميل الإشعارات:' : 'Notifications loaded:', mockNotifications);
  }, [language]);

  useEffect(() => {
    const handleDismissAll = () => {
      console.log(language === 'ar' ? 'جاري حذف جميع الإشعارات' : 'Dismissing all notifications');
      setNotifications([]);
      toast({
        title: t.notifications.deletedAll,
        description: t.notifications.deletedAll
      });
    };

    window.addEventListener('dismissAllNotifications', handleDismissAll);
    
    return () => {
      window.removeEventListener('dismissAllNotifications', handleDismissAll);
    };
  }, [toast, language, t.notifications.deletedAll]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
    console.log(language === 'ar' ? 'تم تحديد الإشعار كمقروء:' : 'Notification marked as read:', id);
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    console.log(language === 'ar' ? 'تم حذف الإشعار:' : 'Notification dismissed:', id);
    toast({
      title: t.notifications.deleted,
      description: t.notifications.deleted
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-lg animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{t.notifications.title}</CardTitle>
        <div className="relative">
          <Bell className="w-4 h-4 text-gray-500" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2">
              {unreadCount}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">{t.notifications.noNotifications}</p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={markAsRead}
              onDismiss={dismissNotification}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};