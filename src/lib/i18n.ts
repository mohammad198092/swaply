import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to Swaply",
        description: "Exchange and sell your items easily",
        categories: {
          all: "All",
          electronics: "Electronics",
          computers: "Computers",
          accessories: "Accessories",
          vehicles: "Vehicles",
          watches: "Watches",
          cameras: "Cameras"
        },
        actions: {
          addToCart: "Add to Cart",
          share: "Share",
          favorite: "Add to Favorites",
          removeFavorite: "Remove from Favorites"
        }
      }
    },
    ar: {
      translation: {
        welcome: "مرحباً بك في سوابلي",
        description: "تبادل وبيع منتجاتك بسهولة",
        categories: {
          all: "الكل",
          electronics: "إلكترونيات",
          computers: "حواسيب",
          accessories: "اكسسوارات",
          vehicles: "سيارات",
          watches: "ساعات",
          cameras: "كاميرات"
        },
        actions: {
          addToCart: "إضافة للسلة",
          share: "مشاركة",
          favorite: "إضافة للمفضلة",
          removeFavorite: "إزالة من المفضلة"
        }
      }
    },
    es: {
      translation: {
        welcome: "Bienvenido a Swaply",
        description: "Intercambia y vende tus artículos fácilmente",
        categories: {
          all: "Todos",
          electronics: "Electrónicos",
          computers: "Computadoras",
          accessories: "Accesorios",
          vehicles: "Vehículos",
          watches: "Relojes",
          cameras: "Cámaras"
        },
        actions: {
          addToCart: "Añadir al Carrito",
          share: "Compartir",
          favorite: "Añadir a Favoritos",
          removeFavorite: "Quitar de Favoritos"
        }
      }
    }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;