import { useEffect, useRef } from "react";
import {
  Shield,
  Leaf,
  Star,
  ArrowRight,
  ChevronDown,
  Award,
  Clock,
  Heart,
} from "lucide-react";
import Whyus from "./Whyus";
import Service from "./Service";
import Ingredients from "./Ingredients";
import Contact from "./Contact";
import { useNavigate } from "react-router-dom";
import owner from "../../public/owner.jpeg";

export default function Main() {
  const heroRef = useRef(null);

  const navigate = useNavigate();

  const STATS = [
    // {
    //   icon: <Users className="w-5 h-5" />,
    //   value: "2,400+",
    //   label: "Clients Treated",
    // },
    {
      icon: <Award className="w-5 h-5" />,
      value: "13 yrs",
      label: "Nursing Experience",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      value: "98%",
      label: "Satisfaction Rate",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      value: "100%",
      label: "Compassionate Care",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="min-h-screen bg-[#faf8f5] text-[#2c2416] font-sans"
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      <section
        ref={heroRef}
        className="relative min-h-screen w-screen flex items-center overflow-hidden "
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-scale-down object-top-right md:object-cover md:object-bottom-left"
            style={{ display: "block" }}
          >
            <source src="./bgvideo.mp4" type="video/mp4" />
          </video>

          {/* Dark gradient overlay so text stays legible */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, rgba(20,15,8,0.72) 0%, rgba(20,15,8,0.45) 55%, rgba(20,15,8,0.15) 100%)",
            }}
          />

          {/* Subtle warm vignette on the right for depth */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 100% at 80% 50%, rgba(184,149,90,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── CONTENT ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left — Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 text-[#c9a870] text-xs tracking-[0.2em] uppercase mb-8 fade-up"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              <div className="w-6 h-px bg-[#c9a870]" />
              Registered Nurse Skincare
            </div>

            <h1
              className="fade-up delay-1"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                lineHeight: 1.05,
                fontWeight: 300,
                color: "#f5efe6",
              }}
            >
              DermaglowRN
              <br />
              <em>Science backed</em>
              <br />
              <span style={{ color: "#c9a870" }}>compassionate</span>
              <br />
              skin care.
            </h1>

            <p
              className="fade-up delay-2 mt-6 leading-relaxed max-w-md"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: "1rem",
                fontWeight: 300,
                color: "rgba(245,239,230,0.75)",
              }}
            >
              Founded by a Registered Nurse with 13 years of clinical
              experience. DermaGlowRN bridges evidence-based medicine and luxury
              skincare — so your skin gets what it actually needs.
            </p>

            <div className="fade-up delay-3 flex flex-wrap items-center gap-4 mt-10">
              {/* Primary btn */}
              <button
                onClick={() => navigate("/appointment")}
                style={{
                  background:
                    "linear-gradient(135deg, #b8955a 0%, #c9a870 100%)",
                  color: "#faf8f5",
                  border: "none",
                  borderRadius: "2px",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "14px 32px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #9e7a42 0%, #b8955a 100%)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(184,149,90,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, #b8955a 0%, #c9a870 100%)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Begin Your Skin Journey <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Outline btn */}
              <button
                onClick={() => navigate("/services")}
                style={{
                  background: "transparent",
                  color: "#c9a870",
                  border: "1px solid #c9a870",
                  borderRadius: "2px",
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "13px 30px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#c9a870";
                  e.currentTarget.style.color = "#1e1a12";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#c9a870";
                }}
              >
                View Services
              </button>
            </div>

            {/* Trust badges */}
            <div className="fade-up delay-4 flex flex-wrap items-center gap-6 mt-12">
              {[
                {
                  icon: <Shield className="w-4 h-4" />,
                  text: "Clinically Formulated",
                },
                {
                  icon: <Leaf className="w-4 h-4" />,
                  text: "Clean Ingredients",
                },
                { icon: <Star className="w-4 h-4" />, text: "RN Expertise" },
              ].map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2"
                  style={{ color: "white" }}
                >
                  <div style={{ color: "#c9a870" }}>{b.icon}</div>
                  <span
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Floating cards */}
          <div
            className="fade-up delay-3 relative z-10  flex justify-center lg:justify-end"
            style={{}}
          >
            <div className="relative">
             

            

            </div>
          </div> 
          
        </div>

        {/* ── SCROLL CUE ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-10">
          <div
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: "0.65rem",
              color: "rgba(245,239,230,0.5)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </div>
          <ChevronDown className="w-4 h-4 text-[#bac970]" />
        </div>

        {/* ── ANIMATION STYLES ── */}
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .fade-up {
          opacity: 0;
          transform: translateY(28px);
          animation: fadeUp 0.9s ease forwards;
        }
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.15s; }
        .delay-2 { animation-delay: 0.3s; }
        .delay-3 { animation-delay: 0.45s; }
        .delay-4 { animation-delay: 0.6s; }
      `}</style>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#2c2416] py-14">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="flex justify-center mb-3 text-[#b8955a]">
                {s.icon}
              </div>
              <div className="serif text-3xl text-white font-light mb-1">
                {s.value}
              </div>
              <div className="sans text-xs text-[#8a7055] tracking-widest uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* why us */}
      <Whyus />

      {/* Services */}
      <Service />

      {/* ── Owner ── */}
      <section
        className="py-10 px-2 flex items-center justify-center flex-col"
        style={{
          background: "linear-gradient(135deg, #f5ede0 0%, #ede5d8 100%)",
        }}
      >
        <img
          src={owner}
          className=" rounded-full w-20 h-20 border-4 border-white"
          alt="owner pic"
        />
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="serif mb-0"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#1e1a12",
            }}
          >
            Richa Parvate
          </div>
          <p
            className="sans text-[#8a7055] mb-4 max-w-xl md:max-w-7xl mx-auto"
            style={{ fontWeight: 300 }}
          >
            A Message from the Founder <br/> My passion for skincare didn't begin in a
            classroom; it began with my own skin. Like many people, I struggled
            with personal skin concerns that affected not only my appearance,
            but my confidence as well. I tried countless products and
            treatments, often feeling overwhelmed and unsure of what truly
            worked. That experience sparked a deeper curiosity and appreciation
            for skincare rooted in science, not trends. As a registered nurse, I
            was drawn to understanding skin on a clinical level—how it heals,
            how it responds, and how the right treatments can truly transform
            it. That journey is what led me to create DermaGlowRN: a place where
            personal experience meets medical knowledge. Every treatment I
            provide is chosen with intention, safety, and results in mind. I
            understand how vulnerable skin concerns can feel, which is why I
            focus on education, honesty, and customized care—never a
            one-size-fits-all approach. When you trust me with your skin, you're
            trusting someone who truly understands the journey, both
            professionally and personally. My goal is not just to help you
            achieve healthy, glowing skin, but to help you feel confident,
            empowered, and cared for every step of the way. Thank you for
            allowing me to be a part of your skincare journey. With warmth and
            gratitude<br/> Richa Parvate, RN Founder | DermaGlowRN.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="btn-primary text-base px-10 py-4"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/services")}
              className="btn-outline text-base px-10 py-4"
            >
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <Ingredients />

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* ── CTA BANNER ── */}
      <section
        className="py-20 px-6"
        style={{
          background: "linear-gradient(135deg, #f5ede0 0%, #ede5d8 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="serif mb-4"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#1e1a12",
            }}
          >
            Ready for skin that <em>actually glows?</em>
          </div>
          <p
            className="sans text-[#8a7055] mb-10 max-w-xl mx-auto"
            style={{ fontWeight: 300 }}
          >
            Book a complimentary 15-minute skin chat with our RN. No commitment,
            just clarity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="btn-primary text-base px-10 py-4"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate("/services")}
              className="btn-outline text-base px-10 py-4"
            >
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <Contact />
    </div>
  );
}
