import React, { useRef, useState, useEffect } from "react";

const ALL_IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionTop, setSectionTop] = useState(0);

  // Split images
  const row1Base = ALL_IMAGES.slice(0, 11);
  const row2Base = ALL_IMAGES.slice(11);

  // Triple arrays for seamless scrolling
  const row1Images = [...row1Base, ...row1Base, ...row1Base];
  const row2Images = [...row2Base, ...row2Base, ...row2Base];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    // Add passive scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const updateTop = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
    };
    updateTop();
    window.addEventListener("resize", updateTop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTop);
    };
  }, []);

  // Compute scroll offset
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const offset = (scrollY - sectionTop + vh) * 0.3;

  // Custom coordinate projections
  const row1Transform = `translateX(${offset - 200}px)`;
  const row2Transform = `translateX(${-(offset - 200)}px)`;

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative"
      id="portfolio-marquee"
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1: moves RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3"
            style={{
              transform: row1Transform,
              willChange: "transform",
              transition: "transform 0.1s linear"
            }}
          >
            {row1Images.map((src, index) => (
              <div
                key={`r1-${index}`}
                className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900/40 relative group"
              >
                <img
                  src={src}
                  alt="Portfolio Piece Row 1"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: moves LEFT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3"
            style={{
              transform: row2Transform,
              willChange: "transform",
              transition: "transform 0.1s linear"
            }}
          >
            {row2Images.map((src, index) => (
              <div
                key={`r2-${index}`}
                className="w-[420px] h-[270px] shrink-0 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900/40 relative group"
              >
                <img
                  src={src}
                  alt="Portfolio Piece Row 2"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
