import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const CustomerSupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    console.log("إرسال رسالة جديدة:", newMessage);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // محاكاة رد تلقائي
    setTimeout(() => {
      const autoResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "شكراً لتواصلك معنا. سيقوم أحد ممثلي خدمة العملاء بالرد عليك قريباً.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, autoResponse]);
      toast.success("تم استلام رسالتك!");
    }, 1000);
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">خدمة العملاء</CardTitle>
        <MessageCircle className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px] overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString('ar-SA')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};