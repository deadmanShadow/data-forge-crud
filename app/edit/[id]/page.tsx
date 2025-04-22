"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({ term: "", dataforge: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/dataforge/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();

        setFormData({
          term: data?.term || "",
          dataforge: data?.dataforge || "",
        });
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/dataforge/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Data updated successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Error updating data");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-emerald-700 mb-6 text-center">
        Edit Data
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label
            htmlFor="term"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Term
          </label>
          <input
            type="text"
            name="term"
            id="term"
            value={formData.term}
            onChange={handleInputChange}
            placeholder="Enter term"
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="dataforge"
            className="block text-sm font-semibold text-gray-600 mb-1"
          >
            Data Forge Collection
          </label>
          <textarea
            name="dataforge"
            id="dataforge"
            rows={5}
            value={formData.dataforge}
            onChange={handleInputChange}
            placeholder="Write something..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md"
        >
          {isUpdating ? <LoadingSpinner /> : "Update Data"}
        </button>
      </form>
    </div>
  );
}
