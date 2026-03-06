import { Page, Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
import { Section, PhotoItem } from "@/lib/types";

interface PhotoSectionPageProps {
  section: Section;
}

function PhotoCaption({ photo }: { photo: PhotoItem }) {
  const parts: string[] = [];
  if (photo.caption) parts.push(photo.caption);
  const meta: string[] = [];
  if (photo.who) meta.push(photo.who);
  if (photo.date) meta.push(photo.date);
  if (photo.location) meta.push(photo.location);

  return (
    <View>
      {photo.isReceipt && <Text style={styles.receiptLabel}>RECEIPT</Text>}
      {photo.caption && (
        <Text style={styles.photoCaptionBold}>{photo.caption}</Text>
      )}
      {meta.length > 0 && (
        <Text style={styles.photoCaption}>{meta.join(" · ")}</Text>
      )}
    </View>
  );
}

function SinglePhoto({ photo }: { photo: PhotoItem }) {
  return (
    <View style={{ alignItems: "center", marginBottom: 12 }} wrap={false}>
      <Image src={photo.dataUrl} style={styles.photoSingle} />
      <PhotoCaption photo={photo} />
    </View>
  );
}

function TwoPhotos({ photos }: { photos: PhotoItem[] }) {
  return (
    <View style={styles.photoRow} wrap={false}>
      {photos.map((photo, i) => (
        <View key={i} style={styles.photoContainer}>
          <Image src={photo.dataUrl} style={styles.photoDouble} />
          <PhotoCaption photo={photo} />
        </View>
      ))}
    </View>
  );
}

function ThreePhotos({ photos }: { photos: PhotoItem[] }) {
  return (
    <View style={styles.photoRow} wrap={false}>
      {photos.map((photo, i) => (
        <View key={i} style={styles.photoContainer}>
          <Image src={photo.dataUrl} style={styles.photoTriple} />
          <PhotoCaption photo={photo} />
        </View>
      ))}
    </View>
  );
}

function PhotoGrid({ photos }: { photos: PhotoItem[] }) {
  // Chunk photos into rows of 2
  const rows: PhotoItem[][] = [];
  for (let i = 0; i < photos.length; i += 2) {
    rows.push(photos.slice(i, i + 2));
  }
  return (
    <>
      {rows.map((row, ri) => (
        <View key={ri} style={styles.photoRow} wrap={false}>
          {row.map((photo, pi) => (
            <View key={pi} style={styles.photoContainer}>
              <Image src={photo.dataUrl} style={styles.photoGrid} />
              <PhotoCaption photo={photo} />
            </View>
          ))}
          {/* Fill empty slot if odd number */}
          {row.length === 1 && <View style={styles.photoContainer} />}
        </View>
      ))}
    </>
  );
}

export default function PhotoSectionPage({ section }: PhotoSectionPageProps) {
  const { photos } = section;

  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.sectionTitle}>{section.title}</Text>

      {section.narrative && (
        <Text style={styles.sectionNarrative}>{section.narrative}</Text>
      )}

      {photos.length === 1 && <SinglePhoto photo={photos[0]} />}
      {photos.length === 2 && <TwoPhotos photos={photos} />}
      {photos.length === 3 && <ThreePhotos photos={photos} />}
      {photos.length >= 4 && <PhotoGrid photos={photos} />}

      <Text style={styles.pageNumber} render={({ pageNumber }) => pageNumber} fixed />
    </Page>
  );
}
