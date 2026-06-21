import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { Calendar, Filter, Search } from "lucide-react";
import gsap from "gsap";

const carTypes = ["all", "sedan", "suv", "truck", "luxury", "sports"];

const defaultCars = [
  {
    id: 1,
    name: "Ford Fusion",
    brand: "Ford",
    year: 2012,
    type: "sedan" as const,
    pricePerDay: "57",
    discountedPrice: "350",
    imageUrl: "/images/ford-fusion.jpg",
    description: "Reliable sedan with great fuel economy and comfortable interior.",
    features: ["5 Seats", "Automatic", "Bluetooth", "Backup Camera"],
    isDiscounted: true,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Subaru Legacy",
    brand: "Subaru",
    year: 2016,
    type: "sedan" as const,
    pricePerDay: "61",
    discountedPrice: "399",
    imageUrl: "/images/subaru-legacy.jpg",
    description: "All-wheel drive sedan perfect for Ohio weather conditions.",
    features: ["5 Seats", "AWD", "Heated Seats", "Navigation"],
    isDiscounted: true,
    isAvailable: true,
  },
  {
    id: 3,
    name: "Chevy Traverse",
    brand: "Chevrolet",
    year: 2011,
    type: "suv" as const,
    pricePerDay: "65",
    discountedPrice: "425",
    imageUrl: "/images/chevy-traverse.jpg",
    description: "Spacious 3-row SUV ideal for families and road trips.",
    features: ["7 Seats", "V6 Engine", "Third Row", "Tow Package"],
    isDiscounted: true,
    isAvailable: true,
  },
  {
    id: 4,
    name: "Ford Escape",
    brand: "Ford",
    year: 2011,
    type: "suv" as const,
    pricePerDay: "57",
    discountedPrice: "375",
    imageUrl: "/images/ford-escape.jpg",
    description: "Compact SUV with nimble handling and great cargo space.",
    features: ["5 Seats", "4WD", "Roof Rails", "Sync System"],
    isDiscounted: true,
    isAvailable: true,
  },
  {
    id: 5,
    name: "Toyota Camry",
    brand: "Toyota",
    year: 2009,
    type: "sedan" as const,
    pricePerDay: "54",
    discountedPrice: "325",
    imageUrl: "/images/toyota-camry.jpg",
    description: "America's favorite sedan known for reliability and comfort.",
    features: ["5 Seats", "Automatic", "Cruise Control", "Keyless Entry"],
    isDiscounted: true,
    isAvailable: true,
  },
  {
    id: 6,
    name: "Honda Civic",
    brand: "Honda",
    year: 2015,
    type: "sedan" as const,
    pricePerDay: "52",
    imageUrl: "/images/honda-civic.jpg",
    description: "Sporty and fuel-efficient compact sedan for city driving.",
    features: ["5 Seats", "Manual Available", "Eco Mode", "Touch Screen"],
    isDiscounted: false,
    isAvailable: true,
  },
  {
    id: 7,
    name: "Honda Accord",
    brand: "Honda",
    year: 2014,
    type: "sedan" as const,
    pricePerDay: "58",
    imageUrl: "/images/honda-accord.jpg",
    description: "Midsize sedan with premium features and smooth ride.",
    features: ["5 Seats", "Leather", "Sunroof", "Honda Sensing"],
    isDiscounted: false,
    isAvailable: true,
  },
  {
    id: 8,
    name: "BMW 3 Series",
    brand: "BMW",
    year: 2017,
    type: "luxury" as const,
    pricePerDay: "85",
    imageUrl: "/images/bmw-3series.jpg",
    description: "Premium German engineering with exhilarating performance.",
    features: ["5 Seats", "Turbo", "Leather", "iDrive"],
    isDiscounted: false,
    isAvailable: true,
  },
  {
    id: 9,
    name: "Nissan Altima",
    brand: "Nissan",
    year: 2018,
    type: "sedan" as const,
    pricePerDay: "55",
    imageUrl: "/images/nissan-altima.jpg",
    description: "Stylish sedan with advanced safety features and comfort.",
    features: ["5 Seats", "ProPilot Assist", "Zero Gravity Seats", "Bose Audio"],
    isDiscounted: false,
    isAvailable: true,
  },
];

export default function Fleet() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const cardsRef = useRef<HTMLDivElement>(null);

  const { data: dbCars } = trpc.car.list.useQuery(
    { limit: 50 },
    {
      retry: false,
      // Silently fall back to static data if DB is not configured
      throwOnError: false,
    }
  );

  const allCars = dbCars && dbCars.cars.length > 0 ? dbCars.cars : defaultCars;

  const filteredCars = allCars.filter((car) => {
    const matchesType =
      selectedType === "all" || car.type === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch && car.isAvailable;
  });

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".fleet-card");
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [selectedType, searchQuery]);

  return (
    <main className="pt-28 pb-20 px-6 md:px-12 lg:px-20 bg-[#f1f1f1] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-3 block">
            Our Collection
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Choose Your <span className="italic font-light">Ride</span>
          </h1>
          <p className="text-sm text-black/50 max-w-lg leading-relaxed">
            Explore our handpicked collection of quality vehicles. From economical
            sedans to spacious SUVs, find the perfect car for your journey.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          {/* Type Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter size={16} className="text-black/30 flex-shrink-0" />
            {carTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.08em] font-medium transition-all flex-shrink-0 ${
                  selectedType === type
                    ? "bg-black text-white"
                    : "bg-white text-black/60 hover:bg-black/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"
            />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-full text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
            />
          </div>
        </div>

        {/* Car Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="fleet-card opacity-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={car.imageUrl}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {car.isDiscounted && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#D4A03A] text-black text-[10px] uppercase tracking-[0.1em] font-bold px-3 py-1 rounded-full">
                      Special
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className="bg-black/80 text-white text-[10px] uppercase tracking-[0.05em] px-2 py-1 rounded-full">
                    {car.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-black">{car.name}</h3>
                  <span className="text-xs text-black/40">{car.year}</span>
                </div>
                <p className="text-xs text-black/40 mb-3 leading-relaxed line-clamp-2">
                  {car.description}
                </p>

                {/* Features */}
                {car.features && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(car.features as string[]).slice(0, 3).map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-black/40 bg-[#f1f1f1] px-2 py-1 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-xl font-bold text-[#D4A03A]">
                    ${car.pricePerDay}
                  </span>
                  <span className="text-xs text-black/30">/day</span>
                  {car.discountedPrice && (
                    <span className="text-xs text-black/30 line-through ml-auto">
                      was ${car.discountedPrice}/wk
                    </span>
                  )}
                </div>

                {/* CTA */}
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-black text-white text-xs uppercase tracking-[0.08em] font-medium py-3 rounded-full hover:bg-[#D4A03A] transition-colors"
                >
                  <Calendar size={12} />
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-black/30">
              No cars found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedType("all");
                setSearchQuery("");
              }}
              className="mt-4 text-sm text-[#D4A03A] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
