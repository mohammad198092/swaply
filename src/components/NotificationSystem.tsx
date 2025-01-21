import { useState, useEffect } from "react";
import { Bell, ShoppingBag, CreditCard, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'message';
  read: boolean;
  timestamp: Date;
}

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

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4" />;
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      case 'message':
        return <MessageCircle className="w-4 h-4" />;
    }
  };

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
          <div
            key={notification.id}
            className={`flex items-start space-x-4 p-3 rounded-lg transition-colors relative ${
              notification.read ? 'bg-gray-50' : 'bg-blue-50'
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex-shrink-0">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 rtl:mr-4 ltr:ml-4">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              <p className="text-sm text-gray-500">{notification.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismissNotification(notification.id);
              }}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};