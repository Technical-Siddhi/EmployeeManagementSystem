# AttendX Deployment Guide

## Production Environment Setup

### 1. Docker Compose (Recommended)
```bash
docker-compose up --build -d
```

### 2. Manual Cloud Deployment (Render / Vercel)
- **Backend (Render / Railway)**:
  - Set Root Directory to `backend`.
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Environment Variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`.

- **Frontend (Vercel)**:
  - Set Root Directory to `frontend`.
  - Build Command: `npm run build`
  - Output Directory: `build`
  - Environment Variables: `REACT_APP_API_URL`.
