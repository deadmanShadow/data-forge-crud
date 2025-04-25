"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CreatePage() {
  const [formData, setFormData] = useState({ term: "", dataforge: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.term || !formData.dataforge) {
      setError("Please fill in all fields");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/dataforge", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Failed to add data");
      }
      router.push("/");
    } catch (error) {
      console.error("Error adding data:", error);
      setError("Failed to add data");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-emerald-700 mb-6 text-center">
        {t("addNew")}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="term"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            {t("term")}
          </label>
          <input
            type="text"
            name="term"
            id="term"
            placeholder="Enter term"
            value={formData.term}
            onChange={handleInputChange}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label
            htmlFor="dataforge"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            {t("dataForge")}
          </label>
          <textarea
            onChange={handleInputChange}
            value={formData.dataforge}
            name="dataforge"
            id="dataforge"
            rows={5}
            placeholder="Write something..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md"
        >
          {isLoading ? <LoadingSpinner /> : t("addNew")}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
