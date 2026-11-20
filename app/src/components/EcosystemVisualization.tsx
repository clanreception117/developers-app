"use client";

import React, { useState } from "react";
import {
  Code2,
  Terminal,
  Trophy,
  Users,
  Briefcase,
  Layers,
  Sparkles,
  Building2,
  GraduationCap,
  Store,
  Compass,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface EcosystemVisualizationProps {
  onSelectAction?: (target: "developer" | "organization") => void;
}

export const EcosystemVisualization: React.FC<EcosystemVisualizationProps> = ({
  onSelectAction,
}) => {
  const [activeSide, setActiveSide] = useState<"developer" | "organization" | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const developerFeatures = [
    { title: "Zero-Setup Live Code Sandbox", desc: "Run JS/TS, Python, WebGL in browser", icon: Terminal },
    { title: "Interactive Developer Portfolios", desc: "Showcase git velocity & production builds", icon: Code2 },
    { title: "Projects and Code Showcase", desc: "Publish runnable repositories & live demos", icon: Layers },
    { title: "Merit-Based Achievements", desc: "Gold, Silver, Bronze validated badges", icon: Trophy },
    { title: "Developer Community", desc: "Collaborate, share code & technical posts", icon: Users },
    { title: "Hackathons and Competitions", desc: "Compete in inter-varsity grand prix", icon: Sparkles },
  ];

  const organizationFeatures = [
    { title: "Project-First Talent Discovery", desc: "Evaluate verified code before resumes", icon: Compass },
    { title: "Developer Recruitment", desc: "Fast-track candidates with sandbox benchmarks", icon: Briefcase },
    { title: "Inter-College Hackathons", desc: "Sponsor campus competitions & prize pools", icon: GraduationCap },
    { title: "Business Solution Marketplace", desc: "Commission SME applications with escrow", icon: Store },
    { title: "Technical Collaboration", desc: "Engage top 1% open-source builders", icon: Building2 },
    { title: "Sponsorship Opportunities", desc: "Brand placement across developer challenges", icon: ShieldCheck },
  ];

  return (
    <div
      id="ecosystem-canvas"
      className="relative w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Background ambient radial glow matching Nucleus image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-r from-[#3B82F6]/15 via-[#8B5CF6]/25 to-[#A855F7]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22D3EE]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Container */}
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section title pill */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-purple-300">
              CENTRAL ECOSYSTEM ARCHITECTURE
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Two Pillars of Developers App
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-xl mx-auto">
            A unified network where builders prove capability and organizations discover validated engineering talent.
          </p>
        </div>

        {/* 3-Column Diagram (Left: Developers, Center: Concentric Core, Right: Organizations) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* LEFT COLUMN: FOR DEVELOPERS */}
          <div
            className={`lg:col-span-4 space-y-3 transition-all duration-300 ${
              activeSide === "organization" ? "opacity-50" : "opacity-100"
            }`}
            onMouseEnter={() => setActiveSide("developer")}
            onMouseLeave={() => setActiveSide(null)}
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-[#22D3EE]">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                    FOR DEVELOPERS
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  </h3>
                  <span className="text-[10px] font-mono text-blue-300">BUILD • SHOWCASE • EARN</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                6 MODULES
              </span>
            </div>

            <div className="space-y-2">
              {developerFeatures.map((item, index) => {
                const Icon = item.icon;
                const isHovered = activeSide === "developer" && hoveredIndex === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      soundFx.playChime(600 + index * 40, "sine", 0.02, 0.08);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isHovered
                        ? "bg-gradient-to-r from-blue-950/50 to-blue-900/30 border-blue-400/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] translate-x-1"
                        : "bg-[#0A0D18]/80 border-white/[0.06] hover:border-blue-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isHovered
                            ? "bg-blue-500 text-white shadow-glow"
                            : "bg-blue-500/10 text-blue-400"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-blue-200 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>

            {onSelectAction && (
              <div className="pt-2">
                <button
                  onClick={() => onSelectAction("developer")}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-400 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Enter as Developer</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-blue-400" />
                </button>
              </div>
            )}
          </div>

          {/* CENTER COLUMN: CONCENTRIC ROTATING ECOSYSTEM CORE (Reference: Nucleus Center Diagram) */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 relative">
            {/* SVG Connecting Curved Network Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Left connection curves */}
              <path
                d="M 50 120 C 150 120, 180 250, 250 250"
                stroke="url(#blue-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40 animate-pulse"
              />
              <path
                d="M 50 200 C 140 200, 180 250, 250 250"
                stroke="url(#blue-grad)"
                strokeWidth="1.5"
                className="opacity-60"
              />
              <path
                d="M 50 280 C 140 280, 180 250, 250 250"
                stroke="url(#blue-grad)"
                strokeWidth="1.5"
                className="opacity-60"
              />
              <path
                d="M 50 360 C 150 360, 180 250, 250 250"
                stroke="url(#blue-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40 animate-pulse"
              />

              {/* Right connection curves */}
              <path
                d="M 450 120 C 350 120, 320 250, 250 250"
                stroke="url(#purple-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40 animate-pulse"
              />
              <path
                d="M 450 200 C 360 200, 320 250, 250 250"
                stroke="url(#purple-grad)"
                strokeWidth="1.5"
                className="opacity-60"
              />
              <path
                d="M 450 280 C 360 280, 320 250, 250 250"
                stroke="url(#purple-grad)"
                strokeWidth="1.5"
                className="opacity-60"
              />
              <path
                d="M 450 360 C 350 360, 320 250, 250 250"
                stroke="url(#purple-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40 animate-pulse"
              />

              <defs>
                <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="purple-grad" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Central Orbital Rings Assembly */}
            <div className="relative w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] flex items-center justify-center">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20 shadow-[0_0_60px_rgba(139,92,246,0.2)] animate-pulse" />

              {/* Ring 4: GROW (Outermost rotating ring) */}
              <div
                className="absolute inset-4 rounded-full border border-dashed border-purple-400/30 flex items-center justify-center animate-spin"
                style={{ animationDuration: "60s" }}
              >
                <span className="absolute -top-3 px-2 py-0.5 rounded-full bg-[#05040B] text-[9px] font-mono font-bold tracking-widest text-[#22D3EE] border border-[#22D3EE]/30 shadow-sm">
                  GROW
                </span>
                <span className="absolute -bottom-3 px-2 py-0.5 rounded-full bg-[#05040B] text-[9px] font-mono font-bold tracking-widest text-purple-300 border border-purple-500/30 shadow-sm">
                  COLLABORATE
                </span>
              </div>

              {/* Ring 3: CONNECT */}
              <div
                className="absolute inset-10 rounded-full border border-blue-500/25 flex items-center justify-center animate-spin"
                style={{ animationDuration: "40s", animationDirection: "reverse" }}
              >
                <span className="absolute -left-3 px-2 py-0.5 rounded-full bg-[#05040B] text-[9px] font-mono font-bold tracking-widest text-blue-400 border border-blue-500/30">
                  CONNECT
                </span>
                <span className="absolute -right-3 px-2 py-0.5 rounded-full bg-[#05040B] text-[9px] font-mono font-bold tracking-widest text-amber-400 border border-amber-500/30">
                  HIRE
                </span>
                {/* Orbiting particle nodes */}
                <span className="absolute top-2 right-8 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#F59E0B] animate-ping" />
                <span className="absolute bottom-4 left-8 w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE]" />
              </div>

              {/* Ring 2: SHOWCASE */}
              <div
                className="absolute inset-16 rounded-full border border-purple-500/40 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 flex items-center justify-center animate-spin"
                style={{ animationDuration: "25s" }}
              >
                <span className="absolute top-0 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-purple-200">
                  SHOWCASE
                </span>
                <span className="absolute bottom-0 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider text-blue-300">
                  VALIDATE
                </span>
              </div>

              {/* Ring 1: BUILD (Inner disc) */}
              <div className="absolute inset-24 rounded-full bg-gradient-to-tr from-blue-900/40 via-purple-900/50 to-indigo-900/40 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.4)]">
                <div className="text-center space-y-1">
                  <span className="text-[10px] font-mono font-extrabold tracking-widest uppercase text-white/90">
                    BUILD
                  </span>
                </div>
              </div>

              {/* Core Emblem: Developers App Hexagonal / Code Centerpiece */}
              <div className="relative z-20 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#A855F7] p-[2px] shadow-[0_0_35px_rgba(139,92,246,0.6)] group cursor-pointer hover:scale-110 transition-transform">
                <div className="w-full h-full rounded-[14px] bg-[#070910] flex flex-col items-center justify-center text-white">
                  <Code2 className="w-7 h-7 text-[#22D3EE] group-hover:rotate-12 transition-transform" />
                  <span className="text-[8px] font-mono font-bold text-white tracking-tighter mt-0.5">
                    DEV APP
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Caption */}
            <div className="mt-4 text-center">
              <span className="text-[10px] font-mono text-zinc-400">
                Luminous nodes synchronize real-time code runs to global recruiters
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: FOR ORGANIZATIONS */}
          <div
            className={`lg:col-span-4 space-y-3 transition-all duration-300 ${
              activeSide === "developer" ? "opacity-50" : "opacity-100"
            }`}
            onMouseEnter={() => setActiveSide("organization")}
            onMouseLeave={() => setActiveSide(null)}
          >
            <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                    FOR ORGANIZATIONS
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                  </h3>
                  <span className="text-[10px] font-mono text-purple-300">DISCOVER • HIRE • SPONSOR</span>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                6 MODULES
              </span>
            </div>

            <div className="space-y-2">
              {organizationFeatures.map((item, index) => {
                const Icon = item.icon;
                const isHovered = activeSide === "organization" && hoveredIndex === index;
                return (
                  <div
                    key={index}
                    onMouseEnter={() => {
                      setHoveredIndex(index);
                      soundFx.playChime(700 + index * 40, "sine", 0.02, 0.08);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`group p-3 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                      isHovered
                        ? "bg-gradient-to-r from-purple-950/50 to-purple-900/30 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] translate-x-1"
                        : "bg-[#0A0D18]/80 border-white/[0.06] hover:border-purple-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isHovered
                            ? "bg-purple-500 text-white shadow-glow-violet"
                            : "bg-purple-500/10 text-purple-300"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-purple-200 transition-colors">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-zinc-400 font-mono">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>

            {onSelectAction && (
              <div className="pt-2">
                <button
                  onClick={() => onSelectAction("organization")}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-400 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Enter as Organization</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-purple-300" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
