"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Terminal,
  UserCheck,
  ShoppingBag,
  Trophy,
  Zap,
  Maximize2,
  ChevronDown,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface ScrollyAnimationProps {
  onOpenAuth: (mode: "login" | "signup") => void;
  onExploreClick: () => void;
}

const TOTAL_FRAMES = 300;

// Format frame index as 001, 002, ..., 300
const getFramePath = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `/animation/ezgif-frame-${padded}.jpg`;
};

export const ScrollyAnimation: React.FC<ScrollyAnimationProps> = ({
  onOpenAuth,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Cache of preloaded Image objects
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const targetFrameRef = useRef<number>(1);
  const displayedFrameRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const playTimerRef = useRef<number | null>(null);
  const lastSparkTriggered = useRef<boolean>(false);

  // Preload initial frames and progressive background loading
  useEffect(() => {
    let loadedCount = 0;
    const priorityBatch = 30; // First 30 frames for instant display

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        if (imagesRef.current.has(index)) {
          resolve();
          return;
        }
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          imagesRef.current.set(index, img);
          loadedCount++;
          setLoadProgress(Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100)));
          if (loadedCount >= 10 && !isLoaded) {
            setIsLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          // If a frame fails, still count to not block
          loadedCount++;
          resolve();
        };
      });
    };

    // Load initial batch first
    const loadInitial = async () => {
      const initialPromises = [];
      for (let i = 1; i <= priorityBatch; i++) {
        initialPromises.push(loadFrame(i));
      }
      await Promise.all(initialPromises);
      setIsLoaded(true);

      // Load remaining frames gradually
      for (let i = priorityBatch + 1; i <= TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    };

    loadInitial();
  }, [isLoaded]);

  // Canvas drawing routine
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find closest available frame
    let img = imagesRef.current.get(frameIndex);
    if (!img) {
      // Find nearest loaded frame
      for (let offset = 1; offset < 20; offset++) {
        if (imagesRef.current.has(frameIndex - offset)) {
          img = imagesRef.current.get(frameIndex - offset);
          break;
        }
        if (imagesRef.current.has(frameIndex + offset)) {
          img = imagesRef.current.get(frameIndex + offset);
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Set canvas dimensions respecting DPR
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#050608";
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Calculate aspect fit / cover
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = displayWidth / displayHeight;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX = 0;
    let offsetY = 0;

    // We use a high-end cinematic cover/contain hybrid to preserve 100% of the UI clarity
    if (displayWidth > 768) {
      // Desktop: Contain with subtle scale
      if (canvasAspect > imgAspect) {
        drawHeight = displayHeight * 0.94;
        drawWidth = drawHeight * imgAspect;
        offsetX = (displayWidth - drawWidth) / 2;
        offsetY = (displayHeight - drawHeight) / 2;
      } else {
        drawWidth = displayWidth * 0.96;
        drawHeight = drawWidth / imgAspect;
        offsetX = (displayWidth - drawWidth) / 2;
        offsetY = (displayHeight - drawHeight) / 2;
      }
    } else {
      // Mobile: Optimized fill
      drawHeight = displayHeight * 0.85;
      drawWidth = drawHeight * imgAspect;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = (displayHeight - drawHeight) / 2;
    }

    // Draw the high-res frame
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Subtle dark radial vignette around borders for cinematic depth
    const gradient = ctx.createRadialGradient(
      displayWidth / 2,
      displayHeight / 2,
      Math.min(displayWidth, displayHeight) * 0.4,
      displayWidth / 2,
      displayHeight / 2,
      Math.max(displayWidth, displayHeight) * 0.75
    );
    gradient.addColorStop(0, "rgba(5, 6, 8, 0)");
    gradient.addColorStop(1, "rgba(5, 6, 8, 0.75)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    ctx.restore();
  }, []);

  // Smooth frame interpolation loop (Lerp)
  useEffect(() => {
    const tick = () => {
      const current = displayedFrameRef.current;
      const target = targetFrameRef.current;

      // Smooth interpolation towards target frame
      const diff = target - current;
      if (Math.abs(diff) > 0.05) {
        displayedFrameRef.current = current + diff * 0.25;
      } else {
        displayedFrameRef.current = target;
      }

      const frameToDraw = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(displayedFrameRef.current)));
      renderFrame(frameToDraw);
      setCurrentFrame(frameToDraw);

      // Sound effect trigger at the glitch/break point (~frame 95-105)
      if (frameToDraw >= 95 && frameToDraw <= 105) {
        if (!lastSparkTriggered.current) {
          soundFx.playBreakoutSpark();
          lastSparkTriggered.current = true;
        }
      } else {
        lastSparkTriggered.current = false;
      }

      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Scroll position listener
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current) return; // Don't override if auto-playing
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (containerHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / containerHeight));
      setScrollProgress(progress);

      const target = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));
      targetFrameRef.current = target;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play preview mode
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;

      // If at end, loop to start
      if (targetFrameRef.current >= TOTAL_FRAMES - 2) {
        targetFrameRef.current = 1;
        displayedFrameRef.current = 1;
      }

      playTimerRef.current = window.setInterval(() => {
        targetFrameRef.current = (targetFrameRef.current % TOTAL_FRAMES) + 1;
        const progress = (targetFrameRef.current - 1) / (TOTAL_FRAMES - 1);
        setScrollProgress(progress);
      }, 33); // ~30 fps
    }
  };

  const handleReset = () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    targetFrameRef.current = 1;
    displayedFrameRef.current = 1;
    setScrollProgress(0);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scrub bar click/drag
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const scrubProgress = Math.max(0, Math.min(1, clickX / rect.width));
    const target = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + scrubProgress * (TOTAL_FRAMES - 1))));
    targetFrameRef.current = target;
    setScrollProgress(scrubProgress);

    // If container is active, sync page scroll
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      const topOffset = containerRef.current.offsetTop + scrubProgress * containerHeight;
      window.scrollTo({ top: topOffset, behavior: "auto" });
    }
  };

  // Determine current narrative beat
  // Beat 1: 0 - 15% (Frame 1 - 45) -> Hero Introduction
  // Beat 2: 15% - 35% (Frame 45 - 105) -> Connected Digital Matrix
  // Beat 3: 35% - 68% (Frame 105 - 204) -> Digital Breakout & Detachment
  // Beat 4: 68% - 100% (Frame 204 - 300) -> Layered Convergence
  const beat =
    scrollProgress < 0.16
      ? 1
      : scrollProgress < 0.36
      ? 2
      : scrollProgress < 0.68
      ? 3
      : 4;

  return (
    <section
      id="scrolly-story"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#050608]"
    >
      {/* Sticky Canvas & Storytelling Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#287BFF]/15 via-[#8755FF]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00D6FF]/5 blur-[100px] pointer-events-none rounded-full" />

        {/* 1. Main Canvas Area */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain pointer-events-none"
          />

          {/* Fallback & Initial Preload Overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050608]/90 backdrop-blur-md">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#287BFF]/20 to-[#8755FF]/20 border border-white/[0.1] flex items-center justify-center animate-pulse mb-4">
                <Sparkles className="w-8 h-8 text-[#00D6FF]" />
              </div>
              <p className="text-sm font-medium tracking-wide text-zinc-300">
                Initializing Developers App Cinematic Storytelling...
              </p>
              <div className="w-64 h-1.5 bg-white/[0.1] rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-[#287BFF] via-[#8755FF] to-[#00D6FF] transition-all duration-200"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-zinc-500 mt-2">
                Caching 300 Hi-Res Frames • {loadProgress}%
              </span>
            </div>
          )}
        </div>

        {/* 2. Top Status & Beat HUD Indicator */}
        <div className="relative z-10 pt-20 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0C12]/80 backdrop-blur-md border border-white/[0.08] shadow-glass">
            <span className="w-2 h-2 rounded-full bg-[#00D6FF] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider text-zinc-300 uppercase">
              {beat === 1 && "Phase 1: Initial Central Homepage"}
              {beat === 2 && "Phase 2: Connected Digital Matrix"}
              {beat === 3 && "Phase 3: Digital Pathway Breakout"}
              {beat === 4 && "Phase 4: Multi-Layered Convergence"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-[#0A0C12]/80 border border-white/[0.06] backdrop-blur-md">
              FRAME {String(currentFrame).padStart(3, "0")} / {TOTAL_FRAMES}
            </span>
          </div>
        </div>

        {/* 3. Center/Dynamic Narrative Storytelling Overlays */}
        <div className="relative z-10 flex-1 flex items-center pointer-events-none px-6 sm:px-12 lg:px-20">
          <div className="max-w-xl transition-all duration-500">
            {/* BEAT 1: HERO / INTRODUCTION (0 - 15%) */}
            {beat === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#287BFF]/15 to-[#8755FF]/15 border border-[#287BFF]/30 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#00D6FF]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#00D6FF]">
                    Next-Gen Platform
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                    Where Developers{" "}
                    <span className="text-gradient-accent">Build Their Future.</span>
                  </h1>
                  <p className="text-xl sm:text-2xl font-medium text-zinc-300">
                    Build. Showcase. Compete. Sell. Get Hired.
                  </p>
                </div>

                <p className="text-base text-zinc-400 leading-relaxed max-w-lg">
                  One ecosystem connecting developers, opportunities, and innovation. An all-in-one developer social network, interactive portfolio, project marketplace, and multi-college hackathon arena.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3.5 pointer-events-auto">
                  <button
                    onClick={() => {
                      soundFx.playChime(600, "triangle", 0.05, 0.2);
                      onExploreClick();
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#287BFF] to-[#8755FF] text-white text-sm font-semibold hover:shadow-glow transition-all duration-300 group"
                  >
                    Explore Developers App
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playChime(500, "sine", 0.04, 0.15);
                      onOpenAuth("signup");
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white text-sm font-semibold border border-white/[0.12] backdrop-blur-md transition-all duration-200"
                  >
                    Discover the Platform
                  </button>
                </div>

                {/* Scroll Down Prompt */}
                <div className="pt-6 flex items-center gap-3 text-xs text-zinc-500 font-mono">
                  <div className="w-5 h-8 rounded-full border border-zinc-600 flex items-start justify-center p-1">
                    <div className="w-1 h-2 rounded-full bg-[#00D6FF] animate-bounce" />
                  </div>
                  <span>Scroll to initiate digital breakout</span>
                </div>
              </div>
            )}

            {/* BEAT 2: CONNECTED ECOSYSTEM (15 - 35%) */}
            {beat === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#050608]/75 p-6 sm:p-8 rounded-3xl border border-white/[0.1] backdrop-blur-xl shadow-glass">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#287BFF]/10 border border-[#287BFF]/30">
                  <Zap className="w-3.5 h-3.5 text-[#287BFF]" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#287BFF]">
                    Interconnected Architecture
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  One Platform. <br />
                  <span className="text-gradient-accent">Endless Possibilities.</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Everything developers need to turn their ideas into real opportunities. Glowing digital pathways connect the central homepage directly into every core module of your engineering journey.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-lg font-bold text-white">8 Engines</div>
                    <div className="text-xs text-zinc-400">Unified into one interface</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-lg font-bold text-[#00D6FF]">Zero Setup</div>
                    <div className="text-xs text-zinc-400">Live app preview execution</div>
                  </div>
                </div>
              </div>
            )}

            {/* BEAT 3: DIGITAL BREAKOUT (35 - 68%) */}
            {beat === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#050608]/80 p-6 sm:p-8 rounded-3xl border border-[#287BFF]/30 backdrop-blur-xl shadow-[0_0_50px_rgba(40,123,255,0.2)]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8755FF]/20 border border-[#8755FF]/40">
                  <Layers className="w-3.5 h-3.5 text-[#8755FF] animate-spin" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8755FF]">
                    Active Screen Decoupling
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Your Work Deserves More Than{" "}
                  <span className="text-gradient-accent">A Repository.</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Showcase working applications, connect with the right people, and turn your code into opportunities. From your first project to your next career milestone, everything happens in one place.
                </p>

                {/* Real-time Status Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    ✓ Social Feed Detached
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    ✓ Interactive Portfolio Advancing
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    ✓ Live Sandbox Approaching
                  </span>
                </div>
              </div>
            )}

            {/* BEAT 4: CONVERGENCE & LAYERED STACK (68 - 100%) */}
            {beat === 4 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-[#050608]/85 p-6 sm:p-8 rounded-3xl border border-white/[0.12] backdrop-blur-2xl shadow-glass">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
                    Ecosystem Converged
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                  Integrated Digital{" "}
                  <span className="text-gradient-accent">Product Architecture.</span>
                </h2>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  Multiple powerful platforms unified into one seamless developer operating system. The original central homepage transforms into a living, overlapping multi-screen universe.
                </p>

                <div className="pt-2 flex flex-wrap gap-2.5 pointer-events-auto">
                  <button
                    onClick={onExploreClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#287BFF] to-[#8755FF] text-white text-xs font-semibold hover:shadow-glow transition-all"
                  >
                    Inspect Platform Modules
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenAuth("signup")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold border border-white/[0.1] transition-all"
                  >
                    Claim Dev Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Bottom Apple-style Interactive Timeline & Scrubber Controls */}
        <div className="relative z-20 pb-6 px-4 sm:px-10 pointer-events-auto">
          <div className="max-w-4xl mx-auto p-3 sm:p-4 rounded-2xl bg-[#0A0C12]/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col gap-2.5">
            {/* Upper row: Play/Pause button, reset, phase labels */}
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium transition-colors"
                  title={isPlaying ? "Pause automated playback" : "Auto-play cinematic reveal"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#00D6FF]" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#287BFF]" />
                      <span>PLAY DEMO</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors"
                  title="Reset to frame 1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <span className="hidden md:inline text-[11px] text-zinc-500 font-mono">
                  SCROLL OR DRAG SCRUBBER
                </span>
              </div>

              {/* 4 Phase Markers */}
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono">
                <span className={beat === 1 ? "text-[#00D6FF] font-bold" : "text-zinc-500"}>
                  1. Homepage
                </span>
                <span className="text-zinc-700">→</span>
                <span className={beat === 2 ? "text-[#00D6FF] font-bold" : "text-zinc-500"}>
                  2. Matrix
                </span>
                <span className="text-zinc-700">→</span>
                <span className={beat === 3 ? "text-[#00D6FF] font-bold" : "text-zinc-500"}>
                  3. Breakout
                </span>
                <span className="text-zinc-700">→</span>
                <span className={beat === 4 ? "text-[#00D6FF] font-bold" : "text-zinc-500"}>
                  4. Layered Stack
                </span>
              </div>

              <div className="font-mono text-xs text-zinc-300">
                {Math.round(scrollProgress * 100)}%
              </div>
            </div>

            {/* Scrub Progress Track */}
            <div
              onClick={handleScrub}
              className="relative w-full h-3 bg-white/[0.06] hover:bg-white/[0.1] rounded-full cursor-pointer transition-colors group"
            >
              {/* Active fill */}
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#287BFF] via-[#8755FF] to-[#00D6FF] relative"
                style={{ width: `${scrollProgress * 100}%` }}
              >
                {/* Scrub knob */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_12px_#00D6FF] border-2 border-[#287BFF] scale-90 group-hover:scale-110 transition-transform" />
              </div>

              {/* Phase milestone markers on track */}
              <div className="absolute top-0 bottom-0 left-[16%] w-[1px] bg-white/20" title="Phase 2 Start" />
              <div className="absolute top-0 bottom-0 left-[36%] w-[1px] bg-white/20" title="Phase 3 Breakout" />
              <div className="absolute top-0 bottom-0 left-[68%] w-[1px] bg-white/20" title="Phase 4 Convergence" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
