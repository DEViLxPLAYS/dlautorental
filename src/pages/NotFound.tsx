import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f1f1f1] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-black/10 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-black mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-black/40 mb-8 max-w-md mx-auto">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-black text-white text-xs uppercase tracking-[0.08em] font-medium px-8 py-4 rounded-full hover:bg-[#D4A03A] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
