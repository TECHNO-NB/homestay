// @ts-nocheck
import  { useEffect, useState } from "react";

import {
   Menu, X,
  ArrowRight,

} from "lucide-react";
import logo from "../../public/logo.jpeg"

const NAV_LINKS = ["About", "Services", "Product", "Gallery", "Contact"];
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate=useNavigate()


  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate=(link:string)=>{
       const linkLowerCase=link.toLowerCase()
        navigate(`/${linkLowerCase}`)
  }

  return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  bg-[#faf8f5]/95 backdrop-blur-md shadow-sm border-b border-[#e8ddd4]}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <div onClick={()=>navigate("/")} className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-linear-to-br overflow-hidden from-[#b8955a] to-[#c9a870] flex items-center justify-center">
              <img src={logo} className="w-full h-full" />
            </div>
            <div>
              <div className="serif text-lg font-semibold tracking-widest text-[#2c2416]" style={{ letterSpacing: "0.18em" }}>DERMAGLOW<span className="text-[#b8955a]">RN</span></div>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((l) => (
              <a key={l} onClick={()=>handleNavigate(l)} className="nav-link cursor-pointer">{l}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={()=>navigate("/appointment")} className="btn-primary">Book a Appointment <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>

          {/* Mobile */}
          <button className="md:hidden text-[#6b5b45]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#faf8f5] border-t border-[#e8ddd4] px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l} onClick={()=>{
                handleNavigate(l)
                setMenuOpen(false)
              }} className="nav-link text-base cursor-pointer">{l}</a>
            ))}
            <button onClick={()=>{
              navigate("/appointment")
              setMenuOpen(false)
            }} className="btn-primary mt-2 justify-center">Book a Appointment <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        )}
      </header>
  );
};

export default Navbar;
