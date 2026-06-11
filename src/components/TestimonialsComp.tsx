
import { useEffect, useState } from 'react';
import {
  Sparkles, Star

} from "lucide-react";

const TestimonialsComp = () => {
    
const TESTIMONIALS = [
  {
    name: "Priya M.",
    skin: "Melasma & Oily",
    quote: "After 3 months with DermaGlowRN, my melasma faded visibly. The RN actually listened — no cookie-cutter advice.",
    stars: 5,
  },
  {
    name: "Sofia R.",
    skin: "Sensitive & Rosacea",
    quote: "I've seen dermatologists who said little. Here, I got a full protocol that finally calmed my redness.",
    stars: 5,
  },
  {
    name: "Aisha K.",
    skin: "Acne-prone",
    quote: "Science-backed and gentle. My skin cleared in 8 weeks. The ingredient explanations made me trust the process.",
    stars: 5,
  },
];
const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);


  return (
        <section id="results" className="py-24 bg-[#2c2416] relative overflow-hidden">
        <div className="noise absolute inset-0" style={{ opacity: 0.04 }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="section-line" style={{ background: "#b8955a" }} />
          <div className="sans text-xs tracking-[0.2em] uppercase text-[#b8955a] mb-4">Client Stories</div>
          <h2 className="serif text-white mb-12" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}>
            Real <em>Results</em>
          </h2>
          <div className="testimonial-transition" key={activeTestimonial}>
            <div className="divider-leaf mb-8">
              <Sparkles className="w-4 h-4 text-[#b8955a]" />
            </div>
            <p className="serif text-white/90 italic mb-8" style={{ fontSize: "1.35rem", fontWeight: 300, lineHeight: 1.6 }}>
              "{TESTIMONIALS[activeTestimonial].quote}"
            </p>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(TESTIMONIALS[activeTestimonial].stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#b8955a] text-[#b8955a]" />
              ))}
            </div>
            <div className="serif text-[#c9a870] text-lg">{TESTIMONIALS[activeTestimonial].name}</div>
            <div className="sans text-xs text-[#8a7055] tracking-widest uppercase mt-1">{TESTIMONIALS[activeTestimonial].skin}</div>
          </div>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-8 bg-[#b8955a]" : "bg-[#5a4a35]"}`} />
            ))}
          </div>
        </div>
      </section>
  )
}

export default TestimonialsComp