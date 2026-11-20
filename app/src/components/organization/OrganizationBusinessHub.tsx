"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Users,
  Briefcase,
  Bookmark,
  Activity,
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  CheckCircle2,
  Clock,
  DollarSign,
  Trophy,
  ShieldCheck,
  Star,
  ChevronRight,
  Code2,
  Terminal,
  Send,
  MessageSquare,
  FileText,
  Download,
  X,
  Edit3,
  Trash2,
  Eye,
  Layers,
  Sparkles,
  ArrowUpRight,
  LogOut,
  RefreshCw,
  Share2,
  Check,
} from "lucide-react";
import { soundFx } from "../../lib/audioAtmosphere";
import {
  AuthUser,
  OrganizationProfile,
  DeveloperProfile,
  HiringOpportunity,
  OpportunityApplication,
  OrganizationPurchase,
  Project,
} from "../../types";
import { dataStore, DEFAULT_ORG_CONTACT } from "../../lib/dataStore";
import { DEFAULT_ORGANIZATION, DEFAULT_DEVELOPER } from "../../lib/appState";

interface OrganizationBusinessHubProps {
  currentUser: AuthUser;
  onSwitchUser?: (newUser: AuthUser) => void;
  onLogout: () => void;
  onNavigateToLanding: () => void;
  onOpenDeveloperPreview?: (project: Project) => void;
}

export type OrgTab =
  | "overview"
  | "discover-talent"
  | "opportunities"
  | "saved"
  | "activities";

export const OrganizationBusinessHub: React.FC<OrganizationBusinessHubProps> = ({
  currentUser,
  onSwitchUser,
  onLogout,
  onNavigateToLanding,
}) => {
  // Navigation
  const [activeTab, setActiveTab] = useState<OrgTab>("overview");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Panels
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [purchasesModalOpen, setPurchasesModalOpen] = useState(false);
  const [messagesModalOpen, setMessagesModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [createJobModalOpen, setCreateJobModalOpen] = useState(false);
  const [applicantViewerOpen, setApplicantViewerOpen] = useState<OpportunityApplication | null>(null);
  const [selectedDeveloperProfile, setSelectedDeveloperProfile] = useState<DeveloperProfile | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  // Organization state & Profile
  const orgUsername = currentUser.username || "vercelsystems";
  const [orgProfile, setOrgProfile] = useState<OrganizationProfile>(() => {
    return {
      orgName: (currentUser as any).orgName || "Vercel Systems",
      ceoName: (currentUser as any).ceoName || "Guillermo Rauch",
      establishedDate: (currentUser as any).establishedDate || "2020-11-01",
      officialEmail: (currentUser as any).officialEmail || DEFAULT_ORG_CONTACT.officialEmail,
      orgType: (currentUser as any).orgType || "Product-based",
      username: orgUsername,
      role: "organization",
      avatarUrl: (currentUser as any).avatarUrl || "VS",
      bio: "Global cloud edge network empowering developers to deploy full-stack applications with instantaneous elasticity.",
      stats: {
        jobsPosted: 4,
        developersHired: 12,
        hackathonsSponsored: 3,
        activeContracts: 4,
      },
    };
  });

  const [orgContact, setOrgContact] = useState(DEFAULT_ORG_CONTACT);

  // Data Store Sync
  const [opportunities, setOpportunities] = useState<HiringOpportunity[]>([]);
  const [applications, setApplications] = useState<OpportunityApplication[]>([]);
  const [purchases, setPurchases] = useState<OrganizationPurchase[]>([]);
  const [discoverableDevs, setDiscoverableDevs] = useState<DeveloperProfile[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<string[]>([]);
  const [savedProjects, setSavedProjects] = useState<string[]>([]);

  // Talent Discovery filters
  const [talentSearch, setTalentSearch] = useState("");
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>("All");
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>("All");

  // Create Job Form
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobCategory, setNewJobCategory] = useState<string>("Full-Time");
  const [newJobType, setNewJobType] = useState<HiringOpportunity["type"]>("Full-time");
  const [newJobSkills, setNewJobSkills] = useState("");
  const [newJobComp, setNewJobComp] = useState("$160,000 - $190,000 / yr");
  const [newJobDesc, setNewJobDesc] = useState("");
  const [newJobLocation, setNewJobLocation] = useState("Remote / Global");
  const [newJobDeadline, setNewJobDeadline] = useState("2026-12-31");

  // Messaging Thread state
  const [activeMessageDev, setActiveMessageDev] = useState<string>("erostova");
  const [messageInput, setMessageInput] = useState("");
  const [chatLog, setChatLog] = useState<Record<string, { sender: "org" | "dev"; text: string; time: string }[]>>({
    erostova: [
      {
        sender: "dev",
        text: "Hello! Thank you for reviewing my Zero-Knowledge Rollup benchmark submission.",
        time: "10:14 AM",
      },
      {
        sender: "org",
        text: "Elena, your 14ms verification throughput benchmark was outstanding. We would like to schedule a technical architecture discussion with our founders.",
        time: "10:20 AM",
      },
    ],
    alexrivers: [
      {
        sender: "dev",
        text: "Hi Vercel team, I updated the WebGL GPU Neural Visualizer to support dynamic particle clustering.",
        time: "Yesterday",
      },
      {
        sender: "org",
        text: "Received! We ran the sandbox execution pipeline and it passed all automated 60 FPS constraints.",
        time: "Yesterday",
      },
    ],
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Load Initial Data
  useEffect(() => {
    refreshAllData();
  }, [orgUsername]);

  const refreshAllData = () => {
    setOpportunities(dataStore.getOpportunities());
    setApplications(dataStore.getApplications());
    setPurchases(dataStore.getPurchases());
    setDiscoverableDevs(dataStore.getDiscoverableDevelopers());
    setSavedCandidates(dataStore.getSavedCandidates(orgUsername));
    setSavedProjects(dataStore.getSavedProjects(orgUsername));
  };

  // Toggle Save Candidate
  const handleToggleSaveCandidate = (devUsername: string) => {
    soundFx.playChime(750, "sine", 0.04, 0.15);
    const isSaved = dataStore.toggleSaveCandidate(orgUsername, devUsername);
    setSavedCandidates(dataStore.getSavedCandidates(orgUsername));
    showToast(isSaved ? `Candidate @${devUsername} saved to your talent pipeline` : `Candidate @${devUsername} removed from saved`);
  };

  // Toggle Save Project
  const handleToggleSaveProject = (projectId: string) => {
    soundFx.playChime(750, "sine", 0.04, 0.15);
    const isSaved = dataStore.toggleSaveProject(orgUsername, projectId);
    setSavedProjects(dataStore.getSavedProjects(orgUsername));
    showToast(isSaved ? "Project saved to your organization bookmarks" : "Project removed from bookmarks");
  };

  // Handle Create Opportunity
  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobTitle.trim() || !newJobDesc.trim()) {
      showToast("Please provide job title and technical description");
      return;
    }

    const skillsArray = newJobSkills
      ? newJobSkills.split(",").map((s) => s.trim()).filter(Boolean)
      : ["TypeScript", "Next.js", "Docker"];

    const newOpp: HiringOpportunity = {
      id: `opp-${Date.now()}`,
      orgUsername: orgProfile.username,
      orgName: orgProfile.orgName,
      title: newJobTitle,
      type: newJobType,
      skillsRequired: skillsArray,
      compensation: newJobComp,
      description: newJobDesc,
      location: newJobLocation,
      remote: true,
      deadline: newJobDeadline,
      status: "Open",
      createdAt: new Date().toISOString().split("T")[0],
      applicantsCount: 0,
    };

    dataStore.saveOpportunity(newOpp);
    refreshAllData();
    soundFx.playChime(880, "triangle", 0.06, 0.25);
    setCreateJobModalOpen(false);
    showToast(`Opportunity "${newJobTitle}" published to Developers App!`);

    // Reset Form
    setNewJobTitle("");
    setNewJobSkills("");
    setNewJobDesc("");
  };

  // Close / Reopen Opportunity
  const handleToggleOppStatus = (opp: HiringOpportunity) => {
    const updatedStatus: HiringOpportunity["status"] = opp.status === "Open" ? "Closed" : "Open";
    dataStore.saveOpportunity({ ...opp, status: updatedStatus });
    refreshAllData();
    soundFx.playChime(700, "sine", 0.04, 0.15);
    showToast(`Opportunity marked as ${updatedStatus}`);
  };

  // Update Application Status
  const handleUpdateAppStatus = (appId: string, newStatus: OpportunityApplication["status"]) => {
    dataStore.updateApplicationStatus(appId, newStatus);
    refreshAllData();
    soundFx.playChime(850, "sine", 0.05, 0.2);
    showToast(`Candidate status updated to: ${newStatus}`);
    if (applicantViewerOpen?.id === appId) {
      setApplicantViewerOpen((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Send Direct Message
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const current = chatLog[activeMessageDev] || [];
    const newMsg = {
      sender: "org" as const,
      text: messageInput.trim(),
      time: "Just now",
    };
    setChatLog({
      ...chatLog,
      [activeMessageDev]: [...current, newMsg],
    });
    setMessageInput("");
    soundFx.playChime(900, "triangle", 0.04, 0.15);
  };

  // Filtered Talent List
  const filteredTalent = discoverableDevs.filter((dev) => {
    const matchesSearch =
      dev.fullName.toLowerCase().includes(talentSearch.toLowerCase()) ||
      dev.username.toLowerCase().includes(talentSearch.toLowerCase()) ||
      dev.specialization.toLowerCase().includes(talentSearch.toLowerCase()) ||
      dev.bio.toLowerCase().includes(talentSearch.toLowerCase());

    const matchesTier = selectedTierFilter === "All" || dev.tier === selectedTierFilter;

    const matchesSkill =
      selectedSkillFilter === "All" ||
      dev.specialization.toLowerCase().includes(selectedSkillFilter.toLowerCase());

    return matchesSearch && matchesTier && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-[#070910] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#3478F6]/30 selection:text-[#22D3EE]">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#171E2C] border border-[#3478F6]/40 text-[#22D3EE] text-xs font-mono shadow-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-[#22D3EE] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          TOP NAVIGATION BAR (As in Handwritten Prototype)
          [Logo & Org Name] [My Contact] [My Purchases] [Messages] [My Profile] [Logout]
      ========================================================================= */}
      <header className="h-16 sticky top-0 z-40 bg-[#0D111B]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Organization Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToLanding}
            className="flex items-center gap-2 group text-left"
            title="Developers App Ecosystem"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3478F6] via-[#8055F5] to-[#22D3EE] p-[1.5px] shadow-lg shadow-[#3478F6]/20">
              <div className="w-full h-full bg-[#0D111B] rounded-[10px] flex items-center justify-center font-black text-xs text-white group-hover:scale-105 transition-transform">
                {orgProfile.avatarUrl}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#22D3EE] transition-colors">
                  {orgProfile.orgName}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="text-[10px] font-mono text-[#A1AAB8] tracking-wider uppercase">
                {orgProfile.orgType} • Enterprise Hub
              </div>
            </div>
          </button>

          <span className="hidden md:inline-block text-white/[0.15]">/</span>
          <span className="hidden md:inline-block text-xs font-mono text-[#22D3EE] bg-[#3478F6]/10 px-2.5 py-0.5 rounded-md border border-[#3478F6]/25">
            Business Hub
          </span>
        </div>

        {/* Center/Right: Action Buttons from Prototype */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 1. My Contact */}
          <button
            onClick={() => {
              soundFx.playChime(600, "sine", 0.03, 0.1);
              setContactModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#A1AAB8] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-[#3478F6]" />
            <span className="hidden sm:inline">My Contact</span>
          </button>

          {/* 2. My Purchases */}
          <button
            onClick={() => {
              soundFx.playChime(650, "sine", 0.03, 0.1);
              setPurchasesModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#A1AAB8] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">My Purchases</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse hidden sm:inline-block" />
          </button>

          {/* 3. Messages */}
          <button
            onClick={() => {
              soundFx.playChime(700, "sine", 0.03, 0.1);
              setMessagesModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#A1AAB8] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all relative"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#8055F5]" />
            <span className="hidden sm:inline">Messages</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-[#8055F5] text-white font-bold">
              2
            </span>
          </button>

          {/* 4. My Profile */}
          <button
            onClick={() => {
              soundFx.playChime(750, "sine", 0.03, 0.1);
              setProfileModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-[#A1AAB8] hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#22D3EE]" />
            <span className="hidden sm:inline">My Profile</span>
          </button>

          <div className="h-5 w-[1px] bg-white/[0.1] mx-1" />

          {/* Developer View Toggle */}
          <button
            onClick={() => {
              soundFx.playChime(800, "triangle", 0.05, 0.2);
              if (onSwitchUser) onSwitchUser(DEFAULT_DEVELOPER);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono text-[#22D3EE] bg-[#22D3EE]/10 border border-[#22D3EE]/30 hover:bg-[#22D3EE]/20 transition-colors"
            title="Switch to Developer Mode"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Dev Mode</span>
          </button>

          {/* Sign Out */}
          <button
            onClick={() => {
              soundFx.playChime(350, "sine", 0.05, 0.2);
              onLogout();
            }}
            className="p-2 rounded-xl text-[#A1AAB8] hover:text-red-400 hover:bg-red-500/10 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN 3-COLUMN WORKSPACE
          [LEFT: Business Hub Nav] [MIDDLE: Dynamic Content] [RIGHT: Org Profile Panel]
      ========================================================================= */}
      <div className="flex-1 flex max-w-[1700px] w-full mx-auto overflow-hidden">
        {/* -----------------------------------------------------------------------
            LEFT NAVIGATION COLUMN — BUSINESS HUB
            Width: ~240px
        ----------------------------------------------------------------------- */}
        <aside className="w-56 lg:w-64 shrink-0 bg-[#0D111B] border-r border-white/[0.08] p-4 flex flex-col justify-between hidden md:flex">
          <div className="space-y-6">
            <div className="px-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#A1AAB8]/70 font-semibold">
                Business Hub
              </span>
            </div>

            <nav className="space-y-1.5">
              {/* 1. Overview */}
              <button
                onClick={() => {
                  soundFx.playChime(600, "sine", 0.02, 0.1);
                  setActiveTab("overview");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "overview"
                    ? "bg-[#3478F6] text-white font-semibold shadow-lg shadow-[#3478F6]/25"
                    : "text-[#A1AAB8] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4" />
                  <span>Overview</span>
                </div>
                {activeTab === "overview" && <ChevronRight className="w-3.5 h-3.5" />}
              </button>

              {/* 2. Discover Talent */}
              <button
                onClick={() => {
                  soundFx.playChime(650, "sine", 0.02, 0.1);
                  setActiveTab("discover-talent");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "discover-talent"
                    ? "bg-[#3478F6] text-white font-semibold shadow-lg shadow-[#3478F6]/25"
                    : "text-[#A1AAB8] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Discover Talent</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.1] text-zinc-300">
                  {discoverableDevs.length}
                </span>
              </button>

              {/* 3. Jobs & Opportunities */}
              <button
                onClick={() => {
                  soundFx.playChime(700, "sine", 0.02, 0.1);
                  setActiveTab("opportunities");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "opportunities"
                    ? "bg-[#3478F6] text-white font-semibold shadow-lg shadow-[#3478F6]/25"
                    : "text-[#A1AAB8] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4" />
                  <span>Jobs & Opportunities</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.1] text-zinc-300">
                  {opportunities.length}
                </span>
              </button>

              {/* 4. Saved */}
              <button
                onClick={() => {
                  soundFx.playChime(750, "sine", 0.02, 0.1);
                  setActiveTab("saved");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "saved"
                    ? "bg-[#3478F6] text-white font-semibold shadow-lg shadow-[#3478F6]/25"
                    : "text-[#A1AAB8] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className="w-4 h-4" />
                  <span>Saved</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.1] text-zinc-300">
                  {savedCandidates.length + savedProjects.length}
                </span>
              </button>

              {/* 5. My Activities */}
              <button
                onClick={() => {
                  soundFx.playChime(800, "sine", 0.02, 0.1);
                  setActiveTab("activities");
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "activities"
                    ? "bg-[#3478F6] text-white font-semibold shadow-lg shadow-[#3478F6]/25"
                    : "text-[#A1AAB8] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="w-4 h-4" />
                  <span>My Activities</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Quick CTA to post a job */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#121827] to-[#171E2C] border border-white/[0.08] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3EE]" />
              <span className="text-xs font-bold text-white">Direct Technical Hire</span>
            </div>
            <p className="text-[11px] text-[#A1AAB8] leading-relaxed">
              Require sandbox code benchmark pass before interviews.
            </p>
            <button
              onClick={() => {
                soundFx.playChime(850, "triangle", 0.05, 0.2);
                setCreateJobModalOpen(true);
              }}
              className="w-full py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:opacity-95 shadow-md shadow-[#3478F6]/20 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post Opportunity</span>
            </button>
          </div>
        </aside>

        {/* -----------------------------------------------------------------------
            MIDDLE COLUMN — DYNAMIC BUSINESS HUB CONTENT
            Flex: 1
        ----------------------------------------------------------------------- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Mobile Tab Bar */}
          <div className="flex md:hidden overflow-x-auto pb-2 gap-2 border-b border-white/[0.08]">
            {(["overview", "discover-talent", "opportunities", "saved", "activities"] as OrgTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap capitalize ${
                  activeTab === tab
                    ? "bg-[#3478F6] text-white"
                    : "text-[#A1AAB8] bg-white/[0.04]"
                }`}
              >
                {tab.replace("-", " ")}
              </button>
            ))}
          </div>

          {/* ===================================================================
              TAB 1: OVERVIEW
          =================================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121827] via-[#171E2C] to-[#0D111B] border border-white/[0.08] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#3478F6]/10 blur-[100px] pointer-events-none rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-[#3478F6]/15 text-[#22D3EE] border border-[#3478F6]/30 mb-3">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>VERIFIED ENTERPRISE RECRUITER</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      Welcome back, {orgProfile.orgName}
                    </h2>
                    <p className="text-sm text-[#A1AAB8] mt-1.5 max-w-xl leading-relaxed">
                      Your technical talent pipeline is active. Review incoming sandbox submissions, evaluate GPU benchmark scores, and hire verified engineers.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCreateJobModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:opacity-95 shadow-lg shadow-[#3478F6]/25 transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Post New Role</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("discover-talent")}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
                    >
                      Search Talent
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[#A1AAB8]">
                    <span className="text-xs font-mono uppercase tracking-wider">Talent In Network</span>
                    <Users className="w-4 h-4 text-[#3478F6]" />
                  </div>
                  <div className="text-2xl font-black text-white">284</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span>↑ 18 this week</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[#A1AAB8]">
                    <span className="text-xs font-mono uppercase tracking-wider">Saved Talent</span>
                    <Bookmark className="w-4 h-4 text-[#8055F5]" />
                  </div>
                  <div className="text-2xl font-black text-white">{savedCandidates.length}</div>
                  <div className="text-[11px] text-[#A1AAB8]">
                    Across {savedProjects.length} bookmarked projects
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[#A1AAB8]">
                    <span className="text-xs font-mono uppercase tracking-wider">Active Openings</span>
                    <Briefcase className="w-4 h-4 text-[#22D3EE]" />
                  </div>
                  <div className="text-2xl font-black text-white">{opportunities.length}</div>
                  <div className="text-[11px] text-[#22D3EE]">
                    {applications.length} submissions received
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[#A1AAB8]">
                    <span className="text-xs font-mono uppercase tracking-wider">Active Contracts</span>
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">4</div>
                  <div className="text-[11px] text-emerald-400">Escrow protected</div>
                </div>
              </div>

              {/* Recent Applicants Section */}
              <div className="p-6 rounded-3xl bg-[#121827] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Recent Technical Applications</h3>
                    <p className="text-xs text-[#A1AAB8]">
                      Candidates who submitted runnable code deliverables for review.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("opportunities")}
                    className="text-xs font-mono text-[#22D3EE] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      className="p-4 rounded-2xl bg-[#171E2C] border border-white/[0.06] hover:border-[#3478F6]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3478F6] to-[#8055F5] flex items-center justify-center font-bold text-sm text-white">
                          {app.developerName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{app.developerName}</span>
                            <span className="text-xs font-mono text-[#A1AAB8]">@{app.developerUsername}</span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 font-bold">
                              {app.developerTier} Dev
                            </span>
                          </div>
                          <div className="text-xs text-[#A1AAB8] mt-0.5">
                            Applied for: <span className="text-white font-medium">{app.opportunityTitle}</span> • {app.appliedAt}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                            app.status === "Shortlisted"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : app.status === "Accepted"
                              ? "bg-[#3478F6]/20 text-[#22D3EE] border border-[#3478F6]/30"
                              : "bg-white/[0.06] text-zinc-300"
                          }`}
                        >
                          {app.status}
                        </span>

                        <button
                          onClick={() => {
                            soundFx.playChime(700, "sine", 0.03, 0.1);
                            setApplicantViewerOpen(app);
                          }}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-white bg-[#3478F6] hover:bg-[#3478F6]/90 transition-colors flex items-center gap-1.5"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Inspect Code</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 2: DISCOVER TALENT
          =================================================================== */}
          {activeTab === "discover-talent" && (
            <div className="space-y-6">
              {/* Search & Filters */}
              <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#A1AAB8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search talent by name, @handle, specialization (WebGL, Rust, AI)..."
                      value={talentSearch}
                      onChange={(e) => setTalentSearch(e.target.value)}
                      className="w-full bg-[#171E2C] border border-white/[0.08] focus:border-[#3478F6] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl outline-none placeholder-[#A1AAB8]/50"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Tier Filter */}
                    <select
                      value={selectedTierFilter}
                      onChange={(e) => setSelectedTierFilter(e.target.value)}
                      className="bg-[#171E2C] border border-white/[0.08] text-xs font-mono text-white px-3 py-2.5 rounded-xl outline-none"
                    >
                      <option value="All">All Tiers</option>
                      <option value="Gold">Gold Dev Only</option>
                      <option value="Silver">Silver Dev Only</option>
                      <option value="Bronze">Bronze Dev Only</option>
                    </select>

                    {/* Skill Filter */}
                    <select
                      value={selectedSkillFilter}
                      onChange={(e) => setSelectedSkillFilter(e.target.value)}
                      className="bg-[#171E2C] border border-white/[0.08] text-xs font-mono text-white px-3 py-2.5 rounded-xl outline-none"
                    >
                      <option value="All">All Stacks</option>
                      <option value="WebGL">WebGL & GPU</option>
                      <option value="ZK">ZK & Cryptography</option>
                      <option value="Systems">Distributed Systems</option>
                      <option value="AI">AI Agents</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#A1AAB8]">
                  <span>Showing {filteredTalent.length} verified technical profiles</span>
                  <span className="font-mono text-[#22D3EE]">Real-time Sandbox Validated</span>
                </div>
              </div>

              {/* Developer Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTalent.map((dev) => {
                  const isSaved = savedCandidates.includes(dev.username);
                  return (
                    <div
                      key={dev.username}
                      className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] hover:border-[#3478F6]/40 transition-all space-y-4 relative group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3478F6] via-[#8055F5] to-[#22D3EE] p-[1.5px]">
                            <div className="w-full h-full bg-[#121827] rounded-[10px] flex items-center justify-center font-bold text-sm text-white">
                              {dev.avatarUrl}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                                {dev.fullName}
                              </h4>
                              <span
                                className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
                                  dev.tier === "Gold"
                                    ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30"
                                    : dev.tier === "Silver"
                                    ? "bg-slate-300/20 text-slate-200 border border-slate-300/30"
                                    : "bg-amber-800/20 text-amber-500 border border-amber-800/30"
                                }`}
                              >
                                {dev.tier} Dev
                              </span>
                            </div>
                            <div className="text-xs font-mono text-[#A1AAB8]">@{dev.username}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleSaveCandidate(dev.username)}
                          className={`p-2 rounded-xl border transition-all ${
                            isSaved
                              ? "bg-[#3478F6]/20 border-[#3478F6] text-[#22D3EE]"
                              : "bg-white/[0.03] border-white/[0.08] text-[#A1AAB8] hover:text-white"
                          }`}
                          title={isSaved ? "Remove from Saved" : "Save Candidate"}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-xs text-[#A1AAB8] leading-relaxed line-clamp-2">
                        {dev.bio}
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3 font-mono text-[11px] text-[#A1AAB8]">
                          <span>{dev.stats.projectsCount} projects</span>
                          <span>•</span>
                          <span>Rank: {dev.stats.globalRank}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setActiveMessageDev(dev.username);
                              setMessagesModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-colors"
                          >
                            Contact
                          </button>
                          <button
                            onClick={() => setSelectedDeveloperProfile(dev)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#3478F6] hover:bg-[#3478F6]/90 transition-colors flex items-center gap-1"
                          >
                            <span>Profile</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 3: JOBS & OPPORTUNITIES
          =================================================================== */}
          {activeTab === "opportunities" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Technical Opportunities</h3>
                  <p className="text-xs text-[#A1AAB8]">
                    Manage active hiring requisitions and review incoming applicant benchmarks.
                  </p>
                </div>
                <button
                  onClick={() => setCreateJobModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] hover:opacity-95 shadow-md shadow-[#3478F6]/25 transition-all flex items-center gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Opportunity</span>
                </button>
              </div>

              {/* Opportunities List */}
              <div className="space-y-4">
                {opportunities.map((opp) => {
                  const oppApps = applications.filter((a) => a.opportunityId === opp.id);
                  return (
                    <div
                      key={opp.id}
                      className="p-6 rounded-3xl bg-[#121827] border border-white/[0.08] hover:border-[#3478F6]/30 transition-all space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <h4 className="text-base font-bold text-white">{opp.title}</h4>
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                opp.status === "Open"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-red-500/20 text-red-400 border border-red-500/30"
                              }`}
                            >
                              {opp.status}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#3478F6]/20 text-[#22D3EE] border border-[#3478F6]/30">
                              {opp.type}
                            </span>
                          </div>
                          <div className="text-xs text-[#A1AAB8] mt-1 flex items-center gap-4">
                            <span>{opp.location}</span>
                            <span>•</span>
                            <span className="text-emerald-400 font-mono font-bold">{opp.compensation}</span>
                            <span>•</span>
                            <span>Deadline: {opp.deadline}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleOppStatus(opp)}
                            className="px-3 py-1.5 rounded-xl text-xs font-mono text-[#A1AAB8] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
                          >
                            {opp.status === "Open" ? "Close Role" : "Reopen Role"}
                          </button>
                        </div>
                      </div>

                      <p className="text-xs text-[#A1AAB8] leading-relaxed">
                        {opp.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(opp.skillsRequired || (opp as any).skills || ["TypeScript"]).map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#171E2C] text-[#22D3EE] border border-white/[0.06]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Applicants row */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#3478F6]" />
                          <span className="font-bold text-white">{oppApps.length} Applicants</span>
                          <span className="text-[#A1AAB8]">with validated code</span>
                        </div>

                        {oppApps.length > 0 && (
                          <div className="flex items-center gap-2">
                            {oppApps.map((a) => (
                              <button
                                key={a.id}
                                onClick={() => setApplicantViewerOpen(a)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-[#3478F6]/15 hover:bg-[#3478F6]/25 text-[#22D3EE] border border-[#3478F6]/30 transition-colors"
                              >
                                {a.developerName.split(" ")[0]} ({a.status})
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 4: SAVED (Candidates & Projects)
          =================================================================== */}
          {activeTab === "saved" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Saved Talent & Projects</h3>
                <p className="text-xs text-[#A1AAB8]">
                  Candidates bookmarked for future hiring requisitions and saved open-source repositories.
                </p>
              </div>

              {/* Saved Developers */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1AAB8] font-bold">
                  Saved Candidates ({savedCandidates.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {discoverableDevs
                    .filter((d) => savedCandidates.includes(d.username))
                    .map((dev) => (
                      <div
                        key={dev.username}
                        className="p-4 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-3 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#3478F6] to-[#8055F5] flex items-center justify-center font-bold text-xs text-white">
                              {dev.avatarUrl}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-white">{dev.fullName}</div>
                              <div className="text-xs font-mono text-[#A1AAB8]">@{dev.username}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleToggleSaveCandidate(dev.username)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Remove from saved"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs text-[#A1AAB8] line-clamp-2">
                          {dev.bio}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                          <span className="text-[11px] font-mono text-[#22D3EE]">{dev.tier} Dev</span>
                          <button
                            onClick={() => {
                              setActiveMessageDev(dev.username);
                              setMessagesModalOpen(true);
                            }}
                            className="text-xs font-mono text-[#3478F6] hover:underline"
                          >
                            Send Message →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Saved Projects */}
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#A1AAB8] font-bold">
                  Bookmarked Projects ({savedProjects.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dataStore
                    .getProjects()
                    .filter((p) => savedProjects.includes(p.id))
                    .map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-3 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-[#22D3EE]" />
                            <span className="text-sm font-bold text-white">{proj.title}</span>
                          </div>
                          <button
                            onClick={() => handleToggleSaveProject(proj.id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-xs text-[#A1AAB8] line-clamp-2">
                          {proj.description}
                        </p>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.06]">
                          <span className="font-mono text-[#A1AAB8]">by @{proj.ownerUsername}</span>
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-[#3478F6] hover:underline flex items-center gap-1"
                          >
                            <span>Inspect Code</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================
              TAB 5: MY ACTIVITIES
          =================================================================== */}
          {activeTab === "activities" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">Activity Log & Milestones</h3>
                <p className="text-xs text-[#A1AAB8]">
                  Verified chronological ledger of hiring actions, contract escrows, and opportunity publications.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    action: "Purchased Project License",
                    detail: "Next.js Zero-Knowledge Block Explorer (Commercial License #LIC-9021)",
                    amount: "$450.00 USD",
                    time: "Today, 11:20 AM",
                    icon: DollarSign,
                    color: "text-emerald-400",
                  },
                  {
                    action: "Candidate Shortlisted",
                    detail: "Elena Rostova (@erostova) for Senior Distributed Systems role",
                    amount: "Benchmark 14ms Pass",
                    time: "Yesterday, 4:15 PM",
                    icon: CheckCircle2,
                    color: "text-[#3478F6]",
                  },
                  {
                    action: "Opportunity Published",
                    detail: "Lead WebGL GPU Performance Architect ($180K/yr)",
                    amount: "Active Requisition",
                    time: "Nov 14, 2026",
                    icon: Plus,
                    color: "text-[#8055F5]",
                  },
                  {
                    action: "Escrow Milestone Released",
                    detail: "Contract #CTR-4412 for GPU Neural Visualizer v2.4 upgrade",
                    amount: "$8,500.00 USD",
                    time: "Nov 10, 2026",
                    icon: ShieldCheck,
                    color: "text-emerald-400",
                  },
                ].map((act, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#121827] border border-white/[0.08] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                        <act.icon className={`w-4 h-4 ${act.color}`} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{act.action}</div>
                        <div className="text-xs text-[#A1AAB8]">{act.detail}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white">{act.amount}</div>
                      <div className="text-[10px] text-[#A1AAB8] font-mono">{act.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* -----------------------------------------------------------------------
            RIGHT COLUMN — ORGANIZATION PROFILE PANEL (From Prototype)
            Width: ~300px
        ----------------------------------------------------------------------- */}
        <aside className="w-72 lg:w-80 shrink-0 bg-[#0D111B] border-l border-white/[0.08] p-5 space-y-6 hidden xl:block overflow-y-auto">
          {/* Org Header Card */}
          <div className="p-5 rounded-2xl bg-[#121827] border border-white/[0.08] text-center space-y-3 relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3478F6] via-[#8055F5] to-[#22D3EE] p-[2px] mx-auto shadow-xl shadow-[#3478F6]/20">
              <div className="w-full h-full bg-[#121827] rounded-[14px] flex items-center justify-center font-black text-xl text-white">
                {orgProfile.avatarUrl}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5">
                <h4 className="text-base font-bold text-white">{orgProfile.orgName}</h4>
                <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
              </div>
              <div className="text-xs font-mono text-[#A1AAB8] mt-0.5">
                CEO: {orgProfile.ceoName}
              </div>
            </div>

            <p className="text-xs text-[#A1AAB8] leading-relaxed line-clamp-3">
              {orgProfile.bio}
            </p>

            <button
              onClick={() => setProfileModalOpen(true)}
              className="w-full py-1.5 rounded-xl text-xs font-medium text-[#22D3EE] bg-[#3478F6]/10 hover:bg-[#3478F6]/20 border border-[#3478F6]/25 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          {/* Org Contact Overview */}
          <div className="p-4 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A1AAB8] font-bold">
                Official Contact
              </span>
              <button
                onClick={() => setContactModalOpen(true)}
                className="text-[10px] text-[#22D3EE] font-mono hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#A1AAB8]">
                <Mail className="w-3.5 h-3.5 text-[#3478F6] shrink-0" />
                <span className="truncate">{orgContact.officialEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-[#A1AAB8]">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{orgContact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#A1AAB8]">
                <Globe className="w-3.5 h-3.5 text-[#8055F5] shrink-0" />
                <a
                  href={orgContact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white truncate"
                >
                  {orgContact.website.replace("https://", "")}
                </a>
              </div>
            </div>
          </div>

          {/* Org Key Stats */}
          <div className="p-4 rounded-2xl bg-[#121827] border border-white/[0.08] space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A1AAB8] font-bold">
              Hiring Stats
            </span>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#171E2C] border border-white/[0.04]">
                <div className="text-base font-bold text-white">{orgProfile.stats.developersHired}</div>
                <div className="text-[10px] text-[#A1AAB8]">Hired</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171E2C] border border-white/[0.04]">
                <div className="text-base font-bold text-emerald-400">{orgProfile.stats.activeContracts}</div>
                <div className="text-[10px] text-[#A1AAB8]">Contracts</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171E2C] border border-white/[0.04]">
                <div className="text-base font-bold text-[#22D3EE]">{orgProfile.stats.hackathonsSponsored}</div>
                <div className="text-[10px] text-[#A1AAB8]">Hackathons</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#171E2C] border border-white/[0.04]">
                <div className="text-base font-bold text-white">{opportunities.length}</div>
                <div className="text-[10px] text-[#A1AAB8]">Requisitions</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* =========================================================================
          MODAL 1: MY CONTACT MODAL (From Prototype)
      ========================================================================= */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121827] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1AAB8] hover:text-white hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3478F6]/20 border border-[#3478F6]/30 flex items-center justify-center text-[#22D3EE]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Organization Contact Information</h3>
                <p className="text-xs text-[#A1AAB8]">Verified contact points for applicants & developers</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Official Email</label>
                <input
                  type="email"
                  value={orgContact.officialEmail}
                  onChange={(e) => setOrgContact({ ...orgContact, officialEmail: e.target.value })}
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Official Phone</label>
                <input
                  type="text"
                  value={orgContact.phone}
                  onChange={(e) => setOrgContact({ ...orgContact, phone: e.target.value })}
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Physical Headquarters</label>
                <input
                  type="text"
                  value={orgContact.address}
                  onChange={(e) => setOrgContact({ ...orgContact, address: e.target.value })}
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Representative</label>
                  <input
                    type="text"
                    value={orgContact.representativeName}
                    onChange={(e) => setOrgContact({ ...orgContact, representativeName: e.target.value })}
                    className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Role / Title</label>
                  <input
                    type="text"
                    value={orgContact.representativeRole}
                    onChange={(e) => setOrgContact({ ...orgContact, representativeRole: e.target.value })}
                    className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Official Website</label>
                <input
                  type="url"
                  value={orgContact.website}
                  onChange={(e) => setOrgContact({ ...orgContact, website: e.target.value })}
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setContactModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-[#A1AAB8] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  soundFx.playChime(880, "triangle", 0.05, 0.2);
                  setContactModalOpen(false);
                  showToast("Contact information updated successfully!");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#3478F6] hover:bg-[#3478F6]/90 shadow-lg shadow-[#3478F6]/25"
              >
                Save Contact Points
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: MY PURCHASES (From Prototype)
      ========================================================================= */}
      {purchasesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#121827] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] flex flex-col">
            <button
              onClick={() => setPurchasesModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1AAB8] hover:text-white hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Organization Purchases & Escrows</h3>
                <p className="text-xs text-[#A1AAB8]">Project licenses, milestone escrows, and hackathon bounties</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {purchases.map((pur) => (
                <div
                  key={pur.id}
                  className="p-4 rounded-2xl bg-[#171E2C] border border-white/[0.06] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{pur.title}</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">
                      ${(pur.amountUsd ?? (pur as any).amount ?? 0).toLocaleString()} USD
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#A1AAB8]">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05]">
                        {pur.itemType || (pur as any).category || "Project License"}
                      </span>
                      <span>Invoice: {pur.invoiceNumber}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        pur.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-[#3478F6]/20 text-[#22D3EE]"
                      }`}
                    >
                      {pur.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[11px] text-[#A1AAB8]">
                    <span>Beneficiary: {pur.beneficiaryName || (pur as any).sellerUsername || "Alex Rivers"} • {pur.date}</span>
                    <button
                      onClick={() => {
                        soundFx.playChime(800, "sine", 0.04, 0.15);
                        showToast(`Invoice ${pur.invoiceNumber} PDF downloaded.`);
                      }}
                      className="text-[#22D3EE] hover:underline flex items-center gap-1 font-mono"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: MESSAGES (From Prototype)
      ========================================================================= */}
      {messagesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl h-[600px] bg-[#121827] border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <button
              onClick={() => setMessagesModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl text-[#A1AAB8] hover:text-white hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Threads */}
            <div className="w-full md:w-64 bg-[#0D111B] border-r border-white/[0.08] p-4 flex flex-col">
              <span className="text-xs font-mono uppercase tracking-wider text-[#A1AAB8] font-bold mb-3">
                Talent Chats
              </span>
              <div className="space-y-1.5 flex-1 overflow-y-auto">
                {[
                  { user: "erostova", name: "Elena Rostova", tier: "Gold", preview: "Elena, your 14ms throughput..." },
                  { user: "alexrivers", name: "Alex Rivers", tier: "Gold", preview: "Received! We ran the sandbox..." },
                ].map((thread) => (
                  <button
                    key={thread.user}
                    onClick={() => setActiveMessageDev(thread.user)}
                    className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-2.5 ${
                      activeMessageDev === thread.user
                        ? "bg-[#3478F6] text-white"
                        : "hover:bg-white/[0.04] text-[#A1AAB8]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/[0.1] flex items-center justify-center font-bold text-xs text-white">
                      {thread.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{thread.name}</div>
                      <div className="text-[10px] opacity-75 truncate">{thread.preview}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Chat Pane */}
            <div className="flex-1 flex flex-col bg-[#121827]">
              {/* Chat Header */}
              <div className="h-14 px-6 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {activeMessageDev === "erostova" ? "Elena Rostova" : "Alex Rivers"}
                  </span>
                  <span className="text-xs font-mono text-[#22D3EE]">@{activeMessageDev}</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {(chatLog[activeMessageDev] || []).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${msg.sender === "org" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === "org"
                          ? "bg-[#3478F6] text-white rounded-tr-none"
                          : "bg-[#171E2C] text-zinc-200 border border-white/[0.06] rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] font-mono text-[#A1AAB8] mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/[0.08] flex gap-2">
                <input
                  type="text"
                  placeholder="Type message to candidate..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-[#171E2C] border border-white/[0.08] text-xs text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2.5 bg-[#3478F6] hover:bg-[#3478F6]/90 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 4: CREATE OPPORTUNITY MODAL
      ========================================================================= */}
      {createJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121827] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setCreateJobModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1AAB8] hover:text-white hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3478F6]/20 border border-[#3478F6]/30 flex items-center justify-center text-[#22D3EE]">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Publish Technical Requisition</h3>
                <p className="text-xs text-[#A1AAB8]">Target top verified developers on Developers App</p>
              </div>
            </div>

            <form onSubmit={handleCreateOpportunity} className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Lead GPU Shader Engineer"
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  required
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Employment Type</label>
                  <select
                    value={newJobType}
                    onChange={(e) => setNewJobType(e.target.value as any)}
                    className="w-full bg-[#171E2C] border border-white/[0.08] text-xs font-mono text-white px-3 py-2.5 rounded-xl outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Bounty">Bounty</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Compensation</label>
                  <input
                    type="text"
                    value={newJobComp}
                    onChange={(e) => setNewJobComp(e.target.value)}
                    className="w-full bg-[#171E2C] border border-white/[0.08] text-xs text-white px-3 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">
                  Required Technologies (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="TypeScript, WebGL, Rust, Next.js"
                  value={newJobSkills}
                  onChange={(e) => setNewJobSkills(e.target.value)}
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-xs text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">
                  Job Description & Technical Challenge
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe role responsibilities, deliverables, and benchmark requirements..."
                  value={newJobDesc}
                  onChange={(e) => setNewJobDesc(e.target.value)}
                  required
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-xs text-white p-3 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateJobModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-medium text-[#A1AAB8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8055F5] shadow-lg shadow-[#3478F6]/25 hover:opacity-95"
                >
                  Publish Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 5: APPLICANT CODE & SUBMISSION VIEWER
      ========================================================================= */}
      {applicantViewerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#121827] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setApplicantViewerOpen(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1AAB8] hover:text-white hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#3478F6] to-[#8055F5] flex items-center justify-center font-bold text-white">
                {applicantViewerOpen.developerName.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{applicantViewerOpen.developerName}</h3>
                  <span className="text-xs font-mono text-[#22D3EE]">@{applicantViewerOpen.developerUsername}</span>
                </div>
                <div className="text-xs text-[#A1AAB8]">
                  Applied for: {applicantViewerOpen.opportunityTitle} • {applicantViewerOpen.submittedAt || (applicantViewerOpen as any).appliedAt || "Recent"}
                </div>
              </div>
            </div>

            {/* Note & Cover letter */}
            <div className="p-4 rounded-2xl bg-[#171E2C] border border-white/[0.06] space-y-2">
              <span className="text-xs font-mono uppercase text-[#A1AAB8] font-bold">Candidate Submission Note</span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {applicantViewerOpen.coverNote || (applicantViewerOpen as any).note || "Technical benchmark submission attached."}
              </p>
            </div>

            {/* Submitted Sandbox Code */}
            {(applicantViewerOpen.sandboxCodeSnippet || (applicantViewerOpen as any).sandboxSnippet) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A1AAB8]">Submitted Sandbox Implementation</span>
                  <span className="text-[#22D3EE]">Executable in Developers App</span>
                </div>
                <pre className="p-4 rounded-2xl bg-[#0A0D16] border border-white/[0.08] font-mono text-xs text-emerald-300 overflow-x-auto">
                  {applicantViewerOpen.sandboxCodeSnippet || (applicantViewerOpen as any).sandboxSnippet}
                </pre>
              </div>
            )}

            {/* Actions: Under Review -> Shortlisted -> Accepted */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
              <div className="text-xs text-[#A1AAB8]">
                Current Status: <span className="text-white font-bold">{applicantViewerOpen.status}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateAppStatus(applicantViewerOpen.id, "Shortlisted")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#3478F6] hover:bg-[#3478F6]/90 transition-colors"
                >
                  Shortlist Candidate
                </button>
                <button
                  onClick={() => handleUpdateAppStatus(applicantViewerOpen.id, "Accepted")}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                >
                  Accept & Hire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 6: EDIT ORGANIZATION PROFILE
      ========================================================================= */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#121827] border border-white/[0.1] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setProfileModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#A1AAB8] hover:text-white hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3478F6]/20 border border-[#3478F6]/30 flex items-center justify-center text-[#22D3EE]">
                <Edit3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Edit Organization Profile</h3>
                <p className="text-xs text-[#A1AAB8]">Customize your public branding in the Developers App ecosystem</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Company / Org Name</label>
                <input
                  type="text"
                  value={orgProfile.orgName}
                  onChange={(e) => setOrgProfile({ ...orgProfile, orgName: e.target.value })}
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Founder / CEO</label>
                  <input
                    type="text"
                    value={orgProfile.ceoName}
                    onChange={(e) => setOrgProfile({ ...orgProfile, ceoName: e.target.value })}
                    className="w-full bg-[#171E2C] border border-white/[0.08] text-sm text-white px-4 py-2.5 rounded-xl outline-none focus:border-[#3478F6]"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Business Type</label>
                  <select
                    value={orgProfile.orgType}
                    onChange={(e) => setOrgProfile({ ...orgProfile, orgType: e.target.value as any })}
                    className="w-full bg-[#171E2C] border border-white/[0.08] text-xs font-mono text-white px-3 py-2.5 rounded-xl outline-none"
                  >
                    <option value="Product-based">Product-based</option>
                    <option value="Service-based">Service-based</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-[#A1AAB8] block mb-1">Company Bio / Mission</label>
                <textarea
                  rows={3}
                  value={orgProfile.bio}
                  onChange={(e) => setOrgProfile({ ...orgProfile, bio: e.target.value })}
                  className="w-full bg-[#171E2C] border border-white/[0.08] text-xs text-white p-3 rounded-xl outline-none focus:border-[#3478F6]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-medium text-[#A1AAB8] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  soundFx.playChime(880, "triangle", 0.05, 0.2);
                  setProfileModalOpen(false);
                  showToast("Organization profile updated!");
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#3478F6] hover:bg-[#3478F6]/90 shadow-lg shadow-[#3478F6]/25"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
