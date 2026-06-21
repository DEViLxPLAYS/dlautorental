import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import gsap from "gsap";

function createTicks(
  centerX: number,
  centerY: number,
  radius: number,
  count: number,
  maxAngle: number
): string {
  let svg = "";
  const startAngle = -180 - maxAngle / 2;
  for (let i = 0; i <= count; i++) {
    const angle = startAngle + (i / count) * maxAngle;
    const rad = (angle * Math.PI) / 180;
    const r1 = radius - 20;
    const r2 = radius - 12;
    const x1 = centerX + r1 * Math.cos(rad);
    const y1 = centerY + r1 * Math.sin(rad);
    const x2 = centerX + r2 * Math.cos(rad);
    const y2 = centerY + r2 * Math.sin(rad);
    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000000" stroke-width="1.5" opacity="0.4" />`;
  }
  return svg;
}

export default function Hero() {
  const svgRef = useRef<SVGSVGElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [tickMarks, setTickMarks] = useState({ speedo: "", tacho: "" });

  useEffect(() => {
    setTickMarks({
      speedo: createTicks(100, 200, 80, 10, 180),
      tacho: createTicks(300, 200, 70, 8, 180),
    });
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;
    const fills = svgRef.current.querySelectorAll(".gauge-fill");
    const needles = svgRef.current.querySelectorAll(".needle");
    if (fills.length < 2 || needles.length < 2) return;

    const speedoFill = fills[0] as SVGPathElement;
    const tachoFill = fills[1] as SVGPathElement;
    const speedoNeedle = needles[0] as SVGGElement;
    const tachoNeedle = needles[1] as SVGGElement;

    const speedoMax = 200;
    const tachoMax = 8000;

    function animateGauges(speed: number, rpm: number) {
      const speedDeg = -90 + (speed / speedoMax) * 180;
      const rpmDeg = -90 + (rpm / tachoMax) * 180;
      const speedoArcLength = 251.2;
      const tachoArcLength = 219.8;

      speedoFill.style.strokeDashoffset = String(
        speedoArcLength - (speed / speedoMax) * speedoArcLength
      );
      tachoFill.style.strokeDashoffset = String(
        tachoArcLength - (rpm / tachoMax) * tachoArcLength
      );
      speedoNeedle.style.transform = `rotate(${speedDeg}deg)`;
      tachoNeedle.style.transform = `rotate(${rpmDeg}deg)`;
    }

    function handleMouseMove(e: MouseEvent) {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      const speed = x * speedoMax;
      const rpm = (1 - y) * tachoMax;
      animateGauges(speed, rpm);
    }

    window.addEventListener("mousemove", handleMouseMove);
    animateGauges(0, 0);

    // Loading animation
    const fillArray = [251.2, 219.8];
    gsap.to(fillArray, {
      duration: 1.5,
      ease: "power2.out",
      0: 0,
      1: 0,
      onUpdate: () => {
        speedoFill.style.strokeDashoffset = String(fillArray[0]);
        tachoFill.style.strokeDashoffset = String(fillArray[1]);
      },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [tickMarks]);

  // Text entrance animation
  useEffect(() => {
    if (!textRef.current) return;
    const els = textRef.current.querySelectorAll(".hero-animate");
    gsap.fromTo(
      els,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #F0E6D2 0%, #E8DCC0 100%)",
      }}
    >
      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen px-6 md:px-12 lg:px-20">
        <div ref={textRef} className="w-full md:w-[45%] pt-20">
          <p className="hero-animate text-xs uppercase tracking-[0.2em] text-[#D4A03A] font-medium mb-4 opacity-0">
            Premium Car Rental
          </p>
          <h1 className="hero-animate text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[0.95] mb-6 opacity-0">
            DRIVE YOUR
            <br />
            <span className="italic font-light">DREAM</span>
          </h1>
          <p className="hero-animate text-base text-black/60 mb-8 max-w-md leading-relaxed opacity-0">
            Luxury vehicles for every journey. Experience the road like never
            before with DL Auto Rental — Solon&apos;s premier car rental service.
          </p>
          <div className="hero-animate flex flex-wrap gap-4 opacity-0">
            <Link
              to="/fleet"
              className="bg-black text-white text-xs uppercase tracking-[0.1em] font-medium px-8 py-4 rounded-full hover:bg-[#D4A03A] transition-colors duration-300"
            >
              Browse Our Fleet
            </Link>
            <Link
              to="/contact"
              className="border border-black/30 text-black text-xs uppercase tracking-[0.1em] font-medium px-8 py-4 rounded-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="hero-animate mt-12 flex gap-8 opacity-0">
            <div>
              <p className="text-2xl font-bold text-black">500+</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-black/50 mt-1">
                Vehicles
              </p>
            </div>
            <div className="w-px bg-black/10" />
            <div>
              <p className="text-2xl font-bold text-black">24/7</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-black/50 mt-1">
                Support
              </p>
            </div>
            <div className="w-px bg-black/10" />
            <div>
              <p className="text-2xl font-bold text-black">10K+</p>
              <p className="text-[10px] uppercase tracking-[0.1em] text-black/50 mt-1">
                Customers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gauge Cluster */}
      <div className="gauge-container hidden md:flex">
        <svg
          ref={svgRef}
          viewBox="0 0 400 300"
          style={{ width: "100%", height: "auto", maxWidth: "600px" }}
        >
          <g id="gauges">
            {/* Speedometer */}
            <g transform="translate(100, 200)">
              <path
                className="gauge-bg"
                d="M -80 0 A 80 80 0 0 1 80 0"
                fill="none"
                stroke="#000000"
                strokeWidth="16"
                strokeLinecap="round"
                opacity="0.1"
              />
              <path
                className="gauge-fill"
                d="M -80 0 A 80 80 0 0 1 80 0"
                fill="none"
                stroke="#D4A03A"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
              />
              <g
                className="needle"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle cx="0" cy="0" r="6" fill="#000000" />
                <rect
                  x="-2"
                  y="-60"
                  width="4"
                  height="70"
                  fill="#000000"
                  rx="2"
                />
                <circle cx="0" cy="0" r="3" fill="#D4A03A" />
              </g>
              <g
                dangerouslySetInnerHTML={{
                  __html: tickMarks.speedo,
                }}
              />
              {/* Labels */}
              <text
                x="-70"
                y="25"
                fill="#000"
                opacity="0.5"
                fontSize="8"
                fontFamily="monospace"
              >
                0
              </text>
              <text
                x="60"
                y="25"
                fill="#000"
                opacity="0.5"
                fontSize="8"
                fontFamily="monospace"
              >
                200
              </text>
              <text
                x="0"
                y="40"
                fill="#000"
                opacity="0.4"
                fontSize="7"
                fontFamily="monospace"
                textAnchor="middle"
              >
                MPH
              </text>
            </g>

            {/* Tachometer */}
            <g transform="translate(300, 200)">
              <path
                className="gauge-bg"
                d="M -70 0 A 70 70 0 0 1 70 0"
                fill="none"
                stroke="#000000"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.1"
              />
              <path
                className="gauge-fill"
                d="M -70 0 A 70 70 0 0 1 70 0"
                fill="none"
                stroke="#B8832F"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="219.8"
                strokeDashoffset="219.8"
              />
              <g
                className="needle"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle cx="0" cy="0" r="5" fill="#000000" />
                <rect
                  x="-1.5"
                  y="-50"
                  width="3"
                  height="60"
                  fill="#000000"
                  rx="1.5"
                />
                <circle cx="0" cy="0" r="2.5" fill="#B8832F" />
              </g>
              <g
                dangerouslySetInnerHTML={{
                  __html: tickMarks.tacho,
                }}
              />
              <text
                x="-60"
                y="22"
                fill="#000"
                opacity="0.5"
                fontSize="7"
                fontFamily="monospace"
              >
                0
              </text>
              <text
                x="50"
                y="22"
                fill="#000"
                opacity="0.5"
                fontSize="7"
                fontFamily="monospace"
              >
                8K
              </text>
              <text
                x="0"
                y="38"
                fill="#000"
                opacity="0.4"
                fontSize="6"
                fontFamily="monospace"
                textAnchor="middle"
              >
                RPM
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Mobile Hero Image */}
      <div className="md:hidden absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <img
          src="/images/hero-car.jpg"
          alt="Luxury car"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Car Image for Desktop - positioned on right */}
      <div className="hidden lg:block absolute right-[5%] bottom-[10%] w-[35%] z-20 pointer-events-none">
        <img
          src="/images/hero-car.jpg"
          alt="Luxury car"
          className="w-full h-auto object-contain drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
        />
      </div>
    </section>
  );
}
