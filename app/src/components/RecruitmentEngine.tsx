"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Building2,
  ExternalLink,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface Candidate {
  id: string;
  name: string;
  title: string;
  tier: "Gold" | "Silver";
  location: string;
  availability: "Immediate" | "2 Weeks" | "Contract Only";
  topProject: string;
  skills: string[];
  hourlyRate: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: "c-1",
    name: "Alex Rivers",
    title: "Principal AI Systems Architect",
    tier: "Gold",
    location: "San Francisco, CA (Remote)",
    availability: "Immediate",
    topProject: "Distributed Vector Graph Pipeline",
    skills: ["Next.js", "Rust", "PyTorch", "WebGL"],
    hourlyRate: "$140/hr",
  },
  {
    id: "c-2",
    name: "Elena Rostova",
    title: "Senior Full-Stack & Smart Contract Engineer",
    tier: "Gold",
    location: "Berlin, DE (Remote)",
    availability: "2 Weeks",
    topProject: "ZK-Rollup Settlement Architecture",
    skills: ["Solidity", "TypeScript", "Node.js", "Docker"],
    hourlyRate: "$125/hr",
  },
  {
    id: "c-3",
    name: "Kenji Sato",
    title: "Cloud Infrastructure & High-Load Go Developer",
    tier: "Silver",
    location: "Tokyo, JP (Remote)",
    availability: "Immediate",
    topProject: "Real-time Telemetry Service (1M req/s)",
    skills: ["Go", "Kubernetes", "Prometheus", "Kafka"],
    hourlyRate: "$110/hr",
  },
];

const HIRING_PARTNERS = [
  { name: "Vercel Ecosystem", roles: "12 Open Roles", logo: "▲" },
  { name: "Supabase Foundry", roles: "8 Open Roles", logo: "⚡" },
  { name: "Anthropic Labs", roles: "5 Research Roles", logo: "✱" },
  { name: "Stripe Infrastructure", roles: "14 Core Roles", logo: "S" },
];

export const RecruitmentEngine: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [interviewBooked, setInterviewBooked] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredCandidates = CANDIDATES.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Gold") return matchesSearch && c.tier === "Gold";
    if (activeFilter === "Immediate") return matchesSearch && c.availability === "Immediate";
    return matchesSearch;
  });

  const handleBookInterview = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    soundFx.playChime(750, "sine", 0.04, 0.15);
  };

  const confirmInterview = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(950, "triangle", 0.05, 0.2);
    setInterviewBooked(true);
    setTimeout(() => {
      setInterviewBooked(false);
      setSelectedCandidate(null);
    }, 2200);
  };

  return (
    <div id="recruitment-engine" className="w-full">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#287BFF]/10 border border-[#287BFF]/30 text-[#287BFF] text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5" />
              Direct Project-Based Recruitment
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Get Hired Through What You Build. <br />
              <span className="text-gradient-accent">Companies Hire Proven Code.</span>
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed">
              Skip traditional algorithmic whiteboard interviews. Enterprise teams discover engineers through live sandbox prototypes, verified commit history, and peer-reviewed code quality.
            </p>
          </div>

          {/* Hiring Partners Bar */}
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-4">
            <Building2 className="w-5 h-5 text-[#8755FF] shrink-0" />
            <div className="text-xs">
              <span className="text-zinc-200 font-medium">Hiring Partners:</span>
              <div className="flex items-center gap-3 text-zinc-400 font-mono mt-0.5">
                <span>Vercel</span> • <span>Supabase</span> • <span>Stripe</span> • <span>Anthropic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-[#0A0C12] border border-white/[0.08] shadow-glass flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by skill, name, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#287BFF]"
            />
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto">
            {["All", "Gold", "Immediate"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  soundFx.playChime(600, "sine", 0.02, 0.08);
                  setActiveFilter(filter);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeFilter === filter
                    ? "bg-[#287BFF] text-white"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white"
                }`}
              >
                {filter === "Immediate" ? "Immediate Availability" : `${filter} Tier`}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="p-6 rounded-3xl border border-white/[0.08] bg-[#0A0C12]/90 backdrop-blur-xl hover:border-[#8755FF]/40 transition-all duration-300 shadow-glass flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#287BFF]/20 to-[#8755FF]/20 border border-white/[0.1] flex items-center justify-center font-bold text-white text-sm">
                      {candidate.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                        {candidate.name}
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00D6FF]" />
                      </h4>
                      <p className="text-xs text-zinc-400">{candidate.title}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      candidate.tier === "Gold"
                        ? "bg-[#C9A44C]/20 text-[#C9A44C] border border-[#C9A44C]/40"
                        : "bg-[#AEB7C2]/20 text-[#AEB7C2] border border-[#AEB7C2]/40"
                    }`}
                  >
                    {candidate.tier}
                  </span>
                </div>

                {/* Location & Availability */}
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    {candidate.location}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-mono">{candidate.availability}</span>
                </div>

                {/* Top Project Highlight */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Verified Signature Project
                  </span>
                  <span className="text-xs font-semibold text-white group-hover:text-[#00D6FF] transition-colors">
                    {candidate.topProject}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-300 font-bold">
                  {candidate.hourlyRate}
                </span>

                <button
                  onClick={() => handleBookInterview(candidate)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Request Interview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interview Request Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-white/[0.12] bg-[#0A0C12] p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              ✕
            </button>

            {interviewBooked ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Interview Dispatched!</h4>
                <p className="text-xs text-zinc-400">
                  Notification and calendar invite routed directly to {selectedCandidate.name}’s Developers App dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={confirmInterview} className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">
                    Request Technical Interview
                  </h4>
                  <p className="text-xs text-zinc-400">
                    Connecting with <span className="text-white font-medium">{selectedCandidate.name}</span> ({selectedCandidate.title})
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme AI Systems"
                      className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">Proposed Role / Project</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lead Core Architecture"
                      className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-mono">Initial Discussion Note</label>
                    <textarea
                      rows={3}
                      placeholder="We were impressed by your live sandbox project..."
                      className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF] resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all"
                >
                  Send Interview Invite
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
