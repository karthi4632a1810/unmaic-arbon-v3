import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  Eye,
  EyeOff,
  Sparkles,
  Maximize2,
  X,
  Plus,
  Trash2,
  Palette,
  Check,
  Layers,
  Building,
  Navigation,
} from "lucide-react";
import type { EventDocument, EventFooter } from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

export interface FooterPreset {
  id: string;
  name: string;
  badge: string;
  category: "dark" | "navy" | "charcoal" | "minimal" | "light";
  description: string;
  preview: {
    bgStyle: React.CSSProperties;
    textColor: string;
    accentColor: string;
  };
  apply: Partial<EventFooter>;
}

export const FOOTER_PRESETS: FooterPreset[] = [
  {
    id: "ftr_obsidian",
    name: "Obsidian Pitch",
    badge: "Solid Dark",
    category: "dark",
    description: "Classic pitch-black footer with clean zinc quick-links, back to top, and integrity badge.",
    preview: {
      bgStyle: { backgroundColor: "#000000" },
      textColor: "#e4e4e7",
      accentColor: "#ffffff",
    },
    apply: {
      backgroundColor: "#000000",
      textColor: "#ffffff",
      showBackToTop: true,
      showBrandBadge: true,
      showDisclaimer: true,
      showQuickLinks: true,
    },
  },
  {
    id: "ftr_carbon_enterprise",
    name: "Carbon Enterprise",
    badge: "Corporate",
    category: "dark",
    description: "Rich dark carbon tone with Singapore secretariat line, disclaimer and architecture badge.",
    preview: {
      bgStyle: { backgroundColor: "#09090b" },
      textColor: "#e4e4e7",
      accentColor: "#22c55e",
    },
    apply: {
      backgroundColor: "#09090b",
      textColor: "#f4f4f5",
      showBackToTop: true,
      showBrandBadge: true,
      showDisclaimer: true,
      showQuickLinks: true,
      brandBadgeText: "UNMAI Carbon High-Integrity Architecture",
    },
  },
  {
    id: "ftr_slate_horizon",
    name: "Slate Horizon",
    badge: "Deep Navy",
    category: "navy",
    description: "Deep oceanic slate navy with high-contrast text and sleek tech-forward appearance.",
    preview: {
      bgStyle: { backgroundColor: "#0f172a" },
      textColor: "#f8fafc",
      accentColor: "#38bdf8",
    },
    apply: {
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      showBackToTop: true,
      showBrandBadge: true,
      showDisclaimer: true,
      showQuickLinks: true,
      brandBadgeText: "UNMAI Sovereign Registry Architecture",
    },
  },
  {
    id: "ftr_minimal_mono",
    name: "Minimal Mono",
    badge: "Ultra Clean",
    category: "minimal",
    description: "Ultra-compact aesthetic. Disclaimer and extra badges hidden, focusing solely on links and copyright.",
    preview: {
      bgStyle: { backgroundColor: "#000000" },
      textColor: "#a1a1aa",
      accentColor: "#ffffff",
    },
    apply: {
      backgroundColor: "#000000",
      textColor: "#ffffff",
      showBackToTop: true,
      showBrandBadge: false,
      showDisclaimer: false,
      showQuickLinks: true,
    },
  },
  {
    id: "ftr_charcoal_modern",
    name: "Dark Charcoal",
    badge: "Zinc Tone",
    category: "charcoal",
    description: "Neutral deep charcoal tone `#18181b` for warm and balanced high-contrast contrast.",
    preview: {
      bgStyle: { backgroundColor: "#18181b" },
      textColor: "#f4f4f5",
      accentColor: "#e4e4e7",
    },
    apply: {
      backgroundColor: "#18181b",
      textColor: "#ffffff",
      showBackToTop: true,
      showBrandBadge: true,
      showDisclaimer: true,
      showQuickLinks: true,
    },
  },
  {
    id: "ftr_emerald_eco",
    name: "Emerald Eco",
    badge: "ESG Green",
    category: "dark",
    description: "Deep forest carbon `#061a14` emphasizing nature, carbon offsets, and sustainability verification.",
    preview: {
      bgStyle: { backgroundColor: "#061a14" },
      textColor: "#ecfdf5",
      accentColor: "#10b981",
    },
    apply: {
      backgroundColor: "#061a14",
      textColor: "#ecfdf5",
      showBackToTop: true,
      showBrandBadge: true,
      showDisclaimer: true,
      showQuickLinks: true,
      brandBadgeText: "Verified Net-Zero Carbon Infrastructure",
    },
  },
  {
    id: "ftr_pure_clean_light",
    name: "Pure Light Minimal",
    badge: "Clean Light",
    category: "light",
    description: "Pure white footer background with dark typography and subtle light borders.",
    preview: {
      bgStyle: { backgroundColor: "#ffffff" },
      textColor: "#09090b",
      accentColor: "#000000",
    },
    apply: {
      backgroundColor: "#ffffff",
      textColor: "#09090b",
      showBackToTop: true,
      showBrandBadge: true,
      showDisclaimer: true,
      showQuickLinks: true,
    },
  },
  {
    id: "ftr_executive_full",
    name: "Executive Full Suite",
    badge: "Maximum Info",
    category: "dark",
    description: "Complete presentation: prominent branding, full quick links, back to top, and full legal philosophy.",
    preview: {
      bgStyle: { backgroundColor: "#000000" },
      textColor: "#fafafa",
      accentColor: "#a1a1aa",
    },
    apply: {
      backgroundColor: "#000000",
      textColor: "#ffffff",
      showBackToTop: true,
      showBrandBadge: true,
      showDisclaimer: true,
      showQuickLinks: true,
      organizationName: "UNMAI Carbon Solutions Pte. Ltd. (Singapore)",
      brandBadgeText: "UNMAI Carbon High-Integrity Architecture",
    },
  },
];

const BG_COLOR_PRESETS = [
  { label: "Pitch Black", color: "#000000" },
  { label: "Dark Carbon", color: "#09090b" },
  { label: "Deep Slate", color: "#0f172a" },
  { label: "Deep Zinc", color: "#18181b" },
  { label: "Forest Dark", color: "#061a14" },
  { label: "Pure White", color: "#ffffff" },
];

interface FooterEditorProps {
  footer: EventFooter;
  event: EventDocument;
  onChangeFooter: (updated: EventFooter) => void;
  onToggleVisibility?: () => void;
}

export const FooterEditor: React.FC<FooterEditorProps> = ({
  footer,
  event,
  onChangeFooter,
  onToggleVisibility,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const isVisible = footer.visible !== false;

  const handleUpdate = (patch: Partial<EventFooter>) => {
    onChangeFooter({
      ...footer,
      ...patch,
    });
  };

  const handleApplyPreset = (preset: FooterPreset) => {
    handleUpdate(preset.apply);
  };

  const filteredPresets =
    activeCategory === "all"
      ? FOOTER_PRESETS
      : FOOTER_PRESETS.filter((p) => p.category === activeCategory);

  // Available sections for section jump dropdown
  const sectionOptions = [
    { id: "hero", label: "Hero Banner" },
    ...event.sections.map((s) => ({
      id: s.id,
      label: s.content?.heading || s.content?.title || `${s.type.toUpperCase()} Section`,
    })),
  ];

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* 1. VISIBILITY STATUS BANNER (CORE USER REQUEST) */}
      <div
        className={`p-3 rounded-2xl border transition-all duration-200 ${
          isVisible
            ? "bg-zinc-900 text-white border-zinc-800 shadow-xs"
            : "bg-amber-950/20 border-amber-800/40 text-amber-200"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isVisible ? "bg-white text-black" : "bg-amber-500/20 text-amber-400"
              }`}
            >
              {isVisible ? (
                <Eye className="w-4 h-4 text-black" />
              ) : (
                <EyeOff className="w-4 h-4 text-amber-400" />
              )}
            </div>
            <div>
              <div className="font-bold text-xs">
                {isVisible ? "Footer Active & Visible" : "Footer Hidden"}
              </div>
              <div
                className={`text-[10px] font-mono ${
                  isVisible ? "text-zinc-400" : "text-amber-300/80"
                }`}
              >
                {isVisible
                  ? "Displayed at bottom of public landing page"
                  : "Hidden from live page & preview visitors"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onToggleVisibility) {
                onToggleVisibility();
              } else {
                handleUpdate({ visible: !isVisible });
              }
            }}
            className={`px-3 py-1.5 rounded-xl font-bold font-mono text-[11px] flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
              isVisible
                ? "bg-white hover:bg-zinc-200 text-black"
                : "bg-amber-400 hover:bg-amber-300 text-black"
            }`}
          >
            {isVisible ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-black" />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-black" />
                <span>Show</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. QUICK TEMPLATES & PRESETS */}
      <CollapsibleGroup
        title="Quick Templates & Presets"
        subtitle={`${FOOTER_PRESETS.length} professionally designed styles`}
        icon={<Sparkles className="w-3.5 h-3.5" />}
        badge="PRESETS"
        defaultOpen={true}
        onExpand={() => setIsModalOpen(true)}
      >
        <div className="space-y-2">
          {/* Scrollable grid showing first 6 with 2 columns */}
          <div className="grid grid-cols-2 gap-2 max-h-[290px] overflow-y-auto pr-1">
            {FOOTER_PRESETS.map((p) => {
              const isSelected =
                footer.backgroundColor === p.apply.backgroundColor &&
                footer.showBrandBadge === p.apply.showBrandBadge;

              return (
                <div
                  key={p.id}
                  onClick={() => handleApplyPreset(p)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer flex flex-col justify-between text-left group ${
                    isSelected
                      ? "border-black bg-zinc-100 ring-1 ring-black shadow-xs"
                      : "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-xs"
                  }`}
                >
                  {/* Preset Preview Box */}
                  <div
                    style={p.preview.bgStyle}
                    className="h-12 w-full rounded-lg border border-zinc-800 p-1.5 flex flex-col justify-between mb-2 relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-3 h-3 rounded bg-white/20" />
                      <div className="flex gap-1">
                        <div className="w-3 h-1 rounded-full bg-white/40" />
                        <div className="w-3 h-1 rounded-full bg-white/40" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[7px] font-mono text-zinc-400">
                      <span>© 2026 UNMAI</span>
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: p.preview.accentColor }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="font-bold text-[11px] text-zinc-900 group-hover:text-black truncate">
                        {p.name}
                      </span>
                      {isSelected && (
                        <Check className="w-3 h-3 text-black shrink-0" />
                      )}
                    </div>
                    <p className="text-[10px] text-zinc-400 font-mono line-clamp-1">
                      {p.badge}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-[11px] font-mono font-bold text-zinc-600 hover:text-black flex items-center justify-center gap-1 mx-auto py-1 px-3 rounded-lg hover:bg-zinc-100 transition cursor-pointer"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Expand all {FOOTER_PRESETS.length} presets in full view</span>
            </button>
          </div>
        </div>
      </CollapsibleGroup>

      {/* 3. BACKGROUND & COLORS */}
      <CollapsibleGroup
        title="Background & Color"
        subtitle="Footer canvas and border tones"
        icon={<Palette className="w-3.5 h-3.5" />}
        badge="COLORS"
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1.5 block">
              Quick Theme Palettes
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {BG_COLOR_PRESETS.map((bg) => (
                <button
                  key={bg.color}
                  type="button"
                  onClick={() =>
                    handleUpdate({
                      backgroundColor: bg.color,
                      textColor: bg.color === "#ffffff" ? "#09090b" : "#ffffff",
                    })
                  }
                  className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-left transition cursor-pointer ${
                    footer.backgroundColor === bg.color
                      ? "border-black bg-zinc-100 font-bold"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-zinc-400 shrink-0"
                    style={{ backgroundColor: bg.color }}
                  />
                  <span className="text-[10px] truncate">{bg.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1 block">
                Custom Background
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={footer.backgroundColor || "#000000"}
                  onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
                  className="w-7 h-7 rounded border border-zinc-300 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={footer.backgroundColor || "#000000"}
                  onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
                  placeholder="#000000"
                  className="w-full px-2 py-1 bg-white border border-zinc-200 rounded text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1 block">
                Custom Text Color
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="color"
                  value={footer.textColor || "#ffffff"}
                  onChange={(e) => handleUpdate({ textColor: e.target.value })}
                  className="w-7 h-7 rounded border border-zinc-300 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={footer.textColor || "#ffffff"}
                  onChange={(e) => handleUpdate({ textColor: e.target.value })}
                  placeholder="#ffffff"
                  className="w-full px-2 py-1 bg-white border border-zinc-200 rounded text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleGroup>

      {/* 4. ELEMENT VISIBILITY (HIDE / SHOW SECTIONS) */}
      <CollapsibleGroup
        title="Footer Elements (Show / Hide)"
        subtitle="Toggle specific components inside the footer"
        icon={<Layers className="w-3.5 h-3.5" />}
        badge="ELEMENTS"
        defaultOpen={true}
      >
        <div className="space-y-2">
          {/* Quick Links Toggle */}
          <div className="flex items-center justify-between p-2 bg-white border border-zinc-200 rounded-xl">
            <div>
              <div className="font-bold text-xs text-zinc-900">Quick Navigation Links</div>
              <div className="text-[10px] text-zinc-400 font-mono">
                {footer.quickLinks?.length || 0} links configured
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleUpdate({ showQuickLinks: footer.showQuickLinks === false ? true : false })}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer border ${
                footer.showQuickLinks !== false
                  ? "bg-black text-white border-black"
                  : "bg-zinc-100 text-zinc-600 border-zinc-300"
              }`}
            >
              {footer.showQuickLinks !== false ? (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Visible</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3 text-zinc-400" />
                  <span>Hidden</span>
                </>
              )}
            </button>
          </div>

          {/* Back to Top Toggle */}
          <div className="flex items-center justify-between p-2 bg-white border border-zinc-200 rounded-xl">
            <div>
              <div className="font-bold text-xs text-zinc-900">&quot;Back to Top&quot; Button</div>
              <div className="text-[10px] text-zinc-400 font-mono">Smooth scroll pill button</div>
            </div>
            <button
              type="button"
              onClick={() => handleUpdate({ showBackToTop: footer.showBackToTop === false ? true : false })}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer border ${
                footer.showBackToTop !== false
                  ? "bg-black text-white border-black"
                  : "bg-zinc-100 text-zinc-600 border-zinc-300"
              }`}
            >
              {footer.showBackToTop !== false ? (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Visible</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3 text-zinc-400" />
                  <span>Hidden</span>
                </>
              )}
            </button>
          </div>

          {/* Architecture Badge Toggle */}
          <div className="flex items-center justify-between p-2 bg-white border border-zinc-200 rounded-xl">
            <div>
              <div className="font-bold text-xs text-zinc-900">Architecture / Sparkles Badge</div>
              <div className="text-[10px] text-zinc-400 font-mono">Right corner bottom strip</div>
            </div>
            <button
              type="button"
              onClick={() => handleUpdate({ showBrandBadge: footer.showBrandBadge === false ? true : false })}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer border ${
                footer.showBrandBadge !== false
                  ? "bg-black text-white border-black"
                  : "bg-zinc-100 text-zinc-600 border-zinc-300"
              }`}
            >
              {footer.showBrandBadge !== false ? (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Visible</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3 text-zinc-400" />
                  <span>Hidden</span>
                </>
              )}
            </button>
          </div>

          {/* Disclaimer Toggle */}
          <div className="flex items-center justify-between p-2 bg-white border border-zinc-200 rounded-xl">
            <div>
              <div className="font-bold text-xs text-zinc-900">Disclaimer / Legal Notice</div>
              <div className="text-[10px] text-zinc-400 font-mono">Under copyright text</div>
            </div>
            <button
              type="button"
              onClick={() => handleUpdate({ showDisclaimer: footer.showDisclaimer === false ? true : false })}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer border ${
                footer.showDisclaimer !== false
                  ? "bg-black text-white border-black"
                  : "bg-zinc-100 text-zinc-600 border-zinc-300"
              }`}
            >
              {footer.showDisclaimer !== false ? (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Visible</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3 text-zinc-400" />
                  <span>Hidden</span>
                </>
              )}
            </button>
          </div>
        </div>
      </CollapsibleGroup>

      {/* 5. TEXT CONTENT & LEGAL DETAILS */}
      <CollapsibleGroup
        title="Copyright & Information"
        subtitle="Organization, copyright & disclaimer text"
        icon={<Building className="w-3.5 h-3.5" />}
        badge="CONTENT"
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1 block">
              Organization Name / Subtitle
            </label>
            <input
              type="text"
              value={footer.organizationName || "UNMAI Carbon Solutions Pte. Ltd. (Singapore)"}
              onChange={(e) => handleUpdate({ organizationName: e.target.value })}
              placeholder="UNMAI Carbon Solutions Pte. Ltd. (Singapore)"
              className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1 block">
              Copyright Notice
            </label>
            <input
              type="text"
              value={footer.copyrightText || "© 2026 UNMAI Carbon Solutions Pte. Ltd. All rights reserved."}
              onChange={(e) => handleUpdate({ copyrightText: e.target.value })}
              placeholder="© 2026 UNMAI Carbon Solutions Pte. Ltd. All rights reserved."
              className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1 block">
              Disclaimer / Legal Text
            </label>
            <AutoResizeTextarea
              minRows={3}
              value={footer.disclaimer || ""}
              onChange={(e) => handleUpdate({ disclaimer: e.target.value })}
              placeholder="Enter legal disclaimer, governance note, or operating philosophy..."
              className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1 block">
              Brand Badge Text
            </label>
            <input
              type="text"
              value={footer.brandBadgeText || "UNMAI Carbon High-Integrity Architecture"}
              onChange={(e) => handleUpdate({ brandBadgeText: e.target.value })}
              placeholder="UNMAI Carbon High-Integrity Architecture"
              className="w-full px-2.5 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs"
            />
          </div>
        </div>
      </CollapsibleGroup>

      {/* 6. QUICK LINKS MANAGEMENT */}
      <CollapsibleGroup
        title="Quick Links Navigation"
        subtitle="Manage footer navigation items and on-page jumps"
        icon={<Navigation className="w-3.5 h-3.5" />}
        badge={`${footer.quickLinks?.length || 0} LINKS`}
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">
              Configured Links
            </span>
            <button
              type="button"
              onClick={() => {
                const current = footer.quickLinks || [];
                handleUpdate({
                  quickLinks: [
                    ...current,
                    {
                      label: `Link ${current.length + 1}`,
                      link: "/",
                      targetType: "section",
                      sectionTarget: sectionOptions[0]?.id || "hero",
                    },
                  ],
                });
              }}
              className="px-2 py-1 rounded bg-black text-white text-[10px] font-mono font-bold flex items-center gap-1 hover:bg-zinc-800 transition cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Link</span>
            </button>
          </div>

          {(!footer.quickLinks || footer.quickLinks.length === 0) ? (
            <div className="text-center p-4 border border-dashed border-zinc-200 rounded-xl text-zinc-400 font-mono text-[11px]">
              No quick links added yet. Click &quot;Add Link&quot; above.
            </div>
          ) : (
            <div className="space-y-2">
              {footer.quickLinks.map((item, idx) => {
                const isSectionTarget = item.targetType === "section";

                return (
                  <div
                    key={idx}
                    className="p-2.5 bg-white border border-zinc-200 rounded-xl space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-zinc-500">
                        #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(footer.quickLinks || [])];
                          updated.splice(idx, 1);
                          handleUpdate({ quickLinks: updated });
                        }}
                        className="p-1 text-zinc-400 hover:text-red-600 transition cursor-pointer rounded"
                        title="Remove Link"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">
                          Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => {
                            const updated = [...(footer.quickLinks || [])];
                            updated[idx] = { ...updated[idx], label: e.target.value };
                            handleUpdate({ quickLinks: updated });
                          }}
                          placeholder="e.g. Overview"
                          className="w-full px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">
                          Target Type
                        </label>
                        <div className="flex rounded-md border border-zinc-200 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(footer.quickLinks || [])];
                              updated[idx] = {
                                ...updated[idx],
                                targetType: "section",
                                sectionTarget: updated[idx].sectionTarget || sectionOptions[0]?.id || "hero",
                              };
                              handleUpdate({ quickLinks: updated });
                            }}
                            className={`flex-1 py-1 text-[10px] font-mono font-bold transition ${
                              isSectionTarget ? "bg-black text-white" : "bg-white text-zinc-600"
                            }`}
                          >
                            Section
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const updated = [...(footer.quickLinks || [])];
                              updated[idx] = {
                                ...updated[idx],
                                targetType: "external",
                              };
                              handleUpdate({ quickLinks: updated });
                            }}
                            className={`flex-1 py-1 text-[10px] font-mono font-bold transition ${
                              !isSectionTarget ? "bg-black text-white" : "bg-white text-zinc-600"
                            }`}
                          >
                            URL
                          </button>
                        </div>
                      </div>
                    </div>

                    {isSectionTarget ? (
                      <div>
                        <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">
                          Target Section
                        </label>
                        <select
                          value={item.sectionTarget || "hero"}
                          onChange={(e) => {
                            const updated = [...(footer.quickLinks || [])];
                            updated[idx] = {
                              ...updated[idx],
                              sectionTarget: e.target.value,
                              link: `#${e.target.value}`,
                            };
                            handleUpdate({ quickLinks: updated });
                          }}
                          className="w-full px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-xs font-mono"
                        >
                          {sectionOptions.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                              {opt.label} (#{opt.id})
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="text-[9px] font-mono uppercase text-zinc-400 block mb-0.5">
                          External URL
                        </label>
                        <input
                          type="text"
                          value={item.link}
                          onChange={(e) => {
                            const updated = [...(footer.quickLinks || [])];
                            updated[idx] = { ...updated[idx], link: e.target.value };
                            handleUpdate({ quickLinks: updated });
                          }}
                          placeholder="https://example.com"
                          className="w-full px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-xs font-mono"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CollapsibleGroup>

      {/* EXPANDED FULL-SCREEN PRESETS MODAL */}
      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200 select-none">
            <div
              className="bg-white border border-zinc-200 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 leading-tight">
                      Footer Design Templates
                    </h3>
                    <p className="text-xs text-zinc-500 font-mono">
                      Choose from {FOOTER_PRESETS.length} professionally crafted footer styles
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-200 rounded-lg transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter Bar */}
              <div className="px-5 py-2.5 border-b border-zinc-100 flex items-center gap-2 bg-white overflow-x-auto">
                {["all", "dark", "navy", "charcoal", "minimal", "light"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold capitalize transition cursor-pointer ${
                      activeCategory === cat
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Presets 4-column Grid */}
              <div className="p-5 flex-1 overflow-y-auto bg-zinc-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredPresets.map((p) => {
                    const isSelected =
                      footer.backgroundColor === p.apply.backgroundColor &&
                      footer.showBrandBadge === p.apply.showBrandBadge;

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          handleApplyPreset(p);
                          setIsModalOpen(false);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between text-left group ${
                          isSelected
                            ? "border-black bg-white ring-2 ring-black shadow-md"
                            : "border-zinc-200 bg-white hover:border-black hover:shadow-md"
                        }`}
                      >
                        {/* Preview Box */}
                        <div
                          style={p.preview.bgStyle}
                          className="h-24 w-full rounded-xl border border-zinc-800/80 p-2.5 flex flex-col justify-between mb-3 relative overflow-hidden"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-5 h-5 rounded-md bg-white/20 flex items-center justify-center text-[9px] font-bold text-white font-mono">
                              U
                            </div>
                            <div className="flex gap-1.5">
                              <div className="w-5 h-1.5 rounded-full bg-white/40" />
                              <div className="w-5 h-1.5 rounded-full bg-white/40" />
                              <div className="w-5 h-1.5 rounded-full bg-white/40" />
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400">
                            <span>© 2026 UNMAI</span>
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: p.preview.accentColor }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-bold text-sm text-zinc-900 group-hover:text-black">
                              {p.name}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                              {p.badge}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                            {p.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-mono font-bold text-zinc-600 group-hover:text-black">
                          <span>Apply Template</span>
                          <span className="text-sm">→</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-zinc-200 bg-white flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-mono font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
