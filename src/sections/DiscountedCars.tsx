import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { Tag, Shield, Calendar } from "lucide-react";
import gsap from "gsap";

const discountedCars = [
  {
    id: 1,
    name: "Ford Fusion",
    year: 2012,
    originalPrice: 399,
    discountedPrice: 350,
    image: "/images/ford-fusion.jpg",
    tag: "Most Popular",
  },
  {
    id: 2,
    name: "Subaru Legacy",
    year: 2016,
    originalPrice: 425,
    discountedPrice: 399,
    image: "/images/subaru-legacy.jpg",
    tag: "Best Value",
  },
  {
    id: 3,
    name: "Chevy Traverse",
    year: 2011,
    originalPrice: 450,
    discountedPrice: 425,
    image: "/images/chevy-traverse.jpg",
    tag: "Family SUV",
  },
  {
    id: 4,
    name: "Ford Escape",
    year: 2011,
    originalPrice: 399,
    discountedPrice: 375,
    image: "/images/ford-escape.jpg",
    tag: "Compact SUV",
  },
  {
    id: 5,
    name: "Toyota Camry",
    year: 2009,
    originalPrice: 375,
    discountedPrice: 325,
    image: "/images/toyota-camry.jpg",
    tag: "Lowest Price",
  },
];

export default function DiscountedCars() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".discount-card");
            gsap.fromTo(
              cards,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.12,
                ease: "power3.out",
              }
            );
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
    <section ref={sectionRef} className="py-20 px-6 md:px-12 lg:px-20 bg-[#f1f1f1]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-[#D4A03A]" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium">
                Special Offers
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Discounted Cars
            </h2>
            <p className="text-sm text-black/50 mt-2 max-w-md">
              Take advantage of our weekly specials. All discounted cars come with
              no deposit required and full insurance coverage.
            </p>
          </div>
          <Link
            to="/fleet"
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.1em] font-medium text-black/70 hover:text-[#D4A03A] transition-colors nav-link"
          >
            View All Cars
          </Link>
        </div>

        {/* Cars Grid - Horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {discountedCars.map((car) => (
            <div
              key={car.id}
              className="discount-card opacity-0 min-w-[280px] md:min-w-0 snap-start bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-[#D4A03A] text-black text-[10px] uppercase tracking-[0.1em] font-bold px-3 py-1 rounded-full">
                    Discounted
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/80 text-white text-[10px] uppercase tracking-[0.05em] font-medium px-2 py-1 rounded-full flex items-center gap-1">
                    <Shield size={10} />
                    No Deposit
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-black text-sm">
                    {car.name}
                  </h3>
                  <span className="text-[10px] text-black/40">{car.year}</span>
                </div>
                <p className="text-[10px] text-black/40 uppercase tracking-wider mb-3">
                  {car.tag}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg font-bold text-[#D4A03A]">
                    ${car.discountedPrice}
                  </span>
                  <span className="text-xs text-black/30 line-through">
                    ${car.originalPrice}
                  </span>
                  <span className="text-[10px] text-black/40">/week</span>
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-black text-white text-xs uppercase tracking-[0.08em] font-medium py-2.5 rounded-full hover:bg-[#D4A03A] transition-colors"
                >
                  <Calendar size={12} />
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
