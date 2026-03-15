# DailyEng Spring Boot Backend

This is the new backend for the **DailyEng** English Learning Platform, built with Spring Boot. It replaces the previous Node.js backend.

## Tech Stack

- **Java**: 21
- **Framework**: Spring Boot 3.4.3
- **Database**: PostgreSQL (via Spring Data JPA)
- **Security**: Spring Security + JWT
- **AI Integration**: Google Cloud Vertex AI (Gemini)
- **Caching**: Caffeine
- **Build Tool**: Maven

## Prerequisites

- JDK 21 or higher
- Maven 3.8 or higher
- PostgreSQL 14 or higher

## Getting Started

### 1. Database Setup

Ensure PostgreSQL is running and create a database named `dailyeng`:

```sql
CREATE DATABASE dailyeng;
```

Update your `application.yml` or set environment variables if your database credentials differ from the defaults:
- `DB_USERNAME`: postgres
- `DB_PASSWORD`: postgres
- `DATABASE_URL`: jdbc:postgresql://localhost:5432/dailyeng

### 2. Environment Variables

The application relies on several environment variables. You can set them in your environment or configure them in your IDE:

- `JWT_SECRET`: Secret key for JWT signing (must be at least 256 bits).
- `GEMINI_API_KEY`: API key for Google Gemini AI integrations.
- `PEXELS_API_KEY`: API key for Pexels image search.
- `MAIL_USERNAME` / `MAIL_PASSWORD`: Credentials for the SMTP server (Resend is the default).
- `CORS_ORIGINS`: Allowed origins for CORS (default: `http://localhost:3000`).

### 3. Build and Run

To build the project, run:

```bash
mvn clean install
```

To run the application:

```bash
mvn spring-boot:run
```

Alternatively, you can run the `DailyEngApplication.java` from your IDE.

The server will start on port `8080` (or the port defined by the `PORT` environment variable).
The base API path is configured as `/api`.

## Architecture Overview

The backend follows a standard layered architecture:

- **Controllers (`/controller`)**: Handle incoming HTTP requests and route them to appropriate services.
- **Services (`/service`)**: Contain the core business logic.
- **Repositories (`/repository`)**: Spring Data JPA interfaces for database access.
- **Entities (`/entity`)**: JPA entity classes mapped to database tables.
- **DTOs (`/dto`)**: Data Transfer Objects used for request and response payloads.
- **Security (`/security`)**: Security configurations including JWT authentication filters.
- **Exceptions (`/exception`)**: Global exception handler (`@ControllerAdvice`).

## Migration Information

For details on migrating from the old Node.js (Next.js/Nest.js) backend to this Spring Boot application, please refer to the `MIGRATION_PLAN.md` file located in the root directory.
