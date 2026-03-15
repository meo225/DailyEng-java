# Migration Plan: Node.js to Spring Boot

This document outlines the detailed plan for migrating the DailyEng backend from its current Node.js (Next.js/Nest.js) and Prisma architecture to a new Spring Boot 3.4, Java 21, and PostgreSQL setup.

## Current State
- **Backend**: Node.js APIs (likely inside Next.js `app/api` or a separate NestJS app)
- **Database**: PostgreSQL
- **ORM**: Prisma (`prisma/schema.prisma`)
- **Key Features**: Authentication, User Profiles, Topics, Vocabulary, Quizzes, Flashcards (SRS), Speaking Scenarios, AI Feedback, Study Plans, and Gamification.

## Target State
- **Backend**: Spring Boot 3.4.3
- **Language**: Java 21
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security with JWT
- **Build Tool**: Maven

---

## Migration Strategy: Phased Approach

We will use a phased approach to ensure a smooth transition with minimal disruption.

### Phase 1: Foundation and Database Schema Mapping

The first goal is to ensure the new Spring Boot backend can interact with the existing database schema seamlessly.

1. **Database Migration Strategy**:
   - **Keep Prisma for Migrations (Temporarily or Permanently)**: Since the database schema is already defined in `prisma/schema.prisma` and there might be existing data, we can continue using Prisma CLI for database migrations during the transition.
   - **JPA Validation**: Configure Hibernate in Spring Boot to only *validate* the schema (`spring.jpa.hibernate.ddl-auto=validate`), rather than creating or updating it.
2. **Entity Generation/Mapping**:
   - Create JPA Entity classes (`@Entity`) in Spring Boot that exactly map to the existing tables created by Prisma.
   - Map enum types correctly.
   - Map Prisma's JSON fields using Hypersistence Utils (`@Type(JsonType.class)`).
   - Use a custom CUID generator (`@Id`) or let the database handle it if defaults are set, to match Prisma's CUID generation.
   - Ensure table names and column names match the existing PostgreSQL schema (use `@Table(name = "User")`, `@Column(name = "dateOfBirth")` where necessary, considering Prisma's exact naming conventions).
3. **Repository Layer**:
   - Create Spring Data JPA repositories (`JpaRepository`) for each entity.

### Phase 2: Core Authentication and Security

Authentication is the most critical part of the system and must be migrated early.

1. **Security Configuration**:
   - Set up Spring Security with a custom `SecurityFilterChain`.
   - Implement JWT authentication filters (`JwtAuthenticationFilter`).
2. **User Authentication API**:
   - Implement Registration, Login, and User Profile fetching endpoints.
   - Integrate with the existing user table.
   - *Note*: If the current system uses NextAuth.js/Auth.js with Prisma Adapter, we need to ensure the Spring Boot JWTs are compatible or plan for a session migration/re-login for existing users. The password hashing algorithm (bcrypt) must match.
3. **OAuth2 Integration (Future)**:
   - Prepare Spring Security for OAuth2 Login (Google, GitHub) to support `Account` and `Session` tables.

### Phase 3: Domain APIs Migration

Migrate the feature APIs systematically. For each domain, we will build Controllers, Services, and DTOs.

**Milestone 3.1: Learning Materials (Read-Heavy)**
- **Topics & Groups**: `GET /api/topics`, `GET /api/topics/:id`
- **Vocabulary**: `GET /api/vocab?topicId=:id`
- **Grammar Notes**: Endpoints for fetching grammar rules and examples.
- **Quizzes**: `GET /api/quizzes?topicId=:id`

**Milestone 3.2: User Progress and Activities (Write-Heavy)**
- **Topic Progress**: Tracking user progress on topics.
- **Lesson Progress**: Tracking lesson completions.
- **Daily Missions & Activities**: Updating user activities and mission progress.
- **Quizzes Submit**: `POST /api/quizzes/submit`

**Milestone 3.3: Spaced Repetition System (SRS) & Flashcards**
- **Flashcards**: `GET /api/flashcards`, `POST /api/flashcards`
- **SRS Logic**: Re-implement the SM-2 algorithm (from `lib/srs.ts`) in a Spring Service (`SrsService.java`).
- **SRS Queue**: `GET /api/srs/queue`
- **SRS Review**: `POST /api/srs/review`

**Milestone 3.4: Speaking and AI Features**
- **Speaking Library**: `GET /api/speaking/library`
- **AI Integration**: Implement services using `google-cloud-vertexai` (Gemini) to replace current AI endpoints.
- **Speaking Turn Submission**: `POST /api/speaking/submit-turn`
- **AI Feedback**: `POST /api/ai/feedback`
- **AI Translation**: `POST /api/ai/translate`

**Milestone 3.5: User Profiles, Gamification & Planning**
- **Profile Stats**: XP, Streak, Coins, Badges fetching and updating.
- **Study Plans**: Creation, fetching, and tracking.
- **Leaderboards**: Endpoints to fetch weekly/monthly rankings.

### Phase 4: Testing and Validation

1. **Unit and Integration Tests**:
   - Write JUnit and Mockito tests for core business logic (especially the SRS algorithm, score calculations).
   - Use `@SpringBootTest` and Testcontainers for integration testing against a real PostgreSQL instance.
2. **API Contract Verification**:
   - Ensure the new Spring Boot API responses match the exact JSON structure expected by the Next.js frontend to avoid breaking UI changes.
   - Use Postman or similar tools to compare responses between old and new APIs.

### Phase 5: Deployment and Cutover

1. **Environment Setup**:
   - Deploy the Spring Boot application.
   - Configure environment variables (Database URL, JWT Secret, API Keys).
2. **Frontend Update**:
   - Update the frontend API base URL (`NEXT_PUBLIC_API_URL` or equivalent) to point to the new Spring Boot server.
   - Remove the old Next.js/Nest.js API routes once verified.
3. **Monitoring**:
   - Enable Spring Boot Actuator (`/actuator/health`, `/actuator/metrics`).
   - Monitor logs and database performance closely during the initial rollout.

---

## Known Challenges & Considerations

1. **Prisma JSON Types**: Prisma stores complex structures (like definitions, glossaries, examples) as `Json` in PostgreSQL. Handling these gracefully in JPA requires custom types (e.g., using Hypersistence Utils to map them to Java `Map`, `List`, or specific POJOs).
2. **CUIDs**: The database relies heavily on CUIDs for primary keys. Spring Boot needs a CUID generator (`io.github.thibaultmeyer:cuid` is included in `pom.xml`) to generate compatible IDs for new records.
3. **Password Hashing**: Ensure Spring Security's `BCryptPasswordEncoder` is compatible with the `bcryptjs` used in Node.js.
4. **Auth.js Compatibility**: The existing schema has `Account`, `Session`, and `VerificationToken` tables designed for Auth.js. If we move completely away from NextAuth to a pure Spring Boot JWT setup, these tables might become obsolete for local auth, but must be managed if OAuth is still handled by the frontend.
