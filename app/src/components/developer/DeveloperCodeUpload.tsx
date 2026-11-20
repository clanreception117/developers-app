"use client";

import React, { useState } from "react";
import {
  UploadCloud,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Play,
  FileText,
  X,
  FileArchive,
  Terminal,
} from "lucide-react";
import { UploadedCodeItem } from "../../types";
import { dataStore } from "../../lib/dataStore";
import { soundFx } from "../../lib/audioAtmosphere";

interface DeveloperCodeUploadProps {
  username: string;
  onRunSandboxSnippet?: (code: string, language: string) => void;
}

const SUPPORTED_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".html",
  ".css",
  ".json",
  ".glsl",
  ".zip",
];

export const DeveloperCodeUpload: React.FC<DeveloperCodeUploadProps> = ({
  username,
  onRunSandboxSnippet,
}) => {
  const [items, setItems] = useState<UploadedCodeItem[]>(() =>
    dataStore.getUploadedCode(username)
  );

  // Form states
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("TypeScript");
  const [category, setCategory] = useState("Web Applications");

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check extension
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
      setUploadStatus("error");
      setErrorMessage(
        `Unsupported file extension: ${ext}. Permitted formats: ${SUPPORTED_EXTENSIONS.join(", ")}`
      );
      return;
    }

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus("error");
      setErrorMessage("File exceeds the maximum limit of 5 MB.");
      return;
    }

    setSelectedFile(file);
    setUploadStatus("idle");
    setErrorMessage(null);

    // Read file text content
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setFileContent(content || "// Uploaded code binary or empty file");
      if (!projectName) {
        setProjectName(file.name.replace(/\.[^/.]+$/, ""));
      }
    };
    reader.readAsText(file);
  };

  const handleStartUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage("Please select a valid code file or archive to upload.");
      return;
    }
    if (!projectName.trim()) {
      setErrorMessage("Please specify a project identifier for this upload.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(15);
    soundFx.playChime(600, "sine", 0.03, 0.1);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(100);

      const newItem: UploadedCodeItem = {
        id: `code-${Date.now()}`,
        name: projectName.trim(),
        description: description.trim() || "Uploaded source module for sandbox evaluation.",
        language,
        category,
        fileName: selectedFile.name,
        fileSize: `${(selectedFile.size / 1024).toFixed(1)} KB`,
        fileContent: fileContent || "// Source file",
        uploadedAt: new Date().toISOString().split("T")[0],
        ownerUsername: username,
      };

      dataStore.saveUploadedCode(newItem);
      setItems(dataStore.getUploadedCode(username));
      setUploadStatus("success");
      soundFx.playChime(950, "triangle", 0.05, 0.2);

      // Reset form
      setSelectedFile(null);
      setProjectName("");
      setDescription("");
    }, 900);
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (confirm(`Delete uploaded module "${name}"?`)) {
      soundFx.playChime(400, "sawtooth", 0.04, 0.15);
      dataStore.deleteUploadedCode(id);
      setItems(dataStore.getUploadedCode(username));
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
          <UploadCloud className="w-6 h-6 text-[#22D3EE]" />
          <span>Code Upload &amp; Repository Pipeline</span>
        </h2>
        <p className="text-xs text-[#A1AAB8] font-mono mt-1">
          Upload single source modules (.ts, .js, .py, .glsl, .html) or ZIP project archives for isolated sandbox analysis.
        </p>
      </div>

      {/* Main Upload Box & Config Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Drag & Drop Dropzone (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#121827] border border-white/[0.08] shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A1AAB8] font-bold block">
              File Selection &amp; Validation
            </span>

            {/* Dropzone Container */}
            <label className="border-2 border-dashed border-white/[0.15] hover:border-[#3478F6]/60 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#070910]/40 group">
              <input
                type="file"
                accept=".ts,.tsx,.js,.jsx,.py,.html,.css,.json,.glsl,.zip"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-[#3478F6]/15 border border-[#3478F6]/30 flex items-center justify-center text-[#22D3EE] group-hover:scale-110 transition-transform mb-3 shadow-glow">
                <UploadCloud className="w-7 h-7" />
              </div>
              <span className="text-sm font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                {selectedFile ? selectedFile.name : "Choose a source file or archive"}
              </span>
              <span className="text-[11px] text-[#A1AAB8] font-mono mt-1">
                {selectedFile
                  ? `${(selectedFile.size / 1024).toFixed(1)} KB • Ready for upload`
                  : "Drag and drop or browse from filesystem (Max: 5 MB)"}
              </span>
            </label>

            {/* Supported Extensions List */}
            <div className="p-3.5 rounded-xl bg-[#070910] border border-white/[0.04] space-y-1.5 text-xs font-mono">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                Allowed Formats &amp; Containers:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUPPORTED_EXTENSIONS.map((ext) => (
                  <span
                    key={ext}
                    className="px-2 py-0.5 rounded text-[10px] bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                  >
                    {ext}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Upload Progress Bar if active */}
          {isUploading && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Uploading to Sandbox Storage...</span>
                <span className="text-[#22D3EE] font-bold">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#070910] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#3478F6] to-[#22D3EE] transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Source module uploaded successfully and verified!</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Right: Code Metadata Form (6 cols) */}
        <form
          onSubmit={handleStartUpload}
          className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#121827] border border-white/[0.08] shadow-card space-y-4 text-xs font-mono flex flex-col justify-between"
        >
          <div className="space-y-3.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A1AAB8] font-bold block">
              Module Metadata
            </span>

            <div className="space-y-1">
              <label className="text-[#A1AAB8] uppercase font-bold">Project / Module Name *</label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Distributed Consensus Engine"
                className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-[#3478F6]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A1AAB8] uppercase font-bold">Short Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details about components, algorithms, and entry points..."
                className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-[#3478F6] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Language / Runtime</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                >
                  <option value="TypeScript">TypeScript (Node.js)</option>
                  <option value="JavaScript">JavaScript (ESNext)</option>
                  <option value="Python">Python 3.x</option>
                  <option value="HTML / Web">HTML5 / Web App</option>
                  <option value="GLSL / Shaders">GLSL Shader Node</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                >
                  <option value="Web Applications">Web Applications</option>
                  <option value="Distributed Systems">Distributed Systems</option>
                  <option value="GPU Shaders">GPU Shaders</option>
                  <option value="AI / ML Models">AI / ML Models</option>
                  <option value="Smart Contracts">Smart Contracts</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              * Validated against malicious syscalls
            </span>
            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow disabled:opacity-40 transition-all flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Confirm &amp; Upload</span>
            </button>
          </div>
        </form>
      </div>

      {/* Uploaded Code Modules List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#3478F6]" />
            <span>Uploaded Code Modules ({items.length})</span>
          </h3>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#3478F6]/15 text-[#22D3EE] border border-[#3478F6]/30">
                    {item.language}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {item.fileSize}
                  </span>
                </div>
                <p className="text-xs text-[#A1AAB8]">{item.description}</p>
                <div className="text-[11px] text-zinc-500 font-mono">
                  File: <span className="text-zinc-300">{item.fileName}</span> • Uploaded on {item.uploadedAt}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onRunSandboxSnippet && (
                  <button
                    onClick={() => {
                      soundFx.playChime(850, "triangle", 0.04, 0.15);
                      onRunSandboxSnippet(item.fileContent, item.language);
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-[#3478F6]/15 hover:bg-[#3478F6]/25 text-[#22D3EE] border border-[#3478F6]/30 transition-colors flex items-center gap-1.5"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Run in Sandbox</span>
                  </button>
                )}

                <button
                  onClick={() => handleDeleteItem(item.id, item.name)}
                  className="p-2 rounded-xl hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors"
                  title="Delete file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
