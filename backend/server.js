const express = require('express');
const cors = require('cors');
const dns = require('dns').setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const usersRoutes = require('./routes/users');
const leavesRoutes = require('./routes/leaves');
const profileRoutes = require('./routes/profile');
const documentRoutes = require('./routes/documents');
const organizationRoutes = require('./routes/organization');
const performanceRoutes = require('./routes/performance');

dotenv.config();


const app = express();

// CORS configuration supporting local development and production Vercel/Render deployments
const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com')
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Fallback allow for public API client endpoints
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes); // TODO
app.use('/api/users', usersRoutes);
app.use('/api/leaves', leavesRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/performance', performanceRoutes);

// DB Connection with retry and specific DB

const connectDB = async () => {
  let retries = 5;
  while (retries) {
    try {
     console.log("Mongo URI:", process.env.MONGO_URI);

const conn = await mongoose.connect(process.env.MONGO_URI, {
  dbName: "employee_attendance",
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log(`📊 Database: employee_attendance`);
      return;
    } catch (error) {
      console.error(`❌ MongoDB Connection Error (attempt ${6-retries}):`, error.message);
      retries -= 1;
      if (retries) {
        console.log(`🔄 Retrying in 5s... (${retries} left)`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('💥 All retries failed. Backend stopped.');
        process.exit(1);
      }
    }
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

module.exports = app;

