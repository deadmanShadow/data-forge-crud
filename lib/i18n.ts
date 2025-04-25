"use client";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          term: "Term",
          dataForge: "Data Forge",
          addNew: "Add New Data",
          edit: "Edit",
          delete: "Delete",
        },
      },
      bn: {
        translation: {
          term: "টার্ম",
          dataForge: "ডেটা ফোর্জ",
          addNew: "নতুন ডাটা যোগ করুন",
          edit: "সম্পাদনা করুন",
          delete: "মুছে ফেলুন",
        },
      },
      arb: {
        translation: {
          term: "مصطلح",
          dataForge: "مجموعة داتا فورج",
          addNew: "إضافة جديدة",
          edit: "تعديل",
          delete: "حذف",
        },
      },
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
