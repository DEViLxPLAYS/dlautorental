import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

const faqs = [
  {
    question: "How do I book a car?",
    answer:
      "Booking is simple and fast. Browse our fleet online, choose your preferred car, and complete your reservation with secure payment. You can also contact our team directly via phone at +1 (216) 983-9539 or visit our location.",
  },
  {
    question: "Can the car be delivered to my location?",
    answer:
      "Yes! We offer free delivery and pickup service within the Solon and Cleveland area. Just let us know your location when booking, and we'll bring the car to you.",
  },
  {
    question: "What is the minimum rental period?",
    answer:
      "Our minimum rental period is one day (24 hours). We also offer weekly and monthly rates with significant discounts for longer rentals.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Basic liability insurance is included with every rental. We also offer premium full-coverage insurance options for additional peace of mind during your trip.",
  },
  {
    question: "What documents do I need to rent a car?",
    answer:
      "You'll need a valid driver's license, proof of residence, and the last 4 digits of your Social Security Number. You must also be at least 21 years old.",
  },
  {
    question: "Is there a security deposit required?",
    answer:
      "Our discounted weekly specials come with no deposit required. For other rentals, a refundable security deposit may apply depending on the vehicle type.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".faq-item");
            gsap.fromTo(
              items,
              { y: 20, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.06,
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            We&apos;ve Got Answers!
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item opacity-0 border border-black/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#f1f1f1]/50 transition-colors"
              >
                <span className="font-medium text-sm text-black pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-black/40 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-black/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
