"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Plus,
  Play,
  Trash2,
  Edit3,
  ExternalLink,
  Code2,
  Globe,
  Star,
  Eye,
  EyeOff,
  Search,
  Check,
  X,
  Layers,
  FileCode,
} from "lucide-react";
import { Project } from "../../types";
import { dataStore } from "../../lib/dataStore";
import { soundFx } from "../../lib/audioAtmosphere";

interface DeveloperProjectsProps {
  username: string;
  onOpenPreview: (project: Project) => void;
  onRunSandbox: (project: Project) => void;
}

export const DeveloperProjects: React.FC<DeveloperProjectsProps> = ({
  username,
  onOpenPreview,
  onRunSandbox,
}) => {
  const [projects, setProjects] = useState<Project[]>(() => dataStore.getProjects(username));
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal states: "create" | "edit" | null
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Project["category"]>("Web Applications");
  const [languages, setLanguages] = useState("TypeScript, React");
  const [technologies, setTechnologies] = useState("Next.js, Tailwind CSS");
  const [version, setVersion] = useState("1.0.0");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [status, setStatus] = useState<Project["status"]>("Active");
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Web Applications");
    setLanguages("TypeScript, React");
    setTechnologies("Next.js, Tailwind CSS");
    setVersion("1.0.0");
    setVisibility("public");
    setRepoUrl("");
    setLiveUrl("");
    setStatus("Active");
    setFormError(null);
  };

  const openCreateModal = () => {
    soundFx.playChime(700, "sine", 0.02, 0.08);
    resetForm();
    setEditingProject(null);
    setModalMode("create");
  };

  const openEditModal = (proj: Project) => {
    soundFx.playChime(650, "sine", 0.02, 0.08);
    setEditingProject(proj);
    setTitle(proj.title);
    setDescription(proj.description);
    setCategory(proj.category);
    setLanguages(proj.languages.join(", "));
    setTechnologies(proj.technologies.join(", "));
    setVersion(proj.version);
    setVisibility(proj.visibility);
    setRepoUrl(proj.repoUrl || "");
    setLiveUrl(proj.liveUrl || "");
    setStatus(proj.status);
    setFormError(null);
    setModalMode("edit");
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setFormError("Project title and description are required.");
      return;
    }

    soundFx.playChime(900, "triangle", 0.05, 0.2);

    const langArray = languages.split(",").map((s) => s.trim()).filter(Boolean);
    const techArray = technologies.split(",").map((s) => s.trim()).filter(Boolean);

    const updatedProject: Project = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      category,
      languages: langArray.length ? langArray : ["TypeScript"],
      technologies: techArray.length ? techArray : ["Next.js"],
      version: version.trim() || "1.0.0",
      visibility,
      status,
      repoUrl: repoUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      createdAt: editingProject ? editingProject.createdAt : new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      ownerUsername: username,
      ownerName: "Alex Rivers",
      ownerTier: "Gold",
      stars: editingProject ? editingProject.stars : 0,
      codeFiles: editingProject?.codeFiles || [
        {
          name: "index.ts",
          path: "src/index.ts",
          language: "typescript",
          content: `// ${title}\nconsole.log('Developers App Project Node Active');`,
        },
      ],
    };

    dataStore.saveProject(updatedProject);
    setProjects(dataStore.getProjects(username));
    setModalMode(null);
  };

  const handleDeleteProject = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete project "${name}"? This action cannot be undone.`)) {
      soundFx.playChime(400, "sawtooth", 0.04, 0.15);
      dataStore.deleteProject(id);
      setProjects(dataStore.getProjects(username));
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2.5">
            <FolderGit2 className="w-6 h-6 text-[#3478F6]" />
            <span>My Projects &amp; Repositories</span>
          </h2>
          <p className="text-xs text-[#A1AAB8] font-mono mt-1">
            Manage your verified runnable projects, source code links, and live sandbox deployments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow transition-all flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1AAB8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, technology, or tag..."
            className="w-full pl-10 pr-4 py-2 bg-[#121827] border border-white/[0.08] rounded-xl text-xs text-white placeholder-[#A1AAB8] focus:outline-none focus:border-[#3478F6]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["All", "Web Applications", "GPU Shaders & WebGL", "Distributed Systems", "Smart Contracts"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? "bg-[#3478F6] text-white font-bold"
                  : "bg-[#121827] text-[#A1AAB8] hover:text-white border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="p-5 rounded-3xl bg-[#121827] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 flex flex-col justify-between shadow-card space-y-4 group relative overflow-hidden"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#22D3EE] border border-white/[0.08]">
                  {project.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  {project.visibility === "public" ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                      <Eye className="w-3 h-3" /> Public
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-zinc-500 text-[10px]">
                      <EyeOff className="w-3 h-3" /> Private
                    </span>
                  )}
                  <span className="text-zinc-600">•</span>
                  <span>v{project.version}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#A1AAB8] line-clamp-3 leading-relaxed mt-1.5">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#070910] border border-white/[0.06] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
              <div className="flex items-center justify-between text-xs text-[#A1AAB8] font-mono">
                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white flex items-center gap-1"
                      title="View GitHub Repository"
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#22D3EE] flex items-center gap-1"
                      title="Open Live Deployment"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#A1AAB8] hover:text-white"
                    title="Edit project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id, project.title)}
                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-[#A1AAB8] hover:text-red-400"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sandbox Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundFx.playChime(800, "triangle", 0.04, 0.15);
                    onRunSandbox(project);
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-mono font-bold bg-[#3478F6]/15 hover:bg-[#3478F6]/25 text-[#22D3EE] border border-[#3478F6]/30 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Sandbox</span>
                </button>
                <button
                  onClick={() => {
                    soundFx.playChime(850, "sine", 0.04, 0.15);
                    onOpenPreview(project);
                  }}
                  className="w-full py-2 px-3 rounded-xl text-xs font-mono font-medium bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/[0.08] transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Web Preview</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT PROJECT MODAL */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-white/[0.1] bg-[#121827] p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalMode(null)}
              className="absolute top-5 right-5 text-[#A1AAB8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-[#3478F6]" />
                <span>{modalMode === "create" ? "Create New Project" : "Edit Project Details"}</span>
              </h3>
              <p className="text-xs text-[#A1AAB8] font-mono mt-1">
                Enter your runnable repository information to publish to Developers App ecosystem.
              </p>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Project Name *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. WebGL GPU Neural Visualizer"
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-[#3478F6]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe architecture, algorithm, and runnable demo behavior..."
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-[#3478F6] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  >
                    <option value="Web Applications">Web Applications</option>
                    <option value="GPU Shaders & WebGL">GPU Shaders & WebGL</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Distributed Systems">Distributed Systems</option>
                    <option value="Smart Contracts">Smart Contracts</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Version</label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="1.0.0"
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Programming Languages (Comma separated)</label>
                <input
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  placeholder="TypeScript, Python, GLSL"
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#A1AAB8] uppercase font-bold">Technologies & Frameworks</label>
                <input
                  type="text"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="Next.js, WebGL2, Tailwind CSS, PyTorch"
                  className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Repository URL (Optional)</label>
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Live URL (Optional)</label>
                  <input
                    type="url"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Visibility</label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  >
                    <option value="public">Public (Showcased)</option>
                    <option value="private">Private (Only You)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#A1AAB8] uppercase font-bold">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-[#070910] border border-white/[0.08] rounded-xl text-white focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-mono text-[#A1AAB8] hover:text-white bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow"
                >
                  {modalMode === "create" ? "Publish Project" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
