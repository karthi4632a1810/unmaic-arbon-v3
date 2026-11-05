import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Clock,
  Type,
  Sparkles,
  Maximize2,
  X,
  Search,
  Check,
  Eye,
  EyeOff,
  Palette,
  Sliders,
  ExternalLink,
  Layers,
} from "lucide-react";
import type {
  CountdownContent,
  EventSection,
} from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";
import {
  SECTION_PRESETS,
  type SectionPreset,
} from "../../../registry/sectionPresets";
import { SECTION_CATALOG } from "../../../registry/sectionCatalog";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

interface CountdownEditorProps {
  content: CountdownContent;
  onChange: (updated: CountdownContent) => void;
  eventStartDate: string;
  presets?: SectionPreset[];
  onApplyPreset?: (preset: SectionPreset) => void;
  sections?: EventSection[];
}

export const CountdownEditor: React.FC<CountdownEditorProps> = ({
  content,
  onChange,
  eventStartDate,
  presets = SECTION_PRESETS.countdown || [],
  onApplyPreset,
  sections = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

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

  const handleUpdate = (fields: Partial<CountdownContent>) => {
    onChange({ ...content, ...fields });
  };

  const formattedDate = content.targetDate
    ? new Date(content.targetDate).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Event Date";

  const layoutStyle = content.layoutStyle || "radar";
  const isRadar = layoutStyle === "radar";
  const showTitle = content.showTitle !== false;
  const showSubtitle = content.showSubtitle !== false;
  const showCta = content.showCta !== false;
  const showChronoBadge = content.showChronoBadge === true || (content.showChronoBadge !== false && isRadar);
  const showTopRibbon = content.showTopRibbon === true || (content.showTopRibbon !== false && isRadar);
  const showDecorativeGraphics = content.showDecorativeGraphics === true || (content.showDecorativeGraphics !== false && isRadar);
  const showModeToggle = content.showModeToggle === true || (content.showModeToggle !== false && isRadar);
  const showFootnote = content.showFootnote === true || (content.showFootnote !== false && isRadar);
  const showFooterStrip = content.showFooterStrip === true || (content.showFooterStrip !== false && isRadar);

  // Helper to get friendly section names for dropdown targets
  const getSectionDisplayName = (sec: EventSection) => {
    const secContent = sec.content;
    if (secContent?.title) return secContent.title;
    if (secContent?.heading) return secContent.heading;
    if (secContent?.venueName) return `Venue: ${secContent.venueName}`;
    const catalogItem = SECTION_CATALOG.find((c) => c.type === sec.type);
    if (catalogItem) return catalogItem.name;
    return sec.type.charAt(0).toUpperCase() + sec.type.slice(1);
  };

  // Background color palette swatches
  const bgPalette = [
    { hex: "transparent", label: "None" },
    { hex: "#000000", label: "Black" },
    { hex: "#09090b", label: "Zinc 950" },
    { hex: "#0f172a", label: "Slate 900" },
    { hex: "#064e3b", label: "Forest" },
    { hex: "#0a192f", label: "Navy" },
    { hex: "#1e1b4b", label: "Indigo" },
    { hex: "#ffffff", label: "White" },
    { hex: "#f8fafc", label: "Slate 50" },
    { hex: "#f4f4f5", label: "Zinc 100" },
  ];

  // Filtered presets for modal
  const filteredPresets = presets.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase()));

    const pLayout = p.content?.layoutStyle || "radar";
    const isLight = p.content?.cardBackground === "white";

    if (categoryFilter === "minimal") return matchesSearch && pLayout === "minimal";
    if (categoryFilter === "radar") return matchesSearch && pLayout === "radar";
    if (categoryFilter === "light") return matchesSearch && isLight;
    return matchesSearch;
  });

  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-12 font-sans">
      {/* 1. QUICK TEMPLATES ACCORDION */}
      {presets.length > 0 && (
        <CollapsibleGroup
          title="Quick Templates"
          subtitle={`${presets.length} professionally designed presets`}
          icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
          badge={`${presets.length} PRESETS`}
          defaultOpen={false}
          headerAction={
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="p-1 rounded-md text-zinc-500 hover:text-black hover:bg-zinc-100 transition cursor-pointer"
              title="Expand templates modal (Big Screen)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          }
        >
          {/* Scrollable grid showing first 6 with 2 columns, scroll for rest */}
          <div className="max-h-[260px] overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => {
                const isCurrent =
                  content.title === preset.content?.title &&
                  content.layoutStyle === preset.content?.layoutStyle;
                const isLight = preset.content?.cardBackground === "white";
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => onApplyPreset && onApplyPreset(preset)}
                    className={`group relative p-2.5 rounded-xl border text-left transition-all cursor-pointer shadow-2xs hover:shadow-sm ${
                      isCurrent
                        ? "border-black ring-2 ring-black bg-zinc-50"
                        : "border-zinc-200 bg-white hover:border-zinc-400"
                    }`}
                  >
                    {/* Visual miniature mockup */}
                    <div
                      className={`h-12 w-full rounded-lg mb-2 p-1.5 flex flex-col justify-between border ${
                        isLight
                          ? "bg-white border-zinc-200 text-zinc-800"
                          : "bg-zinc-950 border-zinc-800 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`h-1.5 rounded-full ${
                            isLight ? "w-10 bg-zinc-400" : "w-10 bg-zinc-600"
                          }`}
                        />
                        <div
                          className={`h-1.5 rounded-full ${
                            isLight ? "w-4 bg-black" : "w-4 bg-emerald-500"
                          }`}
                        />
                      </div>
                      {/* Mini 4-digit timer capsules */}
                      <div className="grid grid-cols-4 gap-1">
                        <div className={`h-3 rounded flex items-center justify-center font-mono text-[7px] font-bold ${isLight ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-white"}`}>51</div>
                        <div className={`h-3 rounded flex items-center justify-center font-mono text-[7px] font-bold ${isLight ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-white"}`}>22</div>
                        <div className={`h-3 rounded flex items-center justify-center font-mono text-[7px] font-bold ${isLight ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-white"}`}>06</div>
                        <div className={`h-3 rounded flex items-center justify-center font-mono text-[7px] font-bold ${isLight ? "bg-zinc-100 text-zinc-800" : "bg-zinc-800 text-white"}`}>46</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-[11px] text-zinc-900 truncate">
                        {preset.chipLabel || preset.name.split(" ")[0]}
                      </span>
                      {isCurrent && (
                        <Check className="w-3.5 h-3.5 text-black shrink-0" />
                      )}
                    </div>

                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 border border-zinc-200 shrink-0">
                        {preset.badge || "Preset"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full mt-2.5 py-2 px-3 rounded-xl border border-zinc-200 hover:border-black bg-zinc-50 hover:bg-black hover:text-white text-zinc-800 font-mono text-[11px] font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs group"
          >
            <Maximize2 className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
            <span>View All {presets.length} Templates (Big Screen)</span>
          </button>
        </CollapsibleGroup>
      )}

      {/* 2. LAYOUT & CARD STYLE */}
      <CollapsibleGroup
        title="Layout & Card Theme"
        subtitle={`Layout: ${layoutStyle.toUpperCase()} • Theme: ${content.cardBackground || "dark"}`}
        icon={<Sliders className="w-3.5 h-3.5 text-black" />}
        badge={layoutStyle.toUpperCase()}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Layout Structure
          </span>
          <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
            {[
              { id: "minimal", label: "Minimal" },
              { id: "radar", label: "Radar" },
              { id: "cards", label: "Cards" },
              { id: "split", label: "Split" },
              { id: "compact", label: "Compact" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleUpdate({
                    layoutStyle: item.id as any,
                    // If switching to minimal, automatically default decorative elements off
                    ...(item.id === "minimal"
                      ? {
                          showChronoBadge: false,
                          showDecorativeGraphics: false,
                          showTopRibbon: false,
                          showModeToggle: false,
                          showFootnote: false,
                          showFooterStrip: false,
                        }
                      : {}),
                  })
                }
                className={`py-2 px-1.5 rounded-xl border font-bold text-center transition cursor-pointer ${
                  layoutStyle === item.id
                    ? "bg-black text-white border-black shadow-xs"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-400 mt-1 font-mono">
            {layoutStyle === "minimal" && "Minimal: Clean modern typography with heading, paragraph, time blocks, and button."}
            {layoutStyle === "radar" && "Radar: High-tech chronometer dial with rotating rings and live radar sweep."}
            {layoutStyle === "cards" && "Cards: Elevated distinct cards with subtle drop shadows."}
            {layoutStyle === "split" && "Split: Two-column layout with briefing on the left and countdown on the right."}
            {layoutStyle === "compact" && "Compact: Streamlined low-profile horizontal bar."}
          </p>
        </div>

        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Card Container Theme
          </span>
          <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
            {[
              { id: "dark", label: "Dark" },
              { id: "glass", label: "Glass" },
              { id: "white", label: "White" },
              { id: "custom", label: "Custom" },
            ].map((theme) => {
              const current = content.customCardBgColor
                ? "custom"
                : content.cardBackground || "dark";
              const isActive = current === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    if (theme.id === "custom") {
                      handleUpdate({
                        customCardBgColor: content.customCardBgColor || "#18181b",
                        cardBackground: "dark",
                      });
                    } else {
                      handleUpdate({
                        cardBackground: theme.id as "dark" | "glass" | "white",
                        customCardBgColor: undefined,
                      });
                    }
                  }}
                  className={`py-1.5 px-1.5 rounded-xl border text-center font-bold transition cursor-pointer ${
                    isActive
                      ? "bg-black text-white border-black shadow-xs"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  {theme.label}
                </button>
              );
            })}
          </div>
        </div>
      </CollapsibleGroup>

      {/* 3. BACKGROUND & COLORS */}
      <CollapsibleGroup
        title="Background & Colors"
        subtitle={`Section: ${content.backgroundColor || "Transparent"} • Card: ${content.customCardBgColor || content.cardBackground || "dark"}`}
        icon={<Palette className="w-3.5 h-3.5 text-purple-600" />}
        badge="COLORS"
        defaultOpen={false}
      >
        <div className="space-y-4">
          {/* Section Background Color */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                Section Background Color (Outer)
              </span>
              {content.backgroundColor && content.backgroundColor !== "transparent" && (
                <button
                  type="button"
                  onClick={() => handleUpdate({ backgroundColor: undefined })}
                  className="text-[10px] font-mono text-zinc-400 hover:text-black underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white flex-1 shadow-2xs">
                <input
                  type="color"
                  value={
                    content.backgroundColor && content.backgroundColor !== "transparent"
                      ? content.backgroundColor
                      : "#000000"
                  }
                  onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
                  className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={content.backgroundColor || "transparent"}
                  onChange={(e) => handleUpdate({ backgroundColor: e.target.value })}
                  placeholder="transparent or #hex"
                  className="font-mono text-xs font-bold uppercase text-zinc-800 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {bgPalette.map((item) => (
                <button
                  key={item.hex}
                  type="button"
                  onClick={() =>
                    handleUpdate({
                      backgroundColor: item.hex === "transparent" ? undefined : item.hex,
                    })
                  }
                  style={{
                    backgroundColor: item.hex === "transparent" ? "#ffffff" : item.hex,
                  }}
                  className={`w-6 h-6 rounded-full border transition cursor-pointer relative ${
                    (content.backgroundColor || "transparent").toLowerCase() ===
                    item.hex.toLowerCase()
                      ? "ring-2 ring-black scale-110 border-white shadow"
                      : "border-zinc-300 hover:scale-105"
                  }`}
                  title={`${item.label} (${item.hex})`}
                >
                  {item.hex === "transparent" && (
                    <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-zinc-400 font-mono">
                      /
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Card Container Fill Color */}
          <div className="pt-3 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
                Card Background Fill (Inner)
              </span>
              {content.customCardBgColor && (
                <button
                  type="button"
                  onClick={() => handleUpdate({ customCardBgColor: undefined })}
                  className="text-[10px] font-mono text-zinc-400 hover:text-black underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white flex-1 shadow-2xs">
                <input
                  type="color"
                  value={content.customCardBgColor || "#18181b"}
                  onChange={(e) => handleUpdate({ customCardBgColor: e.target.value })}
                  className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={content.customCardBgColor || "#18181b"}
                  onChange={(e) => handleUpdate({ customCardBgColor: e.target.value })}
                  placeholder="Custom card #hex"
                  className="font-mono text-xs font-bold uppercase text-zinc-800 w-full bg-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </CollapsibleGroup>

      {/* 4. TIMER TARGET DATE & TIME UNITS */}
      <CollapsibleGroup
        title="Timer Target Date & Units"
        subtitle={formattedDate}
        icon={<Clock className="w-3.5 h-3.5 text-indigo-500" />}
        badge="TARGET"
        defaultOpen={true}
      >
        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
            Target Kickoff Date & Time
          </span>
          <input
            type="datetime-local"
            value={
              content.targetDate
                ? content.targetDate.slice(0, 16)
                : eventStartDate
                ? eventStartDate.slice(0, 16)
                : ""
            }
            onChange={(e) =>
              handleUpdate({ targetDate: new Date(e.target.value).toISOString() })
            }
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-semibold bg-white focus:outline-none focus:border-black font-mono"
          />
          <p className="text-[10px] text-zinc-400 mt-1 font-mono">
            Defaults to the global event start date if left unchanged.
          </p>
        </div>

        {/* Display Mode: 4 units vs total hours */}
        <div className="pt-2 border-t border-zinc-100">
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Display Mode
          </span>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[10px]">
            {[
              { id: "standard", label: "Days · Hrs · Min · Sec" },
              { id: "total-hours", label: "Total Hours Only" },
            ].map((m) => {
              const active = (content.defaultViewMode === "total-hours" ? "total-hours" : "standard") === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleUpdate({ defaultViewMode: m.id as "standard" | "total-hours" })}
                  className={`py-1.5 rounded-lg border text-center font-bold transition cursor-pointer ${
                    active
                      ? "bg-black text-white border-black shadow-2xs"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Units Visibility Toggles */}
        <div className="pt-2 border-t border-zinc-100">
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Displayed Time Units
          </span>
          <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
            {[
              { id: "showDays", label: "Days", active: content.showDays !== false },
              { id: "showHours", label: "Hours", active: content.showHours !== false },
              { id: "showMinutes", label: "Minutes", active: content.showMinutes !== false },
              { id: "showSeconds", label: "Seconds", active: content.showSeconds !== false },
            ].map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleUpdate({ [u.id]: !u.active })}
                className={`py-1.5 rounded-lg border text-center font-bold transition cursor-pointer ${
                  u.active
                    ? "bg-black text-white border-black shadow-2xs"
                    : "bg-zinc-100 text-zinc-400 border-zinc-200"
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>

        {/* Expired Message */}
        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
            Expired Message (Post-Deadline)
          </span>
          <input
            type="text"
            value={content.expiredMessage || ""}
            onChange={(e) => handleUpdate({ expiredMessage: e.target.value })}
            placeholder="e.g. The transition window has concluded."
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>

      {/* 5. TITLE & SUBTITLE / PARAGRAPH */}
      <CollapsibleGroup
        title="Title & Subtitle (Copy)"
        subtitle={content.title || "Heading & Paragraph"}
        icon={<Type className="w-3.5 h-3.5 text-blue-500" />}
        badge="TEXT"
        defaultOpen={true}
      >
        {/* Heading Title with Show/Hide toggle */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
              Heading Title
            </span>
            <button
              type="button"
              onClick={() => handleUpdate({ showTitle: !showTitle })}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 border cursor-pointer ${
                showTitle
                  ? "bg-black text-white border-black"
                  : "bg-zinc-100 text-zinc-500 border-zinc-200"
              }`}
            >
              {showTitle ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{showTitle ? "Show" : "Hide"}</span>
            </button>
          </div>
          {showTitle && (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleUpdate({ title: e.target.value })}
              placeholder="e.g. CDM Registry Cancellations Cease on 25 Nov 2026"
              className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
            />
          )}
        </div>

        {/* Subtitle / Paragraph with Show/Hide toggle */}
        <div className="space-y-1.5 pt-2 border-t border-zinc-100">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-zinc-500 font-mono font-semibold uppercase">
              Subtitle / Paragraph
            </span>
            <button
              type="button"
              onClick={() => handleUpdate({ showSubtitle: !showSubtitle })}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1 border cursor-pointer ${
                showSubtitle
                  ? "bg-black text-white border-black"
                  : "bg-zinc-100 text-zinc-500 border-zinc-200"
              }`}
            >
              {showSubtitle ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{showSubtitle ? "Show" : "Hide"}</span>
            </button>
          </div>
          {showSubtitle && (
            <AutoResizeTextarea
              minRows={2}
              value={content.subtitle || ""}
              onChange={(e) => handleUpdate({ subtitle: e.target.value })}
              placeholder="e.g. The window to safeguard and re-issue your legacy CDM credits is narrowing rapidly."
              className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
            />
          )}
        </div>
      </CollapsibleGroup>

      {/* 6. CALL TO ACTION BUTTON */}
      <CollapsibleGroup
        title="CTA Button"
        subtitle={!showCta ? "Button Hidden" : content.ctaText || "Button"}
        icon={<ExternalLink className="w-3.5 h-3.5 text-emerald-500" />}
        badge={!showCta ? "HIDDEN" : "ACTIVE"}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate({ showCta: !showCta });
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer border ${
              showCta
                ? "bg-black text-white border-black"
                : "bg-zinc-100 text-zinc-600 border-zinc-300 hover:bg-zinc-200"
            }`}
          >
            {showCta ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{showCta ? "Show" : "Hide"}</span>
          </button>
        }
      >
        {!showCta ? (
          <div className="p-3 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl text-center">
            <p className="text-[11px] text-zinc-500 font-mono mb-2">
              CTA Button is currently hidden.
            </p>
            <button
              type="button"
              onClick={() => handleUpdate({ showCta: true })}
              className="px-3 py-1.5 rounded-lg bg-black text-white font-mono text-xs font-bold transition hover:bg-zinc-800 cursor-pointer shadow-2xs"
            >
              Show CTA Button
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                Button Label
              </span>
              <input
                type="text"
                value={content.ctaText || ""}
                onChange={(e) => handleUpdate({ ctaText: e.target.value })}
                placeholder="e.g. Register for Briefing"
                className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                Destination Target
              </span>
              <div className="grid grid-cols-2 gap-1 mb-2 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => handleUpdate({ ctaTargetType: "external" })}
                  className={`py-1.5 px-2 rounded-lg border font-bold text-center transition cursor-pointer ${
                    (content.ctaTargetType || "external") === "external"
                      ? "bg-black text-white border-black shadow-xs"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  External URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const defaultSec = sections && sections.length > 0 ? sections[0].id : "";
                    handleUpdate({
                      ctaTargetType: "section",
                      ctaSectionTarget: content.ctaSectionTarget || defaultSec,
                      ctaLink: `#${content.ctaSectionTarget || defaultSec}`,
                    });
                  }}
                  className={`py-1.5 px-2 rounded-lg border font-bold text-center transition cursor-pointer ${
                    content.ctaTargetType === "section"
                      ? "bg-black text-white border-black shadow-xs"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  Jump to Section
                </button>
              </div>

              {content.ctaTargetType === "section" ? (
                <select
                  value={content.ctaSectionTarget || ""}
                  onChange={(e) =>
                    handleUpdate({
                      ctaSectionTarget: e.target.value,
                      ctaLink: `#${e.target.value}`,
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white font-mono text-xs focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="">Select a section to jump to...</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {getSectionDisplayName(sec)} ({sec.type})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-zinc-200">
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <input
                    type="text"
                    value={content.ctaLink || ""}
                    onChange={(e) => handleUpdate({ ctaLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full text-xs font-mono bg-transparent outline-none"
                  />
                </div>
              )}
              <p className="text-[10px] text-zinc-400 mt-1 font-mono">
                {content.ctaTargetType === "section"
                  ? "Smooth-scrolls to the selected section."
                  : "External links always open in a new tab."}
              </p>
            </div>
          </div>
        )}
      </CollapsibleGroup>

      {/* 7. EXTRA ELEMENTS (Editable & Hide/Show Toggles) */}
      <CollapsibleGroup
        title="Extra Elements & Badges"
        subtitle="Top ribbon, radar graphics, pills & footnote"
        icon={<Layers className="w-3.5 h-3.5 text-amber-600" />}
        badge="EXTRAS"
        defaultOpen={false}
      >
        <div className="space-y-3.5">
          {/* Top Chrono Badge */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200 bg-white">
            <div>
              <span className="font-semibold text-[11px] text-zinc-800 font-mono block">
                Chronometer Crown Badge
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Top circular ticking second-hand jewel
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleUpdate({ showChronoBadge: !showChronoBadge })}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                showChronoBadge
                  ? "bg-black text-white"
                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
              }`}
            >
              {showChronoBadge ? "Visible" : "Hidden"}
            </button>
          </div>

          {/* Top Status Monospace Ribbon */}
          <div className="p-2.5 rounded-xl border border-zinc-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[11px] text-zinc-800 font-mono block">
                  Top Status Monospace Ribbon
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Metadata tag bar above the title
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleUpdate({ showTopRibbon: !showTopRibbon })}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  showTopRibbon
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                }`}
              >
                {showTopRibbon ? "Visible" : "Hidden"}
              </button>
            </div>

            {showTopRibbon && (
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
                <div>
                  <span className="block text-[9px] text-zinc-400 font-mono mb-1 uppercase">Left Text</span>
                  <input
                    type="text"
                    value={content.topRibbonLeft || "MRV · VERIFIED · ARTICLE 6 · READINESS FRAMEWORK"}
                    onChange={(e) => handleUpdate({ topRibbonLeft: e.target.value })}
                    className="w-full px-2 py-1 text-[11px] font-mono border border-zinc-200 rounded-lg bg-zinc-50"
                  />
                </div>
                <div>
                  <span className="block text-[9px] text-zinc-400 font-mono mb-1 uppercase">Right Text</span>
                  <input
                    type="text"
                    value={content.topRibbonRight || "CLIMATE FINANCE: ACTIVE"}
                    onChange={(e) => handleUpdate({ topRibbonRight: e.target.value })}
                    className="w-full px-2 py-1 text-[11px] font-mono border border-zinc-200 rounded-lg bg-zinc-50"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Decorative Radar & Waveforms */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-200 bg-white">
            <div>
              <span className="font-semibold text-[11px] text-zinc-800 font-mono block">
                Decorative Radar & Waveforms
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Rotating chronometer dial & timeline arcs
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleUpdate({ showDecorativeGraphics: !showDecorativeGraphics })}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                showDecorativeGraphics
                  ? "bg-black text-white"
                  : "bg-zinc-100 text-zinc-500 border border-zinc-200"
              }`}
            >
              {showDecorativeGraphics ? "Visible" : "Hidden"}
            </button>
          </div>

          {/* Time View Mode Switcher Pills */}
          <div className="p-2.5 rounded-xl border border-zinc-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[11px] text-zinc-800 font-mono block">
                  Time View Mode Toggle Pills
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Days vs Hour Counter switcher buttons
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleUpdate({ showModeToggle: !showModeToggle })}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  showModeToggle
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                }`}
              >
                {showModeToggle ? "Visible" : "Hidden"}
              </button>
            </div>

            <div>
              <span className="block text-[9px] text-zinc-400 font-mono mb-1 uppercase">Default View Mode</span>
              <div className="grid grid-cols-2 gap-1 font-mono text-[10px]">
                <button
                  type="button"
                  onClick={() => handleUpdate({ defaultViewMode: "standard" })}
                  className={`py-1 rounded border text-center font-bold transition cursor-pointer ${
                    (content.defaultViewMode || "standard") === "standard"
                      ? "bg-black text-white border-black"
                      : "bg-white text-zinc-600 border-zinc-200"
                  }`}
                >
                  Standard (Days)
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate({ defaultViewMode: "total-hours" })}
                  className={`py-1 rounded border text-center font-bold transition cursor-pointer ${
                    content.defaultViewMode === "total-hours"
                      ? "bg-black text-white border-black"
                      : "bg-white text-zinc-600 border-zinc-200"
                  }`}
                >
                  Hour Counter
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footnote Note */}
          <div className="p-2.5 rounded-xl border border-zinc-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[11px] text-zinc-800 font-mono block">
                  Bottom Footnote Note
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Microcopy text below the CTA button
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleUpdate({ showFootnote: !showFootnote })}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  showFootnote
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                }`}
              >
                {showFootnote ? "Visible" : "Hidden"}
              </button>
            </div>

            {showFootnote && (
              <input
                type="text"
                value={content.footnote || "Countdown to CDM Registry Closure: 31 December 2026"}
                onChange={(e) => handleUpdate({ footnote: e.target.value })}
                className="w-full px-2 py-1 text-xs font-mono border border-zinc-200 rounded-lg bg-zinc-50"
              />
            )}
          </div>

          {/* Bottom Footer Brand Strip */}
          <div className="p-2.5 rounded-xl border border-zinc-200 bg-white space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[11px] text-zinc-800 font-mono block">
                  Bottom Footer Brand Strip
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Organization & domain metadata footer
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleUpdate({ showFooterStrip: !showFooterStrip })}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  showFooterStrip
                    ? "bg-black text-white"
                    : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                }`}
              >
                {showFooterStrip ? "Visible" : "Hidden"}
              </button>
            </div>

            {showFooterStrip && (
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-zinc-100">
                <div>
                  <span className="block text-[9px] text-zinc-400 font-mono mb-1 uppercase">Left Text</span>
                  <input
                    type="text"
                    value={content.footerStripLeft || "UNMAI CARBON · SINGAPORE"}
                    onChange={(e) => handleUpdate({ footerStripLeft: e.target.value })}
                    className="w-full px-2 py-1 text-[11px] font-mono border border-zinc-200 rounded-lg bg-zinc-50"
                  />
                </div>
                <div>
                  <span className="block text-[9px] text-zinc-400 font-mono mb-1 uppercase">Right Text</span>
                  <input
                    type="text"
                    value={content.footerStripRight || "UNMAICARBON.EARTH"}
                    onChange={(e) => handleUpdate({ footerStripRight: e.target.value })}
                    className="w-full px-2 py-1 text-[11px] font-mono border border-zinc-200 rounded-lg bg-zinc-50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CollapsibleGroup>

      {/* --- 8. BIG SCREEN / FULLSCREEN MODAL (PORTAL) --- */}
      {isModalOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="p-5 sm:p-6 border-b border-zinc-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800">
                      <Clock className="w-4 h-4" />
                    </span>
                    <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                      Countdown Timer Presets
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                      {presets.length} Presets
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-normal">
                    Select from minimal modern layouts, high-tech chronometer dials, hour counters, or editorial split views.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition cursor-pointer border border-zinc-200"
                    title="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Filters Bar: Search & Category Tabs */}
              <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search templates by title, theme, or keyword..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-zinc-200 bg-white text-xs font-mono focus:outline-none focus:border-black"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
                  {[
                    { id: "all", label: "All Layouts" },
                    { id: "minimal", label: "Minimal" },
                    { id: "radar", label: "Tech & Radar" },
                    { id: "light", label: "Editorial Light" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setCategoryFilter(f.id)}
                      className={`px-3 py-1.5 rounded-xl border font-bold transition cursor-pointer whitespace-nowrap ${
                        categoryFilter === f.id
                          ? "bg-black text-white border-black shadow-xs"
                          : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Presets Grid */}
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                {filteredPresets.length === 0 ? (
                  <div className="text-center py-16 text-zinc-400 font-mono">
                    <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No countdown presets match your filter.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setCategoryFilter("all");
                      }}
                      className="mt-2 text-xs text-black underline font-bold"
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredPresets.map((preset) => {
                      const isCurrent =
                        content.title === preset.content?.title &&
                        content.layoutStyle === preset.content?.layoutStyle;
                      const isLight = preset.content?.cardBackground === "white";

                      return (
                        <div
                          key={preset.id}
                          className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden bg-white shadow-2xs hover:shadow-lg ${
                            isCurrent
                              ? "border-black ring-2 ring-black"
                              : "border-zinc-200 hover:border-zinc-400"
                          }`}
                        >
                          {/* Card Preview Header */}
                          <div
                            className={`p-4 border-b transition ${
                              isLight
                                ? "bg-zinc-50 text-zinc-900 border-zinc-200"
                                : "bg-zinc-950 text-white border-zinc-800"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                  isLight
                                    ? "bg-white text-zinc-700 border border-zinc-200 shadow-2xs"
                                    : "bg-zinc-800 text-zinc-300 border border-zinc-700"
                                }`}
                              >
                                {preset.content?.layoutStyle || "Timer"}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded text-emerald-400">
                                {preset.badge}
                              </span>
                            </div>

                            {/* Simulated mini timer */}
                            <div className="p-2.5 rounded-xl border border-zinc-200/30 space-y-2 bg-black/20">
                              <div className="grid grid-cols-4 gap-1">
                                <div className="h-6 rounded bg-white/10 flex flex-col items-center justify-center text-[10px] font-mono font-bold">51</div>
                                <div className="h-6 rounded bg-white/10 flex flex-col items-center justify-center text-[10px] font-mono font-bold">22</div>
                                <div className="h-6 rounded bg-white/10 flex flex-col items-center justify-center text-[10px] font-mono font-bold">06</div>
                                <div className="h-6 rounded bg-white/10 flex flex-col items-center justify-center text-[10px] font-mono font-bold">46</div>
                              </div>
                              <div className="h-4 rounded-full bg-white/20 w-3/4 mx-auto" />
                            </div>
                          </div>

                          {/* Card Content Info */}
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-bold text-sm text-zinc-900 mb-1">
                                {preset.name}
                              </h3>
                              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 mb-3">
                                {preset.description}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                onApplyPreset && onApplyPreset(preset);
                                setIsModalOpen(false);
                              }}
                              className={`w-full py-2 px-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                                isCurrent
                                  ? "bg-zinc-100 text-zinc-900 border border-zinc-300 hover:bg-zinc-200"
                                  : "bg-black text-white hover:bg-zinc-800 shadow-sm"
                              }`}
                            >
                              {isCurrent ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-black" />
                                  <span>Applied Template</span>
                                </>
                              ) : (
                                <span>Apply Preset</span>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500 font-mono shrink-0">
                <span>
                  Tip: Applying a preset configures layout, time units, urgency copy, and element visibility. You can customize any field afterwards.
                </span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800 font-bold transition cursor-pointer shadow-2xs"
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
