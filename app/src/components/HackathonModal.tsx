"use client";

import React, { useState } from "react";
import { X, Trophy, CheckCircle, GraduationCap, Users } from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface HackathonEvent {
  id: string;
  title: string;
  colleges: string;
  prizePool: string;
  deadline: string;
  teamsRegistered: number;
  tags: string[];
}

interface HackathonModalProps {
  hackathon: HackathonEvent | null;
  onClose: () => void;
}

export const HackathonModal: React.FC<HackathonModalProps> = ({ hackathon, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [university, setUniversity] = useState("Stanford University");
  const [track, setTrack] = useState("Autonomous AI Agents");
  const [confirmed, setConfirmed] = useState(false);

  if (!hackathon) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(950, "triangle", 0.05, 0.2);
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-white/[0.12] bg-[#0A0C12] p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Team Registered!</h3>
            <p className="text-xs text-zinc-400">
              Your squad <span className="text-white font-medium">"{teamName}"</span> is officially confirmed for <span className="text-[#00D6FF]">{hackathon.title}</span>.
            </p>
            <div className="pt-2 text-xs font-mono text-zinc-500">
              Sandbox execution environment generated.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A44C]/15 border border-[#C9A44C]/30 text-[11px] font-mono text-[#C9A44C]">
                <Trophy className="w-3.5 h-3.5" />
                <span>{hackathon.prizePool} PRIZE ARENA</span>
              </div>
              <h3 className="text-xl font-bold text-white pt-1">
                Register for Hackathon
              </h3>
              <p className="text-xs text-zinc-400">{hackathon.title}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-mono">Team Name</label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Neural Pioneers"
                  className="w-full p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-mono">University / Institution</label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#0F1420] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
                >
                  <option value="Stanford University">Stanford University</option>
                  <option value="MIT">Massachusetts Institute of Technology (MIT)</option>
                  <option value="IIT Delhi">Indian Institute of Technology (IIT Delhi)</option>
                  <option value="UC Berkeley">University of California, Berkeley</option>
                  <option value="Oxford">University of Oxford</option>
                  <option value="Independent Developer">Independent / Industry Team</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-mono">Competition Track</label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#0F1420] border border-white/[0.08] text-white focus:outline-none focus:border-[#287BFF]"
                >
                  <option value="Autonomous AI Agents">Autonomous AI Agents Track</option>
                  <option value="Zero-Knowledge Infrastructure">Zero-Knowledge &amp; FinTech Track</option>
                  <option value="Creative WebGL 3D">Creative WebGL 3D Experiences</option>
                  <option value="Distributed Microservices">Distributed Systems &amp; Low-Latency</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all"
            >
              Confirm Team Registration
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
