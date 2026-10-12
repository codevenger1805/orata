import { NextResponse } from "next/server";
import { analyzeSpeech } from "@/lib/ai-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transcript, topic, mode, durationSeconds } = body;

    const speechText = typeof transcript === "string" ? transcript : "";
    const duration = typeof durationSeconds === "number" ? durationSeconds : 30;

    const analysis = await analyzeSpeech(
      speechText,
      topic || "Speaking Challenge",
      mode || "impromptu",
      duration
    );
    return NextResponse.json(analysis);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
