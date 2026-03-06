"use client";

import { useBuilderStore } from "@/lib/store";
import { SectionType } from "@/lib/types";
import { ArrowLeft, ArrowRight, ToggleLeft, ToggleRight } from "lucide-react";

interface SectionSelectorProps {
  onNext: () => void;
  onBack: () => void;
}

export default function SectionSelector({ onNext, onBack }: SectionSelectorProps) {
  const { sections, toggleSection } = useBuilderStore();

  const enabledCount = sections.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Sections</h2>
        <p className="text-muted">
          Select which evidence sections to include. You can skip sections that
          don&apos;t apply to your relationship.
        </p>
      </div>

      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => toggleSection(section.id as SectionType)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors text-left
              ${
                section.enabled
                  ? "border-accent bg-accent-light"
                  : "border-border bg-white hover:bg-gray-50"
              }`}
          >
            {section.enabled ? (
              <ToggleRight className="w-5 h-5 text-accent shrink-0" />
            ) : (
              <ToggleLeft className="w-5 h-5 text-muted shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{section.title}</div>
              <div className="text-xs text-muted truncate">
                {section.prompt}
              </div>
            </div>
            {section.photos.length > 0 && (
              <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
                {section.photos.length} photos
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted">
        {enabledCount} section{enabledCount !== 1 ? "s" : ""} selected
      </p>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={enabledCount === 0}
          className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continue <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
