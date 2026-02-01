# Agent Instructions — Link Shortener Project

## Purpose & Scope

This document instructs language-model based agents (LLMs) working on the Link Shortener Project. It defines coding conventions, required behaviours, safety constraints, and workflow expectations so agents produce consistent, secure, and maintainable changes.

## How to Use These Instructions

- Read this file before making changes.
- **CRITICAL:** Before generating ANY code, you MUST read the relevant individual instruction file from the `/docs` directory. This is a hard requirement, not optional.
- Always start by creating a short TODO plan using the project's task tracker.
- Keep edits minimal and targeted; prefer small PRs with clear intent.

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory. The following files contain critical instructions that MUST be reviewed before writing code in those areas:

- [agents-auth.md](docs/agents-auth.md) — Clerk authentication requirements, protected routes, and modal-based sign in/up
- [agents-frontend.md](docs/agents-frontend.md) — shadcn/ui components, Next.js client/server components, Tailwind styling, accessibility

## Project Overview (quick)

- Frontend and routes: `app/`
- Database layer: `db/` (`db/index.ts`, `db/schema.ts`)
- Utilities: `lib/` (`lib/utils.ts`)
- Public assets: `public/`
- Config: `drizzle.config.ts`, `eslint.config.mjs`, `tsconfig.json`

## High-level Rules for LLM Agents

1. **READ RELEVANT DOCS FIRST (CRITICAL):** Before generating ANY code, you MUST read the relevant individual instruction file from the `/docs` directory. Do not proceed with code generation until you have reviewed the applicable guidelines for authentication, frontend components, database operations, etc. This is non-negotiable.
2. Safety first: refuse to provide or add code that is illegal, malicious, or violates privacy. When encountering such requests reply: "Sorry, I can't assist with that."
3. Minimal and reversible: make the smallest change that solves the problem. Prefer edits that are easy to review and revert.
4. Explain intent: each change should be accompanied by a concise rationale in PR/commit message.
5. Maintain tests and lint pass: do not merge changes that introduce linting or type errors.
6. Use environment variables for secrets — never hard-code credentials.

## Coding Standards

- Language: TypeScript only.
- Formatting & linting: follow `eslint.config.mjs`. Use the `lint` script before committing:

```bash
npm run lint
```

- Follow Next.js `app/` conventions for server vs client components. Keep UI logic in components and business logic in `lib/` or `db/`.
- Use `drizzle-orm` for database queries. Keep queries efficient and parameterized.
- Validate all external input (API payloads, query params). Prefer small, explicit validators (e.g., manual checks or `zod` if pre-approved).

## Database & Migrations

- Use `db/schema.ts` as the canonical schema. If adding schema changes, include migration notes and run `drizzle-kit` commands as documented by the team.
- Optimize lookups for the link-shortening workload (index fields for slug and owner). Avoid N+1 queries.

## API Routes & Security

- Validate and sanitize all incoming data in API routes.
- Rate-limit or protect endpoints that generate many short links to prevent abuse.
- Use `process.env` for keys, DB URLs, and provider secrets. Document required env vars in `README.md`.

## Testing and Local Verification

- There are no automated test scripts in `package.json` by default; add tests if you introduce non-trivial logic.
- Quick local commands:

```bash
npm run dev       # run locally
npm run build     # build
npm run start     # start built app
npm run lint      # run eslint
```

## Commits & Pull Requests

- Commit message format:
  - `feat: Short description` for new features
  - `fix: Short description` for bug fixes
  - `chore: Short description` for maintenance
  - `docs: Short description` for docs
- PR checklist (LLM must ensure):
  - **Purpose:** one-sentence description
  - **Files changed:** short summary
  - **Testing:** how to verify changes locally
  - **Rollout/Rollback:** notes if production effects exist

## Code Review Guidelines (for LLMs producing PRs)

- Keep PRs focused and < 300 lines where possible.
- Include inline notes for non-obvious logic and algorithmic choices.
- Point out possible follow-ups (e.g., performance tuning, additional tests).

## LLM-Specific Behavioral Rules

- Always produce a short plan before editing files. Use the project's TODO tool to track progress.
- Before running any automated edits or tool calls, provide a one-line preamble explaining intent.
- Prefer deterministic edits: avoid non-deterministic code generation (randomized test data, timestamps) unless required and properly isolated.
- Never add or modify secrets in code. If a secret is needed, instruct the human to add it to environment configuration.
- If an ambiguity remains after reasonable inference, ask a clarifying question rather than guessing.

## Example Templates

Commit message example:

```
feat: Add slug uniqueness check to link creation

- validate incoming slug format
- check slug uniqueness in DB and append suffix when conflict
```

PR description template:

```
Purpose: <one-line summary>

Changes:
- <file1> — short note
- <file2> — short note

How to test:
1. npm run dev
2. Create a short link at /api/create

Notes:
- migration: none
```

## Checklist for Merging

- Linted and compiles without TypeScript errors
- No secrets added into repository
- PR reviewer assigned
- Reasonable testing steps documented

## When to Escalate to Human Maintainer

- Security-sensitive changes (auth, secrets, DB credentials)
- Schema or migration changes with production impact
- Any request to integrate external paid services or new credentials

## Maintenance & Ownership

- Add new agent-specific docs to this `docs/` directory as separate markdown files, one per agent role (e.g., `agents-db.md`, `agents-frontend.md`).

---

If you want, I can now:

- create `docs/agents-db.md` and `docs/agents-frontend.md` with focused rules, or
- run `npm run lint` locally and report results.
