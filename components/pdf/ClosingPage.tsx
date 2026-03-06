import { Page, Text, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import { BasicInfo } from "@/lib/types";

interface ClosingPageProps {
  basicInfo: BasicInfo;
}

export default function ClosingPage({ basicInfo }: ClosingPageProps) {
  return (
    <Page size="LETTER" style={styles.closingPage}>
      <Text style={styles.closingText}>
        Thank you for considering our application.
      </Text>
      <Text style={styles.closingSubtext}>
        The photographs and documentation presented herein represent a genuine
        and ongoing marital relationship.
      </Text>

      {basicInfo.coverPhoto && (
        <Image src={basicInfo.coverPhoto} style={styles.closingPhoto} />
      )}

      <Text style={styles.closingNames}>
        {basicInfo.petitionerName} & {basicInfo.beneficiaryName}
      </Text>
      {basicInfo.filingDate && (
        <Text style={styles.closingDate}>{basicInfo.filingDate}</Text>
      )}

      <Text style={styles.pageNumber} render={({ pageNumber }) => pageNumber} fixed />
    </Page>
  );
}
