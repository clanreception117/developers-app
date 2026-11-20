"use client";

import React, { useState } from "react";
import {
  Code2,
  Play,
  Terminal,
  Trophy,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Plus,
  ExternalLink,
  Layers,
  FolderGit2,
  Calendar,
  Briefcase,
  Eye,
} from "lucide-react";
import { DeveloperProfile, Project, Certificate, Achievement, MeritBadge, HiringOpportunity } from "../../types";
import { soundFx } from "../../lib/audioAtmosphere";

interface DeveloperDashboardOverviewProps {
  currentUser: DeveloperProfile;
  projects: Project[];
  certificates: Certificate[];
  achievements: Achievement[];
  badges: MeritBadge[];
  opportunities: HiringOpportunity[];
  onNavigateTab: (tab: any) => void;
  onOpenPreview: (project: Project) => void;
}

export const DeveloperDashboardOverview: React.FC<DeveloperDashboardOverviewProps> = ({
  currentUser,
  projects,
  certificates,
  achievements,
  badges,
  opportunities,
  onNavigateTab,
  onOpenPreview,
}) => {
  const earnedBadges = badges.filter((b) => b.isEarned);
  const recentProjects = projects.slice(0, 3);
  const recentAchievements = achievements.slice(0, 3);
  const matchedOpps = opportunities.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* 1. TOP HERO BANNER: Identity & Quick Metrics */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1C2333] via-[#121827] to-[#0A0D16] border border-white/[0.08] shadow-2xl relative overflow-hidden">
        {/* Ambient lighting */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#3478F6]/15 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[200px] bg-[#8055F5]/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3478F6] via-[#8055F5] to-[#22D3EE] p-[2px] shadow-glow shrink-0">
              <div className="w-full h-full rounded-[14px] bg-[#070910] flex items-center justify-center font-bold text-xl text-white">
                {currentUser.avatarUrl || "AR"}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentUser.fullName}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                  {currentUser.tier} Tier
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/30">
                  {currentUser.stats.globalRank}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A1AAB8] font-mono">
                @{currentUser.username} • {currentUser.specialization}
              </p>
              {currentUser.bio && (
                <p className="text-xs text-zinc-300 max-w-xl leading-relaxed pt-1">
                  {currentUser.bio}
                </p>
              )}
            </div>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                soundFx.playChime(750, "sine", 0.02, 0.08);
                onNavigateTab("code-preview");
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow transition-all flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Sandbox</span>
            </button>
            <button
              onClick={() => {
                soundFx.playChime(700, "sine", 0.02, 0.08);
                onNavigateTab("code-upload");
              }}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Upload Code</span>
            </button>
          </div>
        </div>

        {/* 4 Key Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6 mt-6 border-t border-white/[0.08]">
          <div className="p-3.5 rounded-2xl bg-[#0D111B]/60 border border-white/[0.06]">
            <div className="text-[10px] font-mono text-[#A1AAB8] uppercase">Profile Views</div>
            <div className="text-xl font-bold font-mono text-white mt-1">
              {currentUser.stats.profileViews.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0D111B]/60 border border-white/[0.06]">
            <div className="text-[10px] font-mono text-[#A1AAB8] uppercase">Project Sandbox Runs</div>
            <div className="text-xl font-bold font-mono text-[#22D3EE] mt-1">
              {currentUser.stats.projectViews.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0D111B]/60 border border-white/[0.06]">
            <div className="text-[10px] font-mono text-[#A1AAB8] uppercase">Engagement Rate</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              {currentUser.stats.engagementRate}%
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-[#0D111B]/60 border border-white/[0.06]">
            <div className="text-[10px] font-mono text-[#A1AAB8] uppercase">Marketplace Earnings</div>
            <div className="text-xl font-bold font-mono text-[#F59E0B] mt-1">
              ${currentUser.stats.totalEarnings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 2-COLUMN SECTION: Recent Projects + Badges/Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Projects (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#3478F6]" />
              <h3 className="text-base font-bold text-white">Recent Projects &amp; Repositories</h3>
            </div>
            <button
              onClick={() => onNavigateTab("my-projects")}
              className="text-xs font-mono text-[#22D3EE] hover:underline flex items-center gap-1"
            >
              <span>Manage Projects ({projects.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-[#22D3EE] transition-colors truncate">
                      {project.title}
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.06] text-[#A1AAB8]">
                      v{project.version}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#A1AAB8] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#070910] border border-white/[0.06] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <button
                    onClick={() => {
                      soundFx.playChime(850, "triangle", 0.04, 0.15);
                      onOpenPreview(project);
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#3478F6]/15 hover:bg-[#3478F6]/25 text-[#22D3EE] border border-[#3478F6]/30 transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3" />
                    <span>Run Sandbox</span>
                  </button>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Updated {project.updatedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Badges & Achievements Overview (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Merit Badges Box */}
          <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Earned Merit Badges
                </h4>
              </div>
              <button
                onClick={() => onNavigateTab("badges")}
                className="text-[10px] font-mono text-[#22D3EE] hover:underline"
              >
                View Badges
              </button>
            </div>

            <div className="space-y-2.5">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-3 rounded-xl bg-[#0D111B] border border-white/[0.06] flex items-center gap-3"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      badge.tier === "Gold"
                        ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40"
                        : badge.tier === "Silver"
                        ? "bg-[#94A3B8]/20 text-[#94A3B8] border border-[#94A3B8]/40"
                        : "bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/40"
                    }`}
                  >
                    ★
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">{badge.title}</div>
                    <div className="text-[10px] text-[#A1AAB8] font-mono truncate">
                      Awarded {badge.awardDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Opportunities Match */}
          <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#8055F5]" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Matched Opportunities
                </h4>
              </div>
            </div>

            <div className="space-y-2.5">
              {matchedOpps.map((opp) => (
                <div key={opp.id} className="p-3 rounded-xl bg-[#0D111B] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{opp.orgName}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold shrink-0">
                      {opp.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#A1AAB8] truncate">{opp.title}</div>
                  <div className="text-[10px] font-mono text-zinc-400">{opp.compensation}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
