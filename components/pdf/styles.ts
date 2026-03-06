import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1a1a1a",
  },
  // Cover
  coverPage: {
    padding: 50,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  coverTitle: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  coverSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 40,
  },
  coverPhoto: {
    width: 250,
    height: 250,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 40,
  },
  coverNames: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 8,
  },
  coverDate: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  // Timeline
  timelineTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  timelineRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
  },
  timelineDate: {
    width: 100,
    fontSize: 10,
    color: "#6b7280",
  },
  timelineDesc: {
    flex: 1,
    fontSize: 10,
  },
  timelineCategory: {
    width: 100,
    fontSize: 9,
    color: "#6b7280",
    textAlign: "right",
  },
  // Section
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    textAlign: "center",
  },
  sectionNarrative: {
    fontSize: 10,
    color: "#4b5563",
    marginBottom: 16,
    lineHeight: 1.5,
    textAlign: "center",
  },
  // Photo grids
  photoRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  photoContainer: {
    flex: 1,
    alignItems: "center",
  },
  photoSingle: {
    width: 350,
    maxHeight: 400,
    objectFit: "contain",
    marginBottom: 6,
  },
  photoDouble: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    marginBottom: 6,
  },
  photoTriple: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    marginBottom: 6,
  },
  photoGrid: {
    width: "100%",
    height: 160,
    objectFit: "cover",
    marginBottom: 4,
  },
  photoCaption: {
    fontSize: 8,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 2,
  },
  photoCaptionBold: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 2,
  },
  receiptLabel: {
    fontSize: 7,
    color: "#d97706",
    textAlign: "center",
    marginBottom: 2,
  },
  // Closing
  closingPage: {
    padding: 50,
    fontFamily: "Helvetica",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  closingText: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 30,
  },
  closingSubtext: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 40,
  },
  closingPhoto: {
    width: 200,
    height: 200,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 30,
  },
  closingNames: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 6,
  },
  closingDate: {
    fontSize: 11,
    color: "#6b7280",
    textAlign: "center",
  },
  // Page number
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 50,
    fontSize: 9,
    color: "#9ca3af",
  },
});
