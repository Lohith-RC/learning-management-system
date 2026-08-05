# SkillForge — Learning Management System

SkillForge is a full-stack Learning Management System (LMS) built as a monorepo. It provides a rich student-facing web app for browsing and taking courses, a practice coding sandbox, a resume AI optimizer, and a leaderboard — all backed by a secure Java/Spring Boot REST API connected to a PostgreSQL database.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
  - [Pages & Features](#pages--features)
  - [State Management](#state-management)
  - [Running the Frontend](#running-the-frontend)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
  - [Security](#security)
  - [Database](#database)
  - [Running the Backend](#running-the-backend)
- [Environment Variables](#environment-variables)
- [Running the Full Stack](#running-the-full-stack)
- [Deployment (Render)](#deployment-render)

---

## Project Overview

SkillForge is designed to help students learn technical skills through:
- Structured **courses** with modules and articles
- A **practice sandbox** for solving coding problems
- An **AI Resume Optimizer** for career readiness
- A **Leaderboard** for community engagement
- An **AI Chatbot Widget** for real-time learning assistance

---

## Tech Stack

| Layer       | Technology                                           |
|-------------|------------------------------------------------------|
| Frontend    | React 19, Vite 6, Tailwind CSS 3, Framer Motion      |
| Backend     | Java 17, Spring Boot 3.3.2, Spring Security, JPA     |
| Database    | PostgreSQL                                           |
| Build Tools | Maven (backend), npm (frontend)                      |
| API Docs    | Springdoc OpenAPI / Swagger UI                       |
| Other       | Lombok, OWASP HTML Sanitizer, concurrently           |

---

## Project Structure

```
learning-management-system/
├── package.json               # Root workspace scripts (runs both frontend & backend)
├── frontend/                  # React + Vite web application
│   ├── src/
│   │   ├── App.jsx            # Root component, tab-based routing
│   │   ├── main.jsx           # React entry point
│   │   ├── index.css          # Global styles
│   │   ├── components/        # All UI components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── CourseCatalog.jsx
│   │   │   ├── PracticeSandbox.jsx
│   │   │   ├── ResumeAIOptimizer.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── AIChatbotWidget.jsx
│   │   │   ├── SignInModal.jsx
│   │   │   ├── SignUpModal.jsx
│   │   │   ├── BackgroundShader.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx  # Global state (user, courses, auth, navigation)
│   │   └── data/
│   │       └── mockData.js     # Mock data for offline/dev use
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── backend/                   # Spring Boot REST API
    ├── pom.xml
    └── src/main/
        ├── java/com/skillforge/
        │   ├── SkillForgeApplication.java
        │   ├── course/              # Course, Module, Article, Enrollment domain
        │   │   ├── Course.java
        │   │   ├── CourseController.java
        │   │   ├── CourseService.java
        │   │   ├── CourseRepository.java
        │   │   ├── Module.java
        │   │   ├── ModuleController.java
        │   │   ├── ModuleService.java
        │   │   ├── ModuleRepository.java
        │   │   ├── Article.java
        │   │   ├── ArticleController.java
        │   │   ├── ArticleService.java
        │   │   ├── ArticleRepository.java
        │   │   ├── ArticleProgress.java
        │   │   ├── ArticleProgressRepository.java
        │   │   ├── Enrollment.java
        │   │   ├── EnrollmentController.java
        │   │   ├── EnrollmentService.java
        │   │   ├── EnrollmentRepository.java
        │   │   └── dto/             # Request/Response DTOs
        │   │       ├── CourseRequest.java / CourseResponse.java
        │   │       ├── ModuleRequest.java / ModuleResponse.java
        │   │       ├── ArticleRequest.java / ArticleResponse.java
        │   │       └── EnrollmentResponse.java
        │   ├── common/              # Shared utilities & error handling
        │   │   ├── ApiError.java
        │   │   ├── GlobalExceptionHandler.java
        │   │   ├── ContentSanitizer.java
        │   │   ├── CurrentUser.java
        │   │   └── AccessDeniedExceptionCustom.java
        │   └── security/
        │       └── SecurityConfig.java
        └── resources/
            └── application.yml
```

---

## Frontend

### Pages & Features

| View               | Description                                                       |
|--------------------|-------------------------------------------------------------------|
| **Landing Page**   | Marketing page with hero section, features, and CTA              |
| **Sign In/Sign Up**| Authentication modals                                             |
| **Dashboard**      | Student overview — enrolled courses, progress, streaks            |
| **Course Catalog** | Browse, filter, and enroll in courses                            |
| **Practice Sandbox** | Solve coding problems with an in-browser code editor           |
| **Resume AI Optimizer** | AI-powered resume feedback and keyword analysis            |
| **Leaderboard**    | Community ranking board                                           |
| **AI Chatbot**     | Floating chat widget for learning assistance                      |

Navigation is **tab-based** (no URL routing) managed through global `AppContext`.

### State Management

Global state lives in [`AppContext.jsx`](frontend/src/context/AppContext.jsx) using React Context API. It manages:

- `user` — authenticated user profile
- `isAuthenticated` — auth state
- `activeTab` — current view/page
- `courses` — course list with progress
- `practiceProblems` — coding problems list
- `notifications` — notification feed with unread count
- `toast` — global toast notification system

On load, `AppContext` attempts to fetch live data from the backend API. If the backend is offline, it gracefully falls back to **mock data** from [`mockData.js`](frontend/src/data/mockData.js).

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173` by default.

---

## Backend

The backend is a **Spring Boot 3.3.2** REST API using Java 17. It follows a layered architecture:

```
Controller → Service → Repository → Entity (JPA/PostgreSQL)
```

All API responses use dedicated **DTO records** — raw JPA entities are never exposed on the API surface.

### API Endpoints

#### Courses
| Method | Endpoint                          | Description              | Auth         |
|--------|-----------------------------------|--------------------------|--------------|
| GET    | `/api/courses`                    | List all courses         | Public       |
| POST   | `/api/courses`                    | Create a course          | Admin only   |
| GET    | `/api/courses/{id}`               | Get course by ID         | Public       |
| PUT    | `/api/courses/{id}`               | Update course            | Admin only   |
| DELETE | `/api/courses/{id}`               | Delete course            | Admin only   |

#### Modules
| Method | Endpoint                                  | Description           | Auth       |
|--------|-------------------------------------------|-----------------------|------------|
| GET    | `/api/courses/{courseId}/modules`         | List modules          | Public     |
| POST   | `/api/courses/{courseId}/modules`         | Add module            | Admin only |
| PUT    | `/api/modules/{id}`                       | Update module         | Admin only |
| DELETE | `/api/modules/{id}`                       | Delete module         | Admin only |

#### Articles
| Method | Endpoint                                    | Description              | Auth       |
|--------|---------------------------------------------|--------------------------|------------|
| GET    | `/api/modules/{moduleId}/articles`          | List articles in module  | Public     |
| POST   | `/api/modules/{moduleId}/articles`          | Add article              | Admin only |
| PUT    | `/api/articles/{id}`                        | Update article           | Admin only |
| DELETE | `/api/articles/{id}`                        | Delete article           | Admin only |
| PATCH  | `/api/articles/{id}/read`                   | Mark article as read & recalculate enrollment progress | Authenticated |

#### Enrollments
| Method | Endpoint                              | Description              | Auth          |
|--------|---------------------------------------|--------------------------|---------------|
| POST   | `/api/courses/{courseId}/enroll`      | Enroll in a course       | Authenticated |
| GET    | `/api/me/enrollments`                 | Get my enrollments       | Authenticated |

**Swagger UI** (once running): `http://localhost:8080/swagger-ui.html`

### Security

- Spring Security is configured in [`SecurityConfig.java`](backend/src/main/java/com/skillforge/security/SecurityConfig.java)
- Admin-only endpoints use `@PreAuthorize("hasRole('ADMIN')")`
- **JWT authentication filter** — placeholder is wired for integration (see `SecurityConfig` TODO)
- Article content is sanitized against stored-XSS on every write using [`ContentSanitizer.java`](backend/src/main/java/com/skillforge/common/ContentSanitizer.java) (OWASP HTML Sanitizer)
- All validation errors, 404s, and forbidden responses return a consistent `ApiError` JSON shape via `GlobalExceptionHandler`

### Database

- **PostgreSQL** is the database
- JPA is configured with `ddl-auto: validate` — the app validates against an existing schema and **never auto-generates tables**
- Database migrations are managed externally (outside this repo)

### Running the Backend

Requirements: **JDK 17+** and **Maven 3.x**

```bash
cd backend

# Set required environment variables (or add to your shell profile)
export DB_URL=jdbc:postgresql://<host>:5432/postgres
export DB_USERNAME=your_db_user
export DB_PASSWORD=your_db_password
export JWT_SECRET=your_jwt_secret

# Build and run
mvn clean install
mvn spring-boot:run
```

API will be available at `http://localhost:8080`.

---

## Environment Variables

| Variable      | Required | Description                                  |
|---------------|----------|----------------------------------------------|
| `DB_URL`      | Yes      | PostgreSQL JDBC URL                          |
| `DB_USERNAME` | Yes      | Database username                            |
| `DB_PASSWORD` | Yes      | Database password                            |
| `JWT_SECRET`  | Yes      | HS256 signing secret for JWT tokens          |
| `PORT`        | No       | Server port (defaults to `8080`)             |

---

## Running the Full Stack

From the **project root**, install all dependencies and run both frontend and backend concurrently:

```bash
# Install all dependencies (one-time)
npm run install:all

# Run both frontend & backend simultaneously
npm run dev
```

Individual commands:

```bash
npm run dev:frontend   # Starts Vite dev server (port 5173)
npm run dev:backend    # Starts Spring Boot (port 8080)
```

---

## Deployment (Render)

### Backend (Web Service — Java)

| Field           | Value                                            |
|-----------------|--------------------------------------------------|
| Root Directory  | `backend`                                        |
| Build Command   | `mvn clean package -DskipTests`                  |
| Start Command   | `java -jar target/skillforge-backend-0.1.0.jar`  |

Set the following **Environment Variables** in Render:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `JWT_SECRET`

### Frontend (Static Site)

| Field              | Value              |
|--------------------|--------------------|
| Root Directory     | `frontend`         |
| Build Command      | `npm install && npm run build` |
| Publish Directory  | `dist`             |