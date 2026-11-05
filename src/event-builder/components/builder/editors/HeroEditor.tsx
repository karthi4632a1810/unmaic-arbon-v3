import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Plus,
  Trash2,
  Image as ImageIcon,
  Type,
  MousePointerClick,
  Sliders,
  Upload,
  Sparkles,
  Maximize2,
  X,
  Search,
  Check,
  ExternalLink,
} from "lucide-react";
import type { HeroContent, HeroCTAButton, EventSection } from "../../../types/event";
import type { SectionPreset } from "../../../registry/sectionPresets";
import { BUTTON_PRESETS } from "../../../registry/buttonPresets";
import { SECTION_CATALOG } from "../../../registry/sectionCatalog";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

export interface HeroEditorProps {
  content: HeroContent;
  onChange: (updated: HeroContent) => void;
  presets?: SectionPreset[];
  onApplyPreset?: (preset: SectionPreset) => void;
  sections?: EventSection[];
}

export const HeroEditor: React.FC<HeroEditorProps> = ({
  content,
  onChange,
  presets,
  onApplyPreset,
  sections,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>("all");
  const [modalSearch, setModalSearch] = useState<string>("");
  const [justAppliedId, setJustAppliedId] = useState<string | null>(null);
  const [activeTemplateBtnIdx, setActiveTemplateBtnIdx] = useState<number | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleApply = (preset: SectionPreset) => {
    if (onApplyPreset) {
      onApplyPreset(preset);
    }
    setJustAppliedId(preset.id);
    setTimeout(() => {
      setJustAppliedId(null);
    }, 1800);
  };

  const getPresetPreviewStyle = (preset: SectionPreset): React.CSSProperties => {
    const bgType = preset.content?.bgType || "gradient";
    if (bgType === "solid") {
      return {
        backgroundColor: preset.content?.solidColor || "#0f172a",
      };
    }
    if (bgType === "gradient") {
      const angle = preset.content?.gradientAngle ?? 135;
      const from = preset.content?.gradientFrom || "#000000";
      const to = preset.content?.gradientTo || "#18181b";
      return {
        background: `linear-gradient(${angle}deg, ${from} 0%, ${to} 100%)`,
      };
    }
    if (bgType === "image") {
      const img =
        preset.content?.desktopImage ||
        "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800";
      const str = (preset.content?.overlayStrength ?? 75) / 100;
      return {
        backgroundImage: `linear-gradient(rgba(0,0,0,${str}), rgba(0,0,0,${str})), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return { backgroundColor: "#0f172a" };
  };

  const handleUpdate = (fields: Partial<HeroContent>) => {
    onChange({ ...content, ...fields });
  };

  const handleButtonChange = (idx: number, updates: Partial<HeroCTAButton>) => {
    const newButtons = [...(content.buttons || [])];
    newButtons[idx] = { ...newButtons[idx], ...updates };
    handleUpdate({ buttons: newButtons });
  };

  const getSectionDisplayName = (sec: EventSection) => {
    const secContent = sec.content;
    if (secContent?.title) return secContent.title;
    if (secContent?.heading) return secContent.heading;
    if (secContent?.venueName) return `Venue: ${secContent.venueName}`;
    const catalogItem = SECTION_CATALOG.find((c) => c.type === sec.type);
    if (catalogItem) return catalogItem.name;
    return sec.type.charAt(0).toUpperCase() + sec.type.slice(1);
  };

  const handleAddButton = () => {
    const defaultTarget = sections && sections.length > 0 ? sections[0].id : "hero";
    const defaultPreset = BUTTON_PRESETS[0];
    const newButtons: HeroCTAButton[] = [
      ...(content.buttons || []),
      {
        id: "btn_" + Date.now().toString(36),
        label: "New Button",
        targetType: "section",
        sectionTarget: defaultTarget,
        link: `#${defaultTarget}`,
        style: "primary" as const,
        presetStyle: defaultPreset.id,
        backgroundColor: defaultPreset.bg,
        hoverBackgroundColor: defaultPreset.hoverBg,
        textColor: defaultPreset.text,
        hoverTextColor: defaultPreset.hoverText,
        borderColor: defaultPreset.border,
        borderRadius: defaultPreset.radius,
      },
    ];
    handleUpdate({ buttons: newButtons });
  };

  const handleRemoveButton = (idx: number) => {
    const newButtons = (content.buttons || []).filter((_, i) => i !== idx);
    handleUpdate({ buttons: newButtons });
    if (activeTemplateBtnIdx === idx) {
      setActiveTemplateBtnIdx(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    const reader = new FileReader();
    reader.onload = () => {
      handleUpdate({
        desktopImage: reader.result as string,
        bgType: "image",
      });
    };
    reader.readAsDataURL(file);

    // Upload to PHP backend
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/upload-image.php", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          handleUpdate({
            desktopImage: data.url,
            bgType: "image",
          });
        }
      }
    } catch {
      // Local preview preserved
    } finally {
      setIsUploading(false);
    }
  };

  const solidColors = ["#0a0e17", "#0f172a", "#000000", "#064e3b", "#0a192f", "#ffffff"];
  const overlayColors = ["#000000", "#0f172a", "#064e3b", "#0a192f", "#ffffff"];
  const opacityPresets = [
    { label: "0% Off", value: 0 },
    { label: "30% Subtle", value: 30 },
    { label: "60% Medium", value: 60 },
    { label: "85% Dark", value: 85 },
  ];
  const gradientPresets = [
    { name: "Obsidian", from: "#000000", to: "#18181b", angle: 135 },
    { name: "Midnight", from: "#0a192f", to: "#020c1b", angle: 135 },
    { name: "Emerald", from: "#064e3b", to: "#022c22", angle: 135 },
    { name: "Sunset", from: "#7c2d12", to: "#18181b", angle: 135 },
  ];

  return (
    <div className="space-y-3 text-xs text-zinc-900 font-sans pb-10">
      {/* 1. QUICK TEMPLATES (Collapsible with Fixed Height 2-Column List and Expand Icon) */}
      {presets && presets.length > 0 && (
        <CollapsibleGroup
          title="Quick Templates"
          subtitle="1-Click styles & backgrounds"
          icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
          badge={`${presets.length} PRESETS`}
          defaultOpen={true}
          onExpand={() => setIsModalOpen(true)}
          expandTooltip="Open Big Screen 4-Column Template Gallery"
        >
          {/* Fixed height container showing first 6 with 2 columns, other scrollable */}
          <div className="max-h-[192px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-300">
            <div className="grid grid-cols-2 gap-1.5 font-sans">
              {presets.map((preset) => {
                const isApplied = justAppliedId === preset.id;
                const previewStyle = getPresetPreviewStyle(preset);
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApply(preset)}
                    className={`group relative text-left p-1.5 rounded-lg border transition cursor-pointer overflow-hidden flex flex-col justify-between h-[56px] ${
                      isApplied
                        ? "border-emerald-500 bg-emerald-50/60 ring-1 ring-emerald-500"
                        : "border-zinc-200/90 hover:border-black bg-white hover:bg-zinc-50 shadow-2xs"
                    }`}
                    title={`${preset.name}: ${preset.description}`}
                  >
                    {/* Mini background preview bar */}
                    <div
                      className="w-full h-3 rounded-xs shrink-0 border border-black/10 overflow-hidden relative"
                      style={previewStyle}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Preset Title & Badge */}
                    <div className="min-w-0 mt-1 flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-zinc-900 truncate block leading-tight">
                        {isApplied ? "Applied ✓" : (preset.chipLabel || preset.name.split(" ")[0])}
                      </span>
                      <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-zinc-100 text-zinc-600 border border-zinc-200/60 shrink-0">
                        {preset.badge ? preset.badge.split(" ")[0] : preset.category || "style"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fullscreen Modal trigger button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-2 py-1.5 px-2.5 rounded-lg border border-zinc-200 hover:border-zinc-900 bg-zinc-50 hover:bg-zinc-900 hover:text-white text-zinc-700 font-mono text-[10px] font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs group"
          >
            <Maximize2 className="w-3 h-3 text-zinc-400 group-hover:text-white" />
            <span>View All {presets.length} Templates (Big Screen)</span>
          </button>
        </CollapsibleGroup>
      )}

      {/* 2. HERO BACKGROUND (Collapsible: Color, Gradient, Upload Image, Overlay & Opacity) */}
      <CollapsibleGroup
        title="Hero Background"
        subtitle={
          (content.bgType || "image") === "gradient"
            ? `Gradient (${content.gradientAngle ?? 135}°)`
            : (content.bgType || "image") === "solid"
            ? `Color (${content.solidColor || "#0f172a"})`
            : `Image (${content.overlayStrength ?? 60}% overlay)`
        }
        icon={<ImageIcon className="w-3.5 h-3.5 text-indigo-500" />}
        badge={
          (content.bgType || "image") === "gradient"
            ? `${content.gradientAngle ?? 135}° GRADIENT`
            : (content.bgType || "image") === "solid"
            ? "SOLID COLOR"
            : `${content.overlayStrength ?? 60}% OVERLAY`
        }
        defaultOpen={true}
      >
        {/* 3 Main Mode Selectors */}
        <div className="grid grid-cols-3 gap-1 font-mono text-[11px]">
          {[
            { id: "solid", label: "Color" },
            { id: "gradient", label: "Gradient" },
            { id: "image", label: "Image" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handleUpdate({ bgType: t.id as any })}
              className={`py-2 rounded-xl border text-center font-bold capitalize transition cursor-pointer ${
                (content.bgType || "image") === t.id
                  ? "border-black bg-black text-white shadow-xs"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* OPTION A: SOLID COLOR */}
        {content.bgType === "solid" && (
          <div className="space-y-2.5 p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs">
            <span className="block text-[10px] text-zinc-500 font-mono uppercase font-semibold">
              Background Color
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white flex-1 shadow-2xs">
                <input
                  type="color"
                  value={content.solidColor || "#0f172a"}
                  onChange={(e) => handleUpdate({ solidColor: e.target.value })}
                  className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={content.solidColor || "#0f172a"}
                  onChange={(e) => handleUpdate({ solidColor: e.target.value })}
                  className="font-mono text-xs font-bold uppercase text-zinc-800 w-full bg-transparent outline-none"
                />
              </div>

              {/* Quick Swatches */}
              <div className="flex items-center gap-1.5 shrink-0">
                {solidColors.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => handleUpdate({ solidColor: hex })}
                    style={{ backgroundColor: hex }}
                    className={`w-6 h-6 rounded-full border transition cursor-pointer ${
                      (content.solidColor || "#0f172a").toLowerCase() === hex.toLowerCase()
                        ? "ring-2 ring-black scale-110 border-white shadow"
                        : "border-zinc-300 hover:scale-105"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OPTION B: GRADIENT */}
        {content.bgType === "gradient" && (
          <div className="space-y-3 p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs">
            {/* Live Gradient Preview Bar */}
            <div
              className="h-10 rounded-xl border border-zinc-300 shadow-inner flex items-center justify-center text-[11px] font-bold text-white font-mono"
              style={{
                background: `linear-gradient(${content.gradientAngle ?? 135}deg, ${
                  content.gradientFrom || "#0f172a"
                } 0%, ${content.gradientTo || "#1e293b"} 100%)`,
              }}
            >
              <span className="bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px]">
                {content.gradientAngle ?? 135}° Angle
              </span>
            </div>

            {/* Quick Gradient Templates */}
            <div>
              <span className="block text-[10px] font-mono uppercase text-zinc-500 font-semibold mb-1.5">
                Gradient Presets
              </span>
              <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
                {gradientPresets.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() =>
                      handleUpdate({
                        gradientFrom: p.from,
                        gradientTo: p.to,
                        gradientAngle: p.angle,
                      })
                    }
                    className="py-1.5 px-1 rounded-lg border border-zinc-200 bg-white hover:border-black font-bold text-center transition cursor-pointer shadow-2xs hover:shadow-xs"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* From & To Color Pickers */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
              <div>
                <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold">Start Color</span>
                <div className="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 bg-white">
                  <input
                    type="color"
                    value={content.gradientFrom || "#0f172a"}
                    onChange={(e) => handleUpdate({ gradientFrom: e.target.value })}
                    className="w-5 h-5 rounded border-0 cursor-pointer p-0 shrink-0"
                  />
                  <input
                    type="text"
                    value={content.gradientFrom || "#0f172a"}
                    onChange={(e) => handleUpdate({ gradientFrom: e.target.value })}
                    className="font-mono text-[10px] font-bold uppercase w-full bg-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold">End Color</span>
                <div className="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 bg-white">
                  <input
                    type="color"
                    value={content.gradientTo || "#1e293b"}
                    onChange={(e) => handleUpdate({ gradientTo: e.target.value })}
                    className="w-5 h-5 rounded border-0 cursor-pointer p-0 shrink-0"
                  />
                  <input
                    type="text"
                    value={content.gradientTo || "#1e293b"}
                    onChange={(e) => handleUpdate({ gradientTo: e.target.value })}
                    className="font-mono text-[10px] font-bold uppercase w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Angle Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-600 font-medium">Gradient Angle:</span>
                <span className="font-bold text-zinc-900 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-200">
                  {content.gradientAngle ?? 135}°
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={content.gradientAngle ?? 135}
                onChange={(e) => handleUpdate({ gradientAngle: Number(e.target.value) })}
                className="w-full accent-black cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* OPTION C: UPLOAD IMAGE WITH OVERLAY & OPACITY */}
        {content.bgType === "image" && (
          <div className="space-y-3 p-3 rounded-xl border border-zinc-200 bg-white shadow-2xs">
            {/* Upload Button or Current Image Display */}
            {content.desktopImage ? (
              <div className="flex items-center justify-between p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 gap-2.5">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={content.desktopImage}
                    alt="Hero Background"
                    className="h-11 w-16 object-cover rounded-lg border border-zinc-200 shrink-0 shadow-2xs"
                  />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-zinc-800 truncate font-mono">Current Image</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-[10px] text-black font-bold underline hover:text-zinc-600 cursor-pointer block mt-0.5"
                    >
                      {isUploading ? "Uploading..." : "Replace Image"}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleUpdate({ desktopImage: "" })}
                  className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer shrink-0"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3.5 px-3 border border-dashed border-zinc-300 hover:border-black rounded-xl text-center bg-zinc-50 hover:bg-white transition cursor-pointer flex items-center justify-center gap-2 font-mono text-[11px] font-bold"
              >
                <Upload className="w-4 h-4 text-zinc-600" />
                <span>{isUploading ? "Uploading Image..." : "Upload Background Image"}</span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Direct URL input */}
            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold">
                Or Image URL
              </span>
              <input
                type="text"
                value={content.desktopImage || ""}
                onChange={(e) => handleUpdate({ desktopImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-2.5 py-1.5 rounded-xl border border-zinc-200 text-[11px] font-mono bg-white focus:outline-none focus:border-black"
              />
            </div>

            {/* OVERLAY COLOR & OPACITY OPTION */}
            <div className="pt-2.5 border-t border-zinc-100 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-700 font-bold">
                  Image Overlay Color
                </span>
              </div>

              {/* Overlay Color Picker + Swatches */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 bg-white flex-1 shadow-2xs">
                  <input
                    type="color"
                    value={content.overlayColor || "#000000"}
                    onChange={(e) => handleUpdate({ overlayColor: e.target.value, overlay: "custom" })}
                    className="w-6 h-6 rounded border-0 cursor-pointer p-0 shrink-0"
                  />
                  <input
                    type="text"
                    value={content.overlayColor || "#000000"}
                    onChange={(e) => handleUpdate({ overlayColor: e.target.value, overlay: "custom" })}
                    className="font-mono text-[10px] font-bold uppercase text-zinc-800 w-full bg-transparent outline-none"
                  />
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {overlayColors.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => handleUpdate({ overlayColor: hex, overlay: "custom" })}
                      style={{ backgroundColor: hex }}
                      className={`w-5 h-5 rounded-full border transition cursor-pointer ${
                        (content.overlayColor || "#000000").toLowerCase() === hex.toLowerCase()
                          ? "ring-2 ring-black scale-110 border-white shadow"
                          : "border-zinc-300 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Overlay Opacity Controls */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-600 font-semibold">Overlay Opacity:</span>
                  <span className="font-bold text-zinc-900 bg-zinc-50 px-2 py-0.5 rounded-md border border-zinc-200 font-mono text-[11px] shadow-2xs">
                    {content.overlayStrength ?? 60}%
                  </span>
                </div>

                {/* Opacity Slider */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={content.overlayStrength ?? 60}
                  onChange={(e) => handleUpdate({ overlayStrength: Number(e.target.value) })}
                  className="w-full accent-black cursor-pointer"
                />

                {/* Quick Opacity Preset Chips */}
                <div className="grid grid-cols-4 gap-1 pt-1 font-mono text-[10px]">
                  {opacityPresets.map((op) => (
                    <button
                      key={op.value}
                      type="button"
                      onClick={() => handleUpdate({ overlayStrength: op.value })}
                      className={`py-1 rounded-md border text-center transition cursor-pointer ${
                        (content.overlayStrength ?? 60) === op.value
                          ? "bg-black text-white border-black font-bold"
                          : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CollapsibleGroup>

      {/* 3. HEADLINE & MESSAGING (Collapsible) */}
      <CollapsibleGroup
        title="Headline & Text"
        subtitle={
          content.heading
            ? content.heading.slice(0, 30) + (content.heading.length > 30 ? "..." : "")
            : "Event titles & copy"
        }
        icon={<Type className="w-3.5 h-3.5 text-blue-500" />}
        badge={content.heading ? "CUSTOMIZED" : "DEFAULT"}
        defaultOpen={false}
      >
        {/* Badge */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Announcement Badge
          </span>
          <input
            type="text"
            value={content.badgeText || ""}
            onChange={(e) => handleUpdate({ badgeText: e.target.value })}
            placeholder="e.g. SINGAPORE • DECEMBER 5–7, 2026"
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-medium text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        {/* Main Heading */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Main Heading <span className="text-black font-bold">*</span>
          </span>
          <AutoResizeTextarea
            minRows={2}
            value={content.heading}
            onChange={(e) => handleUpdate({ heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        {/* Subtitle */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Subtitle
          </span>
          <input
            type="text"
            value={content.subtitle || ""}
            onChange={(e) => handleUpdate({ subtitle: e.target.value })}
            placeholder="Short event hook or tagline"
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        {/* Detailed Description */}
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Paragraph Description
          </span>
          <AutoResizeTextarea
            minRows={3}
            value={content.description || ""}
            onChange={(e) => handleUpdate({ description: e.target.value })}
            placeholder="Detailed description of your summit, speakers, or theme"
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs leading-relaxed bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>

      {/* 4. LAYOUT & ALIGNMENT (Collapsible) */}
      <CollapsibleGroup
        title="Layout & Alignment"
        subtitle={`${content.contentAlignment || "center"} • ${content.contentWidth || "medium"} width`}
        icon={<Sliders className="w-3.5 h-3.5 text-emerald-500" />}
        badge={`${(content.contentAlignment || "center").toUpperCase()} • ${(content.contentWidth || "medium").toUpperCase()}`}
        defaultOpen={false}
      >
        <div className="grid grid-cols-2 gap-2">
          {/* Text Alignment */}
          <div>
            <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold">Alignment</span>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: "left", label: "Left", icon: AlignLeft },
                { id: "center", label: "Center", icon: AlignCenter },
                { id: "right", label: "Right", icon: AlignRight },
              ].map((al) => {
                const Icon = al.icon;
                const isSelected = (content.contentAlignment || "center") === al.id;
                return (
                  <button
                    key={al.id}
                    type="button"
                    onClick={() => handleUpdate({ contentAlignment: al.id as any })}
                    className={`py-1.5 rounded-lg border text-center flex items-center justify-center transition cursor-pointer ${
                      isSelected
                        ? "border-black bg-black text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    }`}
                    title={al.label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Width */}
          <div>
            <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold">Width</span>
            <div className="grid grid-cols-3 gap-1 font-mono text-[10px]">
              {[
                { id: "small", label: "Tight" },
                { id: "medium", label: "Normal" },
                { id: "large", label: "Wide" },
              ].map((w) => {
                const isSelected = (content.contentWidth || "medium") === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => handleUpdate({ contentWidth: w.id as any })}
                    className={`py-1.5 rounded-lg border text-center transition cursor-pointer ${
                      isSelected
                        ? "border-black bg-black text-white font-bold"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {w.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </CollapsibleGroup>

      {/* 5. ACTION BUTTONS (Collapsible) */}
      <CollapsibleGroup
        title="Action Buttons"
        subtitle={`${(content.buttons || []).length} CTA button${(content.buttons || []).length === 1 ? "" : "s"}`}
        icon={<MousePointerClick className="w-3.5 h-3.5 text-rose-500" />}
        badge={`${(content.buttons || []).length} BUTTONS`}
        defaultOpen={false}
        headerAction={
          <button
            type="button"
            onClick={handleAddButton}
            className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
            title="Add CTA Button"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        }
      >
        <div className="space-y-2">
          {(!content.buttons || content.buttons.length === 0) && (
            <div className="text-center py-4 text-zinc-400 text-xs font-mono">
              No action buttons added yet. Click &quot;Add&quot; to create one.
            </div>
          )}

          {content.buttons?.map((btn, idx) => {
            const isTemplateOpen = activeTemplateBtnIdx === idx;
            const currentPreset = BUTTON_PRESETS.find((p) => p.id === btn.presetStyle);
            const isExternal = btn.targetType === "external";

            return (
              <div
                key={btn.id || idx}
                className="p-3 bg-white rounded-xl border border-zinc-200 space-y-2.5 shadow-2xs"
              >
                {/* Header: Button # and Template Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-[11px] text-zinc-900 font-mono">
                      Button #{idx + 1}
                    </span>
                    {currentPreset && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 truncate">
                        {currentPreset.name}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTemplateBtnIdx(isTemplateOpen ? null : idx)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-mono font-bold transition cursor-pointer ${
                        isTemplateOpen
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200"
                      }`}
                      title="Choose button style template"
                    >
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      <span>{isTemplateOpen ? "Close" : "Template"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveButton(idx)}
                      className="text-zinc-400 hover:text-rose-600 p-1 transition cursor-pointer rounded hover:bg-rose-50"
                      title="Delete button"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Inline Button Template Selector */}
                {isTemplateOpen && (
                  <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2 animate-in fade-in-50 duration-150">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-zinc-500">
                        Button Style Templates ({BUTTON_PRESETS.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTemplateBtnIdx(null)}
                        className="text-zinc-400 hover:text-black p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-0.5">
                      {BUTTON_PRESETS.map((p) => {
                        const isSelected = btn.presetStyle === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              handleButtonChange(idx, {
                                presetStyle: p.id,
                                backgroundColor: p.bg,
                                hoverBackgroundColor: p.hoverBg,
                                textColor: p.text,
                                hoverTextColor: p.hoverText,
                                borderColor: p.border,
                                borderRadius: p.radius,
                                style: "primary",
                              });
                              setActiveTemplateBtnIdx(null);
                            }}
                            className={`p-1.5 rounded-lg border text-left transition cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? "border-black bg-white ring-1 ring-black shadow-xs"
                                : "border-zinc-200 bg-white hover:border-zinc-300"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold text-zinc-900 truncate">
                                {p.name}
                              </span>
                              {isSelected && <Check className="w-3 h-3 text-black shrink-0" />}
                            </div>
                            <div className="w-full py-1 px-1.5 flex items-center justify-center bg-zinc-900 rounded">
                              <span
                                style={{
                                  background: p.bg,
                                  color: p.text,
                                  borderRadius: p.radius,
                                  border: `1px solid ${p.border}`,
                                }}
                                className="px-2 py-0.5 text-[9px] font-bold truncate max-w-full"
                              >
                                {btn.label || "Button"}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Mini Live Preview */}
                <div className="w-full py-2 px-3 flex items-center justify-center bg-zinc-950 rounded-lg">
                  <span
                    style={{
                      background: btn.backgroundColor || (btn.style === "outline" ? "transparent" : "#ffffff"),
                      color: btn.textColor || (btn.style === "outline" ? "#ffffff" : "#09090b"),
                      borderRadius: btn.borderRadius || "9999px",
                      border: btn.borderColor
                        ? `1px solid ${btn.borderColor}`
                        : btn.style === "outline"
                        ? "1px solid rgba(255,255,255,0.4)"
                        : "1px solid transparent",
                    }}
                    className="px-4 py-1 text-xs font-bold truncate max-w-full"
                  >
                    {btn.label || "Button Label"}
                  </span>
                </div>

                {/* Button Label */}
                <div>
                  <span className="block text-[10px] font-mono text-zinc-500 mb-1 font-semibold">
                    Button Label
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Register on Microsoft Teams"
                    value={btn.label}
                    onChange={(e) => handleButtonChange(idx, { label: e.target.value })}
                    className="w-full px-2.5 py-1.5 text-xs font-bold border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-black"
                  />
                </div>

                {/* Destination: Section Dropdown vs External Link */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                      Destination Target
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[10px]">
                      <button
                        type="button"
                        onClick={() =>
                          handleButtonChange(idx, {
                            targetType: "section",
                            sectionTarget: btn.sectionTarget || (sections && sections.length > 0 ? sections[0].id : "hero"),
                            link: `#${btn.sectionTarget || (sections && sections.length > 0 ? sections[0].id : "hero")}`,
                            openNewTab: false,
                          })
                        }
                        className={`px-2 py-0.5 rounded border transition cursor-pointer ${
                          !isExternal
                            ? "bg-black text-white border-black font-bold"
                            : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        Section Target
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleButtonChange(idx, {
                            targetType: "external",
                            link: btn.link && !btn.link.startsWith("#") ? btn.link : "https://",
                            openNewTab: true,
                          })
                        }
                        className={`px-2 py-0.5 rounded border transition cursor-pointer ${
                          isExternal
                            ? "bg-black text-white border-black font-bold"
                            : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        External Link
                      </button>
                    </div>
                  </div>

                  {isExternal ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 px-2.5 py-1.5 border border-zinc-200 rounded-lg bg-white">
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <input
                          type="url"
                          value={btn.link}
                          onChange={(e) => handleButtonChange(idx, { link: e.target.value })}
                          placeholder="https://teams.microsoft.com/..."
                          className="w-full text-xs font-mono outline-none bg-transparent"
                        />
                      </div>
                      <label className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-600 cursor-pointer pt-0.5">
                        <input
                          type="checkbox"
                          checked={btn.openNewTab !== false}
                          onChange={(e) => handleButtonChange(idx, { openNewTab: e.target.checked })}
                          className="w-3.5 h-3.5 rounded border-zinc-300 accent-black cursor-pointer"
                        />
                        <span>Open link in new tab</span>
                      </label>
                    </div>
                  ) : (
                    <select
                      value={btn.sectionTarget || (btn.link ? btn.link.replace(/^#/, "") : "hero")}
                      onChange={(e) =>
                        handleButtonChange(idx, {
                          targetType: "section",
                          sectionTarget: e.target.value,
                          link: `#${e.target.value}`,
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-semibold border border-zinc-200 rounded-lg bg-white outline-none cursor-pointer text-zinc-800 focus:border-black"
                    >
                      <option value="hero">Hero Banner (Top of page)</option>
                      {sections?.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          {getSectionDisplayName(sec)}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Corner Radius Controls */}
                <div className="pt-1 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400">Corners</span>
                  <div className="flex items-center gap-1 font-mono text-[9px]">
                    {[
                      { label: "Pill", radius: "9999px" },
                      { label: "Smooth", radius: "12px" },
                      { label: "Subtle", radius: "6px" },
                      { label: "Sharp", radius: "0px" },
                    ].map((r) => (
                      <button
                        key={r.label}
                        type="button"
                        onClick={() => handleButtonChange(idx, { borderRadius: r.radius })}
                        className={`px-2 py-0.5 rounded border transition cursor-pointer ${
                          (btn.borderRadius || "9999px") === r.radius
                            ? "bg-black text-white border-black font-bold"
                            : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleGroup>

      {/* FULLSCREEN / BIG SCREEN MODAL POPUP FOR ALL TEMPLATES (4 Columns with Multiple Rows) */}
      {isModalOpen &&
        presets &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
            {/* Backdrop Click */}
            <div
              className="absolute inset-0"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Dialog Container */}
            <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col max-h-[88vh] overflow-hidden z-10 animate-in zoom-in-95 duration-150 text-zinc-900">
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-zinc-200 bg-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-zinc-900 tracking-tight flex items-center gap-2">
                      Hero Section Style & Template Gallery
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
                        {presets.length} PRESETS
                      </span>
                    </h3>
                    <p className="text-[11px] text-zinc-500 font-sans">
                      Choose from gradient angles, solid colors, and photography overlays. Your headings, text, and buttons stay 100% intact.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-lg border border-zinc-200 hover:border-zinc-400 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-600 hover:text-black transition cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Subheader with Search and Category Filter Pills */}
              <div className="px-5 py-2.5 border-b border-zinc-100 bg-zinc-50/70 flex flex-wrap items-center justify-between gap-3">
                {/* Category Filter Pills */}
                <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                  {[
                    { id: "all", label: `All (${presets.length})` },
                    {
                      id: "gradient",
                      label: `Gradients (${presets.filter((p) => p.category === "gradient").length})`,
                    },
                    {
                      id: "solid",
                      label: `Solid Colors (${presets.filter((p) => p.category === "solid").length})`,
                    },
                    {
                      id: "image",
                      label: `Image Backgrounds (${presets.filter((p) => p.category === "image").length})`,
                    },
                    {
                      id: "layout",
                      label: `Layouts (${presets.filter((p) => p.category === "layout").length})`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setModalCategory(tab.id)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer text-center ${
                        modalCategory === tab.id
                          ? "bg-black text-white font-bold shadow-2xs"
                          : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    className="w-full pl-8 pr-7 py-1 text-xs border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-black font-sans"
                  />
                  {modalSearch && (
                    <button
                      type="button"
                      onClick={() => setModalSearch("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Modal Body: 4-Column Grid with Multiple Rows (Scrollable) */}
              <div className="p-5 overflow-y-auto max-h-[calc(88vh-145px)] scrollbar-thin scrollbar-thumb-zinc-300 bg-zinc-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
                  {(presets || [])
                    .filter((preset) => {
                      const matchesCat =
                        modalCategory === "all" ||
                        (modalCategory === "gradient" && preset.category === "gradient") ||
                        (modalCategory === "solid" && preset.category === "solid") ||
                        (modalCategory === "image" && preset.category === "image") ||
                        (modalCategory === "layout" && preset.category === "layout");

                      const matchesSearch =
                        !modalSearch.trim() ||
                        preset.name.toLowerCase().includes(modalSearch.toLowerCase()) ||
                        preset.description.toLowerCase().includes(modalSearch.toLowerCase()) ||
                        (preset.badge && preset.badge.toLowerCase().includes(modalSearch.toLowerCase())) ||
                        (preset.chipLabel && preset.chipLabel.toLowerCase().includes(modalSearch.toLowerCase()));

                      return matchesCat && matchesSearch;
                    })
                    .map((preset) => {
                      const isApplied = justAppliedId === preset.id;
                      const previewStyle = getPresetPreviewStyle(preset);
                      const align = preset.content?.contentAlignment || "center";

                      return (
                        <div
                          key={preset.id}
                          onClick={() => handleApply(preset)}
                          className={`group relative rounded-xl border bg-white overflow-hidden transition-all duration-150 cursor-pointer flex flex-col justify-between hover:shadow-md ${
                            isApplied
                              ? "border-emerald-500 ring-2 ring-emerald-500/30"
                              : "border-zinc-200/90 hover:border-black"
                          }`}
                        >
                          {/* Visual Banner Simulation (h-24) */}
                          <div
                            className="w-full h-24 relative overflow-hidden flex flex-col justify-between p-2.5 select-none"
                            style={previewStyle}
                          >
                            {/* Top tag */}
                            <div className="flex items-center justify-between gap-1 z-10">
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/65 text-white backdrop-blur-xs border border-white/10 uppercase">
                                {preset.badge || preset.category}
                              </span>
                              {isApplied && (
                                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500 text-white flex items-center gap-1 shadow-xs">
                                  <Check className="w-2.5 h-2.5" /> Applied
                                </span>
                              )}
                            </div>

                            {/* Simulated Hero Text Mockup inside preview */}
                            <div
                              className={`z-10 flex flex-col gap-1 ${
                                align === "left"
                                ? "items-start text-left"
                                : align === "right"
                                ? "items-end text-right"
                                : "items-center text-center"
                              }`}
                            >
                              <div className="w-14 h-1 rounded-full bg-white/40" />
                              <div className="w-20 h-1.5 rounded-full bg-white/80" />
                              <div className="flex items-center gap-1 mt-0.5">
                                <div className="w-6 h-2 rounded-xs bg-emerald-400/80" />
                                <div className="w-6 h-2 rounded-xs bg-white/30" />
                              </div>
                            </div>

                            {/* Hover Overlay sheen */}
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                          </div>

                          {/* Card Content Footer */}
                          <div className="p-3 border-t border-zinc-100 flex flex-col justify-between flex-1 gap-2">
                            <div>
                              <h4 className="text-xs font-bold text-zinc-900 group-hover:text-black line-clamp-1">
                                {preset.name}
                              </h4>
                              <p className="text-[10px] text-zinc-500 font-sans line-clamp-2 mt-0.5 leading-relaxed">
                                {preset.description}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-1 text-[10px] font-mono">
                              <span className="text-zinc-400 capitalize">
                                {align} • {preset.content?.contentWidth || "normal"}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-md font-semibold transition ${
                                  isApplied
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-zinc-100 group-hover:bg-black group-hover:text-white text-zinc-700"
                                }`}
                              >
                                {isApplied ? "Applied ✓" : "Apply →"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-zinc-200 bg-white flex items-center justify-between text-xs">
                <span className="text-zinc-500 text-[11px] font-mono hidden sm:inline">
                  💡 Presets preserve your heading, description, & button links.
                </span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-auto px-4 py-1.5 rounded-lg bg-black text-white hover:bg-zinc-800 font-semibold text-xs transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
