import React from "react";
import type { SectionType } from "../../types/event";

import { PublicHero } from "./PublicHero";
import { PublicEventInfo } from "./PublicEventInfo";
import { PublicCountdown } from "./PublicCountdown";
import { PublicAbout } from "./PublicAbout";
import { PublicHighlights } from "./PublicHighlights";
import { PublicSpeakers } from "./PublicSpeakers";
import { PublicSchedule } from "./PublicSchedule";
import { PublicVenue } from "./PublicVenue";
import { PublicGallery } from "./PublicGallery";
import { PublicSponsors } from "./PublicSponsors";
import { PublicTestimonials } from "./PublicTestimonials";
import { PublicFaq } from "./PublicFaq";
import { PublicRegistration } from "./PublicRegistration";
import { PublicVideo } from "./PublicVideo";
import { PublicRichText } from "./PublicRichText";
import { PublicContact } from "./PublicContact";
import { PublicTable } from "./PublicTable";

export const sectionRegistry: Record<SectionType, React.FC<any>> = {
  hero: PublicHero,
  eventInfo: PublicEventInfo,
  countdown: PublicCountdown,
  about: PublicAbout,
  highlights: PublicHighlights,
  speakers: PublicSpeakers,
  schedule: PublicSchedule,
  venue: PublicVenue,
  gallery: PublicGallery,
  sponsors: PublicSponsors,
  testimonials: PublicTestimonials,
  faq: PublicFaq,
  registration: PublicRegistration,
  video: PublicVideo,
  richText: PublicRichText,
  contact: PublicContact,
  table: PublicTable,
};
