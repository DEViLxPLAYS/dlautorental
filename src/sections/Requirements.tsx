import { useEffect, useRef } from "react";
import {
  CreditCard,
  UserCheck,
  Home,
  Hash,
  Car,
} from "lucide-react";
import gsap from "gsap";

const requirements = [
  {
    icon: CreditCard,
    title: "Valid Driver's License",
    description: "Must have a valid driver's license in good standing",
  },
  {
    icon: UserCheck,
    title: "Age Requirement",
    description: "Must be at least 21 years old to rent",
  },
  {
    icon: Home,
    title: "Proof of Residence",
    description: "Must bring proof of current residence",
  },
  {
    icon: Hash,
    title: "SSN Verification",
    description: "Must confirm last 4 of SSN (for rental coverage)",
  },
];

export default function Requirements() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".req-item");
            gsap.fromTo(
              items,
              { x: -30, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
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
    <section
      ref={sectionRef}
      className="py-24 px-6 md:px-12 lg:px-20 bg-[#f1f1f1]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
              Before You Rent
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black leading-tight mb-6">
              Requirements
              <br />
              <span className="italic font-light">to Rent</span>
            </h2>
            <p className="text-sm text-black/50 leading-relaxed max-w-md mb-8">
              To ensure a smooth rental experience, please make sure you meet all
              the requirements below before visiting our location.
            </p>

            {/* Requirements List */}
            <div className="space-y-4">
              {requirements.map((req, i) => (
                <div
                  key={i}
                  className="req-item opacity-0 flex items-start gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D4A03A]/10 flex items-center justify-center flex-shrink-0">
                    <req.icon size={18} className="text-[#D4A03A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-black">
                      {req.title}
                    </h3>
                    <p className="text-xs text-black/40 mt-0.5">
                      {req.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Car Illustration */}
          <div className="relative hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4A03A]/20 to-transparent rounded-3xl transform rotate-3" />
              <div className="relative bg-white rounded-3xl p-8 shadow-lg">
                <Car
                  size={64}
                  className="text-[#D4A03A] mb-6 mx-auto"
                  strokeWidth={1}
                />
                <h3 className="text-xl font-bold text-black text-center mb-3">
                  Ready to Drive?
                </h3>
                <p className="text-sm text-black/50 text-center mb-6 leading-relaxed">
                  Gather your documents and visit us at our Solon location. Our
                  team will have you on the road in minutes.
                </p>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.1em] text-black/30 mb-2">
                    Visit Us
                  </p>
                  <p className="text-sm font-medium text-black">
                    6001 Cochran Rd, Solon, OH 44139
                  </p>
                  <p className="text-sm text-[#D4A03A] mt-1 font-medium">
                    +1 (216) 983-9539
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
