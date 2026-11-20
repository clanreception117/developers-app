"use client";

import React from "react";
import { Code2, Globe, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050608] border-t border-white/[0.08] text-zinc-400 text-xs py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#287BFF] to-[#8755FF] text-white">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight">Developers App</span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono bg-white/[0.06] text-zinc-300 rounded border border-white/[0.1]">
                ECOSYSTEM
              </span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed">
              The premier digital ecosystem for developers. Combining interactive portfolios, live sandbox execution, project marketplace, and multi-college hackathons into one unified experience.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                aria-label="X / Twitter"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <div className="text-white font-semibold tracking-wider uppercase text-[11px] font-mono">
              Ecosystem
            </div>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#scrolly-story" className="hover:text-white transition-colors">Breakout Experience</a></li>
              <li><a href="#sandbox-section" className="hover:text-white transition-colors">Live Sandbox Runtime</a></li>
              <li><a href="#developers-portfolio" className="hover:text-white transition-colors">Interactive Portfolios</a></li>
              <li><a href="#achievement-section" className="hover:text-white transition-colors">Tier Badges &amp; Merit</a></li>
            </ul>
          </div>

          {/* Column 3: Opportunities */}
          <div className="space-y-3">
            <div className="text-white font-semibold tracking-wider uppercase text-[11px] font-mono">
              Market &amp; Arena
            </div>
            <ul className="space-y-2">
              <li><a href="#marketplace" className="hover:text-white transition-colors">Project Marketplace</a></li>
              <li><a href="#recruitment-engine" className="hover:text-white transition-colors">Recruitment Engine</a></li>
              <li><a href="#hackathons-arena" className="hover:text-white transition-colors">Inter-College Hackathons</a></li>
              <li><a href="#hackathons-arena" className="hover:text-white transition-colors">SME Transformation Hub</a></li>
              <li><a href="#hackathons-arena" className="hover:text-white transition-colors">Enterprise Sponsorship</a></li>
            </ul>
          </div>

          {/* Column 4: Institutional */}
          <div className="space-y-3">
            <div className="text-white font-semibold tracking-wider uppercase text-[11px] font-mono">
              Institutional
            </div>
            <ul className="space-y-2">
              <li><a href="#overview" className="hover:text-white transition-colors">University Partners</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Campus Ambassadors</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Security &amp; Sandboxing</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL • MESH 2.0</span>
          </div>

          <div>
            © 2026 Developers App Inc. All rights reserved. Designed for elite builders.
          </div>
        </div>
      </div>
    </footer>
  );
};
