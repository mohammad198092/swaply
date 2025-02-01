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
        },
        productDetails: {
          description: "Description:",
          noDescription: "No description available",
          exchangeWith: "Accepts exchange with:"
        },
        notifications: {
          title: "Notifications",
          noNotifications: "No notifications",
          deleted: "Notification deleted",
          deletedAll: "All notifications deleted"
        },
        buttons: {
          submit: "Submit",
          cancel: "Cancel",
          save: "Save",
          edit: "Edit",
          delete: "Delete"
        }
      }
    }
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;