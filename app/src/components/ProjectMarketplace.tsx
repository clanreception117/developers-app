"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  ExternalLink,
  Code2,
  DollarSign,
  Tag,
  Star,
  Check,
  ShieldCheck,
  PlusCircle,
  Filter,
  Eye,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface Product {
  id: string;
  title: string;
  creator: string;
  creatorBadge: "Gold" | "Silver" | "Bronze";
  category: "SaaS" | "AI Agents" | "Developer Tools" | "Creative 3D";
  price: number;
  rating: number;
  salesCount: number;
  description: string;
  license: "Commercial License" | "Extended Enterprise" | "Open Source Core";
  techStack: string[];
}

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "NeuroForge AI — Multi-Agent SaaS Boilerplate",
    creator: "Elena Rostova",
    creatorBadge: "Gold",
    category: "AI Agents",
    price: 149,
    rating: 4.95,
    salesCount: 384,
    description: "Production Next.js 14 template with autonomous agent orchestration, vector storage, and Stripe billing.",
    license: "Commercial License",
    techStack: ["Next.js", "LangChain", "OpenAI", "Supabase", "Tailwind"],
  },
  {
    id: "prod-2",
    title: "HyperGlaze — WebGL 3D Creative Portfolio Engine",
    creator: "Marcus Vance",
    creatorBadge: "Gold",
    category: "Creative 3D",
    price: 89,
    rating: 4.92,
    salesCount: 612,
    description: "Awwwards-winning Three.js interactive portfolio framework with custom GLSL shaders and GSAP ScrollTrigger.",
    license: "Commercial License",
    techStack: ["Three.js", "GLSL", "GSAP", "TypeScript", "React"],
  },
  {
    id: "prod-3",
    title: "OmniLedger — Real-Time Multi-Tenant FinTech Core",
    creator: "Siddharth Rao",
    creatorBadge: "Gold",
    category: "SaaS",
    price: 299,
    rating: 4.98,
    salesCount: 219,
    description: "Bank-grade double-entry ledger architecture with idempotency keys, webhook retry pipelines, and Docker deployment.",
    license: "Extended Enterprise",
    techStack: ["Node.js", "PostgreSQL", "Redis", "Docker", "Stripe"],
  },
  {
    id: "prod-4",
    title: "DevPulse — Automated API Health & Microservice Monitor",
    creator: "Kenji Sato",
    creatorBadge: "Silver",
    category: "Developer Tools",
    price: 49,
    rating: 4.88,
    salesCount: 450,
    description: "Lightweight self-hosted telemetry engine with synthetic transaction pings and instant Slack/Telegram alerts.",
    license: "Commercial License",
    techStack: ["Go", "React", "Prometheus", "Tailwind"],
  },
];

interface ProjectMarketplaceProps {
  onInspectProduct?: (product: Product) => void;
}

export const ProjectMarketplace: React.FC<ProjectMarketplaceProps> = ({ onInspectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [purchasedId, setPurchasedId] = useState<string | null>(null);

  const categories = ["All", "AI Agents", "SaaS", "Developer Tools", "Creative 3D"];

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleBuy = (id: string) => {
    soundFx.playChime(880, "sine", 0.05, 0.2);
    setPurchasedId(id);
    setTimeout(() => setPurchasedId(null), 3000);
  };

  return (
    <div id="marketplace" className="w-full">
      <div className="space-y-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D6FF]/10 border border-[#00D6FF]/30 text-[#00D6FF] text-xs font-semibold uppercase tracking-wider">
              <ShoppingBag className="w-3.5 h-3.5" />
              Developer Project Marketplace
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Turn Code Into Value. <br />
              <span className="text-gradient-accent">Sell Software, Templates &amp; Solutions.</span>
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed">
              Monetize production-ready templates, software components, and custom engineering services. Connect directly with verified buyers, companies, and startup founders.
            </p>
          </div>

          {/* Action Trigger */}
          <button
            onClick={() => soundFx.playChime(600, "triangle", 0.04, 0.15)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-semibold border border-white/[0.12] backdrop-blur-md transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-[#00D6FF]" />
            List Your Project / Solution
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playChime(600, "sine", 0.02, 0.08);
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#287BFF] text-white shadow-[0_0_15px_rgba(40,123,255,0.4)]"
                  : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-6 rounded-3xl border border-white/[0.08] bg-[#0A0C12]/90 backdrop-blur-xl hover:border-[#287BFF]/40 transition-all duration-300 shadow-glass flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Category Pill & Price */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                    {prod.category}
                  </span>
                  <div className="text-2xl font-bold font-mono text-white">
                    ${prod.price}
                    <span className="text-xs text-zinc-500 font-sans font-normal ml-1">
                      USD
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-[#00D6FF] transition-colors leading-snug">
                    {prod.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {prod.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-zinc-400 border border-white/[0.05]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Creator & Actions */}
              <div className="pt-6 mt-6 border-t border-white/[0.08] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#287BFF] to-[#8755FF] flex items-center justify-center font-bold text-[10px] text-white">
                    {prod.creator.slice(0, 1)}
                  </div>
                  <div>
                    <span className="text-white font-medium">{prod.creator}</span>
                    <span className="text-[10px] text-[#C9A44C] ml-1.5 font-bold">
                      [{prod.creatorBadge}]
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (onInspectProduct) onInspectProduct(prod);
                      soundFx.playChime(700, "sine", 0.03, 0.1);
                    }}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                    title="Live Sandbox Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleBuy(prod.id)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] to-[#8755FF] hover:shadow-glow transition-all"
                  >
                    {purchasedId === prod.id ? "Licensed! ✓" : "License Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
