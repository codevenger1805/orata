"use client";

import React from "react";
import {
  Crown,
  Sparkles,
  Infinity,
  Layers,
  BarChart3,
  Check,
} from "lucide-react";

export const PremiumView: React.FC<{ onBackToPractice: () => void }> = ({
  onBackToPractice,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-in fade-in duration-300 relative z-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f0ead2] border border-[#dde5b6] text-[#a98467] text-xs font-bold mb-3">
          <Crown size={14} className="text-[#a98467]" />
          <span>ORATA PREMIUM</span>
        </div>
        <h1 className="font-serif-editorial text-3xl sm:text-5xl text-[#15120f] font-normal tracking-tight">
          Unlock your <span className="italic text-[#6d803b] font-semibold">full potential</span>.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#6c584c] font-serif">
          More practice. Deeper feedback. A more confident you.
        </p>
      </div>

      {/* Central Visual Feature Map */}
      <div className="relative py-6 sm:py-10">
        {/* Central Premium Circle Hub */}
        <div className="relative z-10 w-44 h-44 mx-auto rounded-full bg-gradient-to-br from-white via-[#f0ead2] to-[#dde5b6] border-4 border-white shadow-xl shadow-[#6d803b]/15 flex flex-col items-center justify-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-[#a98467] text-white flex items-center justify-center mb-1 shadow-sm">
            <Crown size={22} className="text-white" />
          </div>
          <span className="font-serif-editorial font-bold text-lg text-[#15120f]">
            Premium
          </span>
          <span className="text-[11px] text-[#6c584c] leading-tight mt-0.5 max-w-[110px]">
            Everything to become a better speaker
          </span>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {/* Card 1: Advanced AI Feedback */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm hover:border-[#adc178] transition-all relative overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#f0ead2] text-[#6d803b] flex items-center justify-center mb-3 border border-[#dde5b6]">
              <Sparkles size={18} />
            </div>
            <h3 className="font-bold text-sm text-[#15120f]">Advanced AI Feedback</h3>
            <p className="text-xs text-[#6c584c] mt-1 mb-3">
              In-depth analysis, filler-word counters, and sentence polish.
            </p>
            <ul className="text-xs text-[#15120f] space-y-1.5 border-t border-[#dde5b6] pt-3">
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> Deep metric diagnostics</li>
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> Example model answers</li>
            </ul>
          </div>

          {/* Card 2: Unlimited Practice */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm hover:border-[#adc178] transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#f0ead2] text-[#a98467] flex items-center justify-center mb-3 border border-[#dde5b6]">
              <Infinity size={18} />
            </div>
            <h3 className="font-bold text-sm text-[#15120f]">Unlimited Practice</h3>
            <p className="text-xs text-[#6c584c] mt-1 mb-3">
              Access 1,000+ challenges across all 20 niche categories.
            </p>
            <ul className="text-xs text-[#15120f] space-y-1.5 border-t border-[#dde5b6] pt-3">
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> All speaking modes</li>
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> Custom challenge builder</li>
            </ul>
          </div>

          {/* Card 3: More Speaking Modes */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm hover:border-[#adc178] transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#f0ead2] text-[#a98467] flex items-center justify-center mb-3 border border-[#a98467]/30">
              <Layers size={18} />
            </div>
            <h3 className="font-bold text-sm text-[#15120f]">More Speaking Modes</h3>
            <p className="text-xs text-[#6c584c] mt-1 mb-3">
              Specialized real-world simulation modes.
            </p>
            <ul className="text-xs text-[#15120f] space-y-1.5 border-t border-[#dde5b6] pt-3">
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> Debate & Persuasion</li>
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> Presentation & Storytelling</li>
            </ul>
          </div>

          {/* Card 4: Detailed Analytics */}
          <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm hover:border-[#adc178] transition-all">
            <div className="w-8 h-8 rounded-lg bg-[#f0ead2] text-[#adc178] flex items-center justify-center mb-3 border border-[#dde5b6]">
              <BarChart3 size={18} />
            </div>
            <h3 className="font-bold text-sm text-[#15120f]">Detailed Analytics</h3>
            <p className="text-xs text-[#6c584c] mt-1 mb-3">
              Long-term growth trends and repeat-attempt mastery.
            </p>
            <ul className="text-xs text-[#15120f] space-y-1.5 border-t border-[#dde5b6] pt-3">
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> Attempt comparison graphs</li>
              <li className="flex items-center gap-1.5"><Check size={13} className="text-[#6d803b]" /> Skill growth breakdown</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Free vs Premium Comparison Table */}
      <div className="mt-12 bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
        <h2 className="font-serif-editorial text-xl sm:text-2xl text-[#15120f] font-bold text-center mb-6">
          Free vs Premium
        </h2>

        <div className="divide-y divide-[#dde5b6] text-xs sm:text-sm">
          <div className="py-3 flex items-center justify-between font-bold text-[#6c584c] uppercase text-[11px]">
            <span>Capability</span>
            <div className="flex gap-12 sm:gap-16">
              <span className="w-16 text-center">Free</span>
              <span className="w-20 text-center text-[#a98467]">Premium</span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between text-[#15120f]">
            <span>Interactive Roulette & Practice Loop</span>
            <div className="flex gap-12 sm:gap-16">
              <span className="w-16 text-center text-[#6d803b]">✓</span>
              <span className="w-20 text-center text-[#6d803b]">✓</span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between text-[#15120f]">
            <span>Core Coaching (Clarity, Structure, Fluency, Conciseness)</span>
            <div className="flex gap-12 sm:gap-16">
              <span className="w-16 text-center text-[#6d803b]">✓</span>
              <span className="w-20 text-center text-[#6d803b]">✓</span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between text-[#15120f]">
            <span>Repeat Attempt Improvement Tracking</span>
            <div className="flex gap-12 sm:gap-16">
              <span className="w-16 text-center text-[#6d803b]">✓</span>
              <span className="w-20 text-center text-[#6d803b]">✓</span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between text-[#15120f]">
            <span>Contextual &apos;Think About It&apos; Insights</span>
            <div className="flex gap-12 sm:gap-16">
              <span className="w-16 text-center text-[#6d803b]">✓</span>
              <span className="w-20 text-center text-[#6d803b]">✓</span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between text-[#15120f]">
            <span>Extended Modes (Debate, Storytelling, Pitch)</span>
            <div className="flex gap-12 sm:gap-16">
              <span className="w-16 text-center text-[#6c584c]">Coming Soon</span>
              <span className="w-20 text-center text-[#6d803b] font-semibold">Included</span>
            </div>
          </div>

          <div className="py-3 flex items-center justify-between text-[#15120f]">
            <span>Cross-device Synchronization</span>
            <div className="flex gap-12 sm:gap-16">
              <span className="w-16 text-center text-[#6c584c]">Local only</span>
              <span className="w-20 text-center text-[#6d803b] font-semibold">Included</span>
            </div>
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="text-center mt-8 pt-6 border-t border-[#dde5b6]">
          <button
            onClick={() => alert("Orata Premium is currently in early preview. All core practice features remain 100% free with no account required!")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#a98467] hover:bg-[#8a684e] text-white font-medium text-sm sm:text-base shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <Crown size={18} className="text-[#f0ead2]" />
            <span>Upgrade to Premium →</span>
          </button>
          <div className="text-xs text-[#6c584c] mt-2 font-serif italic">
            More conversations. A more confident you.
          </div>
        </div>
      </div>
    </div>
  );
};
