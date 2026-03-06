import { Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import { BasicInfo } from "@/lib/types";

interface CoverPageProps {
  basicInfo: BasicInfo;
}

export default function CoverPage({ basicInfo }: CoverPageProps) {
  return (
    <Page size="LETTER" style={styles.coverPage}>
      <Text style={styles.coverTitle}>Photographic Evidence</Text>
      <Text style={styles.coverSubtitle}>
        In Support of Form I-485 / I-130
      </Text>

      {basicInfo.coverPhoto && (
        <Image src={basicInfo.coverPhoto} style={styles.coverPhoto} />
      )}

      <Text style={styles.coverNames}>
        {basicInfo.petitionerName} & {basicInfo.beneficiaryName}
      </Text>

      {basicInfo.filingDate && (
        <Text style={styles.coverDate}>Filed: {basicInfo.filingDate}</Text>
      )}

      <Text style={styles.pageNumber} render={({ pageNumber }) => pageNumber} fixed />
    </Page>
  );
}
