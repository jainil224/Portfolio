import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { FadeIn, LiveProjectButton } from "./Reusable";

interface ProjectItem {
  num: string;
  name: string;
  category: string;
  liveUrl: string;
  col1_img1: string;
  col1_img2: string;
  col2_img: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    num: "01",
    name: "Nextlevel Studio",
    category: "Client",
    liveUrl: "#",
    col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
  },
  {
    num: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    liveUrl: "#",
    col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
  },
  {
    num: "03",
    name: "Solaris Digital",
    category: "Client",
    liveUrl: "#",
    col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
  }
];

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll of parent container containing all sticky cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      className="bg-[#0C0C0C] text-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pb-20 relative z-10"
      id="projects-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 py-20">
        
        {/* Projects Heading */}
        <FadeIn delay={0} y={30} as="div" className="text-center mb-16 sm:mb-24">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight inline-block" style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
            Project
          </h2>
        </FadeIn>

        {/* Sticky Cards Stacking Deck */}
        <div className="flex flex-col gap-12 relative">
          {PROJECTS_DATA.map((project, index) => {
            return (
              <StickyCard
                key={project.num}
                index={index}
                project={project}
                scrollYProgress={scrollYProgress}
                totalCards={PROJECTS_DATA.length}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

interface StickyCardProps {
  index: number;
  project: ProjectItem;
  scrollYProgress: any;
  totalCards: number;
}

const StickyCard: React.FC<StickyCardProps> = ({
  index,
  project,
  scrollYProgress,
  totalCards
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Compute scale based on card index & scroll progress
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  
  // Set bounds: start scaling down only as future cards scroll in
  const startBound = index * (1 / totalCards);
  const endBound = (index + 1) * (1 / totalCards);
  
  // Scale transformation applied symmetrically
  const scale = useTransform(scrollYProgress, [startBound, endBound], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] w-full flex items-start justify-center"
      style={{
        top: `${96 + index * 28}px`,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative"
      >
        {/* Card Top Row Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full border-b border-[#D7E2EA]/10 pb-4 md:pb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Project Number */}
            <span className="font-sans font-black text-transparent bg-clip-text bg-gradient-to-b from-[#D7E2EA] to-[#D7E2EA]/30 text-3xl sm:text-4xl md:text-5xl tracking-tighter uppercase leading-none select-none">
              {project.num}
            </span>
            
            {/* Title & Badge Stack */}
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Reusable Ghost outline button */}
          <LiveProjectButton
            label="Live Project"
            onClick={() => {
              if (project.liveUrl !== "#") {
                window.location.href = project.liveUrl;
              }
            }}
          />
        </div>

        {/* Card Bottom Row: Two-column Image Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 pt-4 sm:pt-6 overflow-hidden">
          
          {/* Column 1: Left 40% width (Cols 1-4) - 2 stacked images */}
          <div className="md:col-span-4 flex flex-col gap-4 justify-between h-full overflow-hidden">
            <div 
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[45px] border border-[#D7E2EA]/10 relative bg-zinc-950"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <img
                src={project.col1_img1}
                alt={`${project.name} Asset 1`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div 
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[45px] border border-[#D7E2EA]/10 relative bg-zinc-950 flex-1"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <img
                src={project.col1_img2}
                alt={`${project.name} Asset 2`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Column 2: Right 60% width (Cols 5-10) - 1 tall image */}
          <div className="md:col-span-6 w-full h-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-[#D7E2EA]/10 relative bg-zinc-950">
            <img
              src={project.col2_img}
              alt={`${project.name} Main Showcase`}
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>

      </motion.div>
    </div>
  );
};
