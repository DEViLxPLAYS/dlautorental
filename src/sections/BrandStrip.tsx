const brands = [
  { name: "BMW", logo: "BMW" },
  { name: "Mercedes-Benz", logo: "Mercedes-Benz" },
  { name: "Ford", logo: "Ford" },
  { name: "Chevrolet", logo: "Chevrolet" },
  { name: "Honda", logo: "Honda" },
  { name: "Toyota", logo: "Toyota" },
  { name: "Nissan", logo: "Nissan" },
  { name: "Subaru", logo: "Subaru" },
  { name: "Audi", logo: "Audi" },
  { name: "Lexus", logo: "Lexus" },
];

export default function BrandStrip() {
  const duplicated = [...brands, ...brands];

  return (
    <section className="py-10 bg-[#f1f1f1] border-y border-black/5 overflow-hidden">
      <div className="relative">
        <div className="brand-scroll flex items-center gap-16 whitespace-nowrap">
          {duplicated.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              <span className="text-xl md:text-2xl font-bold text-black/20 uppercase tracking-[0.15em] group-hover:text-black/60 transition-colors duration-300 select-none">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
