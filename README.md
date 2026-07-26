# AttendX

**AI-Powered Enterprise Workforce Management Platform**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 🌐 Live Demo & Deployment

- **Live Platform Web App**: [https://attendx.vercel.app](https://attendx.vercel.app)
- **Backend API Endpoint**: `https://attendx-api.onrender.com`
- **Interactive Swagger Docs**: `https://attendx-api.onrender.com/api/docs`
- **System Health Check**: `https://attendx-api.onrender.com/health`

---

## 📸 Screenshots & UI Preview

```text
+-----------------------------------------------------------------------------------+
|  [AttendX] Dashboard | Employees | Attendance | Payroll | Help Desk | AI Assistant   |
+-----------------------------------------------------------------------------------+
|  +------------------------+  +------------------------+  +---------------------+  |
|  | Total Employees: 142   |  | Open Tickets: 8        |  | CSAT Rating: 4.8/5  |  |
|  +------------------------+  +------------------------+  +---------------------+  |
|                                                                                   |
|  [ AI Copilot Prompt ]: "Show employees on leave today"                           |
|  [ AttendX AI ]: 3 Employees on approved PTO (Elena, Marcus, Sarah)              |
+-----------------------------------------------------------------------------------+
```

---

## 🏗️ Architecture Diagram

```mermaid
graph TD
    A[React 18 Frontend Client] -->|HTTPS / JSON / WebSocket| B[Express.js API Gateway & Security Layer]
    B --> C[Helmet & Rate Limiter & Compression]
    B --> D[Winston & Morgan Logging System]
    B --> E[Swagger OpenAPI Specs /api/docs]
    
    B -->|Mongoose ODM| F[(MongoDB Atlas Database)]
    B -->|SDK Integration| G[Cloudinary Document Vault]
    B -->|Natural Language| H[OpenAI AI Copilot Engine]

    subgraph Security & Monitoring
        C
        D
        E
    end
```

---

## ✨ Features

- 🔐 **Role-Based Access Control (RBAC)**: Strict permission boundaries for `Admin`, `HR Manager`, and `Employee`.
- 👥 **360° Employee Lifecycle**: Profile management, salary breakdowns, document vault, and activity timelines.
- ⏱️ **Advanced Attendance & Shifts**: Real-time geolocation check-in, shift roster planning, and biometric IP validation.
- 💵 **Payroll & Compensation**: Automatic payslip generation, Form 16 withholding, and QR-verified PDF slips.
- 📊 **Performance & 360 Reviews**: Goal tracking, quarterly reviews, peer feedback, and promotion engine.
- 🎧 **Service Desk & Help Desk**: Threaded ticket management, priority SLA tracking, searchable Knowledge Base, and 1–5 Star CSAT ratings.
- 🤖 **AI HR Assistant**: Natural language database query engine, RBAC scope enforcement, and action confirmation modals.
- 🛡️ **Audit Logs & Security Alerting**: Comprehensive event auditing, retention policy execution, and security event alerts.
- ⚡ **Production Engineering**: Health checks (`GET /health`), Winston/Morgan logs, Docker containerization, and GitHub Actions CI/CD workflows.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Framer Motion, Axios, React Router v6.
- **Backend**: Node.js, Express.js, Mongoose ODM, Socket.io, Winston, Morgan, Swagger OpenAPI.
- **Database & Cloud**: MongoDB Atlas, Cloudinary Storage API.
- **DevOps & Infrastructure**: Docker, Docker Compose, GitHub Actions, NGINX, Jest, Supertest.

---

## 🧩 Modules Included

1. **Authentication & Security**
2. **Role-Based Access Control**
3. **Employee Directory & Profiles**
4. **Organization Hierarchy**
5. **Document Management Vault**
6. **Advanced Attendance & Shift Rostering**
7. **Leave Management & Approvals**
8. **Performance Management & 360 Reviews**
9. **Payroll & Compensation Management**
10. **Real-Time Notification Center**
11. **Audit Logs & Security Tracking**
12. **Help Desk & Service Desk (SLA & CSAT)**
13. **AI HR Assistant & Copilot Engine**
14. **Production Engineering & DevOps**

---

## 📁 Folder Structure

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

---

## 💻 Local Installation

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

```bash
# 1. Clone the repository
git clone https://github.com/Technical-Siddhi/EmployeeManagementSystem.git
cd EmployeeManagementSystem

# 2. Install Backend Dependencies
cd backend
npm install

# 3. Install Frontend Dependencies
cd ../frontend
npm install

# 4. Start Development Servers
# Backend (Port 5000)
cd ../backend && npm run dev

# Frontend (Port 3000)
cd ../frontend && npm start
```

---

## 🐳 Docker Setup

Run the entire AttendX platform with a single command:

```bash
# Build and launch containers in detached mode
docker-compose up --build -d

# View running container logs
docker-compose logs -f
```

- **Frontend**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Swagger Docs**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 🔐 Environment Variables

Create `.env` in `backend/` using [.env.example](./.env.example):

```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/employee_attendance
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
OPENAI_API_KEY=your_openai_api_key
```

---

## 📖 API Documentation

Interactive Swagger OpenAPI 3.0 documentation is served live at `/api/docs`.

```bash
# Health Check Endpoint
GET /health

# Swagger Documentation UI
GET /api/docs
```

---

## 🧪 Testing

```bash
# Run backend integration tests with Jest & Supertest
cd backend
npm test
```

---

## 🚀 Deployment

- **Frontend Deployment (Vercel)**: Configured for static React deployment.
- **Backend Deployment (Render)**: Express API hosted with environment secrets.
- **CI/CD Pipelines**: Automated GitHub Actions in `.github/workflows/` check builds and dependencies on push.

---

## 🔮 Future Improvements

- 📱 Mobile App (React Native iOS/Android).
- 🌐 Multi-Tenant SaaS Subscriptions.
- 🗣️ Voice-Activated AI Assistant Commands.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Siddhi Raj**  
- GitHub: [@Technical-Siddhi](https://github.com/Technical-Siddhi)  
- Enterprise Workforce Platform — **AttendX**
