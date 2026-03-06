"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  BasicInfo,
  TimelineEvent,
  Section,
  PhotoItem,
  SectionType,
  SECTION_DEFAULTS,
} from "./types";

interface BuilderState {
  currentStep: number;
  basicInfo: BasicInfo;
  timeline: TimelineEvent[];
  sections: Section[];

  // Navigation
  setStep: (step: number) => void;

  // Basic Info
  updateBasicInfo: (info: Partial<BasicInfo>) => void;

  // Timeline
  addTimelineEvent: (event: TimelineEvent) => void;
  updateTimelineEvent: (id: string, event: Partial<TimelineEvent>) => void;
  removeTimelineEvent: (id: string) => void;

  // Sections
  toggleSection: (sectionId: SectionType) => void;
  updateSectionNarrative: (sectionId: SectionType, narrative: string) => void;
  addPhoto: (sectionId: SectionType, photo: PhotoItem) => void;
  updatePhoto: (
    sectionId: SectionType,
    photoId: string,
    updates: Partial<PhotoItem>
  ) => void;
  removePhoto: (sectionId: SectionType, photoId: string) => void;

  // Reset
  resetAll: () => void;
}

const initialState = {
  currentStep: 0,
  basicInfo: {
    petitionerName: "",
    beneficiaryName: "",
    filingDate: "",
    coverPhoto: undefined,
  },
  timeline: [],
  sections: SECTION_DEFAULTS.map((s) => ({ ...s, photos: [] })),
};

export const useBuilderStore = create<BuilderState>()(
  persist(
    (set) => ({
      ...initialState,

      setStep: (step) => set({ currentStep: step }),

      updateBasicInfo: (info) =>
        set((state) => ({
          basicInfo: { ...state.basicInfo, ...info },
        })),

      addTimelineEvent: (event) =>
        set((state) => ({
          timeline: [...state.timeline, event].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          ),
        })),

      updateTimelineEvent: (id, updates) =>
        set((state) => ({
          timeline: state.timeline
            .map((e) => (e.id === id ? { ...e, ...updates } : e))
            .sort(
              (a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            ),
        })),

      removeTimelineEvent: (id) =>
        set((state) => ({
          timeline: state.timeline.filter((e) => e.id !== id),
        })),

      toggleSection: (sectionId) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId ? { ...s, enabled: !s.enabled } : s
          ),
        })),

      updateSectionNarrative: (sectionId, narrative) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId ? { ...s, narrative } : s
          ),
        })),

      addPhoto: (sectionId, photo) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId ? { ...s, photos: [...s.photos, photo] } : s
          ),
        })),

      updatePhoto: (sectionId, photoId, updates) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId
              ? {
                  ...s,
                  photos: s.photos.map((p) =>
                    p.id === photoId ? { ...p, ...updates } : p
                  ),
                }
              : s
          ),
        })),

      removePhoto: (sectionId, photoId) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId
              ? { ...s, photos: s.photos.filter((p) => p.id !== photoId) }
              : s
          ),
        })),

      resetAll: () => set(initialState),
    }),
    {
      name: "greencard-evidence-store",
    }
  )
);
