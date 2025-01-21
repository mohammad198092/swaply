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

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // محاكاة جلب الإشعارات
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "طلب جديد",
        message: "تم استلام طلبك بنجاح",
        type: "order",
        read: false,
        timestamp: new Date()
      },
      {
        id: "2",
        title: "تأكيد الدفع",
        message: "تم تأكيد عملية الدفع",
        type: "payment",
        read: false,
        timestamp: new Date(Date.now() - 3600000)
      }
    ];

    setNotifications(mockNotifications);
    console.log('تم تحميل الإشعارات:', mockNotifications);
  }, []);

  useEffect(() => {
    const handleDismissAll = () => {
      console.log('جاري حذف جميع الإشعارات');
      setNotifications([]);
      toast({
        title: "تم حذف الإشعارات",
        description: "تم حذف جميع الإشعارات بنجاح"
      });
    };

    window.addEventListener('dismissAllNotifications', handleDismissAll);
    
    return () => {
      window.removeEventListener('dismissAllNotifications', handleDismissAll);
    };
  }, [toast]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
    console.log('تم تحديد الإشعار كمقروء:', id);
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    console.log('تم حذف الإشعار:', id);
    toast({
      title: "تم حذف الإشعار",
      description: "تم حذف الإشعار بنجاح"
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-lg animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">الإشعارات</CardTitle>
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
          <p className="text-center text-gray-500">لا توجد إشعارات</p>
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