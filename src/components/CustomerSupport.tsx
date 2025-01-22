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
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    try {
      setIsSending(true);
      console.log("إرسال رسالة جديدة:", newMessage);
      
      const userMessage: Message = {
        id: Date.now().toString(),
        text: newMessage,
        isUser: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");
      
      // محاكاة رد تلقائي بعد ثانية واحدة
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const autoResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "شكراً لتواصلك معنا. سيقوم أحد ممثلي خدمة العملاء بالرد عليك قريباً.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, autoResponse]);
      toast.success("تم استلام رسالتك بنجاح!");
    } catch (error) {
      console.error("خطأ في إرسال الرسالة:", error);
      toast.error("عذراً، حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">خدمة العملاء</CardTitle>
        <MessageCircle className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-[300px] overflow-y-auto space-y-4 mb-4 p-2">
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
                <p className="text-sm break-words">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
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
            disabled={isSending}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isSending}
            className="min-w-[40px]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};