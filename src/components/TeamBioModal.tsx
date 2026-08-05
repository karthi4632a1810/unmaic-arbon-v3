import { useEffect } from "react";

type TeamBioModalProps = {
  open: boolean;
  name: string;
  role?: string;
  category?: string;
  bio: string;
  linkedIn?: string;
  onClose: () => void;
};

export function TeamBioModal({ open, name, role, category, bio, linkedIn, onClose }: TeamBioModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-bio-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative max-h-[min(88vh,720px)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-black/10 bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full border border-black/10 text-lg leading-none text-[#131b2e] transition hover:bg-neutral-100"
          aria-label="Close"
        >
          ×
        </button>
        <div className="space-y-4 pr-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#006c49]">
              {category || "Global Strategic Advisory Board"}
            </p>
            <h2 id="team-bio-modal-title" className="mt-2 text-2xl font-bold text-[#131b2e]">
              {name}
            </h2>
            {role ? <p className="mt-1 text-sm font-medium text-[#2b6193]">{role}</p> : null}
          </div>
          <p className="text-base leading-7 text-[#444654]">{bio}</p>
          {linkedIn ? (
            <a
              href={linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#006c49] transition hover:underline"
            >
              View LinkedIn profile
              <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
