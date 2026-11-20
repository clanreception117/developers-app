"use client";

import React, { useState } from "react";
import { X, Play, Code2, ExternalLink, Check, Download, ShieldCheck } from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface Product {
  id: string;
  title: string;
  creator: string;
  creatorBadge: "Gold" | "Silver" | "Bronze";
  category: string;
  price: number;
  rating: number;
  salesCount: number;
  description: string;
  license: string;
  techStack: string[];
}

interface ProjectModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ product, onClose }) => {
  const [downloading, setDownloading] = useState(false);

  if (!product) return null;

  const handleDownload = () => {
    soundFx.playChime(850, "sine", 0.05, 0.2);
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl border border-white/[0.12] bg-[#0A0C12] p-6 sm:p-8 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300">
              {product.category}
            </span>
            <span className="text-xs font-mono text-[#00D6FF] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Architecture
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white">{product.title}</h3>
          <p className="text-xs sm:text-sm text-zinc-400">{product.description}</p>
        </div>

        {/* Live Interactive Preview Simulation Frame */}
        <div className="rounded-2xl border border-white/[0.1] bg-[#050608] p-4 font-mono text-xs text-zinc-300 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-zinc-500 text-[11px]">
                sandbox.preview.developersapp.io/{product.id}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              RUNNING
            </span>
          </div>

          <div className="py-8 text-center space-y-2">
            <div className="text-white font-bold text-base">
              Interactive Live Container Active
            </div>
            <p className="text-zinc-400 text-xs max-w-sm mx-auto">
              This application has passed automated unit, security, and performance benchmarks.
            </p>
          </div>
        </div>

        {/* Stack Badges */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-zinc-400 uppercase">Included Dependencies</span>
          <div className="flex flex-wrap gap-2">
            {product.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Purchase / Download Row */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
          <div>
            <div className="text-xl font-bold font-mono text-white">${product.price} USD</div>
            <div className="text-[11px] text-zinc-500">{product.license}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all flex items-center gap-2"
            >
              {downloading ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Packaging Source...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download License &amp; Source</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
