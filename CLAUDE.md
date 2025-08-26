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

### Development Workflow
- Use `npm run dev` for development with hot reload enabled
- Always run `npm run lint` before committing changes
- The project uses Turbopack for faster development builds

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

## Version Management

### Approach
- **Semantic Versioning**: Major.Minor.Patch format
- **Git Tags**: Version tags for release management
- **GitHub Releases**: Automated release notes generation
- **ADR System**: Documentation of architectural decisions

### Release Process
```bash
# Create version tag
git tag -a v1.1.0 -m "Add Apple-style flat design favicon"
git push origin v1.1.0

# GitHub Releases automatically creates release page
```

## Work History
- 2025-08-21: Project initialization, initial setup
- 2025-08-21: Slidev sample environment setup (sample directory)
- 2025-01-26: Logo/favicon design implementation with Apple-style flat design
- 2025-01-26: ADR system implementation for decision tracking