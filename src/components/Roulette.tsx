"use client";

import React, { useState, useEffect, useRef } from "react";
import { TopicItem, PracticeMode, TopicNiche, getTopicsFor, TOPIC_BANK } from "@/data/topics";
import { Clock, Mic, Tag, RotateCw, Sparkles, ArrowRight, ShieldCheck, Zap, BarChart2 } from "lucide-react";

interface RouletteProps {
  mode: PracticeMode;
  niche: TopicNiche;
  currentTopic: TopicItem;
  onTopicSelected: (topic: TopicItem) => void;
  onStartSpeaking: () => void;
  recentTopicIds: string[];
}

export const Roulette: React.FC<RouletteProps> = ({
  mode,
  niche,
  currentTopic,
  onTopicSelected,
  onStartSpeaking,
  recentTopicIds,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayTopic, setDisplayTopic] = useState<TopicItem>(currentTopic);
  const [reelSequence, setReelSequence] = useState<TopicItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [hasLanded, setHasLanded] = useState(true);

  const animFrameRef = useRef<number | null>(null);

  const getUniqueCandidatePool = (activeMode: PracticeMode, activeNiche: TopicNiche): TopicItem[] => {
    const pool = getTopicsFor(activeMode, activeNiche);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    if (shuffled.length < 25) {
      const allShuffled = [...TOPIC_BANK].sort(() => Math.random() - 0.5);
      for (const item of allShuffled) {
        if (!shuffled.some((s) => s.id === item.id)) {
          shuffled.push({ ...item, mode: activeMode });
        }
      }
    }
    return shuffled;
  };

  useEffect(() => {
    if (isSpinning) return;
    const pool = getUniqueCandidatePool(mode, niche);
    const others = pool.filter((item) => item.id !== currentTopic.id);
    
    const cardTop2 = others[0] || pool[0];
    const cardTop1 = others[1] || pool[1];
    const cardBottom1 = others[2] || pool[2];
    const cardBottom2 = others[3] || pool[3];

    setReelSequence([cardTop2, cardTop1, currentTopic, cardBottom1, cardBottom2]);
    setCurrentIndex(2);
    setDisplayTopic(currentTopic);
  }, [currentTopic, mode, niche]);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setHasLanded(false);

    const pool = getUniqueCandidatePool(mode, niche);
    const eligiblePool = pool.filter(
      (item) => item.id !== currentTopic.id && !recentTopicIds.includes(item.id)
    );
    const finalCandidatePool = eligiblePool.length > 0 ? eligiblePool : pool;
    const winningTopic =
      finalCandidatePool[Math.floor(Math.random() * finalCandidatePool.length)] || pool[0];

    const transitionalItems: TopicItem[] = [];
    const poolCopy = [...pool].filter((i) => i.id !== winningTopic.id && i.id !== currentTopic.id);
    for (let i = poolCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [poolCopy[i], poolCopy[j]] = [poolCopy[j], poolCopy[i]];
    }

    const stepsCount = 18;
    for (let i = 0; i < stepsCount; i++) {
      transitionalItems.push(poolCopy[i % poolCopy.length]);
    }

    const leadingDecoy1 = poolCopy[(stepsCount + 1) % poolCopy.length];
    const leadingDecoy2 = poolCopy[(stepsCount + 2) % poolCopy.length];
    const trailingDecoy1 = poolCopy[(stepsCount + 3) % poolCopy.length];
    const trailingDecoy2 = poolCopy[(stepsCount + 4) % poolCopy.length];

    const currentCards = reelSequence.length >= 5 ? reelSequence : [currentTopic, currentTopic, currentTopic, currentTopic, currentTopic];

    const fullTrack = [
      currentCards[0],
      currentCards[1],
      currentCards[2],
      ...transitionalItems,
      leadingDecoy1,
      leadingDecoy2,
      winningTopic,
      trailingDecoy1,
      trailingDecoy2,
    ];

    setReelSequence(fullTrack);

    const winningIndex = fullTrack.length - 3;
    const startIndex = 2;
    const totalDistance = winningIndex - startIndex;

    const startTime = performance.now();
    const duration = 2100;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3.2);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);

      const currentFloatIndex = startIndex + totalDistance * eased;
      setCurrentIndex(currentFloatIndex);

      const roundedIndex = Math.round(currentFloatIndex);
      if (fullTrack[roundedIndex]) {
        setDisplayTopic(fullTrack[roundedIndex]);
      }

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setCurrentIndex(winningIndex);
        setDisplayTopic(winningTopic);
        setIsSpinning(false);
        setHasLanded(true);
        onTopicSelected(winningTopic);
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const getVisibleSlots = () => {
    if (reelSequence.length === 0) return [];

    const offsets = [-2, -1, 0, 1, 2];
    return offsets.map((offset) => {
      const targetVirtualIndex = Math.round(currentIndex) + offset;
      const boundedIndex = Math.max(0, Math.min(reelSequence.length - 1, targetVirtualIndex));
      const delta = targetVirtualIndex - currentIndex;
      return {
        offset,
        item: reelSequence[boundedIndex],
        delta,
      };
    });
  };

  const slots = getVisibleSlots();

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <div className="relative w-full h-[270px] sm:h-[290px] flex items-center justify-center overflow-hidden my-2">
        <div className="absolute inset-0 bg-radial from-[#dde5b6]/30 via-transparent to-transparent blur-2xl pointer-events-none" />

        {slots.map(({ offset, item, delta }) => {
          const isCenter = offset === 0;
          const absDelta = Math.abs(delta);

          const translateY = delta * 64;
          const scale = Math.max(0.72, 1 - absDelta * 0.12);
          const opacity = isCenter
            ? 1
            : Math.max(0.2, 0.72 - (absDelta - 0.5) * 0.4);
          const zIndex = isCenter ? 50 : Math.round(40 - absDelta * 10);
          const rotateX = -delta * 6;

          if (!item) return null;

          return (
            <div
              key={`${offset}-${item.id}`}
              style={{
                transform: `translate3d(0, ${translateY}px, ${-absDelta * 25}px) scale(${scale}) rotateX(${rotateX}deg)`,
                opacity: opacity,
                zIndex: zIndex,
                transition: isSpinning ? "none" : "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`absolute inset-x-2 sm:inset-x-4 rounded-3xl transition-shadow select-none flex flex-col items-center justify-center text-center p-4 sm:p-5 ${
                isCenter
                  ? "bg-white border-2 border-[#adc178] shadow-xl shadow-[#adc178]/20 ring-4 ring-[#dde5b6]/60 cursor-default"
                  : "bg-[#fcfbf6]/90 border border-[#dde5b6] shadow-xs cursor-pointer hover:bg-white"
              }`}
            >
              {isCenter ? (
                <div className={`w-full flex flex-col items-center justify-center ${hasLanded ? "animate-in zoom-in-95 duration-200" : ""}`}>
                  <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0ead2] border border-[#dde5b6] text-[#6d803b] text-[11px] font-bold tracking-wider uppercase mb-2">
                    <Sparkles size={12} className="text-[#a98467] animate-spin" style={{ animationDuration: "6s" }} />
                    <span>YOUR CHALLENGE</span>
                    <Sparkles size={12} className="text-[#a98467] animate-spin" style={{ animationDuration: "6s" }} />
                  </div>

                  <h2 className="font-serif-editorial text-xl sm:text-2xl md:text-3xl text-[#15120f] font-bold leading-snug tracking-tight max-w-lg mb-2.5">
                    {item.title}
                  </h2>

                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#6c584c]">
                    <span className="flex items-center gap-1 bg-[#f0ead2] px-2.5 py-0.5 rounded-full border border-[#dde5b6] text-[#15120f] font-medium">
                      <Clock size={12} className="text-[#6d803b]" />
                      {item.suggestedSeconds}s
                    </span>
                    <span className="flex items-center gap-1 bg-[#f0ead2] px-2.5 py-0.5 rounded-full border border-[#dde5b6] capitalize text-[#15120f] font-medium">
                      <Mic size={12} className="text-[#6d803b]" />
                      {item.mode}
                    </span>
                    <span className="flex items-center gap-1 bg-[#f0ead2] px-2.5 py-0.5 rounded-full border border-[#a98467]/40 text-[#15120f] font-medium">
                      <Tag size={12} className="text-[#a98467]" />
                      {item.niche}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center py-1">
                  <p className="font-serif-editorial text-sm sm:text-base text-[#15120f] font-normal truncate max-w-md">
                    {item.title}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {/* Main Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className={`group flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full bg-[#a98467] hover:bg-[#8a684e] text-white font-semibold text-sm sm:text-base shadow-md shadow-[#a98467]/25 active:scale-95 transition-all cursor-pointer ${
            isSpinning ? "opacity-80 cursor-wait" : ""
          }`}
        >
          <Sparkles size={16} className="text-[#f0ead2]" />
          <span>{isSpinning ? "Spinning..." : "Spin"}</span>
          <ArrowRight size={16} className="text-[#f0ead2] group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Spin Again Circular Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          title="Spin Again"
          className="p-3.5 rounded-full bg-white hover:bg-[#f0ead2] border border-[#dde5b6] text-[#15120f] hover:text-[#a98467] shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <RotateCw size={18} className={isSpinning ? "animate-spin text-[#6d803b]" : ""} />
        </button>
      </div>

      <p className="text-xs text-[#6c584c] mt-2 font-medium">
        Let&apos;s see what you get.
      </p>

      {/* Feature Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 text-[11px] sm:text-xs text-[#6c584c]">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-[#6d803b]" />
          No account required
        </span>
        <span className="text-[#dde5b6]">•</span>
        <span className="flex items-center gap-1.5">
          <Zap size={13} className="text-[#a98467]" />
          Free to practice
        </span>
        <span className="text-[#dde5b6]">•</span>
        <span className="flex items-center gap-1.5">
          <BarChart2 size={13} className="text-[#adc178]" />
          Real AI feedback after speaking
        </span>
      </div>

      {/* Start Speaking CTA */}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={onStartSpeaking}
          disabled={isSpinning}
          className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#adc178] hover:bg-[#92aa4e] text-[#15120f] font-semibold text-sm sm:text-base shadow-md hover:shadow-lg shadow-[#adc178]/25 active:scale-95 transition-all cursor-pointer"
        >
          <Mic size={18} className="text-[#15120f]" />
          <span>Start Speaking Now →</span>
        </button>
      </div>
    </div>
  );
};
