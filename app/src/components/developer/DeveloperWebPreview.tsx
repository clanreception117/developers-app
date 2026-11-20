"use client";

import React, { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  ExternalLink,
  Square,
  Play,
  Layers,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { soundFx } from "../../lib/audioAtmosphere";

interface DeveloperWebPreviewProps {
  initialCode?: string;
  projectName?: string;
}

const DEFAULT_WEB_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Developers App Live Sandbox Web App</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #05040B;
      color: #F8FAFC;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .container {
      background: #0E1322;
      border: 1px solid rgba(52, 120, 246, 0.4);
      box-shadow: 0 0 50px rgba(52, 120, 246, 0.2);
      border-radius: 24px;
      padding: 36px;
      max-width: 480px;
      width: 100%;
      text-align: center;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(34, 211, 238, 0.15);
      border: 1px solid rgba(34, 211, 238, 0.3);
      color: #22D3EE;
      font-size: 11px;
      font-family: monospace;
      margin-bottom: 16px;
      font-weight: bold;
    }
    h1 {
      font-size: 24px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 8px;
    }
    p {
      color: #A1AAB8;
      font-size: 13px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 24px;
    }
    .metric-card {
      background: #070910;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 14px;
    }
    .metric-val { font-size: 18px; font-weight: bold; color: #22D3EE; font-family: monospace; }
    .metric-label { font-size: 11px; color: #A1AAB8; margin-top: 4px; }
    button {
      background: linear-gradient(135deg, #3478F6, #8055F5);
      color: white;
      border: none;
      padding: 12px 28px;
      border-radius: 14px;
      font-size: 13px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(52, 120, 246, 0.4);
      transition: all 0.2s;
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 6px 25px rgba(52, 120, 246, 0.6); }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">LIVE RUNTIME CONTAINER</div>
    <h1>Developers App Live Node</h1>
    <p>Isolated Client Application running in a sandboxed iframe with restricted storage policies.</p>
    
    <div class="metrics">
      <div class="metric-card">
        <div class="metric-val" id="fps-val">60 FPS</div>
        <div class="metric-label">Frame Rate</div>
      </div>
      <div class="metric-card">
        <div class="metric-val" id="latency-val">0ms</div>
        <div class="metric-label">Cold Start</div>
      </div>
    </div>

    <button onclick="testInteraction()">Run Client Interaction</button>
  </div>

  <script>
    function testInteraction() {
      const ms = Math.round(10 + Math.random() * 8);
      document.getElementById('latency-val').innerText = ms + 'ms';
      alert('Event dispatched inside isolated sandbox environment! Latency: ' + ms + 'ms');
    }
  </script>
</body>
</html>`;

export const DeveloperWebPreview: React.FC<DeveloperWebPreviewProps> = ({
  initialCode,
  projectName = "Developers App Client Application",
}) => {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [code, setCode] = useState(initialCode || DEFAULT_WEB_TEMPLATE);
  const [key, setKey] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const handleRefresh = () => {
    soundFx.playChime(650, "sine", 0.02, 0.08);
    setKey((prev) => prev + 1);
  };

  const handleOpenNewTab = () => {
    soundFx.playChime(750, "triangle", 0.04, 0.15);
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const viewportWidth =
    viewport === "desktop"
      ? "w-full max-w-full"
      : viewport === "tablet"
      ? "w-[768px] max-w-full"
      : "w-[375px] max-w-full";

  return (
    <div className="space-y-4">
      {/* Top Header & Viewport Controls */}
      <div className="p-4 rounded-2xl bg-[#121827] border border-white/[0.08] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
            <Monitor className="w-5 h-5 text-[#22D3EE]" />
            <span>Web &amp; Application Sandboxed Preview</span>
          </h2>
          <p className="text-[11px] text-[#A1AAB8] font-mono mt-0.5">
            Rendered inside an isolated origin iframe with restricted cookie, token, and storage access.
          </p>
        </div>

        {/* Viewport Selectors & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Viewport buttons */}
          <div className="flex items-center p-1 rounded-xl bg-[#070910] border border-white/[0.08]">
            <button
              onClick={() => {
                soundFx.playChime(600, "sine", 0.02, 0.08);
                setViewport("desktop");
              }}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewport === "desktop"
                  ? "bg-[#3478F6] text-white font-bold"
                  : "text-[#A1AAB8] hover:text-white"
              }`}
              title="Desktop (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>

            <button
              onClick={() => {
                soundFx.playChime(600, "sine", 0.02, 0.08);
                setViewport("tablet");
              }}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewport === "tablet"
                  ? "bg-[#3478F6] text-white font-bold"
                  : "text-[#A1AAB8] hover:text-white"
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>

            <button
              onClick={() => {
                soundFx.playChime(600, "sine", 0.02, 0.08);
                setViewport("mobile");
              }}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewport === "mobile"
                  ? "bg-[#3478F6] text-white font-bold"
                  : "text-[#A1AAB8] hover:text-white"
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white"
            title="Refresh sandbox preview"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleOpenNewTab}
            className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sandboxed Iframe Container */}
      <div className="rounded-3xl border border-white/[0.1] bg-[#070910] p-4 flex flex-col items-center justify-center min-h-[620px] shadow-2xl relative overflow-hidden">
        {/* Browser Mockup Header Bar */}
        <div className="w-full pb-3 mb-3 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] text-zinc-500 ml-2">
              https://sandbox.developersapp.io/render/{viewport}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SANDBOX ISOLATED ORIGIN</span>
          </div>
        </div>

        {/* Viewport Canvas Frame */}
        <div className={`transition-all duration-300 mx-auto ${viewportWidth} h-[540px] rounded-2xl overflow-hidden border border-white/[0.1] shadow-xl bg-black`}>
          {isRunning ? (
            <iframe
              key={key}
              srcDoc={code}
              sandbox="allow-scripts allow-forms allow-modals"
              title="Developers App Sandboxed Preview"
              className="w-full h-full border-0 bg-transparent"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 space-y-3 bg-[#0B0E17]">
              <ShieldAlert className="w-10 h-10 text-amber-400" />
              <h4 className="text-base font-bold text-white">Preview Container Stopped</h4>
              <p className="text-xs text-[#A1AAB8] font-mono">
                The isolated container was terminated to preserve compute resources.
              </p>
              <button
                onClick={() => setIsRunning(true)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#3478F6] text-white"
              >
                Restart Container
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
