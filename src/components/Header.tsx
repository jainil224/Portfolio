import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Settings } from "lucide-react";

interface HeaderProps {
  onOpenEditor: () => void;
  onContactClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEditor, onContactClick }) => {
  const [activeSection, setActiveSection] = useState<string>("homepage");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Smooth scroll logic
  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      
      const sections = [
        { id: "hero-canvas", name: "homepage" },
        { id: "projects-section", name: "project" },
        { id: "services-section", name: "skills" },
        { id: "about-me-section", name: "about me" }
      ];

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Homepage", id: "hero-canvas", value: "homepage" },
    { label: "Project", id: "projects-section", value: "project" },
    { label: "Skills", id: "services-section", value: "skills" },
    { label: "About me", id: "about-me-section", value: "about me" }
  ];

  return (
    <>
      <style>{`
        /* Injection of requested liquid glass utility details inside a local scoped style element */
        .header-liquid {
          border-radius: 9999px;
          border: none;
        }
      `}</style>

      {/* Outer absolute/fixed header container centered atop viewport */}
      <nav 
        id="app-floating-header"
        className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none select-none"
      >
        {/* Core Pill Wrapper styled with .liquid-glass structure */}
        <div className="w-full max-w-4xl liquid-glass rounded-full px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-4 pointer-events-auto shadow-2xl transition-all duration-300">
          
          {/* Logo Name */}
          <div 
            className="flex items-center gap-2 cursor-pointer pl-2"
            onClick={() => handleScrollTo("hero-canvas")}
          >
            <span className="font-display font-black text-white text-xs sm:text-sm tracking-wider uppercase leading-none">
              HeroCraft
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {menuItems.map((item) => {
              const isActive = activeSection === item.value;
              return (
                <button
                  key={item.label}
                  onClick={() => handleScrollTo(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest transition-all cursor-pointer ${
                    isActive 
                      ? "text-white bg-white/10" 
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Action Call-To-Action Button with liquid-glass-strong weight */}
          <div className="flex items-center gap-2">
            
            {/* Custom Interactive Magnet CTA button reminiscent of the photo */}
            <button
              onClick={onContactClick}
              className="liquid-glass-strong px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0C0C0C] bg-[#FFFFFF] hover:bg-zinc-200 hover:scale-102 flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer shadow-lg select-none border-t border-white/20"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white transition-all cursor-pointer rounded-full"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          </div>

        </div>
      </nav>

      {/* Mobile Menu Dropdown overlay panel */}
      {mobileMenuOpen && (
        <div 
          id="mobile-navigation-overlay"
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 md:hidden p-8"
        >
          {menuItems.map((item) => {
            const isActive = activeSection === item.value;
            return (
              <button
                key={item.label}
                onClick={() => handleScrollTo(item.id)}
                className={`text-lg uppercase tracking-widest font-bold transition-all ${
                  isActive ? "text-white scale-110" : "text-zinc-500 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onContactClick();
            }}
            className="mt-4 px-8 py-3 bg-white text-black font-extrabold uppercase tracking-widest text-xs rounded-full flex items-center gap-1.5 active:scale-95 transition-all shadow-xl"
          >
            <span>Get in Touch</span>
            <ArrowUpRight size={14} strokeWidth={3} />
          </button>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute bottom-8 text-zinc-500 hover:text-white text-xs uppercase tracking-widest font-mono cursor-pointer"
          >
            [ Close Menu ]
          </button>
        </div>
      )}
    </>
  );
};
