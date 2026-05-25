import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, LiveProjectButton } from "./Reusable";

interface ProjectItem {
  num: string;
  number: string;
  name: string;
  title: string;
  category: string;
  liveUrl: string;
  col1_img1: string;
  col1_img2: string;
  col2_img: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    num: "01",
    number: "01",
    name: "Nextlevel Studio",
    title: "Nextlevel Studio",
    category: "Client",
    liveUrl: "#",
    col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
  },
  {
    num: "02",
    number: "02",
    name: "Aura Brand Identity",
    title: "Aura Brand Identity",
    category: "Personal",
    liveUrl: "#",
    col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
  },
  {
    num: "03",
    number: "03",
    name: "Solaris Digital",
    title: "Solaris Digital",
    category: "Client",
    liveUrl: "#",
    col1_img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1_img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2_img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
  }
];

export const ProjectsSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] rounded-t-[60px] -mt-14 relative z-10 py-20" id="projects-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        {/* Heading using singular "Project" and the exact styling */}
        <h2 className="hero-heading text-center font-black uppercase text-[12vw] mb-20">
          Project
        </h2>

        <div className="flex flex-col gap-20">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard
              key={project.number}
              index={index}
              totalCards={PROJECTS_DATA.length}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
}

function ProjectCard({
  project,
  index,
  totalCards,
}: ProjectCardProps) {
  const container = useRef<HTMLDivElement>(null);

  // EXACT SCROLL TRACKING FROM SNIPPET
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  // EXACT SCALE CALCULATION
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;

  // EXACT SCALE TRANSFORMATION
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, targetScale]
  );

  return (
    <div
      ref={container}
      className="relative h-[95vh] w-full"
      style={{
        top: `${index * 28}px`,
      }}
    >
      {/* STICKY SCROLL CARD WITH EXACT STYLING */}
      <motion.div
        style={{ scale }}
        className="sticky top-24 md:top-32 rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 md:p-8 flex flex-col justify-between"
      >
        {/* TOP ROW HEADER */}
        <div className="flex items-center justify-between mb-8 md:mb-10 pb-4 md:pb-6 border-b border-[#D7E2EA]/10">
          <div>
            <h3 className="text-white text-4xl md:text-6xl font-black">
              {project.number}
            </h3>

            <p className="text-[#D7E2EA] uppercase tracking-widest mt-2 text-xs md:text-sm">
              {project.category}
            </p>

            <h4 className="text-white text-2xl md:text-4xl font-bold mt-3">
              {project.title}
            </h4>
          </div>

          {/* Outlined "Live Project" pill button */}
          <LiveProjectButton
            label="Live Project"
            onClick={() => {
              if (project.liveUrl !== "#") {
                window.location.href = project.liveUrl;
              }
            }}
          />
        </div>

        {/* TWO COLUMN IMAGE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-4 md:gap-6">
          {/* LEFT COLUMN: 40% width */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div 
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] border border-[#D7E2EA]/10 relative bg-zinc-950"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <img
                src={project.col1_img1}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div 
              className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] border border-[#D7E2EA]/10 relative bg-zinc-950"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <img
                src={project.col1_img2}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: 60% width */}
          <div className="w-full overflow-hidden rounded-[40px] sm:rounded-[50px] border border-[#D7E2EA]/10 relative bg-zinc-950">
            <img
              src={project.col2_img}
              alt=""
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
}

export default ProjectsSection;
