export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
      <div className="w-12 h-12 border-4 border-emerald-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}
