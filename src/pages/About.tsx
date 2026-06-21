import { Award, Users, Car, Clock, MapPin, Phone } from "lucide-react";

const stats = [
  { icon: Car, value: "500+", label: "Vehicles Rented" },
  { icon: Users, value: "10K+", label: "Happy Customers" },
  { icon: Clock, value: "9+", label: "Years in Business" },
  { icon: Award, value: "100%", label: "Satisfaction Rate" },
];

const values = [
  {
    title: "Quality First",
    description:
      "Every vehicle in our fleet undergoes rigorous inspection and maintenance to ensure your safety and comfort.",
  },
  {
    title: "Customer Focus",
    description:
      "We put our customers at the center of everything we do, from flexible booking to 24/7 roadside assistance.",
  },
  {
    title: "Transparency",
    description:
      "No hidden fees, no surprises. What you see is what you pay. We believe in honest, upfront pricing.",
  },
  {
    title: "Community",
    description:
      "Proudly serving Solon and the greater Cleveland area. We're your neighbors, and we treat you like family.",
  },
];

export default function About() {
  return (
    <main className="pt-28 pb-20 bg-[#f1f1f1] min-h-screen">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-20 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
                About Us
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
                Driving Excellence
                <br />
                <span className="italic font-light">Since 2015</span>
              </h1>
              <p className="text-sm text-black/50 leading-relaxed mb-4">
                DL Auto Rental has been Solon&apos;s trusted car rental partner for
                nearly a decade. What started as a small family business has grown
                into one of the most reliable vehicle rental services in Northeast
                Ohio.
              </p>
              <p className="text-sm text-black/50 leading-relaxed">
                Our mission is simple: provide quality vehicles at fair prices
                with exceptional customer service. We believe everyone deserves
                access to reliable transportation, whether it&apos;s for a day, a
                week, or longer.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/images/hero-car.jpg"
                  alt="DL Auto Rental Fleet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#D4A03A] rounded-2xl p-6 shadow-lg">
                <p className="text-3xl font-bold text-black">9+</p>
                <p className="text-xs text-black/60 uppercase tracking-wider">
                  Years of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-black mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon
                size={24}
                className="text-[#D4A03A] mx-auto mb-3"
              />
              <p className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-xs text-white/40 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-12 lg:px-20 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              What Drives Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-full bg-[#D4A03A]/10 flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-[#D4A03A]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-black mb-2">{value.title}</h3>
                <p className="text-xs text-black/40 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
                  Visit Us
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
                  Our Location
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#D4A03A] mt-0.5" />
                    <div>
                      <p className="text-sm text-black font-medium">
                        6001 Cochran Rd
                      </p>
                      <p className="text-sm text-black/40">
                        Solon, OH 44139
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#D4A03A]" />
                    <a
                      href="tel:+12169839539"
                      className="text-sm text-black hover:text-[#D4A03A] transition-colors"
                    >
                      +1 (216) 983-9539
                    </a>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-wider text-black/30 mb-3">
                    Business Hours
                  </p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Monday - Saturday</span>
                      <span className="text-black">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Sunday</span>
                      <span className="text-black">10:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative bg-[#f1f1f1] flex items-center justify-center p-8">
                <div className="text-center">
                  <Car size={48} className="text-[#D4A03A] mx-auto mb-4" />
                  <p className="text-lg font-bold text-black mb-2">
                    DL Auto Rental
                  </p>
                  <p className="text-sm text-black/40">
                    6001 Cochran Rd, Solon, OH
                  </p>
                  <a
                    href="https://maps.google.com/?q=6001+Cochran+Rd+Solon+OH+44139"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.1em] text-[#D4A03A] font-medium hover:underline"
                  >
                    <MapPin size={14} />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
