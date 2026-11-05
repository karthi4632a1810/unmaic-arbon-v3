import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { eventStore, slugify } from "../../services/eventStore";
import { EVENT_TEMPLATES } from "../../services/templatesData";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugCustomized, setIsSlugCustomized] = useState(false);
  const [startDate, setStartDate] = useState("2026-10-21T09:00");
  const [endDate, setEndDate] = useState("2026-10-23T18:00");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    EVENT_TEMPLATES[0].id
  );
  const [slugError, setSlugError] = useState("");

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isSlugCustomized) {
      const generated = slugify(val);
      setSlug(generated);
      checkSlugUniqueness(generated);
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugCustomized(true);
    const clean = slugify(val);
    setSlug(clean);
    checkSlugUniqueness(clean);
  };

  const checkSlugUniqueness = (candidate: string) => {
    if (!candidate) {
      setSlugError("Slug cannot be empty");
      return false;
    }
    const exists = eventStore.getEventBySlug(candidate);
    if (exists) {
      setSlugError("This URL slug is already taken. Please choose another.");
      return false;
    }
    setSlugError("");
    return true;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const isUnique = checkSlugUniqueness(slug);
    if (!isUnique) return;
    setStep(2);
  };

  const handleFinishCreate = () => {
    const created = eventStore.createEvent({
      name,
      slug,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      timezone,
      templateId: selectedTemplateId,
    });

    onClose();
    navigate(`/admin/events/${created.id}/builder`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-200 text-zinc-900 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
              Step {step} of 2
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {step === 1 ? "Event Fundamentals" : "Choose Starting Template"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {step === 1 ? (
            <form onSubmit={handleNextStep} id="step1-form" className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Event Name <span className="text-zinc-900">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UNMAI Carbon Article 6 Global Summit 2026"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-4 py-3 text-sm sm:text-base border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Public Event URL <span className="text-zinc-900">*</span>
                </label>
                <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-black focus-within:ring-2 focus-within:ring-black/10 overflow-hidden bg-white">
                  <span className="px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-400 bg-slate-50 border-r border-slate-200 select-none">
                    /events/
                  </span>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="event-slug"
                    className="flex-1 px-3 py-3 text-xs sm:text-sm font-semibold text-slate-900 outline-none"
                  />
                </div>
                {slugError ? (
                  <p className="text-xs text-black mt-1.5 font-bold font-mono">⚠️ {slugError}</p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Live URL:{" "}
                    <span className="font-mono text-zinc-900 font-semibold">
                      https://yoursite.com/events/{slug || "..."}
                    </span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:border-black bg-white"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST - UTC+05:30)</option>
                  <option value="America/New_York">America/New_York (EST - UTC-05:00)</option>
                  <option value="Europe/London">Europe/London (GMT - UTC+00:00)</option>
                  <option value="Asia/Dubai">Asia/Dubai (GST - UTC+04:00)</option>
                  <option value="Asia/Singapore">Asia/Singapore (SGT - UTC+08:00)</option>
                </select>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 mb-2">
                Choose a pre-designed structured template. You can customize colors, content, and sections inside the editor immediately.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EVENT_TEMPLATES.map((tpl) => {
                  const isSelected = selectedTemplateId === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplateId(tpl.id)}
                      className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? "border-black ring-2 ring-black/10 shadow-lg"
                          : "border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div className="h-32 w-full overflow-hidden bg-slate-100 relative">
                        <img
                          src={tpl.thumbnail}
                          alt={tpl.name}
                          className="w-full h-full object-cover grayscale contrast-125"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shadow">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-white backdrop-blur-xs font-mono">
                          {tpl.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{tpl.name}</h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {tpl.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step === 1 ? (
            <button
              type="submit"
              form="step1-form"
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition cursor-pointer font-mono"
            >
              <span>Next: Choose Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishCreate}
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition cursor-pointer font-mono"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Event Builder</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
