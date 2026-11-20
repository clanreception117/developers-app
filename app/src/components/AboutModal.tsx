"use client";

import React from "react";
import { X, Code2, Sparkles, Globe, Shield, Terminal, Users, Award } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl border border-white/[0.12] bg-[#0A0C12] p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#287BFF] to-[#8755FF] flex items-center justify-center text-white">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">About Developers App</h3>
              <p className="text-[11px] font-mono text-[#00D6FF]">
                Bridging the Gap Between Codes and Developers' Showcase.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p className="font-semibold text-white">
            Developers App is an all-in-one developer digital ecosystem created to transform how software engineers showcase their capabilities and connect with global opportunities.
          </p>
          <p className="text-zinc-400">
            Traditional resumes and passive code repositories fail to convey the dynamic speed, creative depth, and real-world execution of modern software engineering. Developers App solves this by uniting zero-setup live code sandboxing, cryptographically verifiable portfolios, peer-reviewed merit tier achievements, an open project marketplace, and multi-college hackathon arenas under one seamless canopy.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Terminal className="w-4 h-4 text-[#00D6FF]" />
              Live Execution Sandboxes
            </div>
            <p className="text-zinc-400">
              Run working applications in isolated browser environments with zero local setup requirements.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Award className="w-4 h-4 text-[#C9A44C]" />
              Tiered Merit System
            </div>
            <p className="text-zinc-400">
              Gold, Silver, and Bronze badges awarded strictly on verified code quality and competition milestones.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Users className="w-4 h-4 text-[#287BFF]" />
              Project-First Recruitment
            </div>
            <p className="text-zinc-400">
              Companies and startups hire proven builders by evaluating runnable applications over algorithmic whiteboard tests.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Globe className="w-4 h-4 text-[#8755FF]" />
              Collegiate Hackathon Hub
            </div>
            <p className="text-zinc-400">
              Connecting 50+ global universities, student hackathons, and local SME business contracts in real-time.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
