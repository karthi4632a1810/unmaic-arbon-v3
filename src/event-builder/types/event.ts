export type SectionType =
  | "hero"
  | "eventInfo"
  | "countdown"
  | "about"
  | "highlights"
  | "speakers"
  | "schedule"
  | "venue"
  | "gallery"
  | "sponsors"
  | "testimonials"
  | "faq"
  | "registration"
  | "video"
  | "richText"
  | "contact"
  | "table";

export interface EventBranding {
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  textColor?: string;
  backgroundColor?: string;
  font: "Inter" | "Plus Jakarta Sans" | "Playfair Display" | "Outfit" | "Space Grotesk" | string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  buttonStyle: "rounded-md" | "rounded-full" | "rounded-none";
  sectionSpacing?: "compact" | "standard" | "spacious";
  containerWidth?: "standard" | "wide" | "compact";
  themePreset?: "modern" | "medical" | "corporate" | "luxury" | "dark" | "minimal" | string;
}

export interface HeaderNavLink {
  label: string;
  link: string;
  isAnchor?: boolean;
}

export interface HeaderCTAButtonSettings {
  visible: boolean;
  label: string;
  link: string;
  targetType?: "section" | "external";
  openNewTab?: boolean;
  presetStyle?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  borderRadius?: string;
  style?: "primary" | "secondary" | "outline" | "ghost";
}

export interface HeaderGradientStop {
  color: string;
  opacity: number;
}

export interface HeaderGradientSettings {
  angle: number;
  stops: HeaderGradientStop[];
}

export interface EventHeader {
  visible: boolean;
  layoutStyle?: "left-nav-right" | "left-nav-center" | "center-logo-split" | "stacked-center" | "minimal";
  layout: "full" | "centered";
  fullWidth?: boolean;
  position: "normal" | "fixed" | "floating";
  fixedTrigger?: "section1" | "custom-pixel";
  fixedTriggerPixels?: number;
  scrollChangeColor?: boolean;
  scrolledBackgroundType?: "solid" | "blur" | "gradient";
  scrolledBackgroundColor?: string;
  scrolledTextColor?: string;
  scrolledHoverColor?: string;
  backgroundType?: "solid" | "gradient" | "transparent" | "blur";
  backgroundColor?: string;
  backgroundOpacity?: number;
  gradient?: HeaderGradientSettings;
  textColor?: string;
  hoverTextColor?: string;
  topGap: 0 | 8 | 16 | 24;
  radius: "none" | "small" | "medium" | "large" | "full";
  background: "transparent" | "solid" | "blur";
  scrollBehavior: "always-visible" | "hide-on-scroll" | "transparent-to-solid" | "shrink";
  logoType?: "text" | "image";
  logoText?: string;
  logoImage?: string;
  logoWidth?: number;
  navigation: HeaderNavLink[];
  ctaButton?: HeaderCTAButtonSettings;
}

export interface HeroCTAButton {
  id: string;
  label: string;
  link: string;
  targetType?: "section" | "external";
  sectionTarget?: string;
  openNewTab?: boolean;
  style: "primary" | "secondary" | "outline" | "ghost";
  icon?: string;
  presetStyle?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  borderRadius?: string;
}

export interface HeroContent {
  heading: string;
  subtitle?: string;
  description?: string;
  bgType: "image" | "video" | "gradient" | "solid";
  desktopImage?: string;
  mobileImage?: string;
  videoUrl?: string;
  gradientFrom?: string;
  gradientTo?: string;
  gradientAngle?: number;
  solidColor?: string;
  overlay: "none" | "dark" | "light" | "custom";
  overlayColor?: string;
  overlayStrength: number; // 0 to 100
  contentAlignment: "left" | "center" | "right";
  verticalPosition: "top" | "center" | "bottom";
  contentWidth: "small" | "medium" | "large";
  animation: "none" | "fade-in" | "fade-up" | "zoom-in" | "slide-up";
  buttons: HeroCTAButton[];
  badgeText?: string;
}

export interface EventInfoContent {
  dateLabel: string;
  timeLabel: string;
  locationLabel: string;
  venueName: string;
  organizerName: string;
  organizerLogo?: string;
  badge?: string;
  calendarLink?: boolean;
}

export interface CountdownContent {
  title: string;
  subtitle?: string;
  targetDate?: string;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  expiredMessage?: string;
  ctaText?: string;
  ctaLink?: string;
  ctaTargetType?: "external" | "section";
  ctaSectionTarget?: string;
  // Layout and style
  layoutStyle?: "minimal" | "radar" | "compact" | "cards" | "split";
  cardBackground?: "dark" | "black" | "glass" | "white" | "custom" | string;
  customCardBgColor?: string;
  backgroundColor?: string;
  // Visibility toggles
  showTitle?: boolean;
  showSubtitle?: boolean;
  showCta?: boolean;
  showChronoBadge?: boolean;
  showTopRibbon?: boolean;
  showDecorativeGraphics?: boolean;
  showModeToggle?: boolean;
  showFootnote?: boolean;
  showFooterStrip?: boolean;
  // Editable extra elements
  topRibbonLeft?: string;
  topRibbonRight?: string;
  footnote?: string;
  footerStripLeft?: string;
  footerStripRight?: string;
  defaultViewMode?: "standard" | "total-hours";
}

export interface AboutContent {
  badge?: string;
  eyebrow?: string;
  heading: string;
  description?: string;
  richTextHtml: string;
  bulletPoints?: string[];
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  layout: "text-image" | "image-text" | "centered";
  stats?: Array<{ label: string; value: string }>;
}

export interface HighlightCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
  linkText?: string;
  linkUrl?: string;
  accentColor?: string;
}

export interface HighlightsContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  columns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  cards: HighlightCard[];
  layoutStyle?: "cards" | "minimal" | "glass" | "bordered" | "gradient" | "numbered" | "bento" | string;
  cardBackground?: "dark" | "black" | "glass" | "zinc" | "white" | "slate" | "navy" | "gradient" | "custom" | string;
  customCardBgColor?: string;
  backgroundColor?: string;
  iconStyle?: "rounded" | "circle" | "badge" | "glow" | "minimal" | string;
  accentColor?: string;
  contentAlignment?: "left" | "center" | string;
  showCardNumbers?: boolean;
  showCardBadges?: boolean;
}

export interface SpeakerItem {
  id: string;
  name: string;
  designation: string;
  organization: string;
  photo?: string;
  avatarUrl?: string;
  role?: string;
  topics?: string[];
  bio?: string;
  featured?: boolean;
  keynoteLabel?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

export interface SpeakersContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  layout?: "1-column" | "2-column" | "3-column" | "4-column" | "1-col" | "2-col" | "3-col" | "4-col" | "featured-grid" | "carousel" | string;
  columns?: 1 | 2 | 3 | 4;
  speakers: SpeakerItem[];
  backgroundColor?: string;
  cardBackground?: "dark" | "black" | "glass" | "zinc" | "white" | "slate" | "navy" | "custom" | string;
  customCardBgColor?: string;
  cardBorderColor?: string;
  textColor?: string;
  accentColor?: string;
  cardStyle?: "card" | "minimal" | "rounded-avatar" | "glass" | "compact" | "text-only" | string;
  hidePhotos?: boolean;
}

export interface ScheduleItem {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  speaker?: string;
  speakerName?: string;
  speakerRole?: string;
  speakerPhoto?: string;
  description?: string;
  room?: string;
  track?: string;
  category?: string;
}

export interface ScheduleDay {
  id: string;
  dayNumber?: number;
  dateLabel?: string;
  dayLabel?: string;
  date?: string;
  title?: string;
  items: ScheduleItem[];
  sessions?: ScheduleItem[];
}

export interface ScheduleContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  layout?: "timeline" | "tabs" | "table" | string;
  days: ScheduleDay[];
}

export interface VenueContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  venueName: string;
  address: string;
  city: string;
  country?: string;
  mapEmbedUrl?: string;
  directionsUrl?: string;
  contactPhone?: string;
  contactEmail?: string;
  travelInfo?: string;
  travelNotes?: string;
  nearbyHotels?: string[];
  venueImage?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  altText?: string;
}

export interface GalleryContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  layout?: "grid" | "masonry" | "carousel" | "1-column" | "2-column" | "3-column" | "4-column" | string;
  columns?: 1 | 2 | 3 | 4;
  images: GalleryItem[];
  backgroundColor?: string;
  cardBackground?: "dark" | "black" | "glass" | "zinc" | "white" | "custom" | string;
  customCardBgColor?: string;
  cardBorderColor?: string;
  textColor?: string;
  aspectRatio?: "4/3" | "16/9" | "square" | "portrait" | "auto" | string;
  cardStyle?: "card" | "minimal" | "glass" | "bordered" | string;
  downloads?: { id: string; label: string; url: string; isExternal?: boolean }[];
}

export interface SponsorItem {
  id: string;
  name: string;
  logo: string;
  website?: string;
  tier: "Platinum" | "Gold" | "Silver" | "Partner" | string;
}

export interface SponsorTier {
  id?: string;
  name?: string;
  tierName?: string;
  color?: string;
  sponsors: SponsorItem[];
}

export interface SponsorsContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  tiers: SponsorTier[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization?: string;
  quote: string;
  photo?: string;
  rating?: number;
}

export interface TestimonialsContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  items: TestimonialItem[];
  testimonials?: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContent {
  badge?: string;
  heading: string;
  eyebrow?: string;
  subtitle?: string;
  items: FaqItem[];
}

export interface TicketTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  isPopular?: boolean;
  buttonText?: string;
  buttonLabel?: string;
  linkUrl?: string;
}

export interface RegistrationContent {
  badge?: string;
  heading: string;
  subtitle?: string;
  description?: string;
  buttonLabel?: string;
  ctaType?: "modal-form" | "external" | "section" | "whatsapp" | "email" | "phone";
  ctaSectionTarget?: string;
  linkType?: "form" | "external" | "whatsapp" | "email" | "phone";
  externalUrl?: string;
  whatsappNumber?: string;
  emailContact?: string;
  linkUrl?: string;
  tiers: TicketTier[];
  pricingTiers?: TicketTier[];
  bgImage?: string;
  urgencyText?: string;
}

export interface VideoContent {
  heading: string;
  subtitle?: string;
  videoType: "youtube" | "vimeo" | "direct";
  videoUrl: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
}

export interface RichTextContent {
  heading?: string;
  contentHtml: string;
  alignment?: "left" | "center" | "right";
  containerWidth?: "standard" | "wide" | "narrow" | "compact";
}

export interface ContactSocial {
  platform: string;
  url: string;
}

export interface ContactContent {
  heading: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  socials?: ContactSocial[];
}

export interface TableColumn {
  id: string;
  key: string;
  label: string;
  width?: string;
}

export interface TableRow {
  id: string;
  label?: string; // For key-value layout
  value?: string; // For key-value layout
  highlight?: boolean;
  badge?: string;
  link?: string;
  linkText?: string;
  targetType?: "external" | "section";
  sectionTarget?: string;
  [key: string]: any;
}

export interface TableContent {
  badge?: string;
  heading: string;
  subtitle?: string;
  showHeader?: boolean;
  layoutStyle?: "key-value" | "grid-table" | "cards";
  striped?: boolean;
  bordered?: boolean;
  columns?: TableColumn[];
  rows: TableRow[];
  backgroundColor?: string;
  cardBackground?: "white" | "dark" | "zinc" | "transparent" | "glass" | string;
  customCardBgColor?: string;
  textColor?: string;
  showFooter?: boolean;
  ctaText?: string;
  ctaLink?: string;
  footnote?: string;
  footerTargetType?: "external" | "section";
  footerSectionTarget?: string;
}

export interface EventSection<T = any> {
  id: string;
  type: SectionType;
  visible: boolean;
  anchorId?: string;
  settings: {
    paddingY?: "none" | "small" | "standard" | "large";
    bgType?: "default" | "muted" | "dark" | "accent" | "custom";
    customBgColor?: string;
    animation?: "none" | "fade" | "fade-up" | "scale";
    customClass?: string;
    [key: string]: any;
  };
  content: T;
}

export interface EventFooter {
  visible: boolean;
  copyrightText: string;
  disclaimer?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
  quickLinks?: Array<{ label: string; link: string; targetType?: "external" | "section"; sectionTarget?: string }>;
  backgroundColor?: string;
  textColor?: string;
  organizationName?: string;
  showBackToTop?: boolean;
  showBrandBadge?: boolean;
  brandBadgeText?: string;
  showDisclaimer?: boolean;
  showQuickLinks?: boolean;
  layoutStyle?: "standard" | "minimal" | "centered" | "split";
  [key: string]: any;
}

export interface EventSEO {
  title: string;
  description: string;
  image?: string;
  canonicalUrl?: string;
  keywords?: string;
}

export interface EventDocument {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published" | "archived";
  published: boolean;
  startDate: string;
  endDate?: string;
  timezone: string;
  category?: string;
  schemaVersion: number;
  branding: EventBranding;
  header: EventHeader;
  hero: EventSection<HeroContent>;
  sections: EventSection[];
  footer: EventFooter;
  seo: EventSEO;
  analytics?: {
    views: number;
    ctaClicks: number;
    registrations: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EventTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  configuration: Omit<EventDocument, "id" | "name" | "slug" | "createdAt" | "updatedAt">;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  category: "all" | "backgrounds" | "speakers" | "sponsors" | "gallery" | "logos";
  createdAt: string;
}
