"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Building,
  Store,
  Trophy,
  Users,
  Calendar,
  ArrowRight,
  Sparkles,
  ExternalLink,
  DollarSign,
  Globe,
  Award,
  CheckCircle,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface HackathonEvent {
  id: string;
  title: string;
  colleges: string;
  prizePool: string;
  deadline: string;
  teamsRegistered: number;
  tags: string[];
  status: "REGISTRATION OPEN" | "FINALS LIVE";
}

const HACKATHONS: HackathonEvent[] = [
  {
    id: "hack-1",
    title: "Inter-Varsity Autonomous AI Grand Prix 2026",
    colleges: "Stanford • MIT • IIT Delhi • Cambridge • NUS",
    prizePool: "$75,000",
    deadline: "Dec 15, 2026",
    teamsRegistered: 640,
    tags: ["Autonomous Agents", "Robotics", "Multimodal"],
    status: "REGISTRATION OPEN",
  },
  {
    id: "hack-2",
    title: "Global FinTech & Zero-Knowledge Sprint",
    colleges: "UC Berkeley • ETH Zurich • Oxford • Toronto",
    prizePool: "$50,000",
    deadline: "Jan 10, 2027",
    teamsRegistered: 480,
    tags: ["ZK-Rollups", "High-Load FinTech", "Rust"],
    status: "REGISTRATION OPEN",
  },
  {
    id: "hack-3",
    title: "Next-Gen WebGL Creative Horizons",
    colleges: "Pratt • Tokyo University • TU Munich • Columbia",
    prizePool: "$35,000",
    deadline: "Nov 30, 2026",
    teamsRegistered: 310,
    tags: ["WebGL", "Three.js", "Generative Art"],
    status: "FINALS LIVE",
  },
];

interface OpportunityEcosystemProps {
  onRegisterHackathon: (hackathon: HackathonEvent) => void;
}

export const OpportunityEcosystem: React.FC<OpportunityEcosystemProps> = ({
  onRegisterHackathon,
}) => {
  const [activeCategory, setActiveCategory] = useState<"colleges" | "companies" | "smes">("colleges");

  return (
    <div id="hackathons-arena" className="w-full space-y-12">
      {/* Section Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#287BFF]/15 to-[#8755FF]/15 border border-[#287BFF]/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#00D6FF]" />
          <span className="text-xs font-semibold tracking-wider uppercase text-[#00D6FF]">
            Multi-Institutional Network
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
          An Ecosystem Beyond Coding. <br />
          <span className="text-gradient-accent">
            Connecting Institutions, Industry &amp; Innovation.
          </span>
        </h2>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
          Developers App is much more than a developer social feed. It bridges multi-college hackathons, corporate recruitment, and local business digital transformation under one unified digital canopy.
        </p>
      </div>

      {/* Three Pillars Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Colleges & Hackathons */}
        <button
          onClick={() => {
            soundFx.playChime(600, "triangle", 0.04, 0.12);
            setActiveCategory("colleges");
          }}
          className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden ${
            activeCategory === "colleges"
              ? "bg-[#0A0C12] border-[#287BFF] shadow-[0_0_35px_rgba(40,123,255,0.25)]"
              : "bg-[#07090E]/60 border-white/[0.08] hover:bg-[#0A0C12]/80"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#287BFF]/15 border border-[#287BFF]/30 flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6 text-[#287BFF]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Colleges &amp; Hackathons</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Multi-university competition arena, verified campus leaderboards, student team incubators, and $160K+ in annual prize grants.
          </p>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#287BFF] font-mono">
            <span>50+ Universities</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Pillar 2: Companies & Recruiters */}
        <button
          onClick={() => {
            soundFx.playChime(750, "triangle", 0.04, 0.12);
            setActiveCategory("companies");
          }}
          className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden ${
            activeCategory === "companies"
              ? "bg-[#0A0C12] border-[#8755FF] shadow-[0_0_35px_rgba(135,85,255,0.25)]"
              : "bg-[#07090E]/60 border-white/[0.08] hover:bg-[#0A0C12]/80"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#8755FF]/15 border border-[#8755FF]/30 flex items-center justify-center mb-4">
            <Building className="w-6 h-6 text-[#8755FF]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Companies &amp; Recruiters</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Project-based talent discovery, verified technical benchmarks, direct interview pipeline, and private corporate hackathon challenges.
          </p>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#8755FF] font-mono">
            <span>200+ Enterprise Teams</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        {/* Pillar 3: Small Businesses & Sponsors */}
        <button
          onClick={() => {
            soundFx.playChime(900, "triangle", 0.04, 0.12);
            setActiveCategory("smes");
          }}
          className={`p-6 rounded-3xl border text-left transition-all duration-300 relative overflow-hidden ${
            activeCategory === "smes"
              ? "bg-[#0A0C12] border-[#00D6FF] shadow-[0_0_35px_rgba(0,214,255,0.25)]"
              : "bg-[#07090E]/60 border-white/[0.08] hover:bg-[#0A0C12]/80"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-[#00D6FF]/15 border border-[#00D6FF]/30 flex items-center justify-center mb-4">
            <Store className="w-6 h-6 text-[#00D6FF]" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">SMEs &amp; Sponsors</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Small business digital transformation requests, vetted student developer hiring contracts, and institutional grant sponsorship.
          </p>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#00D6FF] font-mono">
            <span>$4.2M Contracts Awarded</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      {/* Dynamic Content Panel Based on Active Pillar */}
      <div className="rounded-3xl border border-white/[0.1] bg-[#0A0C12]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-glass">
        {activeCategory === "colleges" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#C9A44C]" />
                  Active Multi-College Hackathon Arena
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Global inter-collegiate competition rounds with verified credential awards and corporate talent scouts.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 self-start sm:self-auto">
                3 GRAND SESSIONS LIVE
              </span>
            </div>

            <div className="space-y-4">
              {HACKATHONS.map((hack) => (
                <div
                  key={hack.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#287BFF]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#287BFF]/20 text-[#287BFF]">
                        {hack.prizePool} PRIZE POOL
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        Deadline: {hack.deadline}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-[#00D6FF] transition-colors">
                      {hack.title}
                    </h4>

                    <p className="text-xs text-zinc-400 font-mono">
                      Partner Campuses: {hack.colleges}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {hack.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between gap-3 shrink-0">
                    <div className="text-xs font-mono text-zinc-400">
                      <span className="text-white font-bold">{hack.teamsRegistered}</span> Teams Registered
                    </div>
                    <button
                      onClick={() => onRegisterHackathon(hack)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all flex items-center justify-center gap-2"
                    >
                      Enter Competition
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeCategory === "companies" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-[#8755FF]" />
                Enterprise Recruitment &amp; Challenge Sponsorship
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Access the top 1% of student and professional engineers through project-first evaluation pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="text-base font-bold text-white">Direct Project Sourcing</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Search developers by specific software dependencies, sandbox executions, and verified git commit velocity.
                </p>
                <div className="text-xs text-[#8755FF] font-semibold pt-2">85% Faster Placement</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="text-base font-bold text-white">Custom Hackathon Tracks</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Sponsor enterprise challenge tracks to have 1,000+ top engineering students build prototypes on your SDK or API.
                </p>
                <div className="text-xs text-[#00D6FF] font-semibold pt-2">Guaranteed IP &amp; Prototypes</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                <div className="text-base font-bold text-white">Vetted Senior Mentorship</div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Connect staff engineers with aspiring prodigies through structured hackathon judging and tier-based badges.
                </p>
                <div className="text-xs text-[#C9A44C] font-semibold pt-2">Zero Recruitment Agency Markup</div>
              </div>
            </div>
          </div>
        )}

        {activeCategory === "smes" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="pb-4 border-b border-white/[0.08]">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Store className="w-5 h-5 text-[#00D6FF]" />
                Small Business Digital Transformation Hub
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Connecting local businesses, retail stores, and service companies directly with vetted developer teams for affordable, high-quality digital solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <h4 className="text-base font-bold text-white">
                  Post a Transformation Request
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Need an e-commerce platform, inventory dashboard, booking system, or custom mobile application? Developers App pairs your business with top collegiate engineering teams.
                </p>
                <button
                  onClick={() => soundFx.playChime(750, "sine", 0.04, 0.1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.1] transition-colors"
                >
                  Submit Business RFP
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                <h4 className="text-base font-bold text-white">
                  Escrow-Protected Milestones
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Funds remain securely locked until working application code passes Developers App’s automated sandbox validation and client review tests.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                  <CheckCircle className="w-4 h-4" />
                  100% Satisfaction &amp; Quality Guarantee
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
