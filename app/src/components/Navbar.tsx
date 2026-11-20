"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Sparkles,
  Menu,
  X,
  Volume2,
  VolumeX,
  ArrowRight,
  Globe2,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface NavbarProps {
  onOpenAuth: (mode: "login" | "signup") => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, activeSection = "overview" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const enabled = soundFx.toggle();
    setSoundEnabled(enabled);
  };

  const navLinks = [
    { label: "Overview", href: "#overview", id: "overview" },
    { label: "Explore", href: "#scrolly-story", id: "explore" },
    { label: "Projects", href: "#projects-showcase", id: "projects" },
    { label: "Developers", href: "#developers-portfolio", id: "developers" },
    { label: "Marketplace", href: "#marketplace", id: "marketplace" },
    { label: "Hackathons", href: "#hackathons-arena", id: "hackathons" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    soundFx.playChime(640, "sine", 0.03, 0.1);
    setMobileMenuOpen(false);

    if (href.startsWith("#")) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050608]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Brand Logo */}
            <a
              href="#overview"
              onClick={(e) => handleLinkClick(e, "#overview")}
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#287BFF]/20 via-[#8755FF]/20 to-transparent border border-white/[0.12] group-hover:border-[#287BFF]/60 transition-all duration-300 shadow-[0_0_20px_rgba(40,123,255,0.2)]">
                <Code2 className="w-5 h-5 text-[#00D6FF] transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-xl bg-[#287BFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg tracking-tight text-white group-hover:text-white transition-colors">
                    Developers App
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-gradient-to-r from-[#287BFF]/20 to-[#8755FF]/20 text-[#00D6FF] border border-[#287BFF]/30">
                    2.0
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider -mt-0.5">
                  DIGITAL ECOSYSTEM
                </span>
              </div>
            </a>

            {/* Center: Apple-style Minimal Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-white bg-white/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
                        : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gradient-to-r from-[#287BFF] to-[#00D6FF] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Audio Atmosphere, Status, Login & CTA */}
            <div className="flex items-center gap-3">
              {/* Sound atmosphere toggle */}
              <button
                onClick={toggleSound}
                title={soundEnabled ? "Mute Cyber Atmosphere" : "Enable Cyber Atmosphere"}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.08] hover:text-white hover:border-[#287BFF]/40 transition-all duration-200"
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#00D6FF] animate-pulse" />
                    <span className="text-[11px] text-[#00D6FF]">AUDIO ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                    <span className="text-[11px]">AUDIO</span>
                  </>
                )}
              </button>

              {/* Status Indicator */}
              <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-mono text-zinc-400">ECOSYSTEM LIVE</span>
              </div>

              {/* Log In Button */}
              <button
                onClick={() => {
                  soundFx.playChime(700, "sine", 0.04, 0.15);
                  onOpenAuth("login");
                }}
                className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-colors"
              >
                Log In
              </button>

              {/* Get Started Button */}
              <button
                onClick={() => {
                  soundFx.playChime(880, "sine", 0.05, 0.2);
                  onOpenAuth("signup");
                }}
                className="relative inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-[#287BFF] via-[#5B63F6] to-[#8755FF] hover:from-[#3a89ff] hover:to-[#9b6eff] shadow-[0_0_20px_rgba(40,123,255,0.4)] transition-all duration-300 group overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  Get Started
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] border border-white/[0.08]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 bg-[#050608]/95 backdrop-blur-2xl border-b border-white/[0.1] space-y-2 animate-in fade-in duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-2.5 rounded-xl text-base font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
              <button
                onClick={toggleSound}
                className="flex items-center justify-between px-4 py-2 rounded-xl text-sm font-mono text-zinc-400 bg-white/[0.03] border border-white/[0.08]"
              >
                <span className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#287BFF]" />
                  Atmosphere Sound: {soundEnabled ? "Enabled" : "Disabled"}
                </span>
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-[#00D6FF]" />
                ) : (
                  <VolumeX className="w-4 h-4 text-zinc-500" />
                )}
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("login");
                  }}
                  className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-white/[0.05] border border-white/[0.1]"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("signup");
                  }}
                  className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] shadow-glow"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
