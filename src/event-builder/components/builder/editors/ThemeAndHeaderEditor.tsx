import React, { useState, useEffect } from "react";
import {
  Palette,
  Type,
  Search,
  Check,
  ChevronDown,
} from "lucide-react";
import type { EventDocument, EventBranding, EventHeader } from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";

interface ThemeAndHeaderEditorProps {
  event: EventDocument;
  onChangeBranding: (branding: EventBranding) => void;
  onChangeHeader?: (header: EventHeader) => void;
  onChangeSeo?: (seo: any) => void;
}

export const GOOGLE_FONTS_CATALOG = [
  // Popular Sans-Serif
  { name: "Inter", category: "Sans-Serif", popular: true },
  { name: "Roboto", category: "Sans-Serif", popular: true },
  { name: "Open Sans", category: "Sans-Serif", popular: true },
  { name: "Montserrat", category: "Sans-Serif", popular: true },
  { name: "Poppins", category: "Sans-Serif", popular: true },
  { name: "Lato", category: "Sans-Serif", popular: true },
  { name: "Plus Jakarta Sans", category: "Sans-Serif", popular: true },
  { name: "Outfit", category: "Sans-Serif", popular: true },
  { name: "DM Sans", category: "Sans-Serif", popular: true },
  { name: "Manrope", category: "Sans-Serif", popular: true },
  { name: "Work Sans", category: "Sans-Serif" },
  { name: "Nunito", category: "Sans-Serif" },
  { name: "Raleway", category: "Sans-Serif" },
  { name: "Rubik", category: "Sans-Serif" },
  { name: "Sora", category: "Sans-Serif" },
  { name: "Cabin", category: "Sans-Serif" },
  { name: "Ubuntu", category: "Sans-Serif" },
  { name: "Quicksand", category: "Sans-Serif" },
  { name: "Fira Sans", category: "Sans-Serif" },
  { name: "Heebo", category: "Sans-Serif" },
  { name: "Mulish", category: "Sans-Serif" },
  { name: "Karla", category: "Sans-Serif" },
  { name: "Jost", category: "Sans-Serif" },
  { name: "Barlow", category: "Sans-Serif" },
  { name: "Lexend", category: "Sans-Serif" },

  // Serif & Editorial
  { name: "Playfair Display", category: "Serif", popular: true },
  { name: "Merriweather", category: "Serif", popular: true },
  { name: "Lora", category: "Serif", popular: true },
  { name: "Cormorant Garamond", category: "Serif", popular: true },
  { name: "Cinzel", category: "Serif", popular: true },
  { name: "EB Garamond", category: "Serif" },
  { name: "Bitter", category: "Serif" },
  { name: "Libre Baskerville", category: "Serif" },
  { name: "Bodoni Moda", category: "Serif" },
  { name: "Newsreader", category: "Serif" },
  { name: "Spectral", category: "Serif" },
  { name: "Frank Ruhl Libre", category: "Serif" },

  // Display & Creative
  { name: "Space Grotesk", category: "Display", popular: true },
  { name: "Syne", category: "Display", popular: true },
  { name: "Oswald", category: "Display", popular: true },
  { name: "Bebas Neue", category: "Display", popular: true },
  { name: "Anton", category: "Display" },
  { name: "Archivo Black", category: "Display" },
  { name: "Righteous", category: "Display" },
  { name: "Unbounded", category: "Display" },
  { name: "Cabinet Grotesk", category: "Display" },

  // Monospace
  { name: "Space Mono", category: "Monospace", popular: true },
  { name: "JetBrains Mono", category: "Monospace", popular: true },
  { name: "Fira Code", category: "Monospace" },
  { name: "Roboto Mono", category: "Monospace" },
  { name: "IBM Plex Mono", category: "Monospace" },
];

export function loadGoogleFont(fontFamily: string) {
  if (!fontFamily || typeof document === "undefined") return;
  const cleanName = fontFamily.trim();
  const id = `gfont-${cleanName.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    cleanName
  )}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
}

const BG_PRESETS = [
  { label: "Pitch Black", color: "#000000" },
  { label: "Dark Carbon", color: "#09090b" },
  { label: "Slate Navy", color: "#0f172a" },
  { label: "Deep Zinc", color: "#18181b" },
  { label: "Pure White", color: "#ffffff" },
  { label: "Light Zinc", color: "#f4f4f5" },
];

const TEXT_PRESETS = [
  { label: "Pure White", color: "#ffffff" },
  { label: "Off White", color: "#f4f4f5" },
  { label: "Zinc Gray", color: "#e4e4e7" },
  { label: "Muted Gray", color: "#a1a1aa" },
  { label: "Deep Black", color: "#000000" },
  { label: "Royal Blue", color: "#2563eb" },
];

const FONT_SIZE_PRESETS = [
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
];

const FONT_WEIGHT_PRESETS = [
  { label: "Light", value: "300" },
  { label: "Regular", value: "400" },
  { label: "Medium", value: "500" },
  { label: "SemiBold", value: "600" },
  { label: "Bold", value: "700" },
  { label: "ExtraBold", value: "800" },
];

const LINE_HEIGHT_PRESETS = [
  { label: "Tight", value: "1.3" },
  { label: "Normal", value: "1.5" },
  { label: "Relaxed", value: "1.75" },
  { label: "Loose", value: "2.0" },
];

export const ThemeAndHeaderEditor: React.FC<ThemeAndHeaderEditorProps> = ({
  event,
  onChangeBranding,
}) => {
  const { branding } = event;
  const [fontSearch, setFontSearch] = useState("");
  const [selectedFontCategory, setSelectedFontCategory] = useState<string>("All");
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);
  const [customFontInput, setCustomFontInput] = useState("");

  const currentFont = branding.font || "Inter";
  const currentFontSize = branding.fontSize || "16px";
  const currentFontWeight = branding.fontWeight || "400";
  const currentLineHeight = branding.lineHeight || "1.5";

  // Preload currently active font
  useEffect(() => {
    loadGoogleFont(currentFont);
  }, [currentFont]);

  const handleSelectFont = (fontName: string) => {
    loadGoogleFont(fontName);
    onChangeBranding({ ...branding, font: fontName });
    setIsFontDropdownOpen(false);
  };

  const handleCustomFontSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customFontInput.trim()) return;
    const clean = customFontInput.trim();
    loadGoogleFont(clean);
    onChangeBranding({ ...branding, font: clean });
    setCustomFontInput("");
    setIsFontDropdownOpen(false);
  };

  const filteredFonts = GOOGLE_FONTS_CATALOG.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(fontSearch.toLowerCase());
    const matchesCat =
      selectedFontCategory === "All" || f.category === selectedFontCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-3.5 text-slate-800 text-xs font-sans pb-10">
      {/* 1. BACKGROUND SETTING (Collapsible) */}
      <CollapsibleGroup
        title="Background & Colors"
        subtitle={`BG ${branding.backgroundColor || "#000000"} • Text ${branding.textColor || "#ffffff"}`}
        icon={<Palette className="w-3.5 h-3.5 text-indigo-500" />}
        badge="COLORS"
        defaultOpen={true}
      >
        {/* Page Background Color */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800">
              Background Color <span className="text-zinc-500 font-normal">(Page Background)</span>
            </span>
            <span className="font-mono text-[10px] text-zinc-400 uppercase">
              {branding.backgroundColor || "#000000"}
            </span>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 focus-within:border-black transition shadow-xs">
            <input
              type="color"
              value={
                branding.backgroundColor && /^#[0-9A-Fa-f]{6}$/.test(branding.backgroundColor)
                  ? branding.backgroundColor
                  : "#000000"
              }
              onChange={(e) =>
                onChangeBranding({ ...branding, backgroundColor: e.target.value })
              }
              className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
              title="Pick Page Background Color"
            />
            <input
              type="text"
              value={branding.backgroundColor || ""}
              onChange={(e) =>
                onChangeBranding({ ...branding, backgroundColor: e.target.value })
              }
              placeholder="#000000"
              className="font-mono text-xs text-zinc-800 uppercase font-bold w-full bg-transparent outline-none"
            />
          </div>

          {/* Quick presets for background */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {BG_PRESETS.map((p) => (
              <button
                key={p.color}
                type="button"
                onClick={() => onChangeBranding({ ...branding, backgroundColor: p.color })}
                title={`${p.label} (${p.color})`}
                className={`w-5 h-5 rounded-md border transition cursor-pointer shrink-0 ${
                  branding.backgroundColor?.toLowerCase() === p.color.toLowerCase()
                    ? "ring-2 ring-black ring-offset-1 scale-110 border-black"
                    : "border-zinc-300 hover:scale-105"
                }`}
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>
        </div>

        {/* Text Color */}
        <div className="space-y-2 pt-2 border-t border-zinc-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800">
              Text Color <span className="text-zinc-500 font-normal">(For Overall Color)</span>
            </span>
            <span className="font-mono text-[10px] text-zinc-400 uppercase">
              {branding.textColor || "#ffffff"}
            </span>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 focus-within:border-black transition shadow-xs">
            <input
              type="color"
              value={
                branding.textColor && /^#[0-9A-Fa-f]{6}$/.test(branding.textColor)
                  ? branding.textColor
                  : "#ffffff"
              }
              onChange={(e) =>
                onChangeBranding({ ...branding, textColor: e.target.value })
              }
              className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
              title="Pick Overall Text Color"
            />
            <input
              type="text"
              value={branding.textColor || ""}
              onChange={(e) =>
                onChangeBranding({ ...branding, textColor: e.target.value })
              }
              placeholder="#ffffff"
              className="font-mono text-xs text-zinc-800 uppercase font-bold w-full bg-transparent outline-none"
            />
          </div>

          {/* Quick presets for text */}
          <div className="flex items-center gap-1.5 pt-0.5">
            {TEXT_PRESETS.map((p) => (
              <button
                key={p.color}
                type="button"
                onClick={() => onChangeBranding({ ...branding, textColor: p.color })}
                title={`${p.label} (${p.color})`}
                className={`w-5 h-5 rounded-md border transition cursor-pointer shrink-0 ${
                  branding.textColor?.toLowerCase() === p.color.toLowerCase()
                    ? "ring-2 ring-black ring-offset-1 scale-110 border-black"
                    : "border-zinc-300 hover:scale-105"
                }`}
                style={{ backgroundColor: p.color }}
              />
            ))}
          </div>
        </div>
      </CollapsibleGroup>

      {/* 2. TYPOGRAPHY (Collapsible) */}
      <CollapsibleGroup
        title="Typography & Fonts"
        subtitle={`${currentFont} • ${currentFontSize} • ${currentFontWeight}`}
        icon={<Type className="w-3.5 h-3.5 text-blue-500" />}
        badge={currentFont.toUpperCase()}
        defaultOpen={true}
      >

        {/* Font Family Picker with Search & Google Fonts Library */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-zinc-800 block">
            Font Family <span className="text-zinc-500 font-normal">(All Google Fonts)</span>
          </span>

          {/* Current Font Trigger Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
              className="w-full p-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 transition flex items-center justify-between cursor-pointer shadow-xs text-left"
            >
              <div className="truncate">
                <span
                  className="font-bold text-sm text-zinc-900 block truncate"
                  style={{ fontFamily: `"${currentFont}", sans-serif` }}
                >
                  {currentFont}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {GOOGLE_FONTS_CATALOG.find((f) => f.name.toLowerCase() === currentFont.toLowerCase())?.category ||
                    "Custom Google Font"}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                  isFontDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isFontDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white rounded-2xl border border-zinc-200 shadow-2xl p-2.5 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                {/* Search Input */}
                <div className="flex items-center gap-2 p-1.5 px-2 rounded-xl bg-zinc-100 border border-zinc-200">
                  <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    value={fontSearch}
                    onChange={(e) => setFontSearch(e.target.value)}
                    placeholder="Search 40+ Google Fonts..."
                    className="w-full bg-transparent text-xs text-zinc-900 outline-none placeholder:text-zinc-400"
                    autoFocus
                  />
                  {fontSearch && (
                    <button
                      type="button"
                      onClick={() => setFontSearch("")}
                      className="text-[10px] text-zinc-400 hover:text-black font-mono cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                  {["All", "Sans-Serif", "Serif", "Display", "Monospace"].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedFontCategory(cat)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold transition shrink-0 cursor-pointer ${
                        selectedFontCategory === cat
                          ? "bg-black text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Fonts List */}
                <div className="max-h-56 overflow-y-auto space-y-0.5 pr-1">
                  {filteredFonts.map((f) => {
                    const isSelected = currentFont.toLowerCase() === f.name.toLowerCase();
                    return (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => handleSelectFont(f.name)}
                        className={`w-full p-2 rounded-xl text-left transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-zinc-100 text-black font-bold"
                            : "hover:bg-zinc-50 text-zinc-700"
                        }`}
                      >
                        <div className="truncate">
                          <span
                            className="text-xs block truncate"
                            style={{ fontFamily: `"${f.name}", sans-serif` }}
                          >
                            {f.name}
                          </span>
                          <span className="text-[9px] text-zinc-400 font-mono">
                            {f.category}
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-black shrink-0" />}
                      </button>
                    );
                  })}

                  {filteredFonts.length === 0 && (
                    <div className="p-4 text-center text-xs text-zinc-400">
                      No matching fonts in library.
                    </div>
                  )}
                </div>

                {/* Custom Google Font Name Input */}
                <form
                  onSubmit={handleCustomFontSubmit}
                  className="pt-2 border-t border-zinc-100 flex items-center gap-1.5"
                >
                  <input
                    type="text"
                    value={customFontInput}
                    onChange={(e) => setCustomFontInput(e.target.value)}
                    placeholder="Enter any Google Font name..."
                    className="flex-1 p-1.5 px-2 rounded-xl border border-zinc-200 text-xs outline-none focus:border-black"
                  />
                  <button
                    type="submit"
                    className="px-2.5 py-1.5 rounded-xl bg-black text-white text-[11px] font-bold font-mono hover:bg-zinc-800 transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800">
              Font Size <span className="text-zinc-500 font-normal">(Base Size)</span>
            </span>
            <span className="font-mono text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
              {currentFontSize}
            </span>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={12}
            max={24}
            step={1}
            value={parseInt(currentFontSize, 10) || 16}
            onChange={(e) =>
              onChangeBranding({ ...branding, fontSize: `${e.target.value}px` })
            }
            className="w-full accent-black cursor-pointer"
          />

          {/* Presets */}
          <div className="grid grid-cols-4 gap-1.5">
            {FONT_SIZE_PRESETS.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => onChangeBranding({ ...branding, fontSize: s.value })}
                className={`py-1 rounded-lg border text-center font-mono text-[11px] font-bold transition cursor-pointer ${
                  currentFontSize === s.value
                    ? "border-black bg-zinc-100 text-black shadow-xs"
                    : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-600"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Weight */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800">
              Font Weight <span className="text-zinc-500 font-normal">(Overall Text)</span>
            </span>
            <span className="font-mono text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
              {FONT_WEIGHT_PRESETS.find((w) => w.value === currentFontWeight)?.label || currentFontWeight}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {FONT_WEIGHT_PRESETS.map((w) => (
              <button
                key={w.value}
                type="button"
                onClick={() => onChangeBranding({ ...branding, fontWeight: w.value })}
                className={`py-1.5 px-1 rounded-lg border text-center font-mono text-[11px] font-bold transition cursor-pointer ${
                  currentFontWeight === w.value
                    ? "border-black bg-zinc-100 text-black shadow-xs"
                    : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-600"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        {/* Line Height */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-800">
              Line Height <span className="text-zinc-500 font-normal">(Text Spacing)</span>
            </span>
            <span className="font-mono text-xs font-bold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
              {LINE_HEIGHT_PRESETS.find((l) => l.value === currentLineHeight)?.label || currentLineHeight}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {LINE_HEIGHT_PRESETS.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => onChangeBranding({ ...branding, lineHeight: l.value })}
                className={`py-1 rounded-lg border text-center font-mono text-[11px] font-bold transition cursor-pointer ${
                  currentLineHeight === l.value
                    ? "border-black bg-zinc-100 text-black shadow-xs"
                    : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-600"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleGroup>
    </div>
  );
};
