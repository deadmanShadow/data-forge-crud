"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../../lib/i18n";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    i18n.changeLanguage(selectedLang);
    console.log("Language changed to:", selectedLang);
  };

  return (
    <select
      value={lang}
      onChange={handleChange}
      className="py-2 px-4 rounded-full bg-white text-emerald-700 font-semibold shadow-md"
    >
      <option value="en">English</option>
      <option value="bn">বাংলা</option>
    </select>
  );
}
