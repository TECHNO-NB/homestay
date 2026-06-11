// @ts-nocheck
import { useEffect } from "react";
import { motion } from "framer-motion";

const Ingredients = () => {   
  const INGREDIENTS = [
    { name: "Retinol 0.5%", benefit: "Cell turnover", color: "#c8b4a0" },
    { name: "Niacinamide 10%", benefit: "Barrier repair", color: "#b8c9b4" },
    { name: "Hyaluronic Acid", benefit: "Deep hydration", color: "#a4b8cc" },
    { name: "Azelaic Acid", benefit: "Brightening", color: "#d4b8c0" },
    { name: "Peptides", benefit: "Collagen boost", color: "#c8bcd0" },
    { name: "Vitamin C 15%", benefit: "Antioxidant", color: "#d4c4a4" },
  ];

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  }, []);

  // Variants for container & items
  const container = {
    hidden: {},
    show: { 
      transition: { staggerChildren: 0.1 }
    }
  };

  const pill = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="ingredients" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="section-line" />
        <div className="sans text-xs tracking-[0.2em] uppercase text-[#b8955a] mb-4">Clean Actives</div>
        <h2 className="serif" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#1e1a12" }}>
          Key <em>Ingredients</em>
        </h2>
        <p className="sans text-[#8a7055] mt-4 max-w-xl mx-auto" style={{ fontWeight: 300 }}>
          Every formulation ingredient is selected for clinical evidence. No fillers, no marketing fluff.
        </p>
      </div>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {INGREDIENTS.map((ing) => (
          <motion.div
            key={ing.name}
            className="ingredient-pill cursor-default rounded-2xl px-7 py-5 border border-[#e8ddd4] bg-white flex flex-col items-center gap-1 min-w-35"
            style={{ boxShadow: `0 4px 20px ${ing.color}30` }}
            variants={pill}
          >
            <div className="w-3 h-3 rounded-full mb-2" style={{ background: ing.color }} />
            <div className="serif text-base font-semibold text-[#2c2416]">{ing.name}</div>
            <div className="sans text-xs text-[#8a7055] tracking-wide">{ing.benefit}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Ingredients;