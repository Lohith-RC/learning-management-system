# SkillForge Backend — Course Service Scaffold (Phase 1, Avani)

This is a working starting point for the Course Service (FR-2.1, FR-2.2, FR-2.3), built
per the Backend Security & API Standards described in the task doc.

## What's implemented

- **Entities**: `Course`, `Module`, `Article`, `Enrollment`, `ArticleProgress`
- **DTOs**: separate request/response records for every resource — no raw entities on the API
- **Validation**: Jakarta Bean Validation annotations on every request DTO (`@NotBlank`, `@Size`, `@Min`)
- **Sanitization**: `ContentSanitizer` runs article content through the OWASP HTML sanitizer on write (stored-XSS defense)
- **Endpoints**:
  - `GET/POST /api/courses`, `GET/PUT/DELETE /api/courses/{id}`
  - `GET/POST /api/courses/{courseId}/modules`, `PUT/DELETE /api/modules/{id}`
  - `GET/POST /api/modules/{moduleId}/articles`, `PUT/DELETE /api/articles/{id}`
  - `PATCH /api/articles/{id}/read` — marks read, recalculates `Enrollment.progress_percent`
  - `POST /api/courses/{courseId}/enroll`, `GET /api/me/enrollments`
- **Error handling**: `GlobalExceptionHandler` returns a consistent `ApiError` shape for validation failures, not-found, and forbidden — every future controller (Auth, Admin, Profile, Streak) should raise the same exception types rather than inventing new error formats.
- **RBAC hooks**: admin-only endpoints already carry `@PreAuthorize("hasRole('ADMIN')")`.

## What's intentionally NOT done yet (by design)

- **JWT filter** — `SecurityConfig` has a marked TODO for Monica's `JwtAuthenticationFilter`. Until it's wired in, every request is unauthenticated and admin routes will reject everything — that's expected, not a bug.
- **Assessment Service** (Question bank, dynamic serving, MCQ grading, coding submission) — next module to build, same patterns as Course Service.
- **DB schema/migrations** — entities use `ddl-auto: validate`, meaning the actual tables must exist already, created by Preetham's migration scripts. Confirm field names/types match exactly before running this against a real database.

## Running it

You'll need Maven + JDK 17 locally (this sandbox can't reach Maven Central to build/test it, so it hasn't been compiled here — review it and build locally):

```bash
mvn clean install
export DB_URL=jdbc:postgresql://<host>:5432/postgres
export DB_USERNAME=...
export DB_PASSWORD=...
export JWT_SECRET=some-dev-only-secret
mvn spring-boot:run
```

Swagger UI once running: `http://localhost:8080/swagger-ui.html`

## Next steps for you (Avani)

1. Get this compiling locally against Preetham's actual schema (adjust `@Column` names if they differ).
2. Build the Assessment Service (`Question`, `Attempt` entities + question bank CRUD + dynamic serving + MCQ grading + coding-submission stub) following the exact same layering: entity → repository → DTO → service → controller.
3. Share `SecurityConfig`'s TODO and the `CurrentUser` utility with Monica so her `JwtAuthenticationFilter` populates the principal the way `CurrentUser.id()` expects (a `UUID` string).
4. Point Kannika at `CourseController`'s `@PreAuthorize` usage as the pattern to replicate elsewhere, and at `ContentSanitizer` as the sanitization pattern.
5. Point Shwetha at the `course/dto` package as the response-shape convention for her Profile/Streak DTOs.
