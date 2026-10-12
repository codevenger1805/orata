"use client";

import React from "react";
import { SpeakingAttempt } from "@/lib/storage";
import { TopicItem } from "@/data/topics";
import {
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Target,
  ArrowRight,
} from "lucide-react";

interface CoachingResultsProps {
  currentAttempt: SpeakingAttempt;
  pastAttempts: SpeakingAttempt[];
  topic: TopicItem;
  onTryAgain: () => void;
  onDone: () => void;
}

export const CoachingResults: React.FC<CoachingResultsProps> = ({
  currentAttempt,
  pastAttempts,
  topic,
  onTryAgain,
  onDone,
}) => {
  const { overallScore, metrics, strengths, focusArea } = currentAttempt;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-300 relative z-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#dde5b6] pb-6 mb-8 gap-4">
        <div>
          <div className="text-xs font-bold tracking-widest text-[#6d803b] uppercase">
            YOUR COACHING
          </div>
          <h1 className="font-serif-editorial text-3xl sm:text-4xl text-[#15120f] font-normal tracking-tight mt-1">
            here&apos;s how <span className="text-[#6d803b] italic font-semibold">you did.</span>
          </h1>
          <p className="text-sm text-[#6c584c] mt-1 font-serif">
            One strong answer. A few things to sharpen.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Scores & Metrics & Attempts */}
        <div className="lg:col-span-6 space-y-6">
          {/* Overall Score Card */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#f0ead2] opacity-40" />

            <h2 className="text-xs font-bold text-[#6c584c] uppercase tracking-wider mb-4">
              Overall Score
            </h2>

            {/* Gauge visualization */}
            <div className="relative flex flex-col items-center justify-center pt-2 pb-4">
              <div className="relative w-56 h-28 overflow-hidden">
                <svg className="w-56 h-56 -rotate-90 transform -mt-28" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f0ead2"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset="125"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#adc178"
                    strokeWidth="8"
                    strokeDasharray="251"
                    strokeDashoffset={251 - (125 * overallScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center">
                  <span className="font-serif-editorial text-4xl sm:text-5xl font-bold text-[#15120f] leading-none">
                    {overallScore}
                  </span>
                  <span className="text-xs text-[#6c584c] mt-1">/ 100</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6d803b] font-semibold bg-[#f0ead2] px-3.5 py-1 rounded-full border border-[#dde5b6]">
                <Sparkles size={12} className="text-[#a98467]" />
                <span>
                  {overallScore >= 80 ? "Strong Performance" : overallScore >= 70 ? "Good starting point" : "Developing"}
                </span>
              </div>
            </div>

            {/* Metric Bars */}
            <div className="space-y-4 pt-4 border-t border-[#dde5b6]">
              {/* Clarity */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-medium text-[#15120f]">Clarity</span>
                  <span className="font-bold text-[#6d803b]">{metrics.clarity}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0ead2] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#adc178] transition-all duration-700"
                    style={{ width: `${metrics.clarity}%` }}
                  />
                </div>
              </div>

              {/* Structure */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-medium text-[#15120f]">Structure</span>
                  <span className="font-bold text-[#a98467]">{metrics.structure}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0ead2] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#a98467] transition-all duration-700"
                    style={{ width: `${metrics.structure}%` }}
                  />
                </div>
              </div>

              {/* Fluency */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-medium text-[#15120f]">Fluency</span>
                  <span className="font-bold text-[#6d803b]">{metrics.fluency}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0ead2] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#adc178] transition-all duration-700"
                    style={{ width: `${metrics.fluency}%` }}
                  />
                </div>
              </div>

              {/* Conciseness */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-medium text-[#15120f]">Conciseness</span>
                  <span className="font-bold text-[#6c584c]">{metrics.conciseness}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f0ead2] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#adc178] to-[#6d803b] transition-all duration-700"
                    style={{ width: `${metrics.conciseness}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Attempts History */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-6 shadow-sm relative">
            <h3 className="text-xs font-bold text-[#6c584c] uppercase tracking-wider mb-1">
              Your Attempts
            </h3>
            <p className="text-xs text-[#6c584c] mb-4">
              Keep practicing the same challenge to see your progress.
            </p>

            <div className="flex items-center justify-around py-2">
              {[1, 2, 3].map((num) => {
                const att = pastAttempts.find((a) => a.attemptNumber === num);
                const isCurrent = currentAttempt.attemptNumber === num;
                return (
                  <div key={num} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        att
                          ? isCurrent
                            ? "bg-[#6d803b] text-white ring-4 ring-[#dde5b6]"
                            : "bg-[#f0ead2] text-[#15120f] border border-[#dde5b6]"
                          : "border-2 border-dashed border-[#dde5b6] text-[#adc178]"
                      }`}
                    >
                      {att ? att.overallScore : "-"}
                    </div>
                    <span className="text-[11px] text-[#6c584c] mt-2 font-medium">
                      Attempt {num}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Focus Area & Actionable Next Instruction */}
        <div className="lg:col-span-6 space-y-6">
          {/* Focus Area Card */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-6 sm:p-7 shadow-sm relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-[#a98467] opacity-[0.08]" />

            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full bg-[#f0ead2] border border-[#a98467]/30 text-[#a98467] text-xs font-bold">
                Focus Area • Key Growth Area
              </span>
              <Target size={18} className="text-[#a98467]" />
            </div>

            <h2 className="font-serif-editorial text-2xl sm:text-3xl text-[#15120f] font-bold tracking-tight">
              {focusArea.metric}
            </h2>

            <p className="mt-2 text-sm text-[#40352e] leading-relaxed font-semibold">
              {focusArea.reason}
            </p>

            {/* Actionable Steps */}
            <div className="mt-5 p-4 rounded-2xl bg-[#f0ead2] border border-[#dde5b6]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#6d803b] uppercase tracking-wide mb-2">
                <Sparkles size={13} className="text-[#a98467]" />
                <span>Try this next time</span>
              </div>

              <div className="text-xs text-[#15120f] space-y-2 whitespace-pre-line leading-relaxed font-medium">
                {focusArea.nextInstruction}
              </div>
            </div>
          </div>

          {/* What You Did Well */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-[#6c584c] uppercase tracking-wider mb-3">
              What you did well
            </h3>

            <ul className="space-y-2.5">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#15120f]">
                  <CheckCircle2 size={16} className="text-[#6d803b] shrink-0 mt-0.5" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-10 pt-6 border-t border-[#dde5b6] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#6c584c]">
          Same challenge • &ldquo;{topic.title}&rdquo;
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onTryAgain}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#adc178] hover:bg-[#92aa4e] text-[#15120f] font-semibold text-sm sm:text-base shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw size={16} className="text-[#15120f]" />
            <span>Try Again →</span>
          </button>

          <button
            onClick={onDone}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-[#f0ead2] border border-[#dde5b6] text-[#15120f] font-medium text-sm active:scale-95 transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
