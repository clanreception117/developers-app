"use client";

import React, { useState } from "react";
import {
  Code2,
  Building2,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Lock,
  Mail,
  Phone,
  Calendar,
  Layers,
  ShieldCheck,
  Check,
  ChevronRight,
  Globe2,
  Terminal,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";
import { AuthUser, DeveloperProfile, OrganizationProfile, UserRole } from "../types";
import { DEFAULT_DEVELOPER, DEFAULT_ORGANIZATION } from "../lib/appState";

interface WelcomeStageProps {
  onAuthenticated: (user: AuthUser, destination: "landing" | "dashboard") => void;
  onExploreAsGuest?: () => void;
  onBackToLanding?: () => void;
  initialRole?: UserRole | null;
  initialView?: "login" | "signup";
}

export const WelcomeStage: React.FC<WelcomeStageProps> = ({
  onAuthenticated,
  onExploreAsGuest,
  onBackToLanding,
  initialRole = null,
  initialView = "signup",
}) => {
  // Selected user type: "developer" | "organization" | null (initial choice screen)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialRole);
  const [authView, setAuthView] = useState<"login" | "signup">(initialView);

  // Common UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Legal Modal
  const [legalModalOpen, setLegalModalOpen] = useState<"terms" | "privacy" | null>(null);

  // Login inputs
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Developer Signup fields (all 8 required fields)
  const [devFullName, setDevFullName] = useState("");
  const [devEmail, setDevEmail] = useState("");
  const [devPhone, setDevPhone] = useState("");
  const [devDob, setDevDob] = useState("");
  const [devSpecialization, setDevSpecialization] = useState("Full-Stack & WebGL Systems");
  const [devUsername, setDevUsername] = useState("");
  const [devPassword, setDevPassword] = useState("");
  const [devConfirmPassword, setDevConfirmPassword] = useState("");

  // Organization Signup fields (all 9 required fields)
  const [orgName, setOrgName] = useState("");
  const [orgCeoName, setOrgCeoName] = useState("");
  const [orgEstDate, setOrgEstDate] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgType, setOrgType] = useState<"Product-based" | "Service-based" | "Other">("Product-based");
  const [orgUsername, setOrgUsername] = useState("");
  const [orgPassword, setOrgPassword] = useState("");
  const [orgConfirmPassword, setOrgConfirmPassword] = useState("");

  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "None", color: "bg-zinc-700" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { score: 50, label: "Fair", color: "bg-yellow-500" };
    if (score === 3) return { score: 75, label: "Good", color: "bg-[#3478F6]" };
    return { score: 100, label: "Strong", color: "bg-emerald-400" };
  };

  const currentPassStrength = getPasswordStrength(
    authView === "signup"
      ? selectedRole === "developer"
        ? devPassword
        : orgPassword
      : ""
  );

  // Handle Developer Signup
  const handleDeveloperSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (devPassword !== devConfirmPassword) {
      setFormError("Passwords do not match.");
      soundFx.playChime(300, "sawtooth", 0.05, 0.2);
      return;
    }
    if (devPassword.length < 8) {
      setFormError("Password must be at least 8 characters.");
      soundFx.playChime(300, "sawtooth", 0.05, 0.2);
      return;
    }
    if (!termsAccepted) {
      setFormError("Please accept the Terms and Conditions to proceed.");
      return;
    }

    setIsSubmitting(true);
    soundFx.playChime(880, "triangle", 0.06, 0.25);

    setTimeout(() => {
      const newDev: DeveloperProfile = {
        fullName: devFullName,
        email: devEmail,
        phone: devPhone,
        dob: devDob,
        specialization: devSpecialization,
        username: devUsername.toLowerCase().replace(/\s+/g, ""),
        role: "developer",
        avatarUrl: devFullName.slice(0, 2).toUpperCase(),
        tier: "Bronze",
        bio: `Specializing in ${devSpecialization}. Exploring projects on Developers App.`,
        stats: {
          profileViews: 1,
          projectViews: 0,
          engagementRate: 100,
          globalRank: "New Member",
          totalEarnings: 0,
          projectsCount: 0,
        },
      };

      setIsSubmitting(false);
      onAuthenticated(newDev, "landing");
    }, 800);
  };

  // Handle Organization Signup
  const handleOrganizationSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (orgPassword !== orgConfirmPassword) {
      setFormError("Passwords do not match.");
      soundFx.playChime(300, "sawtooth", 0.05, 0.2);
      return;
    }
    if (orgPassword.length < 8) {
      setFormError("Password must be at least 8 characters.");
      soundFx.playChime(300, "sawtooth", 0.05, 0.2);
      return;
    }
    if (!termsAccepted) {
      setFormError("Please accept the Terms and Conditions to proceed.");
      return;
    }

    setIsSubmitting(true);
    soundFx.playChime(880, "triangle", 0.06, 0.25);

    setTimeout(() => {
      const newOrg: OrganizationProfile = {
        orgName,
        ceoName: orgCeoName,
        establishedDate: orgEstDate,
        officialEmail: orgEmail,
        orgType,
        username: orgUsername.toLowerCase().replace(/\s+/g, ""),
        role: "organization",
        avatarUrl: orgName.slice(0, 2).toUpperCase(),
        bio: `${orgType} company scouting high-caliber engineers on Developers App.`,
        stats: {
          jobsPosted: 0,
          developersHired: 0,
          hackathonsSponsored: 0,
          activeContracts: 0,
        },
      };

      setIsSubmitting(false);
      onAuthenticated(newOrg, "landing");
    }, 800);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!loginIdentifier || !loginPassword) {
      setFormError("Please enter your login credentials.");
      return;
    }

    setIsSubmitting(true);
    soundFx.playChime(800, "sine", 0.05, 0.2);

    setTimeout(() => {
      setIsSubmitting(false);
      if (selectedRole === "organization") {
        onAuthenticated(
          {
            ...DEFAULT_ORGANIZATION,
            orgName: loginIdentifier.includes("@")
              ? "Verified Enterprise"
              : loginIdentifier,
          },
          "dashboard"
        );
      } else {
        onAuthenticated(
          {
            ...DEFAULT_DEVELOPER,
            fullName: loginIdentifier.includes("@")
              ? "Alex Rivers"
              : loginIdentifier,
          },
          "dashboard"
        );
      }
    }, 700);
  };

  // Development-only shortcuts (hidden in production per prompt rules)
  const isDevMode = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

  const handleQuickDemo = (role: UserRole) => {
    soundFx.playChime(950, "triangle", 0.05, 0.2);
    if (role === "developer") {
      onAuthenticated(DEFAULT_DEVELOPER, "dashboard");
    } else {
      onAuthenticated(DEFAULT_ORGANIZATION, "dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070910] text-[#F8FAFC] flex flex-col justify-between relative overflow-x-hidden selection:bg-[#3478F6]/40 selection:text-white">
      {/* Background ambient radial gradients & fine dot matrix (Referencing Nucleus UI) */}
      <div className="absolute inset-0 bg-dot-grid opacity-35 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#3478F6]/18 via-[#8055F5]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#22D3EE]/6 blur-[140px] pointer-events-none rounded-full" />
      
      {/* Abstract orbital background lines (subtle homage to Nucleus image) */}
      <div className="absolute top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.03] rounded-full pointer-events-none" />
      <div className="absolute top-44 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] border border-white/[0.02] rounded-full pointer-events-none" />

      {/* PART 2A: REFINED HEADER (Promethist-style top bar with breadcrumb) */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#3478F6] via-[#5B63F6] to-[#8055F5] p-[1.5px] shadow-[0_0_25px_rgba(52,120,246,0.4)]">
            <div className="w-full h-full rounded-[14px] bg-[#070910] flex items-center justify-center text-[#22D3EE]">
              <Code2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white">
                Developers App
              </span>
              <span className="text-xs text-zinc-500 font-mono">/</span>
              <span className="text-xs text-blue-400 font-mono font-medium">
                Workspace Selection
              </span>
            </div>
            <p className="text-[11px] text-[#A1AAB8] font-mono">
              Bridging the Gap Between Codes and Developers' Showcase.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="text-xs font-mono font-medium text-zinc-300 hover:text-white px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all flex items-center gap-2"
            >
              <span>← Back to Landing Page</span>
            </button>
          )}

          {onExploreAsGuest && (
            <button
              onClick={onExploreAsGuest}
              className="text-xs font-mono font-medium text-zinc-300 hover:text-white px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#3478F6]/40 transition-all flex items-center gap-2 group shadow-sm"
            >
              <span>Explore Public Showcase</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#22D3EE]" />
            </button>
          )}
        </div>
      </header>

      {/* PART 2B: LARGE IMPRESSIVE HERO SECTION (Promethist-style: Choose Your Workspace) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-5xl mx-auto space-y-12">
          {/* Hero Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-inner">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#22D3EE]">
                ROLE-BASED WORKSPACE SELECTION
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Choose Your Workspace
            </h1>

            <p className="text-base sm:text-xl font-medium text-[#A1AAB8] max-w-2xl mx-auto leading-relaxed">
              Select how you want to experience Developers App. Your workspace will be customized according to your role.
            </p>
          </div>

          {/* PART 2C & 2D: ACCOUNT SELECTION CARDS (Reference: Promethist UI) */}
          {!selectedRole ? (
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A1AAB8]">
                  Select your workspace to enter your specialized environment
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* 1. DEVELOPER WORKSPACE CARD */}
                <div className="p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#121827] hover:bg-[#171E2C] hover:border-[#3478F6]/50 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between group relative overflow-hidden">
                  {/* Subtle Top Accent Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3478F6] to-[#22D3EE]" />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#3478F6]/15 border border-[#3478F6]/30 flex items-center justify-center text-[#3478F6] group-hover:scale-110 group-hover:text-[#22D3EE] transition-all shadow-glow">
                        <Code2 className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#3478F6]/15 text-[#22D3EE] border border-[#3478F6]/30 uppercase">
                        CREATOR TRACK
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Developer Workspace
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1AAB8] mt-2.5 leading-relaxed">
                        For programmers, students, freelancers, open-source contributors and software professionals.
                      </p>
                    </div>

                    {/* Feature Highlights (All 6 Highlights) */}
                    <ul className="space-y-2.5 pt-2 text-xs text-zinc-300 font-mono">
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#3478F6]/20 flex items-center justify-center text-[#22D3EE] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Personal Developer Portfolio</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#3478F6]/20 flex items-center justify-center text-[#22D3EE] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Project Upload and Live Preview</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#3478F6]/20 flex items-center justify-center text-[#22D3EE] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Achievements and Certificates</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#3478F6]/20 flex items-center justify-center text-[#22D3EE] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Hackathons and Competitions</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#3478F6]/20 flex items-center justify-center text-[#22D3EE] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Recruitment Opportunities</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#3478F6]/20 flex items-center justify-center text-[#22D3EE] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Developer Community</span>
                      </li>
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="pt-8 mt-8 border-t border-white/[0.08] grid grid-cols-2 gap-3.5">
                    <button
                      onClick={() => {
                        soundFx.playChime(650, "sine", 0.04, 0.1);
                        setSelectedRole("developer");
                        setAuthView("login");
                      }}
                      className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.2] transition-colors"
                    >
                      Login as Developer
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playChime(850, "triangle", 0.05, 0.2);
                        setSelectedRole("developer");
                        setAuthView("signup");
                      }}
                      className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow transition-all"
                    >
                      Create Developer Account
                    </button>
                  </div>
                </div>

                {/* 2. ORGANIZATION WORKSPACE CARD */}
                <div className="p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#121827] hover:bg-[#171E2C] hover:border-[#8055F5]/50 transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between group relative overflow-hidden">
                  {/* Subtle Top Accent Highlight */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8055F5] to-[#C9A44C]" />

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#8055F5]/15 border border-[#8055F5]/30 flex items-center justify-center text-[#8055F5] group-hover:scale-110 group-hover:text-purple-300 transition-all shadow-glow-violet">
                        <Building2 className="w-7 h-7" />
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#8055F5]/15 text-purple-300 border border-[#8055F5]/30 uppercase">
                        TALENT &amp; SPONSOR
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Organization Workspace
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A1AAB8] mt-2.5 leading-relaxed">
                        For companies, recruiters, startups, hackathon organizers and small businesses.
                      </p>
                    </div>

                    {/* Feature Highlights (All 6 Highlights) */}
                    <ul className="space-y-2.5 pt-2 text-xs text-zinc-300 font-mono">
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#8055F5]/20 flex items-center justify-center text-[#C9A44C] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Discover Verified Developer Talent</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#8055F5]/20 flex items-center justify-center text-[#C9A44C] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Recruit Through Real Projects</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#8055F5]/20 flex items-center justify-center text-[#C9A44C] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Organize Hackathons</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#8055F5]/20 flex items-center justify-center text-[#C9A44C] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Sponsor Developer Competitions</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#8055F5]/20 flex items-center justify-center text-[#C9A44C] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Publish Hiring Opportunities</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-[#8055F5]/20 flex items-center justify-center text-[#C9A44C] shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[#F8FAFC]">Find Technical Solutions</span>
                      </li>
                    </ul>
                  </div>

                  {/* Buttons */}
                  <div className="pt-8 mt-8 border-t border-white/[0.08] grid grid-cols-2 gap-3.5">
                    <button
                      onClick={() => {
                        soundFx.playChime(650, "sine", 0.04, 0.1);
                        setSelectedRole("organization");
                        setAuthView("login");
                      }}
                      className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.2] transition-colors"
                    >
                      Login as Organization
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playChime(850, "triangle", 0.05, 0.2);
                        setSelectedRole("organization");
                        setAuthView("signup");
                      }}
                      className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8055F5] to-[#3478F6] hover:shadow-glow-violet transition-all"
                    >
                      Create Organization Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Dev-Only Evaluation Mode (Protected: only visible on localhost) */}
              {isDevMode && (
                <div className="max-w-xl mx-auto p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Development Shortcut:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuickDemo("developer")}
                      className="px-3 py-1 rounded-lg bg-[#3478F6]/15 hover:bg-[#3478F6]/25 text-[#22D3EE] border border-[#3478F6]/30 transition-colors"
                    >
                      ⚡ Gold Developer
                    </button>
                    <button
                      onClick={() => handleQuickDemo("organization")}
                      className="px-3 py-1 rounded-lg bg-[#8055F5]/15 hover:bg-[#8055F5]/25 text-purple-300 border border-[#8055F5]/30 transition-colors"
                    >
                      💼 Enterprise Org
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* DEDICATED AUTHENTICATION EXPERIENCE (DEVELOPER OR ORGANIZATION) */
            <div className="max-w-xl mx-auto w-full p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#121827] shadow-card space-y-6 animate-in fade-in duration-300">
              {/* Back to Choice */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <button
                  onClick={() => {
                    setSelectedRole(null);
                    setFormError(null);
                  }}
                  className="text-xs font-mono text-[#A1AAB8] hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  ← Choose Different Account
                </button>

                <span
                  className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase ${
                    selectedRole === "developer"
                      ? "bg-[#3478F6]/15 text-[#22D3EE] border border-[#3478F6]/30"
                      : "bg-[#8055F5]/15 text-purple-300 border border-[#8055F5]/30"
                  }`}
                >
                  {selectedRole === "developer" ? "Developer Experience" : "Organization Experience"}
                </span>
              </div>

              {/* View Switcher: Log In vs Sign Up */}
              <div className="grid grid-cols-2 p-1.5 bg-[#070910] rounded-xl border border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => {
                    setAuthView("login");
                    setFormError(null);
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    authView === "login"
                      ? "bg-[#3478F6] text-white shadow-sm"
                      : "text-[#A1AAB8] hover:text-white"
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthView("signup");
                    setFormError(null);
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    authView === "signup"
                      ? "bg-[#8055F5] text-white shadow-sm"
                      : "text-[#A1AAB8] hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error Alert */}
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* VIEW: LOGIN FORM */}
              {authView === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#A1AAB8] mb-1 font-mono">
                      {selectedRole === "developer" ? "Developer Email or Username" : "Official Org Email or Username"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder={selectedRole === "developer" ? "alex@example.com" : "recruiting@company.com"}
                        className="w-full pl-10 pr-4 py-3 bg-[#070910] border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#3478F6] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[#A1AAB8] font-mono">Password</label>
                      <button
                        type="button"
                        onClick={() => alert("Password reset instructions dispatched to registered address.")}
                        className="text-[11px] text-[#22D3EE] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-10 py-3 bg-[#070910] border border-white/[0.08] rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#3478F6] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#A1AAB8]">
                      <input
                        type="checkbox"
                        checked={keepMeSignedIn}
                        onChange={(e) => setKeepMeSignedIn(e.target.checked)}
                        className="rounded border-zinc-700 bg-white/[0.04] text-[#3478F6]"
                      />
                      <span>Keep Me Signed In</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{isSubmitting ? "Authenticating..." : `Sign In as ${selectedRole === "developer" ? "Developer" : "Organization"}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : selectedRole === "developer" ? (
                /* DEVELOPER SIGNUP FORM (All 8 mandatory fields) */
                <form onSubmit={handleDeveloperSignup} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">1. Full Name</label>
                      <input
                        type="text"
                        required
                        value={devFullName}
                        onChange={(e) => setDevFullName(e.target.value)}
                        placeholder="e.g. Alex Rivers"
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">2. Email Address</label>
                      <input
                        type="email"
                        required
                        value={devEmail}
                        onChange={(e) => setDevEmail(e.target.value)}
                        placeholder="alex@example.com"
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">3. Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={devPhone}
                        onChange={(e) => setDevPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">4. Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={devDob}
                        onChange={(e) => setDevDob(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">5. Specialization</label>
                      <select
                        value={devSpecialization}
                        onChange={(e) => setDevSpecialization(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#0E121D] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                      >
                        <option value="Full-Stack & WebGL Systems">Full-Stack &amp; WebGL Systems</option>
                        <option value="AI Autonomous Agents & LLMs">AI Autonomous Agents &amp; LLMs</option>
                        <option value="Distributed Microservices & Cloud">Distributed Microservices &amp; Cloud</option>
                        <option value="Zero-Knowledge & FinTech">Zero-Knowledge &amp; FinTech</option>
                        <option value="Mobile Engineering (iOS / Android)">Mobile Engineering (iOS / Android)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">6. Unique Username</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">@</span>
                        <input
                          type="text"
                          required
                          value={devUsername}
                          onChange={(e) => setDevUsername(e.target.value)}
                          placeholder="alexrivers"
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">7. Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={devPassword}
                          onChange={(e) => setDevPassword(e.target.value)}
                          placeholder="Min. 8 characters"
                          className="w-full p-2.5 pr-8 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">8. Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={devConfirmPassword}
                          onChange={(e) => setDevConfirmPassword(e.target.value)}
                          placeholder="Confirm password"
                          className="w-full p-2.5 pr-8 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#3478F6]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  {devPassword && (
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-zinc-500">Security Strength:</span>
                        <span className="text-zinc-300 font-bold">{currentPassStrength.label}</span>
                      </div>
                      <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${currentPassStrength.color} transition-all duration-300`}
                          style={{ width: `${currentPassStrength.score}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Terms */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2 cursor-pointer text-[#A1AAB8] text-xs">
                      <input
                        type="checkbox"
                        required
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 rounded border-zinc-700 bg-white/[0.04] text-[#3478F6]"
                      />
                      <span>
                        I agree to the Developers App Terms of Service, Sandbox Security Standards, and Merit Badging Guidelines.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:shadow-glow transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{isSubmitting ? "Creating Developer Profile..." : "Register Developer Account"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* ORGANIZATION SIGNUP FORM (All 9 mandatory fields) */
                <form onSubmit={handleOrganizationSignup} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">1. Organization Name</label>
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        placeholder="e.g. Vercel Systems Inc."
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">2. Founder / CEO Name</label>
                      <input
                        type="text"
                        required
                        value={orgCeoName}
                        onChange={(e) => setOrgCeoName(e.target.value)}
                        placeholder="e.g. Guillermo Rauch"
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">3. Establishment Date</label>
                      <input
                        type="date"
                        required
                        value={orgEstDate}
                        onChange={(e) => setOrgEstDate(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">4. Official Org Email</label>
                      <input
                        type="email"
                        required
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        placeholder="recruiting@company.com"
                        className="w-full p-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">5. Organization Type</label>
                      <select
                        value={orgType}
                        onChange={(e) => setOrgType(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl bg-[#0E121D] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                      >
                        <option value="Product-based">Product-based Enterprise</option>
                        <option value="Service-based">Service-based Agency / Consultancy</option>
                        <option value="Other">University / Non-Profit / Hackathon Sponsor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">6. Organization Handle</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-mono">@</span>
                        <input
                          type="text"
                          required
                          value={orgUsername}
                          onChange={(e) => setOrgUsername(e.target.value)}
                          placeholder="companyhandle"
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">7. Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          required
                          value={orgPassword}
                          onChange={(e) => setOrgPassword(e.target.value)}
                          placeholder="Min. 8 characters"
                          className="w-full p-2.5 pr-8 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#A1AAB8] mb-1 font-mono">8. Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={orgConfirmPassword}
                          onChange={(e) => setOrgConfirmPassword(e.target.value)}
                          placeholder="Confirm password"
                          className="w-full p-2.5 pr-8 rounded-xl bg-[#070910] border border-white/[0.08] text-white focus:outline-none focus:border-[#8055F5]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2 cursor-pointer text-[#A1AAB8] text-xs">
                      <input
                        type="checkbox"
                        required
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="mt-0.5 rounded border-zinc-700 bg-white/[0.04] text-[#8055F5]"
                      />
                      <span>
                        I confirm I am an authorized corporate officer and agree to Developers App Institutional Terms.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-[#8055F5] to-[#3478F6] hover:shadow-glow-violet transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{isSubmitting ? "Creating Organization..." : "Register Organization Account"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </main>

      {/* PART 2F: ELEVATED FOOTER */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A1AAB8] font-mono">
        <div>
          © 2026 Developers App Inc. All rights reserved.
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setLegalModalOpen("terms")}
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Terms &amp; Conditions
          </button>
          <button
            onClick={() => setLegalModalOpen("privacy")}
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            License &amp; IP Agreement
          </button>
        </div>

        <div className="text-zinc-400">
          "Bridging the Gap Between Codes and Developers' Showcase."
        </div>
      </footer>

      {/* Legal Popover Modal */}
      {legalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/[0.1] bg-[#121827] p-6 shadow-2xl relative space-y-4">
            <h4 className="text-base font-bold text-white">
              {legalModalOpen === "terms" ? "Developers App Terms of Service" : "Developers App Intellectual Property Agreement"}
            </h4>
            <p className="text-xs text-[#A1AAB8] leading-relaxed">
              Developers retain 100% intellectual ownership of all software repositories and sandbox prototypes uploaded to Developers App. Our isolated runtime execution containers preserve developer autonomy, prevent arbitrary server execution, and ensure transparent merit grading.
            </p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setLegalModalOpen(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#3478F6]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
