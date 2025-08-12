# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

### Development Workflow
- Use `npm run dev` for development with hot reload enabled
- Always run `npm run lint` before committing changes
- The project uses Turbopack for faster development builds

## Architecture Overview

This is a **Next.js 15 App Router** project with the following stack:
- **Framework**: Next.js 15.4.6 with App Router architecture
- **Language**: TypeScript 5 with strict configuration
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono (next/font/google)
- **Linting**: ESLint with Next.js TypeScript configuration

### Project Structure
```
src/
├── app/                    # App Router pages and layouts
│   ├── layout.tsx         # Root layout with font configuration
│   ├── page.tsx           # Home page component  
│   └── globals.css        # Global styles with CSS variables
public/                    # Static assets (SVG icons)
```

### Key Architecture Patterns
- **App Router**: Uses Next.js 13+ App Router pattern in `src/app/`
- **TypeScript Configuration**: Strict mode enabled with path mapping (`@/*` → `./src/*`)
- **Styling System**: CSS variables for theming with light/dark mode support
- **Font Optimization**: Google Fonts loaded via next/font with CSS variables

### Styling Approach
- Tailwind CSS v4 with PostCSS plugin configuration
- CSS custom properties for theme management (background, foreground colors)
- Dark mode support via `prefers-color-scheme`
- Font variables set in root layout: `--font-geist-sans`, `--font-geist-mono`

### Configuration Files
- `next.config.ts` - Next.js configuration (currently default)
- `tsconfig.json` - TypeScript compiler options with Next.js plugin
- `eslint.config.mjs` - ESLint flat config with Next.js rules
- `postcss.config.mjs` - PostCSS with Tailwind plugin