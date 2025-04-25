"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LangSwitcher";
import LoadingSpinner from "./LoadingSpinner";
export default function Header() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleAddNew = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/create");
  };

  return (
    <header className="p-6 items-center border-b flex justify-between bg-emerald-700 rounded-bl-lg rounded-br-lg">
      <Link className="text-2xl font-bold text-white" href={"/"}>
        {t("dataForge")}
      </Link>
      <div className="flex items-center gap-4">
        <button
          onClick={handleAddNew}
          disabled={loading}
          className="bg-slate-100 grid place-items-center py-2 px-4 rounded-full font-bold shadow-md min-w-[100px]"
        >
          {loading ? <LoadingSpinner /> : t("addNew")}
        </button>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
