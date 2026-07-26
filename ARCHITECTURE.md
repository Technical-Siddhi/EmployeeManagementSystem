# AttendX Enterprise System Architecture Documentation

**AI-Powered Enterprise Workforce Management Platform**

---

## 1. High-Level System Architecture

AttendX is architected as a decoupled, multi-tiered enterprise web application. The frontend single-page application (SPA) communicates securely with the Express REST API and Socket.io real-time engine, which orchestrates database transactions, cloud asset management, and OpenAI-powered workforce analytics.

```text
                               ┌─────────────────────────┐
                               │       Users / HR        │
                               └────────────┬────────────┘
                                            │
                                            ▼
                               ┌─────────────────────────┐
                               │     React Frontend      │
                               └────────────┬────────────┘
                                            │
                                            ▼
                               ┌─────────────────────────┐
                               │       Express API       │
                               └────────────┬────────────┘
                                            │
           ┌──────────────────┬─────────────┴────────────┬──────────────────┐
           │                  │                          │                  │
           ▼                  ▼                          ▼                  ▼
┌──────────────────┐ ┌──────────────────┐      ┌──────────────────┐ ┌──────────────────┐
│  MongoDB Atlas   │ │    Cloudinary    │      │      OpenAI      │ │    Socket.io     │
│   (Data Store)   │ │  (Asset Vault)   │      │   (AI Copilot)   │ │  (Real-Time Engine)│
└──────────────────┘ └──────────────────┘      └──────────────────┘ └──────────────────┘
```

---

## 2. Complete Request Flow

Every inbound HTTP request to the AttendX platform passes through authentication, security filtering, and controller service execution before returning structured JSON to the React client interface.

```text
[ User Action ]
       │
       ▼
[ React UI Component ] ── (Axios Request with Bearer Token)
       │
       ▼
[ JWT Validation Middleware ] ── (Decode & Verify Token Signature)
       │
       ▼
[ RBAC Middleware ] ── (Verify User Role Scope: Admin / HR / Employee)
       │
       ▼
[ Express Controller ] ── (Validate Payload & Request Params)
       │
       ▼
[ Business Service Layer ] ── (Execute Core HRMS Business Logic)
       │
       ▼
[ MongoDB Atlas (Mongoose) ] ── (Persist / Query Data Collection)
       │
       ▼
[ Formatted JSON Response ]
       │
       ▼
[ React State Update & UI Render ]
```

---

## 3. AI Assistant Architecture

The AI HR Assistant module leverages a natural language processing pipeline combined with context building to query live database metrics safely and enforce action confirmation.

```text
[ User Prompt Input ]
       │
       ▼
[ Chat Window Component ]
       │
       ▼
[ AI Prompt Builder ] ── (Sanitize & Normalize Intent Query)
       │
       ▼
[ Workforce Context Builder ] ── (Aggregate MongoDB Records via RBAC Scope)
       │
       ▼
[ MongoDB Atlas ] ── (Retrieve Context: Employees, Attendance, Payroll, Tickets)
       │
       ▼
[ OpenAI GPT Service Engine ] ── (Construct System Prompt & Context Payload)
       │
       ▼
[ Response Generator ] ── (Format Markdown & Action Confirmation Suggestions)
       │
       ▼
[ React UI Stream & Action Trigger Modal ]
```

---

## 4. Authentication & Authorization Flow

AttendX employs a stateless, JSON Web Token (JWT) authentication workflow backed by bcrypt password hashing and fine-grained Role-Based Access Control (RBAC).

```text
+-----------------------------------------------------------------------------------+
| 1. LOGIN          User submits credentials -> /api/auth/login                     |
| 2. VERIFY         Server validates password via bcrypt.compare()                  |
| 3. SIGN JWT       Server signs JWT payload { id, email, role }                    |
| 4. CLIENT STORE   Client stores token in localStorage & attaches HTTP Bearer      |
| 5. PROTECTED ROUTE Client accesses ProtectedRoute component                       |
| 6. RBAC GUARD     Server verifies JWT & evaluates permissions [admin|hr|employee] |
+-----------------------------------------------------------------------------------+
```

---

## 5. Database Architecture (MongoDB Atlas Collections)

| Collection Name | Purpose & Contents | Key Indexing Strategy |
| --- | --- | --- |
| `Users` | User credentials, roles, email, active status | Unique index on `email` |
| `Employees` | Full profile, salary breakdown, contact details, manager | Index on `user`, `department` |
| `Attendance` | Daily check-in/out timestamps, geolocation, biometric IP | Compound index on `employee` + `date` |
| `Leaves` | Leave applications, leave type, date range, approval state | Index on `applicant`, `status` |
| `Payroll` | Monthly salary slips, deductions, tax withholding, PDF hashes | Compound index on `employee` + `month` |
| `Performance` | Goal tracking, 360 review feedback, promotion history | Index on `employee`, `evaluationPeriod` |
| `Organization` | Enterprise details, address, registration numbers | Single document collection |
| `Departments` | Department names, head of department, budget allocations | Unique index on `code` |
| `Teams` | Team leads, member references, functional unit tag | Index on `department` |
| `Documents` | Vault documents, Cloudinary URLs, QR verification hashes | Index on `employee`, `category` |
| `Notifications` | Real-time user notification feed, read/unread states | Index on `recipient`, `read` |
| `AuditLogs` | System event audit trail, security alerts, IP addresses | Index on `timestamp`, `user` |
| `HelpDesk` | Service desk tickets, SLA status, KB articles, CSAT ratings | Index on `ticketNumber`, `status` |
| `AIConversations` | AI Chat session history, prompt logs, suggested actions | Index on `user`, `sessionId` |

---

## 6. Module Architecture Tree

```text
Authentication Module
 ├── Employee Management Module
 ├── Attendance & Shift Management Module
 ├── Leave Management Module
 ├── Payroll & Compensation Module
 ├── Performance Management Module
 ├── Organization & Department Module
 ├── Document Vault Module
 ├── Real-Time Notification Center
 ├── Audit Logs & Activity Tracking Module
 ├── Help Desk & Service Desk Module
 ├── AI HR Assistant Copilot Module
 └── Reports & Analytics Module
```

---

## 7. Technology Stack Specifications

| Layer | Technologies Used | Primary Responsibilities |
| --- | --- | --- |
| **Frontend** | React.js 18, Tailwind CSS, React Router v6, Axios, Recharts, Socket.io Client, Lucide Icons | Single-page application rendering, responsive dark SaaS UI, state management, chart visualizations |
| **Backend** | Node.js, Express.js, JWT, Socket.io, Swagger OpenAPI 3.0, Winston, Morgan | REST API gateway, WebSocket broadcasting, security filtering, structured logging, middleware execution |
| **Database** | MongoDB Atlas, Mongoose ODM | Cloud NoSQL persistence, schema validation, index management, transaction support |
| **Cloud Storage** | Cloudinary API | Cloud asset storage, document upload management, image transformations |
| **AI Engine** | OpenAI API (GPT-4 / GPT-3.5 Turbo) | Natural language workforce context parsing, query synthesis, administrative action suggestions |
| **Security** | Helmet, Express Rate Limit, Express Mongo Sanitize, Compression | HTTP security headers, rate limiting, NoSQL injection protection, response compression |
| **Deployment** | Vercel (Frontend), Render (Backend), Docker Compose | Edge CDN hosting, container orchestration, zero-downtime deployments |
| **DevOps** | Docker, GitHub Actions, Jest, Supertest | Containerization, automated CI/CD build & audit pipelines, integration testing |

---

## 8. Directory & Repository Architecture

```text
employee-attendance/
 ├── .github/
 │    └── workflows/             # GitHub Actions CI/CD pipelines (build, quality, deploy)
 ├── backend/
 │    ├── config/                # Winston Logger, Swagger OpenAPI specification
 │    ├── middleware/            # Auth JWT, RBAC Guard, Error Handler, Rate Limiter
 │    ├── models/                # Mongoose Schemas (User, Attendance, Ticket, AuditLog, etc.)
 │    ├── routes/                # Express REST API Route Handlers
 │    ├── services/              # AI Service Engine, Backup Utility
 │    ├── tests/                 # Integration test suite (Jest & Supertest)
 │    ├── Dockerfile             # Multi-stage Node.js container setup
 │    ├── package.json
 │    └── server.js              # Application entry point & Express server bootstrap
 ├── frontend/
 │    ├── public/
 │    ├── src/
 │    │    ├── components/       # Reusable components (HelpDesk, AI, Performance, Profile, Sidebar)
 │    │    ├── pages/            # Master page views (Dashboard, AIAssistant, HelpDesk, etc.)
 │    │    ├── stores/           # Zustand / React State Stores
 │    │    └── App.js            # Route definitions & ProtectedRoute configuration
 │    ├── Dockerfile             # NGINX production web server setup
 │    └── package.json
 ├── docker-compose.yml         # Container orchestration specification
 ├── .dockerignore
 ├── .env.example
 ├── .env.development
 ├── .env.production
 ├── README.md                  # Showcase documentation with badges & diagrams
 ├── ARCHITECTURE.md            # Enterprise System Architecture documentation
 ├── API.md                     # REST API reference guide
 ├── DEPLOYMENT.md              # Cloud deployment instructions
 └── ENVIRONMENT.md             # Environment variables specification
```

---

## 9. Security Architecture

- **HTTP Security Headers (`helmet`)**: Enforces secure headers including Content Security Policy, X-Frame-Options, and X-XSS-Protection.
- **DDoS & Brute-Force Rate Limiting (`express-rate-limit`)**: Caps requests per IP window to mitigate automated attacks.
- **NoSQL Injection Prevention (`express-mongo-sanitize`)**: Strips prohibited MongoDB query characters (`$`, `.`) from inbound request bodies and parameters.
- **Stateless Authorization**: JWT signatures verified using strong secrets (`JWT_SECRET`) with configurable expiration windows.
- **RBAC Matrix**: Endpoints enforce mandatory role scope evaluation (`['admin']`, `['admin', 'hr']`, or `['admin', 'hr', 'employee']`).
- **Audit Logging**: All administrative operations, access attempts, and AI-driven database actions generate immutable records in the `AuditLog` collection.

---

## 10. Cloud Deployment Architecture

```text
[ Global Internet Traffic ]
           │
           ▼
┌─────────────────────────┐
│     Vercel Edge CDN     │ ── (Serves React Static Frontend Assets)
└────────────┬────────────┘
             │
             ▼ (HTTPS / API Requests)
┌─────────────────────────┐
│  Render Cloud Host API  │ ── (Runs Express Node.js Service)
└────────────┬────────────┘
             │
 ┌───────────┼───────────┬───────────┐
 │           │           │           │
 ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
│ MongoDB │ │Cloudinary││ OpenAI  │ │ GitHub  │
│  Atlas  │ │ Storage │ │   API   │ │ Actions │
└─────────┘ └─────────┘ └─────────┘ └─────────┘
```

---

## 11. API & Real-Time Communications Architecture

- **REST API Endpoints**: Structured JSON APIs versioned under `/api/v1/` and mounted across core functional modules.
- **OpenAPI / Swagger UI**: Mounted at `/api/docs` providing interactive endpoint schemas, request parameters, and authentication buttons.
- **WebSocket Engine (`Socket.io`)**: Enables real-time notification pushes, live chat updates, and support ticket status changes.
- **System Health Monitor (`GET /health`)**: Exposes database ping time, memory consumption, CPU utilization, uptime seconds, and environment metrics.

---

## 12. DevOps & Infrastructure Architecture

```text
                       [ Git Push to Main ]
                                │
                                ▼
                       [ GitHub Actions ]
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
 [ build.yml ]           [ quality.yml ]         [ deploy.yml ]
 Build Verification      Security Audit &        Docker Container
 & Syntax Check          Dependency Audit        Build Verification
```

- **Containerization**: Multi-stage Dockerfiles for both frontend (NGINX) and backend (Node Alpine) ensuring identical environment reproduction.
- **Logging Pipeline**: Winston logger daily rotation generating `combined.log`, `error.log`, and `http.log`.
- **Global Error Handling**: Centralized `errorHandler` middleware capturing synchronous exceptions and unhandled promise rejections.

---

## 13. Scalability & Resilience Architecture

- **Stateless Backend Design**: Server instances store no session state in memory, enabling seamless horizontal auto-scaling behind load balancers.
- **MongoDB Atlas Clustering**: Multi-region replica sets with automatic failover and read-preference distribution.
- **Asset CDN Offloading**: All document uploads, images, and static slips are offloaded to Cloudinary CDN, removing storage overhead from app servers.
- **Microservices Ready**: Decoupled module architecture allows individual sub-systems (e.g. AI Service, Notification Engine) to be extracted into isolated microservices as traffic scales.

---

## 14. Architecture Best Practices Applied

1. **SOLID Principles**: Single responsibility controllers and isolated service logic modules.
2. **Reusable Component Architecture**: UI built with composite, modular React components using Tailwind CSS design tokens.
3. **Enterprise Defense-in-Depth**: Multi-layered security encompassing network CORS, rate limiters, input sanitization, JWT authorization, and audit logs.
4. **Declarative Infrastructure**: Standardized container setup via Docker Compose and declarative CI/CD via GitHub Actions.
