"use client";

import { useState } from "react";

export default function LanguageSwitcher() {
  const [lang, setLang] = useState("en");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLang(selectedLang);
    console.log("Language changed to:", selectedLang);
  };

  return (
    <select
      className="py-2 px-4 rounded-full bg-white text-emerald-700 font-semibold shadow-md"
      value={lang}
      onChange={handleChange}
    >
      <option value="en">EN</option>
      <option value="bn">BN</option>
      <option value="ar">AR</option>
    </select>
  );
}
