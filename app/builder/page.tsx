"use client";

import { useBuilderStore } from "@/lib/store";
import StepIndicator from "@/components/builder/StepIndicator";
import BasicInfoStep from "@/components/builder/BasicInfoStep";
import TimelineStep from "@/components/builder/TimelineStep";
import SectionSelector from "@/components/builder/SectionSelector";
import SectionStep from "@/components/builder/SectionStep";
import ReviewStep from "@/components/builder/ReviewStep";
import { SectionType } from "@/lib/types";
import { pdf } from "@react-pdf/renderer";
import EvidenceDocument from "@/components/pdf/EvidenceDocument";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function BuilderPage() {
  const store = useBuilderStore();
  const { currentStep, setStep, sections, basicInfo, timeline } = store;

  const enabledSections = useMemo(
    () => sections.filter((s) => s.enabled),
    [sections]
  );

  // Steps: 0=BasicInfo, 1=Timeline, 2=SectionSelector, 3..N=sections, N+1=Review
  const sectionStartIndex = 3;
  const reviewIndex = sectionStartIndex + enabledSections.length;

  const steps = useMemo(() => {
    const s = [
      { label: "Basic Info" },
      { label: "Timeline" },
      { label: "Sections" },
    ];
    enabledSections.forEach((sec) => s.push({ label: sec.title }));
    s.push({ label: "Review" });
    return s;
  }, [enabledSections]);

  const handleGenerate = async () => {
    const blob = await pdf(
      <EvidenceDocument
        basicInfo={basicInfo}
        timeline={timeline}
        sections={sections}
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `evidence-${basicInfo.petitionerName.replace(/\s+/g, "-").toLowerCase()}-${basicInfo.beneficiaryName.replace(/\s+/g, "-").toLowerCase()}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const goNext = () => setStep(currentStep + 1);
  const goBack = () => setStep(currentStep - 1);

  const renderStep = () => {
    if (currentStep === 0) return <BasicInfoStep onNext={goNext} />;
    if (currentStep === 1) return <TimelineStep onNext={goNext} onBack={goBack} />;
    if (currentStep === 2)
      return <SectionSelector onNext={goNext} onBack={goBack} />;
    if (currentStep === reviewIndex)
      return <ReviewStep onBack={goBack} onGenerate={handleGenerate} />;

    // Section steps
    const sectionIndex = currentStep - sectionStartIndex;
    if (sectionIndex >= 0 && sectionIndex < enabledSections.length) {
      const section = enabledSections[sectionIndex];
      return (
        <SectionStep
          key={section.id}
          sectionId={section.id as SectionType}
          onNext={goNext}
          onBack={goBack}
          isLast={sectionIndex === enabledSections.length - 1}
        />
      );
    }

    return <BasicInfoStep onNext={goNext} />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg"
          >
            <FileText className="w-5 h-5 text-accent" />
            Evidence Builder
          </Link>
          <button
            onClick={() => {
              if (confirm("Reset all progress? This cannot be undone.")) {
                store.resetAll();
              }
            }}
            className="text-sm text-muted hover:text-red-500 transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepClick={setStep}
        />
        {renderStep()}
      </main>
    </div>
  );
}
