"use client";

import React, { useState } from "react";
import {
  Code2,
  Home,
  Compass,
  Trophy,
  Layers,
  CreditCard,
  MessageSquare,
  Settings,
  Heart,
  Share2,
  Send,
  Building2,
  User,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  RefreshCw,
  TrendingUp,
  DollarSign,
  FileCode,
  Repeat2,
  Terminal,
  Briefcase,
  Play,
  GraduationCap,
  Store,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import { soundFx } from "../lib/audioAtmosphere";
import { AuthUser, FeedPost, PostComment, ChatThread, Project, DeveloperProfile } from "../types";
import { INITIAL_POSTS, INITIAL_CHATS, DEFAULT_DEVELOPER, DEFAULT_ORGANIZATION } from "../lib/appState";
import { AboutModal } from "./AboutModal";
import { ContactModal } from "./ContactModal";
import { DeveloperDashboardOverview } from "./developer/DeveloperDashboardOverview";
import { DeveloperProjects } from "./developer/DeveloperProjects";
import { DeveloperCertificates } from "./developer/DeveloperCertificates";
import { DeveloperAchievements } from "./developer/DeveloperAchievements";
import { DeveloperBadges } from "./developer/DeveloperBadges";
import { DeveloperCodePreview } from "./developer/DeveloperCodePreview";
import { DeveloperCodeUpload } from "./developer/DeveloperCodeUpload";
import { DeveloperWebPreview } from "./developer/DeveloperWebPreview";
import { dataStore } from "../lib/dataStore";

interface DashboardStageProps {
  currentUser: AuthUser;
  onSwitchUser: (newUser: AuthUser) => void;
  onLogout: () => void;
  onNavigateToLanding: () => void;
}

// 6 Interactive Story Categories (Section 5C: New Developer, Featured Project, Hackathon, Hiring Announcement, Achievement, Organization Update)
interface CommunityStory {
  id: string;
  category: "New Developer" | "Featured Project" | "Hackathon" | "Hiring Announcement" | "Achievement" | "Organization Update";
  title: string;
  name: string;
  handle: string;
  avatar: string;
  ring: string;
  summary: string;
  ctaText: string;
  ctaAction: string;
  codeSnippet?: string;
}

const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: "story-1",
    category: "New Developer",
    title: "New Builder Joined the Ecosystem",
    name: "Victor E.",
    handle: "@damdavik",
    avatar: "VE",
    ring: "from-[#3478F6] via-[#8B5CF6] to-[#22D3EE]",
    summary: "Full-Stack WebGL Engineer from Lagos joined Developers App today. Published 3 runnable GPU shader nodes to his portfolio.",
    ctaText: "View Developer Profile",
    ctaAction: "profile",
  },
  {
    id: "story-2",
    category: "Featured Project",
    title: "Featured Open-Source Project",
    name: "Alex Rivers",
    handle: "@alexrivers",
    avatar: "AR",
    ring: "from-[#22D3EE] via-[#3478F6] to-[#8B5CF6]",
    summary: "WebGL GPU Neural Visualizer rendering 100,000 active nodes at 60 FPS in-browser with zero plugins. Executable now in sandbox.",
    ctaText: "Launch in Live Sandbox",
    ctaAction: "sandbox",
    codeSnippet: "const gl = canvas.getContext('webgl2');\ngl.viewport(0, 0, canvas.width, canvas.height);\nconsole.log('Developers App GPU Pipeline Active: 60 FPS');",
  },
  {
    id: "story-3",
    category: "Hackathon",
    title: "$75,000 Inter-Varsity AI Grand Prix",
    name: "Hackathon Arena",
    handle: "@hackathon_arena",
    avatar: "HA",
    ring: "from-[#A855F7] via-[#8B5CF6] to-[#3478F6]",
    summary: "50+ tier-1 collegiate teams competing to build autonomous agent networks inside Developers App sandbox. Cash grants escrowed.",
    ctaText: "Register Team for Grand Prix",
    ctaAction: "hackathon",
  },
  {
    id: "story-4",
    category: "Hiring Announcement",
    title: "Senior Distributed Systems Engineer",
    name: "Vercel Systems",
    handle: "@vercelsystems",
    avatar: "VS",
    ring: "from-white via-[#3478F6] to-[#22D3EE]",
    summary: "Direct technical bypass: submit a high-throughput consensus sandbox project to fast-track directly to our founding engineering team.",
    ctaText: "Apply via Sandbox Project",
    ctaAction: "apply",
  },
  {
    id: "story-5",
    category: "Achievement",
    title: "Gold Merit Badge #2 Global Award",
    name: "Elena Rostova",
    handle: "@erostova",
    avatar: "ER",
    ring: "from-[#F59E0B] via-[#EAB308] to-[#8B5CF6]",
    summary: "Validated for achieving 14ms zero-knowledge rollup latency. Verified algorithmically by Developers App automated compute benchmark.",
    ctaText: "Inspect Deliverables & Badge",
    ctaAction: "badge",
  },
  {
    id: "story-6",
    category: "Organization Update",
    title: "SME Retail Digitalization RFP",
    name: "Apex Retail",
    handle: "@apexretail",
    avatar: "AP",
    ring: "from-emerald-400 via-[#3478F6] to-[#8B5CF6]",
    summary: "$8,500 escrowed contract: Looking for a 2-person developer team to modernize regional retail inventory with Next.js 14 and barcode scanner.",
    ctaText: "Review Contract & Submit RFP",
    ctaAction: "sme",
  },
];

export const DashboardStage: React.FC<DashboardStageProps> = ({
  currentUser,
  onSwitchUser,
  onLogout,
  onNavigateToLanding,
}) => {
  // Navigation tabs (Section 5B)
  const [activeTab, setActiveTab] = useState<
    | "home"
    | "messages"
    | "explore"
    | "notifications"
    | "achievements"
    | "my-projects"
    | "certificates"
    | "badges"
    | "code-preview"
    | "uploaded-code"
    | "web-preview"
    | "subscription"
    | "settings"
  >("home");

  // Developer sub-view state
  const [homeSubView, setHomeSubView] = useState<"feed" | "overview">("feed");
  const [webPreviewCode, setWebPreviewCode] = useState<string | undefined>(undefined);
  const [webPreviewProject, setWebPreviewProject] = useState<Project | null>(null);

  // Story Viewer Modal (Section 5C)
  const [selectedStory, setSelectedStory] = useState<CommunityStory | null>(null);

  // Search filter query (Section 5F)
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers
  const [chatsOpen, setChatsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Feed & Social Interaction states
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_POSTS);
  const [feedFilter, setFeedFilter] = useState<string>("All");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState<FeedPost["category"]>("Project");
  const [newPostCodeSnippet, setNewPostCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);

  // Inline comment input map & expansion (Section 5E)
  const [cardCommentInputs, setCardCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Suggestions & Follows (Section 5F)
  const [suggestedBuilders, setSuggestedBuilders] = useState([
    { name: "Elena Rostova", handle: "@erostova", role: "Gold Dev • ZK Systems", avatar: "ER", following: true },
    { name: "Marcus Vance", handle: "@mvance", role: "Gold Dev • Leaderboard #1", avatar: "MV", following: false },
    { name: "Chloe Dupont", handle: "@cdupont", role: "WebGL & Three.js Creator", avatar: "CD", following: false },
    { name: "Kenji Sato", handle: "@ksato", role: "Silver Dev • Tokyo University", avatar: "KS", following: true },
  ]);

  const [followedOrgs, setFollowedOrgs] = useState([
    { name: "Vercel Systems", domain: "vercel.com", followers: "42.8K", following: true },
    { name: "Supabase Labs", domain: "supabase.com", followers: "36.2K", following: true },
    { name: "Anthropic Foundry", domain: "anthropic.com", followers: "28.5K", following: false },
    { name: "Stripe Infrastructure", domain: "stripe.com", followers: "51.0K", following: true },
  ]);

  // Chat Messenger state
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>("chat-1");
  const [chatInputText, setChatInputText] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Like Toggle
  const handleToggleLike = (postId: string) => {
    soundFx.playChime(700, "sine", 0.03, 0.1);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  // Share action
  const handleShare = (post: FeedPost) => {
    soundFx.playChime(800, "sine", 0.04, 0.15);
    navigator.clipboard?.writeText(`https://developersapp.io/posts/${post.id}`);
    showToast("Shareable project link copied to clipboard!");
  };

  // Inline Comment submission on card
  const handleAddCardComment = (postId: string) => {
    const text = cardCommentInputs[postId]?.trim();
    if (!text) return;

    soundFx.playChime(850, "triangle", 0.04, 0.15);

    const newComment: PostComment = {
      id: `c-${Date.now()}`,
      authorName: currentUser.role === "developer" ? currentUser.fullName : currentUser.orgName,
      authorRole: currentUser.role === "developer" ? `${currentUser.tier} Developer` : "Organization",
      avatar: currentUser.avatarUrl || "DEV",
      content: text,
      timestamp: "Just now",
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...p.comments, newComment],
          };
        }
        return p;
      })
    );

    setCardCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
    showToast("Comment published directly to card!");
  };

  // Create new post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    soundFx.playChime(900, "triangle", 0.05, 0.2);

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorName: currentUser.role === "developer" ? currentUser.fullName : currentUser.orgName,
      authorHandle: `@${currentUser.username}`,
      authorRole: currentUser.role === "developer" ? currentUser.specialization : currentUser.orgType,
      authorType: currentUser.role,
      authorAvatar: currentUser.avatarUrl || "DEV",
      category: newPostCategory,
      timestamp: "Just now",
      content: newPostContent.trim(),
      codeSnippet: newPostCodeSnippet.trim() || undefined,
      likes: 0,
      isLiked: false,
      shares: 0,
      comments: [],
      badge: "RECENT LAUNCH",
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostCodeSnippet("");
    setShowCodeInput(false);
    showToast("Post broadcasted across Developers App network!");
  };

  // Chat message send
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInputText.trim()) return;

    soundFx.playChime(950, "sine", 0.04, 0.15);

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: currentUser.role === "developer" ? currentUser.fullName : currentUser.orgName,
      isMe: true,
      text: chatInputText.trim(),
      time: "Just now",
    };

    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === activeChatId) {
          return {
            ...thread,
            messages: [...thread.messages, newMsg],
          };
        }
        return thread;
      })
    );
    setChatInputText("");
  };

  // Toggle follow user
  const handleToggleFollowUser = (handle: string) => {
    soundFx.playChime(700, "sine", 0.02, 0.08);
    setSuggestedBuilders((prev) =>
      prev.map((b) => {
        if (b.handle === handle) {
          const next = !b.following;
          showToast(next ? `Now following ${b.name}` : `Unfollowed ${b.name}`);
          return { ...b, following: next };
        }
        return b;
      })
    );
  };

  // Toggle follow org
  const handleToggleFollowOrg = (name: string) => {
    soundFx.playChime(700, "sine", 0.02, 0.08);
    setFollowedOrgs((prev) =>
      prev.map((org) => {
        if (org.name === name) {
          const next = !org.following;
          showToast(next ? `Now following ${name}` : `Unfollowed ${name}`);
          return { ...org, following: next };
        }
        return org;
      })
    );
  };

  // Switch identity (Developer <-> Organization)
  const handleRoleToggle = () => {
    soundFx.playChime(900, "triangle", 0.05, 0.2);
    if (currentUser.role === "developer") {
      onSwitchUser(DEFAULT_ORGANIZATION);
      showToast("Switched identity to Organization (Vercel Systems)");
    } else {
      onSwitchUser(DEFAULT_DEVELOPER);
      showToast("Switched identity to Developer (Alex Rivers)");
    }
  };

  // Filtering posts based on category and search query
  const filteredPosts = posts.filter((p) => {
    const matchesFilter =
      feedFilter === "All"
        ? true
        : feedFilter === "Projects"
        ? p.category === "Project"
        : feedFilter === "Jobs"
        ? p.category === "Recruitment" || p.category === "SME Opportunity"
        : feedFilter === "Hackathons"
        ? p.category === "Hackathon"
        : feedFilter === "Achievements"
        ? p.category === "Achievement"
        : true;

    const matchesSearch =
      searchQuery.trim() === ""
        ? true
        : p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.authorHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const activeChat = chatThreads.find((t) => t.id === activeChatId) || chatThreads[0];

  return (
    <div className="min-h-screen w-full bg-[#151515] text-[#F5F5F5] flex flex-col relative selection:bg-[#3478F6]/40 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-[#242424] border border-[#3478F6]/60 text-white text-xs font-mono shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER (SquaChat Style Bar) */}
      <header className="sticky top-0 z-40 bg-[#1A1A1A]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Branding & Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] text-[#A3A3A3] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("home")}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3478F6] to-[#8B5CF6] flex items-center justify-center text-white shadow-md">
                <Code2 className="w-5 h-5 text-[#22D3EE]" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white">
                  Developers App
                </span>
                <span className="text-[10px] text-[#A3A3A3] font-mono ml-2 hidden md:inline">
                  Feed
                </span>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Developers App (builders, orgs, projects, hackathons)..."
                className="w-full pl-10 pr-4 py-2 bg-[#202020] border border-white/[0.08] rounded-full text-xs text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#3478F6] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#A3A3A3] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Header Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playChime(800, "sine", 0.03, 0.1);
                setChatsOpen(true);
              }}
              className="relative p-2.5 rounded-xl bg-[#202020] hover:bg-[#2D2D2D] border border-white/[0.08] text-[#A3A3A3] hover:text-white transition-colors"
              title="Open Messages"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3478F6] text-white text-[9px] font-bold flex items-center justify-center">
                1
              </span>
            </button>

            <button
              onClick={() => {
                soundFx.playChime(750, "sine", 0.03, 0.1);
                setNotificationsOpen(!notificationsOpen);
              }}
              className="relative p-2.5 rounded-xl bg-[#202020] hover:bg-[#2D2D2D] border border-white/[0.08] text-[#A3A3A3] hover:text-white transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8B5CF6] text-white text-[9px] font-bold flex items-center justify-center">
                4
              </span>
            </button>

            <button
              onClick={onNavigateToLanding}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-zinc-300 hover:text-white bg-[#202020] hover:bg-[#2D2D2D] border border-white/[0.08] transition-colors"
              title="Return to Animated Showcase"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>Showcase</span>
            </button>

            {/* Profile Avatar with Tier Border */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/[0.08]">
              <div
                onClick={() => setSettingsOpen(true)}
                className={`w-9 h-9 rounded-xl p-[1.5px] cursor-pointer hover:scale-105 transition-transform ${
                  currentUser.role === "developer"
                    ? "bg-gradient-to-tr from-[#C9A44C] via-[#3478F6] to-[#22D3EE]"
                    : "bg-gradient-to-tr from-[#8B5CF6] to-[#C9A44C]"
                }`}
              >
                <div className="w-full h-full rounded-[9px] bg-[#242424] flex items-center justify-center font-bold text-xs text-white">
                  {currentUser.avatarUrl || "U"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN 3-COLUMN LAYOUT (Reference: Image 3 — SquaChat) */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          
          {/* LEFT SIDEBAR: ~260px (Section 5B: SquaChat Navigation) */}
          <aside className="w-full lg:w-[260px] shrink-0 space-y-4 hidden lg:block">
            {/* Identity Switcher Card */}
            <div className="p-4 rounded-2xl bg-[#202020] border border-white/[0.08] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#A3A3A3] uppercase tracking-wider font-bold">
                  ACTIVE ROLE
                </span>
                <button
                  onClick={handleRoleToggle}
                  className="text-[10px] font-mono text-[#22D3EE] hover:underline flex items-center gap-1 font-bold"
                  title="Switch between Developer and Organization account"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Switch</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white ${
                    currentUser.role === "developer"
                      ? "bg-gradient-to-tr from-[#3478F6] to-[#8B5CF6]"
                      : "bg-gradient-to-tr from-[#8B5CF6] to-[#C9A44C]"
                  }`}
                >
                  {currentUser.role === "developer" ? <User className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {currentUser.role === "developer" ? "Developer Account" : "Organization Account"}
                  </div>
                  <div className="text-[11px] text-[#A3A3A3] font-mono truncate">
                    @{currentUser.username} {currentUser.role === "developer" && `• ${currentUser.tier}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu (All 13 items from Section 5B) */}
            <nav className="p-2.5 rounded-2xl bg-[#202020] border border-white/[0.08] shadow-sm space-y-1 text-xs font-medium">
              {/* 1. Home */}
              <button
                onClick={() => setActiveTab("home")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "home"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              {/* 2. Messages */}
              <button
                onClick={() => {
                  soundFx.playChime(600, "sine", 0.02, 0.08);
                  setChatsOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#A3A3A3] hover:text-white hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages</span>
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#3478F6] text-white">
                  1
                </span>
              </button>

              {/* 3. Explore */}
              <button
                onClick={() => setActiveTab("explore")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "explore"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Explore</span>
              </button>

              {/* 4. Notifications */}
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[#A3A3A3] hover:text-white hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </div>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-[#8B5CF6] text-white">
                  4
                </span>
              </button>

              {/* 5. Achievements */}
              <button
                onClick={() => setActiveTab("achievements")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "achievements"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Trophy className="w-4 h-4 text-[#F59E0B]" />
                <span>Achievements</span>
              </button>

              {/* 6. My Projects */}
              <button
                onClick={() => setActiveTab("my-projects")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "my-projects"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Layers className="w-4 h-4 text-[#8B5CF6]" />
                <span>My Projects</span>
              </button>

              {/* 7. Certificates */}
              <button
                onClick={() => setActiveTab("certificates")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "certificates"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#22D3EE]" />
                <span>Certificates</span>
              </button>

              {/* 8. Merit Badges */}
              <button
                onClick={() => setActiveTab("badges")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "badges"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Merit Badges</span>
              </button>

              {/* 9. Code Preview */}
              <button
                onClick={() => setActiveTab("code-preview")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "code-preview"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Terminal className="w-4 h-4 text-[#22D3EE]" />
                <span>Code Preview</span>
              </button>

              {/* 10. Uploaded Code */}
              <button
                onClick={() => setActiveTab("uploaded-code")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "uploaded-code"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>Uploaded Code</span>
              </button>

              {/* 11. Web / App Preview */}
              <button
                onClick={() => setActiveTab("web-preview")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "web-preview"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Web / App Preview</span>
              </button>

              {/* 12. Subscription */}
              <button
                onClick={() => setActiveTab("subscription")}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === "subscription"
                    ? "bg-[#3478F6] text-white font-bold shadow-md"
                    : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Subscription</span>
              </button>

              {/* 13. Settings */}
              <button
                onClick={() => setSettingsOpen(true)}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[#A3A3A3] hover:text-white hover:bg-white/[0.04] transition-all"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>

            {/* Bottom User Profile Access Pill (SquaChat Style) */}
            <div className="p-3.5 rounded-2xl bg-[#202020] border border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3478F6] to-[#8B5CF6] flex items-center justify-center font-bold text-xs text-white shrink-0">
                  {currentUser.avatarUrl || "U"}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">
                    {currentUser.role === "developer" ? currentUser.fullName : currentUser.orgName}
                  </div>
                  <div className="text-[10px] text-[#A3A3A3] font-mono truncate">
                    @{currentUser.username}
                  </div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-red-400 hover:bg-white/[0.05] transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </aside>

          {/* MAIN CENTER FEED / WORKSPACE VIEW */}
          <main
            className={`w-full flex-1 min-w-0 space-y-5 ${
              activeTab === "code-preview" || activeTab === "web-preview"
                ? "max-w-full"
                : activeTab === "home" && homeSubView === "feed"
                ? "max-w-[680px]"
                : "max-w-[960px]"
            }`}
          >
            {activeTab === "home" ? (
              <>
                {/* Home Sub-View Segmented Control */}
                <div className="flex items-center justify-between p-1.5 rounded-2xl bg-[#202020] border border-white/[0.08]">
                  <div className="flex items-center gap-1.5 flex-1">
                    <button
                      onClick={() => {
                        soundFx.playChime(600, "sine", 0.02, 0.08);
                        setHomeSubView("feed");
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        homeSubView === "feed"
                          ? "bg-[#3478F6] text-white shadow-md shadow-[#3478F6]/25"
                          : "text-[#A3A3A3] hover:text-white"
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Community Social Feed</span>
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playChime(650, "sine", 0.02, 0.08);
                        setHomeSubView("overview");
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        homeSubView === "overview"
                          ? "bg-[#3478F6] text-white shadow-md shadow-[#3478F6]/25"
                          : "text-[#A3A3A3] hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
                      <span>Developer Dashboard Overview</span>
                    </button>
                  </div>
                </div>

                {homeSubView === "overview" ? (
                  <DeveloperDashboardOverview
                    currentUser={
                      currentUser.role === "developer"
                        ? (currentUser as DeveloperProfile)
                        : (DEFAULT_DEVELOPER as DeveloperProfile)
                    }
                    projects={dataStore.getProjects(currentUser.username)}
                    certificates={dataStore.getCertificates(currentUser.username)}
                    achievements={dataStore.getAchievements(currentUser.username)}
                    badges={dataStore.getBadges(currentUser.username)}
                    opportunities={dataStore.getOpportunities()}
                    onNavigateTab={(tab) => setActiveTab(tab)}
                    onOpenPreview={(proj) => {
                      setWebPreviewProject(proj);
                      setActiveTab("web-preview");
                    }}
                  />
                ) : (
                  <>
                    {/* 1. TOP STORIES / COMMUNITY ACTIVITY ROW (Section 5C) */}
                <div className="p-4 rounded-2xl bg-[#242424] border border-white/[0.08] shadow-sm">
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/[0.06]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] font-bold">
                      COMMUNITY STORIES &amp; HIGHLIGHTS
                    </span>
                    <span className="text-[10px] text-[#22D3EE] font-mono">
                      Click to View
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5 overflow-x-auto pb-1 scrollbar-thin">
                    {COMMUNITY_STORIES.map((story) => (
                      <div
                        key={story.id}
                        onClick={() => {
                          soundFx.playChime(750, "triangle", 0.04, 0.15);
                          setSelectedStory(story);
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0"
                      >
                        <div
                          className={`w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr ${story.ring} group-hover:scale-105 transition-transform shadow-md`}
                        >
                          <div className="w-full h-full rounded-full bg-[#151515] flex items-center justify-center font-bold text-xs text-white">
                            {story.avatar}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[#A3A3A3] group-hover:text-white truncate max-w-[64px] text-center">
                          {story.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. POST COMPOSER (Section 5D) */}
                <div className="p-5 rounded-2xl bg-[#242424] border border-white/[0.08] shadow-sm space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3478F6] to-[#8B5CF6] flex items-center justify-center font-bold text-xs text-white shrink-0 mt-0.5">
                      {currentUser.avatarUrl || "DEV"}
                    </div>
                    <div className="flex-1 space-y-2">
                      <textarea
                        rows={2}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="What's happening in your developer journey?"
                        className="w-full p-3 bg-[#1B1B1B] border border-white/[0.08] rounded-xl text-xs text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#3478F6] resize-none transition-colors"
                      />

                      {showCodeInput && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-[#22D3EE]">
                            Runnable Code Snippet:
                          </label>
                          <textarea
                            rows={3}
                            value={newPostCodeSnippet}
                            onChange={(e) => setNewPostCodeSnippet(e.target.value)}
                            placeholder="// Paste your runnable TypeScript, WebGL or Python snippet here"
                            className="w-full p-3 bg-[#111111] border border-[#22D3EE]/30 rounded-xl font-mono text-xs text-[#22D3EE] focus:outline-none resize-none"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Action Buttons & Submit */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCodeInput(!showCodeInput)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                          showCodeInput ? "bg-[#3478F6]/20 text-[#22D3EE] border border-[#3478F6]/40" : "bg-white/[0.04] text-[#A3A3A3] hover:text-white"
                        }`}
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Code Snippet</span>
                      </button>

                      <select
                        value={newPostCategory}
                        onChange={(e) => setNewPostCategory(e.target.value as any)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#1B1B1B] border border-white/[0.08] text-[11px] text-[#A3A3A3] font-mono focus:outline-none"
                      >
                        <option value="Project">Share Project</option>
                        <option value="Achievement">Share Achievement</option>
                        <option value="Recruitment">Publish Opportunity</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="SME Opportunity">SME Solution</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8B5CF6] disabled:opacity-40 hover:shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post</span>
                    </button>
                  </div>
                </div>

                {/* 3. CATEGORY FILTER PILLS */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  {["All", "Projects", "Jobs", "Hackathons", "Achievements"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        soundFx.playChime(600, "sine", 0.02, 0.08);
                        setFeedFilter(filter);
                      }}
                      className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${
                        feedFilter === filter
                          ? "bg-white/[0.15] text-white border border-white/[0.2] shadow-sm"
                          : "text-[#A3A3A3] hover:text-white bg-[#242424] border border-white/[0.06]"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* 4. FEED POSTS STREAM (Section 5E) */}
                <div className="space-y-5">
                  {filteredPosts.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-[#242424] border border-white/[0.08] space-y-3">
                      <Search className="w-8 h-8 text-[#A3A3A3] mx-auto" />
                      <div className="text-sm font-bold text-white">No posts matching your search</div>
                      <p className="text-xs text-[#A3A3A3]">Try searching for "sandbox", "hackathon", or "AI".</p>
                    </div>
                  ) : (
                    filteredPosts.map((post) => {
                      let badgeColor = "bg-blue-500/10 text-blue-400 border-blue-500/20";
                      if (post.category === "Recruitment" || post.category === "SME Opportunity") {
                        badgeColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
                      } else if (post.category === "Hackathon") {
                        badgeColor = "bg-purple-500/10 text-purple-300 border-purple-500/30";
                      } else if (post.category === "Achievement") {
                        badgeColor = "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30";
                      }

                      return (
                        <article
                          key={post.id}
                          className="p-6 rounded-3xl bg-[#242424] border border-white/[0.08] shadow-sm space-y-4 hover:border-white/[0.15] transition-all duration-300"
                        >
                          {/* Post Header */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs text-white shrink-0 ${
                                  post.authorType === "developer"
                                    ? "bg-gradient-to-tr from-[#3478F6] to-[#8B5CF6]"
                                    : "bg-gradient-to-tr from-[#8B5CF6] to-[#C9A44C]"
                                }`}
                              >
                                {post.authorAvatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-extrabold text-sm text-white">{post.authorName}</span>
                                  <span className="text-[11px] font-mono text-[#A3A3A3]">{post.authorHandle}</span>
                                </div>
                                <div className="text-[11px] text-[#A3A3A3]">
                                  {post.authorRole} • <span className="font-mono">{post.timestamp}</span>
                                </div>
                              </div>
                            </div>

                            {post.badge && (
                              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${badgeColor} shrink-0`}>
                                {post.badge}
                              </span>
                            )}
                          </div>

                          {/* Post Content */}
                          <p className="text-sm text-zinc-200 leading-relaxed">
                            {post.content}
                          </p>

                          {/* Runnable Code Sandbox Block */}
                          {post.codeSnippet && (
                            <div className="rounded-2xl bg-[#181818] border border-white/[0.08] overflow-hidden">
                              <div className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
                                <span className="text-[11px] font-mono text-[#A3A3A3]">
                                  Sandbox Executable Preview
                                </span>
                                <button
                                  onClick={() => showToast("Compiling in Developers App Sandbox...")}
                                  className="px-2.5 py-1 rounded-lg bg-[#3478F6]/20 hover:bg-[#3478F6]/30 text-[#22D3EE] font-mono text-[10px] font-bold flex items-center gap-1 transition-colors"
                                >
                                  <Play className="w-3 h-3" />
                                  <span>Run in Sandbox</span>
                                </button>
                              </div>
                              <pre className="p-4 font-mono text-xs text-[#22D3EE] overflow-x-auto leading-relaxed">
                                <code>{post.codeSnippet}</code>
                              </pre>
                            </div>
                          )}

                          {/* Action Toolbar */}
                          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#A3A3A3]">
                            <div className="flex items-center gap-5">
                              {/* Like */}
                              <button
                                onClick={() => handleToggleLike(post.id)}
                                className={`flex items-center gap-1.5 transition-colors ${
                                  post.isLiked ? "text-red-400 font-bold" : "hover:text-white"
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                                <span>{post.likes}</span>
                              </button>

                              {/* Comment */}
                              <button
                                onClick={() => {
                                  setExpandedComments((prev) => ({
                                    ...prev,
                                    [post.id]: !prev[post.id],
                                  }));
                                }}
                                className="flex items-center gap-1.5 hover:text-white transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span>{post.comments.length}</span>
                              </button>

                              {/* Repost */}
                              <button
                                onClick={() => {
                                  soundFx.playChime(750, "sine", 0.02, 0.08);
                                  showToast("Reposted to your profile!");
                                }}
                                className="flex items-center gap-1.5 hover:text-white transition-colors"
                              >
                                <Repeat2 className="w-4 h-4" />
                                <span>Repost</span>
                              </button>
                            </div>

                            {/* Share */}
                            <button
                              onClick={() => handleShare(post)}
                              className="flex items-center gap-1.5 hover:text-white transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>

                          {/* INLINE COMMENT INPUT (Directly on post card) */}
                          <div className="pt-2 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3478F6] to-[#8B5CF6] flex items-center justify-center font-bold text-[10px] text-white shrink-0">
                              {currentUser.avatarUrl || "DEV"}
                            </div>
                            <input
                              type="text"
                              value={cardCommentInputs[post.id] || ""}
                              onChange={(e) =>
                                setCardCommentInputs({
                                  ...cardCommentInputs,
                                  [post.id]: e.target.value,
                                })
                              }
                              placeholder="Add a comment or feedback..."
                              className="flex-1 px-3.5 py-2 bg-[#1B1B1B] border border-white/[0.08] rounded-xl text-xs text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#3478F6]"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddCardComment(post.id);
                              }}
                            />
                            <button
                              onClick={() => handleAddCardComment(post.id)}
                              className="p-2 rounded-xl bg-white/[0.05] hover:bg-[#3478F6] text-white transition-colors"
                              title="Send Comment"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Expandable Comments Drawer */}
                          {expandedComments[post.id] && post.comments.length > 0 && (
                            <div className="pt-3 border-t border-white/[0.06] space-y-2 animate-in fade-in duration-200">
                              <span className="text-[11px] font-mono text-[#A3A3A3] uppercase tracking-wider block font-bold">
                                Comments ({post.comments.length})
                              </span>
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="p-3 rounded-xl bg-[#1B1B1B] border border-white/[0.06] space-y-1 text-xs">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-white">{comment.authorName}</span>
                                    <span className="text-[10px] text-zinc-500 font-mono">{comment.timestamp}</span>
                                  </div>
                                  <p className="text-zinc-300">{comment.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </article>
                      );
                    })
                  )}
                </div>
                  </>
                )}
              </>
            ) : activeTab === "my-projects" ? (
              <DeveloperProjects
                username={currentUser.username || "alexrivers"}
                onOpenPreview={(proj) => {
                  setWebPreviewProject(proj);
                  setActiveTab("web-preview");
                }}
                onRunSandbox={(proj) => {
                  setActiveTab("code-preview");
                }}
              />
            ) : activeTab === "certificates" ? (
              <DeveloperCertificates username={currentUser.username || "alexrivers"} />
            ) : activeTab === "achievements" ? (
              <DeveloperAchievements username={currentUser.username || "alexrivers"} />
            ) : activeTab === "badges" ? (
              <DeveloperBadges username={currentUser.username || "alexrivers"} />
            ) : activeTab === "code-preview" ? (
              <DeveloperCodePreview
                onOpenWebPreview={(code) => {
                  setWebPreviewCode(code);
                  setActiveTab("web-preview");
                }}
              />
            ) : activeTab === "uploaded-code" ? (
              <DeveloperCodeUpload
                username={currentUser.username || "alexrivers"}
                onRunSandboxSnippet={(code, lang) => {
                  setActiveTab("code-preview");
                }}
              />
            ) : activeTab === "web-preview" ? (
              <DeveloperWebPreview
                initialCode={webPreviewCode}
                projectName={webPreviewProject?.title}
              />
            ) : activeTab === "explore" ? (
              /* EXPLORE VIEW */
              <div className="p-6 rounded-3xl bg-[#242424] border border-white/[0.08] space-y-4">
                <h3 className="text-xl font-bold text-white">Explore Developers App Network</h3>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  Discover trending open-source projects, top-ranked collegiate hackathon winners, and verified technical architects.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-[#1B1B1B] border border-white/[0.06] space-y-2">
                    <span className="text-sm font-bold text-white">Top 100 Verified Engineers</span>
                    <p className="text-xs text-[#A3A3A3]">Creators evaluated by automated GPU and sandbox benchmark passes.</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#1B1B1B] border border-white/[0.06] space-y-2">
                    <span className="text-sm font-bold text-[#22D3EE]">Active Hackathon Arenas</span>
                    <p className="text-xs text-[#A3A3A3]">3 multi-college challenges with $160K+ total prize pools.</p>
                  </div>
                </div>
              </div>
            ) : activeTab === "subscription" ? (
              /* SUBSCRIPTION VIEW */
              <div className="p-6 rounded-3xl bg-[#242424] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Developers App Membership</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#3478F6]/20 text-[#22D3EE] border border-[#3478F6]/30 font-bold">
                    ACTIVE TIER
                  </span>
                </div>
                <p className="text-xs text-[#A3A3A3] leading-relaxed">
                  Unlock unlimited isolated cloud sandbox compute, GPU acceleration, and priority recruiter matches.
                </p>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#3478F6]/15 to-transparent border border-[#3478F6]/30 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">Developers App Pro</div>
                    <div className="text-xs text-[#A3A3A3]">$19/mo billed annually</div>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8B5CF6]">
                    Upgrade to Pro
                  </button>
                </div>
              </div>
            ) : (
              /* TAB FALLBACK */
              <div className="p-8 rounded-3xl bg-[#242424] border border-white/[0.08] space-y-4 text-center py-16">
                <Layers className="w-12 h-12 text-[#22D3EE] mx-auto animate-pulse" />
                <h3 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
                  {activeTab.replace("-", " ")} Portal
                </h3>
                <p className="text-xs text-[#A3A3A3] max-w-sm mx-auto leading-relaxed">
                  Connected to Developers App live cloud sandbox and verified credentials database.
                </p>
                <button
                  onClick={() => setActiveTab("home")}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-white/[0.05] hover:bg-white/[0.1] text-zinc-200 transition-colors"
                >
                  ← Return to Feed
                </button>
              </div>
            )}
          </main>

          {/* RIGHT SIDEBAR: ~320px (Section 5F: Search & Suggestions) */}
          {activeTab !== "code-preview" && activeTab !== "web-preview" && (
          <aside className="w-full lg:w-[320px] shrink-0 hidden lg:block space-y-4">
            {/* 1. Suggestions for You (Builders) */}
            <div className="p-5 rounded-2xl bg-[#202020] border border-white/[0.08] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-mono uppercase tracking-wider text-[#A3A3A3] font-bold">
                  Suggestions for you
                </h5>
                <span className="text-[10px] text-[#22D3EE] font-mono cursor-pointer hover:underline">
                  See All
                </span>
              </div>

              <div className="space-y-3">
                {suggestedBuilders.map((builder) => (
                  <div key={builder.handle} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3478F6] to-[#8B5CF6] flex items-center justify-center font-bold text-xs text-white shrink-0">
                        {builder.avatar}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-white truncate">{builder.name}</div>
                        <div className="text-[10px] text-[#A3A3A3] truncate">{builder.role}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleFollowUser(builder.handle)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all shrink-0 ${
                        builder.following
                          ? "bg-white/[0.05] text-[#A3A3A3] hover:bg-white/[0.1] hover:text-white"
                          : "bg-[#3478F6] text-white hover:bg-blue-600 shadow-sm"
                      }`}
                    >
                      {builder.following ? "Followed" : "Follow"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Recommended Opportunities (Hiring & Hackathons) */}
            <div className="p-5 rounded-2xl bg-[#202020] border border-white/[0.08] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-mono uppercase tracking-wider text-[#A3A3A3] font-bold">
                  Recommended Opportunities
                </h5>
                <span className="text-[10px] text-[#22D3EE] font-mono cursor-pointer hover:underline">
                  Browse
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#1B1B1B] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Vercel Systems</span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">$180K–$240K</span>
                  </div>
                  <div className="text-[#A3A3A3] text-[11px]">Senior Distributed Systems Engineer</div>
                  <button
                    onClick={() => showToast("Opening sandbox application flow...")}
                    className="w-full py-1.5 rounded-lg bg-[#3478F6]/20 text-[#22D3EE] text-[10px] font-mono font-bold hover:bg-[#3478F6]/30 transition-colors"
                  >
                    Apply with Sandbox Code →
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#1B1B1B] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">AI Grand Prix</span>
                    <span className="text-[10px] text-purple-300 font-mono font-bold">$75K Prize</span>
                  </div>
                  <div className="text-[#A3A3A3] text-[11px]">Inter-College Autonomous Agent Challenge</div>
                  <button
                    onClick={() => showToast("Registered for Hackathon Arena!")}
                    className="w-full py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold hover:bg-purple-500/30 transition-colors"
                  >
                    Join Hackathon Arena →
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Recommended Organizations */}
            <div className="p-5 rounded-2xl bg-[#202020] border border-white/[0.08] shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-mono uppercase tracking-wider text-[#A3A3A3] font-bold">
                  Recommended Organizations
                </h5>
                <span className="text-[10px] text-[#22D3EE] font-mono cursor-pointer hover:underline">
                  See All
                </span>
              </div>

              <div className="space-y-3">
                {followedOrgs.map((org) => (
                  <div key={org.name} className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{org.name}</div>
                      <div className="text-[10px] text-[#A3A3A3] font-mono">{org.domain} • {org.followers}</div>
                    </div>
                    <button
                      onClick={() => handleToggleFollowOrg(org.name)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        org.following
                          ? "bg-white/[0.05] text-[#A3A3A3] hover:bg-white/[0.1] hover:text-white"
                          : "bg-[#3478F6] text-white hover:bg-blue-600 shadow-sm"
                      }`}
                    >
                      {org.following ? "Following" : "+ Follow"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
          )}
        </div>
      </div>

      {/* INTERACTIVE STORY VIEWER MODAL (Section 5C) */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-white/[0.1] bg-[#202020] p-6 sm:p-8 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] text-[#A3A3A3] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr ${selectedStory.ring}`}>
                <div className="w-full h-full rounded-full bg-[#151515] flex items-center justify-center font-bold text-sm text-white">
                  {selectedStory.avatar}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] text-[#22D3EE] border border-white/[0.08]">
                  {selectedStory.category}
                </span>
                <h4 className="text-base font-bold text-white mt-1">{selectedStory.name}</h4>
                <div className="text-xs text-[#A3A3A3] font-mono">{selectedStory.handle}</div>
              </div>
            </div>

            {/* Story Details */}
            <div className="p-4 rounded-2xl bg-[#181818] border border-white/[0.06] space-y-3">
              <h5 className="text-sm font-bold text-white">{selectedStory.title}</h5>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {selectedStory.summary}
              </p>

              {selectedStory.codeSnippet && (
                <pre className="p-3 rounded-xl bg-[#0D0D0D] font-mono text-[11px] text-[#22D3EE] overflow-x-auto">
                  <code>{selectedStory.codeSnippet}</code>
                </pre>
              )}
            </div>

            {/* Action button */}
            <button
              onClick={() => {
                soundFx.playChime(900, "triangle", 0.05, 0.2);
                showToast(`Action executed: ${selectedStory.ctaText}`);
                setSelectedStory(null);
              }}
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#3478F6] to-[#8B5CF6] hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{selectedStory.ctaText}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* CHATS MESSENGER MODAL */}
      {chatsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl border border-white/[0.08] bg-[#202020] p-6 shadow-2xl relative h-[580px] flex flex-col">
            <button
              onClick={() => setChatsOpen(false)}
              className="absolute top-5 right-5 text-[#A3A3A3] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 border-b border-white/[0.08]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#22D3EE]" />
                Developers App Messenger
              </h3>
            </div>

            <div className="grid grid-cols-12 flex-1 pt-3 overflow-hidden gap-4">
              <div className="col-span-4 border-r border-white/[0.06] pr-3 space-y-1.5 overflow-y-auto">
                {chatThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => {
                      soundFx.playChime(600, "sine", 0.02, 0.08);
                      setActiveChatId(thread.id);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left transition-colors flex items-center gap-2.5 ${
                      activeChatId === thread.id
                        ? "bg-[#3478F6]/20 border border-[#3478F6]/40"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3478F6] to-[#8B5CF6] flex items-center justify-center font-bold text-xs text-white shrink-0">
                      {thread.avatar}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">{thread.name}</div>
                      <div className="text-[10px] text-[#A3A3A3] truncate">{thread.role}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="col-span-8 flex flex-col justify-between pl-2">
                <div className="flex-1 overflow-y-auto space-y-3 p-2">
                  {activeChat.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.isMe ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`p-3 rounded-2xl text-xs max-w-[80%] ${
                          m.isMe
                            ? "bg-[#3478F6] text-white"
                            : "bg-[#181818] border border-white/[0.08] text-zinc-200"
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 mt-1">{m.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInputText}
                    onChange={(e) => setChatInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-3.5 py-2.5 bg-[#181818] border border-white/[0.08] rounded-xl text-xs text-white placeholder-[#A3A3A3] focus:outline-none focus:border-[#3478F6]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-[#3478F6] hover:bg-blue-600 text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS DRAWER */}
      {notificationsOpen && (
        <div className="fixed top-16 right-4 sm:right-8 z-50 w-80 rounded-2xl bg-[#202020] border border-white/[0.1] shadow-2xl p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <span className="text-xs font-bold text-white">Notifications (4)</span>
            <button onClick={() => setNotificationsOpen(false)} className="text-xs text-[#A3A3A3] hover:text-white">✕</button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-[#1B1B1B] border border-white/[0.04]">
              <span className="font-bold text-white block">Vercel Systems</span>
              <span className="text-[#A3A3A3] text-[11px]">Reviewed your WebGL sandbox submission.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1B1B1B] border border-white/[0.04]">
              <span className="font-bold text-[#F59E0B] block">Gold Badge Verification</span>
              <span className="text-[#A3A3A3] text-[11px]">Your 14ms benchmark was confirmed.</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#1B1B1B] border border-white/[0.04]">
              <span className="font-bold text-[#22D3EE] block">AI Grand Prix</span>
              <span className="text-[#A3A3A3] text-[11px]">Registration confirmed for upcoming sprint.</span>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS MODAL */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#202020] p-6 sm:p-8 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSettingsOpen(false)}
              className="absolute top-5 right-5 text-[#A3A3A3] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8B5CF6]" />
                Account Settings
              </h3>
              <p className="text-xs text-[#A3A3A3] font-mono">
                Developers App Preferences &amp; Role Management
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#181818] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Active Identity</div>
                  <div className="text-[#A3A3A3]">
                    {currentUser.role === "developer" ? "Developer Account" : "Organization Account"}
                  </div>
                </div>
                <button
                  onClick={handleRoleToggle}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-mono font-bold"
                >
                  Switch Role
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#181818] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Audio Atmosphere</div>
                  <div className="text-[#A3A3A3]">Synthesized cyber sound effects</div>
                </div>
                <button
                  onClick={() => soundFx.toggle()}
                  className="px-3 py-1.5 rounded-lg bg-[#3478F6]/20 text-[#22D3EE] border border-[#3478F6]/30 font-mono font-bold"
                >
                  Toggle Audio
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSettingsOpen(false);
                    onLogout();
                  }}
                  className="w-full py-3 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Developers App</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};
