"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Square,
  RotateCcw,
  Save,
  FileCode,
  FolderTree,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Plus,
  Trash2,
  Cpu,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileText,
} from "lucide-react";
import { soundFx } from "../../lib/audioAtmosphere";

interface SandboxFile {
  name: string;
  language: "javascript" | "typescript" | "python" | "html";
  content: string;
}

const INITIAL_FILES: SandboxFile[] = [
  {
    name: "main.ts",
    language: "typescript",
    content: `// Developers App Isolated Sandbox Runtime (Node.js)
console.log("Initializing Developers App Sandbox Engine...");

const nodes = Array.from({ length: 5 }, (_, i) => ({
  id: \`node-\${i + 1}\`,
  fps: 60,
  latencyMs: Math.round(12 + Math.random() * 4),
  status: "ONLINE",
}));

console.log("Cluster Nodes Status:");
nodes.forEach(n => console.log(\`  [\${n.id}] FPS: \${n.fps} | Latency: \${n.latencyMs}ms | Status: \${n.status}\`));

const avgLatency = nodes.reduce((acc, curr) => acc + curr.latencyMs, 0) / nodes.length;
console.log(\`\\nConsensus Verified: Average Latency = \${avgLatency.toFixed(1)}ms across 5 nodes.\`);
`,
  },
  {
    name: "consensus.py",
    language: "python",
    content: `# Developers App Isolated Sandbox Runtime (Python 3)
import sys
import time

print(f"Python Sandbox Runtime Active: {sys.version.split()[0]}")
print("Evaluating Autonomous Agent Consensus Quorum...")

nodes = ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"]
for idx, node in enumerate(nodes, start=1):
    print(f"[*] Node #{idx} [{node}] cryptographic state check: PASSED (14ms)")

print("\\n[SUCCESS] Consensus Quorum 5/5 validated. Escrow task ready.")
`,
  },
  {
    name: "interactive_node.html",
    language: "html",
    content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Developers App Live Preview</title>
  <style>
    body {
      background: #05040B;
      color: #F8FAFC;
      font-family: system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: #0F1424;
      border: 1px solid #3478F6;
      border-radius: 20px;
      padding: 32px;
      max-width: 420px;
      text-align: center;
      box-shadow: 0 10px 40px rgba(52, 120, 246, 0.2);
    }
    h2 { color: #22D3EE; margin-top: 0; }
    p { color: #A1AAB8; font-size: 14px; line-height: 1.6; }
    button {
      background: linear-gradient(135deg, #3478F6, #8055F5);
      border: none;
      color: white;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: bold;
      cursor: pointer;
      margin-top: 16px;
      transition: transform 0.2s;
    }
    button:hover { transform: scale(1.05); }
    #counter { font-size: 20px; font-weight: bold; color: #3478F6; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Developers App Live Node</h2>
    <p>This application is executing inside an isolated sandboxed iframe.</p>
    <button onclick="increment()">Pulse Sandbox Node</button>
    <div id="counter">Pulses: 0</div>
  </div>
  <script>
    let count = 0;
    function increment() {
      count++;
      document.getElementById('counter').innerText = 'Pulses: ' + count;
    }
  </script>
</body>
</html>`,
  },
];

interface DeveloperCodePreviewProps {
  onOpenWebPreview?: (code: string) => void;
}

export const DeveloperCodePreview: React.FC<DeveloperCodePreviewProps> = ({
  onOpenWebPreview,
}) => {
  const [files, setFiles] = useState<SandboxFile[]>(INITIAL_FILES);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [consoleOutput, setConsoleOutput] = useState<string>(
    "Developers App Isolated Sandbox Ready.\nClick 'Run Code' to execute in process-isolated runtime container.\n"
  );
  const [isRunning, setIsRunning] = useState(false);
  const [executionStats, setExecutionStats] = useState<{
    timeMs: number | null;
    memoryMb: number | null;
    status: "idle" | "success" | "error";
  }>({
    timeMs: null,
    memoryMb: null,
    status: "idle",
  });
  const [copied, setCopied] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [showAddFile, setShowAddFile] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  const activeFile = files[activeFileIndex] || files[0];

  const handleUpdateCode = (newCode: string) => {
    setFiles((prev) => {
      const copy = [...prev];
      copy[activeFileIndex] = { ...copy[activeFileIndex], content: newCode };
      return copy;
    });
  };

  const handleRunCode = async () => {
    soundFx.playChime(850, "triangle", 0.05, 0.2);
    setIsRunning(true);
    setConsoleOutput(`[Sandbox Process Spawned: ${activeFile.name}]\nExecuting isolated container with 4000ms timeout...\n`);

    abortControllerRef.current = new AbortController();

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: activeFile.language,
          code: activeFile.content,
        }),
        signal: abortControllerRef.current.signal,
      });

      const data = await res.json();

      if (data.success) {
        soundFx.playChime(950, "sine", 0.04, 0.15);
        setConsoleOutput(data.output || "[Process finished with zero stdout]");
        setExecutionStats({
          timeMs: data.executionTimeMs || 12,
          memoryMb: data.memoryUsageMb || 1.8,
          status: "success",
        });
      } else {
        soundFx.playChime(350, "sawtooth", 0.05, 0.2);
        setConsoleOutput(
          (data.output ? data.output + "\n\n" : "") +
            `[Execution Error / Stderr]:\n${data.error || "Execution terminated with non-zero exit code"}`
        );
        setExecutionStats({
          timeMs: data.executionTimeMs || 0,
          memoryMb: data.memoryUsageMb || 0,
          status: "error",
        });
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        setConsoleOutput((prev) => prev + "\n[Execution aborted by user controller]");
      } else {
        setConsoleOutput(`[Network or Sandbox Error]: ${err.message}`);
      }
      setExecutionStats({ timeMs: null, memoryMb: null, status: "error" });
    } finally {
      setIsRunning(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopExecution = () => {
    soundFx.playChime(400, "sawtooth", 0.04, 0.15);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsRunning(false);
  };

  const handleResetCode = () => {
    soundFx.playChime(600, "sine", 0.02, 0.08);
    setFiles((prev) => {
      const copy = [...prev];
      copy[activeFileIndex] = {
        ...copy[activeFileIndex],
        content: INITIAL_FILES[activeFileIndex]?.content || "// Reset code\n",
      };
      return copy;
    });
    setConsoleOutput("[Editor content reverted to template baseline]");
  };

  const handleCopyCode = () => {
    soundFx.playChime(700, "sine", 0.02, 0.08);
    navigator.clipboard?.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddNewFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    soundFx.playChime(750, "sine", 0.03, 0.1);
    let lang: SandboxFile["language"] = "typescript";
    if (newFileName.endsWith(".py")) lang = "python";
    else if (newFileName.endsWith(".html") || newFileName.endsWith(".htm")) lang = "html";
    else if (newFileName.endsWith(".js")) lang = "javascript";

    const newFile: SandboxFile = {
      name: newFileName.trim(),
      language: lang,
      content:
        lang === "python"
          ? `# ${newFileName}\nprint("Hello from Developers App Sandbox!")\n`
          : lang === "html"
          ? `<!-- ${newFileName} -->\n<h1>Hello Developers App</h1>\n`
          : `// ${newFileName}\nconsole.log("Hello from Developers App Sandbox!");\n`,
    };

    setFiles([...files, newFile]);
    setActiveFileIndex(files.length);
    setNewFileName("");
    setShowAddFile(false);
  };

  const handleDeleteFile = (index: number) => {
    if (files.length <= 1) return;
    soundFx.playChime(400, "sawtooth", 0.04, 0.15);
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    setActiveFileIndex(0);
  };

  return (
    <div className="space-y-4">
      {/* Top Header & Execution Bar */}
      <div className="p-4 rounded-2xl bg-[#121827] border border-white/[0.08] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3478F6]/15 border border-[#3478F6]/30 flex items-center justify-center text-[#22D3EE]">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Developers App Live Code Sandbox
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE RUNTIME
              </span>
            </div>
            <p className="text-[11px] text-[#A1AAB8] font-mono">
              Secure Isolated Container • 4000ms Timeout • No Root • Auto-Cleanup
            </p>
          </div>
        </div>

        {/* Primary Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="px-5 py-2 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-500 to-[#3478F6] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all flex items-center gap-1.5 disabled:opacity-40"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunning ? "Executing..." : "Run Code"}</span>
          </button>

          {isRunning && (
            <button
              onClick={handleStopExecution}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-red-400 bg-red-500/15 border border-red-500/30 hover:bg-red-500/25 transition-colors flex items-center gap-1.5"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          )}

          <button
            onClick={handleResetCode}
            className="px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors flex items-center gap-1.5"
            title="Reset code template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {activeFile.language === "html" && onOpenWebPreview && (
            <button
              onClick={() => onOpenWebPreview(activeFile.content)}
              className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/30 hover:bg-[#22D3EE]/20 transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview HTML</span>
            </button>
          )}
        </div>
      </div>

      {/* 3-PANEL SANDBOX ENVIRONMENT (Left Explorer, Center Editor, Right Console) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-white/[0.1] bg-[#0A0D18] shadow-2xl overflow-hidden min-h-[560px]">
        
        {/* PANEL 1: LEFT FILE EXPLORER (2.5 cols) */}
        <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/[0.08] p-4 bg-[#070910] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1AAB8] flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5 text-[#3478F6]" />
                Project Explorer
              </span>
              <button
                onClick={() => setShowAddFile(!showAddFile)}
                className="p-1 rounded text-[#22D3EE] hover:bg-white/[0.06]"
                title="Add new file"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add File Input */}
            {showAddFile && (
              <form onSubmit={handleAddNewFile} className="flex items-center gap-1.5">
                <input
                  type="text"
                  required
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="script.ts or test.py"
                  className="flex-1 px-2.5 py-1.5 bg-[#0D111B] border border-white/[0.1] rounded-lg text-xs text-white font-mono focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1.5 rounded-lg bg-[#3478F6] text-white text-xs font-mono"
                >
                  Add
                </button>
              </form>
            )}

            {/* Files List */}
            <div className="space-y-1">
              {files.map((file, idx) => (
                <div
                  key={file.name}
                  onClick={() => {
                    soundFx.playChime(600, "sine", 0.02, 0.08);
                    setActiveFileIndex(idx);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-mono cursor-pointer flex items-center justify-between transition-colors ${
                    activeFileIndex === idx
                      ? "bg-[#3478F6]/20 border border-[#3478F6]/40 text-white font-bold"
                      : "text-[#A1AAB8] hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileCode className="w-3.5 h-3.5 text-[#22D3EE] shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>

                  {files.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFile(idx);
                      }}
                      className="p-1 text-zinc-500 hover:text-red-400"
                      title="Remove file"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-500 space-y-1">
            <div>Engine: Node.js 24 &amp; Python 3</div>
            <div className="text-emerald-400">✓ Isolated Memory Sandbox</div>
          </div>
        </div>

        {/* PANEL 2: CENTER CODE EDITOR (5.5 cols) */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between bg-[#0B0E1A]">
          {/* Editor Header Bar */}
          <div className="px-4 py-2.5 bg-[#070910] border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{activeFile.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-white/[0.06] text-[#22D3EE]">
                {activeFile.language}
              </span>
            </div>

            <button
              onClick={handleCopyCode}
              className="hover:text-white text-zinc-400 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Textarea Editor with Line Numbers */}
          <div className="flex-1 flex overflow-hidden">
            {/* Simulated Line numbers */}
            <div className="w-10 bg-[#070910]/80 p-3 text-right select-none font-mono text-xs text-zinc-600 space-y-1">
              {activeFile.content.split("\n").map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code Input Area */}
            <textarea
              value={activeFile.content}
              onChange={(e) => handleUpdateCode(e.target.value)}
              spellCheck={false}
              className="flex-1 p-3 bg-transparent font-mono text-xs text-zinc-200 focus:outline-none resize-none leading-relaxed selection:bg-[#3478F6]/40"
            />
          </div>

          {/* Editor Footer */}
          <div className="px-4 py-2 bg-[#070910]/80 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>UTF-8 • Spaces: 2</span>
            <span>{activeFile.content.length} characters</span>
          </div>
        </div>

        {/* PANEL 3: RIGHT OUTPUT CONSOLE (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#070910]">
          {/* Console Header Bar */}
          <div className="px-4 py-2.5 bg-[#0A0D18] border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <span className="text-white font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Runtime Console
            </span>

            {executionStats.timeMs !== null && (
              <div className="flex items-center gap-3 text-[10px] text-zinc-400">
                <span className="flex items-center gap-1 text-[#22D3EE]">
                  <Clock className="w-3 h-3" />
                  {executionStats.timeMs}ms
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Cpu className="w-3 h-3" />
                  {executionStats.memoryMb}MB
                </span>
              </div>
            )}
          </div>

          {/* Console Output Body */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 leading-relaxed">
            <pre
              className={`whitespace-pre-wrap ${
                executionStats.status === "error"
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {consoleOutput}
            </pre>
          </div>

          {/* Console Footer */}
          <div className="p-3 bg-[#0A0D18] border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-500">Execution Status:</span>
            <span
              className={
                isRunning
                  ? "text-amber-400 animate-pulse font-bold"
                  : executionStats.status === "success"
                  ? "text-emerald-400 font-bold"
                  : executionStats.status === "error"
                  ? "text-red-400 font-bold"
                  : "text-zinc-400"
              }
            >
              {isRunning
                ? "RUNNING IN SANDBOX..."
                : executionStats.status === "success"
                ? "COMPLETED (EXIT 0)"
                : executionStats.status === "error"
                ? "FAILED (EXIT 1)"
                : "IDLE"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
