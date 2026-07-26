# AttendX — Enterprise AI Workforce Management Platform 🚀

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/Technical-Siddhi/EmployeeManagementSystem)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Platform Version](https://img.shields.io/badge/version-2.5.0-purple.svg)](https://github.com/Technical-Siddhi/EmployeeManagementSystem)

AttendX is a full-stack, enterprise-grade Workforce Management & Human Resource System (HRMS) built with React.js, Node.js, Express.js, MongoDB Atlas, Socket.io, and OpenAI APIs.

---

## 🌟 Modules Implemented

1. **Authentication & RBAC**: JWT Authentication, Role-based route guards (`Admin`, `HR`, `Employee`).
2. **Employee Management & Profiles**: Glassmorphic employee directory, tabbed profile view (Salary, Docs, Activity Logs).
3. **Organization Management**: Department structure & reporting hierarchy visualization.
4. **Document Vault**: Upload & QR verification for tax slips & identity documents.
5. **Advanced Attendance & Shift Management**: Real-time check-in/out, biometric IP validation, shift roster planner.
6. **Leave Management**: Leave application pipeline, entitlement tracking, manager approval flow.
7. **Performance Management**: 360-degree reviews, goal tracking, promotion recommendations.
8. **Payroll & Compensation Management**: Monthly payslip generation, tax deduction calculator.
9. **Notification Center**: Real-time push & toast notifications.
10. **Audit Logs & Security Tracking**: Comprehensive activity tracking & security event alerts.
11. **Help Desk & Employee Service Desk**: Threaded ticket management, SLA breach tracking, KB articles, and CSAT ratings.
12. **AI HR Assistant & Copilot**: Natural language query engine, RBAC database search, and action execution modal.
13. **Production Engineering & DevOps**: Health check (`GET /health`), Winston/Morgan logging, Helmet security, Rate Limiting, Swagger Docs (`/api/docs`), Docker containerization, and GitHub Actions CI/CD pipelines.

---

## 🚀 Quick Start with Docker

```bash
# Clone Repository
git clone https://github.com/Technical-Siddhi/EmployeeManagementSystem.git
cd EmployeeManagementSystem

# Launch full stack with Docker Compose
docker-compose up --build -d
```

- **Frontend**: [http://localhost](http://localhost)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Swagger Documentation**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)
- **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

---

## 📄 Enterprise Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — System Architecture & Data Flow
- [API.md](./API.md) — REST API Endpoints Overview
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Cloud Deployment Guide (Vercel / Render / Docker)
- [ENVIRONMENT.md](./ENVIRONMENT.md) — Environment Variable Specifications
- [FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md) — Repository Directory Structure
