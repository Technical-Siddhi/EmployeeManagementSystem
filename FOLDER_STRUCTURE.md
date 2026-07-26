# AttendX Repository Directory Structure

```text
employee-attendance/
 ├── .github/workflows/         # GitHub Actions CI/CD (build, quality, deploy)
 ├── backend/
 │    ├── config/                # Winston Logger, Swagger OpenAPI config
 │    ├── middleware/            # Auth JWT, RBAC, Error Handler
 │    ├── models/                # Mongoose Schemas (User, Ticket, AuditLog, etc.)
 │    ├── routes/                # Express API Route Handlers
 │    ├── services/              # AI Service Engine & Backup Utility
 │    ├── tests/                 # Integration tests (Jest & Supertest)
 │    ├── Dockerfile             # Multi-stage backend container configuration
 │    ├── package.json
 │    └── server.js              # Application entry point
 ├── frontend/
 │    ├── public/
 │    ├── src/
 │    │    ├── components/       # Reusable components (HelpDesk, AI, Performance, Profile, Sidebar)
 │    │    ├── pages/            # Master page views
 │    │    └── App.js
 │    ├── Dockerfile             # NGINX container configuration
 │    └── package.json
 ├── docker-compose.yml         # Container orchestration config
 ├── .dockerignore
 ├── .env.example
 ├── .env.development
 ├── .env.production
 ├── README.md
 ├── ARCHITECTURE.md
 ├── API.md
 ├── DEPLOYMENT.md
 └── ENVIRONMENT.md
```
