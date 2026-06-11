import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1a1208] text-white py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#b8955a] to-[#c9a870] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="serif text-white text-sm tracking-widest uppercase">
            DERMAGLOW<span className="text-[#b8955a]">RN</span>
          </span>
        </div>
        <div className="sans text-xs text-white tracking-wide text-center">
          Science-backed compassionate skincare
        </div>
        <div className="sans text-xs text-white">
          © {new Date().getFullYear()} DermaGlowRN · All rights reserved
        </div>
      </div>
    <div className=" text-center mt-6 text-blue ">  <a href="https://mithilatechsolutions.com/" className="w-full  text-blue-500 underline mt-6 text-center ">Developed By Mithila Tech & IT Solutions</a></div>
    </footer>
  );
};

export default Footer;
