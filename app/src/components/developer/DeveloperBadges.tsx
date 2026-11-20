"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Award,
} from "lucide-react";
import { MeritBadge } from "../../types";
import { dataStore } from "../../lib/dataStore";
import { soundFx } from "../../lib/audioAtmosphere";

interface DeveloperBadgesProps {
  username: string;
}

export const DeveloperBadges: React.FC<DeveloperBadgesProps> = ({ username }) => {
  const [badges] = useState<MeritBadge[]>(() => dataStore.getBadges(username));

  const earnedBadges = badges.filter((b) => b.isEarned);
  const lockedBadges = [
    {
      id: "badge-platinum",
      tier: "Gold" as const,
      title: "Titanium Genesis Badge (Global Top 10)",
      description: "Restricted to the top 10 ranked global engineering contributors on Developers App.",
      reason: "Reserved for top 10 global leaderboard placement across multiple collegiate hackathon seasons.",
      criteria: [
        "Reach Global Rank #1 - #10",
        "Author an approved open-source consensus protocol",
        "Sponsor or judge at least 2 community hackathons",
      ],
      awardDate: "In Progress (Rank: Top 0.8%)",
      isEarned: false,
      verified: false,
      ownerUsername: username,
      scoreRequirement: 1200,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-[#F59E0B]" />
            <span>Merit-Based Badge System</span>
          </h2>
          <p className="text-xs text-[#A1AAB8] font-mono mt-1">
            Algorithmic merit validation tiers: Gold, Silver, and Bronze badges awarded based on verifiable project execution.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
          <span className="text-[#F59E0B] font-bold">Current Standing: Gold Tier</span>
        </div>
      </div>

      {/* SECTION 1: EARNED MERIT BADGES */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>Active Earned Badges ({earnedBadges.length})</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {earnedBadges.map((badge) => {
            const isGold = badge.tier === "Gold";
            const isSilver = badge.tier === "Silver";

            return (
              <div
                key={badge.id}
                className={`p-6 rounded-3xl bg-[#121827] border transition-all duration-300 shadow-card flex flex-col justify-between space-y-4 relative overflow-hidden ${
                  isGold
                    ? "border-[#F59E0B]/50 hover:border-[#F59E0B] shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                    : isSilver
                    ? "border-[#94A3B8]/50 hover:border-[#94A3B8] shadow-[0_0_30px_rgba(148,163,184,0.15)]"
                    : "border-[#D97706]/50 hover:border-[#D97706]"
                }`}
              >
                {/* Top Glowing Accent Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] ${
                    isGold
                      ? "bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]"
                      : isSilver
                      ? "bg-gradient-to-r from-[#94A3B8] via-[#E2E8F0] to-[#94A3B8]"
                      : "bg-gradient-to-r from-[#D97706] to-[#B45309]"
                  }`}
                />

                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                        isGold
                          ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 shadow-glow"
                          : isSilver
                          ? "bg-[#94A3B8]/20 text-[#94A3B8] border border-[#94A3B8]/40"
                          : "bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/40"
                      }`}
                    >
                      {isGold ? "★" : isSilver ? "◆" : "▲"}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${
                        isGold
                          ? "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30"
                          : isSilver
                          ? "bg-[#94A3B8]/15 text-[#94A3B8] border-[#94A3B8]/30"
                          : "bg-[#D97706]/15 text-[#D97706] border-[#D97706]/30"
                      }`}
                    >
                      {badge.tier} Tier
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">{badge.title}</h3>
                    <p className="text-xs text-[#A1AAB8] leading-relaxed mt-1">
                      {badge.description}
                    </p>
                  </div>

                  {/* Reason for receiving */}
                  <div className="p-3 rounded-xl bg-[#070910] border border-white/[0.04] space-y-1 text-xs font-mono">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                      Award Justification:
                    </span>
                    <p className="text-zinc-300 text-[11px] leading-relaxed">{badge.reason}</p>
                  </div>

                  {/* Criteria Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                      Evaluation Criteria:
                    </span>
                    <ul className="space-y-1 text-[11px] font-mono text-zinc-300">
                      {badge.criteria.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Cryptographically Authenticated</span>
                  </span>
                  <span>{badge.awardDate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: LOCKED / IN-PROGRESS BADGES */}
      <div className="space-y-4 pt-4 border-t border-white/[0.08]">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
          <Lock className="w-4 h-4" />
          <span>Locked &amp; In-Progress Badges</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lockedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-6 rounded-3xl bg-[#0B0E17]/60 border border-white/[0.06] flex flex-col justify-between space-y-4 relative opacity-75 hover:opacity-100 transition-opacity"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-zinc-500">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono text-zinc-400 border border-white/[0.08]">
                    LOCKED
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-300">{badge.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-1">{badge.description}</p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                    Unlocking Criteria:
                  </span>
                  <ul className="space-y-1 text-[11px] font-mono text-zinc-400">
                    {badge.criteria.map((c, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-zinc-600">○</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-zinc-500 flex items-center justify-between">
                <span>Progress: 80% Complete</span>
                <span className="text-[#22D3EE]">{badge.awardDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
