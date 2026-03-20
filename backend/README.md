# DailyEng Spring Boot Backend

This is the backend for the **DailyEng** English Learning Platform, built with Spring Boot.

## Tech Stack

- **Java**: 21
- **Framework**: Spring Boot 3.4.3
- **Database**: PostgreSQL (via Spring Data JPA)
- **Security**: Spring Security + JWT (httpOnly cookies)
- **AI Integration**: Gemmini Flash Lite 3.1
- **Speech**: Azure Speech Services
- **Caching**: Caffeine
- **Build Tool**: Maven

## Prerequisites

- JDK 21+
- Maven 3.8+
- PostgreSQL 14+

---

## Quick Start

### 1. Database Setup

```sql
CREATE DATABASE dailyeng;
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `backend/.env` and fill in your secrets. Required variables:

| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | JWT signing key (**min 32 chars**) |
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | DB password |
| `OPENAI_API_KEY` | OpenAI API key for AI features |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `AZURE_SPEECH_KEY` | Azure Speech service key |
| `AZURE_SPEECH_REGION` | Azure Speech region |
| `PEXELS_API_KEY` | Pexels image search API key |
| `RESEND_API_KEY` | Resend email API key |
| `COOKIE_SECURE` | `false` for dev, `true` for production |
| `COOKIE_DOMAIN` | Leave empty for localhost |

### 3. Run

**Recommended** — use the startup script (loads `.env` automatically):

```bash
./start-dev.sh
```

**Alternative** — manual:

```bash
export JWT_SECRET="your-secret-here"
mvn spring-boot:run
```

**IDE** — run `DailyEngApplication.java` directly (set env vars in your run config).

The server starts on **http://localhost:8080** with base path `/api`.

---

## Authentication

The backend uses **httpOnly cookie-based JWT authentication**:

- `POST /api/auth/register` — Register new user (sets cookies)
- `POST /api/auth/login` — Login (sets cookies)
- `POST /api/auth/google` — Google OAuth (sets cookies)
- `GET  /api/auth/me` — Get current user from cookie
- `POST /api/auth/refresh` — Silent token refresh
- `POST /api/auth/logout` — Clear cookies

Tokens are stored in `access_token` and `refresh_token` httpOnly cookies. The `JwtAuthenticationFilter` reads the cookie first, falling back to the `Authorization: Bearer` header for API clients.

---

## Architecture

```
src/main/java/com/dailyeng/
├── controller/     # HTTP request handlers
├── service/        # Business logic
├── repository/     # Spring Data JPA interfaces
├── entity/         # JPA entity classes
├── dto/            # Request/response DTOs
├── security/       # JWT filter, Spring Security config
├── config/         # App properties, bean configs
└── exception/      # Global exception handler
```

## Running with Frontend

The Next.js frontend runs on `http://localhost:3000` and connects to this backend via `NEXT_PUBLIC_API_URL=http://localhost:8080/api` (set in the root `.env.local`).

```bash
# Terminal 1 — Backend
cd backend && ./start-dev.sh

# Terminal 2 — Frontend
npm run dev
```
