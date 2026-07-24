# Employee Attendance System

Full-stack modern app with React/Tailwind frontend + Express/MongoDB backend.

## Features
- Responsive modern UI (Tailwind, Recharts, animations)
- Admin/Employee login/register (JWT auth)
- Dashboard with charts/table
- Clock in/out attendance tracking
- Protected routes

## Quick Start

1. **MongoDB Atlas**:
   - Create free cluster: https://cloud.mongodb.com
   - Get connection string (Network Access IP 0.0.0.0/0)
   - Copy `backend/.env.example` → `backend/.env`
   - Fill `MONGO_URI` and `JWT_SECRET=yourlongrandomsecretkey`

2. **Backend**:
   ```
   cd backend
   npm install
   ```

3. **Frontend + Backend** (concurrent):
   ```
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## Test Mock (no DB):
- Login: admin@company.com / admin123

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- GET /api/attendance
- POST /api/attendance/clockin
- POST /api/attendance/clockout

## Production Deploy
- Frontend: Vercel/Netlify
- Backend: Render/Railway + Mongo Atlas

Enjoy! 🚀

