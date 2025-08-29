# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **command sharing web application** built with Next.js 15, allowing users to:
- Share and discover command line commands
- Follow other users and see their commands
- Edit and manage their own commands
- Authentication via Supabase Auth

## Session Logging Guidelines

### Starting a New Session
Always create a GitHub issue at the beginning of each session:
```bash
gh issue create --repo ksyunnnn/claude --title "[Session Log] <Brief Description>" --body "<Session content>"
```

### Issue Format Rules
- Use only h3 (###) headings in issue body (no h1/h2)
- Keep content concise and structured
- Include: goals, interaction records, decisions, links
- Update issue as session progresses

### Logging Best Practices
- Record key decisions and implementations
- Note any blockers or challenges
- Include relevant code snippets
- Link to commits and PRs

## Development Commands

### Core Commands
- `npm run dev` - Start development server with Turbopack (http://localhost:3000)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run test:e2e` - Run Playwright end-to-end tests
- `npm run test:e2e:ui` - Run Playwright tests with UI

### Supabase Local Development Commands
- `npm run db:start` - Start local Supabase services (requires Docker)
- `npm run db:stop` - Stop local Supabase services
- `npm run db:status` - Check status of local Supabase services
- `npm run db:reset` - Reset database (apply all migrations and seed data)
- `npm run db:migrate` - Create a new migration file
- `npm run db:studio` - Open Supabase Studio in browser
- `npm run db:mailbox` - Open Inbucket (local email testing) in browser

### Development Workflow
- Use `npm run dev` for development with hot reload enabled
- Always run `npm run lint` before committing changes
- The project uses Turbopack for faster development builds

### Local Supabase Development Setup

#### Prerequisites
- Docker Desktop must be installed and running
- Supabase CLI installed (currently v2.34.3, update recommended to v2.39.2)

#### Setup Commands
```bash
# Start local Supabase services
supabase start

# Check service status
supabase status

# Stop services (when done)
supabase stop

# Reset database (apply migrations and seed data)
supabase db reset
```

#### Local Services
- **API Server**: http://127.0.0.1:54321
- **Database**: postgresql://postgres:postgres@127.0.0.1:54322/postgres
- **Studio (Admin)**: http://127.0.0.1:54323
- **Inbucket (Email Testing)**: http://127.0.0.1:54324

#### Environment Configuration
For local development, update `.env.local`:
```bash
# Supabase - Local Development
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

#### Database Management
- Migrations are automatically applied when starting Supabase
- Current migrations: initial_schema, fix_rls_policies, create_follows_table, create_likes_table
- Use Supabase Studio for data visualization and management

## Architecture Overview

This is a **Next.js 15 App Router** project with the following stack:
- **Framework**: Next.js 15.4.6 with App Router architecture
- **Language**: TypeScript 5 with strict configuration
- **Database**: Supabase with PostgreSQL
- **Authentication**: Supabase Auth with GitHub OAuth
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Icons**: Lucide React
- **Testing**: Playwright for E2E testing
- **Deployment**: Vercel

### Project Structure
```
src/
├── app/                           # App Router pages and layouts
│   ├── [username]/               # User profile pages
│   │   ├── [commandSlug]/       # Individual command pages
│   │   │   └── edit/            # Command edit pages
│   │   ├── followers/           # User followers page
│   │   ├── following/           # User following page
│   │   └── page.tsx            # User profile page
│   ├── auth/callback/           # OAuth callback handler
│   ├── new/                     # Create new command
│   ├── settings/                # User settings
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/                 # Reusable UI components
│   ├── auth/                  # Authentication components
│   ├── ui/                    # Base UI components (shadcn/ui)
│   ├── command-actions.tsx    # Command interaction buttons
│   ├── edit-command-form.tsx  # Command editing form
│   ├── follow-button.tsx      # User follow/unfollow button
│   └── navigation.tsx         # Global navigation
├── lib/                       # Utility functions and actions
│   ├── actions/              # Server actions
│   ├── supabase/            # Supabase client configuration
│   └── utils.ts             # Helper utilities
├── types/                    # TypeScript type definitions
└── middleware.ts            # Next.js middleware for auth
```

### Key Features
- **User Authentication**: GitHub OAuth via Supabase Auth
- **Command Sharing**: Users can create, edit, and share command line commands
- **Social Features**: Follow system, user profiles, activity feeds
- **Real-time Updates**: Supabase real-time subscriptions
- **Responsive Design**: Mobile-first Tailwind CSS design
- **End-to-End Testing**: Comprehensive Playwright test suite

### Database Schema
- **users**: User profiles and metadata
- **commands**: Shared command line commands
- **follows**: User follow relationships

### Key Architecture Patterns
- **App Router**: Uses Next.js 13+ App Router pattern in `src/app/`
- **Server Actions**: Form handling and data mutations via Next.js server actions
- **Row Level Security**: Supabase RLS policies for data access control
- **Component Composition**: Radix UI primitives with custom styling
- **Type Safety**: Full TypeScript coverage with Supabase generated types

### Authentication Flow
- GitHub OAuth integration via Supabase Auth
- Middleware protection for authenticated routes
- Session management with server-side rendering support

### Styling Approach
- Tailwind CSS v4 with PostCSS plugin configuration
- CSS custom properties for theming with light/dark mode support
- Radix UI components for accessibility and behavior
- shadcn/ui design patterns for consistency

### Configuration Files
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript compiler options with path mapping
- `eslint.config.mjs` - ESLint flat config with Next.js rules
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `components.json` - shadcn/ui configuration
- `playwright.config.ts` - Playwright test configuration
- `supabase/config.toml` - Supabase local development configuration

## Design System

### Brand Identity
- **Logo/Favicon**: Modern interpretation of command prompt (`>`) using double chevrons
- **Design Style**: Apple-like flat design, minimalism
- **Color Scheme**: Dark grey (#4B5563) for sophisticated, calm impression
- **Technical Implementation**: Next.js ImageResponse API for programmatic icon generation

### Design Decisions
All major design and technical decisions are documented in [Architecture Decision Records (ADR)](docs/adr/):
- [ADR-0001: Favicon Design Technology Choice](docs/adr/0001-favicon-design.md)
- [ADR-0002: Version Management Approach](docs/adr/0002-version-management.md)
- [ADR-0003: GitHub Releases Release Process](docs/adr/0003-release-process.md)

## Version Management

### Approach
- **Semantic Versioning**: Major.Minor.Patch format
- **Git Tags**: Version tags for release management
- **GitHub Releases**: Automated release notes generation
- **ADR System**: Documentation of architectural decisions

### Release Process

#### Quick Release Steps
```bash
# 1. Pre-release checks
npm run lint && npm run build

# 2. Commit changes (Japanese message)
git add [files]
git commit -m "新機能: [brief description]"

# 3. Create version tag (English message)
git tag -a v1.2.0 -m "Brief description of changes"

# 4. Push to remote
git push origin main --tags

# 5. Create GitHub Release manually from tags page
```

#### Detailed Process
For complete step-by-step instructions, see:
- [RELEASE.md](RELEASE.md) - Comprehensive release guide
- [ADR-0003: Release Process](docs/adr/0003-release-process.md) - Technical decision rationale
- [Release Template](.github/release-template.md) - GitHub Release template

#### Version Examples
- **v1.1.0** (2025-01-26): Apple-style favicon + ADR system
- **v1.0.0**: Initial application release

## 🔍 Documentation Update Automation

### IMPORTANT: Automatic Documentation Updates
When implementing changes, Claude MUST automatically check and update documentation as follows:

#### High Priority Changes (Mandatory Updates)
- **New pages/features**: `src/app/*/page.tsx` creation → Update README.md "Key Features" + usage instructions
- **Package dependencies**: `package.json` changes → Update README.md "Technology Stack" section
- **Database changes**: `supabase/migrations/` → Update README.md database design + RLS explanations
- **New UI components**: Major `src/components/` additions → Update README.md architecture details

#### Medium Priority Changes (Recommended Updates)
- **Configuration changes**: `next.config.ts`, `middleware.ts` → Update relevant sections
- **New Server Actions**: `src/lib/actions/` → Update architecture patterns explanation
- **Routing changes**: New directories in `src/app/` → Update URL structure documentation

#### Update Process
1. **Detect**: Automatically identify changes requiring documentation updates
2. **Analyze**: Determine which sections need modification
3. **Propose**: Present specific update suggestions to user
4. **Execute**: Update documentation after user approval

#### Target Documents
- **README.md**: Features, tech stack, setup instructions, architecture details
- **CLAUDE.md**: Architecture overview, development commands, project structure
- **docs/adr/README.md**: ADR list updates when new ADRs are created

### Documentation Sync Commands
```bash
# When implementing changes, always run:
# 1. Check if documentation needs updates
# 2. Propose specific changes
# 3. Update after confirmation
```

## Work History
- 2025-08-21: Project initialization, initial setup
- 2025-08-21: Slidev sample environment setup (sample directory)
- 2025-01-26: Logo/favicon design implementation with Apple-style flat design (v1.1.0)
- 2025-01-26: ADR system implementation for decision tracking
- 2025-01-26: Release process documentation and standardization
- 2025-08-26: Documentation update automation system implementation