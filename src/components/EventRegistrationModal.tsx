import { useState, type FormEvent, useEffect } from "react";
import type { EventItem } from "../data/events";

interface EventRegistrationModalProps {
  event: EventItem | null;
  open: boolean;
  onClose: () => void;
}

export function EventRegistrationModal({ event, open, onClose }: EventRegistrationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    jobTitle: "",
    attendanceType: "In-Person",
    message: "",
  });

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        organization: "",
        jobTitle: "",
        attendanceType: event?.format === "Virtual" ? "Virtual" : "In-Person",
        message: "",
      });
    }
  }, [open, event]);

  if (!open || !event) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const downloadIcs = () => {
    const title = event.title;
    const desc = `${event.summary}\n\nVenue: ${event.venue || event.location}\nOrganized by UNMAI Carbon Solutions.`;
    const loc = event.venue || event.location;
    const startIso = event.startDate.replace(/-/g, "");
    const endIso = event.endDate ? event.endDate.replace(/-/g, "") : startIso;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//UNMAI Carbon Solutions//Events//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc.replace(/\n/g, "\\n")}`,
      `LOCATION:${loc}`,
      `DTSTART;VALUE=DATE:${startIso}`,
      `DTEND;VALUE=DATE:${endIso}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-reg-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <div
        className="fixed inset-0 bg-black/75 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-[1] max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/20 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-5 top-5 inline-flex size-9 items-center justify-center rounded-lg border border-black/10 text-gray-500 transition hover:bg-black/5 hover:text-black"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              Request Received
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#131b2e]">
              Thank You for Your Registration
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#444654]">
              Your registration request for <strong className="text-black font-semibold">{event.title}</strong> has been logged. Our delegate team will verify your credentials and send calendar coordinates and session briefing to <strong className="text-black font-semibold">{formData.email}</strong>.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={downloadIcs}
                className="inline-flex items-center gap-2 rounded-lg border border-black/15 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-black/5"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Add to Calendar (.ics)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center rounded-lg bg-[#131b2e] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 border-b border-black/10 pb-4 pr-8">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#2b6193]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2b6193]">
                  {event.category}
                </span>
                <span className="text-xs text-black/40">•</span>
                <span className="text-xs font-medium text-black/60">{event.dateLabel}</span>
              </div>
              <h2 id="event-reg-title" className="mt-2 text-xl font-bold tracking-tight text-[#131b2e] sm:text-2xl">
                {event.ctaPrimary.label === "Request Invitation"
                  ? "Request Delegate Invitation"
                  : "Register for Event"}
              </h2>
              <p className="mt-1 text-xs text-[#52525b] line-clamp-2">
                {event.title}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-black/80">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Jane Doe"
                    className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black/80">
                    Corporate / Official Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-black/80">
                    Organization / Entity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Company or Government Body"
                    className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-black/80">
                    Designation / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="e.g. Head of Sustainability"
                    className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                  />
                </div>
              </div>

              {event.format === "Hybrid" && (
                <div>
                  <label className="block text-xs font-semibold text-black/80">
                    Preferred Mode of Attendance
                  </label>
                  <div className="mt-1.5 flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-medium text-black/80">
                      <input
                        type="radio"
                        name="attendanceType"
                        value="In-Person"
                        checked={formData.attendanceType === "In-Person"}
                        onChange={(e) => setFormData({ ...formData, attendanceType: e.target.value })}
                        className="text-black focus:ring-black"
                      />
                      In-Person (Singapore)
                    </label>
                    <label className="flex items-center gap-2 text-xs font-medium text-black/80">
                      <input
                        type="radio"
                        name="attendanceType"
                        value="Virtual"
                        checked={formData.attendanceType === "Virtual"}
                        onChange={(e) => setFormData({ ...formData, attendanceType: e.target.value })}
                        className="text-black focus:ring-black"
                      />
                      Virtual (Live Broadcast)
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-black/80">
                  Notes / Specific Discussion Interest (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share any specific Article 6, registry, or carbon credit topics you'd like addressed..."
                  className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3.5 py-2 text-sm text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#131b2e] py-3 text-xs font-bold uppercase tracking-widest text-white shadow-md transition hover:bg-black active:scale-[0.99]"
                >
                  Submit Registration Request
                </button>
                <p className="mt-2 text-center text-[11px] text-gray-500">
                  Participation is subject to institutional review. You will receive an email confirmation.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

