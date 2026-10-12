"use client";

import React from "react";
import { PracticeMode, TopicNiche, TOPIC_NICHES, TopicItem } from "@/data/topics";
import { Roulette } from "./Roulette";
import { TopicInsight } from "./TopicInsight";
import { SquiggleLine } from "./EditorialDoodles";
import { Mic, Briefcase, MessageSquare, Shuffle, ArrowRight } from "lucide-react";

interface PracticeHubProps {
  mode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
  niche: TopicNiche;
  onNicheChange: (niche: TopicNiche) => void;
  currentTopic: TopicItem;
  onTopicSelected: (topic: TopicItem) => void;
  onStartSpeaking: () => void;
  recentTopicIds: string[];
  onViewProgress: () => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  mode,
  onModeChange,
  niche,
  onNicheChange,
  currentTopic,
  onTopicSelected,
  onStartSpeaking,
  recentTopicIds,
  onViewProgress,
}) => {
  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Editorial Category Label & Header */}
      <div className="relative z-10 max-w-3xl mb-7">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#6d803b] uppercase mb-1">
          <span>PRACTICE</span>
          <span className="w-12 h-px bg-[#dde5b6]" />
        </div>
        <h1 className="font-serif-editorial text-3xl sm:text-5xl text-[#15120f] font-normal tracking-tight">
          okay, let&apos;s see what <span className="text-[#6d803b] italic font-semibold">you get.</span>
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-sm sm:text-base text-[#6c584c]">
            Pick a mode, spin for a challenge, and don&apos;t overthink it.
          </p>
          <SquiggleLine className="w-20 h-3 hidden sm:block opacity-60" />
        </div>
      </div>

      {/* Two-Column Studio Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column: Context / Mode Selection & Niche Picker */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: What are we practicing? */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#f0ead2] opacity-40" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#dde5b6] opacity-30" />

            <div className="relative flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#15120f] flex items-center gap-1.5">
                <span>What are we practicing?</span>
                <span className="text-[#a98467]">✦</span>
              </h2>
            </div>

            <div className="relative space-y-3">
              {/* Option 1: Impromptu */}
              <button
                type="button"
                onClick={() => onModeChange("impromptu")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "impromptu"
                    ? "bg-[#f0ead2] border-[#adc178] shadow-xs ring-2 ring-[#dde5b6]"
                    : "bg-[#ffffff] border-[#dde5b6] hover:bg-[#fcfbf6]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      mode === "impromptu"
                        ? "bg-[#adc178] text-[#15120f] shadow-xs"
                        : "bg-[#f0ead2] text-[#6c584c] border border-[#dde5b6]"
                    }`}
                  >
                    <Mic size={17} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#15120f]">Impromptu</div>
                    <div className="text-xs text-[#6c584c]">
                      Think quickly. Respond naturally.
                    </div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    mode === "impromptu" ? "border-[#6d803b] bg-[#6d803b]" : "border-[#adc178]"
                  }`}
                >
                  {mode === "impromptu" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>

              {/* Option 2: Interview */}
              <button
                type="button"
                onClick={() => onModeChange("interview")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "interview"
                    ? "bg-[#f0ead2] border-[#adc178] shadow-xs ring-2 ring-[#dde5b6]"
                    : "bg-[#ffffff] border-[#dde5b6] hover:bg-[#fcfbf6]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      mode === "interview"
                        ? "bg-[#adc178] text-[#15120f] shadow-xs"
                        : "bg-[#f0ead2] text-[#6c584c] border border-[#dde5b6]"
                    }`}
                  >
                    <Briefcase size={17} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#15120f]">Interview</div>
                    <div className="text-xs text-[#6c584c]">
                      Answer clearly. Sound confident.
                    </div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    mode === "interview" ? "border-[#6d803b] bg-[#6d803b]" : "border-[#adc178]"
                  }`}
                >
                  {mode === "interview" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>

              {/* Option 3: Communication */}
              <button
                type="button"
                onClick={() => onModeChange("communication")}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  mode === "communication"
                    ? "bg-[#f0ead2] border-[#adc178] shadow-xs ring-2 ring-[#dde5b6]"
                    : "bg-[#ffffff] border-[#dde5b6] hover:bg-[#fcfbf6]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      mode === "communication"
                        ? "bg-[#adc178] text-[#15120f] shadow-xs"
                        : "bg-[#f0ead2] text-[#6c584c] border border-[#dde5b6]"
                    }`}
                  >
                    <MessageSquare size={17} />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#15120f]">Communication</div>
                    <div className="text-xs text-[#6c584c]">
                      Explain. Persuade. Make your point.
                    </div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    mode === "communication" ? "border-[#6d803b] bg-[#6d803b]" : "border-[#adc178]"
                  }`}
                >
                  {mode === "communication" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </button>
            </div>

            {/* Niche / Topic Selector */}
            <div className="relative mt-6 pt-5 border-t border-[#dde5b6]">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="niche-select" className="text-xs font-bold text-[#15120f]">
                  Topic (optional)
                </label>
                <span className="text-[11px] text-[#6c584c]">or pick something you&apos;re curious about</span>
              </div>

              <div className="relative">
                <select
                  id="niche-select"
                  value={niche}
                  onChange={(e) => onNicheChange(e.target.value as TopicNiche)}
                  className="w-full bg-[#f0ead2] border border-[#dde5b6] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#15120f] font-medium focus:outline-none focus:border-[#adc178] transition-colors appearance-none cursor-pointer"
                >
                  {TOPIC_NICHES.map((n) => (
                    <option key={n} value={n}>
                      {n === "Random" ? "Random (All categories)" : n}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6c584c]">
                  <Shuffle size={14} />
                </div>
              </div>

              {/* Quick Niche Chips */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {(["Random", "Technology", "Business", "Career", "Fashion", "Lifestyle"] as TopicNiche[]).map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => onNicheChange(chip)}
                    className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                      niche === chip
                        ? "bg-[#6d803b] text-white font-semibold shadow-xs"
                        : "bg-[#f0ead2] text-[#15120f] border border-[#dde5b6] hover:bg-white"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Inline Expandable Topic Insight */}
          <TopicInsight topic={currentTopic} />
        </div>

        {/* Right Column: 3D Stacked Roulette Studio */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <Roulette
            mode={mode}
            niche={niche}
            currentTopic={currentTopic}
            onTopicSelected={onTopicSelected}
            onStartSpeaking={onStartSpeaking}
            recentTopicIds={recentTopicIds}
          />
        </div>
      </div>

      {/* Bottom Section: How Orata Works & Progress Banner */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left: How Orata Works */}
        <div className="md:col-span-7 bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-3 right-4 opacity-40">
            <SquiggleLine className="w-16 h-3" />
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6c584c] mb-4">
            How Orata Works
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-2.5 rounded-xl bg-[#f0ead2] border border-[#dde5b6]">
              <div className="text-[#6d803b] font-bold text-xs">01 Spin</div>
              <div className="text-[11px] text-[#6c584c] mt-0.5">Get a challenge</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f0ead2] border border-[#dde5b6]">
              <div className="text-[#6d803b] font-bold text-xs">02 Speak</div>
              <div className="text-[11px] text-[#6c584c] mt-0.5">Give yourself 60s</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f0ead2] border border-[#a98467]/30">
              <div className="text-[#a98467] font-bold text-xs">03 Coached</div>
              <div className="text-[11px] text-[#6c584c] mt-0.5">Understand strengths</div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f0ead2] border border-[#dde5b6]">
              <div className="text-[#6d803b] font-bold text-xs">04 Try Again</div>
              <div className="text-[11px] text-[#6c584c] mt-0.5">Improve visibly</div>
            </div>
          </div>
        </div>

        {/* Right: Speaking Gets Better Banner */}
        <div className="md:col-span-5 bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-[#a98467] opacity-[0.08]" />

          <div>
            <h3 className="font-serif-editorial text-lg text-[#15120f] font-bold">
              Speaking gets better with practice.
            </h3>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-[#6c584c]">
              <span>Clarity</span>
              <span className="text-[#dde5b6]">•</span>
              <span>Structure</span>
              <span className="text-[#dde5b6]">•</span>
              <span>Fluency</span>
              <span className="text-[#dde5b6]">•</span>
              <span>Conciseness</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#dde5b6] flex items-center justify-between">
            <span className="text-xs text-[#6c584c]">Compare repeat attempts</span>
            <button
              onClick={onViewProgress}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#a98467] hover:bg-[#8a684e] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span>See progress</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
