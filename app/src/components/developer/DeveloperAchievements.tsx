"use client";

import React, { useState } from "react";
import {
  Trophy,
  Award,
  Sparkles,
  TrendingUp,
  Play,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Filter,
} from "lucide-react";
import { Achievement } from "../../types";
import { dataStore } from "../../lib/dataStore";
import { soundFx } from "../../lib/audioAtmosphere";

interface DeveloperAchievementsProps {
  username: string;
}

export const DeveloperAchievements: React.FC<DeveloperAchievementsProps> = ({ username }) => {
  const [achievements] = useState<Achievement[]>(() => dataStore.getAchievements(username));
  const [filter, setFilter] = useState<string>("All");

  const filteredAchievements =
    filter === "All"
      ? achievements
      : achievements.filter((a) => a.category === filter);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-[#F59E0B]" />
            <span>Developer Accomplishments &amp; Milestones</span>
          </h2>
          <p className="text-xs text-[#A1AAB8] font-mono mt-1">
            Algorithmic milestones, hackathon awards, and production velocity records verified by Developers App.
          </p>
        </div>

        {/* Milestone Summary Counter */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
          <span className="text-[#F59E0B] font-bold">{achievements.length} Verified Milestones</span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["All", "Hackathon", "Project", "Competition", "Community", "Certification"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundFx.playChime(600, "sine", 0.02, 0.08);
              setFilter(cat);
            }}
            className={`px-4 py-2 rounded-xl font-mono font-medium transition-colors whitespace-nowrap ${
              filter === cat
                ? "bg-[#F59E0B] text-black font-bold shadow-md"
                : "bg-[#121827] text-[#A1AAB8] hover:text-white border border-white/[0.06]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAchievements.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-[#121827] border border-white/[0.08] hover:border-[#F59E0B]/40 transition-all duration-300 shadow-card space-y-4 group relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Accent Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F59E0B] to-[#3478F6]" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/[0.06] text-[#22D3EE] border border-white/[0.08]">
                  {item.category}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A1AAB8] leading-relaxed mt-1.5">
                  {item.description}
                </p>
              </div>

              {item.metric && (
                <div className="p-3 rounded-xl bg-[#070910] border border-white/[0.04] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Benchmark Metric:</span>
                  <span className="text-[#22D3EE] font-bold">{item.metric}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Deliverable</span>
              </span>
              <span>{item.dateEarned}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
