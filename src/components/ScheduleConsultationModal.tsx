import { type FormEvent, useEffect, useState } from "react";

type ScheduleConsultationModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ScheduleConsultationModal({ open, onClose }: ScheduleConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  if (!open) return null;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close consultation modal"
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div className="relative z-[1] max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-white p-5 shadow-2xl xs:p-6 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#2b6193]">
              Schedule Consultation
            </p>
            <h2 className="mt-2 text-xl font-bold text-[#131b2e] xs:text-2xl sm:text-3xl">
              Start a Strategic Engagement
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex size-9 items-center justify-center rounded-md border border-black/10 text-[#131b2e] transition hover:bg-black/5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="rounded-xl border border-[#006c49]/20 bg-[#006c49]/5 px-5 py-6">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#006c49]">Thank you</p>
            <h3 className="mt-2 text-xl font-bold text-[#131b2e]">Message received successfully.</h3>
            <p className="mt-2 text-sm leading-6 text-[#444654]">
              Our team will review your consultation request and connect with you shortly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-lg bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-900"
            >
              Close
            </button>
          </div>
        ) : (
          <form className="grid gap-4" onSubmit={onSubmit}>
            {["Name", "Organization", "Email", "Country"].map((field) => (
              <input
                key={field}
                required
                type={field === "Email" ? "email" : "text"}
                aria-label={field}
                placeholder={field}
                className="w-full min-w-0 rounded-lg border border-black/10 px-4 py-3 text-base text-[#131b2e] outline-none transition focus:border-[#2b6193]/35 sm:text-sm"
              />
            ))}
            <textarea
              required
              aria-label="Consultation Objective"
              placeholder="Consultation Objective"
              className="h-24 w-full min-w-0 resize-y rounded-lg border border-black/10 px-4 py-3 text-base text-[#131b2e] outline-none transition focus:border-[#2b6193]/35 sm:text-sm"
            />
            <button
              type="submit"
              className="rounded-lg bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-neutral-900"
            >
              Submit Consultation Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
