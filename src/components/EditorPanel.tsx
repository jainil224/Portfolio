import React, { useState, useRef } from "react";
import { 
  X, 
  Upload, 
  Trash2, 
  Save, 
  RotateCcw, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Plus, 
  Tag,
  Link,
  Info
} from "lucide-react";
import { ProfileContent } from "../types";

interface EditorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  content: ProfileContent;
  onSaveContent: (newContent: ProfileContent) => void;
  onReset: () => void;
  userImage: string | null;
  onImageUpload: (base64Image: string | null) => void;
}

export default function EditorPanel({
  isOpen,
  onClose,
  content,
  onSaveContent,
  onReset,
  userImage,
  onImageUpload,
}: EditorPanelProps) {
  const [formData, setFormData] = useState<ProfileContent>({ ...content });
  const [newTag, setNewTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit files to ~4MB to stay within safe localStorage bounds if stored
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageUpload(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be smaller than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onImageUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    onSaveContent(formData);
    onClose();
  };

  return (
    <div id="editor-panel-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs font-sans">
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        id="editor-drawer" 
        className="relative h-full w-full max-w-md bg-zinc-950 border-l border-zinc-800 text-zinc-100 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold font-display tracking-wide text-zinc-50">App Customizer</h3>
            <p className="text-xs text-zinc-400 mt-1">Configure your portfolio hero section</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            id="close-button"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section: Background image */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Upload size={14} /> Hero Portrait Background
            </label>

            {!userImage ? (
              <div 
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                className="group border border-dashed border-zinc-700 hover:border-zinc-500 rounded-xl p-6 text-center cursor-pointer bg-zinc-900/40 hover:bg-zinc-900/80 transition-all duration-200"
                id="drag-drop-area"
              >
                <div className="mx-auto w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 group-hover:text-zinc-200 transition-colors mb-3">
                  <Upload size={20} />
                </div>
                <p className="text-sm font-medium text-zinc-300">
                  Upload the portrait image here
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  Drag and drop, or click to browse (JPG, PNG)
                </p>
                <div className="mt-3 inline-flex items-center gap-1 bg-zinc-800/80 text-zinc-300 px-2.5 py-1 rounded text-xs">
                  <Info size={12} className="text-sky-400" />
                  Your image blends seamlessly into the black background!
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl border border-zinc-800 bg-zinc-900 p-4 flex items-center gap-4">
                <img 
                  src={userImage} 
                  alt="Background preview" 
                  className="w-14 h-14 rounded-lg object-cover ring-1 ring-zinc-700 bg-black"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-emerald-400 font-medium">Portrait Loaded</p>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">Stored inside browser storage</p>
                </div>
                <button
                  type="button"
                  onClick={() => onImageUpload(null)}
                  className="p-2 bg-zinc-800 hover:bg-red-950 hover:text-red-400 text-zinc-400 rounded-lg transition-all cursor-pointer"
                  title="Remove image"
                  id="remove-image-button"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="space-y-1.5 pt-1 border-t border-zinc-900/60">
              <label className="block text-xs font-semibold text-zinc-400">Or Paste Image Web URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="e.g. https://images.unsplash.com/... or any direct link"
                  value={userImage && !userImage.startsWith("data:") ? userImage : ""}
                  onChange={(e) => onImageUpload(e.target.value?.trim() || null)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-hidden focus:border-zinc-700 transition-colors"
                />
                {userImage && !userImage.startsWith("data:") && (
                  <button
                    type="button"
                    onClick={() => onImageUpload(null)}
                    className="px-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center font-mono text-xs"
                    title="Clear Link"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section: Core Info */}
          <div className="space-y-4 pt-2 border-t border-zinc-900">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Personal Details</label>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors"
                  placeholder="e.g. Aaron Smith"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Professional Headline / Role</label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors"
                  placeholder="e.g. Lead Software Architect"
                />
              </div>

              <div>
                <label className="block text-xs text-zinc-400 mb-1">Biography / Summary</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors resize-none"
                  placeholder="Write a brief profile description..."
                />
              </div>
            </div>
          </div>

          {/* Section: Tags */}
          <div className="space-y-3 pt-2 border-t border-zinc-900">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Tag size={14} /> Skills & Focus Areas
            </label>
            <form onSubmit={handleAddTag} className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="e.g. Rust, Cloud, UI/UX"
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors"
              />
              <button
                type="submit"
                className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg text-sm flex items-center justify-center cursor-pointer transition-colors"
                id="add-tag-button"
              >
                <Plus size={16} />
              </button>
            </form>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {formData.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-md px-2 py-0.5 text-xs text-zinc-300"
                >
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)}
                    className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              {formData.tags.length === 0 && (
                <p className="text-xs text-zinc-500 italic">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Section: Primary and Secondary CTA Button text/url */}
          <div className="space-y-4 pt-2 border-t border-zinc-900">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Link size={14} /> Action Buttons
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Primary Text</label>
                <input 
                  type="text" 
                  name="primaryButtonText"
                  value={formData.primaryButtonText}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Primary URL</label>
                <input 
                  type="text" 
                  name="primaryButtonUrl"
                  value={formData.primaryButtonUrl}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Secondary Text</label>
                <input 
                  type="text" 
                  name="secondaryButtonText"
                  value={formData.secondaryButtonText}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Secondary URL</label>
                <input 
                  type="text" 
                  name="secondaryButtonUrl"
                  value={formData.secondaryButtonUrl}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 focus:outline-hidden focus:border-zinc-700 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section: Social Links */}
          <div className="space-y-4 pt-2 border-t border-zinc-900">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Social Connections</label>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/80 rounded-lg px-3 py-1.5">
                <Github size={16} className="text-zinc-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="GitHub Link"
                  value={formData.socialLinks.github || ""}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  className="w-full bg-transparent text-xs text-zinc-100 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/80 rounded-lg px-3 py-1.5">
                <Linkedin size={16} className="text-zinc-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="LinkedIn Link"
                  value={formData.socialLinks.linkedin || ""}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  className="w-full bg-transparent text-xs text-zinc-100 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/80 rounded-lg px-3 py-1.5">
                <Twitter size={16} className="text-zinc-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Twitter Link"
                  value={formData.socialLinks.twitter || ""}
                  onChange={(e) => handleSocialChange("twitter", e.target.value)}
                  className="w-full bg-transparent text-xs text-zinc-100 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800/80 rounded-lg px-3 py-1.5">
                <Mail size={16} className="text-zinc-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Email Address"
                  value={formData.socialLinks.email || ""}
                  onChange={(e) => handleSocialChange("email", e.target.value)}
                  className="w-full bg-transparent text-xs text-zinc-100 focus:outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            id="reset-config-button"
          >
            <RotateCcw size={16} /> Reset
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            className="flex-1.5 bg-zinc-100 hover:bg-zinc-200 text-black py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-lg"
            id="save-config-button"
          >
            <Save size={16} /> Keep Changes
          </button>
        </div>
      </div>
    </div>
  );
}
