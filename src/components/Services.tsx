// @ts-nocheck
import { ArrowRight, FlaskConical, Microscope, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css"

const Services = () => {
  const navigate = useNavigate();
  const SERVICES = [
    {
      icon: <FlaskConical className="w-7 h-7" />,
      title: "Personalized Skin Consultation",
      desc: "One-on-one expert analysis of your skin type, concerns, and goals.",
      price: "—",
      tag: "Core Service",
    },
    {
      icon: <FlaskConical className="w-7 h-7" />,
      title: "Treatment & Home-Care Recommendation",
      desc: "Customized skincare routine and professional treatment plan for best results.",
      price: "—",
      tag: "Core Service",
    },
    {
      icon: <FlaskConical className="w-7 h-7" />,
      title: "Goal-Focused Skincare Planning",
      desc: "Long-term strategy to achieve clear, healthy, and glowing skin based on your goals.",
      price: "—",
      tag: "Core Service",
    }, // Advanced Facial Treatments

    {
      icon: <Microscope className="w-7 h-7" />,
      title: "Microdermabrasion",
      desc: "Exfoliates dead skin cells to improve tone, texture, and radiance.",
      price: "$80",
      tag: "Advanced Facial",
    },
    {
      icon: <Microscope className="w-7 h-7" />,
      title: "Micromist Microdermabrasion",
      desc: "micromist microdermabrasion.",
      price: "$80",
      tag: "Advanced Facial",
    },
    {
      icon: <Microscope className="w-7 h-7" />,
      title: "Microdermabrasion + Collagen Mask",
      desc: "Enhances hydration, firmness, and post-treatment glow.",
      price: "$150",
      tag: "Advanced Facial",
    },
    {
      icon: <Microscope className="w-7 h-7" />,
      title: "Microdermabrasion + Hyaluronic Acid Mask",
      desc: "Provides deep hydration to plump and soothe the skin.",
      price: "$120",
      tag: "Advanced Facial",
    }, // Microchanneling Treatments
    //
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Microneedling/Microchanneling with Serum Infusion",
      desc: "Stimulates natural skin repair to improve texture, fine lines, acne scars, and hyperpigmentation.",
      price: "$200",
      tag: "Microchanneling",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Derma Planning",
      desc: "Dermaplanning is a gentle, non-invasive skincare treatment where a professional uses a sterile blade to remove dead skin cells and fine facial hair (peach fuzz). This helps reveal smoother, brighter skin, improves product absorption, and allows makeup to go on more evenly. The procedure is painless and safe when performed by a trained provider, with no downtime required.",
      price: "$200",
      tag: "dermaplanning",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Microdermabrasion + Microchanneling/Microneedling Combo",
      desc: "Combines exfoliation and microchanneling for advanced skin rejuvenation.",
      price: "$250",
      tag: "Microchanneling",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Microchanneling/Microneedling for Hair Loss / Thinning",
      desc: "Stimulates scalp and hair follicles, enhances serum absorption, and supports healthier, denser hair growth.",
      price: "$250",
      tag: "Hair Treatment",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Skin Care Party",
      desc: "Gather your friends  or family for an skin care party that includes  skincare education, exclusive party-only specials, refreshments, giveaways, and glowing skin vibes. Whether you’re looking to refresh your routine, target specific skin concerns, or simply enjoy a girls’ day out, this event is the perfect mix of beauty, relaxation, and confidence.Host perks availableExclusive treatment discountsProfessional skincare guidance by Richa Parvate, RNPerfect for birthdays, girls’ nights, bridal events, and self-care gatherings.",
      price: "$250",
      tag: "Skin Care",
    },
  ];

  

  // Variants for cards
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const iconAnim = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="services" className="py-24 bg-[#f5f0e8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="section-line" />
          <div className="sans text-xs tracking-[0.2em] uppercase text-[#b8955a] mb-4">
            What We Offer
          </div>
          <h2
            className="serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#1e1a12",
            }}
          >
            Our <em>Services</em>
          </h2>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-hidden"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              className="card-hover bg-white rounded-2xl md:max-h-78 md:min-h-78 md:max-w-96 overflow-y-scroll  px-7 py-7 relative border border-[#ede5d8] cursor-pointer group"
              variants={card}
            >
              {s.tag && (
                <span className="absolute top-5 right-5 sans text-[10px] tracking-widest uppercase bg-[#b8955a]/10 text-[#b8955a] px-3 py-1 rounded-full border border-[#b8955a]/20">
                  {s.tag}
                </span>
              )}
              <motion.div
                className="w-12 h-12 rounded-xl bg-[#faf8f5] flex items-center justify-center text-[#b8955a] mb-5 border border-[#e8ddd4] group-hover:bg-[#b8955a] group-hover:text-white transition-colors duration-300"
                variants={iconAnim}
              >
                {s.icon}
              </motion.div>
              <h3 className="serif text-ellipsis whitespace-wrap text-[1rem] md:text-[0.9rem] font-semibold text-[#2c2416] mb-3">
                {s.title}
              </h3>
              <p
                className="sans text-sm text-[#8a7055] leading-relaxed"
                style={{ fontWeight: 300 }}
              >
                {s.desc}
              </p>
              <div
                onClick={() => navigate("/appointment")}
                className="mt-6 flex items-center gap-1 text-[#b8955a] text-xs sans tracking-wide"
              >
                Learn more <ArrowRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
