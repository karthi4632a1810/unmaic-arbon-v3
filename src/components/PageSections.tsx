/**
 * Inner-page building blocks. Every page is governed by one element, which decides its
 * banner motif and accent hue; each section below then takes a different structural form
 * so no two sections on the site share a layout.
 */
import type { CSSProperties, ReactNode } from "react";
import { OrbitField } from "./ElementMotifs";
import { ScrollReveal } from "./ScrollReveal";
import { ELEMENT_BY_ID, type ElementId } from "../lib/elements";

export function PageBanner({
  element,
  title,
  subtitle,
  backgroundImage,
}: {
  element: ElementId;
  title: string;
  subtitle: string;
  backgroundImage?: string;
}) {
  const { hue, bgImage, elementLabel } = ELEMENT_BY_ID[element];
  const finalBgImage = backgroundImage || bgImage;

  return (
    <section
      className="relative overflow-hidden px-4 pb-12 pt-24 text-white sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pt-32"
      style={{
        backgroundImage: `linear-gradient(125deg, rgba(4,10,20,0.86) 0%, rgba(6,18,32,0.78) 50%, rgba(3,10,22,0.88) 100%), url(${finalBgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto max-w-[1216px]">
        <div className="max-w-4xl border-l-2 pl-5 sm:pl-6" style={{ borderColor: hue }}>
          <div className="flex items-center gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d4d4d8] xs:text-xs">
              UNMAI Carbon Solutions
            </p>
            <span className="text-white/40">•</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
              {elementLabel}
            </span>
          </div>
          <h1 className="display-head mt-3 text-2xl font-bold leading-tight tracking-tight xs:text-3xl sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-white/85 xs:text-base xs:leading-7 sm:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Plain section heading — an eyebrow that names the section, no repeated element label. */
export function SectionHeading({
  eyebrow,
  title,
  paragraph,
  hue = "#4a5568",
  align = "split",
}: {
  eyebrow: string;
  title: string;
  paragraph?: string;
  hue?: string;
  align?: "split" | "center";
}) {
  if (align === "center") {
    return (
      <ScrollReveal>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.24em]"
            style={{ color: hue }}
          >
            {eyebrow}
          </p>
          <h2 className="display-head text-[clamp(1.7rem,4.4vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#131b2e]">
            {title}
          </h2>
          {paragraph ? (
            <p className="text-sm leading-6 text-[#444654] xs:text-base xs:leading-7">
              {paragraph}
            </p>
          ) : null}
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal>
      <div className="mx-auto flex max-w-[1216px] flex-col gap-5 border-b border-black/10 pb-6 sm:gap-6 sm:pb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: hue }}>
            {eyebrow}
          </p>
          <h2 className="display-head max-w-2xl text-[clamp(1.7rem,4.4vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#131b2e]">
            {title}
          </h2>
        </div>
        {paragraph ? (
          <p className="max-w-xl text-sm leading-6 text-[#444654] xs:text-base xs:leading-7 lg:text-right">
            {paragraph}
          </p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}

/* ------------------------------------------------------------------ about */

/** Numbered dossier rows — hairlines, no cards, label column on the left. */
export function DossierList({
  entries,
}: {
  entries: readonly { label: string; title: string; body?: ReactNode; tags?: readonly string[] }[];
}) {
  return (
    <dl className="mx-auto max-w-[1216px] border-t border-black/12">
      {entries.map((entry, i) => (
        <ScrollReveal key={entry.title} delayMs={i * 60}>
          <div className="group grid gap-x-10 gap-y-3 border-b border-black/12 py-7 transition-colors duration-500 hover:bg-neutral-500/[0.03] sm:py-8 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]">
            <dt className="flex items-start gap-3">
              <span
                className="mt-1.5 h-4 w-1 shrink-0 bg-[#4a5568] transition-all duration-500 group-hover:h-6"
                aria-hidden
              />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5c6b62]">
                {entry.label}
              </span>
            </dt>
            <dd className="min-w-0 space-y-3">
              <h3 className="display-head text-xl font-bold tracking-tight text-[#131b2e] sm:text-2xl">
                {entry.title}
              </h3>
              {entry.body ? (
                <div className="text-sm leading-6 text-[#444654] xs:text-base xs:leading-7">
                  {entry.body}
                </div>
              ) : null}
              {entry.tags?.length ? (
                <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#4a5568]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </dd>
          </div>
        </ScrollReveal>
      ))}
    </dl>
  );
}

/* --------------------------------------------------------------- services */

/** Full-width rows, each carrying one element's colour down its leading edge. */
export function SpectrumList({
  items,
}: {
  items: readonly {
    element: ElementId;
    title: string;
    body: string;
    tags: readonly string[];
  }[];
}) {
  return (
    <ol className="mx-auto max-w-[1216px]">
      {items.map((item, i) => {
        const { hue, tint } = ELEMENT_BY_ID[item.element];
        return (
          <li key={item.title} className="list-none">
            <ScrollReveal delayMs={i * 70}>
              <article
                className="group relative grid gap-x-8 gap-y-4 border-b border-black/10 py-7 transition-colors duration-500 sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]"
                style={{ "--el": hue, "--el-tint": tint } as CSSProperties}
              >
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 opacity-0 transition-all duration-500 group-hover:w-full group-hover:opacity-100"
                  style={{
                    backgroundImage: "linear-gradient(to right, var(--el-tint), transparent 70%)",
                  }}
                  aria-hidden
                />

                <div className="relative flex items-start gap-4">
                  <span
                    className="mt-1 h-8 w-1.5 shrink-0 transition-all duration-500 group-hover:h-14"
                    style={{ backgroundColor: "var(--el)" }}
                    aria-hidden
                  />
                  <h3 className="display-head text-xl font-bold leading-snug tracking-tight text-[#131b2e] sm:text-2xl">
                    {item.title}
                  </h3>
                </div>

                <div className="relative min-w-0 space-y-4">
                  <p className="text-sm leading-6 text-[#444654] xs:text-base xs:leading-7">
                    {item.body}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]"
                        style={{ borderColor: "var(--el)", color: "var(--el)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------- digital infrastructure */

/** Slabs seen slightly from above: a lit top edge, each one stepped further right. */
const SLAB_STEP = ["lg:ml-0", "lg:ml-10", "lg:ml-20"] as const;

export function SlabStack({
  items,
}: {
  items: readonly { title: string; body: string; tags: readonly string[] }[];
}) {
  return (
    <ol className="mx-auto max-w-[1216px] space-y-4 sm:space-y-5">
      {items.map((item, i) => (
        <li key={item.title} className={`list-none ${SLAB_STEP[i] ?? ""}`}>
          <ScrollReveal delayMs={i * 90}>
            <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-[#141416] transition duration-500 hover:border-white/25 hover:bg-[#1a1a1e]">
              <span
                className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-white/60 via-white/20 to-transparent"
                aria-hidden
              />
              <div className="grid gap-4 p-5 pt-7 sm:p-7 sm:pt-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-10">
                <h3 className="display-head text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                  {item.title}
                </h3>
                <div className="min-w-0 space-y-4">
                  <p className="text-sm leading-6 text-[#c9cbc9] xs:text-base xs:leading-7">
                    {item.body}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ roster */

/** Dark index band — reference lists rendered as a starfield roster, not pills. */
export function RosterBand({
  eyebrow,
  title,
  items,
  columns = 3,
}: {
  eyebrow: string;
  title: string;
  items: readonly string[];
  columns?: 2 | 3;
}) {
  return (
    <section className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-hidden bg-[#0a0d16] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <OrbitField className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-white/20" />

      <div className="relative mx-auto max-w-[1216px]">
        <ScrollReveal>
          <div className="flex flex-col gap-2 border-b border-white/12 pb-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-neutral-400">
              {eyebrow}
            </p>
            <h2 className="display-head text-xl font-bold tracking-tight text-white xs:text-2xl sm:text-3xl">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <ul
          className={`mt-6 grid gap-x-8 gap-y-px sm:grid-cols-2 ${
            columns === 3 ? "lg:grid-cols-3" : ""
          }`}
        >
          {items.map((item, i) => (
            <li key={item} className="list-none">
              <ScrollReveal delayMs={i * 30}>
                <span className="flex items-center gap-3 border-b border-white/8 py-3 text-sm font-semibold text-white/85 transition-colors duration-300 hover:text-white">
                  <span className="size-1 shrink-0 rounded-full bg-neutral-400" aria-hidden />
                  {item}
                </span>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
