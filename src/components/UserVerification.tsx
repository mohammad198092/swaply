import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/lib/language-context";

const verificationSchema = z.object({
  fullName: z.string().min(3, {
    message: "الاسم يجب أن يكون 3 أحرف على الأقل"
  }),
  email: z.string().email({
    message: "البريد الإلكتروني غير صالح"
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"
  }),
  idNumber: z.string().min(10, {
    message: "رقم الهوية يجب أن يكون 10 أرقام"
  })
});

type VerificationForm = z.infer<typeof verificationSchema>;

export const UserVerification = () => {
  const { language } = useLanguage();
  const form = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      idNumber: ""
    }
  });

  const onSubmit = (data: VerificationForm) => {
    console.log("Form submitted:", data);
    toast.success(language === 'ar' ? "تم إرسال بيانات التحقق بنجاح" : "Verification data sent successfully");
  };

  const labels = {
    title: language === 'ar' ? "التحقق من البيانات" : "Verify Information",
    fullName: language === 'ar' ? "الاسم الكامل" : "Full Name",
    email: language === 'ar' ? "البريد الإلكتروني" : "Email",
    phone: language === 'ar' ? "رقم الهاتف" : "Phone Number",
    idNumber: language === 'ar' ? "رقم الهوية" : "ID Number",
    submit: language === 'ar' ? "تأكيد البيانات" : "Confirm Information",
    placeholders: {
      fullName: language === 'ar' ? "أدخل اسمك الكامل" : "Enter your full name",
      email: language === 'ar' ? "أدخل بريدك الإلكتروني" : "Enter your email",
      phone: language === 'ar' ? "05xxxxxxxx" : "05xxxxxxxx",
      idNumber: language === 'ar' ? "أدخل رقم الهوية" : "Enter your ID number"
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">{labels.title}</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels.fullName}</FormLabel>
                  <FormControl>
                    <Input placeholder={labels.placeholders.fullName} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels.email}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={labels.placeholders.email} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels.phone}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder={labels.placeholders.phone} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labels.idNumber}</FormLabel>
                  <FormControl>
                    <Input placeholder={labels.placeholders.idNumber} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">{labels.submit}</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};