const express = require('express');
const cors = require('cors');
const dns = require('dns').setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance');
const usersRoutes = require('./routes/users');
const leavesRoutes = require('./routes/leaves');

dotenv.config();


const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes); // TODO
app.use('/api/users', usersRoutes);
app.use('/api/leaves', leavesRoutes);

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

