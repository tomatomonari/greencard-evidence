import Link from "next/link";
import {
  FileText,
  Clock,
  Shield,
  ImageIcon,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <FileText className="w-5 h-5 text-accent" />
            Evidence Builder
          </div>
          <Link
            href="/builder"
            className="text-sm px-4 py-2 bg-accent text-white rounded-lg font-medium hover:bg-blue-900 transition-colors"
          >
            Start Building
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Build your green card
          <br />
          photo evidence in minutes
        </h1>
        <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
          Stop spending days assembling photos into a PDF. Our builder guides
          you through each USCIS evidence section and generates a
          professional-looking packet automatically.
        </p>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors"
        >
          Start Building <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-sm text-muted mt-3">
          Free to use. No account required. Your data stays on your device.
        </p>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-border rounded-xl p-6">
            <Clock className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-semibold mb-2">Minutes, not days</h3>
            <p className="text-sm text-muted">
              What used to take days of copy-pasting into Word now takes under
              an hour. Upload photos, add captions, generate.
            </p>
          </div>
          <div className="bg-white border border-border rounded-xl p-6">
            <Shield className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-semibold mb-2">USCIS-aligned sections</h3>
            <p className="text-sm text-muted">
              Pre-built sections matching what immigration officers expect:
              timeline, wedding, trips, family, conversations, and more.
            </p>
          </div>
          <div className="bg-white border border-border rounded-xl p-6">
            <ImageIcon className="w-8 h-8 text-accent mb-3" />
            <h3 className="font-semibold mb-2">Auto-formatted PDF</h3>
            <p className="text-sm text-muted">
              Photos are automatically laid out in clean grids with captions.
              No more wrestling with page breaks and image sizing.
            </p>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          What&apos;s in your evidence packet
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Professional cover page",
            "Relationship timeline table",
            "Wedding day photos",
            "Engagement photos & receipts",
            "How-we-met narrative",
            "Trip photos & travel receipts",
            "Family meeting photos",
            "Friends & family photos",
            "Conversation screenshots",
            "Social media screenshots",
            "Miscellaneous evidence",
            "Formal closing page",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm py-2">
              <CheckCircle className="w-4 h-4 text-accent shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-border py-16 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Ready to build your evidence?
        </h2>
        <p className="text-muted mb-6">
          No sign-up, no payment. Just start uploading.
        </p>
        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-white rounded-lg font-semibold text-lg hover:bg-blue-900 transition-colors"
        >
          Start Building <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted">
        <p>
          This tool helps organize photographic evidence. It does not constitute
          legal advice. Consult an immigration attorney for your specific case.
        </p>
      </footer>
    </div>
  );
}
