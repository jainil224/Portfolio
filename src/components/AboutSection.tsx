import React from "react";
import { FadeIn, AnimatedText, ContactButton, Magnet } from "./Reusable";

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section
      className="min-h-screen bg-[#0C0C0C] relative px-5 sm:px-8 md:px-10 py-20 flex flex-col items-center justify-center overflow-hidden"
      id="about-me-section"
    >
      {/* 1. Decorative Corner 3D Elements */}
      
      {/* Top-Left: Moon icon */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-1"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="3D Moon Asset"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none pointer-events-none animate-bounce"
          style={{ animationDuration: "6s", animationTimingFunction: "ease-in-out" }}
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Bottom-Left: 3D object */}
      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-1"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="3D Polyhedron Asset"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain select-none pointer-events-none animate-pulse"
          style={{ animationDuration: "5s" }}
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Top-Right: Lego icon */}
      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-1"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="3D Lego Asset"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain select-none pointer-events-none animate-bounce"
          style={{ animationDuration: "7s", animationTimingFunction: "ease-in-out" }}
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* Bottom-Right: 3D group */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-1"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D Group Asset"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain select-none pointer-events-none animate-pulse"
          style={{ animationDuration: "8s" }}
          referrerPolicy="no-referrer"
        />
      </FadeIn>

      {/* 2. Structured Center Layout */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* About Heading */}
        <FadeIn delay={0} y={40} duration={0.8} as="h2">
          <span className="hero-heading font-black uppercase leading-none tracking-tight block text-center" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
            About me
          </span>
        </FadeIn>

        {/* Space Spacer 1 */}
        <div className="h-10 sm:h-14 md:h-16" />

        {/* Dynamic Character-By-Character scroll opacity body text */}
        <AnimatedText
          text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" } as React.CSSProperties}
        />

        {/* Space Spacer 2 */}
        <div className="h-16 sm:h-20 md:h-24" />

        {/* Premium Styled Contact Button enclosed inside visual Magnet */}
        <FadeIn delay={0.2} y={30} duration={0.8}>
          <Magnet strength={50}>
            <ContactButton label="Contact Me" onClick={onContactClick} />
          </Magnet>
        </FadeIn>

      </div>
    </section>
  );
};
