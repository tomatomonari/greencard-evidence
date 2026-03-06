import { Document } from "@react-pdf/renderer";
import CoverPage from "./CoverPage";
import TimelinePage from "./TimelinePage";
import PhotoSectionPage from "./PhotoSectionPage";
import ClosingPage from "./ClosingPage";
import { BasicInfo, TimelineEvent, Section } from "@/lib/types";

interface EvidenceDocumentProps {
  basicInfo: BasicInfo;
  timeline: TimelineEvent[];
  sections: Section[];
}

export default function EvidenceDocument({
  basicInfo,
  timeline,
  sections,
}: EvidenceDocumentProps) {
  const enabledSections = sections.filter(
    (s) => s.enabled && s.photos.length > 0
  );

  return (
    <Document>
      <CoverPage basicInfo={basicInfo} />
      <TimelinePage timeline={timeline} />
      {enabledSections.map((section) => (
        <PhotoSectionPage key={section.id} section={section} />
      ))}
      <ClosingPage basicInfo={basicInfo} />
    </Document>
  );
}
