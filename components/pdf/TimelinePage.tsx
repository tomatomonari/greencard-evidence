import { Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import { TimelineEvent, CATEGORY_LABELS } from "@/lib/types";

interface TimelinePageProps {
  timeline: TimelineEvent[];
}

export default function TimelinePage({ timeline }: TimelinePageProps) {
  if (timeline.length === 0) return null;

  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.timelineTitle}>Relationship Timeline</Text>

      {/* Header row */}
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: "#1a1a1a",
          paddingBottom: 6,
          marginBottom: 4,
        }}
      >
        <Text
          style={{
            width: 100,
            fontSize: 10,
            fontFamily: "Helvetica-Bold",
          }}
        >
          Date
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 10,
            fontFamily: "Helvetica-Bold",
          }}
        >
          Event
        </Text>
        <Text
          style={{
            width: 100,
            fontSize: 10,
            fontFamily: "Helvetica-Bold",
            textAlign: "right",
          }}
        >
          Category
        </Text>
      </View>

      {timeline.map((event, i) => (
        <View key={i} style={styles.timelineRow} wrap={false}>
          <Text style={styles.timelineDate}>{event.date}</Text>
          <Text style={styles.timelineDesc}>{event.description}</Text>
          <Text style={styles.timelineCategory}>
            {CATEGORY_LABELS[event.category]}
          </Text>
        </View>
      ))}

      <Text style={styles.pageNumber} render={({ pageNumber }) => pageNumber} fixed />
    </Page>
  );
}
