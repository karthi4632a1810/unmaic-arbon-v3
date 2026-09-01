import type { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";
import {
  FOOTER_STRATEGIC_SERVICES,
  GLOBAL_ENGAGEMENT_COUNTRIES,
  INSTITUTIONAL_PARTICIPATION,
} from "../data/siteReference";

const COLUMN_ICONS: Record<string, ReactNode> = {
  services: (
    <>
      <path d="m12 3.4 8.4 4.2-8.4 4.2-8.4-4.2 8.4-4.2z" />
      <path d="m4.2 12 7.8 3.9 7.8-3.9" />
      <path d="m4.2 16.2 7.8 3.9 7.8-3.9" />
    </>
  ),
  engagements: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <ellipse cx="12" cy="12" rx="3.4" ry="8.4" />
      <path d="M3.9 9.2h16.2M3.9 14.8h16.2" />
    </>
  ),
  institutions: (
    <>
      <path d="M3.6 9.4 12 4.6l8.4 4.8" />
      <path d="M5.8 10.6v7.2M10 10.6v7.2M14 10.6v7.2M18.2 10.6v7.2" />
      <path d="M3.6 19.4h16.8" />
    </>
  ),
};

function ReferenceColumn({
  icon,
  title,
  items,
  twoUp = false,
  twoUpFrom = "sm",
}: {
  icon: keyof typeof COLUMN_ICONS;
  title: string;
  items: readonly string[];
  /** Long lists split into two reading columns, as in the reference. */
  twoUp?: boolean;
  /** Short entries can split on phones too; long ones wait for `sm`. */
  twoUpFrom?: "xs" | "sm";
}) {
  const columnsClass = !twoUp
    ? ""
    : twoUpFrom === "xs"
      ? "xs:columns-2 xs:gap-x-6 xs:space-y-0 xs:[&>li]:mb-3"
      : "sm:columns-2 sm:gap-x-6 sm:space-y-0 sm:[&>li]:mb-3";

  return (
    <div>
      <div className="flex items-center gap-4">
        <span
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#131b2e]/8 bg-neutral-100 text-neutral-700 shadow-sm"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {COLUMN_ICONS[icon]}
          </svg>
        </span>
        <div>
          <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#131b2e] sm:text-sm">
            {title}
          </h3>
          <span className="mt-2 block h-0.75 w-9 rounded-full bg-neutral-800" aria-hidden />
        </div>
      </div>

      <ul className={`mt-6 space-y-3 text-[13px] leading-6 text-[#4d5a63] sm:text-sm ${columnsClass}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 break-inside-avoid">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-400" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FooterReferenceColumns() {
  return (
    <ScrollReveal>
      <div className="border-t border-[#131b2e]/8 py-10">
        <div className="grid gap-9 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-[#131b2e]/8">
          <div className="lg:pr-9">
            <ReferenceColumn
              icon="services"
              title="Strategic Services"
              items={FOOTER_STRATEGIC_SERVICES}
            />
          </div>
          <div className="lg:px-9">
            <ReferenceColumn
              icon="engagements"
              title="Global Engagements"
              items={GLOBAL_ENGAGEMENT_COUNTRIES}
              twoUp
              twoUpFrom="xs"
            />
          </div>
          <div className="lg:pl-9">
            <ReferenceColumn
              icon="institutions"
              title="Institutional Participation"
              items={INSTITUTIONAL_PARTICIPATION}
              twoUp
            />
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
