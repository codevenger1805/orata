import { PracticeMode, TopicNiche } from "@/data/topics";
import { AIAnalysisResult } from "./ai-service";

export interface SpeakingAttempt {
  id: string;
  challengeId: string;
  topicTitle: string;
  mode: PracticeMode;
  niche: TopicNiche;
  attemptNumber: number;
  durationSeconds: number;
  timestamp: number;
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
  transcript: string;
  isFallback?: boolean;
}

const STORAGE_KEYS = {
  MODE: "orata_mode",
  NICHE: "orata_niche",
  RECENT_TOPICS: "orata_recent_topics",
  ATTEMPTS: "orata_attempts",
  PREFERENCES: "orata_prefs",
};

export function getStoredMode(): PracticeMode {
  if (typeof window === "undefined") return "impromptu";
  const m = localStorage.getItem(STORAGE_KEYS.MODE);
  if (m === "interview" || m === "communication" || m === "impromptu") return m;
  return "impromptu";
}

export function setStoredMode(mode: PracticeMode) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.MODE, mode);
  }
}

export function getStoredNiche(): TopicNiche {
  if (typeof window === "undefined") return "Random";
  return (localStorage.getItem(STORAGE_KEYS.NICHE) as TopicNiche) || "Random";
}

export function setStoredNiche(niche: TopicNiche) {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.NICHE, niche);
  }
}

export function getRecentTopicIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT_TOPICS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentTopicId(id: string) {
  if (typeof window === "undefined") return;
  const recent = getRecentTopicIds();
  const updated = [id, ...recent.filter((x) => x !== id)].slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.RECENT_TOPICS, JSON.stringify(updated));
}

export function getStoredAttempts(): SpeakingAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAttempt(
  challengeId: string,
  topicTitle: string,
  mode: PracticeMode,
  niche: TopicNiche,
  durationSeconds: number,
  transcript: string,
  analysis: AIAnalysisResult
): SpeakingAttempt {
  const attempts = getStoredAttempts();
  const pastAttemptsForChallenge = attempts.filter((a) => a.challengeId === challengeId);
  const attemptNumber = pastAttemptsForChallenge.length + 1;

  const newAttempt: SpeakingAttempt = {
    id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    challengeId,
    topicTitle,
    mode,
    niche,
    attemptNumber,
    durationSeconds,
    timestamp: Date.now(),
    overallScore: analysis.overallScore,
    metrics: analysis.metrics,
    strengths: analysis.strengths,
    focusArea: analysis.focusArea,
    transcript,
    isFallback: analysis.isFallback,
  };

  const updated = [newAttempt, ...attempts];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(updated));
  }
  return newAttempt;
}

export function getAttemptsForChallenge(challengeId: string): SpeakingAttempt[] {
  const attempts = getStoredAttempts();
  return attempts
    .filter((a) => a.challengeId === challengeId)
    .sort((a, b) => a.attemptNumber - b.attemptNumber);
}

export function clearAllData() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.RECENT_TOPICS);
    localStorage.removeItem(STORAGE_KEYS.MODE);
    localStorage.removeItem(STORAGE_KEYS.NICHE);
  }
}
