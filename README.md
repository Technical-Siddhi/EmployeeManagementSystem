# 💼 Employee Attendance Management System

A full-stack, enterprise-ready Employee Attendance & Leave Management application built with **React**, **Node.js/Express**, **MongoDB**, and **Tailwind CSS**. Features Role-Based Access Control (RBAC), interactive analytics dashboards, live attendance tracking, and leave management workflows.

---

## 🌟 Key Features

* **🛡️ Role-Based Access Control (RBAC)**: Custom permissions and interfaces tailored for **Admin**, **HR**, and **Employee** roles.
* **⏰ Real-time Attendance Tracking**: Clock in and clock out functionality with real-time time calculations and history logs.
* **📅 Leave Management Workflow**:
  * Employees can request leave (vacation, sick, casual) and monitor application statuses.
  * HR and Admin managers can review, approve, or reject leave applications.
* **📊 Analytics & Reports Dashboard**: Visualized attendance trends, summary cards, and team statistics using **Recharts**.
* **👥 Employee Management**: Full user profile management (CRUD operations) restricted to privileged roles.
* **🔑 Secure Authentication**: JWT-based session security with bcrypt password hashing and state management via **Zustand**.
* **🎨 Modern Responsive UI**: Styled with **Tailwind CSS**, animated with **Framer Motion**, and toast notifications via **React Hot Toast**.

---

## 🏗️ Project Architecture & Structure

The repository is organized into a clean monorepo-style folder layout with dedicated `frontend/` and `backend/` directories.

```text
employee-attendance/
├── backend/                  # Node.js + Express API Backend
│   ├── middleware/           # Auth (JWT) & Role permission check middleware
│   ├── models/               # Mongoose Schemas (User, Attendance, Leave)
│   ├── routes/               # API route modules (auth, attendance, users, leaves)
│   ├── utils/                # JWT helpers and encryption utilities
│   ├── server.js             # Express app & MongoDB connection handler
│   └── package.json          # Backend dependencies
│
├── frontend/                 # React 19 Client SPA
│   ├── public/               # HTML template & static assets
│   ├── src/
│   │   ├── components/       # ProtectedRoute, Sidebar navigation
│   │   ├── pages/            # Dashboard, Employees, Attendance, Leave, Reports, Settings
│   │   ├── services/         # Axios API HTTP client
│   │   └── stores/           # Zustand global auth store
│   ├── tailwind.config.js    # Tailwind styling tokens
│   └── package.json          # Frontend dependencies
│
├── package.json              # Root workspace coordinator (Concurrent scripts)
└── README.md                 # Project documentation
```

---

## 👥 Roles & Permissions Matrix

| Feature / Action | Admin 👑 | HR 👔 | Employee 👤 |
| :--- | :---: | :---: | :---: |
| Access Dashboard Analytics | ✅ | ✅ | ✅ (Personal View) |
| Clock In / Clock Out | ✅ | ✅ | ✅ |
| Submit Leave Request | ✅ | ✅ | ✅ (Own Only) |
| Approve / Reject Leave | ✅ | ✅ | ❌ |
| View All Employees List | ✅ | ✅ | ❌ |
| Create / Edit / Delete Employees | ✅ | ❌ | ❌ |
| Access System Settings | ✅ | ✅ | ✅ |

---

## 🛠️ Tech Stack

### Frontend
* **Core**: React 19, React Router v6
* **State Management**: Zustand
* **Styling**: Tailwind CSS, PostCSS, Framer Motion
* **UI Components**: Lucide React Icons, React Hot Toast, Recharts
* **HTTP Client**: Axios

### Backend
* **Runtime**: Node.js, Express.js
* **Database**: MongoDB Atlas via Mongoose ORM
* **Security**: JSON Web Tokens (JWT), BcryptJS, CORS, Rate-Limiting

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18.x or higher recommended)
* **npm** (v9.x or higher)
* **MongoDB Atlas** database URI (or local MongoDB server)

---

### 1. Environment Configuration

Copy the sample environment file in the `backend/` folder:

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and fill in your connection details:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/employee_attendance
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

---

### 2. Dependency Installation

Install dependencies across the root, frontend, and backend packages with one command:

```bash
npm run install-all
```

---

### 3. Run Development Environment

Launch both the React frontend and Express backend concurrently:

```bash
npm run dev
```

* **Frontend**: `http://localhost:3000`
* **Backend API**: `http://localhost:5000`

---

## 📜 NPM Script Reference

| Script Command | Description |
| :--- | :--- |
| `npm run dev` | Runs frontend (`port 3000`) and backend (`port 5000`) concurrently. |
| `npm run install-all` | Installs dependencies across root, `frontend/`, and `backend/`. |
| `npm run frontend` | Starts the React frontend development server only. |
| `npm run backend` | Starts the Express backend development server only. |
| `npm run build` | Builds the production bundle of the React app into `frontend/build`. |

---

## 📡 API Endpoint Summary

### Authentication (`/api/auth`)
* `POST /api/auth/register` - Register a new user
* `POST /api/auth/login` - Authenticate user & receive JWT token
* `GET /api/auth/me` - Fetch currently authenticated user profile

### User Management (`/api/users`)
* `GET /api/users` - Fetch list of all users *(Admin / HR)*
* `GET /api/users/:id` - Fetch single user details *(Admin / HR)*
* `POST /api/users` - Create new user *(Admin only)*
* `PUT /api/users/:id` - Update user details *(Admin only)*
* `DELETE /api/users/:id` - Delete user account *(Admin only)*

### Attendance (`/api/attendance`)
* `GET /api/attendance` - Fetch attendance history
* `POST /api/attendance/clockin` - Log clock-in timestamp
* `POST /api/attendance/clockout` - Log clock-out timestamp

### Leave Management (`/api/leaves`)
* `POST /api/leaves` - Apply for leave request
* `GET /api/leaves` - Get list of leave requests *(Filter by role)*
* `PUT /api/leaves/:id/approve` - Approve leave application *(Admin / HR)*
* `PUT /api/leaves/:id/reject` - Reject leave application *(Admin / HR)*

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
