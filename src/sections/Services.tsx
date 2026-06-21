import { useEffect, useRef } from "react";
import {
  Check,
  Shield,
  Clock,
  Truck,
  Headphones,
  Sparkles,
  Star,
} from "lucide-react";
import gsap from "gsap";

const services = [
  {
    icon: Clock,
    title: "Flexible Rental Terms",
    description: "Daily, weekly, or monthly rentals to fit your schedule",
  },
  {
    icon: Shield,
    title: "Premium Insurance",
    description: "Full coverage options for peace of mind on every drive",
  },
  {
    icon: Truck,
    title: "Free Delivery & Pickup",
    description: "We bring the car to you and pick it up when you're done",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance whenever you need it",
  },
  {
    icon: Sparkles,
    title: "Clean & Sanitized Fleet",
    description: "Every vehicle thoroughly cleaned between rentals",
  },
  {
    icon: Star,
    title: "No Hidden Fees",
    description: "Transparent pricing with no surprise charges",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".service-item");
            gsap.fromTo(
              items,
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
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
    <section ref={sectionRef} className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left - Heading */}
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
              Why Choose
              <br />
              <span className="italic font-light">DL Auto?</span>
            </h2>
            <p className="text-sm text-black/50 leading-relaxed max-w-md mb-8">
              We combine premium vehicles with exceptional service to deliver an
              unparalleled rental experience. From flexible terms to round-the-clock
              support, every detail is designed around your needs.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#D4A03A]/10 flex items-center justify-center">
                <Check size={20} className="text-[#D4A03A]" />
              </div>
              <div>
                <p className="font-semibold text-sm text-black">100% Satisfaction</p>
                <p className="text-xs text-black/40">Guaranteed on every rental</p>
              </div>
            </div>
          </div>

          {/* Right - Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <div
                key={i}
                className="service-item opacity-0 p-5 rounded-xl bg-[#f1f1f1] hover:bg-[#F0E6D2] transition-colors duration-300 group"
              >
                <service.icon
                  size={22}
                  className="text-[#D4A03A] mb-3 group-hover:scale-110 transition-transform"
                />
                <h3 className="font-semibold text-sm text-black mb-1">
                  {service.title}
                </h3>
                <p className="text-xs text-black/40 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
