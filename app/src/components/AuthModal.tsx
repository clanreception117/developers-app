"use client";

import React, { useState } from "react";
import {
  X,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle,
  User,
  Shield,
  Code2,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: "login" | "signup";
  onClose: () => void;
  onSuccess: (user: { name: string; email: string; tier: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = "signup",
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundFx.playChime(800, "sine", 0.05, 0.2);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => {
        onSuccess({
          name: name || "Developer",
          email: email || "dev@developersapp.io",
          tier: "Gold",
        });
        onClose();
        setSuccessMsg(false);
      }, 1000);
    }, 800);
  };

  const handleQuickDemoLogin = (role: "dev" | "recruiter") => {
    soundFx.playChime(900, "triangle", 0.05, 0.2);
    setSuccessMsg(true);
    setTimeout(() => {
      onSuccess({
        name: role === "dev" ? "Alex Rivers (Gold Dev)" : "Sarah Chen (Recruiter)",
        email: role === "dev" ? "alex@developersapp.io" : "sarah@techcorp.com",
        tier: role === "dev" ? "Gold" : "Recruiter",
      });
      onClose();
      setSuccessMsg(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-white/[0.12] bg-[#0A0C12] p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successMsg ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Authenticated!</h3>
            <p className="text-xs text-zinc-400">
              Welcome to Developers App. Synchronizing your profile &amp; sandboxes...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#287BFF]/20 to-[#8755FF]/20 border border-[#287BFF]/30 text-[11px] font-mono text-[#00D6FF]">
                <Sparkles className="w-3 h-3" />
                <span>DEVELOPERS APP ACCESS PASS</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {mode === "login" ? "Welcome Back to Developers App" : "Join the Developer Ecosystem"}
              </h3>
              <p className="text-xs text-zinc-400">
                {mode === "login"
                  ? "Access your live projects, marketplace sales & achievements."
                  : "Create your portfolio, publish runnable apps & enter competitions."}
              </p>
            </div>

            {/* Quick Demo Login Shortcuts */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block text-center">
                Instant Quick-Access Profiles
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("dev")}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-zinc-200 border border-white/[0.08] hover:border-[#287BFF]/40 transition-colors"
                >
                  ⚡ Demo Gold Dev
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("recruiter")}
                  className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-zinc-200 border border-white/[0.08] hover:border-[#8755FF]/40 transition-colors"
                >
                  💼 Demo Recruiter
                </button>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("dev")}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("dev")}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-red-400" />
                Google
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-600 font-mono">
              <div className="flex-1 h-[1px] bg-white/[0.08]" />
              <span>OR EMAIL</span>
              <div className="flex-1 h-[1px] bg-white/[0.08]" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "signup" && (
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivers"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#287BFF]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  Developer Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#287BFF]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#287BFF]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#287BFF] via-[#5B63F6] to-[#8755FF] hover:shadow-glow transition-all flex items-center justify-center gap-1.5"
              >
                <span>{mode === "login" ? "Sign In to Developers App" : "Create Developer Account"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Toggle Mode */}
            <div className="text-center pt-2">
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                {mode === "login" ? (
                  <>
                    New to the ecosystem? <span className="text-[#00D6FF] font-semibold">Join here</span>
                  </>
                ) : (
                  <>
                    Already have an account? <span className="text-[#287BFF] font-semibold">Log in</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
