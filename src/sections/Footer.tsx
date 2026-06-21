import { Link } from "react-router";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Our Fleet", path: "/fleet" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "Admin", path: "/admin" },
];

const services = [
  "Daily Rentals",
  "Weekly Specials",
  "Long-term Leasing",
  "Corporate Rentals",
  "Airport Pickup",
];

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo & Info */}
          <div>
            <Link
              to="/"
              className="text-lg font-semibold tracking-[0.08em] uppercase text-white mb-4 block"
            >
              DL Auto Rental
            </Link>
            <p className="text-xs text-white/40 leading-relaxed mb-6">
              Your trusted partner for premium car rentals in Solon, Ohio. We
              deliver quality vehicles with exceptional service since 2015.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A03A] transition-colors"
              >
                <Facebook size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A03A] transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A03A] transition-colors"
              >
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-medium mb-5 text-white/60">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/40 hover:text-[#D4A03A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-medium mb-5 text-white/60">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-white/40">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] font-medium mb-5 text-white/60">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D4A03A] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/40">
                  6001 Cochran Rd
                  <br />
                  Solon, OH 44139
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#D4A03A] flex-shrink-0" />
                <a
                  href="tel:+12169839539"
                  className="text-sm text-white/40 hover:text-[#D4A03A] transition-colors"
                >
                  +1 (216) 983-9539
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#D4A03A] flex-shrink-0" />
                <a
                  href="mailto:info@dlautorental.com"
                  className="text-sm text-white/40 hover:text-[#D4A03A] transition-colors"
                >
                  info@dlautorental.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-[#D4A03A] flex-shrink-0" />
                <span className="text-sm text-white/40">
                  Mon-Sat: 9AM - 7PM
                  <br />
                  Sun: 10AM - 5PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} DL Auto Rental. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
