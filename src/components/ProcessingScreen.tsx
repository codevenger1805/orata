"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export const ProcessingScreen: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const steps = [
    "Listening to your response…",
    "Analyzing structure & clarity…",
    "Building your coaching feedback…",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative z-10">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full bg-[#dde5b6] animate-ping absolute inset-0" />
        <div className="w-16 h-16 rounded-full bg-[#adc178] flex items-center justify-center text-[#15120f] relative shadow-md">
          <Sparkles size={24} className="animate-spin text-[#f0ead2]" />
        </div>
      </div>

      <h2 className="font-serif-editorial text-2xl text-[#15120f] font-bold tracking-tight">
        {steps[stepIndex]}
      </h2>
      <p className="mt-2 text-xs sm:text-sm text-[#6c584c] italic font-serif">
        one thing at a time.
      </p>
    </div>
  );
};
