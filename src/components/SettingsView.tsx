"use client";

import React, { useState } from "react";
import { Mic, Trash2, Shield, Info, Check } from "lucide-react";
import { clearAllData } from "@/lib/storage";

export const SettingsView: React.FC<{ onDataCleared: () => void }> = ({
  onDataCleared,
}) => {
  const [micStatus, setMicStatus] = useState<string>("Click to test microphone");
  const [testingMic, setTestingMic] = useState(false);
  const [clearedNotice, setClearedNotice] = useState(false);

  const testMicrophone = async () => {
    setTestingMic(true);
    setMicStatus("Requesting audio permission...");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStatus("Microphone working perfectly! Permission granted.");
      stream.getTracks().forEach((t) => t.stop());
    } catch {
      setMicStatus("Microphone access unavailable or denied in browser settings.");
    } finally {
      setTestingMic(false);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear your local practice history?")) {
      clearAllData();
      setClearedNotice(true);
      onDataCleared();
      setTimeout(() => setClearedNotice(false), 3000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in duration-200 relative z-10">
      <div className="border-b border-[#dde5b6] pb-5 mb-8">
        <h1 className="font-serif-editorial text-3xl text-[#15120f] font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-[#6c584c] mt-1 font-serif">
          Manage hardware permissions, coaching preferences, and privacy.
        </p>
      </div>

      <div className="space-y-6">
        {/* Microphone Test */}
        <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[#6d803b] uppercase tracking-wide mb-1">
            <Mic size={15} className="text-[#6d803b]" />
            <span>Microphone Setup</span>
          </div>
          <p className="text-xs text-[#6c584c] mb-4">
            Test your browser audio input and speech recognition permissions.
          </p>

          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-[#15120f] font-medium">{micStatus}</span>
            <button
              onClick={testMicrophone}
              disabled={testingMic}
              className="px-4 py-2 rounded-full bg-[#f0ead2] hover:bg-white border border-[#dde5b6] text-xs font-semibold text-[#15120f] transition-colors shrink-0 cursor-pointer"
            >
              {testingMic ? "Testing..." : "Test Mic"}
            </button>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[#a98467] uppercase tracking-wide mb-1">
            <Shield size={15} className="text-[#a98467]" />
            <span>Data & Privacy</span>
          </div>
          <p className="text-xs text-[#6c584c] mb-4">
            Orata operates locally in your browser. No speech audio is permanently stored on external servers.
          </p>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-[#15120f]">Reset Local Progress</div>
              <div className="text-[11px] text-[#6c584c]">
                Deletes cached topics and repeat attempt scores from this browser.
              </div>
            </div>

            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#f0ead2] border border-[#a98467]/30 text-xs font-semibold text-[#a98467] transition-colors cursor-pointer"
            >
              <Trash2 size={13} />
              <span>Clear History</span>
            </button>
          </div>

          {clearedNotice && (
            <div className="mt-3 text-xs text-[#6d803b] bg-[#f0ead2] border border-[#dde5b6] p-2 rounded-lg flex items-center gap-1.5 font-medium">
              <Check size={14} />
              <span>All local practice history cleared successfully.</span>
            </div>
          )}
        </div>

        {/* System Info */}
        <div className="bg-[#ffffff]/95 backdrop-blur-sm border border-[#dde5b6] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-bold text-[#adc178] uppercase tracking-wide mb-1">
            <Info size={15} className="text-[#adc178]" />
            <span>Architecture & Engine</span>
          </div>
          <p className="text-xs text-[#6c584c] mb-3">
            Local prompt generation + AI grounding and speech analysis pipeline.
          </p>
          <div className="text-xs text-[#15120f] space-y-1">
            <div>• Primary Engine: Google Gemini API (fallback to local semantic analyzer)</div>
            <div>• Speech Processing: Web Speech API & Web Audio Spectrum Analyser</div>
            <div>• Storage: Anonymous local browser storage (No sign up required)</div>
          </div>
        </div>
      </div>
    </div>
  );
};
