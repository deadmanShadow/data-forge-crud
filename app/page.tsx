"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import LoadingSpinner from "./components/LoadingSpinner";
interface IdataForge {
  $id: string;
  term: string;
  dataforge: string;
}

export default function Home() {
  const [dataforge, setDataForge] = useState<IdataForge[]>([]);
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState<string | null>(null);
  const [translationLoading, setTranslationLoading] = useState(false);
  const currentLang = i18n.language;

  useEffect(() => {
    const fetchDataForge = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/dataforge");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDataForge(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setIsError("Failed to load DataForge");
        toast.error("Failed to load DataForge ");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForge();
  }, []);

  const [translatedData, setTranslatedData] = useState<IdataForge[]>([]);

  useEffect(() => {
    const translateData = async () => {
      if (dataforge.length === 0 || currentLang === "en") {
        setTranslatedData(dataforge);
        return;
      }

      setTranslationLoading(true);

      try {
        const { translateText } = await import("./utils/translate");

        const batchSize = 5;
        let translated = [...dataforge];

        for (let i = 0; i < dataforge.length; i += batchSize) {
          const batch = dataforge.slice(i, i + batchSize);
          const batchPromises = batch.map(async (item, index) => {
            try {
              const translatedTerm = await translateText(
                item.term,
                "en",
                currentLang
              );
              const translatedDataforge = await translateText(
                item.dataforge,
                "en",
                currentLang
              );

              return {
                ...item,
                term: translatedTerm,
                dataforge: translatedDataforge,
              };
            } catch (error) {
              console.error(`Translation error for item ${i + index}:`, error);
              return item;
            }
          });
          const batchResults = await Promise.all(batchPromises);
          translated.splice(i, batchResults.length, ...batchResults);
          setTranslatedData([...translated]);
          if (i + batchSize < dataforge.length) {
            await new Promise((r) => setTimeout(r, 1000));
          }
        }
      } catch (error) {
        console.error("Translation error:", error);
        toast.warning("Some translations may not be complete");

        if (translatedData.length === 0) {
          setTranslatedData(dataforge);
        }
      } finally {
        setTranslationLoading(false);
      }
    };

    translateData();
  }, [currentLang, dataforge]);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: t("areYouSure"),
      text: t("cantRevert"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: t("yesDelete"),
      cancelButtonText: t("cancel"),
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/dataforge/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setDataForge((prev) => prev.filter((i) => i.$id !== id));
      toast.success(t("deletedSuccess"));
    } catch {
      setIsError(t("deleteError"));
      toast.error(t("deleteFailed"));
    }
  };

  const dataToDisplay = translatedData.length > 0 ? translatedData : dataforge;

  return (
    <div>
      {error && <p className="py-4 text-red-600">{error}</p>}

      {isLoading ? (
        <div className="py-4">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {translationLoading && (
            <div className="text-sm bg-blue-50 text-blue-600 p-2 rounded-md mb-4">
              {t("translatingContent")}... <LoadingSpinner />
            </div>
          )}

          {dataToDisplay.length > 0 ? (
            <>
              {dataToDisplay.map((item) => (
                <div
                  key={item.$id}
                  className="p-4 my-4 bg-white border border-slate-200 rounded-lg shadow-sm"
                  dir={currentLang === "ar" ? "rtl" : "ltr"}
                >
                  <div className="text-xl font-semibold text-emerald-700">
                    {item.term}
                  </div>
                  <p className="mt-2 text-slate-700 leading-relaxed">
                    {item.dataforge}
                  </p>
                  <div
                    className={`flex gap-4 mt-4 ${
                      currentLang === "ar" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <Link
                      href={`/edit/${item.$id}`}
                      className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md uppercase text-sm font-semibold tracking-widest"
                    >
                      {t("edit")}
                    </Link>
                    <button
                      onClick={() => handleDelete(item.$id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md uppercase text-sm font-semibold tracking-widest"
                    >
                      {t("delete")}
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center py-8 text-slate-500">
              {t("noDataFound")}
            </p>
          )}
        </>
      )}
    </div>
  );
}
