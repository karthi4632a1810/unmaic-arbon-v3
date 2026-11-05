import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import type { ContactContent, EventBranding } from "../../types/event";

interface PublicContactProps {
  content: ContactContent;
  branding?: EventBranding;
}

export const PublicContact: React.FC<PublicContactProps> = ({ content }) => {
  return (
    <section className="py-20 sm:py-24 bg-black text-white border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="display-head text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight uppercase">
            {content.heading}
          </h2>
          {content.subtitle && (
            <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
              {content.subtitle}
            </p>
          )}
        </div>

        <div className="bg-zinc-950 rounded-2xl p-6 sm:p-8 border border-zinc-800 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            {content.email && (
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-white/10 text-white border border-white/20 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Secretariat Email</div>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-sm font-bold text-white hover:text-zinc-300 transition font-mono"
                  >
                    {content.email}
                  </a>
                </div>
              </div>
            )}

            {content.phone && (
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-white/10 text-white border border-white/20 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Secretariat Helpline</div>
                  <a
                    href={`tel:${content.phone}`}
                    className="text-sm font-bold text-white hover:text-zinc-300 transition font-mono"
                  >
                    {content.phone}
                  </a>
                </div>
              </div>
            )}

            {content.address && (
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-white/10 text-white border border-white/20 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-zinc-400 uppercase font-mono">Global Headquarters</div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-0.5">
                    {content.address}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide mb-1 font-mono">Sovereign & Observer Inquiries</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                For official ministerial delegations, bilateral Article 6 dialogues, or legacy credit transition inquiries, submit a communication directly to our Singapore Secretariat.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800">
              <a
                href={`mailto:${content.email || "summit@unmaicarbon.earth"}?subject=Delegation Inquiry`}
                className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-zinc-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Direct Communication</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
