import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Layout,
  Pin,
  Palette,
  ImageIcon,
  Upload,
  MousePointerClick,
  Check,
  Trash2,
  ExternalLink,
  Sparkles,
  X,
  Search,
} from "lucide-react";
import type {
  EventDocument,
  EventHeader,
} from "../../../types/event";
import { BUTTON_PRESETS } from "../../../registry/buttonPresets";
import { SECTION_CATALOG } from "../../../registry/sectionCatalog";
import { CollapsibleGroup } from "./CollapsibleGroup";

export { BUTTON_PRESETS };

/* ──────────────────────────────────────────────────────────
   HEADER STYLE PRESETS
   Each preset applies: backgroundType, backgroundColor,
   gradient, backgroundOpacity, textColor, hoverTextColor,
   layoutStyle, fullWidth, position, and ctaButton style.
   User's logo, nav links and CTA label/link are preserved.
────────────────────────────────────────────────────────── */
export interface HeaderPreset {
  id: string;
  name: string;
  chipLabel?: string;
  badge: string;
  description: string;
  category: "dark" | "glass" | "light" | "gradient" | "solid";
  preview: {
    bgStyle: React.CSSProperties;
    textColor: string;
    accentColor: string;
  };
  apply: Partial<EventHeader> & {
    ctaPresetId?: string;
  };
}

export const HEADER_PRESETS: HeaderPreset[] = [
  // ── DARK / SOLID DARK ──────────────────────────────────
  {
    id: "hdr_obsidian_dark",
    name: "Obsidian Dark",
    chipLabel: "Obsidian",
    badge: "Solid Dark",
    category: "dark",
    description: "Solid pitch-black header with zinc-100 nav text and sleek-pill white CTA.",
    preview: {
      bgStyle: { backgroundColor: "#09090b" },
      textColor: "#e4e4e7",
      accentColor: "#ffffff",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#09090b",
      backgroundOpacity: 100,
      textColor: "#e4e4e7",
      hoverTextColor: "#ffffff",
      ctaPresetId: "sleek-pill",
    },
  },
  {
    id: "hdr_midnight_navy",
    name: "Midnight Navy",
    chipLabel: "Navy",
    badge: "Solid Navy",
    category: "dark",
    description: "Deep sovereign midnight navy (#0a192f) — perfect for institutional events.",
    preview: {
      bgStyle: { backgroundColor: "#0a192f" },
      textColor: "#cbd5e1",
      accentColor: "#38bdf8",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#0a192f",
      backgroundOpacity: 100,
      textColor: "#cbd5e1",
      hoverTextColor: "#ffffff",
      ctaPresetId: "aurora-cyan",
    },
  },
  {
    id: "hdr_slate_900",
    name: "Deep Slate",
    chipLabel: "Slate",
    badge: "Solid Slate",
    category: "dark",
    description: "Tailwind slate-900 (#0f172a) muted dark with zinc-300 nav links.",
    preview: {
      bgStyle: { backgroundColor: "#0f172a" },
      textColor: "#d1d5db",
      accentColor: "#e4e4e7",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#0f172a",
      backgroundOpacity: 100,
      textColor: "#d1d5db",
      hoverTextColor: "#ffffff",
      ctaPresetId: "obsidian-luxe",
    },
  },
  {
    id: "hdr_charcoal_zinc",
    name: "Charcoal Zinc",
    chipLabel: "Charcoal",
    badge: "Solid Zinc",
    category: "dark",
    description: "Matte zinc-900 charcoal (#18181b) with flat zinc-200 nav links.",
    preview: {
      bgStyle: { backgroundColor: "#18181b" },
      textColor: "#e4e4e7",
      accentColor: "#a1a1aa",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#18181b",
      backgroundOpacity: 100,
      textColor: "#e4e4e7",
      hoverTextColor: "#ffffff",
      ctaPresetId: "cyber-zinc",
    },
  },
  {
    id: "hdr_forest_pine",
    name: "Deep Pine Green",
    chipLabel: "Pine Green",
    badge: "Solid Pine",
    category: "dark",
    description: "Institutional deep pine (#052e16) for climate & sustainability events.",
    preview: {
      bgStyle: { backgroundColor: "#052e16" },
      textColor: "#d1fae5",
      accentColor: "#34d399",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#052e16",
      backgroundOpacity: 100,
      textColor: "#d1fae5",
      hoverTextColor: "#ffffff",
      ctaPresetId: "neon-wire",
    },
  },

  // ── GRADIENT BACKGROUNDS ───────────────────────────────
  {
    id: "hdr_gradient_obsidian",
    name: "Obsidian Gradient",
    chipLabel: "Obsidian ∇",
    badge: "135° Dark",
    category: "gradient",
    description: "135° coal black to deep zinc gradient — ultra-premium dark header.",
    preview: {
      bgStyle: { background: "linear-gradient(135deg, #000000 0%, #18181b 100%)" },
      textColor: "#e4e4e7",
      accentColor: "#ffffff",
    },
    apply: {
      backgroundType: "gradient",
      gradient: {
        angle: 135,
        stops: [
          { color: "#000000", opacity: 95 },
          { color: "#18181b", opacity: 88 },
        ],
      },
      backgroundOpacity: 100,
      textColor: "#e4e4e7",
      hoverTextColor: "#ffffff",
      ctaPresetId: "sleek-pill",
    },
  },
  {
    id: "hdr_gradient_midnight",
    name: "Midnight Blue Gradient",
    chipLabel: "Midnight ∇",
    badge: "135° Navy",
    category: "gradient",
    description: "135° executive midnight navy gradient — deep blue corporate header.",
    preview: {
      bgStyle: { background: "linear-gradient(135deg, #0a192f 0%, #020c1b 100%)" },
      textColor: "#93c5fd",
      accentColor: "#3b82f6",
    },
    apply: {
      backgroundType: "gradient",
      gradient: {
        angle: 135,
        stops: [
          { color: "#0a192f", opacity: 95 },
          { color: "#020c1b", opacity: 85 },
        ],
      },
      backgroundOpacity: 100,
      textColor: "#93c5fd",
      hoverTextColor: "#ffffff",
      ctaPresetId: "aurora-cyan",
    },
  },
  {
    id: "hdr_gradient_emerald",
    name: "Emerald Canopy Gradient",
    chipLabel: "Emerald ∇",
    badge: "135° Emerald",
    category: "gradient",
    description: "135° forest emerald gradient for carbon markets and climate events.",
    preview: {
      bgStyle: { background: "linear-gradient(135deg, #064e3b 0%, #022c22 100%)" },
      textColor: "#6ee7b7",
      accentColor: "#34d399",
    },
    apply: {
      backgroundType: "gradient",
      gradient: {
        angle: 135,
        stops: [
          { color: "#064e3b", opacity: 95 },
          { color: "#022c22", opacity: 85 },
        ],
      },
      backgroundOpacity: 100,
      textColor: "#6ee7b7",
      hoverTextColor: "#ffffff",
      ctaPresetId: "neon-wire",
    },
  },
  {
    id: "hdr_gradient_sunset",
    name: "Sunset Ember Gradient",
    chipLabel: "Sunset ∇",
    badge: "135° Amber",
    category: "gradient",
    description: "135° warm sunset ember gradient from crimson to charcoal.",
    preview: {
      bgStyle: { background: "linear-gradient(135deg, #7c2d12 0%, #18181b 100%)" },
      textColor: "#fed7aa",
      accentColor: "#f97316",
    },
    apply: {
      backgroundType: "gradient",
      gradient: {
        angle: 135,
        stops: [
          { color: "#7c2d12", opacity: 90 },
          { color: "#18181b", opacity: 90 },
        ],
      },
      backgroundOpacity: 100,
      textColor: "#fed7aa",
      hoverTextColor: "#ffffff",
      ctaPresetId: "solar-amber",
    },
  },
  {
    id: "hdr_gradient_sapphire",
    name: "Royal Sapphire",
    chipLabel: "Sapphire ∇",
    badge: "90° Sapphire",
    category: "gradient",
    description: "90° horizontal royal sapphire blending to deep abyss — sovereign diplomacy.",
    preview: {
      bgStyle: { background: "linear-gradient(90deg, #0f174a 0%, #030712 100%)" },
      textColor: "#bfdbfe",
      accentColor: "#60a5fa",
    },
    apply: {
      backgroundType: "gradient",
      gradient: {
        angle: 90,
        stops: [
          { color: "#0f174a", opacity: 95 },
          { color: "#030712", opacity: 95 },
        ],
      },
      backgroundOpacity: 100,
      textColor: "#bfdbfe",
      hoverTextColor: "#ffffff",
      ctaPresetId: "aurora-cyan",
    },
  },

  // ── GLASS / BLUR EFFECTS ───────────────────────────────
  {
    id: "hdr_glass_dark",
    name: "Dark Glass (Frosted)",
    chipLabel: "Dark Glass",
    badge: "Glass Dark",
    category: "glass",
    description: "80% opaque charcoal with blur — modern glassmorphism dark header.",
    preview: {
      bgStyle: {
        background: "rgba(9, 9, 11, 0.80)",
        backdropFilter: "blur(20px)",
      },
      textColor: "#e4e4e7",
      accentColor: "#ffffff",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#09090b",
      backgroundOpacity: 80,
      textColor: "#e4e4e7",
      hoverTextColor: "#ffffff",
      ctaPresetId: "frosted-glass",
    },
  },
  {
    id: "hdr_glass_midnight",
    name: "Midnight Glass",
    chipLabel: "Navy Glass",
    badge: "Glass Navy",
    category: "glass",
    description: "75% midnight navy (#0a192f) frosted glass with cyan CTA.",
    preview: {
      bgStyle: {
        background: "rgba(10, 25, 47, 0.75)",
        backdropFilter: "blur(24px)",
      },
      textColor: "#93c5fd",
      accentColor: "#38bdf8",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#0a192f",
      backgroundOpacity: 75,
      textColor: "#93c5fd",
      hoverTextColor: "#ffffff",
      ctaPresetId: "frosted-glass",
    },
  },
  {
    id: "hdr_glass_emerald",
    name: "Emerald Glass",
    chipLabel: "Emerald Glass",
    badge: "Glass Pine",
    category: "glass",
    description: "70% deep pine glass effect with neon-wire green CTA for sustainability events.",
    preview: {
      bgStyle: {
        background: "rgba(5, 46, 22, 0.70)",
        backdropFilter: "blur(20px)",
      },
      textColor: "#6ee7b7",
      accentColor: "#34d399",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#052e16",
      backgroundOpacity: 70,
      textColor: "#6ee7b7",
      hoverTextColor: "#ffffff",
      ctaPresetId: "frosted-glass",
    },
  },
  {
    id: "hdr_glass_transparent",
    name: "Transparent Glass",
    chipLabel: "Ghost Glass",
    badge: "Transparent",
    category: "glass",
    description: "Fully transparent header — sits naturally over hero backgrounds.",
    preview: {
      bgStyle: {
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.1)",
      },
      textColor: "#ffffff",
      accentColor: "#a1a1aa",
    },
    apply: {
      backgroundType: "transparent",
      background: "transparent",
      backgroundOpacity: 0,
      textColor: "#ffffff",
      hoverTextColor: "#e4e4e7",
      ctaPresetId: "frosted-glass",
    },
  },

  // ── LIGHT / CLEAN ──────────────────────────────────────
  {
    id: "hdr_white_clean",
    name: "Clean White",
    chipLabel: "White",
    badge: "Light White",
    category: "light",
    description: "Pure white clean header — perfect for professional/corporate event pages.",
    preview: {
      bgStyle: { backgroundColor: "#ffffff", borderBottom: "1px solid #e4e4e7" },
      textColor: "#18181b",
      accentColor: "#09090b",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#ffffff",
      backgroundOpacity: 100,
      textColor: "#18181b",
      hoverTextColor: "#09090b",
      ctaPresetId: "obsidian-luxe",
    },
  },
  {
    id: "hdr_zinc_50",
    name: "Zinc Off-White",
    chipLabel: "Zinc Light",
    badge: "Light Zinc",
    category: "light",
    description: "Warm zinc-50 (#fafafa) off-white header with subtle dark nav links.",
    preview: {
      bgStyle: { backgroundColor: "#fafafa", borderBottom: "1px solid #e4e4e7" },
      textColor: "#27272a",
      accentColor: "#09090b",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#fafafa",
      backgroundOpacity: 100,
      textColor: "#27272a",
      hoverTextColor: "#09090b",
      ctaPresetId: "brutalist-3d",
    },
  },
  {
    id: "hdr_editorial_white",
    name: "Editorial Luxury White",
    chipLabel: "Editorial",
    badge: "Editorial",
    category: "light",
    description: "Clean premium white with luxury outline CTA and editorial-style left-aligned layout.",
    preview: {
      bgStyle: { backgroundColor: "#ffffff" },
      textColor: "#09090b",
      accentColor: "#18181b",
    },
    apply: {
      backgroundType: "solid",
      backgroundColor: "#ffffff",
      backgroundOpacity: 100,
      textColor: "#09090b",
      hoverTextColor: "#000000",
      layoutStyle: "left-nav-right",
      ctaPresetId: "luxury-outline",
    },
  },
];


interface HeaderEditorProps {
  event: EventDocument;
  onChangeHeader: (header: EventHeader) => void;
}



const GRADIENT_PRESETS = [
  {
    name: "Obsidian",
    angle: 135,
    stops: [
      { color: "#000000", opacity: 95 },
      { color: "#18181b", opacity: 85 },
    ],
  },
  {
    name: "Midnight",
    angle: 135,
    stops: [
      { color: "#0a192f", opacity: 95 },
      { color: "#020c1b", opacity: 85 },
    ],
  },
  {
    name: "Emerald",
    angle: 135,
    stops: [
      { color: "#064e3b", opacity: 95 },
      { color: "#022c22", opacity: 85 },
    ],
  },
  {
    name: "Sunset",
    angle: 135,
    stops: [
      { color: "#7c2d12", opacity: 90 },
      { color: "#18181b", opacity: 90 },
    ],
  },
];

export const HeaderEditor: React.FC<HeaderEditorProps> = ({
  event,
  onChangeHeader,
}) => {
  const header = event.header;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Quick Template modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string>("all");
  const [modalSearch, setModalSearch] = useState("");
  const [justAppliedId, setJustAppliedId] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    if (!isModalOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isModalOpen]);

  // Defaults
  const layoutStyle = header.layoutStyle || "left-nav-right";
  const isFullWidth = header.fullWidth !== false;
  const isFixed = header.position === "fixed" || header.position === "floating";

  const bgType = header.backgroundType || (header.background === "transparent" ? "transparent" : "solid");
  const bgColor = header.backgroundColor || "#000000";
  const bgOpacity = header.backgroundOpacity ?? 100;
  const gradient = header.gradient || {
    angle: 135,
    stops: [
      { color: "#000000", opacity: 90 },
      { color: "#18181b", opacity: 80 },
    ],
  };

  const navTextColor = header.textColor || "#e4e4e7";
  const navHoverColor = header.hoverTextColor || "#ffffff";

  // CTA button
  const cta = header.ctaButton || {
    visible: true,
    label: "Register Now",
    link: "#registration",
    targetType: "section",
    openNewTab: false,
    presetStyle: "sleek-pill",
    backgroundColor: "#ffffff",
    hoverBackgroundColor: "#09090b",
    textColor: "#09090b",
    hoverTextColor: "#ffffff",
    borderRadius: "9999px",
  };

  const hexToRgba = (hex: string, opacity: number) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3) {
      clean = clean.split("").map((c) => c + c).join("");
    }
    if (clean.length !== 6) return hex;
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  // Apply a header preset — preserves logo, nav links, CTA label/link
  const handleApplyHeaderPreset = (preset: HeaderPreset) => {
    const { ctaPresetId, ...styleFields } = preset.apply;
    let newCta = cta;
    if (ctaPresetId) {
      const btnPreset = BUTTON_PRESETS.find((b) => b.id === ctaPresetId);
      if (btnPreset) {
        newCta = {
          ...cta,
          presetStyle: btnPreset.id,
          backgroundColor: btnPreset.bg,
          hoverBackgroundColor: btnPreset.hoverBg,
          textColor: btnPreset.text,
          hoverTextColor: btnPreset.hoverText,
          borderColor: btnPreset.border,
          borderRadius: btnPreset.radius,
        };
      }
    }
    onChangeHeader({
      ...header,
      ...styleFields,
      ctaButton: newCta,
    });
    setJustAppliedId(preset.id);
    setTimeout(() => setJustAppliedId(null), 1600);
  };

  // Logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChangeHeader({
        ...header,
        logoImage: reader.result as string,
        logoType: "image",
      });
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      const res = await fetch("/api/upload-logo.php", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.url) {
          onChangeHeader({
            ...header,
            logoImage: data.url,
            logoType: "image",
          });
        }
      }
    } catch {
      // Local preview preserved
    } finally {
      setIsUploading(false);
    }
  };

  // Apply button preset template
  const handleApplyPreset = (preset: typeof BUTTON_PRESETS[0]) => {
    onChangeHeader({
      ...header,
      ctaButton: {
        ...cta,
        visible: true,
        presetStyle: preset.id,
        backgroundColor: preset.bg,
        hoverBackgroundColor: preset.hoverBg,
        textColor: preset.text,
        hoverTextColor: preset.hoverText,
        borderColor: preset.border,
        borderRadius: preset.radius,
      },
    });
  };

  const quickColors = ["#000000", "#090d16", "#18181b", "#0a192f", "#ffffff"];

  const filteredPresets = HEADER_PRESETS.filter((p) => {
    const matchCat = modalCategory === "all" || p.category === modalCategory;
    const matchSearch = !modalSearch || p.name.toLowerCase().includes(modalSearch.toLowerCase()) || p.description.toLowerCase().includes(modalSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Inline card renderer used in both panel and modal
  const renderPresetCard = (preset: HeaderPreset, size: "sm" | "lg") => {
    const isApplied = justAppliedId === preset.id;
    const cardCls = size === "sm"
      ? "rounded-xl border cursor-pointer transition-all overflow-hidden group flex flex-col"
      : "rounded-xl border cursor-pointer transition-all overflow-hidden group flex flex-col";
    const border = isApplied
      ? "border-emerald-500 ring-1 ring-emerald-500"
      : "border-zinc-200 hover:border-zinc-400";
    return (
      <button
        key={preset.id}
        type="button"
        onClick={() => handleApplyHeaderPreset(preset)}
        className={`${cardCls} ${border} bg-white`}
      >
        {/* Mini header preview strip */}
        <div
          className={size === "sm" ? "h-9 flex items-center px-2 gap-1" : "h-12 flex items-center px-3 gap-2"}
          style={preset.preview.bgStyle}
        >
          {/* Logo dot */}
          <div
            className={size === "sm" ? "w-2 h-2 rounded-full shrink-0" : "w-3 h-3 rounded-full shrink-0"}
            style={{ backgroundColor: preset.preview.accentColor }}
          />
          {/* Nav lines */}
          <div className="flex gap-1 flex-1">
            {[1,2,3].map((i) => (
              <div
                key={i}
                className={size === "sm" ? "h-1 rounded-full opacity-60" : "h-1.5 rounded-full opacity-60"}
                style={{
                  width: size === "sm" ? `${12 + i * 4}px` : `${18 + i * 6}px`,
                  backgroundColor: preset.preview.textColor,
                }}
              />
            ))}
          </div>
          {/* CTA chip */}
          <div
            className={size === "sm" ? "h-3 rounded-full opacity-90" : "h-4 rounded-full opacity-90"}
            style={{
              width: size === "sm" ? "20px" : "32px",
              backgroundColor: preset.preview.accentColor,
            }}
          />
          {isApplied && (
            <Check className={size === "sm" ? "w-2.5 h-2.5" : "w-3.5 h-3.5"} style={{ color: preset.preview.accentColor }} />
          )}
        </div>
        {/* Label */}
        <div className={`px-2 ${size === "sm" ? "py-1" : "py-2"} bg-white flex items-start justify-between gap-1`}>
          <div>
            <p className={`font-bold text-zinc-900 truncate leading-tight ${size === "sm" ? "text-[10px]" : "text-[11px]"}`}>
              {preset.chipLabel || preset.name}
            </p>
            {size === "lg" && (
              <p className="text-[9px] text-zinc-400 font-mono line-clamp-2 mt-0.5 leading-tight">{preset.description}</p>
            )}
          </div>
          <span
            className={`shrink-0 font-mono rounded uppercase ${size === "sm" ? "text-[8px] px-1 py-0.5" : "text-[8px] px-1.5 py-0.5"}`}
            style={{
              backgroundColor: preset.preview.bgStyle.backgroundColor as string || "#1e1e2e",
              color: preset.preview.textColor,
            }}
          >
            {preset.badge}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-5 text-zinc-900 text-xs font-sans pb-10">

      {/* 0. QUICK TEMPLATES — Header style presets */}
      <CollapsibleGroup
        title="Quick Templates"
        subtitle={`${HEADER_PRESETS.length} header style presets`}
        icon={<Sparkles className="w-3.5 h-3.5 text-violet-500" />}
        badge="PRESETS"
        defaultOpen={true}
        onExpand={() => {
          setModalCategory("all");
          setModalSearch("");
          setIsModalOpen(true);
        }}
      >
        {/* 2-column fixed-height preview list */}
        <div className="grid grid-cols-2 gap-1.5 max-h-[228px] overflow-y-auto pr-0.5">
          {HEADER_PRESETS.slice(0, 6).map((preset) => renderPresetCard(preset, "sm"))}
        </div>
        {HEADER_PRESETS.length > 6 && (
          <button
            type="button"
            onClick={() => { setModalCategory("all"); setModalSearch(""); setIsModalOpen(true); }}
            className="mt-1.5 w-full py-1.5 text-[10px] font-mono font-bold text-zinc-500 hover:text-black border border-zinc-200 hover:border-zinc-400 rounded-xl transition bg-white cursor-pointer"
          >
            + {HEADER_PRESETS.length - 6} more — View all templates
          </button>
        )}
      </CollapsibleGroup>

      {/* 1. HEADER LAYOUT (Collapsible) */}
      <CollapsibleGroup
        title="Header Style & Layout"
        subtitle={`${layoutStyle} • ${isFullWidth ? "Edge-to-edge" : "Contained"}`}
        icon={<Layout className="w-3.5 h-3.5 text-black" />}
        badge={layoutStyle.toUpperCase()}
        defaultOpen={true}
      >
        {/* 5 Minimal Layout Templates */}
        <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
          {[
            { id: "left-nav-right", name: "Standard", desc: "Logo Left • Menu Right" },
            { id: "left-nav-center", name: "Centered Menu", desc: "Logo Left • Center Nav" },
            { id: "center-logo-split", name: "Split Menu", desc: "Center Logo • Split Nav" },
            { id: "stacked-center", name: "Stacked", desc: "Logo Top • Menu Below" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeHeader({ ...header, layoutStyle: item.id as any })}
              className={`p-2 rounded-xl border text-left transition cursor-pointer ${
                layoutStyle === item.id
                  ? "border-black bg-black text-white font-bold shadow-xs"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.name}</span>
                {layoutStyle === item.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <div className={`text-[10px] truncate mt-0.5 ${layoutStyle === item.id ? "text-zinc-300" : "text-zinc-400"}`}>
                {item.desc}
              </div>
            </button>
          ))}
          <button
            type="button"
            onClick={() => onChangeHeader({ ...header, layoutStyle: "minimal" })}
            className={`col-span-2 p-2 rounded-xl border text-left transition cursor-pointer ${
              layoutStyle === "minimal"
                ? "border-black bg-black text-white font-bold shadow-xs"
                : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>Minimal</span>
              {layoutStyle === "minimal" && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </div>
            <div className={`text-[10px] truncate mt-0.5 ${layoutStyle === "minimal" ? "text-zinc-300" : "text-zinc-400"}`}>
              Logo + Direct Action Button Only
            </div>
          </button>
        </div>

        {/* Full Width Edge-to-Edge Minimal Switch */}
        <label className="flex items-center justify-between p-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100/70 transition cursor-pointer">
          <span className="text-xs font-semibold text-zinc-800">
            Full Width (Edge-to-Edge, 0 Gaps)
          </span>
          <input
            type="checkbox"
            checked={isFullWidth}
            onChange={(e) => onChangeHeader({ ...header, fullWidth: e.target.checked })}
            className="w-4 h-4 rounded border-zinc-300 accent-black cursor-pointer"
          />
        </label>
      </CollapsibleGroup>

      {/* 2. HEADER POSITION (Collapsible) */}
      <CollapsibleGroup
        title="Position & Sticky Mode"
        subtitle={isFixed ? "Fixed to top on scroll" : "Static page header"}
        icon={<Pin className="w-3.5 h-3.5 text-zinc-600" />}
        badge={isFixed ? "STICKY" : "STATIC"}
        defaultOpen={false}
      >
        <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => onChangeHeader({ ...header, position: "fixed" })}
            className={`py-2 px-3 rounded-xl border font-bold text-center transition cursor-pointer ${
              isFixed
                ? "border-black bg-black text-white shadow-xs"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            Fixed (Sticky Top)
          </button>
          <button
            type="button"
            onClick={() => onChangeHeader({ ...header, position: "normal" })}
            className={`py-2 px-3 rounded-xl border font-bold text-center transition cursor-pointer ${
              !isFixed
                ? "border-black bg-black text-white shadow-xs"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            Static (In Flow)
          </button>
        </div>
      </CollapsibleGroup>

      {/* 3. HEADER BACKGROUND & COLORS (Collapsible) */}
      <CollapsibleGroup
        title="Background & Colors"
        subtitle={`${bgType.toUpperCase()} • ${bgOpacity}% opacity`}
        icon={<Palette className="w-3.5 h-3.5 text-indigo-500" />}
        badge={bgType.toUpperCase()}
        defaultOpen={false}
      >

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
          {["solid", "gradient", "transparent"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                onChangeHeader({
                  ...header,
                  backgroundType: type as any,
                  background: type === "transparent" ? "transparent" : "solid",
                })
              }
              className={`py-1.5 px-2 rounded-xl border text-center capitalize transition cursor-pointer ${
                bgType === type
                  ? "border-black bg-black text-white font-bold"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Solid Background */}
        {bgType === "solid" && (
          <div className="space-y-2 p-2.5 rounded-xl border border-zinc-200 bg-zinc-50">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1 rounded-xl border border-zinc-200 bg-white flex-1">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => onChangeHeader({ ...header, backgroundColor: e.target.value })}
                  className="w-6 h-6 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => onChangeHeader({ ...header, backgroundColor: e.target.value })}
                  className="font-mono text-xs font-bold text-zinc-800 uppercase w-full bg-transparent outline-none"
                />
              </div>

              {/* Quick Swatches */}
              <div className="flex items-center gap-1 shrink-0">
                {quickColors.map((hex) => (
                  <button
                    key={hex}
                    type="button"
                    onClick={() => onChangeHeader({ ...header, backgroundColor: hex })}
                    style={{ backgroundColor: hex }}
                    className={`w-5 h-5 rounded-full border transition cursor-pointer ${
                      bgColor.toLowerCase() === hex.toLowerCase()
                        ? "ring-2 ring-black scale-110 border-white"
                        : "border-zinc-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div className="flex items-center justify-between text-[11px] pt-1 font-mono">
              <span className="text-zinc-500">Opacity:</span>
              <span className="font-bold text-zinc-800">{bgOpacity}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={bgOpacity}
              onChange={(e) => onChangeHeader({ ...header, backgroundOpacity: parseInt(e.target.value, 10) })}
              className="w-full accent-black cursor-pointer"
            />
          </div>
        )}

        {/* Gradient Background (Preset Templates) */}
        {bgType === "gradient" && (
          <div className="space-y-2.5 p-2.5 rounded-xl border border-zinc-200 bg-zinc-50">
            {/* Live Gradient Bar */}
            <div
              className="h-8 rounded-lg border border-zinc-300 shadow-inner flex items-center justify-center text-[11px] font-bold text-white font-mono"
              style={{
                background: `linear-gradient(${gradient.angle}deg, ${hexToRgba(
                  gradient.stops[0].color,
                  gradient.stops[0].opacity
                )} 0%, ${hexToRgba(gradient.stops[1].color, gradient.stops[1].opacity)} 100%)`,
              }}
            >
              <span className="bg-black/40 px-2 py-0.5 rounded text-[10px]">{gradient.angle}°</span>
            </div>

            {/* Gradient Preset Templates */}
            <div>
              <span className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                Gradient Templates
              </span>
              <div className="grid grid-cols-4 gap-1 font-mono text-[10px]">
                {GRADIENT_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() =>
                      onChangeHeader({
                        ...header,
                        gradient: { angle: p.angle, stops: p.stops },
                      })
                    }
                    className="py-1 px-1 rounded-lg border border-zinc-200 bg-white hover:border-black font-bold text-center transition cursor-pointer"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom 2 Colors */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-200">
              <div>
                <span className="block text-[10px] text-zinc-500 font-mono mb-1">Color 1</span>
                <div className="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 bg-white">
                  <input
                    type="color"
                    value={gradient.stops[0].color}
                    onChange={(e) => {
                      const newStops = [...gradient.stops];
                      newStops[0] = { ...newStops[0], color: e.target.value };
                      onChangeHeader({ ...header, gradient: { ...gradient, stops: newStops } });
                    }}
                    className="w-5 h-5 rounded border-0 cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={gradient.stops[0].color}
                    onChange={(e) => {
                      const newStops = [...gradient.stops];
                      newStops[0] = { ...newStops[0], color: e.target.value };
                      onChangeHeader({ ...header, gradient: { ...gradient, stops: newStops } });
                    }}
                    className="font-mono text-[10px] font-bold uppercase w-full bg-transparent outline-none"
                  />
                </div>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-500 font-mono mb-1">Color 2</span>
                <div className="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-200 bg-white">
                  <input
                    type="color"
                    value={gradient.stops[1].color}
                    onChange={(e) => {
                      const newStops = [...gradient.stops];
                      newStops[1] = { ...newStops[1], color: e.target.value };
                      onChangeHeader({ ...header, gradient: { ...gradient, stops: newStops } });
                    }}
                    className="w-5 h-5 rounded border-0 cursor-pointer p-0"
                  />
                  <input
                    type="text"
                    value={gradient.stops[1].color}
                    onChange={(e) => {
                      const newStops = [...gradient.stops];
                      newStops[1] = { ...newStops[1], color: e.target.value };
                      onChangeHeader({ ...header, gradient: { ...gradient, stops: newStops } });
                    }}
                    className="font-mono text-[10px] font-bold uppercase w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Link Colors */}
        <div className="pt-2 border-t border-zinc-100 space-y-1.5">
          <span className="block text-[10px] font-mono text-zinc-500 font-semibold uppercase">
            Nav Link Colors
          </span>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1">Text Color</span>
              <div className="flex items-center gap-1.5 p-1 rounded-xl border border-zinc-200 bg-white">
                <input
                  type="color"
                  value={navTextColor}
                  onChange={(e) => onChangeHeader({ ...header, textColor: e.target.value })}
                  className="w-6 h-6 rounded border-0 cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={navTextColor}
                  onChange={(e) => onChangeHeader({ ...header, textColor: e.target.value })}
                  className="font-mono text-[11px] font-bold uppercase w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1">Hover Color</span>
              <div className="flex items-center gap-1.5 p-1 rounded-xl border border-zinc-200 bg-white">
                <input
                  type="color"
                  value={navHoverColor}
                  onChange={(e) => onChangeHeader({ ...header, hoverTextColor: e.target.value })}
                  className="w-6 h-6 rounded border-0 cursor-pointer p-0"
                />
                <input
                  type="text"
                  value={navHoverColor}
                  onChange={(e) => onChangeHeader({ ...header, hoverTextColor: e.target.value })}
                  className="font-mono text-[11px] font-bold uppercase w-full bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleGroup>

      {/* 4. LOGO & BRANDING (Collapsible) */}
      <CollapsibleGroup
        title="Logo & Branding"
        subtitle={header.logoType === "image" ? "Custom Image Logo" : (header.logoText || event.name || "Text Title")}
        icon={<ImageIcon className="w-3.5 h-3.5 text-blue-500" />}
        badge={(header.logoType || "text").toUpperCase()}
        defaultOpen={false}
      >

        <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => onChangeHeader({ ...header, logoType: "text" })}
            className={`py-1.5 px-2 rounded-xl border font-bold transition cursor-pointer ${
              header.logoType !== "image"
                ? "border-black bg-black text-white"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            Text Logo
          </button>
          <button
            type="button"
            onClick={() => onChangeHeader({ ...header, logoType: "image" })}
            className={`py-1.5 px-2 rounded-xl border font-bold transition cursor-pointer ${
              header.logoType === "image"
                ? "border-black bg-black text-white"
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
            }`}
          >
            Upload Image
          </button>
        </div>

        {header.logoType !== "image" ? (
          <input
            type="text"
            value={header.logoText || event.name}
            onChange={(e) => onChangeHeader({ ...header, logoText: e.target.value })}
            placeholder="Logo text"
            className="w-full px-3 py-1.5 text-xs font-bold border border-zinc-200 rounded-xl bg-white focus:outline-none focus:border-black"
          />
        ) : (
          <div className="space-y-2">
            {header.logoImage ? (
              <div className="flex items-center justify-between p-2 bg-zinc-50 rounded-xl border border-zinc-200">
                <img
                  src={header.logoImage}
                  alt="Logo"
                  className="h-7 max-w-[120px] object-contain"
                />
                <button
                  type="button"
                  onClick={() => onChangeHeader({ ...header, logoImage: undefined, logoType: "text" })}
                  className="p-1 text-rose-600 hover:bg-rose-50 rounded transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 border border-dashed border-zinc-300 hover:border-black rounded-xl text-center bg-white transition cursor-pointer flex items-center justify-center gap-2 font-mono text-[11px]"
              >
                <Upload className="w-3.5 h-3.5 text-zinc-500" />
                <span>{isUploading ? "Uploading..." : "Click to Upload Logo"}</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>
        )}
      </CollapsibleGroup>

      {/* 5. ACTION BUTTON & TEMPLATES (Collapsible) */}
      <CollapsibleGroup
        title="Action Button & Templates"
        subtitle={cta.visible ? `"${cta.label}" • ${cta.link}` : "Disabled"}
        icon={<MousePointerClick className="w-3.5 h-3.5 text-rose-500" />}
        badge={cta.visible ? "ACTIVE" : "OFF"}
        defaultOpen={false}
        headerAction={
          <label className="flex items-center gap-1 text-[10px] font-mono font-bold cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={cta.visible}
              onChange={(e) =>
                onChangeHeader({
                  ...header,
                  ctaButton: { ...cta, visible: e.target.checked },
                })
              }
              className="w-3.5 h-3.5 rounded border-zinc-300 accent-black cursor-pointer"
            />
            <span className="text-zinc-600">Enable</span>
          </label>
        }
      >

        {cta.visible && (
          <div className="space-y-3">
            {/* Button Label & Link */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={cta.label}
                onChange={(e) =>
                  onChangeHeader({
                    ...header,
                    ctaButton: { ...cta, label: e.target.value },
                  })
                }
                placeholder="Button Label"
                className="w-full px-2.5 py-1.5 text-xs font-bold border border-zinc-200 rounded-xl bg-white focus:outline-none focus:border-black"
              />

              <div className="flex items-center gap-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() =>
                    onChangeHeader({
                      ...header,
                      ctaButton: { ...cta, targetType: "section", link: "#registration", openNewTab: false },
                    })
                  }
                  className={`flex-1 py-1.5 px-1 rounded-xl border text-center transition cursor-pointer ${
                    cta.targetType !== "external"
                      ? "border-black bg-black text-white font-bold"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  Section
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onChangeHeader({
                      ...header,
                      ctaButton: { ...cta, targetType: "external", link: "https://", openNewTab: true },
                    })
                  }
                  className={`flex-1 py-1.5 px-1 rounded-xl border text-center transition cursor-pointer ${
                    cta.targetType === "external"
                      ? "border-black bg-black text-white font-bold"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                  }`}
                >
                  External
                </button>
              </div>
            </div>

            {cta.targetType === "external" ? (
              <div className="flex items-center gap-2 px-2.5 py-1.5 border border-zinc-200 rounded-xl bg-white">
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <input
                  type="url"
                  value={cta.link}
                  onChange={(e) =>
                    onChangeHeader({
                      ...header,
                      ctaButton: { ...cta, link: e.target.value },
                    })
                  }
                  placeholder="https://example.com"
                  className="w-full text-xs font-mono outline-none bg-transparent"
                />
              </div>
            ) : (
              <select
                value={cta.link}
                onChange={(e) =>
                  onChangeHeader({
                    ...header,
                    ctaButton: { ...cta, link: e.target.value },
                  })
                }
                className="w-full px-2.5 py-1.5 text-xs font-bold border border-zinc-200 rounded-xl bg-white outline-none cursor-pointer text-zinc-800"
              >
                <option value="#hero">Hero Banner (Top of page)</option>
                {event.sections?.map((sec) => {
                  const secContent = sec.content;
                  const title =
                    secContent?.title ||
                    secContent?.heading ||
                    SECTION_CATALOG.find((c) => c.type === sec.type)?.name ||
                    sec.type;
                  return (
                    <option key={sec.id} value={`#${sec.id}`}>
                      {title}
                    </option>
                  );
                })}
              </select>
            )}

            {/* 10 Button Templates Grid (Super Minimal & Beautiful!) */}
            <div className="space-y-1.5 pt-1 border-t border-zinc-200">
              <span className="block text-[10px] font-mono uppercase text-zinc-500">
                10 Button Templates
              </span>

              <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-0.5">
                {BUTTON_PRESETS.map((preset) => {
                  const isSelected = cta.presetStyle === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className={`p-2 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-black bg-zinc-100 ring-1 ring-black shadow-xs"
                          : "border-zinc-200 bg-white hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-zinc-900 truncate">
                          {preset.name}
                        </span>
                        {isSelected && <Check className="w-3 h-3 text-black shrink-0" />}
                      </div>

                      <div className="w-full py-1 px-1.5 flex items-center justify-center bg-zinc-900 rounded-md">
                        <span
                          style={{
                            background: preset.bg,
                            color: preset.text,
                            borderRadius: preset.radius,
                            border: `1px solid ${preset.border}`,
                          }}
                          className="px-2 py-0.5 text-[9px] font-bold truncate max-w-full"
                        >
                          {cta.label || "Button"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corner Radius Templates */}
            <div className="space-y-1 pt-1 border-t border-zinc-200">
              <span className="block text-[10px] font-mono uppercase text-zinc-500">
                Corner Radius
              </span>
              <div className="grid grid-cols-4 gap-1 font-mono text-[10px]">
                {[
                  { label: "Sharp", radius: "0px" },
                  { label: "Subtle", radius: "6px" },
                  { label: "Smooth", radius: "12px" },
                  { label: "Pill", radius: "9999px" },
                ].map((r) => (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() =>
                      onChangeHeader({
                        ...header,
                        ctaButton: { ...cta, borderRadius: r.radius },
                      })
                    }
                    className={`py-1 rounded-lg border text-center transition cursor-pointer ${
                      cta.borderRadius === r.radius
                        ? "border-black bg-black text-white font-bold"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CollapsibleGroup>

      {/* ── FULLSCREEN HEADER TEMPLATES MODAL (portal) ── */}
      {isModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <span className="font-bold text-zinc-900 text-sm">Header Quick Templates</span>
                <span className="text-[10px] font-mono text-zinc-400">{filteredPresets.length} of {HEADER_PRESETS.length}</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 border border-zinc-200 rounded-xl bg-zinc-50 text-[11px]">
                  <Search className="w-3 h-3 text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    value={modalSearch}
                    onChange={(e) => setModalSearch(e.target.value)}
                    placeholder="Search templates..."
                    className="bg-transparent outline-none w-36 text-zinc-700 placeholder:text-zinc-400"
                    autoFocus
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl hover:bg-zinc-100 text-zinc-500 hover:text-black transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-zinc-100 overflow-x-auto">
              {(["all", "dark", "gradient", "glass", "light"] as const).map((cat) => {
                const counts = cat === "all" ? HEADER_PRESETS.length : HEADER_PRESETS.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setModalCategory(cat)}
                    className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase transition cursor-pointer ${
                      modalCategory === cat
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                    }`}
                  >
                    {cat} ({counts})
                  </button>
                );
              })}
            </div>

            {/* 4-column preset grid */}
            <div className="flex-1 overflow-y-auto p-5">
              {filteredPresets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-zinc-400 text-sm">
                  <Search className="w-8 h-8 mb-2 opacity-40" />
                  <p>No templates match your search</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {filteredPresets.map((preset) => renderPresetCard(preset, "lg"))}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>Click a template to apply — your logo, nav links and button text are preserved</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
