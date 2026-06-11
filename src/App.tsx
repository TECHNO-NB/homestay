// @ts-nocheck
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Star, MapPin, Phone, Mail, ChevronRight, ChevronDown, Menu, X,
  Wifi, Car, Coffee, Utensils, Waves, Clock, Users, Award,
  Instagram, Facebook, Twitter, ArrowRight, ChevronLeft, Leaf,
  Wine, UtensilsCrossed, BedDouble, Sparkles, Send
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home", "Rooms", "Restaurant", "Amenities", "Gallery", "Contact"];

const ROOMS = [
  {
    id: 1, name: "Deluxe Suite", price: 320, size: "55m²", guests: 2,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    tag: "Most Popular", features: ["King Bed", "City View", "Jacuzzi", "Mini Bar"]
  },
  {
    id: 2, name: "Ocean Penthouse", price: 580, size: "90m²", guests: 4,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    tag: "Premium", features: ["Private Terrace", "Ocean View", "Butler Service", "Spa Access"]
  },
  {
    id: 3, name: "Garden Villa", price: 420, size: "70m²", guests: 3,
    img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    tag: "Serene", features: ["Private Garden", "Pool Access", "Queen Bed", "Fireplace"]
  }
];

const MENU_ITEMS = [
  { cat: "Starters", items: [
    { name: "Seared Scallops", desc: "Cauliflower purée, crispy capers, citrus foam", price: 28 },
    { name: "Truffle Arancini", desc: "Wild mushroom, aged parmesan, black truffle oil", price: 22 },
    { name: "Tuna Tartare", desc: "Avocado, sesame, micro herbs, ponzu dressing", price: 26 }
  ]},
  { cat: "Mains", items: [
    { name: "Wagyu Tenderloin", desc: "Truffle potato gratin, roasted shallots, red wine jus", price: 68 },
    { name: "Lobster Thermidor", desc: "Gruyère crust, brandy cream, tarragon butter", price: 72 },
    { name: "Duck Confit", desc: "Cherry gastrique, lentil cassoulet, pickled red cabbage", price: 48 }
  ]},
  { cat: "Desserts", items: [
    { name: "Valrhona Soufflé", desc: "72% dark chocolate, crème anglaise, vanilla ice cream", price: 18 },
    { name: "Mango Pavlova", desc: "Passion fruit curd, coconut cream, edible flowers", price: 16 },
    { name: "Cheese Selection", desc: "Five artisan cheeses, quince paste, seeded crackers", price: 22 }
  ]}
];

const AMENITIES = [
  { icon: Waves, label: "Infinity Pool", desc: "Rooftop pool with panoramic views" },
  { icon: Sparkles, label: "Luxury Spa", desc: "Full-service spa & wellness center" },
  { icon: UtensilsCrossed, label: "Fine Dining", desc: "Award-winning restaurant & bar" },
  { icon: Wifi, label: "High-Speed WiFi", desc: "Complimentary throughout the property" },
  { icon: Car, label: "Valet Parking", desc: "24/7 secure underground parking" },
  { icon: Coffee, label: "Concierge", desc: "Personalized service around the clock" },
  { icon: Leaf, label: "Wellness", desc: "Yoga, meditation & fitness studio" },
  { icon: Wine, label: "Wine Cellar", desc: "Curated selection of 500+ labels" }
];

const GALLERY = [
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c4fe1fa7?w=600&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80",
];

const STATS = [
  { value: "12+", label: "Years of Excellence" },
  { value: "48", label: "Luxury Suites" },
  { value: "5★", label: "Michelin Rating" },
  { value: "98%", label: "Guest Satisfaction" }
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.12 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function AnimSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────

function Navbar({ active, setActive }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.02 }}>
            <div className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-widest">V</span>
            </div>
            <div>
              <p className={`text-base font-bold tracking-[0.18em] uppercase leading-none ${scrolled ? "text-stone-900" : "text-white"}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                Velour
              </p>
              <p className={`text-[9px] tracking-[0.3em] uppercase ${scrolled ? "text-amber-700" : "text-amber-300"}`}>Hotel & Bistro</p>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => setActive(link)}
                className={`text-xs tracking-[0.15em] uppercase font-medium transition-colors relative group ${
                  scrolled ? (active === link ? "text-amber-800" : "text-stone-600 hover:text-stone-900")
                  : (active === link ? "text-amber-300" : "text-white/80 hover:text-white")
                }`}
              >
                {link}
                <span className={`absolute -bottom-1 left-0 h-px bg-amber-700 transition-all duration-300 ${active === link ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="bg-amber-800 text-white text-xs tracking-[0.15em] uppercase font-medium px-5 py-2.5 rounded-full hover:bg-amber-900 transition-colors"
            >
              Book Now
            </motion.button>
          </div>

          <button onClick={() => setOpen(true)} className={`lg:hidden ${scrolled ? "text-stone-800" : "text-white"}`}>
            <Menu size={22} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-stone-50 flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <p className="text-lg font-bold tracking-widest text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>Velour</p>
              <button onClick={() => setOpen(false)}><X size={22} className="text-stone-700" /></button>
            </div>
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                onClick={() => { setActive(link); setOpen(false); }}
                className="text-left text-2xl font-medium text-stone-800 py-4 border-b border-stone-100"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="mt-8 bg-amber-800 text-white py-4 rounded-2xl text-sm tracking-widest uppercase"
            >
              Book Your Stay
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-stone-900">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85"
          alt="Velour Hotel"
          className="w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/70" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="text-amber-300 text-xs tracking-[0.4em] uppercase mb-6"
        >
          ✦ Welcome to Velour ✦
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 max-w-5xl"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Where Luxury
          <br />
          <span className="text-amber-300 italic">Meets Serenity</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
          className="text-white/70 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
        >
          An intimate retreat nestled in the heart of the city — where exceptional hospitality and culinary artistry converge.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, backgroundColor: "#92400e" }} whileTap={{ scale: 0.97 }}
            className="bg-amber-700 text-white text-xs tracking-[0.2em] uppercase font-semibold px-8 py-4 rounded-full transition-colors flex items-center gap-2"
          >
            Reserve a Room <ArrowRight size={14} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="border border-white/50 text-white text-xs tracking-[0.2em] uppercase font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors"
          >
            View Restaurant
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</p>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={18} className="text-white/50" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating booking bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 z-20"
      >
        <div className="bg-white rounded-t-2xl shadow-2xl p-5 flex flex-col md:flex-row items-center gap-4">
          {[
            { label: "Check In", placeholder: "Select date", icon: Clock },
            { label: "Check Out", placeholder: "Select date", icon: Clock },
            { label: "Guests", placeholder: "2 Adults", icon: Users }
          ].map(({ label, placeholder, icon: Icon }) => (
            <div key={label} className="flex-1 w-full">
              <p className="text-[10px] text-amber-800 tracking-[0.2em] uppercase font-semibold mb-1">{label}</p>
              <div className="flex items-center gap-2 border border-stone-200 rounded-xl px-3 py-2.5">
                <Icon size={14} className="text-stone-400" />
                <span className="text-stone-400 text-sm">{placeholder}</span>
              </div>
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="bg-amber-800 text-white text-xs tracking-[0.2em] uppercase font-semibold px-8 py-3.5 rounded-xl hover:bg-amber-900 transition-colors whitespace-nowrap w-full md:w-auto"
          >
            Check Availability
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section className="bg-amber-900 py-14">
      <AnimSection className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ value, label }) => (
          <motion.div key={label} variants={fadeUp} className="text-center">
            <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
            <p className="text-amber-200 text-xs tracking-[0.2em] uppercase">{label}</p>
          </motion.div>
        ))}
      </AnimSection>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <AnimSection>
          <motion.div variants={scaleIn} className="relative">
            <img
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80"
              alt="Velour Hotel interior"
              className="rounded-3xl w-full h-[520px] object-cover shadow-2xl"
            />
            <motion.div
              variants={fadeUp}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]"
            >
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#92400e" className="text-amber-800" />)}
              </div>
              <p className="text-stone-800 text-sm font-medium leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                "An extraordinary experience we'll never forget"
              </p>
              <p className="text-stone-400 text-xs mt-2">— Sarah M., Paris</p>
            </motion.div>
            <div className="absolute -top-6 -left-6 bg-amber-800 rounded-2xl p-5">
              <Award size={28} className="text-white" />
            </div>
          </motion.div>
        </AnimSection>

        <AnimSection>
          <motion.p variants={fadeUp} className="text-amber-800 text-xs tracking-[0.35em] uppercase mb-4">Our Story</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Crafted for Those
            <br />
            Who <span className="italic text-amber-700">Seek More</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-500 leading-relaxed mb-6">
            Since 2012, Velour has been a sanctuary for discerning travellers who believe that a hotel should be more than a place to sleep — it should be an experience that lingers long after departure.
          </motion.p>
          <motion.p variants={fadeUp} className="text-stone-500 leading-relaxed mb-8">
            Our philosophy is simple: extraordinary spaces, thoughtful service, and cuisine that tells a story. Every detail — from the thread count of our linens to the provenance of ingredients on our menu — is chosen with intention.
          </motion.p>
          <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
            {[
              { icon: BedDouble, label: "48 Suites" },
              { icon: Utensils, label: "Fine Dining" },
              { icon: Waves, label: "Rooftop Pool" },
              { icon: Leaf, label: "Wellness Spa" }
            ].map(({ icon: Icon, label }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-stone-100">
                <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Icon size={16} className="text-amber-800" />
                </div>
                <span className="text-stone-700 text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── ROOMS ───────────────────────────────────────────────────────────────────

function Rooms() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="rooms" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-amber-800 text-xs tracking-[0.35em] uppercase mb-4">Accommodations</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Our Suites & Rooms
          </motion.h2>
        </AnimSection>

        <AnimSection className="grid md:grid-cols-3 gap-8">
          {ROOMS.map((room) => (
            <motion.div
              key={room.id}
              variants={scaleIn}
              whileHover={{ y: -8 }}
              className="bg-stone-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 group cursor-pointer"
              onClick={() => setSelected(room)}
            >
              <div className="relative overflow-hidden h-60">
                <img src={room.img} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-amber-800 text-white text-[10px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5 rounded-full">
                  {room.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>{room.name}</h3>
                    <p className="text-stone-400 text-xs mt-1">{room.size} · Up to {room.guests} guests</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-800 text-xl font-bold">${room.price}</p>
                    <p className="text-stone-400 text-xs">per night</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {room.features.map(f => (
                    <span key={f} className="bg-white border border-stone-200 text-stone-600 text-[10px] tracking-wide px-2.5 py-1 rounded-full">{f}</span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="w-full border-2 border-amber-800 text-amber-800 text-xs tracking-[0.2em] uppercase font-semibold py-3 rounded-xl hover:bg-amber-800 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  Book This Suite <ChevronRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimSection>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl"
              >
                <div className="relative h-64">
                  <img src={selected.img} alt={selected.name} className="w-full h-full object-cover" />
                  <button onClick={() => setSelected(null)} className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white transition-colors">
                    <X size={18} className="text-stone-700" />
                  </button>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>{selected.name}</h3>
                      <p className="text-stone-400 text-sm mt-1">{selected.size} · Up to {selected.guests} guests</p>
                    </div>
                    <div className="text-right">
                      <p className="text-amber-800 text-2xl font-bold">${selected.price}</p>
                      <p className="text-stone-400 text-xs">per night</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selected.features.map(f => (
                      <span key={f} className="bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full">{f}</span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full bg-amber-800 text-white text-sm tracking-[0.15em] uppercase font-semibold py-4 rounded-xl hover:bg-amber-900 transition-colors"
                  >
                    Reserve Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── RESTAURANT ──────────────────────────────────────────────────────────────

function Restaurant() {
  const [activeTab, setActiveTab] = useState("Starters");

  return (
    <section id="restaurant" className="py-24 md:py-32 bg-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <AnimSection>
          <motion.p variants={fadeUp} className="text-amber-400 text-xs tracking-[0.35em] uppercase mb-4">The Bistro</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            A Culinary
            <br />
            <span className="text-amber-400 italic">Journey Awaits</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-stone-400 leading-relaxed mb-8">
            Our award-winning kitchen celebrates the finest seasonal produce, guided by a philosophy of honest flavours elevated through refined technique. Chef Laurent Moreau brings two decades of Michelin-starred experience to every plate.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-2 mb-6">
            {["Starters", "Mains", "Desserts"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs tracking-[0.15em] uppercase font-medium px-4 py-2 rounded-full transition-all ${
                  activeTab === tab ? "bg-amber-700 text-white" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {MENU_ITEMS.find(m => m.cat === activeTab)?.items.map(item => (
                <div key={item.name} className="flex items-start justify-between bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="flex-1 pr-4">
                    <p className="text-white font-semibold text-sm mb-1">{item.name}</p>
                    <p className="text-stone-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                  <p className="text-amber-400 font-bold text-sm whitespace-nowrap">${item.price}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="bg-amber-700 text-white text-xs tracking-[0.2em] uppercase font-semibold px-6 py-3 rounded-full hover:bg-amber-600 transition-colors flex items-center gap-2"
            >
              Reserve a Table <ArrowRight size={13} />
            </motion.button>
            <div className="flex items-center gap-2 text-stone-400">
              <Clock size={14} />
              <span className="text-xs">Open daily 12–22:30</span>
            </div>
          </motion.div>
        </AnimSection>

        <AnimSection>
          <motion.div variants={scaleIn} className="relative">
            <img
              src="https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=800&q=80"
              alt="Restaurant"
              className="rounded-3xl w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent rounded-3xl" />
            <motion.div
              variants={fadeUp}
              className="absolute bottom-6 left-6 right-6 bg-stone-900/80 backdrop-blur-sm rounded-2xl p-5 border border-white/10"
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&q=80"
                  alt="Chef"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-700"
                />
                <div>
                  <p className="text-white font-semibold text-sm">Chef Laurent Moreau</p>
                  <p className="text-amber-400 text-xs">Executive Chef · Michelin Star 2022</p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="#f59e0b" className="text-amber-400" />)}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── AMENITIES ───────────────────────────────────────────────────────────────

function Amenities() {
  return (
    <section id="amenities" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-amber-800 text-xs tracking-[0.35em] uppercase mb-4">Experiences</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Every Comfort, Considered
          </motion.h2>
        </AnimSection>

        <AnimSection className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {AMENITIES.map(({ icon: Icon, label, desc }) => (
            <motion.div
              key={label}
              variants={scaleIn}
              whileHover={{ y: -5, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)" }}
              className="bg-stone-50 rounded-2xl p-6 border border-stone-100 transition-shadow duration-300 cursor-default"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-amber-800" />
              </div>
              <h3 className="font-bold text-stone-900 text-sm mb-1">{label}</h3>
              <p className="text-stone-400 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </AnimSection>

        <AnimSection className="mt-20">
          <motion.div variants={scaleIn} className="relative rounded-3xl overflow-hidden h-72 md:h-96">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80"
              alt="Pool"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-10 md:px-16">
                <p className="text-amber-300 text-xs tracking-[0.3em] uppercase mb-3">Rooftop Infinity Pool</p>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Swim Above the City
                </h3>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-stone-900 text-xs tracking-[0.2em] uppercase font-bold px-6 py-3 rounded-full hover:bg-amber-50 transition-colors"
                >
                  Explore Amenities
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimSection className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-amber-800 text-xs tracking-[0.35em] uppercase mb-4">Visual Stories</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Life at Velour
          </motion.h2>
        </AnimSection>

        <AnimSection className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((src, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className={`overflow-hidden rounded-2xl ${i === 0 || i === 5 ? "md:row-span-2" : ""}`}
              style={{ gridRow: (i === 0 || i === 5) && window.innerWidth >= 768 ? "span 2" : undefined }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className={`w-full object-cover ${i === 0 || i === 5 ? "h-80 md:h-full" : "h-48 md:h-56"} hover:scale-110 transition-transform duration-700`}
              />
            </motion.div>
          ))}
        </AnimSection>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.msg) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", msg: "" });
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <AnimSection>
          <motion.p variants={fadeUp} className="text-amber-800 text-xs tracking-[0.35em] uppercase mb-4">Get in Touch</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-stone-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            We'd Love to
            <br />
            <span className="italic text-amber-700">Hear from You</span>
          </motion.h2>
          <motion.div variants={stagger} className="space-y-5 mt-8">
            {[
              { icon: MapPin, label: "Address", value: "14 Grand Avenue, Monaco 98000" },
              { icon: Phone, label: "Telephone", value: "+377 98 12 34 56" },
              { icon: Mail, label: "Email", value: "hello@velourhotel.com" },
              { icon: Clock, label: "Reception", value: "Open 24 hours" }
            ].map(({ icon: Icon, label, value }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-amber-800" />
                </div>
                <div>
                  <p className="text-stone-400 text-xs uppercase tracking-wide">{label}</p>
                  <p className="text-stone-800 text-sm font-medium">{value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimSection>

        <AnimSection>
          <motion.div variants={scaleIn} className="bg-stone-50 rounded-3xl p-8 border border-stone-100">
            <h3 className="font-bold text-stone-900 text-xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Send a Message</h3>
            <div className="space-y-4">
              {[
                { key: "name", label: "Full Name", placeholder: "Your name" },
                { key: "email", label: "Email Address", placeholder: "you@example.com" }
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-stone-500 tracking-wide uppercase block mb-1.5">{label}</label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-400 bg-white transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-stone-500 tracking-wide uppercase block mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  value={form.msg}
                  onChange={e => setForm(p => ({ ...p, msg: e.target.value }))}
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-amber-400 bg-white transition-colors resize-none"
                />
              </div>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-200 text-green-700 text-sm py-3.5 rounded-xl text-center font-medium"
                  >
                    ✓ Message sent! We'll be in touch soon.
                  </motion.div>
                ) : (
                  <motion.button
                    key="btn"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={handleSubmit}
                    className="w-full bg-amber-800 text-white text-xs tracking-[0.2em] uppercase font-semibold py-4 rounded-xl hover:bg-amber-900 transition-colors flex items-center justify-center gap-2"
                  >
                    Send Message <Send size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimSection>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-stone-900 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <p className="text-2xl font-bold text-white mb-2 tracking-widest" style={{ fontFamily: "'Playfair Display', serif" }}>Velour</p>
            <p className="text-amber-400 text-xs tracking-[0.3em] uppercase mb-4">Hotel & Bistro</p>
            <p className="text-stone-500 text-sm leading-relaxed">An intimate sanctuary where luxury and authenticity intertwine.</p>
            <div className="flex gap-4 mt-5">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.button key={i} whileHover={{ scale: 1.15, color: "#d97706" }} className="text-stone-500 hover:text-amber-400 transition-colors">
                  <Icon size={18} />
                </motion.button>
              ))}
            </div>
          </div>
          {[
            { title: "Hotel", links: ["Our Story", "Rooms & Suites", "Amenities", "Gallery", "Sustainability"] },
            { title: "Restaurant", links: ["The Bistro", "Menu", "Wine List", "Private Dining", "Chef's Table"] },
            { title: "Contact", links: ["Reservations", "Concierge", "Weddings", "Corporate", "Press"] }
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-white font-semibold text-sm mb-4 tracking-wider uppercase">{title}</p>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <motion.button whileHover={{ x: 4 }} className="text-stone-500 hover:text-stone-300 text-sm transition-colors">
                      {link}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs">© 2025 Velour Hotel & Bistro. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(link => (
              <button key={link} className="text-stone-600 hover:text-stone-400 text-xs transition-colors">{link}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="font-sans antialiased">
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Stats />
      <About />
      <Rooms />
      <Restaurant />
      <Amenities />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}