import React from "react";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Settings, 
  Sparkles,
  Camera,
  Heart
} from "lucide-react";
import { ProfileContent } from "../types";

interface HeroSectionProps {
  content: ProfileContent;
  userImage: string | null;
  onOpenEditor: () => void;
}

export default function HeroSection({
  content,
  userImage,
  onOpenEditor,
}: HeroSectionProps) {

  // Interactive Mouse Reveal & Grid Track coordinates
  const containerRef = React.useRef<HTMLDivElement>(null);
  const targetX = React.useRef<number>(0);
  const targetY = React.useRef<number>(0);
  const smoothX = React.useRef<number>(0);
  const smoothY = React.useRef<number>(0);
  const gridOffset = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [gridState, setGridState] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  const [maskUrl, setMaskUrl] = React.useState<string>("");
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const BG_IMAGE_2 = "https://res.cloudinary.com/dsn0ks2hl/image/upload/v1779634771/WhatsApp_Image_2026-05-24_at_8.28.55_PM_n4fzr8.jpg";

  React.useEffect(() => {
    // Hidden auxiliary Canvas initialization
    const canvas = document.createElement("canvas");
    canvasRef.current = canvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initial projection coordinates
    targetX.current = window.innerWidth / 2;
    targetY.current = window.innerHeight / 2;
    smoothX.current = window.innerWidth / 2;
    smoothY.current = window.innerHeight / 2;

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetX.current = e.clientX - rect.left;
      targetY.current = e.clientY - rect.top;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  React.useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      if (!containerRef.current) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();

      // Interpolate towards target (easing)
      smoothX.current += (targetX.current - smoothX.current) * 0.1;
      smoothY.current += (targetY.current - smoothY.current) * 0.1;

      const cursorX = smoothX.current;
      const cursorY = smoothY.current;

      // Calculate normalized offset relative to center
      const nx = (cursorX / (rect.width || 1)) - 0.5;
      const ny = (cursorY / (rect.height || 1)) - 0.5;

      // Animate grid offset based on normalized offset
      gridOffset.current.x += nx * 16;
      gridOffset.current.y += ny * 16;

      // Sync coordinate changes into SVG
      setGridState({ x: gridOffset.current.x, y: gridOffset.current.y });

      // Draw spotlight to offscreen Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Create radial gradient
          const gradient = ctx.createRadialGradient(
            cursorX,
            cursorY,
            0,
            cursorX,
            cursorY,
            260
          );

          // Setup specified stops exactly as requested
          gradient.addColorStop(0, "rgba(255,255,255,1)");
          gradient.addColorStop(0.4, "rgba(255,255,255,1)");
          gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
          gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
          gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
          gradient.addColorStop(1, "rgba(255,255,255,0)");

          // Draw spotlight circle
          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 260, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Generate Data URL for mask
          try {
            const dataUrl = canvas.toDataURL("image/png");
            setMaskUrl(dataUrl);
          } catch (err) {
            console.error("Mask generation failed", err);
          }
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
      },
    },
  };

  return (
    <section 
      id="hero-canvas"
      ref={containerRef}
      className="relative min-h-screen bg-black flex flex-col justify-between overflow-hidden font-sans select-none"
    >
      {/* Hero Body Layout */}
      <div className="relative flex-1 flex items-center justify-center w-full">
        {/* SVG Grid Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0">
          <defs>
            <pattern 
              id="grid" 
              width="48" 
              height="48" 
              patternUnits="userSpaceOnUse"
              x={gridState.x}
              y={gridState.y}
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#64748b"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Background Portrait Container (Fullscreen Hero Background) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {userImage ? (
            <div className="relative w-full h-full">
              {/* Base portrait layer (BG_IMAGE_2 - Spider-Man face) */}
              <img
                src={BG_IMAGE_2}
                alt="Spider-Man Face"
                className="absolute top-[120px] bottom-0 left-0 right-0 w-full h-[calc(100%-120px)] object-cover select-none brightness-110 contrast-[105%]"
                style={{ objectPosition: "center 48%" }}
                referrerPolicy="no-referrer"
                id="rendered-hero-image"
              />

              {/* Reveal layer (userImage - Person) showing only within custom spotlight mask */}
              {maskUrl && (
                <img
                  src={userImage}
                  alt={content.name}
                  className="absolute top-[120px] bottom-0 left-0 right-0 w-full h-[calc(100%-120px)] object-cover select-none brightness-110 contrast-[105%]"
                  style={{
                    objectPosition: "center 48%",
                    WebkitMaskImage: `url(${maskUrl})`,
                    maskImage: `url(${maskUrl})`,
                    WebkitMaskSize: "100vw 100vh",
                    maskSize: "100vw 100vh",
                    WebkitMaskPosition: "0px -120px",
                    maskPosition: "0px -120px",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                  }}
                  referrerPolicy="no-referrer"
                />
              )}
              
              {/* Global bottom/top subtle dark vignette helper only for seamless margins with header/footer - keeping center 100% clear */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/50 to-transparent z-1 pointer-events-none" />
              <div className="absolute inset-x-0 top-[120px] h-24 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            </div>
          ) : (
            /* High-End Tech Placeholder when image not uploaded */
            <div 
              onClick={onOpenEditor}
              className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-8 text-center cursor-pointer border-l border-zinc-900 group relative overflow-hidden pointer-events-auto"
              id="interactive-placeholder"
            >
              {/* Visual Backdrop details */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
              
              {/* Ambient Glows */}
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-zinc-800/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-zinc-800/20 transition-all duration-500" />
              <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-zinc-800/5 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-1 space-y-4 max-w-sm">
                <div className="mx-auto w-14 h-14 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-500 group-hover:text-zinc-350 group-hover:border-zinc-700 transition-all duration-300 shadow-xl group-hover:scale-105 active:scale-95">
                  <Camera size={22} className="animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-300 tracking-wide font-display group-hover:text-zinc-100 transition-colors">
                    Use Your Portrait Image Here
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 max-w-[260px] mx-auto leading-relaxed">
                    Upload the photo with the black background to complete the ultra-sleek, seamless look.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-sky-500 bg-sky-950/40 border border-sky-900/50 px-3 py-1 rounded-full group-hover:bg-sky-950/80 transition-all">
                  <Sparkles size={11} /> Setup Portrait Image
                </span>
              </div>
            </div>
          )}
        </div>

        {/* No text overlay here on the main landing - keeping it a pure visual interactive reveal canvas */}
      </div>


    </section>
  );
}
