import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <Button asChild className="mb-8">
          <Link to="/">
            <ArrowRight className="ml-2" />
            العودة للرئيسية
          </Link>
        </Button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">شروط الاستخدام وإخلاء المسؤولية</h1>
          
          <div className="space-y-4">
            <section>
              <h2 className="text-xl font-semibold mb-2">شروط الاستخدام</h2>
              <p>باستخدام هذا التطبيق، أنت توافق على الشروط التالية:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>يجب أن تكون جميع المعلومات المقدمة صحيحة ودقيقة</li>
                <li>يمنع نشر أي محتوى مخالف للقانون أو الآداب العامة</li>
                <li>يجب احترام حقوق الملكية الفكرية للآخرين</li>
                <li>نحتفظ بالحق في إزالة أي محتوى مخالف للشروط</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">إخلاء المسؤولية</h2>
              <p>نحن لا نتحمل المسؤولية عن:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>أي معاملات تتم بين المستخدمين</li>
                <li>دقة أو صحة المعلومات المقدمة من المستخدمين</li>
                <li>أي خسائر أو أضرار ناتجة عن استخدام التطبيق</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;