import React from "react";
import { Plus, Trash2, Award, Ticket, Type } from "lucide-react";
import type { RegistrationContent, TicketTier, EventSection } from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { AutoResizeTextarea } from "./AutoResizeTextarea";

interface RegistrationEditorProps {
  content: RegistrationContent;
  onChange: (updated: RegistrationContent) => void;
  sections?: EventSection[];
}

export const RegistrationEditor: React.FC<RegistrationEditorProps> = ({
  content,
  onChange,
  sections = [],
}) => {
  const actionType =
    !content.ctaType || content.ctaType === "modal-form" ? "external" : content.ctaType;
  const handleUpdate = (fields: Partial<RegistrationContent>) => {
    onChange({ ...content, ...fields });
  };

  const handleTierChange = (idx: number, updates: Partial<TicketTier>) => {
    const list = [...(content.tiers || [])];
    list[idx] = { ...list[idx], ...updates };
    handleUpdate({ tiers: list });
  };

  const handleAddTier = () => {
    const list = [
      ...(content.tiers || []),
      {
        id: "tier_" + Date.now().toString(36),
        name: "Standard Pass",
        price: "₹ 5,000",
        description: "General delegate pass",
        features: ["Access to all plenary halls", "Delegate kit & conference lunch"],
        recommended: false,
        buttonText: "Register Now",
      },
    ];
    handleUpdate({ tiers: list });
  };

  const handleRemoveTier = (idx: number) => {
    const list = (content.tiers || []).filter((_, i) => i !== idx);
    handleUpdate({ tiers: list });
  };

  const descTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  const currentDescText = content.description ?? content.subtitle ?? "";
  const pointsList = currentDescText
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const handleAddBulletPoint = () => {
    const nextVal = currentDescText ? (currentDescText.endsWith("\n") ? currentDescText : currentDescText + "\n") : "";
    handleUpdate({
      description: nextVal,
      subtitle: nextVal,
    });
    setTimeout(() => {
      if (descTextareaRef.current) {
        descTextareaRef.current.focus();
        descTextareaRef.current.setSelectionRange(nextVal.length, nextVal.length);
      }
    }, 40);
  };

  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      {/* 1. REGISTRATION SETUP & HEADINGS */}
      <CollapsibleGroup
        title="Registration Setup & Headings"
        subtitle={content.heading || "Registration"}
        icon={<Type className="w-3.5 h-3.5 text-blue-500" />}
        badge={actionType.toUpperCase()}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Heading</span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => handleUpdate({ heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="block text-[11px] font-semibold text-zinc-700">Paragraph Bullet Points</span>
              <span className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                {pointsList.length} {pointsList.length === 1 ? "point" : "points"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAddBulletPoint}
              className="text-[10px] font-mono font-bold text-black bg-zinc-100 hover:bg-zinc-200 px-2 py-0.5 rounded-md border border-zinc-300 transition flex items-center gap-1 cursor-pointer shadow-2xs"
              title="Add a new line / bullet point"
            >
              <Plus className="w-3 h-3 text-black" />
              <span>Add Point</span>
            </button>
          </div>
          <AutoResizeTextarea
            ref={descTextareaRef}
            minRows={2}
            value={currentDescText}
            onChange={(e) =>
              handleUpdate({
                description: e.target.value,
                subtitle: e.target.value,
              })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
              }
            }}
            placeholder="Type point 1...&#10;Press Enter to add point 2...&#10;Press Enter to add point 3..."
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black font-sans leading-relaxed shadow-2xs"
          />
          <div className="flex items-center justify-between mt-1 text-[10px] text-zinc-400 font-mono">
            <span>Press Enter to start a new bullet point.</span>
            <span className="text-zinc-500 font-semibold">{pointsList.length} live {pointsList.length === 1 ? "point" : "points"}</span>
          </div>
        </div>

        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Registration Action Type
          </span>
          <select
            value={actionType}
            onChange={(e) => handleUpdate({ ctaType: e.target.value as any })}
            className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white font-semibold text-xs text-zinc-900 outline-none"
          >
            <option value="external">External Link (opens in new tab)</option>
            <option value="section">Jump to Section</option>
            <option value="whatsapp">Direct WhatsApp Concierge</option>
            <option value="email">Direct Email Registration</option>
          </select>
        </div>

        {actionType === "external" && (
          <div>
            <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
              External Ticketing URL
            </span>
            <input
              type="text"
              placeholder="https://eventbrite.com/..."
              value={content.externalUrl || ""}
              onChange={(e) => handleUpdate({ ctaType: "external", externalUrl: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono bg-white"
            />
          </div>
        )}

        {actionType === "section" && (
          <div>
            <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
              Target Section
            </span>
            <select
              value={content.ctaSectionTarget || ""}
              onChange={(e) => handleUpdate({ ctaSectionTarget: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-white font-mono text-xs outline-none cursor-pointer"
            >
              <option value="">Select a section...</option>
              {sections.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {(sec.content?.title || sec.content?.heading || sec.type) as string} ({sec.type})
                </option>
              ))}
            </select>
          </div>
        )}

        {content.ctaType === "whatsapp" && (
          <div>
            <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
              WhatsApp Number with Country Code
            </span>
            <input
              type="text"
              placeholder="+919876543210"
              value={content.whatsappNumber || ""}
              onChange={(e) => handleUpdate({ whatsappNumber: e.target.value })}
              className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono bg-white"
            />
          </div>
        )}
      </CollapsibleGroup>

      {/* 2. TICKET TIERS */}
      <CollapsibleGroup
        title="Ticket Tiers & Pricing"
        subtitle={`${content.tiers?.length || 0} ticket tier${content.tiers?.length === 1 ? "" : "s"}`}
        icon={<Ticket className="w-3.5 h-3.5 text-indigo-500" />}
        badge={`${content.tiers?.length || 0} TIERS`}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={handleAddTier}
            className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        }
      >
        <div className="space-y-3">
          {(!content.tiers || content.tiers.length === 0) && (
            <div className="text-center py-4 text-zinc-400 text-xs font-mono">
              No ticket tiers created yet. Click &quot;Add&quot; to insert a pricing tier.
            </div>
          )}

          {content.tiers?.map((tier, idx) => (
            <div
              key={tier.id || idx}
              className="p-3 bg-white rounded-xl border border-zinc-200 space-y-2.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-zinc-900 flex items-center gap-1.5 font-mono">
                  <Ticket className="w-3.5 h-3.5 text-zinc-400" />
                  Tier #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveTier(idx)}
                  className="text-zinc-400 hover:text-rose-600 p-0.5 cursor-pointer transition"
                  title="Remove tier"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Tier Name (e.g. VIP Pass)"
                  value={tier.name}
                  onChange={(e) => handleTierChange(idx, { name: e.target.value })}
                  className="px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 font-bold focus:outline-none focus:border-black"
                />
                <input
                  type="text"
                  placeholder="Price (₹ 8,500 / $199)"
                  value={tier.price}
                  onChange={(e) => handleTierChange(idx, { price: e.target.value })}
                  className="px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 font-bold text-black font-mono focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <span className="block text-[10px] text-zinc-500 font-semibold mb-1 font-mono">
                  Tier Description
                </span>
                <AutoResizeTextarea
                  minRows={1}
                  placeholder="Short Description..."
                  value={tier.description || ""}
                  onChange={(e) =>
                    handleTierChange(idx, { description: e.target.value })
                  }
                  className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <span className="block text-[10px] text-zinc-500 font-semibold mb-1 font-mono">
                  Features (one per line):
                </span>
                <AutoResizeTextarea
                  minRows={3}
                  value={tier.features?.join("\n") || ""}
                  onChange={(e) =>
                    handleTierChange(idx, {
                      features: e.target.value.split("\n").filter(Boolean),
                    })
                  }
                  placeholder="All hall access&#10;Conference Banquet&#10;CME Certificate"
                  className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                <label className="flex items-center gap-1.5 cursor-pointer font-mono text-[11px] font-semibold text-zinc-700">
                  <input
                    type="checkbox"
                    checked={!!tier.recommended}
                    onChange={(e) =>
                      handleTierChange(idx, { recommended: e.target.checked })
                    }
                    className="rounded text-black accent-black cursor-pointer"
                  />
                  <span className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    Recommended Tier
                  </span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleGroup>
    </div>
  );
};
