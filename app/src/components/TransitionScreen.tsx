"use client";

import React, { useEffect } from "react";
import { Sparkles, Code2, ArrowRight } from "lucide-react";

interface TransitionScreenProps {
  onComplete: () => void;
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1600);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050608] text-white p-6 select-none animate-in fade-in duration-300">
      {/* Background ambient light */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#287BFF]/25 via-[#8755FF]/20 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-lg text-center space-y-6">
        {/* Animated Brand Emblem */}
        <div className="relative mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-[#287BFF] via-[#8755FF] to-[#00D6FF] p-[2px] shadow-[0_0_50px_rgba(40,123,255,0.4)] animate-pulse">
          <div className="w-full h-full rounded-[22px] bg-[#050608] flex items-center justify-center">
            <Code2 className="w-10 h-10 text-[#00D6FF] animate-spin" style={{ animationDuration: "8s" }} />
          </div>
        </div>

        {/* Transition Text Required by Prompt */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-mono text-[#00D6FF] tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developers App • Gateway</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            "Making a Leap from Ordinary to Dev..."
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-wide">
            Bridging the Gap Between Codes and Developers' Showcase.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-white/[0.08] rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#287BFF] via-[#8755FF] to-[#00D6FF] animate-[shimmer_1.4s_ease-in-out_infinite] w-full" />
        </div>
      </div>
    </div>
  );
};
