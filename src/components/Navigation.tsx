import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Phone } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Fleet", path: "/fleet" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled
            ? "nav-glass w-[95%] max-w-6xl rounded-2xl py-3 px-6"
            : "w-[95%] max-w-6xl py-4 px-6 bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
          >
            <img src="/logo.png" alt="DL Auto Rental Logo" className="h-10 md:h-16 w-auto" />
          </Link>

          {/* Desktop Nav Links - Centered */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-xs uppercase tracking-[0.08em] font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-[#D4A03A]"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+12169839539"
              className="flex items-center gap-2 text-xs font-medium text-black/70 hover:text-black transition-colors"
            >
              <Phone size={14} />
              <span>(216) 983-9539</span>
            </a>
            <Link
              to="/fleet"
              className="bg-[#D4A03A] text-black text-xs uppercase tracking-[0.08em] font-medium px-5 py-2.5 rounded-full hover:bg-[#B8832F] transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center z-50"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ${
                menuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`absolute w-5 h-[1.5px] bg-black transition-all duration-300 ${
                menuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#f1f1f1]/98 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative h-full flex flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-3xl font-light uppercase tracking-[0.1em] transition-all duration-500 ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              } ${
                location.pathname === link.path
                  ? "text-[#D4A03A]"
                  : "text-black"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div
            className={`mt-8 flex flex-col items-center gap-4 transition-all duration-500 ${
              menuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            <a
              href="tel:+12169839539"
              className="flex items-center gap-2 text-sm text-black/70"
            >
              <Phone size={16} />
              <span>+1 (216) 983-9539</span>
            </a>
            <Link
              to="/fleet"
              className="bg-[#D4A03A] text-black text-sm uppercase tracking-[0.08em] font-medium px-8 py-3 rounded-full"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
