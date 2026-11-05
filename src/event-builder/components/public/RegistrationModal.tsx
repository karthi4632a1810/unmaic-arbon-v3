import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import type { EventDocument, TicketTier } from "../../types/event";
import { eventStore } from "../../services/eventStore";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDocument;
  selectedTier: TicketTier | null;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  event,
  selectedTier,
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Find tier if not passed directly
  const registrationSection = event.sections.find((s) => s.type === "registration");
  const defaultTier = registrationSection?.content?.tiers?.[0];
  const tier = selectedTier || defaultTier;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      eventStore.submitRegistration({
        eventId: event.id,
        eventSlug: event.slug,
        eventName: event.name,
        fullName,
        email,
        phone,
        organization,
        ticketTierId: tier?.id,
        ticketTierName: tier?.name,
        ticketPrice: tier?.price,
        notes,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger monochrome celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#e4e4e7", "#a1a1aa", "#71717a"],
      });
    }, 600);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setOrganization("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg bg-zinc-950 text-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 animate-in zoom-in-95 duration-200"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-zinc-800/80 bg-zinc-900/60 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-1 font-mono">
            {event.name}
          </span>
          <h3 className="text-lg font-bold text-white uppercase tracking-tight">
            Institutional Delegation Registration
          </h3>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            {event.startDate ? new Date(event.startDate).toLocaleDateString(undefined, { dateStyle: "medium" }) : "Upcoming"}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Registration Confirmed</h4>
              <p className="text-zinc-300 text-sm mb-4 leading-relaxed">
                Thank you, <strong className="text-white">{fullName}</strong>. A confirmation email with your digital credential pass and summit proceedings dossier has been dispatched to <strong className="text-white">{email}</strong>.
              </p>
              {tier && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 mb-6 inline-block text-left text-xs text-zinc-300 font-mono">
                  <span className="font-semibold text-white">{tier.name}</span> • <span className="font-bold text-white">{tier.price}</span>
                </div>
              )}
              <div className="flex justify-center">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-full text-black bg-white hover:bg-zinc-200 font-bold text-sm transition-all shadow-md"
                >
                  Done & Return to Summit Page
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {tier && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 border border-zinc-800">
                  <div>
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase font-mono">Selected Category</div>
                    <div className="text-sm font-bold text-white">{tier.name}</div>
                  </div>
                  <div className="text-sm font-bold text-white font-mono">{tier.price}</div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Full Name <span className="text-zinc-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Axel Michaelowa"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-white transition placeholder:text-zinc-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Official Email Address <span className="text-zinc-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="delegate@institution.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-white transition placeholder:text-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Mobile / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+65 9123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-white transition placeholder:text-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">Organization / Institution</label>
                  <input
                    type="text"
                    placeholder="e.g. Sovereign Authority / Fund"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-white transition placeholder:text-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Designation & Role</label>
                <input
                  type="text"
                  placeholder="e.g. Chief Negotiator / Managing Director"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-white transition placeholder:text-zinc-600"
                />
              </div>

              <div className="flex items-center gap-2 pt-2 text-xs text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>Verified 256-bit institutional encryption. Instant credential confirmation.</span>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-1/3 py-2.5 px-4 rounded-full text-zinc-300 border border-zinc-800 hover:bg-zinc-900 text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 px-4 rounded-full bg-white hover:bg-zinc-200 text-black text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Submit Delegation Request"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
