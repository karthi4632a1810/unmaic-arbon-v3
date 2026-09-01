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
      <div className="relative max-h-[min(88dvh,720px)] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-black/10 bg-white p-5 shadow-2xl xs:p-6 sm:p-8">
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
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
              {category || "Global Strategic Advisory Board"}
            </p>
            <h2 id="team-bio-modal-title" className="mt-2 text-xl font-bold text-[#131b2e] xs:text-2xl">
              {name}
            </h2>
            {role ? <p className="mt-1 text-sm font-medium text-[#2b6193]">{role}</p> : null}
          </div>
          {/* Bios keep blank-line paragraph breaks — render them instead of collapsing to one block */}
          <div className="space-y-4">
            {bio
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph) => (
                <p key={paragraph} className="text-sm leading-6 text-[#444654] xs:text-base xs:leading-7">
                  {paragraph}
                </p>
              ))}
          </div>
          {linkedIn ? (
            <a
              href={linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 transition hover:text-neutral-900 hover:underline"
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
