import React from "react";
import { X, Sliders, Palette, Eye, EyeOff, Sparkles, PanelTop, PanelBottom } from "lucide-react";
import type { EventDocument } from "../../types/event";
import { SECTION_PRESETS, type SectionPreset } from "../../registry/sectionPresets";
import { ThemeAndHeaderEditor } from "./editors/ThemeAndHeaderEditor";
import { HeaderEditor } from "./editors/HeaderEditor";
import { FooterEditor } from "./editors/FooterEditor";
import { HeroEditor } from "./editors/HeroEditor";
import { SpeakersEditor } from "./editors/SpeakersEditor";
import { ScheduleEditor } from "./editors/ScheduleEditor";
import { VenueEditor } from "./editors/VenueEditor";
import { RegistrationEditor } from "./editors/RegistrationEditor";
import { CountdownEditor } from "./editors/CountdownEditor";
import {
  EventInfoEditor,
  AboutEditor,
  HighlightsEditor,
  FaqEditor,
  SponsorsEditor,
  VideoEditor,
  ContactEditor,
  RichTextEditor,
} from "./editors/CommonSectionEditors";
import { TableEditor } from "./editors/TableEditor";
import { GalleryEditor } from "./editors/GalleryEditor";
import { CollapsibleGroup } from "./editors/CollapsibleGroup";

interface BuilderRightPanelProps {
  event: EventDocument;
  selectedSectionId?: string;
  onCloseSectionSettings: () => void;
  onUpdateEvent: (updated: EventDocument, options?: { immediate?: boolean }) => void;
  onToggleVisibility?: (id: string) => void;
}

export const BuilderRightPanel: React.FC<BuilderRightPanelProps> = ({
  event,
  selectedSectionId,
  onCloseSectionSettings,
  onUpdateEvent,
  onToggleVisibility,
}) => {
  // Check if Header is selected
  const isHeader = selectedSectionId === "header" || selectedSectionId === "header_settings";

  // Check if Footer is selected
  const isFooter = selectedSectionId === "footer" || selectedSectionId === "footer_settings";

  // Check if Hero is selected
  const isHero =
    selectedSectionId === event.hero?.id ||
    selectedSectionId === "hero_med_1" ||
    selectedSectionId === "hero";

  // Find section in list
  const selectedSection =
    selectedSectionId === "page_settings" || !selectedSectionId || isHeader || isFooter
      ? null
      : isHero
      ? event.hero
      : event.sections.find((s) => s.id === selectedSectionId);

  const handleUpdateFooter = (newFooter: any) => {
    onUpdateEvent(
      {
        ...event,
        footer: newFooter,
      },
      { immediate: true }
    );
  };

  const sectionType = isHero ? "hero" : selectedSection?.type;
  const presets: SectionPreset[] = sectionType ? SECTION_PRESETS[sectionType] || [] : [];

  const handleUpdateSectionContent = (newContent: any) => {
    if (isHero) {
      onUpdateEvent({
        ...event,
        hero: {
          ...event.hero,
          content: newContent,
        },
      });
    } else if (selectedSection) {
      const updatedSections = event.sections.map((s) =>
        s.id === selectedSection.id
          ? {
              ...s,
              content: newContent,
              settings: {
                ...s.settings,
                ...(newContent.backgroundColor !== undefined
                  ? {
                      customBgColor: newContent.backgroundColor,
                      bgType: (newContent.backgroundColor && newContent.backgroundColor !== "transparent"
                        ? "custom"
                        : "default") as "custom" | "default",
                    }
                  : {}),
              },
            }
          : s
      );
      onUpdateEvent({
        ...event,
        sections: updatedSections,
      });
    }
  };

  const handleApplyPreset = (preset: SectionPreset) => {
    if (isHero) {
      // PRESERVE user's actual text content (heading, subtitle, description, buttons, badgeText, images)
      // Only apply layout alignment, width, animation and visual styles!
      const current = event.hero?.content || {};
      const updatedHeroContent = {
        ...current,
        // Layout, alignment, width & animation from preset:
        contentAlignment: preset.content?.contentAlignment ?? current.contentAlignment ?? "center",
        verticalPosition: preset.content?.verticalPosition ?? current.verticalPosition ?? "center",
        contentWidth: preset.content?.contentWidth ?? current.contentWidth ?? "medium",
        animation: preset.content?.animation ?? current.animation ?? "fade-up",
        // Visual styles & background from preset:
        bgType: preset.content?.bgType ?? current.bgType ?? "gradient",
        gradientFrom: preset.content?.gradientFrom ?? current.gradientFrom,
        gradientTo: preset.content?.gradientTo ?? current.gradientTo,
        gradientAngle: preset.content?.gradientAngle ?? current.gradientAngle,
        overlay: preset.content?.overlay ?? current.overlay,
        overlayStrength: preset.content?.overlayStrength ?? current.overlayStrength,
        overlayColor: preset.content?.overlayColor ?? current.overlayColor,
        solidColor: preset.content?.solidColor ?? current.solidColor,
        desktopImage:
          preset.content?.bgType === "image" && preset.content?.desktopImage
            ? preset.content.desktopImage
            : (preset.content?.desktopImage ?? current.desktopImage),
        mobileImage:
          preset.content?.bgType === "image" && preset.content?.mobileImage
            ? preset.content.mobileImage
            : (preset.content?.mobileImage ?? current.mobileImage),
      };

      onUpdateEvent(
        {
          ...event,
          hero: {
            ...event.hero,
            content: updatedHeroContent,
            settings: preset.settings || event.hero.settings,
          },
        },
        { immediate: true }
      );
    } else if (selectedSection) {
      let newContent = preset.content;
      if (selectedSection.type === "gallery") {
        const current = selectedSection.content || {};
        newContent = {
          ...preset.content,
          heading: current.heading || preset.content.heading,
          subtitle: current.subtitle !== undefined ? current.subtitle : preset.content.subtitle,
          badge: current.badge !== undefined ? current.badge : preset.content.badge,
          images: current.images && current.images.length > 0 ? current.images : preset.content.images,
        };
      }
      const updatedSections = event.sections.map((s) =>
        s.id === selectedSection.id
          ? {
              ...s,
              content: newContent,
              settings: preset.settings || s.settings,
            }
          : s
      );
      onUpdateEvent(
        {
          ...event,
          sections: updatedSections,
        },
        { immediate: true }
      );
    }
  };



  const isVisible = selectedSection ? selectedSection.visible !== false : true;

  return (
    <aside className="w-92 lg:w-96 bg-zinc-50/50 border-l border-zinc-200 flex flex-col shrink-0 select-none z-20 h-full font-sans shadow-xs">
      {/* Top Header of the Right Panel */}
      <div className="p-4 border-b border-zinc-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          {isHeader ? (
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs shrink-0">
              <PanelTop className="w-4 h-4" />
            </div>
          ) : isFooter ? (
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs shrink-0">
              <PanelBottom className="w-4 h-4" />
            </div>
          ) : selectedSection ? (
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shadow-xs shrink-0">
              <Palette className="w-4 h-4" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold text-zinc-900 leading-tight">
              {isHeader
                ? "Header Settings"
                : isFooter
                ? "Footer Settings"
                : selectedSection
                ? isHero
                  ? "Hero Banner Settings"
                  : `${selectedSection.type.toUpperCase()} Settings`
                : "Page Settings"}
            </h3>
            <span className="text-xs text-zinc-500">
              {isHeader
                ? "Layout, Sticky, Logo & CTA"
                : isFooter
                ? "Visibility, Copyright & Links"
                : selectedSection
                ? "Component inspector & presets"
                : "Background & Typography"}
            </span>
          </div>
        </div>

        {(selectedSection || isHeader || isFooter) && (
          <button
            onClick={onCloseSectionSettings}
            className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-lg transition cursor-pointer"
            title="Close Settings"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* If Footer selected, show FooterEditor */}
        {isFooter && (
          <FooterEditor
            footer={event.footer || { visible: true, copyrightText: "", quickLinks: [], socialLinks: [] }}
            event={event}
            onChangeFooter={handleUpdateFooter}
            onToggleVisibility={() => {
              if (onToggleVisibility) {
                onToggleVisibility("footer");
              } else {
                handleUpdateFooter({
                  ...event.footer,
                  visible: event.footer?.visible === false ? true : false,
                });
              }
            }}
          />
        )}

        {/* If Header selected, show HeaderEditor */}
        {isHeader && (
          <HeaderEditor
            event={event}
            onChangeHeader={(header) => onUpdateEvent({ ...event, header })}
          />
        )}

        {/* If no section selected, show Page Settings */}
        {!selectedSection && !isHeader && !isFooter && (
          <ThemeAndHeaderEditor
            event={event}
            onChangeBranding={(branding) => onUpdateEvent({ ...event, branding })}
            onChangeHeader={(header) => onUpdateEvent({ ...event, header })}
            onChangeSeo={(seo) => onUpdateEvent({ ...event, seo })}
          />
        )}

        {/* 1. SECTION STATUS */}
        {selectedSection && (
          <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-800">
              {isVisible ? "● Section Active" : "○ Section Hidden"}
            </span>

            <button
              onClick={() => {
                if (onToggleVisibility) {
                  onToggleVisibility(selectedSection.id);
                } else if (isHero) {
                  onUpdateEvent({
                    ...event,
                    hero: { ...event.hero, visible: !event.hero?.visible },
                  });
                } else {
                  const updated = event.sections.map((s) =>
                    s.id === selectedSection.id ? { ...s, visible: !s.visible } : s
                  );
                  onUpdateEvent({ ...event, sections: updated });
                }
              }}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border ${
                isVisible
                  ? "bg-black text-white hover:bg-zinc-800 border-black"
                  : "bg-zinc-200 text-zinc-800 hover:bg-zinc-300 border-zinc-300"
              }`}
            >
              {isVisible ? (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Visible</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>Hidden</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* 2. QUICK TEMPLATES (For Other Generic Sections) */}
        {selectedSection &&
          !isHero &&
          selectedSection.type !== "table" &&
          selectedSection.type !== "countdown" &&
          selectedSection.type !== "highlights" &&
          selectedSection.type !== "gallery" &&
          presets.length > 0 && (
            <CollapsibleGroup
              title="Quick Templates"
              subtitle="1-Click layout & styling"
              icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
              badge={`${presets.length} PRESETS`}
              defaultOpen={false}
            >
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[10px]">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className="py-1.5 px-1.5 rounded-lg border border-zinc-200 hover:border-black bg-white hover:bg-zinc-100 font-bold truncate text-center transition cursor-pointer shadow-2xs"
                    title={`${preset.name}: ${preset.description}`}
                  >
                    {preset.chipLabel || preset.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </CollapsibleGroup>
          )}

        {/* 3. Streamlined Specific Section Form */}
        {selectedSection && isHero && (
          <HeroEditor
            content={event.hero.content}
            onChange={handleUpdateSectionContent}
            presets={presets}
            onApplyPreset={handleApplyPreset}
            sections={event.sections}
          />
        )}

        {selectedSection && selectedSection.type === "eventInfo" && (
          <EventInfoEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "countdown" && (
          <CountdownEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
            eventStartDate={event.startDate}
            presets={SECTION_PRESETS.countdown}
            onApplyPreset={handleApplyPreset}
            sections={event.sections}
          />
        )}

        {selectedSection && selectedSection.type === "about" && (
          <AboutEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "highlights" && (
          <HighlightsEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
            presets={SECTION_PRESETS.highlights}
            onApplyPreset={handleApplyPreset}
            sections={event.sections}
          />
        )}

        {selectedSection && selectedSection.type === "speakers" && (
          <SpeakersEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
            presets={SECTION_PRESETS.speakers}
            onApplyPreset={handleApplyPreset}
          />
        )}

        {selectedSection && selectedSection.type === "schedule" && (
          <ScheduleEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "venue" && (
          <VenueEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "registration" && (
          <RegistrationEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
            sections={event.sections}
          />
        )}

        {selectedSection && selectedSection.type === "faq" && (
          <FaqEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "sponsors" && (
          <SponsorsEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "video" && (
          <VideoEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "contact" && (
          <ContactEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "richText" && (
          <RichTextEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
          />
        )}

        {selectedSection && selectedSection.type === "table" && (
          <TableEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
            presets={SECTION_PRESETS.table}
            onApplyPreset={handleApplyPreset}
            sections={event.sections}
          />
        )}

        {selectedSection && selectedSection.type === "gallery" && (
          <GalleryEditor
            content={selectedSection.content}
            onChange={handleUpdateSectionContent}
            presets={SECTION_PRESETS.gallery || []}
            onApplyPreset={handleApplyPreset}
          />
        )}
      </div>
    </aside>
  );
};
