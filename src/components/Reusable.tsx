import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

// 1. FEAT: ContactButton Component
interface ContactButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  label = "Contact Me",
  onClick,
  className = "",
  type = "button"
}) => {
  const customStyle: React.CSSProperties = {
    background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
    outline: "2px solid white",
    outlineOffset: "-3px",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={customStyle}
      className={`rounded-full text-white font-medium uppercase tracking-widest transition-all hover:scale-102 hover:brightness-110 active:scale-98 cursor-pointer select-none text-center px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base ${className}`}
    >
      {label}
    </button>
  );
};

// 2. FEAT: LiveProjectButton Component
interface LiveProjectButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  label = "Live Project",
  onClick,
  className = ""
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] hover:bg-[#D7E2EA]/10 text-[#D7E2EA] font-medium uppercase tracking-widest transition-all hover:scale-102 active:scale-98 cursor-pointer select-none text-center px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`}
    >
      {label}
    </button>
  );
};

// 3. FEAT: FadeIn Animation Wrapper
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  id?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className = "",
  id
}) => {
  const Component = motion.create(as as any);

  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  );
};

// 4. FEAT: Magnet Mouse Interaction Wrapper
interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  padding?: number;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 45,
  padding = 40,
  className = ""
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState("translate3d(0px, 0px, 0px)");
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const minX = rect.left - padding;
      const maxX = rect.right + padding;
      const minY = rect.top - padding;
      const maxY = rect.bottom + padding;

      const { clientX: mx, clientY: my } = e;

      if (mx >= minX && mx <= maxX && my >= minY && my <= maxY) {
        setIsHovered(true);
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dx = mx - cx;
        const dy = my - cy;

        const tx = dx / (strength / 10);
        const ty = dy / (strength / 10);

        setTransform(`translate3d(${tx}px, ${ty}px, 0px)`);
      } else {
        if (isHovered) {
          setIsHovered(false);
          setTransform("translate3d(0px, 0px, 0px)");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform("translate3d(0px, 0px, 0px)");
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, padding, isHovered]);

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform,
        transition: isHovered
          ? "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
          : "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

// 5. FEAT: AnimatedText (Character-by-character reveal) Component
interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "" }) => {
  const containerRef = React.useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.82", "end 0.18"],
  });

  const chars = text.split("");

  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, index) => {
        if (char === " ") {
          return <span key={index} className="inline-block">&nbsp;</span>;
        }

        const start = index / chars.length;
        const end = (index + 1) / chars.length;

        return (
          <Character
            key={index}
            character={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};

interface CharacterProps {
  character: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ character, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{character}</span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {character}
      </motion.span>
    </span>
  );
};
