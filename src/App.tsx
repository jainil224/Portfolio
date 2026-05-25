import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import EditorPanel from "./components/EditorPanel";
import { ProfileContent } from "./types";
import { MarqueeSection } from "./components/MarqueeSection";
import { AboutSection } from "./components/AboutSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { Header } from "./components/Header";


// Default Profile State resembling the young man looking confident and creative
const defaultProfile: ProfileContent = {
  name: "Jainil Jain",
  role: "Full Stack Developer & Technical Designer",
  bio: "Creating high-impact user experiences by marrying artistic frontend precision with robust backend architectures. Focused on developing highly responsive web interfaces, smart API connections, and clean designs.",
  tags: [
    "React", 
    "TypeScript", 
    "Node.js", 
    "Tailwind CSS", 
    "Vite", 
    "Next.js", 
    "Cloud Architecture"
  ],
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "jainil11199@gmail.com",
  },
  primaryButtonText: "Explore My Work",
  primaryButtonUrl: "#projects",
  secondaryButtonText: "Get in Touch",
  secondaryButtonUrl: "mailto:jainil11199@gmail.com",
};

export default function App() {
  const [profileContent, setProfileContent] = useState<ProfileContent>(defaultProfile);
  const [userImage, setUserImage] = useState<string | null>("https://res.cloudinary.com/dsn0ks2hl/image/upload/v1779634210/WhatsApp_Image_2026-05-24_at_8.19.49_PM_lswxbp.jpg");
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  // Load persisted configuration on system startup
  useEffect(() => {
    try {
      const savedContent = localStorage.getItem("herocraft_profile_content");
      if (savedContent) {
        setProfileContent(JSON.parse(savedContent));
      } else {
        // Preset with user email if available as a neat personal preference
        setProfileContent((prev) => ({
          ...prev,
          socialLinks: {
            ...prev.socialLinks,
            email: "jainil11199@gmail.com",
          },
          secondaryButtonUrl: "mailto:jainil11199@gmail.com",
        }));
      }

      const savedImage = localStorage.getItem("herocraft_user_image");
      if (savedImage && savedImage !== "https://res.cloudinary.com/dsn0ks2hl/image/upload/v1779627443/WhatsApp_Image_2026-05-24_at_6.16.28_PM_wfcsjs.jpg") {
        setUserImage(savedImage);
      } else {
        // Use the Cloudinary image URL provided by the user as the pristine default backdrop
        setUserImage("https://res.cloudinary.com/dsn0ks2hl/image/upload/v1779634210/WhatsApp_Image_2026-05-24_at_8.19.49_PM_lswxbp.jpg");
      }
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
  }, []);

  // Save profile changes
  const handleSaveContent = (newContent: ProfileContent) => {
    setProfileContent(newContent);
    try {
      localStorage.setItem("herocraft_profile_content", JSON.stringify(newContent));
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  };

  // Reset to initial pristine states
  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore default developer settings?")) {
      setProfileContent(defaultProfile);
      setUserImage(null);
      try {
        localStorage.removeItem("herocraft_profile_content");
        localStorage.removeItem("herocraft_user_image");
      } catch (e) {
        console.error("LocalStorage clearing error:", e);
      }
    }
  };

  // Save image upload changes
  const handleImageUpload = (base64Image: string | null) => {
    setUserImage(base64Image);
    try {
      if (base64Image) {
        localStorage.setItem("herocraft_user_image", base64Image);
      } else {
        localStorage.removeItem("herocraft_user_image");
      }
    } catch (e) {
      console.error("Failed to store image in localStorage:", e);
      alert(
        "Image file size is too large for browser LocalStorage. " +
        "Please try an optimized smaller JPEG/PNG image or decrease the resolution."
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 overflow-x-clip">
      {/* Informative banner for first-time use to help guide upload */}
      {!userImage && (
        <div className="bg-zinc-900 border-b border-zinc-800 text-center py-2 px-4 flex items-center justify-center gap-2 text-xs text-zinc-300">
          <span>💡 <strong>Quick Start:</strong> Click the card on the right or use the button to upload the portrait of the young man with the black background.</span>
          <button 
            onClick={() => setIsEditorOpen(true)}
            className="text-sky-400 font-semibold hover:underline cursor-pointer"
          >
            Upload Now →
          </button>
        </div>
      )}

      {/* Floating Header styled with liquid-glass design */}
      <Header 
        onOpenEditor={() => setIsEditorOpen(true)}
        onContactClick={() => {
          const aboutSection = document.getElementById("about-me-section");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          } else {
            setIsEditorOpen(true);
          }
        }}
      />

      {/* Main Hero Component */}
      <HeroSection 
        content={profileContent}
        userImage={userImage}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* 2. Marquee Section */}
      <MarqueeSection />

      {/* 3. About Section */}
      <AboutSection onContactClick={() => setIsEditorOpen(true)} />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Projects Section */}
      <ProjectsSection />

      {/* Settings Customizer drawer */}
      <EditorPanel 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        content={profileContent}
        onSaveContent={handleSaveContent}
        onReset={handleReset}
        userImage={userImage}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}
