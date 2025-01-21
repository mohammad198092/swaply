import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export const FooterSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-8 mt-auto">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center md:text-right">
          <div>
            <h4 className="text-lg font-semibold mb-3 md:mb-4">{t.title}</h4>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{t.rights}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 md:mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-sm md:text-base text-gray-600 dark:text-gray-400 hover:text-primary">
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 md:mb-4">تواصل معنا</h4>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              support@swaply.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};