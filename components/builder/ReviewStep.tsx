"use client";

import { useBuilderStore } from "@/lib/store";
import { CATEGORY_LABELS } from "@/lib/types";
import {
  ArrowLeft,
  Download,
  Loader2,
  User,
  CalendarDays,
  ImageIcon,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface ReviewStepProps {
  onBack: () => void;
  onGenerate: () => Promise<void>;
}

export default function ReviewStep({ onBack, onGenerate }: ReviewStepProps) {
  const { basicInfo, timeline, sections } = useBuilderStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const enabledSections = sections.filter((s) => s.enabled);
  const totalPhotos = enabledSections.reduce(
    (sum, s) => sum + s.photos.length,
    0
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await onGenerate();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review & Generate</h2>
        <p className="text-muted">
          Review your evidence packet before generating the PDF.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-border rounded-lg p-4 text-center">
          <User className="w-6 h-6 mx-auto mb-1 text-accent" />
          <div className="text-xs text-muted">Petitioner</div>
          <div className="text-sm font-medium truncate">
            {basicInfo.petitionerName}
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-4 text-center">
          <User className="w-6 h-6 mx-auto mb-1 text-accent" />
          <div className="text-xs text-muted">Beneficiary</div>
          <div className="text-sm font-medium truncate">
            {basicInfo.beneficiaryName}
          </div>
        </div>
        <div className="bg-white border border-border rounded-lg p-4 text-center">
          <CalendarDays className="w-6 h-6 mx-auto mb-1 text-accent" />
          <div className="text-xs text-muted">Timeline Events</div>
          <div className="text-sm font-medium">{timeline.length}</div>
        </div>
        <div className="bg-white border border-border rounded-lg p-4 text-center">
          <ImageIcon className="w-6 h-6 mx-auto mb-1 text-accent" />
          <div className="text-xs text-muted">Total Photos</div>
          <div className="text-sm font-medium">{totalPhotos}</div>
        </div>
      </div>

      {/* Timeline preview */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <CalendarDays className="w-4 h-4" /> Timeline
        </h3>
        {timeline.length === 0 ? (
          <p className="text-sm text-muted">No timeline events.</p>
        ) : (
          <div className="space-y-1.5">
            {timeline.map((event) => (
              <div key={event.id} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                <span className="text-muted w-24 shrink-0">{event.date}</span>
                <span>{event.description}</span>
                <span className="text-xs text-muted ml-auto">
                  {CATEGORY_LABELS[event.category]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sections preview */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" /> Sections
        </h3>
        <div className="space-y-2">
          {enabledSections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between text-sm py-1.5 border-b border-border last:border-0"
            >
              <span>{section.title}</span>
              <div className="flex items-center gap-2">
                {section.photos.length > 0 && (
                  <span className="text-xs bg-accent-light text-accent px-2 py-0.5 rounded-full">
                    {section.photos.length} photo
                    {section.photos.length !== 1 ? "s" : ""}
                  </span>
                )}
                {section.narrative && (
                  <span className="text-xs bg-gray-100 text-muted px-2 py-0.5 rounded-full">
                    Has narrative
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-blue-900 disabled:opacity-70 transition-colors text-lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Download className="w-5 h-5" /> Generate PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}
