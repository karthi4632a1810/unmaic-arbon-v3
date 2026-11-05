import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Table as TableIcon,
  Plus,
  Trash2,
  List,
  Grid3X3,
  Sliders,
  Type,
  Link as LinkIcon,
  Sparkles,
  Maximize2,
  X,
  Search,
  Check,
  Eye,
  EyeOff,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Copy,
  ExternalLink,
  Palette,
} from "lucide-react";
import type {
  TableContent,
  TableRow,
  TableColumn,
  EventSection,
} from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";
import {
  SECTION_PRESETS,
  type SectionPreset,
} from "../../../registry/sectionPresets";
import { SECTION_CATALOG } from "../../../registry/sectionCatalog";

interface TableEditorProps {
  content: TableContent;
  onChange: (updated: TableContent) => void;
  presets?: SectionPreset[];
  onApplyPreset?: (preset: SectionPreset) => void;
  sections?: EventSection[];
}

export const TableEditor: React.FC<TableEditorProps> = ({
  content,
  onChange,
  presets = SECTION_PRESETS.table || [],
  onApplyPreset,
  sections = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [draggedRowIndex, setDraggedRowIndex] = useState<number | null>(null);
  const [dragOverRowIndex, setDragOverRowIndex] = useState<number | null>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleUpdate = (fields: Partial<TableContent>) => {
    onChange({ ...content, ...fields });
  };

  const isKeyValue = (content.layoutStyle || "key-value") === "key-value";
  const showHeader = content.showHeader !== false;
  const showFooter = content.showFooter !== false;

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

  // --- Rows handling ---
  const handleRowChange = (idx: number, updates: Partial<TableRow>) => {
    const newRows = [...(content.rows || [])];
    newRows[idx] = { ...newRows[idx], ...updates };
    handleUpdate({ rows: newRows });
  };

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: "row_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 5),
      label: isKeyValue ? "New Label" : "",
      value: isKeyValue ? "New detail value or note" : "",
      targetType: "external",
    };
    handleUpdate({ rows: [...(content.rows || []), newRow] });
  };

  const handleDuplicateRow = (idx: number) => {
    const original = content.rows?.[idx];
    if (!original) return;
    const duplicated: TableRow = {
      ...original,
      id: "row_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 5),
      label: original.label ? `${original.label} (Copy)` : undefined,
    };
    const newRows = [...(content.rows || [])];
    newRows.splice(idx + 1, 0, duplicated);
    handleUpdate({ rows: newRows });
  };

  const handleRemoveRow = (idx: number) => {
    const newRows = (content.rows || []).filter((_, i) => i !== idx);
    handleUpdate({ rows: newRows });
  };

  const handleMoveRow = (idx: number, direction: "up" | "down") => {
    const newRows = [...(content.rows || [])];
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newRows.length) return;
    const [moved] = newRows.splice(idx, 1);
    newRows.splice(targetIdx, 0, moved);
    handleUpdate({ rows: newRows });
  };

  // --- Drag and Drop handlers ---
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedRowIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverRowIndex !== index) {
      setDragOverRowIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedRowIndex === null || draggedRowIndex === targetIndex) {
      setDraggedRowIndex(null);
      setDragOverRowIndex(null);
      return;
    }
    const newRows = [...(content.rows || [])];
    const [movedItem] = newRows.splice(draggedRowIndex, 1);
    newRows.splice(targetIndex, 0, movedItem);
    handleUpdate({ rows: newRows });
    setDraggedRowIndex(null);
    setDragOverRowIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedRowIndex(null);
    setDragOverRowIndex(null);
  };

  // --- Columns handling (for grid-table mode) ---
  const handleColumnChange = (idx: number, updates: Partial<TableColumn>) => {
    const newCols = [...(content.columns || [])];
    newCols[idx] = { ...newCols[idx], ...updates };
    handleUpdate({ columns: newCols });
  };

  const handleAddColumn = () => {
    const colKey = "col_" + Date.now().toString(36);
    const newCol: TableColumn = {
      id: colKey,
      key: colKey,
      label: "New Column",
    };
    handleUpdate({ columns: [...(content.columns || []), newCol] });
  };

  const handleRemoveColumn = (idx: number) => {
    const newCols = (content.columns || []).filter((_, i) => i !== idx);
    handleUpdate({ columns: newCols });
  };

  // Background color palette swatches
  const bgPalette = [
    { hex: "transparent", label: "None" },
    { hex: "#000000", label: "Black" },
    { hex: "#09090b", label: "Zinc 950" },
    { hex: "#0f172a", label: "Slate 900" },
    { hex: "#0a192f", label: "Navy" },
    { hex: "#064e3b", label: "Forest" },
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

    const isKV = (p.content?.layoutStyle || "key-value") === "key-value";
    const isDark = p.content?.cardBackground === "dark" || p.content?.cardBackground === "glass";

    if (categoryFilter === "key-value") return matchesSearch && isKV;
    if (categoryFilter === "grid") return matchesSearch && !isKV;
    if (categoryFilter === "dark") return matchesSearch && isDark;
    return matchesSearch;
  });

  return (
    <div className="space-y-3.5 text-xs text-zinc-900 font-sans pb-12">
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
                  content.heading === preset.content?.heading &&
                  content.layoutStyle === preset.content?.layoutStyle;
                const isDark =
                  preset.content?.cardBackground === "dark" ||
                  preset.content?.cardBackground === "glass";
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
                        isDark
                          ? "bg-zinc-950 border-zinc-800 text-zinc-300"
                          : "bg-zinc-100 border-zinc-200 text-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`h-1.5 rounded-full ${
                            isDark ? "w-10 bg-zinc-600" : "w-10 bg-zinc-400"
                          }`}
                        />
                        <div
                          className={`h-1.5 rounded-full ${
                            isDark ? "w-4 bg-emerald-500" : "w-4 bg-black"
                          }`}
                        />
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`h-1 rounded-full ${
                            isDark ? "w-full bg-zinc-800" : "w-full bg-zinc-300"
                          }`}
                        />
                        <div
                          className={`h-1 rounded-full ${
                            isDark ? "w-4/5 bg-zinc-800" : "w-4/5 bg-zinc-200"
                          }`}
                        />
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
                        {preset.badge || (isDark ? "Dark" : "Light")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fullscreen / Big Screen Modal trigger button */}
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

      {/* 2. TABLE LAYOUT & CONTAINER STYLE */}
      <CollapsibleGroup
        title="Table Layout & Style"
        subtitle={isKeyValue ? "Details Block (Key-Value)" : "Multi-Column Grid Table"}
        icon={<Sliders className="w-3.5 h-3.5 text-black" />}
        badge={isKeyValue ? "DETAILS" : "MULTI-COL"}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Layout Format
          </span>
          <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => handleUpdate({ layoutStyle: "key-value" })}
              className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition cursor-pointer ${
                isKeyValue
                  ? "bg-black text-white border-black shadow-xs"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Details Block</span>
            </button>
            <button
              type="button"
              onClick={() => handleUpdate({ layoutStyle: "grid-table" })}
              className={`py-2 px-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-bold transition cursor-pointer ${
                !isKeyValue
                  ? "bg-black text-white border-black shadow-xs"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Multi-Column</span>
            </button>
          </div>
        </div>

        <div>
          <span className="block text-[10px] text-zinc-500 font-mono mb-1.5 font-semibold uppercase">
            Card Container Theme
          </span>
          <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
            {[
              { id: "white", label: "White" },
              { id: "dark", label: "Dark" },
              { id: "glass", label: "Glass" },
              { id: "custom", label: "Custom" },
            ].map((theme) => {
              const current = content.customCardBgColor
                ? "custom"
                : content.cardBackground || "white";
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
                        cardBackground: theme.id as "white" | "dark" | "glass",
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

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-zinc-200">
          <div>
            <span className="text-[11px] font-semibold text-zinc-800 font-mono block">
              Alternating Striped Rows
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">
              Adds subtle zebra contrast to alternate rows
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleUpdate({ striped: !content.striped })}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
              content.striped !== false
                ? "bg-black text-white shadow-2xs"
                : "bg-zinc-100 text-zinc-600 border border-zinc-200"
            }`}
          >
            {content.striped !== false ? "Enabled" : "Disabled"}
          </button>
        </div>
      </CollapsibleGroup>

      {/* 3. BACKGROUND & COLORS */}
      <CollapsibleGroup
        title="Background & Colors"
        subtitle={`Section: ${content.backgroundColor || "Transparent"} • Card: ${content.customCardBgColor || content.cardBackground || "white"}`}
        icon={<Palette className="w-3.5 h-3.5 text-purple-600" />}
        badge="COLORS"
        defaultOpen={true}
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
                      : "#ffffff"
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

            {/* Quick color swatches */}
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
                  Reset to theme
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 bg-white flex-1 shadow-2xs">
                <input
                  type="color"
                  value={
                    content.customCardBgColor ||
                    (content.cardBackground === "dark" ? "#18181b" : "#ffffff")
                  }
                  onChange={(e) => handleUpdate({ customCardBgColor: e.target.value })}
                  className="w-7 h-7 rounded-lg border-0 cursor-pointer p-0 shrink-0"
                />
                <input
                  type="text"
                  value={
                    content.customCardBgColor ||
                    (content.cardBackground === "dark" ? "#18181b" : "#ffffff")
                  }
                  onChange={(e) => handleUpdate({ customCardBgColor: e.target.value })}
                  placeholder="Custom card #hex"
                  className="font-mono text-xs font-bold uppercase text-zinc-800 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Quick swatches for card fill */}
            <div className="flex items-center gap-1.5 mt-2 flex-wrap">
              {[
                { hex: "#ffffff", label: "White" },
                { hex: "#18181b", label: "Zinc 900" },
                { hex: "#09090b", label: "Zinc 950" },
                { hex: "#0f172a", label: "Slate 900" },
                { hex: "#064e3b", label: "Forest" },
                { hex: "#0a192f", label: "Navy" },
                { hex: "#1e1b4b", label: "Indigo" },
              ].map((item) => (
                <button
                  key={item.hex}
                  type="button"
                  onClick={() => handleUpdate({ customCardBgColor: item.hex })}
                  style={{ backgroundColor: item.hex }}
                  className={`w-6 h-6 rounded-full border transition cursor-pointer ${
                    (content.customCardBgColor || "").toLowerCase() === item.hex.toLowerCase()
                      ? "ring-2 ring-black scale-110 border-white shadow"
                      : "border-zinc-300 hover:scale-105"
                  }`}
                  title={`${item.label} (${item.hex})`}
                />
              ))}
            </div>
          </div>
        </div>
      </CollapsibleGroup>

      {/* 4. SECTION HEADER (Show / Hide Toggle & Fields) */}
      <CollapsibleGroup
        title="Section Header"
        subtitle={
          !showHeader
            ? "Header Hidden"
            : content.heading || "Webinar Details Block"
        }
        icon={<Type className="w-3.5 h-3.5 text-blue-500" />}
        badge={!showHeader ? "HIDDEN" : "VISIBLE"}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate({ showHeader: !showHeader });
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer border ${
              showHeader
                ? "bg-black text-white border-black"
                : "bg-zinc-100 text-zinc-600 border-zinc-300 hover:bg-zinc-200"
            }`}
            title={showHeader ? "Hide section header" : "Show section header"}
          >
            {showHeader ? (
              <>
                <Eye className="w-3 h-3" />
                <span>Show</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" />
                <span>Hide</span>
              </>
            )}
          </button>
        }
      >
        {!showHeader ? (
          <div className="p-3 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl text-center">
            <p className="text-[11px] text-zinc-500 font-mono mb-2">
              The section header (badge, title, subtitle) is currently hidden.
            </p>
            <button
              type="button"
              onClick={() => handleUpdate({ showHeader: true })}
              className="px-3 py-1.5 rounded-lg bg-black text-white font-mono text-xs font-bold transition hover:bg-zinc-800 cursor-pointer shadow-2xs"
            >
              Show Section Header
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                Eyebrow / Badge (Optional)
              </span>
              <input
                type="text"
                value={content.badge || ""}
                onChange={(e) => handleUpdate({ badge: e.target.value })}
                placeholder="e.g. LOGISTICS & SPECIFICATIONS"
                className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-mono text-xs bg-white focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                Main Heading *
              </span>
              <input
                type="text"
                value={content.heading || ""}
                onChange={(e) => handleUpdate({ heading: e.target.value })}
                placeholder="e.g. Webinar Details Block"
                className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                Subtitle / Description (Optional)
              </span>
              <input
                type="text"
                value={content.subtitle || ""}
                onChange={(e) => handleUpdate({ subtitle: e.target.value })}
                placeholder="e.g. Key session information, timings, and platform access instructions"
                className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
              />
            </div>
          </div>
        )}
      </CollapsibleGroup>

      {/* 5. TABLE FOOTER & TEAMS MEETING ACTION (User Request: "make that last join metting inbteams that part where can i it should have thge option for hide and show we can use it or and like that table footer") */}
      <CollapsibleGroup
        title="Table Footer & Action Bar"
        subtitle={
          !showFooter
            ? "Footer Hidden"
            : content.ctaText
            ? `CTA: ${content.ctaText}`
            : "Visible"
        }
        icon={<LinkIcon className="w-3.5 h-3.5 text-emerald-600" />}
        badge={!showFooter ? "HIDDEN" : "VISIBLE"}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleUpdate({ showFooter: !showFooter });
            }}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer border ${
              showFooter
                ? "bg-black text-white border-black"
                : "bg-zinc-100 text-zinc-600 border-zinc-300 hover:bg-zinc-200"
            }`}
            title={showFooter ? "Hide table footer" : "Show table footer"}
          >
            {showFooter ? (
              <>
                <Eye className="w-3 h-3" />
                <span>Show</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3" />
                <span>Hide</span>
              </>
            )}
          </button>
        }
      >
        {!showFooter ? (
          <div className="p-3 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl text-center">
            <p className="text-[11px] text-zinc-500 font-mono mb-2">
              The bottom footer bar (&quot;Join Meeting in Teams&quot; and footnote note) is currently hidden.
            </p>
            <button
              type="button"
              onClick={() => handleUpdate({ showFooter: true })}
              className="px-3 py-1.5 rounded-lg bg-black text-white font-mono text-xs font-bold transition hover:bg-zinc-800 cursor-pointer shadow-2xs"
            >
              Show Table Footer
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="block text-[10px] text-zinc-500 font-mono mb-1 font-semibold uppercase">
                Footnote Note Text
              </span>
              <input
                type="text"
                value={content.footnote || ""}
                onChange={(e) => handleUpdate({ footnote: e.target.value })}
                placeholder="e.g. Online session conducted via Microsoft Teams. Registration is complimentary."
                className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black font-sans"
              />
            </div>

            <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2.5">
              <span className="block text-[10px] text-zinc-700 font-mono font-bold uppercase">
                Footer Action Button / Link
              </span>

              <div>
                <span className="block text-[9px] text-zinc-500 font-mono mb-1">
                  Button Text
                </span>
                <input
                  type="text"
                  value={content.ctaText || ""}
                  onChange={(e) => handleUpdate({ ctaText: e.target.value })}
                  placeholder="e.g. Join Meeting in Teams"
                  className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
                />
              </div>

              {/* Action Destination Selector: External URL vs Jump to Section */}
              <div>
                <span className="block text-[9px] text-zinc-500 font-mono mb-1">
                  Destination Target
                </span>
                <div className="grid grid-cols-2 gap-1 mb-2 font-mono text-[10px]">
                  <button
                    type="button"
                    onClick={() => handleUpdate({ footerTargetType: "external" })}
                    className={`py-1.5 px-2 rounded-lg border font-bold text-center transition cursor-pointer ${
                      (content.footerTargetType || "external") === "external"
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
                        footerTargetType: "section",
                        footerSectionTarget: content.footerSectionTarget || defaultSec,
                        ctaLink: `#${content.footerSectionTarget || defaultSec}`,
                      });
                    }}
                    className={`py-1.5 px-2 rounded-lg border font-bold text-center transition cursor-pointer ${
                      content.footerTargetType === "section"
                        ? "bg-black text-white border-black shadow-xs"
                        : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300"
                    }`}
                  >
                    Jump to Section
                  </button>
                </div>

                {content.footerTargetType === "section" ? (
                  <div>
                    <select
                      value={content.footerSectionTarget || ""}
                      onChange={(e) =>
                        handleUpdate({
                          footerSectionTarget: e.target.value,
                          ctaLink: `#${e.target.value}`,
                        })
                      }
                      className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 bg-white font-mono text-xs focus:outline-none focus:border-black cursor-pointer"
                    >
                      <option value="">Select a Section to scroll to...</option>
                      {sections.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          {getSectionDisplayName(sec)} ({sec.type})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-lg border border-zinc-200">
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <input
                      type="text"
                      value={content.ctaLink || ""}
                      onChange={(e) => handleUpdate({ ctaLink: e.target.value })}
                      placeholder="e.g. https://teams.microsoft.com/l/meetup-join/..."
                      className="w-full text-xs font-mono bg-transparent outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CollapsibleGroup>

      {/* 6. COLUMNS CONFIG (If in Grid Table Mode) */}
      {!isKeyValue && (
        <CollapsibleGroup
          title="Columns"
          subtitle={`${content.columns?.length || 0} column(s)`}
          icon={<Grid3X3 className="w-3.5 h-3.5 text-indigo-500" />}
          badge={`${content.columns?.length || 0} COLS`}
          defaultOpen={true}
          headerAction={
            <button
              type="button"
              onClick={handleAddColumn}
              className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          }
        >
          <div className="space-y-1.5">
            {content.columns?.map((col, idx) => (
              <div key={col.id || idx} className="flex items-center gap-1.5">
                <input
                  type="text"
                  value={col.label}
                  onChange={(e) => handleColumnChange(idx, { label: e.target.value })}
                  className="flex-1 px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-white font-mono"
                  placeholder="Column Name"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveColumn(idx)}
                  className="p-1 text-zinc-400 hover:text-rose-600 cursor-pointer"
                  title="Remove column"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </CollapsibleGroup>
      )}

      {/* 7. ROWS & FIELDS - DRAG & DROP REORDERING */}
      <CollapsibleGroup
        title={isKeyValue ? "Detail Rows & Fields" : "Table Rows & Data"}
        subtitle={`${content.rows?.length || 0} item${
          content.rows?.length === 1 ? "" : "s"
        } • Drag & Drop to reorder`}
        icon={<TableIcon className="w-3.5 h-3.5 text-emerald-500" />}
        badge={`${content.rows?.length || 0} ROWS`}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={handleAddRow}
            className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add Row</span>
          </button>
        }
      >
        <div className="space-y-2.5">
          {(!content.rows || content.rows.length === 0) && (
            <div className="text-center py-6 border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50">
              <TableIcon className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
              <p className="text-zinc-500 text-xs font-mono font-medium">
                No rows in table yet.
              </p>
              <button
                type="button"
                onClick={handleAddRow}
                className="mt-3 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-mono font-bold hover:bg-zinc-800 transition cursor-pointer"
              >
                + Add First Row
              </button>
            </div>
          )}

          {content.rows?.map((row, idx) => {
            const isDragging = draggedRowIndex === idx;
            const isDragOver = dragOverRowIndex === idx;

            return (
              <div
                key={row.id || idx}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={(e) => handleDrop(e, idx)}
                onDragEnd={handleDragEnd}
                className={`p-3 rounded-2xl border transition-all duration-150 bg-white ${
                  isDragging
                    ? "opacity-40 scale-[0.98] border-dashed border-zinc-400"
                    : isDragOver
                    ? "border-black ring-2 ring-black/80 shadow-md translate-y-0.5"
                    : "border-zinc-200/90 shadow-2xs hover:border-zinc-300"
                }`}
              >
                {/* Row Header Bar: Drag Handle, Number, Up/Down, Duplicate, Delete */}
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100">
                  <div className="flex items-center gap-1.5">
                    {/* Drag Handle */}
                    <div
                      className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-black p-0.5 rounded transition"
                      title="Drag and drop to reorder"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-[11px] text-zinc-700 font-mono">
                      #{idx + 1}
                    </span>
                    {row.label && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600 truncate max-w-[120px]">
                        {row.label}
                      </span>
                    )}
                  </div>

                  {/* Actions: Move Up / Down, Duplicate, Remove */}
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveRow(idx, "up")}
                      className="p-1 rounded text-zinc-400 hover:text-black hover:bg-zinc-100 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition"
                      title="Move row up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === (content.rows?.length || 1) - 1}
                      onClick={() => handleMoveRow(idx, "down")}
                      className="p-1 rounded text-zinc-400 hover:text-black hover:bg-zinc-100 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed transition"
                      title="Move row down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateRow(idx)}
                      className="p-1 rounded text-zinc-400 hover:text-black hover:bg-zinc-100 cursor-pointer transition"
                      title="Duplicate this row"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      className="p-1 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition"
                      title="Delete row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {isKeyValue ? (
                  /* Key-Value Mode Fields */
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <span className="block text-[9px] text-zinc-400 font-mono mb-0.5 uppercase">
                          Label
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. DATE"
                          value={row.label || ""}
                          onChange={(e) => handleRowChange(idx, { label: e.target.value })}
                          className="w-full px-2 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 font-mono font-bold focus:outline-none focus:border-black"
                        />
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[9px] text-zinc-400 font-mono mb-0.5 uppercase">
                          Value / Content
                        </span>
                        <input
                          type="text"
                          placeholder="e.g. 6 October 2026, Tuesday"
                          value={row.value || ""}
                          onChange={(e) => handleRowChange(idx, { value: e.target.value })}
                          className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    {/* Row Action / Button (Optional) */}
                    <div className="pt-2 border-t border-zinc-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                          Row Action Button (Optional)
                        </span>
                        {row.link && (
                          <button
                            type="button"
                            onClick={() =>
                              handleRowChange(idx, {
                                link: undefined,
                                linkText: undefined,
                                sectionTarget: undefined,
                              })
                            }
                            className="text-[9px] font-mono text-zinc-400 hover:text-rose-600 cursor-pointer"
                          >
                            Clear Button
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          placeholder="Button text (e.g. Join in Teams)"
                          value={row.linkText || ""}
                          onChange={(e) => handleRowChange(idx, { linkText: e.target.value })}
                          className="px-2 py-1 text-[11px] font-mono border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black"
                        />

                        {/* Destination toggle */}
                        <div className="flex items-center gap-1 font-mono text-[9px]">
                          <button
                            type="button"
                            onClick={() =>
                              handleRowChange(idx, {
                                targetType: "external",
                                sectionTarget: undefined,
                              })
                            }
                            className={`flex-1 py-1 rounded border text-center transition cursor-pointer ${
                              (row.targetType || "external") === "external"
                                ? "bg-black text-white border-black font-bold"
                                : "bg-white text-zinc-600 border-zinc-200"
                            }`}
                          >
                            URL
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const defaultSec =
                                sections && sections.length > 0 ? sections[0].id : "";
                              handleRowChange(idx, {
                                targetType: "section",
                                sectionTarget: row.sectionTarget || defaultSec,
                                link: `#${row.sectionTarget || defaultSec}`,
                              });
                            }}
                            className={`flex-1 py-1 rounded border text-center transition cursor-pointer ${
                              row.targetType === "section"
                                ? "bg-black text-white border-black font-bold"
                                : "bg-white text-zinc-600 border-zinc-200"
                            }`}
                          >
                            Section
                          </button>
                        </div>
                      </div>

                      {row.targetType === "section" ? (
                        <select
                          value={row.sectionTarget || ""}
                          onChange={(e) =>
                            handleRowChange(idx, {
                              sectionTarget: e.target.value,
                              link: `#${e.target.value}`,
                            })
                          }
                          className="w-full px-2 py-1 rounded-lg border border-zinc-200 bg-white font-mono text-[10px] focus:outline-none focus:border-black"
                        >
                          <option value="">Select section to jump to...</option>
                          {sections.map((sec) => (
                            <option key={sec.id} value={sec.id}>
                              {getSectionDisplayName(sec)} ({sec.type})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-zinc-50 px-2 py-1 rounded-lg border border-zinc-200">
                          <LinkIcon className="w-3 h-3 text-zinc-400 shrink-0" />
                          <input
                            type="text"
                            placeholder="URL (e.g. https://...)"
                            value={row.link || ""}
                            onChange={(e) => handleRowChange(idx, { link: e.target.value })}
                            className="w-full text-[10px] font-mono bg-transparent outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Grid Mode Fields */
                  <div className="space-y-1.5">
                    {content.columns?.map((col) => (
                      <div key={col.key} className="flex items-center gap-2">
                        <span className="w-24 text-[10px] font-mono text-zinc-500 truncate shrink-0">
                          {col.label}:
                        </span>
                        <input
                          type="text"
                          placeholder={col.label}
                          value={row[col.key] || ""}
                          onChange={(e) =>
                            handleRowChange(idx, { [col.key]: e.target.value })
                          }
                          className="flex-1 px-2 py-1 text-xs border border-zinc-200 rounded-lg bg-white focus:outline-none focus:border-black"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick Add Row button at bottom */}
          {content.rows && content.rows.length > 0 && (
            <button
              type="button"
              onClick={handleAddRow}
              className="w-full py-2.5 rounded-xl border border-dashed border-zinc-300 hover:border-black bg-zinc-50/60 hover:bg-zinc-100 text-zinc-700 font-mono text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Row</span>
            </button>
          )}
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
                    <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h2 className="text-xl font-extrabold text-zinc-900 tracking-tight">
                      Table Templates & Layout Presets
                    </h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-zinc-100 text-zinc-700 border border-zinc-200">
                      {presets.length} Presets
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-normal">
                    Click any preset to apply layout, row data structure, styling, and color palettes instantly.
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
                {/* Search */}
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

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
                  {[
                    { id: "all", label: "All Layouts" },
                    { id: "key-value", label: "Details (Key-Value)" },
                    { id: "grid", label: "Grid Tables" },
                    { id: "dark", label: "Dark & Glass" },
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
                    <TableIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No table templates match your filter.</p>
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
                        content.heading === preset.content?.heading &&
                        content.layoutStyle === preset.content?.layoutStyle;
                      const isDark =
                        preset.content?.cardBackground === "dark" ||
                        preset.content?.cardBackground === "glass";
                      const isKV =
                        (preset.content?.layoutStyle || "key-value") === "key-value";

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
                              isDark
                                ? "bg-zinc-950 text-white border-zinc-800"
                                : "bg-zinc-50 text-zinc-900 border-zinc-200"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                  isDark
                                    ? "bg-zinc-800 text-zinc-300 border border-zinc-700"
                                    : "bg-white text-zinc-700 border border-zinc-200 shadow-2xs"
                                }`}
                              >
                                {isKV ? "Details Block" : "Multi-Col"}
                              </span>
                              <span
                                className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                  isDark ? "text-emerald-400" : "text-zinc-500"
                                }`}
                              >
                                {preset.badge}
                              </span>
                            </div>

                            {/* Simulated mini rows */}
                            <div
                              className={`p-2.5 rounded-xl border space-y-1.5 ${
                                isDark
                                  ? "bg-zinc-900/90 border-zinc-800"
                                  : "bg-white border-zinc-200 shadow-2xs"
                              }`}
                            >
                              <div className="flex items-center justify-between pb-1 border-b border-zinc-200/40">
                                <div
                                  className={`h-2 rounded ${
                                    isDark ? "w-12 bg-zinc-700" : "w-12 bg-zinc-300"
                                  }`}
                                />
                                <div
                                  className={`h-2 rounded ${
                                    isDark ? "w-20 bg-zinc-600" : "w-20 bg-zinc-400"
                                  }`}
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div
                                  className={`h-2 rounded ${
                                    isDark ? "w-10 bg-zinc-700" : "w-10 bg-zinc-300"
                                  }`}
                                />
                                <div
                                  className={`h-2 rounded ${
                                    isDark ? "w-16 bg-zinc-600" : "w-16 bg-zinc-400"
                                  }`}
                                />
                              </div>
                              <div className="flex items-center justify-between pt-1 border-t border-zinc-200/40">
                                <div
                                  className={`h-2 rounded ${
                                    isDark ? "w-14 bg-zinc-700" : "w-14 bg-zinc-300"
                                  }`}
                                />
                                <div
                                  className={`h-2 rounded ${
                                    isDark ? "w-8 bg-emerald-500" : "w-8 bg-black"
                                  }`}
                                />
                              </div>
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
                                <span>Apply Template</span>
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
                  Tip: Applying a template sets layout, color styling, and sample rows. You can customize any field afterwards.
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
