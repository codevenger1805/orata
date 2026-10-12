"use client";

import React from "react";
import { getStoredAttempts, SpeakingAttempt } from "@/lib/storage";
import { TrendingUp, Clock, Mic, Target, ArrowRight, Award } from "lucide-react";

interface ProgressViewProps {
  onStartPracticing: () => void;
  onRetryAttempt?: (challengeId: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onStartPracticing }) => {
  const attempts = getStoredAttempts();

  if (attempts.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center relative z-10">
        <div className="w-16 h-16 rounded-full bg-[#f0ead2] border border-[#dde5b6] flex items-center justify-center text-[#a98467] mx-auto mb-4">
          <Award size={28} />
        </div>
        <h2 className="font-serif-editorial text-2xl text-[#15120f] font-bold">
          Your first attempt is waiting.
        </h2>
        <p className="text-sm text-[#6c584c] mt-2 max-w-sm mx-auto font-serif">
          No analytics yet. Spin a challenge, give yourself 60 seconds, and watch your progress take shape.
        </p>
        <button
          onClick={onStartPracticing}
          className="mt-6 px-7 py-3 rounded-full bg-[#adc178] hover:bg-[#92aa4e] text-[#15120f] font-semibold text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          Start practicing →
        </button>
      </div>
    );
  }

  const total = attempts.length;
  const avgOverall = Math.round(attempts.reduce((sum, a) => sum + a.overallScore, 0) / total);
  const avgClarity = Math.round(attempts.reduce((sum, a) => sum + a.metrics.clarity, 0) / total);
  const avgStructure = Math.round(attempts.reduce((sum, a) => sum + a.metrics.structure, 0) / total);
  const avgFluency = Math.round(attempts.reduce((sum, a) => sum + a.metrics.fluency, 0) / total);
  const avgConciseness = Math.round(attempts.reduce((sum, a) => sum + a.metrics.conciseness, 0) / total);

  const latestAttempt = attempts[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-200 relative z-10">
      <div className="border-b border-[#dde5b6] pb-5 mb-8">
        <h1 className="font-serif-editorial text-3xl text-[#15120f] font-bold tracking-tight">
          Progress
        </h1>
        <p className="text-sm text-[#6c584c] mt-1 font-serif">
          Am I getting better? Track your deliberate improvement across sessions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {/* Overall Average */}
        <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-bold text-[#6c584c] uppercase">Overall Average</div>
          <div className="my-3 flex items-baseline gap-2">
            <span className="font-serif-editorial text-4xl font-bold text-[#15120f]">
              {avgOverall}
            </span>
            <span className="text-xs text-[#6c584c]">/ 100</span>
          </div>
          <div className="text-xs text-[#6d803b] font-semibold flex items-center gap-1">
            <TrendingUp size={13} />
            <span>Across {total} practice attempt{total > 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* Current Key Focus */}
        <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#a98467]/30 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-bold text-[#a98467] uppercase">Current Focus</div>
          <div className="my-3 font-serif-editorial text-2xl font-bold text-[#15120f]">
            {latestAttempt.focusArea.metric}
          </div>
          <div className="text-xs text-[#40352e] line-clamp-1">
            {latestAttempt.focusArea.reason}
          </div>
        </div>

        {/* Practice Velocity */}
        <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div className="text-xs font-bold text-[#6c584c] uppercase">Practice Loop</div>
          <div className="my-3 font-serif-editorial text-2xl font-bold text-[#15120f]">
            {total} Sessions
          </div>
          <div className="text-xs text-[#6c584c]">
            Think fast. Speak clearly.
          </div>
        </div>
      </div>

      {/* Metrics Breakdown */}
      <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-6 shadow-sm mb-8">
        <h2 className="text-xs font-bold text-[#6c584c] uppercase tracking-wider mb-4">
          Core Metrics Average
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-xl bg-[#f0ead2] border border-[#dde5b6]">
            <div className="text-xs font-medium text-[#6c584c]">Clarity</div>
            <div className="font-serif-editorial text-2xl font-bold text-[#6d803b] mt-1">{avgClarity}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#f0ead2] border border-[#a98467]/30">
            <div className="text-xs font-medium text-[#a98467]">Structure</div>
            <div className="font-serif-editorial text-2xl font-bold text-[#a98467] mt-1">{avgStructure}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#f0ead2] border border-[#dde5b6]">
            <div className="text-xs font-medium text-[#6c584c]">Fluency</div>
            <div className="font-serif-editorial text-2xl font-bold text-[#adc178] mt-1">{avgFluency}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#f0ead2] border border-[#dde5b6]">
            <div className="text-xs font-medium text-[#6c584c]">Conciseness</div>
            <div className="font-serif-editorial text-2xl font-bold text-[#15120f] mt-1">{avgConciseness}</div>
          </div>
        </div>
      </div>

      {/* Recent Attempts History */}
      <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold text-[#6c584c] uppercase tracking-wider">
            Recent Attempts
          </h2>
          <span className="text-xs text-[#6c584c]">{attempts.length} total</span>
        </div>

        <div className="divide-y divide-[#dde5b6]">
          {attempts.slice(0, 8).map((att) => (
            <div key={att.id} className="py-3.5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-full bg-[#f0ead2] text-[#a98467] border border-[#a98467]/30">
                    {att.mode}
                  </span>
                  <span className="text-xs text-[#6c584c]">
                    Attempt {att.attemptNumber}
                  </span>
                </div>
                <h3 className="font-serif-editorial text-sm sm:text-base text-[#15120f] truncate font-medium">
                  {att.topicTitle}
                </h3>
              </div>

              <div className="text-right shrink-0 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f0ead2] border border-[#dde5b6] flex items-center justify-center font-bold text-sm text-[#6d803b]">
                  {att.overallScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
