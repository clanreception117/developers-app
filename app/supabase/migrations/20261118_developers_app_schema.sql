-- Developers App — Production Schema & Row Level Security (RLS)
-- Bridging the Gap Between Codes and Developers' Showcase

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS / PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(32) NOT NULL CHECK (role IN ('developer', 'organization')),
  username VARCHAR(64) UNIQUE NOT NULL,
  full_name VARCHAR(128) NOT NULL,
  email VARCHAR(128) NOT NULL,
  phone VARCHAR(32),
  avatar_url TEXT,
  bio TEXT,
  tier VARCHAR(16) DEFAULT 'Bronze' CHECK (tier IN ('Gold', 'Silver', 'Bronze')),
  specialization VARCHAR(128),
  skills TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_username VARCHAR(64) NOT NULL,
  title VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(64) NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  technologies TEXT[] NOT NULL DEFAULT '{}',
  thumbnail_url TEXT,
  repo_url TEXT,
  live_url TEXT,
  visibility VARCHAR(16) DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
  version VARCHAR(16) DEFAULT '1.0.0',
  status VARCHAR(16) DEFAULT 'Active' CHECK (status IN ('Active', 'Archived', 'Draft')),
  stars INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PROJECT CODE FILES
CREATE TABLE IF NOT EXISTS public.project_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  name VARCHAR(128) NOT NULL,
  path TEXT NOT NULL,
  content TEXT NOT NULL,
  language VARCHAR(32) NOT NULL,
  size_bytes INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CERTIFICATES TABLE
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_username VARCHAR(64) NOT NULL,
  title VARCHAR(128) NOT NULL,
  issuing_org VARCHAR(128) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_id VARCHAR(64) NOT NULL,
  verification_url TEXT NOT NULL,
  file_url TEXT,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_username VARCHAR(64) NOT NULL,
  title VARCHAR(128) NOT NULL,
  category VARCHAR(32) NOT NULL CHECK (category IN ('Project', 'Hackathon', 'Competition', 'Community', 'Certification')),
  description TEXT NOT NULL,
  date_earned DATE NOT NULL,
  metric VARCHAR(64),
  badge_level VARCHAR(16) CHECK (badge_level IN ('Gold', 'Silver', 'Bronze')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MERIT BADGES TABLE
CREATE TABLE IF NOT EXISTS public.merit_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_username VARCHAR(64) NOT NULL,
  tier VARCHAR(16) NOT NULL CHECK (tier IN ('Gold', 'Silver', 'Bronze')),
  title VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  reason TEXT NOT NULL,
  criteria TEXT[] NOT NULL DEFAULT '{}',
  award_date DATE NOT NULL,
  is_earned BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. UPLOADED CODE ARCHIVES
CREATE TABLE IF NOT EXISTS public.uploaded_code (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_username VARCHAR(64) NOT NULL,
  name VARCHAR(128) NOT NULL,
  description TEXT,
  language VARCHAR(32) NOT NULL,
  category VARCHAR(64) NOT NULL,
  file_name VARCHAR(128) NOT NULL,
  file_size VARCHAR(32) NOT NULL,
  file_content TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. OPPORTUNITIES & JOBS TABLE (Organization Created)
CREATE TABLE IF NOT EXISTS public.opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  org_name VARCHAR(128) NOT NULL,
  org_username VARCHAR(64) NOT NULL,
  title VARCHAR(128) NOT NULL,
  type VARCHAR(32) NOT NULL CHECK (type IN ('Full-time', 'Contract', 'Internship', 'Bounty')),
  skills_required TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  location VARCHAR(128) NOT NULL,
  remote BOOLEAN DEFAULT TRUE,
  compensation VARCHAR(128) NOT NULL,
  deadline DATE NOT NULL,
  status VARCHAR(16) DEFAULT 'Open' CHECK (status IN ('Open', 'Closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. APPLICATIONS TABLE (Developer Applications)
CREATE TABLE IF NOT EXISTS public.opportunity_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  opportunity_title VARCHAR(128) NOT NULL,
  org_username VARCHAR(64) NOT NULL,
  developer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  developer_username VARCHAR(64) NOT NULL,
  developer_name VARCHAR(128) NOT NULL,
  developer_email VARCHAR(128) NOT NULL,
  cover_note TEXT NOT NULL,
  sandbox_project_url TEXT,
  sandbox_code_snippet TEXT,
  status VARCHAR(16) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Shortlisted', 'Rejected')),
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. SAVED DEVELOPERS & PROJECTS (Organization Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  org_username VARCHAR(64) NOT NULL,
  developer_username VARCHAR(64) NOT NULL,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_username, developer_username)
);

CREATE TABLE IF NOT EXISTS public.saved_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  org_username VARCHAR(64) NOT NULL,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_username, project_id)
);

-- 12. PURCHASES & ESCROW (Organization Transactions)
CREATE TABLE IF NOT EXISTS public.organization_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  org_username VARCHAR(64) NOT NULL,
  item_type VARCHAR(64) NOT NULL CHECK (item_type IN ('Project License', 'Freelance Escrow', 'Hackathon Sponsorship')),
  title VARCHAR(128) NOT NULL,
  beneficiary_name VARCHAR(128) NOT NULL,
  amount_usd NUMERIC(10, 2) NOT NULL,
  status VARCHAR(32) DEFAULT 'Completed' CHECK (status IN ('Completed', 'In Escrow', 'Active')),
  invoice_number VARCHAR(64) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merit_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_code ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunity_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_purchases ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, owner update
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Projects: Public projects readable by everyone; private projects only by owner
CREATE POLICY "Public projects are viewable by all" ON public.projects FOR SELECT USING (visibility = 'public' OR auth.uid() = owner_id);
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = owner_id);

-- Certificates: Viewable by all; manageable only by owner
CREATE POLICY "Certificates are viewable by all" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Users can insert own certificates" ON public.certificates FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users can delete own certificates" ON public.certificates FOR DELETE USING (auth.uid() = owner_id);

-- Opportunities: Open listings viewable by all; manageable only by creating organization
CREATE POLICY "Opportunities viewable by all" ON public.opportunities FOR SELECT USING (true);
CREATE POLICY "Organizations can manage own opportunities" ON public.opportunities FOR ALL USING (auth.uid() = org_id);

-- Applications: Viewable by applicant developer AND the targeted organization
CREATE POLICY "Applications viewable by applicant or targeted org" ON public.opportunity_applications
  FOR SELECT USING (auth.uid() = developer_id OR org_username IN (SELECT username FROM public.profiles WHERE id = auth.uid()));
CREATE POLICY "Developers can submit applications" ON public.opportunity_applications FOR INSERT WITH CHECK (auth.uid() = developer_id);
