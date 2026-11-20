import {
  Project,
  Certificate,
  Achievement,
  MeritBadge,
  UploadedCodeItem,
  HiringOpportunity,
  OpportunityApplication,
  OrganizationPurchase,
  OrganizationProfile,
  DeveloperProfile,
} from "../types";
import { DEFAULT_DEVELOPER, DEFAULT_ORGANIZATION } from "./appState";

// Seed Projects
export const INITIAL_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "WebGL GPU Neural Visualizer",
    description: "High-performance GPU shader pipeline rendering 100,000 active nodes at 60 FPS in-browser with zero plugins. Built with raw WebGL2, Next.js, and GLSL.",
    languages: ["TypeScript", "GLSL", "JavaScript"],
    technologies: ["WebGL2", "Next.js", "Tailwind CSS", "Canvas API"],
    category: "GPU Shaders & WebGL",
    version: "2.4.0",
    visibility: "public",
    createdAt: "2026-02-14",
    updatedAt: "2026-11-12",
    ownerUsername: "alexrivers",
    ownerName: "Alex Rivers",
    ownerTier: "Gold",
    stars: 342,
    status: "Active",
    repoUrl: "https://github.com/alexrivers/webgl-neural-core",
    liveUrl: "https://developersapp.io/preview/webgl-neural",
    codeFiles: [
      {
        name: "main.ts",
        path: "src/main.ts",
        language: "typescript",
        content: `// WebGL GPU Neural Visualizer - Developers App Sandbox
export class GPUVisualizer {
  private gl: WebGL2RenderingContext;
  private particleCount = 100000;

  constructor(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext('webgl2');
    if (!gl) throw new Error('WebGL2 not supported');
    this.gl = gl;
    console.log('[Developers App GPU Pipeline] Initialized at 60 FPS');
  }

  public render(time: number) {
    this.gl.viewport(0, 0, 800, 600);
    this.gl.clearColor(0.05, 0.04, 0.1, 1.0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    // Render 100,000 neural nodes
  }
}`,
      },
      {
        name: "shader.glsl",
        path: "src/shaders/shader.glsl",
        language: "glsl",
        content: `#version 300 es
precision highp float;
in vec3 aPosition;
uniform mat4 uProjectionMatrix;
void main() {
  gl_Position = uProjectionMatrix * vec4(aPosition, 1.0);
  gl_PointSize = 2.0;
}`,
      },
    ],
  },
  {
    id: "proj-2",
    title: "Autonomous Agent Consensus Protocol",
    description: "Distributed low-latency consensus protocol for autonomous AI agents negotiating task allocation and escrow settlements.",
    languages: ["TypeScript", "Python"],
    technologies: ["Node.js", "Docker", "Raft", "Cryptography"],
    category: "Distributed Systems",
    version: "1.1.0",
    visibility: "public",
    createdAt: "2026-04-10",
    updatedAt: "2026-10-30",
    ownerUsername: "alexrivers",
    ownerName: "Alex Rivers",
    ownerTier: "Gold",
    stars: 215,
    status: "Active",
    repoUrl: "https://github.com/alexrivers/agent-consensus",
    codeFiles: [
      {
        name: "consensus.py",
        path: "agent/consensus.py",
        language: "python",
        content: `# Autonomous Agent Consensus Protocol
import time

class AgentNode:
    def __init__(self, node_id, quorum_size=5):
        self.node_id = node_id
        self.quorum_size = quorum_size
        self.votes = set()

    def propose_task(self, task_hash):
        print(f"[Node {self.node_id}] Proposing task {task_hash}")
        self.votes.add(self.node_id)
        return len(self.votes) >= (self.quorum_size // 2 + 1)

node = AgentNode("AG-1", quorum_size=5)
print("Quorum established:", node.propose_task("0x7f4a..."))`,
      },
    ],
  },
  {
    id: "proj-3",
    title: "Next.js Zero-Knowledge Block Explorer",
    description: "Interactive visual analytics dashboard for zero-knowledge rollups, computing client-side proofs with WebAssembly in under 15ms.",
    languages: ["TypeScript", "Rust"],
    technologies: ["Next.js", "WASM", "Tailwind CSS", "SnarkJS"],
    category: "Smart Contracts",
    version: "3.0.1",
    visibility: "public",
    createdAt: "2026-07-22",
    updatedAt: "2026-11-05",
    ownerUsername: "alexrivers",
    ownerName: "Alex Rivers",
    ownerTier: "Gold",
    stars: 189,
    status: "Active",
    repoUrl: "https://github.com/alexrivers/zk-explorer",
  },
];

// Seed Certificates
export const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    title: "Cloud Infrastructure Architect Tier-1",
    issuingOrg: "Developers App Accreditation Board & Vercel Systems",
    issueDate: "2026-01-15",
    expiryDate: "2028-01-15",
    credentialId: "DA-CERT-9048-A81",
    verificationUrl: "https://developersapp.io/verify/DA-CERT-9048-A81",
    fileName: "cloud-architect-tier1.pdf",
    ownerUsername: "alexrivers",
    verified: true,
  },
  {
    id: "cert-2",
    title: "Autonomous Agent Systems Specialist",
    issuingOrg: "Inter-Varsity AI Consortium",
    issueDate: "2025-11-02",
    credentialId: "IVAI-AGENT-3392",
    verificationUrl: "https://developersapp.io/verify/IVAI-AGENT-3392",
    fileName: "autonomous-agent-specialist.png",
    ownerUsername: "alexrivers",
    verified: true,
  },
  {
    id: "cert-3",
    title: "WebGL High Performance Graphics Certification",
    issuingOrg: "The Khronos Ecosystem Working Group",
    issueDate: "2025-08-20",
    credentialId: "KHR-WGL-7721",
    verificationUrl: "https://developersapp.io/verify/KHR-WGL-7721",
    fileName: "webgl-high-perf.pdf",
    ownerUsername: "alexrivers",
    verified: true,
  },
];

// Seed Achievements
export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-1",
    title: "Grand Prix Hackathon Winner 2025",
    category: "Hackathon",
    description: "1st Place Winner among 40 collegiate teams at the Inter-Varsity AI Grand Prix, awarded $50,000 grant.",
    dateEarned: "2025-12-10",
    ownerUsername: "alexrivers",
    metric: "1st Place / 40 Teams",
    badgeLevel: "Gold",
    iconName: "Trophy",
  },
  {
    id: "ach-2",
    title: "100,000 Sandbox Executions Milestone",
    category: "Project",
    description: "GPU Neural Visualizer code ran 100,000 times by global developers with zero server errors.",
    dateEarned: "2026-06-18",
    ownerUsername: "alexrivers",
    metric: "100K+ Runs",
    badgeLevel: "Gold",
    iconName: "Play",
  },
  {
    id: "ach-3",
    title: "Top 0.8% Global Developer Velocity",
    category: "Competition",
    description: "Maintained continuous production deployment speed and benchmark excellence on Developers App.",
    dateEarned: "2026-09-01",
    ownerUsername: "alexrivers",
    metric: "Top 0.8%",
    badgeLevel: "Gold",
    iconName: "TrendingUp",
  },
  {
    id: "ach-4",
    title: "Open-Source Community Mentor",
    category: "Community",
    description: "Reviewed and validated 65+ developer sandbox submissions for collegiate hackathon sprints.",
    dateEarned: "2026-10-14",
    ownerUsername: "alexrivers",
    metric: "65 Code Reviews",
    badgeLevel: "Silver",
    iconName: "Users",
  },
  {
    id: "ach-5",
    title: "Verified ZK Benchmark Validation",
    category: "Certification",
    description: "Algorithmic confirmation of sub-15ms zero-knowledge proof generation in isolated test sandbox.",
    dateEarned: "2026-11-04",
    ownerUsername: "alexrivers",
    metric: "14ms Proof Speed",
    badgeLevel: "Gold",
    iconName: "ShieldCheck",
  },
];

// Seed Merit Badges
export const INITIAL_BADGES: MeritBadge[] = [
  {
    id: "badge-gold",
    tier: "Gold",
    title: "Gold Merit Badge (Master Builder)",
    description: "Awarded to verified engineers in the top 1% global bracket with high-throughput project deliveries and hackathon wins.",
    reason: "Awarded for achieving 1st place in Inter-Varsity AI Grand Prix and delivering verified 60 FPS GPU sandbox.",
    criteria: [
      "Top 1% Global Leaderboard Ranking",
      "At least 3 Verified Public Projects in Sandbox",
      "1+ Major Hackathon Top-3 Placement",
      "Zero failed security checks in isolated runtime",
    ],
    awardDate: "2026-01-10",
    isEarned: true,
    verified: true,
    ownerUsername: "alexrivers",
    scoreRequirement: 950,
  },
  {
    id: "badge-silver",
    tier: "Silver",
    title: "Silver Merit Badge (Senior Contributor)",
    description: "Awarded to experienced software engineers with consistent repository git velocity and peer-reviewed code submissions.",
    reason: "Awarded upon publishing 10+ open-source components and achieving 90%+ sandbox test pass rate.",
    criteria: [
      "Top 10% Global Ranking",
      "5+ Validated Code Preview Modules",
      "Active Peer Code Reviews",
    ],
    awardDate: "2025-07-15",
    isEarned: true,
    verified: true,
    ownerUsername: "alexrivers",
    scoreRequirement: 750,
  },
  {
    id: "badge-bronze",
    tier: "Bronze",
    title: "Bronze Merit Badge (Verified Builder)",
    description: "Awarded to every developer who passes their first isolated sandbox code execution and completes identity verification.",
    reason: "Awarded upon successful account setup and first executable code submission.",
    criteria: [
      "Verified Developer Profile",
      "1st Successful Sandbox Run",
      "Terms & IP Agreement Signed",
    ],
    awardDate: "2025-04-12",
    isEarned: true,
    verified: true,
    ownerUsername: "alexrivers",
    scoreRequirement: 500,
  },
];

// Seed Uploaded Code Items
export const INITIAL_UPLOADED_CODE: UploadedCodeItem[] = [
  {
    id: "code-1",
    name: "GPU Shader Node Pipeline",
    description: "Raw WebGL2 vertex and fragment shaders for particle visualization.",
    language: "GLSL / TypeScript",
    category: "GPU Shaders",
    fileName: "shader_node_pipeline.ts",
    fileSize: "14.2 KB",
    uploadedAt: "2026-11-08",
    ownerUsername: "alexrivers",
    fileContent: `// GPU Shader Pipeline - Developers App Sandbox
export function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}`,
  },
  {
    id: "code-2",
    name: "Raft Consensus State Machine",
    description: "Pure Python implementation of leader election and heartbeat ping.",
    language: "Python",
    category: "Distributed Systems",
    fileName: "raft_consensus.py",
    fileSize: "8.6 KB",
    uploadedAt: "2026-10-25",
    ownerUsername: "alexrivers",
    fileContent: `# Raft Consensus State Machine
class RaftNode:
    def __init__(self, id):
        self.id = id
        self.state = "FOLLOWER"
        self.term = 0

    def start_election(self):
        self.state = "CANDIDATE"
        self.term += 1
        print(f"Node {self.id} started election for term {self.term}")

node = RaftNode(1)
node.start_election()`,
  },
];

// Seed Hiring Opportunities (for Organization Workspace)
export const INITIAL_OPPORTUNITIES: HiringOpportunity[] = [
  {
    id: "opp-1",
    orgName: "Vercel Systems",
    orgUsername: "vercelsystems",
    orgAvatar: "VS",
    title: "Senior Distributed Systems Engineer",
    type: "Full-time",
    skillsRequired: ["TypeScript", "Distributed Systems", "Raft", "Next.js", "Docker"],
    description: "We are hiring 4 Senior Distributed Systems Engineers to lead our serverless edge cluster scalability. Skip the traditional resume round: submit your runnable Developers App sandbox demo for direct review with our Founding Engineering team.",
    location: "San Francisco, CA / Remote",
    remote: true,
    compensation: "$180,000 - $240,000 USD + Equity",
    deadline: "2026-12-15",
    status: "Open",
    createdAt: "2026-11-01",
    applicantsCount: 7,
  },
  {
    id: "opp-2",
    orgName: "Vercel Systems",
    orgUsername: "vercelsystems",
    orgAvatar: "VS",
    title: "Principal WebGL & GPU Performance Architect",
    type: "Contract",
    skillsRequired: ["WebGL2", "GLSL", "Three.js", "GPU Shaders", "Performance Profiling"],
    description: "Seeking a world-class WebGL architect to build interactive 3D visualizations for our developer dashboard. 6-month contract with escrow protection.",
    location: "Global Remote",
    remote: true,
    compensation: "$95 - $140 / hour ($12,000/mo)",
    deadline: "2026-12-31",
    status: "Open",
    createdAt: "2026-11-05",
    applicantsCount: 4,
  },
  {
    id: "opp-3",
    orgName: "Apex Retail Solutions",
    orgUsername: "apexretail",
    orgAvatar: "AR",
    title: "Next.js Retail Inventory System Modernization",
    type: "Bounty",
    skillsRequired: ["Next.js", "TypeScript", "Tailwind CSS", "Barcode Scanner API"],
    description: "SME Escrow Opportunity: Looking for a 2-person developer squad to digitize our regional retail inventory into a modern Next.js 14 dashboard with live scanner support.",
    location: "Remote / Hybrid",
    remote: true,
    compensation: "$8,500 Fixed Contract Budget (In Escrow)",
    deadline: "2026-12-01",
    status: "Open",
    createdAt: "2026-11-10",
    applicantsCount: 3,
  },
  {
    id: "opp-4",
    orgName: "Supabase Labs",
    orgUsername: "supabaselabs",
    orgAvatar: "SB",
    title: "Database Reliability & Edge Replication Specialist",
    type: "Full-time",
    skillsRequired: ["PostgreSQL", "Go", "Distributed Storage", "CDC"],
    description: "Build low-latency database replication pipelines across global regions. Submit working benchmark passes on Developers App.",
    location: "Remote",
    remote: true,
    compensation: "$175,000 - $220,000 USD",
    deadline: "2027-01-15",
    status: "Open",
    createdAt: "2026-11-14",
    applicantsCount: 5,
  },
];

// Seed Applications
export const INITIAL_APPLICATIONS: OpportunityApplication[] = [
  {
    id: "app-1",
    opportunityId: "opp-1",
    opportunityTitle: "Senior Distributed Systems Engineer",
    orgUsername: "vercelsystems",
    developerUsername: "alexrivers",
    developerName: "Alex Rivers",
    developerAvatar: "AR",
    developerTier: "Gold",
    developerEmail: "alex.rivers@developersapp.io",
    coverNote: "I've attached my Autonomous Agent Consensus Protocol sandbox demo. It benchmarks under 18ms latency in isolated nodes.",
    sandboxProjectUrl: "https://developersapp.io/preview/agent-consensus",
    sandboxCodeSnippet: "const node = new ConsensusNode({ clusterSize: 5 }); await node.establishQuorum();",
    submittedAt: "2026-11-14 14:32",
    status: "Shortlisted",
  },
  {
    id: "app-2",
    opportunityId: "opp-1",
    opportunityTitle: "Senior Distributed Systems Engineer",
    orgUsername: "vercelsystems",
    developerUsername: "erostova",
    developerName: "Elena Rostova",
    developerAvatar: "ER",
    developerTier: "Gold",
    developerEmail: "elena.r@developersapp.io",
    coverNote: "Hi Vercel team, I optimized our zero-knowledge rollup to 14ms settlement. Review my runnable sandbox benchmark.",
    sandboxProjectUrl: "https://developersapp.io/preview/zk-rollup",
    submittedAt: "2026-11-15 10:15",
    status: "Reviewed",
  },
  {
    id: "app-3",
    opportunityId: "opp-2",
    opportunityTitle: "Principal WebGL & GPU Performance Architect",
    orgUsername: "vercelsystems",
    developerUsername: "alexrivers",
    developerName: "Alex Rivers",
    developerAvatar: "AR",
    developerTier: "Gold",
    developerEmail: "alex.rivers@developersapp.io",
    coverNote: "Check out my WebGL GPU Neural Visualizer project rendering 100K nodes at 60 FPS in-browser.",
    sandboxProjectUrl: "https://developersapp.io/preview/webgl-neural",
    submittedAt: "2026-11-16 11:20",
    status: "Shortlisted",
  },
];

// Seed Organization Purchases
export const INITIAL_PURCHASES: OrganizationPurchase[] = [
  {
    id: "purch-1",
    orgUsername: "vercelsystems",
    itemType: "Project License",
    title: "WebGL GPU Neural Shader Commercial License",
    beneficiaryName: "Alex Rivers",
    amountUsd: 1500,
    date: "2026-10-18",
    status: "Completed",
    invoiceNumber: "INV-VERCEL-2026-881",
  },
  {
    id: "purch-2",
    orgUsername: "vercelsystems",
    itemType: "Freelance Escrow",
    title: "Distributed Edge Consensus Architecture Sprint",
    beneficiaryName: "Alex Rivers",
    amountUsd: 3350,
    date: "2026-11-02",
    status: "In Escrow",
    invoiceNumber: "ESC-VERCEL-2026-042",
  },
  {
    id: "purch-3",
    orgUsername: "vercelsystems",
    itemType: "Hackathon Sponsorship",
    title: "Inter-Varsity AI Grand Prix 2026 Title Sponsor",
    beneficiaryName: "Developers App Foundation",
    amountUsd: 15000,
    date: "2026-11-10",
    status: "Completed",
    invoiceNumber: "SPON-IVAI-2026-001",
  },
];

// Seed Discoverable Developers (for Organization Talent Discovery)
export const DISCOVERABLE_DEVELOPERS: DeveloperProfile[] = [
  DEFAULT_DEVELOPER,
  {
    fullName: "Elena Rostova",
    email: "elena.r@developersapp.io",
    phone: "+1 (555) 492-1082",
    dob: "1997-09-14",
    specialization: "Zero-Knowledge Cryptography & Distributed Ledgers",
    username: "erostova",
    role: "developer",
    avatarUrl: "ER",
    tier: "Gold",
    bio: "Lead Smart Contract Engineer. Author of 14ms zk-Rollup settlement protocols and cryptographic circuits.",
    skills: ["Rust", "Solidity", "Zero-Knowledge", "TypeScript", "WASM", "Go"],
    stats: {
      profileViews: 2420,
      projectViews: 6810,
      engagementRate: 96.8,
      globalRank: "Top 0.5%",
      totalEarnings: 6200,
      projectsCount: 18,
    },
  },
  {
    fullName: "Marcus Vance",
    email: "marcus.v@developersapp.io",
    phone: "+1 (555) 781-9923",
    dob: "1995-12-03",
    specialization: "Low-Latency Distributed Consensus & Core Infra",
    username: "mvance",
    role: "developer",
    avatarUrl: "MV",
    tier: "Gold",
    bio: "#1 Global Leaderboard engineer. Specializing in high-throughput Raft consensus and Linux kernel optimization.",
    skills: ["C++", "Rust", "Go", "Distributed Systems", "Linux eBPF"],
    stats: {
      profileViews: 3105,
      projectViews: 8940,
      engagementRate: 98.1,
      globalRank: "Top 0.2%",
      totalEarnings: 8900,
      projectsCount: 22,
    },
  },
  {
    fullName: "Chloe Dupont",
    email: "chloe.d@developersapp.io",
    phone: "+33 6 12 34 56 78",
    dob: "1999-03-21",
    specialization: "Interactive WebGL, Three.js & Creative Frontend",
    username: "cdupont",
    role: "developer",
    avatarUrl: "CD",
    tier: "Gold",
    bio: "Award-winning creative technologist building 3D web experiences, GLSL shaders, and tactile visual interfaces.",
    skills: ["Three.js", "WebGL", "TypeScript", "React", "GSAP", "GLSL"],
    stats: {
      profileViews: 1540,
      projectViews: 4200,
      engagementRate: 91.5,
      globalRank: "Top 1.2%",
      totalEarnings: 3400,
      projectsCount: 11,
    },
  },
  {
    fullName: "Kenji Sato",
    email: "kenji.s@developersapp.io",
    phone: "+81 90 1234 5678",
    dob: "2001-08-11",
    specialization: "Autonomous AI Agents & Multi-Modal LLMs",
    username: "ksato",
    role: "developer",
    avatarUrl: "KS",
    tier: "Silver",
    bio: "Tokyo University AI Lab researcher. Developing multi-agent autonomous debate systems and tool-calling harnesses.",
    skills: ["Python", "PyTorch", "FastAPI", "TypeScript", "LangChain"],
    stats: {
      profileViews: 1120,
      projectViews: 2890,
      engagementRate: 88.4,
      globalRank: "Top 4.5%",
      totalEarnings: 1850,
      projectsCount: 8,
    },
  },
  {
    fullName: "Victor Emokpare",
    email: "victor.e@developersapp.io",
    phone: "+234 802 345 6789",
    dob: "2000-05-18",
    specialization: "Full-Stack WebGL & Next.js Systems",
    username: "damdavik",
    role: "developer",
    avatarUrl: "VE",
    tier: "Bronze",
    bio: "Passionate builder creating fast, accessible web apps and WebGL interactive shaders. Excited to collaborate.",
    skills: ["Next.js", "WebGL", "TypeScript", "Tailwind CSS", "Python"],
    stats: {
      profileViews: 650,
      projectViews: 1420,
      engagementRate: 84.1,
      globalRank: "Top 12.0%",
      totalEarnings: 450,
      projectsCount: 4,
    },
  },
];

// Organization Contact Info
export const DEFAULT_ORG_CONTACT = {
  officialEmail: "recruiting@vercel.developersapp.io",
  phone: "+1 (888) 400-9872",
  address: "440 N Barranca Ave #4133, Covina, CA 91723",
  representativeName: "Guillermo Rauch",
  representativeRole: "CEO & Founder",
  website: "https://vercel.com",
  supportChannel: "https://developersapp.io/org/vercel/support",
};

// Data Store Controller with LocalStorage Synchronization
class DataStore {
  private isBrowser(): boolean {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  }

  // --- PROJECTS ---
  public getProjects(username?: string): Project[] {
    if (!this.isBrowser()) return INITIAL_PROJECTS;
    try {
      const stored = localStorage.getItem("da_projects");
      const list: Project[] = stored ? JSON.parse(stored) : INITIAL_PROJECTS;
      if (username) return list.filter((p) => p.ownerUsername === username);
      return list;
    } catch {
      return INITIAL_PROJECTS;
    }
  }

  public getProjectById(id: string): Project | undefined {
    return this.getProjects().find((p) => p.id === id);
  }

  public saveProject(project: Project): Project {
    const list = this.getProjects();
    const index = list.findIndex((p) => p.id === project.id);
    let updated: Project[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = { ...project, updatedAt: new Date().toISOString().split("T")[0] };
    } else {
      updated = [project, ...list];
    }
    if (this.isBrowser()) {
      localStorage.setItem("da_projects", JSON.stringify(updated));
    }
    return project;
  }

  public deleteProject(id: string): boolean {
    const list = this.getProjects();
    const filtered = list.filter((p) => p.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem("da_projects", JSON.stringify(filtered));
    }
    return true;
  }

  // --- CERTIFICATES ---
  public getCertificates(username?: string): Certificate[] {
    if (!this.isBrowser()) return INITIAL_CERTIFICATES;
    try {
      const stored = localStorage.getItem("da_certificates");
      const list: Certificate[] = stored ? JSON.parse(stored) : INITIAL_CERTIFICATES;
      if (username) return list.filter((c) => c.ownerUsername === username);
      return list;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  }

  public saveCertificate(cert: Certificate): Certificate {
    const list = this.getCertificates();
    const index = list.findIndex((c) => c.id === cert.id);
    let updated: Certificate[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = cert;
    } else {
      updated = [cert, ...list];
    }
    if (this.isBrowser()) {
      localStorage.setItem("da_certificates", JSON.stringify(updated));
    }
    return cert;
  }

  public deleteCertificate(id: string): boolean {
    const list = this.getCertificates();
    const filtered = list.filter((c) => c.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem("da_certificates", JSON.stringify(filtered));
    }
    return true;
  }

  // --- ACHIEVEMENTS ---
  public getAchievements(username?: string): Achievement[] {
    if (!this.isBrowser()) return INITIAL_ACHIEVEMENTS;
    try {
      const stored = localStorage.getItem("da_achievements");
      const list: Achievement[] = stored ? JSON.parse(stored) : INITIAL_ACHIEVEMENTS;
      if (username) return list.filter((a) => a.ownerUsername === username);
      return list;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  }

  // --- MERIT BADGES ---
  public getBadges(username?: string): MeritBadge[] {
    if (!this.isBrowser()) return INITIAL_BADGES;
    try {
      const stored = localStorage.getItem("da_badges");
      const list: MeritBadge[] = stored ? JSON.parse(stored) : INITIAL_BADGES;
      if (username) return list.filter((b) => b.ownerUsername === username);
      return list;
    } catch {
      return INITIAL_BADGES;
    }
  }

  // --- UPLOADED CODE ---
  public getUploadedCode(username?: string): UploadedCodeItem[] {
    if (!this.isBrowser()) return INITIAL_UPLOADED_CODE;
    try {
      const stored = localStorage.getItem("da_uploaded_code");
      const list: UploadedCodeItem[] = stored ? JSON.parse(stored) : INITIAL_UPLOADED_CODE;
      if (username) return list.filter((item) => item.ownerUsername === username);
      return list;
    } catch {
      return INITIAL_UPLOADED_CODE;
    }
  }

  public saveUploadedCode(item: UploadedCodeItem): UploadedCodeItem {
    const list = this.getUploadedCode();
    const updated = [item, ...list];
    if (this.isBrowser()) {
      localStorage.setItem("da_uploaded_code", JSON.stringify(updated));
    }
    return item;
  }

  public deleteUploadedCode(id: string): boolean {
    const list = this.getUploadedCode();
    const filtered = list.filter((c) => c.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem("da_uploaded_code", JSON.stringify(filtered));
    }
    return true;
  }

  // --- OPPORTUNITIES & JOBS ---
  public getOpportunities(): HiringOpportunity[] {
    if (!this.isBrowser()) return INITIAL_OPPORTUNITIES;
    try {
      const stored = localStorage.getItem("da_opportunities");
      return stored ? JSON.parse(stored) : INITIAL_OPPORTUNITIES;
    } catch {
      return INITIAL_OPPORTUNITIES;
    }
  }

  public saveOpportunity(opp: HiringOpportunity): HiringOpportunity {
    const list = this.getOpportunities();
    const index = list.findIndex((o) => o.id === opp.id);
    let updated: HiringOpportunity[];
    if (index >= 0) {
      updated = [...list];
      updated[index] = opp;
    } else {
      updated = [opp, ...list];
    }
    if (this.isBrowser()) {
      localStorage.setItem("da_opportunities", JSON.stringify(updated));
    }
    return opp;
  }

  public deleteOpportunity(id: string): boolean {
    const list = this.getOpportunities();
    const filtered = list.filter((o) => o.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem("da_opportunities", JSON.stringify(filtered));
    }
    return true;
  }

  // --- APPLICATIONS ---
  public getApplications(orgUsername?: string): OpportunityApplication[] {
    if (!this.isBrowser()) return INITIAL_APPLICATIONS;
    try {
      const stored = localStorage.getItem("da_applications");
      const list: OpportunityApplication[] = stored ? JSON.parse(stored) : INITIAL_APPLICATIONS;
      if (orgUsername) return list.filter((a) => a.orgUsername === orgUsername);
      return list;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  public submitApplication(app: OpportunityApplication): OpportunityApplication {
    const list = this.getApplications();
    const updated = [app, ...list];
    if (this.isBrowser()) {
      localStorage.setItem("da_applications", JSON.stringify(updated));
    }
    return app;
  }

  public updateApplicationStatus(id: string, status: OpportunityApplication["status"]): boolean {
    const list = this.getApplications();
    const updated = list.map((a) => (a.id === id ? { ...a, status } : a));
    if (this.isBrowser()) {
      localStorage.setItem("da_applications", JSON.stringify(updated));
    }
    return true;
  }

  // --- SAVED CANDIDATES & PROJECTS ---
  public getSavedCandidates(orgUsername: string): string[] {
    if (!this.isBrowser()) return ["erostova", "alexrivers"];
    try {
      const stored = localStorage.getItem(`da_saved_cand_${orgUsername}`);
      return stored ? JSON.parse(stored) : ["erostova", "alexrivers"];
    } catch {
      return ["erostova", "alexrivers"];
    }
  }

  public toggleSaveCandidate(orgUsername: string, devUsername: string): boolean {
    const saved = this.getSavedCandidates(orgUsername);
    let updated: string[];
    let isNowSaved = false;
    if (saved.includes(devUsername)) {
      updated = saved.filter((u) => u !== devUsername);
    } else {
      updated = [...saved, devUsername];
      isNowSaved = true;
    }
    if (this.isBrowser()) {
      localStorage.setItem(`da_saved_cand_${orgUsername}`, JSON.stringify(updated));
    }
    return isNowSaved;
  }

  public getSavedProjects(orgUsername: string): string[] {
    if (!this.isBrowser()) return ["proj-1"];
    try {
      const stored = localStorage.getItem(`da_saved_proj_${orgUsername}`);
      return stored ? JSON.parse(stored) : ["proj-1"];
    } catch {
      return ["proj-1"];
    }
  }

  public toggleSaveProject(orgUsername: string, projId: string): boolean {
    const saved = this.getSavedProjects(orgUsername);
    let updated: string[];
    let isNowSaved = false;
    if (saved.includes(projId)) {
      updated = saved.filter((id) => id !== projId);
    } else {
      updated = [...saved, projId];
      isNowSaved = true;
    }
    if (this.isBrowser()) {
      localStorage.setItem(`da_saved_proj_${orgUsername}`, JSON.stringify(updated));
    }
    return isNowSaved;
  }

  // --- PURCHASES ---
  public getPurchases(orgUsername?: string): OrganizationPurchase[] {
    if (!this.isBrowser()) return INITIAL_PURCHASES;
    try {
      const stored = localStorage.getItem("da_purchases");
      const list: OrganizationPurchase[] = stored ? JSON.parse(stored) : INITIAL_PURCHASES;
      if (orgUsername) return list.filter((p) => p.orgUsername === orgUsername);
      return list;
    } catch {
      return INITIAL_PURCHASES;
    }
  }

  // --- TALENT DIRECTORY ---
  public getDiscoverableDevelopers(): DeveloperProfile[] {
    return DISCOVERABLE_DEVELOPERS;
  }
}

export const dataStore = new DataStore();
