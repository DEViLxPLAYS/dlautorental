import { useEffect, useRef } from "react";
import { Search, Calendar, Car, ChevronRight } from "lucide-react";
import gsap from "gsap";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Choose",
    description: "Browse our fleet and select the perfect vehicle for your needs",
  },
  {
    number: "02",
    icon: Calendar,
    title: "Book",
    description: "Reserve online or give us a call to secure your rental",
  },
  {
    number: "03",
    icon: Car,
    title: "Drive",
    description: "Pick up your car and hit the road with confidence",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".step-item");
            gsap.fromTo(
              items,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
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
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
            The Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Simple. Fast. Hassle-Free.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line - Desktop only */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[1px] border-t-2 border-dashed border-black/10" />

          {steps.map((step, i) => (
            <div
              key={i}
              className="step-item opacity-0 relative text-center"
            >
              {/* Number Badge */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A03A] text-white mb-6 mx-auto">
                <step.icon size={24} />
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="text-xl font-bold text-black mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-black/50 max-w-xs mx-auto leading-relaxed">
                {step.description}
              </p>

              {i < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-4">
                  <ChevronRight size={20} className="text-[#D4A03A] rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
