import { NextRequest, NextResponse } from "next/server";

// Stub for Gemini Flash integration (v2)
// Will analyze timeline events and return tailored section prompts
export async function POST(req: NextRequest) {
  const { timeline } = await req.json();

  // For now, return default section suggestions
  // In v2, this will call Gemini Flash to generate contextual prompts
  return NextResponse.json({
    sections: [
      { id: "wedding", enabled: true },
      { id: "trips", enabled: timeline.some((e: { category: string }) => e.category === "trip") },
      { id: "family", enabled: timeline.some((e: { category: string }) => e.category === "family-event") },
      { id: "engagement", enabled: timeline.some((e: { category: string }) => e.category === "engagement") },
      { id: "how-we-met", enabled: timeline.some((e: { category: string }) => e.category === "first-meeting") },
    ],
  });
}
