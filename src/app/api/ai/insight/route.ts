import { NextResponse } from "next/server";
import { generateTopicInsight } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, mode, niche } = body;

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const insight = await generateTopicInsight(topic, mode || "impromptu", niche || "Random");
    return NextResponse.json(insight);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
