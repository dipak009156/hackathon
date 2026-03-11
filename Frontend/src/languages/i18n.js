import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        heroTitle: "Sanitation Worker Safety & Assistance System",
        heroDesc:
          "A technology-enabled platform to enhance safety, dignity, and operational efficiency of sanitation workers.",
        safety: "Worker Safety",
        alert: "Emergency Alerts",
        zone: "Zone Monitoring"
      }
    },

    mr: {
      translation: {
        heroTitle: "स्वच्छता कामगार सुरक्षा व सहाय्य प्रणाली",
        heroDesc:
          "स्वच्छता कामगारांची सुरक्षा आणि कार्यक्षमता वाढवण्यासाठी तंत्रज्ञान आधारित प्रणाली.",
        safety: "कामगार सुरक्षा",
        alert: "आपत्कालीन सूचना",
        zone: "क्षेत्र निरीक्षण"
      }
    }
  },

  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

export default i18n;