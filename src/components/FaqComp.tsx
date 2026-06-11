import { ChevronDown } from 'lucide-react';
import { useState } from 'react'

const FaqComp = () => {
    const FAQS = [
  {
    q: "How quickly can you respond to an emergency?",
    a: "We offer a 60-minute emergency response guarantee across our service area, 24 hours a day, 365 days a year.",
  },
  {
    q: "Do you provide a guarantee on your work?",
    a: "Yes — all our drain clearing work comes with a 12-month guarantee. If the same blockage returns, we'll fix it free of charge.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, bank transfer, and cash. Payment is only required after the work is completed.",
  },
  {
    q: "Will you make a mess in my home?",
    a: "Never. Our technicians use protective coverings and fully clean the work area before leaving. We treat your home as our own.",
  },
  {
    q: "Can you handle commercial and industrial drains?",
    a: "Absolutely. We service everything from domestic sinks to large-scale industrial drainage networks and municipal systems.",
  },
];

function FAQItem({ q="data", a="data" }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
        open
          ? "border-cyan-500 bg-cyan-950/30"
          : "border-slate-700 bg-slate-800/50"
      }`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <p className="font-semibold text-slate-100 text-sm md:text-base leading-snug">
          {q}
        </p>
        <span
          className={`shrink-0 text-cyan-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          <ChevronDown size={20} />
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="px-5 pb-5 text-slate-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}


  return (
       <section id="faq" className="py-24 md:py-32 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
              Common Questions
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>
  )
}

export default FaqComp