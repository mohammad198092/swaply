export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'payment' | 'message';
  read: boolean;
  timestamp: Date;
}