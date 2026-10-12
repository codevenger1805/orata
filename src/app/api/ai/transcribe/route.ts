import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const groqKey = process.env.GROQ_API_KEY?.trim();
    if (groqKey) {
      const groqFormData = new FormData();
      groqFormData.append("file", file, "audio.webm");
      groqFormData.append("model", process.env.GROQ_TRANSCRIBE_MODEL || "whisper-large-v3");
      groqFormData.append("language", "en");

      const groqRes = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
        },
        body: groqFormData,
      });

      if (groqRes.ok) {
        const data = await groqRes.json();
        return NextResponse.json({ transcript: data.text || "" });
      }
    }

    return NextResponse.json({ transcript: "" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Transcription server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
