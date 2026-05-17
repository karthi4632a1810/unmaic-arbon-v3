import { ScrollReveal } from "./ScrollReveal";

export function SiteCta() {
  return (
    <section className="px-4 pt-16 pb-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32 lg:pb-24">
      <ScrollReveal>
        <div className="relative mx-auto max-w-[1216px] overflow-hidden rounded-[32px] bg-black px-8 py-16 text-center shadow-2xl shadow-black/30 transition duration-300 ease-out hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
            <div className="absolute inset-y-0 left-[25%] w-px bg-white" />
            <div className="absolute inset-y-0 right-[25%] w-px bg-white" />
            <div className="absolute left-0 right-0 top-[28%] h-px bg-white" />
          </div>
          <div className="relative mx-auto flex max-w-3xl flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-none sm:tracking-[-1.92px]">
              Partner to Operationalize High-Integrity Carbon Markets.
            </h2>
            <p className="text-base leading-7 text-white/70 sm:text-lg">
              Bridging climate policy, carbon finance, and digital innovation through sovereign-grade
              advisory and interoperable carbon infrastructure.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
