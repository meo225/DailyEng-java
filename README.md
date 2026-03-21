# DailyEng

DailyEng is a modern, AI-powered English learning platform designed to help users improve their vocabulary, grammar, and speaking skills. It combines structured learning paths, spaced repetition (SRS), and interactive AI roleplaying to provide a personalized, highly effective educational experience.

## Key Features

- **Vocabulary & Grammar Hub:** View definitions, collocations, pronunciations, and AI-generated examples tailored to your level.
- **Spaced Repetition System (SRS):** Built-in SuperMemo-2 (SM-2) algorithm to optimize review timings and maximize long-term retention.
- **AI Speaking Lab & Roleplay:** Practice real-world scenarios with an AI conversation partner (powered by Gemini) and receive instant feedback on grammar, fluency, and pronunciation using Azure Speech.
- **Study Plans & Daily Missions:** Gamified learning with XP, streaks, badges, and personalized daily goals.
- **Cross-Platform Progress:** Seamless sync between the frontend interface and backend AI services.

---

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Backend API**: Spring Boot 3.4.3, Java 21
- **Database**: PostgreSQL (hosted on Google Cloud SQL)
- **Database ORM/Migrations**: Prisma (Frontend models/schema) and Flyway (Backend migrations)
- **Styling & UI**: Tailwind CSS v4, shadcn/ui, Lucide Icons
- **State Management**: Zustand, React Hook Form, Zod
- **Authentication**: NextAuth.js (Auth.js v5) with JWT & Spring Security
- **AI & External Services**: 
  - Google Gemini API (Content generation, conversations, feedback)
  - Azure AI Speech (Text-to-Speech, Speech-to-Text)
  - Cloudinary (Image management)
  - Pexels API (Vocabulary/scenario imagery)
  - Resend (Email delivery)
- **Testing**: Vitest, MSW (Mock Service Worker), Spring Boot Test

---

## Prerequisites

- Node.js 18 or higher
- Java 21 (Temurin / Eclipse Adoptium recommended)
- Maven 3.8+
- [Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/postgres/connect-auth-proxy) (if connecting to the production/staging database)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Narcolepsyy/DailyEng-java.git
cd DailyEng-java
```

### 2. Environment Setup

You need to configure two environment files: one for the frontend and one for the backend.

**Frontend Configuration:**
```bash
cp .env.example .env.local
```

**Backend Configuration:**
```bash
cp backend/.env.example backend/.env
```

**Key Environment Variables (Frontend `/.env.local`):**
| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Prisma DB Connection String |
| `NEXT_PUBLIC_API_URL` | URL to Spring Boot backend (e.g. `http://localhost:8080/api`) |
| `AUTH_SECRET` | NextAuth.js secret key |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `AZURE_SPEECH_KEY` | Azure Speech Service Key |

**Key Environment Variables (Backend `/backend/.env`):**
| Variable | Description |
| --- | --- |
| `DATABASE_URL` | JDBC Connection String |
| `JWT_SECRET` | Secret for token signing (Must match frontend if shared) |
| `GEMINI_API_KEY` | Google Gemini API Key |

### 3. Database Setup & Seeding

The project uses Flyway for backend schema migrations and Prisma for frontend type safety and seeding.

**Run Prisma Generate:**
```bash
npm install
npx prisma generate
```

**Seed the Database (Vocabulary, Grammar, Topics):**
Data seeding is managed via individual TypeScript files targeting different topic groups.
```bash
# Seed a specific vocabulary file (e.g., topic 7 - Education)
DATABASE_URL="postgresql://user:password@localhost:5434/dailyeng" npx tsx prisma/seed_vocab_7.ts

# Note: Adjust the DATABASE_URL to your active PostgreSQL instance.
```

### 4. Start Development Servers

The application requires both the Next.js frontend and the Spring Boot backend to be running.

**Terminal 1: Start Backend (Spring Boot)**
```bash
cd backend
./start-dev.sh
```
*(Note: `start-dev.sh` automatically starts the Cloud SQL proxy in the background if configured, then launches the Maven Spring Boot app on port 8080).*

**Terminal 2: Start Frontend (Next.js)**
```bash
# From the project root
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture

### Directory Structure

```
├── .github/                  # GitHub Actions CI & PR Templates
├── backend/                  # Spring Boot Java Application
│   ├── src/main/java/        # Java source code (Controllers, Services, Repositories)
│   ├── src/main/resources/   # application.yml and db/migration (Flyway)
│   └── start-dev.sh          # Backend startup script
├── prisma/                   # Database schema, generated types, and seed scripts
│   ├── schema.prisma         # Single source of truth for DB schema
│   └── seed_*.ts             # Idempotent seed scripts for Vocab/Topics
├── src/                      # Next.js Frontend Application
│   ├── app/                  # App Router pages and API routes
│   ├── components/           # Reusable React components (UI, Forms, Layouts)
│   ├── lib/                  # Utilities, API clients, Auth config
│   ├── hooks/                # Custom React hooks
│   └── store/                # Zustand state management
└── package.json              # Node.js dependencies & scripts
```

### Data Flow

```
User Action (Browser) → Next.js (App Router) → Next.js Server Action / API Client 
                                    ↓
Spring Boot REST API (`/api/*`) ←→ Java Services ←→ Spring Data JPA / Flyway
                                    ↓
                              PostgreSQL Database
```

### Key Components

**Authentication**
- Handled primarily by NextAuth.js on the frontend.
- JWT tokens are passed to the Spring Boot backend via `Authorization: Bearer` headers.
- The `BaseController` in Spring Boot extracts and validates the user ID from the security context, preventing unauthorized access.

**Notification Module**
- Centralized tracking for system alerts, achievements, and study plan updates.
- Uses strict ownership checks at the repository and service levels to ensure data privacy.

**AI Speaking & Roleplay**
- Frontend uses WebAudio / `MediaRecorder` to capture user speech.
- Audio is processed and evaluated by Azure Speech (for STT/Pronunciation) and Google Gemini (for conversation continuity & grammar feedback).
- Transcripts and scores are saved via the backend to the `SpeakingSession` and `SpeakingTurn` models.

**Database Schema Overview**
```
users                  # Core user accounts & profiles
├── profile_stats      # XP, streak, coins, overall scores
├── user_daily_mission # Gamified daily tracking
├── user_vocab_progress# SRS state per word (ease factor, interval)

topic_groups           # Macro categorizations (Speaking, Grammar, Vocab)
└── topics             # Specific subjects (e.g. 'School Life', 'Past Tenses')
    ├── vocab_items    # Specific words, definitions, IPA
    ├── quiz_items     # MCQ, fill-in-the-blanks
    └── speaking_scenarios # AI Roleplay contexts and starting prompts
```

---

## Available Scripts

| Command | Description |
| --- | --- |
| **Frontend Setup & Execution** | |
| `npm install` | Install all JavaScript/TypeScript dependencies |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the Next.js application for production |
| `npm run lint` | Run ESLint across the codebase |
| `npm run test` | Run Vitest unit & integration tests |
| **Backend Setup & Execution** | |
| `cd backend && ./start-dev.sh` | Start Cloud SQL proxy + Spring Boot dev server |
| `cd backend && mvn clean install`| Compile, test, and package the Java application |
| `cd backend && sh start-proxy.sh`| Start *only* the Cloud SQL authentication proxy |
| **Database Management (Prisma)** | |
| `npx prisma generate` | Generate TypeScript types from `schema.prisma` |
| `npx tsx prisma/seed_vocab_1.ts` | Run a specific database seeding script |

---

## Testing

### Backend Testing (Java)

The backend uses JUnit 5, Mockito, and Spring Boot Test. Tests are located in `backend/src/test/java`.

```bash
cd backend
mvn test
```

### Frontend Testing (Vitest)

The frontend uses Vitest and React Testing Library. Tests cover state management (Zustand), util functions (SRS algorithms), and components.

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with a UI dashboard
npm run test:ui

# Generate a test coverage report
npm run test:coverage
```

---

## Deployment

### Frontend (Vercel recommended)

1. Connect the GitHub repository to Vercel.
2. Set the Root Directory to the project root (default).
3. Override the build command if necessary: `npx prisma generate && npm run build`.
4. Add all environment variables from `.env.local`.

### Backend (Google Cloud Run / Railway / Render)

The backend is a standard Maven Spring Boot application. It can be easily containerized or deployed to a PaaS.

**Example Docker Build:**
```bash
cd backend
mvn clean package -DskipTests
docker build -t dailyeng-api .
# Deploy the resulting image to Cloud Run or your preferred container host.
```

### Database

The database is currently hosted on **Google Cloud SQL (PostgreSQL)**. 
- Schema changes are managed strictly via Flyway inside the Spring Boot app (`backend/src/main/resources/db/migration`).
- Do NOT use `prisma db push` or `prisma migrate` against the production database to avoid conflicts with Flyway.

---

## Contributing

We welcome contributions! Please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md) file for details on:
1. Conventional Commit usages (e.g., `feat:`, `fix:`, `refactor:`).
2. Pull Request sizing and splitting best practices.
3. Code styling guidelines (Java Records, `BaseController` extensions).

When you open a PR, a GitHub Action will automatically run `mvn compile` and `npm run build` to ensure project stability.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
