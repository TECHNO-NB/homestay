
import {

  Phone,

  CheckCircle,

  ArrowRight,

} from "lucide-react";

function LandingPage() {
  return (
    <section
      id="hero"
      className=" relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden"
    >
      {/* Decorative bubbles */}
      {[
        {
          size: 320,
          top: "10%",
          left: "70%",
          dur: "6s",
          delay: "0s",
          opacity: "0.04",
        },
        {
          size: 180,
          top: "60%",
          left: "80%",
          dur: "4s",
          delay: "1s",
          opacity: "0.06",
        },
        {
          size: 100,
          top: "30%",
          left: "5%",
          dur: "5s",
          delay: "2s",
          opacity: "0.05",
        },
        {
          size: 60,
          top: "70%",
          left: "15%",
          dur: "3.5s",
          delay: "0.5s",
          opacity: "0.08",
        },
      ].map((b, i) => (
        <div
          key={i}
          className="bubble absolute rounded-full border border-cyan-400 pointer-events-none"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            opacity: b.opacity,
            // @ts-ignore
            "--dur": b.dur,
            "--delay": b.delay,
          }}
        />
      ))}

      <div className="hero-bg"></div>

      <div className="w-screen relative  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center w-full items-center">
          {/* Left Content */}
          <div className="w-full flex justify-center items-center flex-col">
            <div className="badge relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-cyan-300 text-xs font-semibold mb-6 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
              24/7 Emergency Response Available
            </div>

            <h1 className="font-display z-10 relative text-center text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none mb-6">
              <span className="text-white">Magar</span>

              <span className="shimmer-text"> Drainage</span>
              <br />
              <span className="text-white">Experts</span>
            </h1>

            <p className="text-slate-300 text-lg text-center leading-relaxed mb-8 max-w-lg">
              Fast, reliable, and fully guaranteed drainage solutions for homes
              and businesses. From blocked drains to complete pipe
              rehabilitation — we clear it all.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <button className="water-gradient text-white font-semibold px-7 py-4 rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 group">
                <a
                  href="tel:9849307841"
                  className="flex justify-center items-center gap-2"
                >
                  Book Emergency Call
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </button>
              <a
                href="tel:9849307841"
                className="border border-slate-100 hover:border-cyan-500 text-slate-300 hover:text-white font-semibold px-7 py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <Phone size={18} className="text-cyan-400" />
                9849307841
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center w-full gap-5">
              {["No Call-Out Fee", "60-Min Response", "12-Month Guarantee"].map(
                (tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 text-slate-300 text-sm"
                  >
                    <CheckCircle size={15} className="text-cyan-400 shrink-0" />
                    {tag}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
