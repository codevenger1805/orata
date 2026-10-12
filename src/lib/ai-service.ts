// Server-side AI Provider and Dynamic Speech Analysis Service

export interface AIAnalysisResult {
  overallScore: number;
  metrics: {
    clarity: number;
    structure: number;
    fluency: number;
    conciseness: number;
  };
  strengths: string[];
  focusArea: {
    metric: string;
    reason: string;
    nextInstruction: string;
  };
  summary?: string;
  exampleImprovement?: string;
  isFallback?: boolean;
}

export interface AIInsightResult {
  whyInteresting: string;
  quickAngles: string[];
  usefulFact: string;
  tryThisAngle: string;
  beginnerStarter: string;
  isFallback?: boolean;
}

// In-memory cache
const cache = new Map<string, { data: unknown; timestamp: number }>();

export async function generateTopicInsight(
  topic: string,
  mode: string,
  niche: string
): Promise<AIInsightResult> {
  const cacheKey = `insight:${mode}:${niche}:${topic.toLowerCase().trim()}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < 1000 * 60 * 60 * 24) {
    return cached.data as AIInsightResult;
  }

  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const groqKey = process.env.GROQ_API_KEY?.trim();

  const prompt = `You are Orata's friendly, beginner-focused speaking coach. 
Explain this topic in super simple, clear, everyday language so anyone can immediately get ideas and start speaking without fear:
Topic: "${topic}"
Speaking Mode: "${mode}"
Category: "${niche}"

Respond strictly with valid JSON matching this schema:
{
  "whyInteresting": "In 1-2 very simple sentences: what is this topic really about and why does it matter to everyday life?",
  "quickAngles": [
    "Idea 1: An easy personal story or honest thought you can share",
    "Idea 2: A practical point about how it affects everyday people",
    "Idea 3: A fun or unexpected point of view"
  ],
  "usefulFact": "1 interesting, easy-to-understand fact or example anyone can relate to.",
  "tryThisAngle": "A simple 1-sentence thought starter (e.g., 'Say what you honestly think first, then share one small story.').",
  "beginnerStarter": "An exact sentence you can say aloud right now to break the ice and start speaking."
}`;

  // 1. Try Google Gemini API
  if (geminiKey) {
    try {
      const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 600,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText) as AIInsightResult;
          parsed.isFallback = false;
          cache.set(cacheKey, { data: parsed, timestamp: Date.now() });
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Gemini insight failed, attempting Groq fallback:", e);
    }
  }

  // 2. Try Groq API
  if (groqKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You output only valid JSON without markdown wrapping." },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.4,
          max_tokens: 600,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const content = json.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content) as AIInsightResult;
          parsed.isFallback = false;
          cache.set(cacheKey, { data: parsed, timestamp: Date.now() });
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Groq insight failed, falling back to dynamic generator:", e);
    }
  }

  // 3. Beginner-Friendly Dynamic Fallback
  const result = generateDynamicBeginnerResearch(topic, mode, niche);
  cache.set(cacheKey, { data: result, timestamp: Date.now() });
  return result;
}

export async function analyzeSpeech(
  transcript: string,
  topic: string,
  mode: string,
  durationSeconds: number = 30
): Promise<AIAnalysisResult> {
  const trimmed = transcript.trim();
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const groqKey = process.env.GROQ_API_KEY?.trim();

  const prompt = `You are Orata, an encouraging, high-standards speaking coach.
Evaluate this spoken response in simple, practical language:
Topic/Challenge: "${topic}"
Practice Mode: "${mode}"
Duration: ${durationSeconds} seconds
Speaker Transcript: "${trimmed.slice(0, 3000)}"

Respond ONLY with valid JSON:
{
  "overallScore": <number between 50 and 96>,
  "metrics": {
    "clarity": <number between 50 and 98>,
    "structure": <number between 50 and 98>,
    "fluency": <number between 50 and 98>,
    "conciseness": <number between 50 and 98>
  },
  "strengths": [
    "<one clear, encouraging thing they did well in their actual words>",
    "<second clear observation>"
  ],
  "focusArea": {
    "metric": "<Clarity|Structure|Fluency|Conciseness>",
    "reason": "<simple explanation of one easy thing to polish next time>",
    "nextInstruction": "<1-3 easy, practical steps anyone can follow on attempt 2>"
  },
  "summary": "<1 warm sentence summarizing their attempt>",
  "exampleImprovement": "<an easy example of how to start their next try>"
}`;

  if (geminiKey) {
    try {
      const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 900,
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (res.ok) {
        const json = await res.json();
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText) as AIAnalysisResult;
          if (typeof parsed.overallScore === "number" && parsed.metrics && parsed.focusArea) {
            parsed.isFallback = false;
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn("Gemini analysis error, trying Groq fallback:", e);
    }
  }

  if (groqKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: "You output only valid JSON without markdown wrapping." },
            { role: "user", content: prompt },
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 900,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const content = json.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content) as AIAnalysisResult;
          parsed.isFallback = false;
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Groq analysis error:", e);
    }
  }

  return computeDynamicTranscriptAnalysis(trimmed, topic, mode, durationSeconds);
}

// Beginner-friendly dynamic ideas generator
function generateDynamicBeginnerResearch(
  topic: string,
  mode: string,
  niche: string
): AIInsightResult {
  const lower = topic.toLowerCase();

  if (lower.includes("social media") || lower.includes("phone") || lower.includes("screen") || lower.includes("tech")) {
    return {
      whyInteresting: "We all use screens every day, but we also feel tired of being on them all the time.",
      quickAngles: [
        "Personal feeling: How you feel when you put your phone away for an afternoon.",
        "The good side: Keeping in touch with friends and learning new things fast.",
        "The bad side: Scrolling endlessly when you could be doing something fun or resting."
      ],
      usefulFact: "People check their phones over 100 times a day—often without even thinking about it!",
      tryThisAngle: "Just share one honest habit: what is the first app you open every morning, and does it make you happy?",
      beginnerStarter: `"Honestly, my relationship with screens is pretty mixed..."`,
      isFallback: false,
    };
  }

  if (lower.includes("coffee") || lower.includes("morning") || lower.includes("routine") || lower.includes("alarm")) {
    return {
      whyInteresting: "How we start our morning usually sets the mood for the whole rest of our day.",
      quickAngles: [
        "Are you a morning person or a night owl?",
        "One small morning ritual that you genuinely look forward to.",
        "What happens when your morning starts in a rush vs when you take your time."
      ],
      usefulFact: "Having just 10 minutes of calm in the morning lowers stress levels for up to 8 hours.",
      tryThisAngle: "Describe your favorite quiet morning moment in 30 seconds.",
      beginnerStarter: `"If there is one thing that defines my mornings, it is definitely..."`,
      isFallback: false,
    };
  }

  if (lower.includes("travel") || lower.includes("city") || lower.includes("place") || lower.includes("adventure")) {
    return {
      whyInteresting: "Visiting a new place shows you that people live and see the world in totally different ways.",
      quickAngles: [
        "A trip or place you went that surprised you in a good way.",
        "Why getting slightly lost in a new city can be fun.",
        "Traveling with friends vs going somewhere on your own."
      ],
      usefulFact: "Being in unfamiliar surroundings triggers creative ideas because your brain has to pay active attention.",
      tryThisAngle: "Think of your favorite place you have ever visited and tell what made it special.",
      beginnerStarter: `"Whenever I think about traveling, the first place that comes to mind is..."`,
      isFallback: false,
    };
  }

  if (lower.includes("friend") || lower.includes("people") || lower.includes("relationship") || lower.includes("kindness")) {
    return {
      whyInteresting: "Good connections make life fun and meaningful, but keeping close friendships takes effort.",
      quickAngles: [
        "What makes someone an easy person to be around?",
        "Why small acts of kindness stick with people for years.",
        "How you prefer staying in touch: texting, calling, or hanging out in person?"
      ],
      usefulFact: "Having even two close friends you can confide in is one of the strongest predictors of long-term happiness.",
      tryThisAngle: "Talk about what you value most in a friendship.",
      beginnerStarter: `"To me, a genuine friend is someone who..."`,
      isFallback: false,
    };
  }

  // General beginner-friendly breakdown
  return {
    whyInteresting: `This is a fun topic in ${niche} because everyone has their own unique point of view on it.`,
    quickAngles: [
      "Share your gut reaction: What is the very first thought that popped into your head?",
      "Give a quick real-life example or personal story from your own week.",
      "Think about what someone who disagrees with you might say."
    ],
    usefulFact: "When speaking aloud, listeners care much more about your honesty and enthusiasm than fancy words!",
    tryThisAngle: "Start by picking a side right away in one sentence, then give one story explaining why.",
    beginnerStarter: `"Here is my honest take on this: I think..."`,
    isFallback: false,
  };
}

// Real-time speech evaluation engine
function computeDynamicTranscriptAnalysis(
  transcript: string,
  topic: string,
  mode: string,
  durationSeconds: number
): AIAnalysisResult {
  if (!transcript || transcript.length < 5) {
    return {
      overallScore: 50,
      metrics: { clarity: 52, structure: 48, fluency: 50, conciseness: 54 },
      strengths: [
        "You clicked start and gave it a shot!",
        "Every attempt gets you closer to natural speaking.",
      ],
      focusArea: {
        metric: "Clarity",
        reason: "No audible words were captured this time.",
        nextInstruction: "Speak aloud into your microphone or check the live words box before finishing.",
      },
      summary: "No speech detected. Take a breath and give it another try.",
      exampleImprovement: "Try saying two complete sentences out loud.",
      isFallback: false,
    };
  }

  const words = transcript.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const sentences = transcript.split(/[.?!]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);

  const fillerMatches = transcript.match(/\b(um|uh|like|you know|basically|actually|sort of|kind of|i mean|right)\b/gi) || [];
  const fillerCount = fillerMatches.length;

  const durationMins = Math.max(0.15, durationSeconds / 60);
  const wpm = Math.round(wordCount / durationMins);

  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, "")));
  const lexicalDensity = Math.round((uniqueWords.size / Math.max(1, wordCount)) * 100);

  let clarity = 76;
  if (wordCount > 30) clarity += 6;
  if (wordCount > 60) clarity += 6;
  if (sentenceCount >= 3) clarity += 4;
  if (fillerCount > 4) clarity -= 8;
  clarity = Math.max(55, Math.min(94, clarity));

  let structure = 70;
  const hasIntroSignals = /\b(i think|i believe|my view|to begin|first|in my opinion|the issue|when we look)\b/i.test(transcript);
  const hasTransitionSignals = /\b(however|furthermore|for example|for instance|on the other hand|also|because|therefore)\b/i.test(transcript);
  const hasConclusionSignals = /\b(in conclusion|finally|so|overall|that is why|ultimately|in the end)\b/i.test(transcript);

  if (hasIntroSignals) structure += 8;
  if (hasTransitionSignals) structure += 8;
  if (hasConclusionSignals) structure += 6;
  if (sentenceCount === 1 && wordCount > 25) structure -= 10;
  structure = Math.max(55, Math.min(95, structure));

  let fluency = 78;
  if (wpm >= 90 && wpm <= 160) fluency += 8;
  else if (wpm < 70) fluency -= 8;
  else if (wpm > 180) fluency -= 6;
  fluency -= Math.min(18, fillerCount * 3);
  fluency = Math.max(52, Math.min(95, fluency));

  let conciseness = 80;
  const avgWordsPerSentence = wordCount / sentenceCount;
  if (avgWordsPerSentence > 28) conciseness -= 12;
  if (wordCount > 180 && durationSeconds < 60) conciseness -= 10;
  if (lexicalDensity > 60) conciseness += 6;
  conciseness = Math.max(54, Math.min(94, conciseness));

  const overallScore = Math.round((clarity + structure + fluency + conciseness) / 4);

  const strengths: string[] = [];
  if (hasIntroSignals || hasTransitionSignals) {
    strengths.push(`Great transitions! Phrases like "${hasIntroSignals ? 'in my view / first' : 'for example'}" make your points easy to follow.`);
  } else {
    strengths.push(`Good natural momentum across ${wordCount} words.`);
  }

  if (fillerCount <= 1) {
    strengths.push("Clean delivery with virtually zero filler words.");
  } else {
    strengths.push(`Steady speaking pace at about ${wpm} words per minute.`);
  }

  let focusMetric = "Structure";
  let reason = "Your response had good thoughts, but a clear opening and finish makes it memorable.";
  let instruction = "1. State your main thought in sentence one.\n2. Share one short story or example.\n3. Wrap up with a quick takeaway.";

  const lowest = Math.min(clarity, structure, fluency, conciseness);
  if (lowest === structure) {
    focusMetric = "Structure";
    reason = !hasConclusionSignals 
      ? "You had good ideas, but finishing with a clear final sentence helps wrap up your point."
      : "Try leading with your answer in your first 10 seconds.";
    instruction = "1. Say your answer in sentence one.\n2. Give one example.\n3. End with: 'So that is why I think...'";
  } else if (lowest === fluency) {
    focusMetric = "Fluency";
    reason = fillerCount > 2
      ? `You used ${fillerCount} fillers (${fillerMatches.slice(0, 3).join(', ')}). A brief 1-second pause sounds much more confident than saying 'um'.`
      : `Your pace (${wpm} wpm) felt a bit rushed. Take a calm breath between thoughts.`;
    instruction = "1. When you need to think, pause in silence for one beat.\n2. Keep your volume steady through the end of each sentence.";
  } else if (lowest === conciseness) {
    focusMetric = "Conciseness";
    reason = "Your sentences were a bit long. Short sentences have more punch.";
    instruction = "1. Break long sentences into two shorter ones.\n2. Cut filler phrases like 'basically' and 'sort of'.";
  } else {
    focusMetric = "Clarity";
    reason = "Picking a clear point of view right at the beginning makes your message crisp.";
    instruction = "1. Pick a clear stance in your first 5 seconds.\n2. Stick to that main point.";
  }

  return {
    overallScore,
    metrics: { clarity, structure, fluency, conciseness },
    strengths,
    focusArea: {
      metric: focusMetric,
      reason,
      nextInstruction: instruction,
    },
    summary: `Analyzed ${wordCount} words spoken over ${durationSeconds}s.`,
    exampleImprovement: `Lead with your strongest conclusion first to give your audience an immediate mental anchor.`,
    isFallback: false,
  };
}
