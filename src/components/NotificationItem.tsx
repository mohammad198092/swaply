import { X } from "lucide-react";
import { ShoppingBag, CreditCard, MessageCircle } from "lucide-react";
import { Notification } from "@/types/notification";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

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

export const NotificationItem = ({ notification, onRead, onDismiss }: NotificationItemProps) => {
  return (
    <div
      key={notification.id}
      className={`flex items-start space-x-4 p-3 rounded-lg transition-colors relative ${
        notification.read ? 'bg-gray-50' : 'bg-blue-50'
      }`}
      onClick={() => onRead(notification.id)}
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
          onDismiss(notification.id);
        }}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};