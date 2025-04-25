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
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState<string | null>(null);

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
        toast.error("Failed to load DataForge 😓");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataForge();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/dataforge/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setDataForge((prev) => prev.filter((i) => i.$id !== id));
      toast.success("Deleted successfully ✅");
    } catch {
      setIsError("Failed to delete data, Please try again");
      toast.error("Delete failed 🚫");
    }
  };

  return (
    <div>
      {error && <p className="py-4 text-red-600">{error}</p>}
      {isLoading ? (
        <div className="py-4">
          {" "}
          <LoadingSpinner />
        </div>
      ) : dataforge?.length > 0 ? (
        <>
          {dataforge.map((dataforge) => (
            <div
              key={dataforge.$id}
              className="p-4 my-4 bg-white border border-slate-200 rounded-lg shadow-sm"
            >
              <div className="text-xl font-semibold text-emerald-700">
                {dataforge.term}
              </div>
              <p className="mt-2 text-slate-700 leading-relaxed">
                {dataforge.dataforge}
              </p>
              <div className="flex gap-4 mt-4 justify-end">
                <Link
                  href={`/edit/${dataforge.$id}`}
                  className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-md uppercase text-sm font-semibold tracking-widest"
                >
                  {t("edit")}
                </Link>
                <button
                  onClick={() => handleDelete(dataforge.$id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md uppercase text-sm font-semibold tracking-widest"
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No Data Found</p>
      )}
    </div>
  );
}
