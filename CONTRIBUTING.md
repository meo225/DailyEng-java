# Contributing to DailyEng

## Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use | Example |
|---|---|---|
| `feat:` | New feature or data | `feat: add speaking bookmarks` |
| `fix:` | Bug fix | `fix: correct JWT expiry check` |
| `refactor:` | Code restructuring, no behavior change | `refactor: extract BaseController` |
| `chore:` | Config, CI, deps, tooling | `chore: add PR template` |
| `docs:` | Documentation only | `docs: update README setup steps` |
| `style:` | Formatting, whitespace (no logic change) | `style: reformat entity fields` |
| `test:` | Adding or updating tests | `test: add notification service tests` |

**Format:** `<type>: <short description in lowercase>`

## Pull Request Best Practices

### Keep PRs Small & Focused

- **One concern per PR** — don't mix refactoring with new features
- Aim for **< 400 lines changed** and **< 15 files**
- If a PR is large, split it by component or concern

### Use the PR Template

Every PR auto-fills a template. Please fill in all sections:
- ✅ Summary & motivation
- ✅ Type of change
- ✅ How it was tested
- ✅ Self-review checklist

### Include Architecture Diagrams

For structural changes (new classes, inheritance changes, new modules), add a Mermaid diagram showing before/after.

## Development Setup

### Backend (Spring Boot)

```bash
docker compose up -d   # Start local PostgreSQL
cd backend
./start-dev.sh         # Start Spring Boot
```

### Frontend (Next.js)

```bash
npm install
npm run dev
```

### Database Seeding

```bash
# Run individual seed files against local PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dailyeng" npx tsx prisma/seed_vocab_N.ts
```

## Code Style

- **Java:** Follow `java-pro` and `clean-code` principles
  - Use Java Records for DTOs
  - Extend `BaseController` for auth logic
  - One field per line in entities
- **TypeScript/React:** Standard Next.js conventions
