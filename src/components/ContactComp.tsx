import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Facebook,
} from "lucide-react";

const ContactComp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/contacts`,
        formData,
      );

      console.log("Success:", res.data);
      if(res.data){
        alert("Success")
      }

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (err: any) {
      alert("Unable to send")
      console.error("Error:", err.response?.data || err.message);
    }
  };

  // Framer Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* LEFT SIDE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="section-line" style={{ margin: "0 0 20px" }} />
          <div className="sans text-xs tracking-[0.2em] uppercase text-[#b8955a] mb-4">
            Get In Touch
          </div>
          <h2
            className="serif mb-6"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "#1e1a12",
            }}
          >
            Let's Talk <em>Skin</em>
          </h2>

          <div className="space-y-5 mt-8">
            {[
              {
                icon: <Phone className="w-4 h-4" />,
                label: "Phone",
                value: "+1 337-422-9525",
              },
              {
                icon: <Mail className="w-4 h-4" />,
                label: "Email",
                value: "dermaglowrn@gmail.com",
              },
              {
                icon: <MapPin className="w-4 h-4" />,
                label: "Location",
                value:
                  "Salon And Spa Galleria 1953 golden heights rd Suite #105 Fort Worth Texas 76177",
              },
              {
                icon: <Clock className="w-4 h-4" />,
                label: "Hours",
                value: "By Appointment Only",
              },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-[#f5efe9] flex items-center justify-center text-[#b8955a] border border-[#e8ddd4] shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="sans text-xs text-[#8a7055] tracking-widest uppercase mb-0.5">
                    {c.label}
                  </div>
                  <div className="sans text-sm text-[#2c2416]">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mt-10">
            {[
              {
                icon: <Instagram className="w-4 h-4" />,
                link: "https://www.instagram.com/dermaglowrn?igsh=NmVubnl3YWV5bG5j&utm_source=qr",
              },
              {
                icon: <Facebook className="w-4 h-4" />,
                link: "https://www.facebook.com/profile.php?id=61578276033613&mibextid=wwXIfr",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-black flex items-center justify-center text-black hover:border-[#b8955a] hover:text-[#b8955a] transition-colors"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="bg-white rounded-3xl p-8 border border-[#ede5d8] shadow-sm">
            <div className="serif text-xl text-[#2c2416] mb-6">
              Send a Message
            </div>

            <div className="space-y-4">
              {/* FULL NAME */}
              <div>
                <label className="sans text-xs text-[#8a7055] tracking-widest uppercase block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-[#e8ddd4] rounded-xl px-4 py-3 sans text-sm text-[#2c2416] outline-none focus:border-[#b8955a] transition-colors bg-[#faf8f5]"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="sans text-xs text-[#8a7055] tracking-widest uppercase block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full border border-[#e8ddd4] rounded-xl px-4 py-3 sans text-sm text-[#2c2416] outline-none focus:border-[#b8955a] transition-colors bg-[#faf8f5]"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="sans text-xs text-[#8a7055] tracking-widest uppercase block mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone"
                  className="w-full border border-[#e8ddd4] rounded-xl px-4 py-3 sans text-sm text-[#2c2416] outline-none focus:border-[#b8955a] transition-colors bg-[#faf8f5]"
                />
              </div>

              {/* SELECT */}
              <div>
                <label className="sans text-xs text-[#8a7055] tracking-widest uppercase block mb-2">
                  Primary Concern
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full border border-[#e8ddd4] rounded-xl px-4 py-3 sans text-sm text-[#2c2416] outline-none focus:border-[#b8955a] transition-colors bg-[#faf8f5]"
                >
                  <option value="">Select your concern</option>
                  <option>Acne & Breakouts</option>
                  <option>Hyperpigmentation</option>
                  <option>Aging & Fine Lines</option>
                  <option>Rosacea & Sensitivity</option>
                  <option>General Skin Health</option>
                </select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="sans text-xs text-[#8a7055] tracking-widest uppercase block mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your skin..."
                  className="w-full border border-[#e8ddd4] rounded-xl px-4 py-3 sans text-sm text-[#2c2416] outline-none focus:border-[#b8955a] transition-colors bg-[#faf8f5] resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center py-4"
              >
                Send Message <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* MAP */}
      <motion.div
        className="mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="sans text-xs tracking-[0.2em] uppercase text-[#8a7055] mb-3">
          Find Us
        </div>

        <div className="w-full h-65 rounded-2xl overflow-hidden border border-[#e8ddd4]">
          <iframe
            src="https://www.google.com/maps?q=Salon%20And%20Spa%20Galleria%201953%20Golden%20Heights%20Rd%20Fort%20Worth%20Texas%2076177&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default ContactComp;