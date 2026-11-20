"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Check,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundFx } from "../lib/audioAtmosphere";

interface FinalCTAProps {
  onOpenAuth: (mode: "login" | "signup") => void;
  onExploreProjects: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenAuth,
  onExploreProjects,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    soundFx.playChime(980, "triangle", 0.08, 0.3);

    // Fire festive developer confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#287BFF", "#8755FF", "#00D6FF", "#C9A44C"],
      });
    } catch {
      // Fallback
    }

    setSubmitted(true);
    setTimeout(() => {
      onOpenAuth("signup");
    }, 1200);
  };

  return (
    <section className="relative w-full py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050608]">
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-[#287BFF]/20 via-[#8755FF]/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-16">
        {/* Integrated Developers App Interface Centerpiece */}
        <div className="relative mx-auto max-w-3xl rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_0_80px_rgba(40,123,255,0.25)] group">
          <div className="rounded-[22px] bg-[#0A0C12] p-8 sm:p-12 border border-white/[0.08] backdrop-blur-2xl text-center space-y-8 relative overflow-hidden">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#287BFF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#287BFF]/15 to-[#8755FF]/15 border border-[#287BFF]/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#00D6FF]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#00D6FF]">
                  The Complete Developer Ecosystem
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Build Something <br />
                <span className="text-gradient-accent">That Matters.</span>
              </h2>

              <p className="text-base sm:text-xl font-medium text-zinc-300">
                Your projects are your potential. Your skills are your opportunity. Your future starts here.
              </p>

              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                Join thousands of developers, campus hackathon organizers, tech startups, and enterprise recruiters building the next era of digital innovation.
              </p>
            </div>

            {/* Quick Email Registration / Invitation Form */}
            <div className="relative z-10 max-w-md mx-auto">
              {submitted ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-2 font-mono text-sm animate-in fade-in">
                  <Check className="w-5 h-5" />
                  <span>Welcome aboard! Launching Developers App Console...</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your developer email..."
                    className="flex-1 px-4 py-3 rounded-xl sm:rounded-full bg-white/[0.04] border border-white/[0.1] text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#287BFF] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl sm:rounded-full bg-gradient-to-r from-[#287BFF] via-[#5B63F6] to-[#8755FF] text-white text-xs sm:text-sm font-semibold hover:shadow-glow transition-all flex items-center justify-center gap-2 shrink-0 group"
                  >
                    <span>Join Developers App</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>

            {/* Secondary Action Link & Micro-Copy */}
            <div className="relative z-10 pt-2 flex flex-col items-center gap-3">
              <button
                onClick={onExploreProjects}
                className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
              >
                Explore Featured Developer Projects →
              </button>
              <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
                One ecosystem. Every opportunity.
              </span>
            </div>
          </div>
        </div>

        {/* Global Platform Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-3xl font-extrabold font-mono text-white">120K+</div>
            <div className="text-xs text-zinc-400 mt-1">Verified Developers</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-3xl font-extrabold font-mono text-[#00D6FF]">$1.8M</div>
            <div className="text-xs text-zinc-400 mt-1">Marketplace Volume</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-3xl font-extrabold font-mono text-[#8755FF]">850+</div>
            <div className="text-xs text-zinc-400 mt-1">Collegiate Teams</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="text-3xl font-extrabold font-mono text-emerald-400">99.98%</div>
            <div className="text-xs text-zinc-400 mt-1">Sandbox Execution Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};
