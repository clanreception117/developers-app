"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Sparkles,
  ArrowRight,
  Terminal,
  RotateCcw,
  Shield,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Layers,
  Menu,
  X,
  LogIn,
  Compass,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";
import { AuthUser } from "../types";
import { EcosystemVisualization } from "./EcosystemVisualization";
import { ScrollyAnimation } from "./ScrollyAnimation";
import { LiveSandbox } from "./LiveSandbox";
import { DeveloperPortfolio } from "./DeveloperPortfolio";
import { AchievementSystem } from "./AchievementSystem";
import { ProjectMarketplace } from "./ProjectMarketplace";
import { RecruitmentEngine } from "./RecruitmentEngine";
import { OpportunityEcosystem } from "./OpportunityEcosystem";
import { AboutModal } from "./AboutModal";
import { ContactModal } from "./ContactModal";
import { HackathonModal } from "./HackathonModal";
import { ProjectModal } from "./ProjectModal";

interface LandingStageProps {
  currentUser: AuthUser | null;
  onNavigateToDashboard: () => void;
  onNavigateToAccountSelection: () => void;
}

export const LandingStage: React.FC<LandingStageProps> = ({
  currentUser,
  onNavigateToDashboard,
  onNavigateToAccountSelection,
}) => {
  // Modal states
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // License and Agreement expandable section
  const [licenseOpen, setLicenseOpen] = useState(false);

  // "Write. Run. Preview." 30-second automated demo cycle
  const [demoStep, setDemoStep] = useState<"typing" | "running" | "preview">("typing");
  const [timerSeconds, setTimerSeconds] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setDemoStep("typing");
          setTimeout(() => setDemoStep("running"), 1400);
          setTimeout(() => setDemoStep("preview"), 2800);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    const t1 = setTimeout(() => setDemoStep("running"), 1600);
    const t2 = setTimeout(() => setDemoStep("preview"), 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#05040B] text-[#F8FAFC] flex flex-col relative selection:bg-[#8B5CF6]/40 selection:text-white">
      {/* Background ambient radial gradients (Reference 1: Nucleus) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-gradient-to-b from-[#8B5CF6]/15 via-[#3B82F6]/10 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] left-1/4 w-[600px] h-[600px] bg-[#A855F7]/8 blur-[160px] pointer-events-none rounded-full" />

      {/* 1. TOP NAVIGATION HEADER (Nucleus-style floating capsule header) */}
      <header className="sticky top-0 z-50 bg-[#05040B]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Branding */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#A855F7] p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <div className="w-full h-full rounded-[14px] bg-[#05040B] flex items-center justify-center text-[#22D3EE]">
                <Code2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  Developers App
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-white/[0.06] text-[#22D3EE] border border-white/[0.08]">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono hidden sm:block">
                Bridging the Gap Between Codes and Developers' Showcase.
              </p>
            </div>
          </div>

          {/* Center: Main Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => {
                soundFx.playChime(600, "sine", 0.02, 0.08);
                setAboutOpen(true);
              }}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.05] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("ecosystem-canvas")}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.05] transition-colors"
            >
              Ecosystem
            </button>
            <button
              onClick={() => scrollToSection("feature-showcases")}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.05] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("opportunity-section")}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.05] transition-colors"
            >
              Opportunities
            </button>
            <button
              onClick={() => {
                soundFx.playChime(600, "sine", 0.02, 0.08);
                setLicenseOpen(!licenseOpen);
                scrollToSection("license-section");
              }}
              className="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.05] transition-colors"
            >
              Resources
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <button
                onClick={() => {
                  soundFx.playChime(950, "triangle", 0.05, 0.2);
                  onNavigateToDashboard();
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all group"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Go to Feed</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    soundFx.playChime(650, "sine", 0.04, 0.1);
                    onNavigateToAccountSelection();
                  }}
                  className="text-xs font-semibold text-zinc-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/[0.05] transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Login</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playChime(850, "triangle", 0.05, 0.2);
                    onNavigateToAccountSelection();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#22D3EE]" />
                </button>
              </>
            )}

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-4 bg-[#0B0915] border-b border-white/[0.08] space-y-2">
            <button
              onClick={() => {
                setAboutOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-xs font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05]"
            >
              About Developers App
            </button>
            <button
              onClick={() => {
                scrollToSection("ecosystem-canvas");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-xs font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05]"
            >
              Central Ecosystem
            </button>
            <button
              onClick={() => {
                scrollToSection("feature-showcases");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-xs font-medium text-zinc-300 hover:text-white rounded-lg hover:bg-white/[0.05]"
            >
              Features & Sandbox
            </button>
            <button
              onClick={() => {
                onNavigateToAccountSelection();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-center"
            >
              Get Started / Login
            </button>
          </div>
        )}
      </header>

      {/* 2. MAIN HERO SECTION (Reference: Image 1 — Nucleus) */}
      <section className="relative w-full pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Small upper badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/30 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE] animate-pulse" />
            <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-purple-200">
              THE DIGITAL ECOSYSTEM FOR DEVELOPERS
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            A Single Platform Built for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#A855F7] to-[#22D3EE]">
              Developers and Organizations
            </span>
          </h1>

          {/* Supporting text */}
          <p className="text-base sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            Build your identity. Showcase real projects. Discover opportunities. Compete, collaborate and turn your skills into a career.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                soundFx.playChime(850, "triangle", 0.05, 0.2);
                onNavigateToAccountSelection();
              }}
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#22D3EE]" />
            </button>

            <button
              onClick={() => {
                soundFx.playChime(600, "sine", 0.03, 0.1);
                scrollToSection("ecosystem-canvas");
              }}
              className="px-6 py-3.5 rounded-full text-sm font-semibold text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-purple-500/40 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Explore the Ecosystem</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE CENTRAL ANIMATED ECOSYSTEM VISUALIZATION (Nucleus Reference) */}
      <EcosystemVisualization
        onSelectAction={() => {
          soundFx.playChime(750, "triangle", 0.04, 0.15);
          onNavigateToAccountSelection();
        }}
      />

      {/* 4. INTERACTIVE FEATURE PREVIEW: "Write. Run. Preview." */}
      <section id="code-preview-demo" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0B0915]/60 border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/30 text-[#22D3EE] text-xs font-mono uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5" />
                Live Engine Demonstration
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Write. Run. Preview.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
                Experience how code is written, automatically processed in isolated containers, and previewed with real-time feedback.
              </p>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <RotateCcw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} />
              <span>Auto-Reset Cycle: {timerSeconds}s</span>
            </div>
          </div>

          {/* Interactive Dual-Pane Demo Canvas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-white/[0.1] bg-[#0A0D18] shadow-2xl overflow-hidden min-h-[420px]">
            {/* Left: Code Editor Demonstration */}
            <div className="lg:col-span-6 p-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-zinc-400">
                      developer_showcase.tsx
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#22D3EE]">
                    {demoStep === "typing" ? "1. WRITING CODE" : demoStep === "running" ? "2. PROCESSING" : "3. COMPILED"}
                  </span>
                </div>

                {/* Animated Code Block */}
                <pre className="font-mono text-xs sm:text-sm text-zinc-300 leading-relaxed overflow-x-auto p-2">
                  <code>{`import { DevelopersApp } from '@developersapp/core';

export default function NeuralCard() {
  return (
    <div className="showcase-card border-glow">
      <h3>Developers App Live Node</h3>
      <p>Bridging Codes to Global Showcase</p>
      <div className="metric">60 FPS • 0ms Cold Start</div>
    </div>
  );
}`}</code>
                </pre>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs text-zinc-500 font-mono">
                <span>Safe Isolated Sandbox Demo</span>
                <span className="text-emerald-400 font-semibold">✓ 0 Arbitrary Server Execution</span>
              </div>
            </div>

            {/* Right: Live Processed Preview */}
            <div className="lg:col-span-6 p-6 flex flex-col justify-between bg-[#05040B]/60">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Interactive Output Preview
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    LIVE RUNTIME
                  </span>
                </div>

                {/* Simulated Render Result */}
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F1426] to-[#0A0D18] border border-[#3B82F6]/30 shadow-[0_0_35px_rgba(59,130,246,0.15)] text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] mx-auto flex items-center justify-center text-white shadow-glow">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Developers App Live Node
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      Bridging Codes to Global Showcase
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>60 FPS • 0ms Cold Start</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-center">
                <span className="text-xs font-mono text-zinc-500">
                  Preview automatically evaluates and refreshes continuously.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 300-FRAME SCROLLYTELLING ANIMATION */}
      <ScrollyAnimation
        onOpenAuth={onNavigateToAccountSelection}
        onExploreClick={() => scrollToSection("feature-showcases")}
      />

      {/* 6. PLATFORM FEATURE SHOWCASE SECTIONS */}
      <section id="feature-showcases" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-32">
        {/* Feature 1: Social Discovery Feed */}
        <div className="space-y-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              1. Developer Social Network
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              A Professional Feed Designed for Builders.
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed">
              Share real-time project updates, code releases, campus hackathons, and career milestones. Engage directly with founders, peer engineers, and technical talent leaders.
            </p>
          </div>
        </div>

        {/* Feature 2: Developer Profiles & Portfolios */}
        <DeveloperPortfolio />

        {/* Feature 3: Code & Application Preview (Live Sandbox) */}
        <LiveSandbox />

        {/* Feature 4: Achievements & Badges */}
        <AchievementSystem />

        {/* Feature 5: Project Marketplace */}
        <ProjectMarketplace onInspectProduct={(prod) => setSelectedProduct(prod)} />

        {/* Feature 6: Recruitment & Hiring */}
        <RecruitmentEngine />

        {/* Feature 7 & 8: Hackathons, Opportunities, SME Business Hub */}
        <div id="opportunity-section">
          <OpportunityEcosystem onRegisterHackathon={(hack) => setSelectedHackathon(hack)} />
        </div>
      </section>

      {/* 7. LICENSE & AGREEMENT DROPDOWN SECTION */}
      <section id="license-section" className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0B0915]/80 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto space-y-4">
          <button
            onClick={() => {
              soundFx.playChime(600, "sine", 0.03, 0.1);
              setLicenseOpen(!licenseOpen);
            }}
            className="w-full p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#22D3EE]" />
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  License, Platform Agreement &amp; Terms of Service
                </h4>
                <p className="text-xs text-zinc-400">
                  Developers App IP Protection, Sandbox Guidelines, and Merit Validation Principles
                </p>
              </div>
            </div>
            {licenseOpen ? <ChevronUp className="w-5 h-5 text-zinc-400" /> : <ChevronDown className="w-5 h-5 text-zinc-400" />}
          </button>

          {licenseOpen && (
            <div className="p-6 rounded-2xl bg-[#0A0D18] border border-white/[0.08] space-y-4 text-xs text-zinc-300 leading-relaxed animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="font-bold text-white font-mono uppercase">1. Developer Intellectual Property</span>
                <p className="text-zinc-400">
                  Developers retain 100% ownership of source code uploaded to Developers App. Sandbox previews are rendered in isolated containers solely for demonstration and verification purposes.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-white font-mono uppercase">2. Sandbox Execution Policy</span>
                <p className="text-zinc-400">
                  Code submitted to Developers App Live Sandbox must strictly adhere to compute resource limits. Crypto-mining, network scans, and unauthorized exfiltration are prohibited and automatically terminated.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-white font-mono uppercase">3. Merit Badging Transparency</span>
                <p className="text-zinc-400">
                  Gold, Silver, and Bronze badges are calculated algorithmically based on verifiable project deliverables, hackathon placements, and sandbox testing benchmarks.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. FINAL CTA (Section 3F: "Your Next Chapter Starts Here.") */}
      <section className="relative w-full py-28 px-4 sm:px-6 lg:px-8 text-center bg-[#05040B] border-t border-white/[0.08] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#3B82F6]/20 via-[#8B5CF6]/20 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-purple-500/30 text-xs font-mono text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span>THE NEXT GENERATION PLATFORM</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your Next Chapter <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#A855F7] to-[#22D3EE]">
              Starts Here.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto">
            Join a growing ecosystem where your work speaks louder than your resume.
          </p>

          <div className="pt-4 flex flex-col items-center gap-4">
            <button
              onClick={() => {
                soundFx.playChime(1000, "triangle", 0.08, 0.3);
                onNavigateToAccountSelection();
              }}
              className="px-10 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-[#3B82F6] via-[#6366F1] to-[#8B5CF6] shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:shadow-[0_0_75px_rgba(139,92,246,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 group cursor-pointer"
            >
              <span>Join Developers App</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#22D3EE]" />
            </button>

            <span className="text-xs font-mono text-zinc-500">
              No credit card required • Instant access to developer sandbox &amp; feed
            </span>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="w-full bg-[#05040B] border-t border-white/[0.08] py-8 px-6 text-center text-xs text-zinc-500 font-mono">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-3">
          <button onClick={() => setAboutOpen(true)} className="hover:text-white transition-colors">
            About Us
          </button>
          <button onClick={() => setContactOpen(true)} className="hover:text-white transition-colors">
            Contact
          </button>
          <button onClick={() => setLicenseOpen(true)} className="hover:text-white transition-colors">
            Terms &amp; License
          </button>
          <button onClick={() => setLicenseOpen(true)} className="hover:text-white transition-colors">
            Privacy Policy
          </button>
        </div>
        <div>
          © 2026 Developers App Inc. All rights reserved. • "Bridging the Gap Between Codes and Developers' Showcase."
        </div>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <HackathonModal hackathon={selectedHackathon} onClose={() => setSelectedHackathon(null)} />
      <ProjectModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};
