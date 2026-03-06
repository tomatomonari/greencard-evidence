export type EventCategory =
  | "first-meeting"
  | "started-dating"
  | "trip"
  | "engagement"
  | "wedding"
  | "moved-in"
  | "family-event"
  | "other";

export interface TimelineEvent {
  id: string;
  date: string;
  description: string;
  category: EventCategory;
}

export interface PhotoItem {
  id: string;
  dataUrl: string; // base64 data URL (compressed)
  caption?: string;
  who?: string;
  date?: string;
  location?: string;
  isReceipt?: boolean;
}

export type SectionType =
  | "wedding"
  | "engagement"
  | "how-we-met"
  | "trips"
  | "family"
  | "friends"
  | "conversations"
  | "social-media"
  | "miscellaneous";

export interface Section {
  id: SectionType;
  title: string;
  prompt: string;
  photos: PhotoItem[];
  narrative?: string;
  enabled: boolean;
}

export interface BasicInfo {
  petitionerName: string;
  beneficiaryName: string;
  filingDate: string;
  coverPhoto?: string; // base64 data URL
}

export interface EvidenceData {
  basicInfo: BasicInfo;
  timeline: TimelineEvent[];
  sections: Section[];
}

export const SECTION_DEFAULTS: Section[] = [
  {
    id: "wedding",
    title: "Wedding Day",
    prompt: "Upload photos from your wedding ceremony and reception.",
    photos: [],
    narrative: "",
    enabled: true,
  },
  {
    id: "engagement",
    title: "Engagement",
    prompt: "Upload photos of the proposal, ring, and any engagement celebrations.",
    photos: [],
    narrative: "",
    enabled: true,
  },
  {
    id: "how-we-met",
    title: "How We Met",
    prompt: "Share photos from when you first met or early in your relationship.",
    photos: [],
    narrative: "",
    enabled: true,
  },
  {
    id: "trips",
    title: "Trips & Events",
    prompt: "Upload photos from trips, vacations, and events you attended together. Include any receipts (flights, hotels).",
    photos: [],
    narrative: "",
    enabled: true,
  },
  {
    id: "family",
    title: "Meeting Family",
    prompt: "Upload photos of meeting each other's families. Note who is in each photo.",
    photos: [],
    narrative: "",
    enabled: true,
  },
  {
    id: "friends",
    title: "Friends & Family Photos",
    prompt: "Upload photos with friends and extended family at gatherings, holidays, etc.",
    photos: [],
    narrative: "",
    enabled: false,
  },
  {
    id: "conversations",
    title: "Conversations",
    prompt: "Upload screenshots of text messages, calls, or chats that show your ongoing communication.",
    photos: [],
    narrative: "",
    enabled: false,
  },
  {
    id: "social-media",
    title: "Social Media",
    prompt: "Upload screenshots of social media posts, comments, or profile updates showing your relationship.",
    photos: [],
    narrative: "",
    enabled: false,
  },
  {
    id: "miscellaneous",
    title: "Miscellaneous",
    prompt: "Upload any other evidence: pet photos, joint purchases, lease agreements, sonograms, etc.",
    photos: [],
    narrative: "",
    enabled: false,
  },
];

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  "first-meeting": "First Meeting",
  "started-dating": "Started Dating",
  trip: "Trip",
  engagement: "Engagement",
  wedding: "Wedding",
  "moved-in": "Moved In Together",
  "family-event": "Family Event",
  other: "Other",
};
