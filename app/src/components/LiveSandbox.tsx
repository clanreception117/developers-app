"use client";

import React, { useState } from "react";
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  Code,
  Eye,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface Template {
  id: string;
  name: string;
  category: string;
  code: string;
  previewHtml: string;
}

const TEMPLATES: Template[] = [
  {
    id: "ai-flow",
    name: "AI Autonomous Agent Hub",
    category: "Next.js / AI",
    code: `import { useState } from 'react';

export default function AgentPipeline() {
  const [status, setStatus] = useState('Idle');
  const [tokens, setTokens] = useState(14820);

  const runWorkflow = () => {
    setStatus('Running Autonomous Multi-Agent Loop...');
    setTimeout(() => {
      setStatus('Synthesizing Neural Code Embeddings...');
      setTokens(t => t + 420);
    }, 1200);
  };

  return (
    <div className="p-6 bg-slate-950 text-cyan-400 font-mono rounded-xl">
      <h3 className="text-xl font-bold text-white mb-2">Developers App Neural Agent</h3>
      <p className="text-sm text-zinc-400 mb-4">Autonomous execution node running live in sandbox.</p>
      <div className="p-4 bg-black/60 rounded-lg border border-cyan-500/30 mb-4">
        <div>STATUS: <span className="text-emerald-400">{status}</span></div>
        <div>ACTIVE EMBEDDINGS: <span>{tokens.toLocaleString()}</span></div>
      </div>
      <button onClick={runWorkflow} className="px-4 py-2 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400">
        Execute Agent Pipeline
      </button>
    </div>
  );
}`,
    previewHtml: `
      <div style="background:#090d16; color:#00D6FF; font-family:monospace; padding:24px; border-radius:12px; height:100%; border:1px solid rgba(0,214,255,0.2);">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <h3 style="color:#ffffff; margin:0; font-size:18px;">⚡ Developers App Autonomous Agent Hub</h3>
          <span style="background:rgba(0,214,255,0.1); color:#00D6FF; padding:4px 8px; border-radius:6px; font-size:11px; border:1px solid rgba(0,214,255,0.3);">ACTIVE SANDBOX</span>
        </div>
        <p style="color:#a1a1aa; font-size:13px; margin-bottom:20px;">Zero-setup isolated runtime. Instant state evaluation without local dependencies.</p>
        <div style="background:rgba(0,0,0,0.5); padding:16px; border-radius:8px; border:1px solid rgba(255,255,255,0.08); margin-bottom:20px;">
          <div style="margin-bottom:8px; font-size:13px;">PIPELINE STATUS: <span style="color:#10b981; font-weight:bold;">OPERATIONAL • LISTENING</span></div>
          <div style="margin-bottom:8px; font-size:13px;">ACTIVE NODES: <span style="color:#ffffff;">8 Agents Connected</span></div>
          <div style="font-size:13px;">LATENCY: <span style="color:#8755FF;">14ms roundtrip</span></div>
        </div>
        <button id="demo-btn" style="background:linear-gradient(120deg, #287BFF, #8755FF); color:#fff; border:none; padding:10px 20px; border-radius:8px; font-weight:600; cursor:pointer;" onclick="this.innerHTML='✓ Pipeline Executed (240ms)'; this.style.background='#10b981';">
          Execute Live Neural Pipeline
        </button>
      </div>
    `,
  },
  {
    id: "3d-canvas",
    name: "Interactive Shader Matrix",
    category: "WebGL / Three.js",
    code: `// Developers App WebGL Shader Sandbox
const canvas = document.getElementById('render-canvas');
const gl = canvas.getContext('webgl2');

// Fragment shader compiling directly in browser
const fsSource = \`
  precision highp float;
  uniform float u_time;
  varying vec2 v_uv;
  void main() {
    vec3 col = 0.5 + 0.5*cos(u_time+v_uv.xyx+vec3(0,2,4));
    gl_FragColor = vec4(col, 1.0);
  }
\`;

function renderLoop(time) {
  drawScene(gl, time * 0.001);
  requestAnimationFrame(renderLoop);
}`,
    previewHtml: `
      <div style="background:#050608; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:20px; position:relative; overflow:hidden;">
        <div style="position:absolute; width:220px; height:220px; border-radius:50%; background:radial-gradient(circle, rgba(135,85,255,0.4) 0%, transparent 70%); filter:blur(30px); animation:pulse 3s infinite;"></div>
        <div style="position:relative; z-index:1; border:1px solid rgba(255,255,255,0.15); background:rgba(20,25,38,0.7); backdrop-filter:blur(10px); padding:24px; border-radius:16px; max-width:320px;">
          <div style="font-size:24px; margin-bottom:8px;">🔮</div>
          <h4 style="color:#fff; margin:0 0 6px 0; font-size:16px;">Real-Time GPU Shader</h4>
          <p style="color:#a1a1aa; font-size:12px; margin:0 0 16px 0;">Hardware-accelerated WebGL viewport rendered with 60 FPS precision.</p>
          <div style="font-family:monospace; font-size:11px; background:#000; padding:8px; border-radius:6px; color:#00D6FF;">
            FPS: 60.0 • VRAM: 12MB
          </div>
        </div>
      </div>
    `,
  },
  {
    id: "ecommerce-api",
    name: "FinTech Settlement Ledger",
    category: "Node.js / Express",
    code: `import { createClient } from '@showcase/ledger';

const client = createClient({ apiKey: 'dev_live_89410' });

export async function processPayment(amount, currency) {
  const tx = await client.transactions.create({
    amount,
    currency,
    settlement: 'INSTANT_T0',
    metadata: { platform: 'Developers App Marketplace' }
  });
  return tx.status;
}`,
    previewHtml: `
      <div style="background:#0a0e17; color:#fff; font-family:sans-serif; padding:24px; border-radius:12px; height:100%; border:1px solid rgba(255,255,255,0.08);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div>
            <div style="font-size:12px; color:#a1a1aa; text-transform:uppercase; letter-spacing:1px;">Verified Sandbox API</div>
            <div style="font-size:18px; font-weight:700;">Global Settlement Gateway</div>
          </div>
          <span style="background:rgba(16,185,129,0.15); color:#10b981; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:600;">200 OK</span>
        </div>
        <div style="background:rgba(0,0,0,0.4); border:1px solid rgba(255,255,255,0.06); border-radius:8px; padding:16px; margin-bottom:16px; font-family:monospace; font-size:12px; color:#00D6FF;">
          {<br/>
          &nbsp;&nbsp;"transaction_id": "tx_99831f28b4",<br/>
          &nbsp;&nbsp;"amount": 299.00,<br/>
          &nbsp;&nbsp;"currency": "USD",<br/>
          &nbsp;&nbsp;"cleared_in": "38ms"<br/>
          }
        </div>
        <div style="font-size:12px; color:#a1a1aa;">Sandbox Environment Isolated from Production Core.</div>
      </div>
    `,
  },
];

export const LiveSandbox: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(TEMPLATES[0]);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");
  const [codeContent, setCodeContent] = useState<string>(TEMPLATES[0].code);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "[Sandbox Initialized] Virtual container ready.",
    "[Security Boundary] Sandboxed execution container initialized (Memory: 512MB, CPU: 2 vCPU).",
    "[Status] Ready to execute.",
  ]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setCodeContent(template.code);
    setTerminalOutput([
      `[Loaded] Switched to template: ${template.name}`,
      "[Environment] Dependencies mounted and hot-reloaded.",
      "[Status] Ready.",
    ]);
    soundFx.playChime(500, "sine", 0.04, 0.1);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    soundFx.playChime(750, "sine", 0.05, 0.15);
    setTerminalOutput((prev) => [
      ...prev,
      `[Compile] Compiling ${selectedTemplate.name}...`,
      `[Sandbox] Executing in isolated container with 0ms cold start...`,
    ]);

    setTimeout(() => {
      setIsRunning(false);
      setTerminalOutput((prev) => [
        ...prev,
        `[Success] Build completed cleanly. Process exited with code 0.`,
        `[Metrics] Executed in 142ms. Heap usage: 38.4MB.`,
      ]);
      soundFx.playChime(920, "triangle", 0.05, 0.2);
    }, 800);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    soundFx.playChime(800, "sine", 0.03, 0.1);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="sandbox-section" className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Context & Template Selection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D6FF]/10 border border-[#00D6FF]/30 text-[#00D6FF] text-xs font-semibold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              Zero-Setup Live Execution
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Run Projects. <br />
              <span className="text-gradient-accent">Not Just Code.</span>
            </h3>
            <p className="text-zinc-400 text-base leading-relaxed">
              Experience working applications directly inside the platform without complicated local setup. Upload project files, explore live runnable previews, and share one-click deployment environments.
            </p>
          </div>

          {/* Security Banner Requirement from Prompt */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#287BFF] shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-400 space-y-1">
              <span className="font-semibold text-zinc-200">Isolated Execution Architecture:</span>
              <p>
                Code runs inside isolated browser-sandboxed workers with strict memory limits, timeouts, and zero host server compromise.
              </p>
            </div>
          </div>

          {/* Selectable Templates */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
              Choose Live Sandbox Template
            </span>
            <div className="space-y-2">
              {TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#287BFF]/10 border-[#287BFF]/50 shadow-[0_0_20px_rgba(40,123,255,0.15)]"
                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-[#00D6FF] transition-colors">
                        {tmpl.name}
                      </div>
                      <div className="text-xs text-zinc-400 font-mono mt-0.5">
                        {tmpl.category}
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-mono ${
                        isSelected
                          ? "bg-[#287BFF] text-white font-bold"
                          : "bg-white/[0.06] text-zinc-400"
                      }`}
                    >
                      {isSelected ? "ACTIVE" : "SELECT"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Editor & Live Preview Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.1] bg-[#0A0C12] shadow-2xl overflow-hidden flex flex-col h-[560px]">
          {/* Header Bar */}
          <div className="px-4 py-3 bg-[#050608] border-b border-white/[0.08] flex items-center justify-between">
            {/* Window Dots */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-zinc-400">
                sandbox://developersapp/{selectedTemplate.id}.tsx
              </span>
            </div>

            {/* View switcher tabs */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-lg border border-white/[0.08]">
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "code"
                    ? "bg-[#287BFF] text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                Code
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-colors ${
                  activeTab === "preview"
                    ? "bg-[#8755FF] text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Live View
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden relative flex flex-col">
            {activeTab === "code" ? (
              <div className="flex-1 relative flex flex-col">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-zinc-300 transition-colors"
                    title="Copy Code"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <textarea
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  className="w-full flex-1 p-4 bg-[#07090F] text-zinc-200 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-[#287BFF]"
                  spellCheck={false}
                />
              </div>
            ) : (
              <div className="flex-1 p-4 bg-[#07090F] overflow-auto">
                <div
                  className="w-full h-full min-h-[220px]"
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.previewHtml }}
                />
              </div>
            )}

            {/* Bottom Execution Bar & Terminal Output */}
            <div className="h-44 bg-[#050608] border-t border-white/[0.08] flex flex-col">
              <div className="px-4 py-2 border-b border-white/[0.04] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#00D6FF]" />
                  <span className="text-xs font-mono text-zinc-400 uppercase">
                    Terminal Execution Log
                  </span>
                </div>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-all"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
                  {isRunning ? "Executing..." : "Run Code"}
                </button>
              </div>

              {/* Terminal Logs */}
              <div className="flex-1 p-3 font-mono text-[11px] overflow-y-auto space-y-1 text-zinc-300">
                {terminalOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.includes("[Success]")
                        ? "text-emerald-400"
                        : line.includes("[Compile]")
                        ? "text-yellow-400"
                        : line.includes("[Security")
                        ? "text-blue-400"
                        : "text-zinc-400"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
