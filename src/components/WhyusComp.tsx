// @ts-nocheck
import {
  CheckCircle,
  Star, Shield,
  Zap,
  Award,
  Factory,
} from "lucide-react";

import { motion } from "framer-motion";

const WhyusComp = () => {

  // animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const rightItem = {
    hidden: { opacity: 0, x: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={item}>
            <div className="section-line" style={{ margin: "0 0 20px" }} />
          </motion.div>

          <motion.div
            variants={item}
            className="sans text-xs tracking-[0.2em] uppercase text-[#b8955a] mb-4"
          >
            About DermaGlowRN
          </motion.div>

          <motion.h2
            variants={item}
            className="serif"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "#1e1a12",
            }}
          >
            Where Clinical Precision <br />
            <em>Meets Skin Wellness</em>
          </motion.h2>

          <motion.p
            variants={item}
            className="sans text-[#6b5b45] mt-6 leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            DermaGlowRN was founded on a simple belief: your skin deserves the same evidence-based approach used in clinical medicine. Our RN brings hospital-level assessment skills to every consultation — reading your skin like a chart
            and picking goal specific protocols for your treatment plan.
          </motion.p>

          <motion.p
            variants={item}
            className="sans text-[#6b5b45] mt-4 leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            No trends, no guesswork. Just science-backed formulations, compassionate listening, and real results.
          </motion.p>

          {/* BULLETS */}
          <motion.div className="mt-8 space-y-3" variants={container}>
            {[
              "Board-certified registered nurse with dermatology training",
              "Customized protocols for every skin type and concern",
              "Transparent ingredient education — always",
            ].map((point) => (
              <motion.div key={point} variants={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-[#b8955a] mt-0.5 shrink-0" />
                <span className="sans text-sm text-[#6b5b45]">{point}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          variants={rightItem}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          <div
            className="h-120 rounded-3xl overflow-hidden"
            style={{
              background: "url(./pic1.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[#b8955a]/10 border border-[#b8955a]/20" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-[#c8d4c0]/30 border border-[#a0b8a0]/20" />
        </motion.div>

      </div>
    </section>
  );
};

export default WhyusComp;