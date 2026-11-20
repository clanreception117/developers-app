"use client";

import React, { useState } from "react";
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Users,
  ChevronRight,
  Sliders,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

type Tier = "gold" | "silver" | "bronze";

interface LeaderboardUser {
  rank: number;
  name: string;
  handle: string;
  score: number;
  projectsCount: number;
  commitsCount: number;
  tier: Tier;
  recentAchievement: string;
}

const LEADERBOARD_DATA: Record<Tier, LeaderboardUser[]> = {
  gold: [
    {
      rank: 1,
      name: "Marcus Vance",
      handle: "@mvance.ai",
      score: 9840,
      projectsCount: 14,
      commitsCount: 3420,
      tier: "gold",
      recentAchievement: "Global Hackathon Grand Champion",
    },
    {
      rank: 2,
      name: "Elena Rostova",
      handle: "@erostova",
      score: 9610,
      projectsCount: 19,
      commitsCount: 2980,
      tier: "gold",
      recentAchievement: "Distributed Kernel Architecture Award",
    },
    {
      rank: 3,
      name: "Siddharth Rao",
      handle: "@siddharth.r",
      score: 9480,
      projectsCount: 12,
      commitsCount: 3110,
      tier: "gold",
      recentAchievement: "Top Marketplace Seller ($42K Volume)",
    },
    {
      rank: 4,
      name: "Chloe Dupont",
      handle: "@cdupont",
      score: 9230,
      projectsCount: 11,
      commitsCount: 2850,
      tier: "gold",
      recentAchievement: "Verified Compiler Optimization",
    },
  ],
  silver: [
    {
      rank: 1,
      name: "Kenji Sato",
      handle: "@ksato",
      score: 6890,
      projectsCount: 8,
      commitsCount: 1840,
      tier: "silver",
      recentAchievement: "University Hackathon 1st Runner Up",
    },
    {
      rank: 2,
      name: "Sophia Martinez",
      handle: "@smartinez",
      score: 6520,
      projectsCount: 7,
      commitsCount: 1670,
      tier: "silver",
      recentAchievement: "Web3 Smart Contract Security Pass",
    },
    {
      rank: 3,
      name: "Devon Clark",
      handle: "@dclark",
      score: 6310,
      projectsCount: 9,
      commitsCount: 1540,
      tier: "silver",
      recentAchievement: "Open Source UI Framework Lead",
    },
  ],
  bronze: [
    {
      rank: 1,
      name: "Liam O'Connor",
      handle: "@liamoc",
      score: 3450,
      projectsCount: 4,
      commitsCount: 820,
      tier: "bronze",
      recentAchievement: "Completed First 3 Runnable Apps",
    },
    {
      rank: 2,
      name: "Amina Al-Mansoor",
      handle: "@amina.dev",
      score: 3180,
      projectsCount: 3,
      commitsCount: 740,
      tier: "bronze",
      recentAchievement: "Published Verified Portfolio",
    },
    {
      rank: 3,
      name: "Lucas Bennett",
      handle: "@lbennett",
      score: 2950,
      projectsCount: 4,
      commitsCount: 650,
      tier: "bronze",
      recentAchievement: "Hackathon Qualifier Participant",
    },
  ],
};

const TIER_DETAILS = {
  gold: {
    color: "#C9A44C",
    title: "Gold Tier",
    badge: "Premium Merit Tier",
    range: "9,000+ Score",
    perks: [
      "Priority spotlight on Recruiter Talent Engine",
      "Zero commission fee on Marketplace sales (0%)",
      "Direct invitations to Closed Enterprise Hackathons",
      "Verified Gold Badging across all projects & feeds",
    ],
  },
  silver: {
    color: "#AEB7C2",
    title: "Silver Tier",
    badge: "Intermediate Merit Tier",
    range: "5,000 – 8,999 Score",
    perks: [
      "Enhanced placement in Developer Discovery Feed",
      "50% reduced marketplace transaction fees",
      "Direct entry into Multi-College Finals",
      "Automated skill validation badges",
    ],
  },
  bronze: {
    color: "#B8794B",
    title: "Bronze Tier",
    badge: "Entry Merit Tier",
    range: "1,000 – 4,999 Score",
    perks: [
      "Full access to Live Code Sandbox runtime",
      "Unlimited project uploads & portfolio hosting",
      "Eligible for University Hackathon open rounds",
      "Peer review & feedback community access",
    ],
  },
};

export const AchievementSystem: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<Tier>("gold");

  // Interactive Merit Calculator state
  const [projectsBuilt, setProjectsBuilt] = useState(8);
  const [hackathonWins, setHackathonWins] = useState(2);
  const [weeklyCommits, setWeeklyCommits] = useState(45);

  // Dynamic score calculation
  const calculatedScore = projectsBuilt * 650 + hackathonWins * 1800 + weeklyCommits * 35;
  const predictedTier: Tier =
    calculatedScore >= 9000 ? "gold" : calculatedScore >= 5000 ? "silver" : "bronze";

  return (
    <div id="achievement-section" className="w-full">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A44C]/10 border border-[#C9A44C]/30 text-[#C9A44C] text-xs font-semibold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Tier-Based Merit Competition
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
            Compete. Improve. Rise. <br />
            <span className="text-gradient-accent">Fair, Tier-Restricted Progression.</span>
          </h3>
          <p className="text-zinc-400 text-base leading-relaxed">
            Earn Bronze, Silver, and Gold badges strictly through verifiable project performance, engagement analytics, and hackathon milestones. Developers compete fairly against peers in matching tiers.
          </p>
        </div>

        {/* Tier Tabs (Bronze, Silver, Gold) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["bronze", "silver", "gold"] as Tier[]).map((tierKey) => {
            const info = TIER_DETAILS[tierKey];
            const isSelected = selectedTier === tierKey;
            return (
              <button
                key={tierKey}
                onClick={() => {
                  soundFx.playChime(tierKey === "gold" ? 950 : tierKey === "silver" ? 750 : 550, "triangle", 0.04, 0.15);
                  setSelectedTier(tierKey);
                }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? "bg-[#0A0C12] shadow-2xl"
                    : "bg-[#07090E]/60 hover:bg-[#0A0C12]/80"
                }`}
                style={{
                  borderColor: isSelected ? info.color : "rgba(255, 255, 255, 0.08)",
                  boxShadow: isSelected ? `0 0 35px -5px ${info.color}35` : "none",
                }}
              >
                {/* Metallic Accent Top Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                  style={{
                    backgroundColor: info.color,
                    opacity: isSelected ? 1 : 0.3,
                  }}
                />

                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{
                      borderColor: `${info.color}50`,
                      backgroundColor: `${info.color}15`,
                    }}
                  >
                    <Award className="w-6 h-6" style={{ color: info.color }} />
                  </div>
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase"
                    style={{
                      color: info.color,
                      backgroundColor: `${info.color}15`,
                      border: `1px solid ${info.color}30`,
                    }}
                  >
                    {info.range}
                  </span>
                </div>

                <h4 className="text-xl font-bold text-white mb-1">{info.title}</h4>
                <p className="text-xs text-zinc-400 mb-4">{info.badge}</p>

                <ul className="space-y-2 text-xs text-zinc-300">
                  {info.perks.slice(0, 3).map((perk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: info.color }} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Two-Column: Live Tier Leaderboard & Interactive Merit Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Live Tier Leaderboard */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#0A0C12] p-6 shadow-glass">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#00D6FF]" />
                <h4 className="text-base font-semibold text-white">
                  Active Tier Leaderboard ({TIER_DETAILS[selectedTier].title})
                </h4>
              </div>
              <span className="text-xs text-zinc-500 font-mono">
                Updated every 60s based on sandbox &amp; repo activity
              </span>
            </div>

            <div className="space-y-3">
              {LEADERBOARD_DATA[selectedTier].map((user) => (
                <div
                  key={user.handle}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shrink-0"
                      style={{
                        backgroundColor:
                          user.rank === 1
                            ? `${TIER_DETAILS[selectedTier].color}30`
                            : "rgba(255, 255, 255, 0.05)",
                        color:
                          user.rank === 1 ? TIER_DETAILS[selectedTier].color : "#ffffff",
                      }}
                    >
                      #{user.rank}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        {user.name}
                        <span className="text-xs font-mono text-zinc-500">{user.handle}</span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5">
                        {user.recentAchievement}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className="text-base font-mono font-bold"
                      style={{ color: TIER_DETAILS[selectedTier].color }}
                    >
                      {user.score.toLocaleString()} pts
                    </div>
                    <div className="text-[11px] text-zinc-500 font-mono">
                      {user.projectsCount} projects • {user.commitsCount} commits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Merit Score Calculator */}
          <div className="lg:col-span-5 rounded-2xl border border-white/[0.08] bg-[#0A0C12] p-6 shadow-glass space-y-6">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#8755FF]" />
              <h4 className="text-base font-semibold text-white">
                Interactive Merit Tier Simulator
              </h4>
            </div>

            <p className="text-xs text-zinc-400">
              Adjust your engineering deliverables to simulate your verified Developers App merit rating and badge tier eligibility.
            </p>

            <div className="space-y-4">
              {/* Slider 1: Projects Built */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Runnable Applications</span>
                  <span className="text-white font-bold">{projectsBuilt} Apps</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={projectsBuilt}
                  onChange={(e) => setProjectsBuilt(Number(e.target.value))}
                  className="w-full accent-[#287BFF]"
                />
              </div>

              {/* Slider 2: Hackathon Placements */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Hackathon Top-3 Placements</span>
                  <span className="text-white font-bold">{hackathonWins} Wins</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={hackathonWins}
                  onChange={(e) => setHackathonWins(Number(e.target.value))}
                  className="w-full accent-[#8755FF]"
                />
              </div>

              {/* Slider 3: Weekly Commits */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">Weekly Verified Commits</span>
                  <span className="text-white font-bold">{weeklyCommits} Commits/wk</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={weeklyCommits}
                  onChange={(e) => setWeeklyCommits(Number(e.target.value))}
                  className="w-full accent-[#00D6FF]"
                />
              </div>
            </div>

            {/* Calculated Result Card */}
            <div
              className="p-5 rounded-xl border text-center space-y-2 transition-all duration-300"
              style={{
                backgroundColor: `${TIER_DETAILS[predictedTier].color}10`,
                borderColor: `${TIER_DETAILS[predictedTier].color}40`,
              }}
            >
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Predicted Merit Rating
              </div>
              <div
                className="text-3xl font-extrabold font-mono"
                style={{ color: TIER_DETAILS[predictedTier].color }}
              >
                {calculatedScore.toLocaleString()} PTS
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase"
                style={{
                  backgroundColor: `${TIER_DETAILS[predictedTier].color}25`,
                  color: TIER_DETAILS[predictedTier].color,
                }}
              >
                <Award className="w-3.5 h-3.5" />
                {TIER_DETAILS[predictedTier].title} Unlocked
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
