import React from "react";
import { FadeIn } from "./Reusable";

interface ServiceItem {
  id: string;
  num: string;
  name: string;
  desc: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "3d-modeling",
    num: "01",
    name: "3D Modeling",
    desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations."
  },
  {
    id: "rendering",
    num: "02",
    name: "Rendering",
    desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life."
  },
  {
    id: "motion-design",
    num: "03",
    name: "Motion Design",
    desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences."
  },
  {
    id: "branding",
    num: "04",
    name: "Branding",
    desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence."
  },
  {
    id: "web-design",
    num: "05",
    name: "Web Design",
    desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience."
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section
      className="bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-5"
      id="services-section"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Services Section Header */}
        <FadeIn delay={0} y={30} as="div" className="text-center">
          <h2 className="font-black uppercase tracking-tight text-[#0C0C0C] inline-block mb-16 sm:mb-20 md:mb-28" style={{ fontSize: "clamp(3rem, 12vw, 160px)", lineHeight: 0.9 }}>
            Services
          </h2>
        </FadeIn>

        {/* Services List Vertical Grid */}
        <div className="flex flex-col border-t border-[rgba(12,12,12,0.15)]">
          {SERVICES_DATA.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={index * 0.1}
              y={40}
              className="border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 group hover:bg-[#0c0c0c]/[0.02] transition-colors"
            >
              {/* Huge Number Column */}
              <div 
                className="font-black text-[#0C0C0C] tracking-tight shrink-0 select-none leading-none min-w-[70px] sm:min-w-[110px] md:min-w-[150px] transition-transform duration-300 group-hover:scale-103"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {item.num}
              </div>

              {/* Title & Description Stack Column */}
              <div className="flex-1 space-y-2 md:space-y-3">
                <h3 
                  className="font-medium text-[#0C0C0C] uppercase tracking-wide transition-colors group-hover:text-amber-500 duration-300"
                  style={{ fontSize: "clamp(1.1rem, 2.2vw, 2.1rem)", lineHeight: 1.1 }}
                >
                  {item.name}
                </h3>
                <p 
                  className="font-light text-[#0C0C0C] leading-relaxed max-w-2xl style-desc opacity-70 group-hover:raw-opacity-100 duration-300"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}
                >
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
