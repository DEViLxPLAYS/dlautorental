import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-20 bg-black relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Hit the Road?
        </h2>
        <p className="text-sm md:text-base text-white/50 mb-8 max-w-lg mx-auto leading-relaxed">
          Book your premium rental today and save 15% on your first reservation.
          Experience the DL Auto difference.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/fleet"
            className="flex items-center gap-2 bg-[#D4A03A] text-black text-xs uppercase tracking-[0.1em] font-medium px-8 py-4 rounded-full hover:bg-white transition-colors"
          >
            Get Started
            <ArrowRight size={14} />
          </Link>
          <a
            href="tel:+12169839539"
            className="text-white/60 text-xs uppercase tracking-[0.1em] hover:text-white transition-colors"
          >
            Call Us: +1 (216) 983-9539
          </a>
        </div>
      </div>
    </section>
  );
}
