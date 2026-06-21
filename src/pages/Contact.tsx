import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Check,
} from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <main className="pt-28 pb-20 bg-[#f1f1f1] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.15em] text-[#D4A03A] font-medium mb-4 block">
            Get in Touch
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Contact <span className="italic font-light">Us</span>
          </h1>
          <p className="text-sm text-black/50 max-w-lg mx-auto leading-relaxed">
            Have questions about renting? Need help choosing the right vehicle?
            We&apos;re here to help. Reach out to our friendly team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={18} className="text-[#D4A03A]" />
              <h2 className="font-semibold text-black">Send us a Message</h2>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Check size={28} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm text-black/40 text-center">
                  We&apos;ll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                    placeholder="(216) 123-4567"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full bg-black text-white text-xs uppercase tracking-[0.08em] font-medium py-4 rounded-full hover:bg-[#D4A03A] transition-colors"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A03A]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-[#D4A03A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-black mb-1">
                    Visit Our Office
                  </h3>
                  <p className="text-sm text-black/40">
                    6001 Cochran Rd
                    <br />
                    Solon, OH 44139
                  </p>
                  <a
                    href="https://maps.google.com/?q=6001+Cochran+Rd+Solon+OH+44139"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#D4A03A] mt-2 inline-block hover:underline"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A03A]/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-[#D4A03A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-black mb-1">
                    Call Us
                  </h3>
                  <a
                    href="tel:+12169839539"
                    className="text-sm text-black/40 hover:text-[#D4A03A] transition-colors"
                  >
                    +1 (216) 983-9539
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A03A]/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#D4A03A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-black mb-1">
                    Email Us
                  </h3>
                  <a
                    href="mailto:info@dlautorental.com"
                    className="text-sm text-black/40 hover:text-[#D4A03A] transition-colors"
                  >
                    info@dlautorental.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4A03A]/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-[#D4A03A]" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-black mb-1">
                    Business Hours
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm text-black/40">
                      Mon - Sat: 9:00 AM - 7:00 PM
                    </p>
                    <p className="text-sm text-black/40">
                      Sunday: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
