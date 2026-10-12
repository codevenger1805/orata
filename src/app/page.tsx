"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { PracticeHub } from "@/components/PracticeHub";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { ProcessingScreen } from "@/components/ProcessingScreen";
import { CoachingResults } from "@/components/CoachingResults";
import { ProgressView } from "@/components/ProgressView";
import { PremiumView } from "@/components/PremiumView";
import { SettingsView } from "@/components/SettingsView";
import { OrganicBlobs, FloatingDots } from "@/components/EditorialDoodles";
import {
  PracticeMode,
  TopicNiche,
  TopicItem,
  getTopicsFor,
  TOPIC_BANK,
} from "@/data/topics";
import {
  getStoredMode,
  setStoredMode,
  getStoredNiche,
  setStoredNiche,
  getRecentTopicIds,
  addRecentTopicId,
  saveAttempt,
  getAttemptsForChallenge,
  SpeakingAttempt,
} from "@/lib/storage";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"practice" | "progress" | "premium" | "settings">("practice");
  const [screen, setScreen] = useState<"hub" | "recording" | "processing" | "coaching">("hub");

  const [mode, setMode] = useState<PracticeMode>("impromptu");
  const [niche, setNiche] = useState<TopicNiche>("Random");
  const [currentTopic, setCurrentTopic] = useState<TopicItem>(TOPIC_BANK[0]);
  const [recentTopicIds, setRecentTopicIds] = useState<string[]>([]);

  // Coaching state
  const [currentAttempt, setCurrentAttempt] = useState<SpeakingAttempt | null>(null);
  const [pastAttemptsForCurrent, setPastAttemptsForCurrent] = useState<SpeakingAttempt[]>([]);

  // Load preferences from local storage
  useEffect(() => {
    const savedMode = getStoredMode();
    const savedNiche = getStoredNiche();
    const recent = getRecentTopicIds();

    setMode(savedMode);
    setNiche(savedNiche);
    setRecentTopicIds(recent);

    const pool = getTopicsFor(savedMode, savedNiche);
    if (pool.length > 0) {
      setCurrentTopic(pool[0]);
    }
  }, []);

  const handleModeChange = (newMode: PracticeMode) => {
    setMode(newMode);
    setStoredMode(newMode);
    const pool = getTopicsFor(newMode, niche);
    if (pool.length > 0) {
      setCurrentTopic(pool[0]);
    }
  };

  const handleNicheChange = (newNiche: TopicNiche) => {
    setNiche(newNiche);
    setStoredNiche(newNiche);
    const pool = getTopicsFor(mode, newNiche);
    if (pool.length > 0) {
      setCurrentTopic(pool[0]);
    }
  };

  const handleTopicSelected = (topic: TopicItem) => {
    setCurrentTopic(topic);
    addRecentTopicId(topic.id);
    setRecentTopicIds(getRecentTopicIds());
  };

  const handleStartSpeaking = () => {
    setScreen("recording");
  };

  const handleFinishAnswer = async (transcript: string, durationSeconds: number) => {
    setScreen("processing");

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript,
          topic: currentTopic.title,
          mode: currentTopic.mode,
          durationSeconds,
        }),
      });

      if (!res.ok) throw new Error("Analysis failed");
      const analysis = await res.json();

      // Persist attempt
      const attempt = saveAttempt(
        currentTopic.id,
        currentTopic.title,
        currentTopic.mode,
        currentTopic.niche,
        durationSeconds,
        transcript,
        analysis
      );

      const allAttempts = getAttemptsForChallenge(currentTopic.id);
      setCurrentAttempt(attempt);
      setPastAttemptsForCurrent(allAttempts);
      setScreen("coaching");
    } catch {
      // Local fallback in case of network issue
      const fallbackAttempt = saveAttempt(
        currentTopic.id,
        currentTopic.title,
        currentTopic.mode,
        currentTopic.niche,
        durationSeconds,
        transcript,
        {
          overallScore: 78,
          metrics: { clarity: 82, structure: 68, fluency: 80, conciseness: 75 },
          strengths: [
            "You addressed the challenge directly and stayed engaged.",
            "Your tone remained conversational, authentic, and calm.",
          ],
          focusArea: {
            metric: "Structure",
            reason: "Your main point appeared late in your response.",
            nextInstruction: "1. Start with your answer in one sentence.\n2. Give one example.\n3. Finish with the result.",
          },
          isFallback: true,
        }
      );

      const allAttempts = getAttemptsForChallenge(currentTopic.id);
      setCurrentAttempt(fallbackAttempt);
      setPastAttemptsForCurrent(allAttempts);
      setScreen("coaching");
    }
  };

  // If in dark recording screen, render only the voice recorder
  if (screen === "recording") {
    return (
      <VoiceRecorder
        topic={currentTopic}
        onFinishAnswer={handleFinishAnswer}
        onCancel={() => setScreen("hub")}
      />
    );
  }

  // If in processing screen
  if (screen === "processing") {
    return (
      <main className="min-h-screen bg-[#fcfbf6] relative overflow-hidden">
        <OrganicBlobs />
        <FloatingDots />
        <Navbar
          currentTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setScreen("hub");
          }}
        />
        <ProcessingScreen />
      </main>
    );
  }

  // If in coaching screen
  if (screen === "coaching" && currentAttempt) {
    return (
      <main className="min-h-screen bg-[#fcfbf6] pb-16 relative overflow-hidden">
        <OrganicBlobs />
        <FloatingDots />
        <Navbar
          currentTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setScreen("hub");
          }}
        />
        <CoachingResults
          currentAttempt={currentAttempt}
          pastAttempts={pastAttemptsForCurrent}
          topic={currentTopic}
          onTryAgain={() => setScreen("recording")}
          onDone={() => setScreen("hub")}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfbf6] pb-16 relative overflow-hidden">
      <OrganicBlobs />
      <FloatingDots />
      <Navbar
        currentTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {activeTab === "practice" && (
        <PracticeHub
          mode={mode}
          onModeChange={handleModeChange}
          niche={niche}
          onNicheChange={handleNicheChange}
          currentTopic={currentTopic}
          onTopicSelected={handleTopicSelected}
          onStartSpeaking={handleStartSpeaking}
          recentTopicIds={recentTopicIds}
          onViewProgress={() => setActiveTab("progress")}
        />
      )}

      {activeTab === "progress" && (
        <ProgressView
          onStartPracticing={() => setActiveTab("practice")}
          onRetryAttempt={(id) => {
            const found = TOPIC_BANK.find((t) => t.id === id);
            if (found) {
              setCurrentTopic(found);
              setMode(found.mode);
              setNiche(found.niche);
              setActiveTab("practice");
              setScreen("recording");
            }
          }}
        />
      )}

      {activeTab === "premium" && (
        <PremiumView onBackToPractice={() => setActiveTab("practice")} />
      )}

      {activeTab === "settings" && (
        <SettingsView
          onDataCleared={() => {
            setRecentTopicIds([]);
          }}
        />
      )}
    </main>
  );
}
