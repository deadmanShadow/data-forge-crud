export default function CreatePage() {
  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-emerald-700 mb-6 text-center">
        Add New Data
      </h2>

      <form className="flex flex-col gap-5">
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
            placeholder="Write something..."
            className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold py-2 px-6 rounded-lg shadow-md"
        >
          Add Data
        </button>
      </form>
    </div>
  );
}
