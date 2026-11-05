import React from "react";
import { Plus, Trash2, Calendar, FileText, HelpCircle, Award, Video, Mail, Code } from "lucide-react";
import type {
  AboutContent,
  SponsorsContent,
  FAQContent,
  VideoContent,
  RichTextContent,
  ContactContent,
  EventInfoContent,
} from "../../../types/event";
import { CollapsibleGroup } from "./CollapsibleGroup";
import { ImageUploadField } from "./ImageUploadField";

// 1. EVENT INFO EDITOR
export const EventInfoEditor: React.FC<{
  content: EventInfoContent;
  onChange: (c: EventInfoContent) => void;
}> = ({ content, onChange }) => {
  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      <CollapsibleGroup
        title="Summary Strip Details"
        subtitle={content.venueName || "Event key facts"}
        icon={<Calendar className="w-3.5 h-3.5 text-blue-500" />}
        badge="FACTS"
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Date Label</span>
          <input
            type="text"
            value={content.dateLabel}
            onChange={(e) => onChange({ ...content, dateLabel: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-semibold bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Time Label</span>
          <input
            type="text"
            value={content.timeLabel}
            onChange={(e) => onChange({ ...content, timeLabel: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Venue Name</span>
          <input
            type="text"
            value={content.venueName}
            onChange={(e) => onChange({ ...content, venueName: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-semibold bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Location Line</span>
          <input
            type="text"
            value={content.locationLabel}
            onChange={(e) => onChange({ ...content, locationLabel: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Organizer Organization</span>
          <input
            type="text"
            value={content.organizerName}
            onChange={(e) => onChange({ ...content, organizerName: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Accreditation Badge</span>
          <input
            type="text"
            value={content.badge || ""}
            onChange={(e) => onChange({ ...content, badge: e.target.value })}
            placeholder="e.g. 18 CME Credit Points"
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-semibold bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>
    </div>
  );
};

// 2. ABOUT EDITOR
export const AboutEditor: React.FC<{
  content: AboutContent;
  onChange: (c: AboutContent) => void;
}> = ({ content, onChange }) => {
  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      <CollapsibleGroup
        title="About Event & Media"
        subtitle={content.heading || "About Event"}
        icon={<FileText className="w-3.5 h-3.5 text-indigo-500" />}
        badge={(content.layout || "text-image").toUpperCase()}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Heading</span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => onChange({ ...content, heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Layout</span>
          <div className="grid grid-cols-3 gap-1.5">
            {["text-image", "image-text", "centered"].map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => onChange({ ...content, layout: l as any })}
                className={`py-1.5 rounded-lg border text-center font-mono font-bold text-[11px] capitalize cursor-pointer transition ${
                  content.layout === l ? "border-black bg-black text-white shadow-2xs" : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700"
                }`}
              >
                {l.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
        <div>
          <ImageUploadField
            label="Section Image"
            value={content.imageUrl || ""}
            onChange={(url) => onChange({ ...content, imageUrl: url })}
            folder="about"
            placeholder="https://..."
            aspectRatio="wide"
            helperText="Uploads to public/uploads/about via PHP"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Rich Description (HTML allowed)</span>
          <textarea
            rows={4}
            value={content.richTextHtml}
            onChange={(e) => onChange({ ...content, richTextHtml: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>
    </div>
  );
};

// 3. HIGHLIGHTS EDITOR
export { HighlightsEditor } from "./HighlightsEditor";


// 4. FAQ EDITOR
export const FaqEditor: React.FC<{
  content: FAQContent;
  onChange: (c: FAQContent) => void;
}> = ({ content, onChange }) => {
  const items = content.items || [];

  const handleItemChange = (idx: number, updates: any) => {
    const next = [...items];
    next[idx] = { ...next[idx], ...updates };
    onChange({ ...content, items: next });
  };

  const handleAddFaq = () => {
    onChange({
      ...content,
      items: [
        ...items,
        {
          id: "faq_" + Date.now().toString(36),
          question: "New Question?",
          answer: "Detailed answer explaining the policy or information.",
        },
      ],
    });
  };

  const handleRemoveFaq = (idx: number) => {
    onChange({ ...content, items: items.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      <CollapsibleGroup
        title="FAQ Questions & Answers"
        subtitle={`${items.length} question item${items.length === 1 ? "" : "s"}`}
        icon={<HelpCircle className="w-3.5 h-3.5 text-rose-500" />}
        badge={`${items.length} FAQS`}
        defaultOpen={true}
        headerAction={
          <button
            type="button"
            onClick={handleAddFaq}
            className="px-2 py-0.5 rounded-md bg-zinc-900 text-white hover:bg-zinc-800 text-[10px] font-bold font-mono flex items-center gap-1 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        }
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">
            Section Heading
          </span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => onChange({ ...content, heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>

        <div className="space-y-2 pt-2 border-t border-zinc-100">
          {items.map((item, idx) => (
            <div key={item.id || idx} className="p-3 bg-white rounded-xl border border-zinc-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-zinc-700 font-mono">Q#{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFaq(idx)}
                  className="text-zinc-400 hover:text-rose-600 cursor-pointer p-0.5"
                  title="Remove question"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Question"
                value={item.question}
                onChange={(e) => handleItemChange(idx, { question: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 font-bold focus:outline-none focus:border-black"
              />
              <textarea
                rows={2}
                placeholder="Answer"
                value={item.answer}
                onChange={(e) => handleItemChange(idx, { answer: e.target.value })}
                className="w-full px-2.5 py-1.5 text-xs border border-zinc-200 rounded-lg bg-zinc-50 focus:outline-none focus:border-black resize-none"
              />
            </div>
          ))}
        </div>
      </CollapsibleGroup>
    </div>
  );
};

// 5. SPONSORS EDITOR
export const SponsorsEditor: React.FC<{
  content: SponsorsContent;
  onChange: (c: SponsorsContent) => void;
}> = ({ content, onChange }) => {
  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      <CollapsibleGroup
        title="Partners & Sponsors"
        subtitle={content.heading || "Partners"}
        icon={<Award className="w-3.5 h-3.5 text-amber-500" />}
        badge="PARTNERS"
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Heading</span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => onChange({ ...content, heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Subtitle</span>
          <input
            type="text"
            value={content.subtitle || ""}
            onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>
    </div>
  );
};

// 6. VIDEO EDITOR
export const VideoEditor: React.FC<{
  content: VideoContent;
  onChange: (c: VideoContent) => void;
}> = ({ content, onChange }) => {
  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      <CollapsibleGroup
        title="Video Player"
        subtitle={content.heading || "Featured Video"}
        icon={<Video className="w-3.5 h-3.5 text-red-500" />}
        badge={(content.videoType || "youtube").toUpperCase()}
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Heading</span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => onChange({ ...content, heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Video URL</span>
          <input
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            value={content.videoUrl}
            onChange={(e) => onChange({ ...content, videoUrl: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Video Platform</span>
          <div className="grid grid-cols-3 gap-1.5">
            {["youtube", "vimeo", "direct"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => onChange({ ...content, videoType: v as any })}
                className={`py-1.5 rounded-lg border text-center font-mono font-bold text-[11px] capitalize cursor-pointer transition ${
                  content.videoType === v ? "border-black bg-black text-white shadow-2xs" : "border-zinc-200 bg-white hover:border-zinc-300 text-zinc-700"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleGroup>
    </div>
  );
};

// 7. CONTACT EDITOR
export const ContactEditor: React.FC<{
  content: ContactContent;
  onChange: (c: ContactContent) => void;
}> = ({ content, onChange }) => {
  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      <CollapsibleGroup
        title="Secretariat Contact"
        subtitle={content.email || "Contact Details"}
        icon={<Mail className="w-3.5 h-3.5 text-emerald-500" />}
        badge="CONTACT"
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Heading</span>
          <input
            type="text"
            value={content.heading}
            onChange={(e) => onChange({ ...content, heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Email</span>
          <input
            type="email"
            value={content.email || ""}
            onChange={(e) => onChange({ ...content, email: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Phone / Helpline</span>
          <input
            type="text"
            value={content.phone || ""}
            onChange={(e) => onChange({ ...content, phone: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Physical Address</span>
          <textarea
            rows={2}
            value={content.address || ""}
            onChange={(e) => onChange({ ...content, address: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs bg-white focus:outline-none focus:border-black resize-none"
          />
        </div>
      </CollapsibleGroup>
    </div>
  );
};

// 8. RICH TEXT EDITOR
export const RichTextEditor: React.FC<{
  content: RichTextContent;
  onChange: (c: RichTextContent) => void;
}> = ({ content, onChange }) => {
  return (
    <div className="space-y-3.5 text-xs text-zinc-900 pb-10 font-sans">
      <CollapsibleGroup
        title="Custom Rich Text"
        subtitle={content.heading || "HTML content"}
        icon={<Code className="w-3.5 h-3.5 text-zinc-700" />}
        badge="HTML"
        defaultOpen={true}
      >
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Heading</span>
          <input
            type="text"
            value={content.heading || ""}
            onChange={(e) => onChange({ ...content, heading: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 font-bold text-xs bg-white focus:outline-none focus:border-black"
          />
        </div>
        <div>
          <span className="block text-[11px] font-semibold text-zinc-600 mb-1">Content HTML / Paragraphs</span>
          <textarea
            rows={6}
            value={content.contentHtml}
            onChange={(e) => onChange({ ...content, contentHtml: e.target.value })}
            className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 text-xs font-mono bg-white focus:outline-none focus:border-black"
          />
        </div>
      </CollapsibleGroup>
    </div>
  );
};
