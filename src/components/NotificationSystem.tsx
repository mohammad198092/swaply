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

export const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Order",
      message: "Your order has been received successfully",
      type: "order",
      read: false,
      timestamp: new Date()
    },
    {
      id: "2",
      title: "Payment Confirmation",
      message: "Payment has been confirmed",
      type: "payment",
      read: false,
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);

  useEffect(() => {
    const handleDismissAll = () => {
      console.log('Dismissing all notifications due to language change');
      setNotifications([]);
    };

    window.addEventListener('dismissAllNotifications', handleDismissAll);
    
    return () => {
      window.removeEventListener('dismissAllNotifications', handleDismissAll);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
        <Bell className="w-4 h-4 text-gray-500" />
        {unreadCount > 0 && (
          <Badge variant="destructive" className="absolute -top-2 -right-2">
            {unreadCount}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRead={markAsRead}
            onDismiss={dismissNotification}
          />
        ))}
      </CardContent>
    </Card>
  );
};