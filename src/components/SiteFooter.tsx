import { ScrollReveal } from "./ScrollReveal";
import imgLogoBlack from "../assets/logo-b.png";

export function SiteFooter() {
  return (
    <footer className="bg-[#f9f9f9]">
      <ScrollReveal>
        <div className="mx-auto max-w-255 px-6 pb-8 pt-16">
          <div className="grid gap-12 border-b border-black/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_0.8fr]">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                  <img src={imgLogoBlack} alt="Unmai Carbon mark" className="h-full w-full object-contain" />
                </div>
                <div className="space-y-1">
                  <span className="block text-xl font-black leading-[1.05] tracking-tight text-black">
                    Unmai Carbon Solutions
                  </span>
                  <span className="block text-[12px] font-bold leading-[1.05] tracking-tight text-black/50">
                    Truth · Transparency · Traceability · Integrity
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-black">
                Singapore HQ
                <br />
                10, Sim Lim Tower, Jalan Besar #10-10,
                <br />
                Singapore 208787
                <br />
                Email: ydb@unmaicarbon.earth
                <br />
                Phone: +65 9023 1823
                <br />
                Website: www.unmaicarbon.earth
              </p>
              <div className="flex gap-2 pt-2">
                <a
                  href="#"
                  className="flex size-8 items-center justify-center rounded-md border border-black/10 bg-black/5 text-black/70 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 hover:text-black hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0"
                  aria-label="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path d="M6.94 8.98H3.8v10.1h3.14V8.98ZM5.37 7.6a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64ZM20.2 19.08v-5.55c0-2.97-1.58-4.35-3.69-4.35-1.7 0-2.46.94-2.88 1.59V8.98h-3.01c.04.84 0 10.1 0 10.1h3.13v-5.64c0-.3.02-.6.11-.82.23-.6.76-1.22 1.65-1.22 1.16 0 1.63.89 1.63 2.19v5.49h3.06Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex size-8 items-center justify-center rounded-md border border-black/10 bg-black/5 text-black/70 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 hover:text-black hover:shadow-md active:translate-y-0 motion-reduce:hover:translate-y-0"
                  aria-label="X"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-3.5"
                    aria-hidden="true"
                  >
                    <path d="M13.86 10.47 21.14 2h-1.72l-6.32 7.35L8.05 2H2.23l7.64 11.12L2.23 22h1.72l6.68-7.76L15.96 22h5.82l-7.92-11.53Zm-2.37 2.75-.77-1.1L4.56 3.3h2.66l4.96 7.1.77 1.1 6.47 9.26h-2.66l-5.27-7.54Z" />
                  </svg>
                </a>
              </div>
            </div>
            <FooterSection
              title="Strategic Services"
              items={[
                "Net Zero Transition",
                "Climate Policy Advisory",
                "Climate Finance",
                "Article 6 Implementation",
                "Carbon Registry Systems",
                "Digital MRV Infrastructure",
              ]}
            />
            <FooterSection
              title="Global Engagements"
              items={[
                "Bhutan",
                "Nigeria",
                "Indonesia",
                "Sri Lanka",
                "Oman",
                "Saudi Arabia",
                "Pakistan",
                "Kenya",
              ]}
            />
            <FooterSection
              title="Institutional Participation"
              items={[
                "ISO Standards",
                "UNFCCC Engagements",
                "CAD Trust",
                "VCMI",
                "BioCarbon Standard",
                "World Bank Collaboration",
              ]}
            />
          </div>
        </div>
      </ScrollReveal>
      <div className="bg-[#45464d] px-6 py-6">
        <div className="mx-auto flex max-w-[1020px] flex-col items-start justify-between gap-4 text-xs text-white sm:flex-row sm:items-center">
          <p>© 2026 UNMAI Carbon Solutions Pte Ltd.</p>
          <p>Truth • Transparency • Traceability • Integrity</p>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-black">{title}</h3>
      <ul className="space-y-2.5 text-sm text-black">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="inline-block transition duration-200 ease-out hover:text-[#006c49] hover:underline">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
