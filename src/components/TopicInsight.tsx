"use client";

import React, { useState, useEffect } from "react";
import { TopicItem } from "@/data/topics";
import { Lightbulb, ChevronDown, ChevronUp, Sparkles, Compass, BookOpen, Target, RefreshCw, MessageSquareQuote } from "lucide-react";
import { TopicInsight as TopicInsightType } from "@/data/topics";

interface TopicInsightProps {
  topic: TopicItem;
}

export const TopicInsight: React.FC<TopicInsightProps> = ({ topic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [insight, setInsight] = useState<TopicInsightType>(topic.insight);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInsight(topic.insight);
    if (isOpen) {
      fetchLiveResearch();
    }
  }, [topic]);

  const fetchLiveResearch = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.title,
          mode: topic.mode,
          niche: topic.niche,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.whyInteresting) {
          setInsight(data);
        }
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      fetchLiveResearch();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-6 bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl overflow-hidden shadow-xs transition-all">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 sm:px-5 text-left hover:bg-[#f0ead2]/40 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#f0ead2] border border-[#dde5b6] flex items-center justify-center text-[#a98467]">
            <Lightbulb size={16} />
          </div>
          <div>
            <div className="text-xs font-bold text-[#15120f]">
              Need ideas to speak? (Beginner Guide)
            </div>
            <div className="text-[11px] text-[#6c584c]">
              Hints, simple angles & icebreaker starters
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#6d803b]">
          <span>{isOpen ? "Hide ideas" : "Get ideas & hints"}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-[#dde5b6] bg-[#fcfbf6] space-y-4 text-xs sm:text-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-[#6c584c] font-medium">
              Ideas for: &ldquo;{topic.title.slice(0, 42)}...&rdquo;
            </span>
            <button
              onClick={fetchLiveResearch}
              disabled={loading}
              className="flex items-center gap-1 text-[11px] text-[#6d803b] hover:underline cursor-pointer font-semibold"
            >
              <RefreshCw size={11} className={loading ? "animate-spin" : ""} />
              <span>More ideas</span>
            </button>
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#6c584c] italic py-1">
              <Sparkles size={13} className="animate-spin text-[#a98467]" />
              <span>Brainstorming simple hints for you...</span>
            </div>
          )}

          {/* Icebreaker First Line */}
          {insight.beginnerStarter && (
            <div className="p-3.5 rounded-xl bg-[#f0ead2] border border-[#dde5b6]">
              <div className="flex items-center gap-1.5 font-bold text-[#a98467] uppercase text-[10px] tracking-wide mb-1">
                <MessageSquareQuote size={13} />
                <span>Easy sentence you can start with:</span>
              </div>
              <p className="text-xs text-[#15120f] font-semibold italic">
                &ldquo;{insight.beginnerStarter}&rdquo;
              </p>
            </div>
          )}

          {/* Simple breakdown */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-[#15120f] uppercase text-[11px] tracking-wide mb-1">
              <Compass size={13} className="text-[#6d803b]" />
              <span>In simple terms:</span>
            </div>
            <p className="text-[#15120f] leading-relaxed bg-white p-3 rounded-xl border border-[#dde5b6] text-xs sm:text-sm">
              {insight.whyInteresting}
            </p>
          </div>

          {/* 3 Easy Ideas */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-[#15120f] uppercase text-[11px] tracking-wide mb-1.5">
              <Sparkles size={13} className="text-[#a98467]" />
              <span>3 simple angles you can talk about:</span>
            </div>
            <div className="space-y-1.5">
              {insight.quickAngles.map((angle, i) => (
                <div
                  key={i}
                  className="bg-white p-2.5 rounded-xl border border-[#dde5b6] text-[#15120f] text-xs flex items-start gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-[#f0ead2] text-[#6d803b] border border-[#dde5b6] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{angle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fun fact */}
          {insight.usefulFact && (
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#15120f] uppercase text-[11px] tracking-wide mb-1">
                <BookOpen size={13} className="text-[#adc178]" />
                <span>Fun fact or example:</span>
              </div>
              <p className="text-[#15120f] leading-relaxed bg-[#f0ead2] p-3 rounded-xl border border-[#dde5b6] text-xs">
                {insight.usefulFact}
              </p>
            </div>
          )}

          {/* Speaking tip */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-[#15120f] uppercase text-[11px] tracking-wide mb-1">
              <Target size={13} className="text-[#a98467]" />
              <span>Quick speaking tip:</span>
            </div>
            <p className="text-[#15120f] leading-relaxed bg-[#f0ead2]/60 p-3 rounded-xl border border-[#a98467]/30 text-xs">
              {insight.tryThisAngle}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
