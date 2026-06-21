import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "James Richardson",
    location: "Solon, OH",
    text: "The entire booking experience was seamless. I picked up a BMW 3 Series for a weekend trip, and it felt brand new. Everything from the cleanliness to the pickup process was perfectly organized. Definitely the best rental experience I've had.",
    rating: 5,
    car: "BMW 3 Series",
  },
  {
    name: "Sarah Mitchell",
    location: "Cleveland, OH",
    text: "DL Auto Rental made my business trip so much easier. The car was immaculate, the staff was friendly, and the whole process took less than 10 minutes. I'll definitely be coming back for all my rental needs.",
    rating: 5,
    car: "Honda Accord",
  },
  {
    name: "Michael Torres",
    location: "Beachwood, OH",
    text: "Rented a Chevy Traverse for a family road trip. The vehicle was spacious, clean, and ran perfectly. The no-deposit option on their discounted cars is a fantastic deal. Highly recommend!",
    rating: 5,
    car: "Chevy Traverse",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-reveal py-24 px-6 md:px-12 lg:px-20 bg-[#f1f1f1]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-4">
              Trusted by
              <br />
              <span className="italic font-light">Thousands</span>
            </h2>
            <p className="text-sm text-black/50 max-w-md leading-relaxed">
              Real experiences from real drivers. See why thousands of customers
              trust us for comfort, quality, and reliability every time they hit
              the road.
            </p>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <ChevronRight size={16} />
              </button>
              <span className="text-xs text-black/40 ml-2">
                {current + 1} / {testimonials.length}
              </span>
            </div>
          </div>

          {/* Right - Testimonial Card */}
          <div className="relative">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === current
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8 absolute inset-0 pointer-events-none"
                }`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <Quote
                    size={32}
                    className="text-[#D4A03A]/30 mb-4"
                    fill="currentColor"
                  />
                  <p className="text-sm text-black/70 leading-relaxed mb-6">
                    {t.text}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className="text-[#D4A03A]"
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                      <span className="text-sm font-bold text-black">
                        {t.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-black">
                        {t.name}
                      </p>
                      <p className="text-xs text-black/40">
                        {t.location} — {t.car}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
