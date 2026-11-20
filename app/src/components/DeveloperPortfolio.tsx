"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Award,
  GitBranch,
  ExternalLink,
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Star,
  Activity,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface Skill {
  name: string;
  level: number; // 0 - 100
  verified: boolean;
  category: string;
}

const SKILLS: Skill[] = [
  { name: "Next.js / React 19", level: 96, verified: true, category: "Frontend" },
  { name: "TypeScript / Node.js", level: 92, verified: true, category: "Backend" },
  { name: "Rust / WebAssembly", level: 85, verified: true, category: "Systems" },
  { name: "Three.js / WebGL", level: 88, verified: true, category: "Creative" },
  { name: "Distributed Databases", level: 82, verified: false, category: "Infra" },
  { name: "PyTorch & Transformers", level: 78, verified: true, category: "AI/ML" },
];

export const DeveloperPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"projects" | "certs" | "activity">("projects");
  const [copiedBadge, setCopiedBadge] = useState<boolean>(false);

  // Generate simulated GitHub-style contribution heatmap (52 weeks x 7 days)
  const generateContributionHeatmap = () => {
    const days = [];
    const intensities = [0, 1, 2, 3, 4];
    for (let i = 0; i < 98; i++) {
      const rand = Math.floor(Math.sin(i * 0.4) * 2 + 2.5);
      days.push(Math.max(0, Math.min(4, rand)));
    }
    return days;
  };

  const heatmap = generateContributionHeatmap();

  return (
    <div id="developers-portfolio" className="w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8755FF]/10 border border-[#8755FF]/30 text-[#8755FF] text-xs font-semibold uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              Verified Developer Identity
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Let Your Work Speak. <br />
              <span className="text-gradient-accent">Proof of Capability Over Paper Resumes.</span>
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed">
              Showcase runnable projects, cryptographically verified skills, peer endorsements, and real git commits. Developers App turns your engineering work into your strongest career asset.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <div>
              <div className="text-2xl font-bold text-white">Top 0.8%</div>
              <div className="text-xs text-zinc-400">Global Rank</div>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div>
              <div className="text-2xl font-bold text-[#C9A44C]">Gold Tier</div>
              <div className="text-xs text-zinc-400">Merit Status</div>
            </div>
          </div>
        </div>

        {/* The Interactive Profile Card */}
        <div className="rounded-3xl border border-white/[0.1] bg-[#0A0C12]/90 backdrop-blur-xl p-6 sm:p-8 shadow-glass overflow-hidden relative">
          {/* Subtle Ambient Spotlight behind profile */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#8755FF]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

          {/* Profile Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-5">
              {/* Avatar with Animated Tier Ring */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#287BFF] via-[#8755FF] to-[#00D6FF] p-[2px] shadow-[0_0_25px_rgba(135,85,255,0.4)]">
                  <div className="w-full h-full rounded-[14px] bg-[#050608] flex items-center justify-center font-bold text-2xl text-white">
                    AR
                  </div>
                </div>
                <div
                  title="Gold Tier Verified Contributor"
                  className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#C9A44C] text-[#050608] font-bold text-[10px] flex items-center gap-1 shadow-md"
                >
                  <Award className="w-3 h-3 fill-current" />
                  GOLD
                </div>
              </div>

              {/* Developer Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Alex Rivers
                  </h4>
                  <span className="p-0.5 rounded-full bg-[#00D6FF]/20 text-[#00D6FF]" title="Verified Engineer">
                    <CheckCircle2 className="w-4 h-4 fill-[#00D6FF]/20" />
                  </span>
                </div>
                <p className="text-sm text-zinc-400 font-medium">
                  Principal Systems Architect &amp; Creative Technologist
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono pt-1">
                  <span>@alexrivers.dev</span>
                  <span>•</span>
                  <span>Joined Developers App Beta</span>
                  <span>•</span>
                  <span className="text-emerald-400">Available for Hire</span>
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playChime(650, "sine", 0.04, 0.1);
                  setCopiedBadge(true);
                  setTimeout(() => setCopiedBadge(false), 2000);
                }}
                className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-zinc-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
              >
                {copiedBadge ? "Link Copied ✓" : "Share Portfolio"}
              </button>
              <button
                onClick={() => soundFx.playChime(850, "triangle", 0.05, 0.2)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all"
              >
                Request Interview
              </button>
            </div>
          </div>

          {/* Skills Breakdown Grid */}
          <div className="py-6 border-b border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Cryptographically Verified Skills &amp; Proficiencies
              </span>
              <span className="text-xs text-[#00D6FF] font-mono">
                Verified via Live Code Sandbox tests
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white flex items-center gap-1.5">
                      {skill.name}
                      {skill.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00D6FF]" title="Verified by Developers App Engine" />
                      )}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#287BFF] to-[#8755FF] rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Heatmap Row */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#00D6FF]" />
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Developers App Integrated Git Velocity (2,842 Contributions Past Year)
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.05]" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#287BFF]/30" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#287BFF]/60" />
                <span className="w-2.5 h-2.5 rounded-sm bg-[#00D6FF]" />
                <span>More</span>
              </div>
            </div>

            {/* Heatmap Grid */}
            <div className="p-3 bg-black/40 rounded-xl border border-white/[0.06] overflow-x-auto">
              <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[650px]">
                {heatmap.map((intensity, idx) => {
                  let bg = "bg-white/[0.04]";
                  if (intensity === 1) bg = "bg-[#287BFF]/30";
                  if (intensity === 2) bg = "bg-[#287BFF]/60";
                  if (intensity === 3) bg = "bg-[#8755FF]";
                  if (intensity === 4) bg = "bg-[#00D6FF]";
                  return (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-[2px] ${bg} transition-transform hover:scale-125 cursor-pointer`}
                      title={`Day ${idx + 1}: ${intensity * 4} commits and sandbox executions`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
