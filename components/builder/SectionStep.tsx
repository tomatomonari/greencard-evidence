"use client";

import { useBuilderStore } from "@/lib/store";
import { SectionType } from "@/lib/types";
import PhotoUploader from "@/components/ui/PhotoUploader";
import PhotoCard from "@/components/ui/PhotoCard";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";

interface SectionStepProps {
  sectionId: SectionType;
  onNext: () => void;
  onBack: () => void;
  isLast?: boolean;
}

export default function SectionStep({
  sectionId,
  onNext,
  onBack,
  isLast,
}: SectionStepProps) {
  const { sections, addPhoto, updatePhoto, removePhoto, updateSectionNarrative } =
    useBuilderStore();

  const section = sections.find((s) => s.id === sectionId);
  if (!section) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
        <p className="text-muted">{section.prompt}</p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Description / Narrative (optional)
        </label>
        <textarea
          value={section.narrative || ""}
          onChange={(e) => updateSectionNarrative(sectionId, e.target.value)}
          placeholder="Tell the story behind these photos..."
          rows={3}
          className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm resize-none"
        />
      </div>

      <PhotoUploader onUpload={(photo) => addPhoto(sectionId, photo)} />

      {section.photos.length === 0 ? (
        <div className="text-center py-8 text-muted">
          <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No photos yet. Upload some above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {section.photos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onUpdate={(updates) => updatePhoto(sectionId, photo.id, updates)}
              onRemove={() => removePhoto(sectionId, photo.id)}
            />
          ))}
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-lg font-medium hover:bg-blue-900 transition-colors"
        >
          {isLast ? "Review" : "Next Section"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
