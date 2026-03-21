# DailyEng

DailyEng is an AI-powered English Learning Platform designed to provide comprehensive tools for improving vocabulary, grammar, and speaking skills. Combining a sleek, interactive frontend with a robust Spring Boot backend, it leverages generative AI and advanced speech recognition to deliver personalized learning experiences.

## Key Features

- **Personalized Study Plans**: Gamified learning with daily missions, achievements, and XP tracking.
- **Interactive Vocabulary & Grammar Hubs**: Flashcards, spacing repetition systems (SRS), quizzes, and a comprehensive database of definitions and collocations.
- **AI Speaking Scenarios**: Realistic conversational roleplays powered by Azure Speech (STT/TTS) and Google Gemini for dynamic context. Includes fluency and pronunciation scoring.
- **Progress Tracking**: Granular tracking across different skills (Reading, Writing, Listening, Speaking) with leaderboards for community engagement.
- **Rich Aesthetics**: A visually stunning frontend utilizing 3D assets (Three.js), modern motion design (Framer Motion, AnimeJS), and Tailwind CSS.

---

## Tech Stack

- **Frontend Framework**: Next.js 15 (React 19)
- **Backend Framework**: Spring Boot 3.4 (Java 21)
- **Database**: PostgreSQL 15
- **ORM & Migrations**: Prisma (Frontend typing/schema), Flyway (Backend migrations)
- **Authentication**: NextAuth.js (Auth.js) / JWT
- **UI/Styling**: Tailwind CSS, Radix UI primitives, AnimeJS, Framer Motion, @react-three/fiber
- **Testing**: Vitest (Frontend), JUnit/Spring Boot Test (Backend)
- **AI / External APIs**: Google Gemini (GenAI), Azure Speech (STT/TTS), Pexels, Cloudinary, Resend
- **Monitoring**: Sentry

---

## Prerequisites

Ensure your development environment meets the following requirements:

- **Node.js**: v22 or higher (for the Next.js frontend)
- **Java**: JDK 21+ (for the Spring Boot backend)
- **Maven**: (Required for Java package management)
- **Docker**: (For easily running the local PostgreSQL database)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/DailyEng-java.git
cd DailyEng-java
```

### 2. Database Setup

Start the PostgreSQL database using Docker Compose:

```bash
docker-compose up -d postgres
```

This will spin up a PostgreSQL 15 instance on `localhost:5432` with the database name `dailyeng`.

### 3. Backend Setup

The backend API is built with Spring Boot and resides in the `backend/` directory.

```bash
cd backend
```

Copy the example environment file:

```bash
cp .env.example .env
```

Configure your `.env` variables (e.g., provide your `JWT_SECRET`, database credentials, and any AI/API keys like `GEMINI_API_KEY`).

Start the Spring Boot server using the provided dev script:

```bash
./start-dev.sh
```
*(Alternatively, you can run `mvn spring-boot:run`)*

The backend will be available at `http://localhost:8080/api`. Note that **Flyway** will automatically run schema migrations on startup.

### 4. Frontend Setup

The Next.js frontend is located at the root of the repository. Open a new terminal session in the project root:

```bash
# Install dependencies
npm install

# Copy the example environment variables
cp .env.example .env

# Generate Prisma Client (essential for Next.js and type-safety)
npx prisma generate
```

Ensure the variables in `.env` point to your local backend and database properly. (By default `NEXT_PUBLIC_API_URL` should be `http://localhost:8080/api`).

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture

### Directory Structure

```text
DailyEng-java/
├── backend/                   # Spring Boot Backend
│   ├── src/main/java/com/dailyeng/
│   │   ├── config/            # Security, DB, and Bean configs
│   │   ├── controller/        # REST Controllers
│   │   ├── dto/               # Data Transfer Objects
│   │   ├── entity/            # JPA Entities
│   │   ├── repository/        # Spring Data Repositories
│   │   ├── security/          # JWT Filters and Providers
│   │   ├── service/           # Business Logic
│   │   └── websocket/         # WebSocket handlers
│   ├── src/main/resources/
│   │   ├── application.yml    # Main Spring properties
│   │   └── db/migration/      # Flyway SQL migration scripts
│   ├── pom.xml                # Maven Dependencies
│   └── start-dev.sh           # Backend launcher
├── prisma/                    # Database models and seeders
│   ├── schema.prisma          # Shared Schema Definition
│   └── seed_*.ts              # Rich data generation scripts
├── src/                       # Next.js Frontend
│   ├── app/                   # App Router pages and layouts
│   ├── components/            # Reusable React components (Radix/Tailwind)
│   ├── data/                  # Static definitions and queries
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions, API clients
│   └── styles/                # Global CSS (global.css)
├── package.json               # Node.js Dependencies
└── next.config.mjs            # Next.js Configuration
```

### Request Lifecycle

1. **Client interaction**: User interacts with Next.js React components.
2. **API Call**: Next.js client-side or server-actions call the Spring Boot API (`http://localhost:8080/api`).
3. **Authentication**: Spring Security intercepts the request via a JWT Filter mechanism.
4. **Processing**: The Spring `@RestController` maps the request, hands off logic to the `Service` layer.
5. **Database**: Service queries PostgreSQL using Spring Data JPA.
6. **Response**: DTOs are serialized back as JSON to the Next.js client, which re-renders the UI contextually.

### Key Components

- **Authentication System**: Utilizes OAuth (Google) via NextAuth.js combined with standard JWTs issued and verified by the Spring Boot backend (`app.jwt.secret`).
- **Data Persistence**: Prisma acts as the SSOT schema. Schema updates are authored in `schema.prisma`. However, database schema alterations are applied on the backend by Flyway using pure SQL scripts in `backend/src/main/resources/db/migration`, enforcing strict database versioning.
- **AI Integrations**: Gemini SDK powers dynamic text processing (roleplay scenario generation and conversational contexts) while Azure Cognitive Speech converts spoken user audio to text and generates life-like TTS responses.
- **Real-time Metrics**: For speaking scenarios, audio input is captured on the client, evaluated via Web Speech APIs for confidence, duration, and pace, and validated synchronously against the backend's learning rubrics.

### Core Database Schema Context
- **Users & Auth**: `User`, `Account`, `Session`, linking OAuth and custom profiles.
- **Learning Content**: `Topic`, `VocabItem`, `ListeningTask`, `SpeakingScenario`. Allows grouping under `TopicGroup` hierarchies.
- **Progress Tracking**: `UserTopicProgress`, `UserVocabProgress`, `UserLessonProgress`, mapping users to mastery percentages and implementing Spaced Repetition logic.
- **Gamification**: `DailyMission`, `ProfileStats` (Tracks XP, streaks, coins), and `LeaderboardEntry`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `SPRING_DATASOURCE_URL` | PostgreSQL URL (`jdbc:postgresql://localhost:5432/dailyeng`) |
| `SPRING_DATASOURCE_USERNAME` | Database username (`postgres`) |
| `SPRING_DATASOURCE_PASSWORD` | Database password (`postgres`) |
| `JWT_SECRET` | Secret base64 line for token signing (> 32 chars long) |
| `GEMINI_API_KEY` | Google Gemini API Key |
| `AZURE_SPEECH_KEY` | Azure Cognitive Speech API Key |
| `AZURE_SPEECH_REGION` | Azure Speech region (e.g. `eastjp`, `eastus`) |
| `GOOGLE_CLIENT_ID` / `SECRET` | Google OAuth credentials |
| `RESEND_API_KEY` | Resend key for transactional emails |
| `PEXELS_API_KEY` | Pexels API Key for image search features |

### Frontend (`.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Direct Prisma connection string (`postgresql://postgres:postgres@localhost:5432/dailyeng`) |
| `NEXT_PUBLIC_API_URL` | The endpoint for backend API (`http://localhost:8080/api`) |
| `NEXTAUTH_URL` | The URL for NextAuth callbacks (`http://localhost:3000`) |
| `AUTH_SECRET` | Secret for NextAuth session encryption |
| `CLOUDINARY_URL` | URL configuration for Cloudinary uploads |

---

## Available Scripts

### Frontend (Node.js)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js Dev Server |
| `npm run build` | Build the Next.js application for production |
| `npm run start` | Start the production server locally |
| `npm run lint` | Run ESLint to analyze code |
| `npm run test` | Run the Vitest testing suite natively |
| `npm run test:ui` | Run Vitest with the graphical UI |
| `npm run seed:vocab` | Execute Prisma scripts to seed initial vocabulary |

### Backend (Maven)

| Command | Description |
|---------|-------------|
| `./start-dev.sh` | Bash script wrapper to load `.env` and start Spring Boot |
| `mvn spring-boot:run` | Start the Spring Boot Application directly |
| `mvn clean install` | Clean cache and compile the Java JAR |
| `mvn test` | Run backend JUnit/Mockito tests |

---

## Testing

### Frontend
The frontend uses `Vitest` for ultra-fast, native ES module testing.

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Backend
The backend utilizes JUnit 5, Mockito, and Spring Security Test to ensure stability. Tests should isolate controllers using `@WebMvcTest` and mock services, with integration tests running against a test profile database.

```bash
cd backend
mvn test
```

---

## Deployment

### Backend (Providing via Docker)

You can containerize the Spring Boot application. Ensure you provide environment variables at runtime:

```bash
# Within the backend dir
mvn clean package -DskipTests

# Build Image
docker build -t dailyeng-api .

# Run Image
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://production-db:5432/dailyeng \
  -e JWT_SECRET=your_prod_secret \
  dailyeng-api
```

### Frontend (Platform Deployment - Vercel)

The Next.js framework is highly optimized for Vercel. Connect the GitHub repository directly to a new Vercel project.
1. Add environment variables from `.env` payload in the Vercel dashboard.
2. Build Command: `npm run build` (Preconfigured by default).
3. The platform will automatically deploy commits to your `main` branch.

---

## Troubleshooting

### Flyway Migration Errors
**Error**: `Relation "Account" does not exist` or similar metadata errors on boot.
**Solution**: Ensure your PostgreSQL database is completely empty before running the application if you change core baseline scripts. Flyway expects the baseline version to match the schema context. You can wipe the DB (`docker rm -f dailyeng-postgres && docker-compose up -d`) and start the backend to recreate schemas globally.

### Prisma Schema Mismatch
**Error**: Prisma client throws validation errors when mutating data.
**Solution**: The database schema may have evolved via Flyway. In the project root, ensure you fetch the latest Introspection state if it deviates, but primarily rely on regenerating the client:
```bash
npx prisma generate
```

### Azure Speech Errors
**Error**: `WebSocket upgrade failed` or 401 Unauthorized via STT functionality.
**Solution**: Double-check `AZURE_SPEECH_REGION`. `eastus` vs `eastjp` must perfectly map the configuration tied to your specific Azure portal resource.

### NextAuth Callbacks Failing
**Error**: Google Sign-in redirects to an error page or `http://localhost:3000` is rejected.
**Solution**: In Google Cloud Console, ensure `http://localhost:3000/api/auth/callback/google` is expressly added to authorized redirect URIs for your OAuth client ID.
