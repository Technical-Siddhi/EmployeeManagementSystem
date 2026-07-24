import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Users, 
  Calendar, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Building2, 
  UserCheck, 
  Zap, 
  Star,
  ChevronRight,
  LogOut,
  Play
} from 'lucide-react';
import toast from 'react-hot-toast';

const Landing = () => {
  const navigate = useNavigate();
  const [activeRoleTab, setActiveRoleTab] = useState('admin');
  const [demoClockedIn, setDemoClockedIn] = useState(false);
  const [demoTime, setDemoTime] = useState('09:00 AM');

  const handleDemoClockToggle = () => {
    if (!demoClockedIn) {
      setDemoClockedIn(true);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setDemoTime(now);
      toast.success(`Demo Clocked In at ${now}!`);
    } else {
      setDemoClockedIn(false);
      toast.success('Demo Clocked Out!');
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px]" />
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-400" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                WorkPulse
              </span>
              <span className="block text-[10px] text-indigo-400 font-semibold tracking-wider uppercase">
                Enterprise Attendance
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
            <a href="#roles" className="hover:text-indigo-400 transition-colors">Roles & Security</a>
            <a href="#demo" className="hover:text-indigo-400 transition-colors">Interactive Demo</a>
            <a href="#pricing" className="hover:text-indigo-400 transition-colors">Enterprise</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-xl group bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 group-hover:from-indigo-500 group-hover:to-pink-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300"
            >
              <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-slate-950 rounded-[10px] group-hover:bg-opacity-0">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Next-Gen Workforce & Attendance Tracking System</span>
          </motion.div>

          <motion.h1 variants={fadeIn} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Effortless Attendance & Leave Management for <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Modern Teams</span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Automate workforce tracking, streamline leave approval workflows, and gain instant real-time analytics with powerful role-based permissions.
          </motion.p>

          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center justify-center space-x-3 group transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span>Explore Admin Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#demo"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-semibold rounded-2xl flex items-center justify-center space-x-3 transition-colors"
            >
              <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span>Try Live Widget</span>
            </a>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-900 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-extrabold text-white">99.9%</div>
              <div className="text-xs text-slate-400 mt-1">Uptime Reliability</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-indigo-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Automated Workflows</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-purple-400">3 Roles</div>
              <div className="text-xs text-slate-400 mt-1">Admin, HR & Employee</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-pink-400">Instant</div>
              <div className="text-xs text-slate-400 mt-1">Clock In/Out Logging</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard Preview Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative max-w-6xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-indigo-500/20 via-slate-900/50 to-slate-950 border border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
        >
          <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900">
            <div className="h-10 bg-slate-950 px-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400">app.workpulse.com/admin/dashboard</span>
              <div className="w-16" />
            </div>

            <div className="relative group">
              <img 
                src="/images/dashboard_preview.png" 
                alt="WorkPulse Attendance Dashboard Mockup" 
                className="w-full h-auto object-cover rounded-b-2xl shadow-inner"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Full-Stack Enterprise Security</h4>
                    <p className="text-xs text-slate-400">JWT Token Session Authentication + Role Guards built-in.</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
                >
                  Log In as Demo Admin
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-24 relative z-10 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Powerful Capabilities</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Designed for Every Layer of Your Organization</h2>
            <p className="text-slate-400 text-base">All the tools required to track time, approve leave applications, and analyze attendance metrics effortlessly.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">One-Click Clock In / Out</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Fast, friction-free attendance logging. Employees can clock in and out with live time recording and location validation.
              </p>
              <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-400">
                <span>Instant Timestamp Verification</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Leave Approval Engine</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Streamlined leave application pipelines. Employees submit requests, and HR/Admins approve or reject in real time.
              </p>
              <div className="flex items-center space-x-2 text-xs font-semibold text-purple-400">
                <span>Multi-type Leave Support</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-pink-500/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-pink-600/10 border border-pink-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analytics & Visual Reports</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Interactive charts built with Recharts. Track daily attendance rates, absent trends, and exportable team reports.
              </p>
              <div className="flex items-center space-x-2 text-xs font-semibold text-pink-400">
                <span>Interactive Recharts Charts</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Roles Showcase Section */}
      <section id="roles" className="py-24 relative z-10 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Role-Based Access Control</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Customized Views for Every Role</h2>
            <p className="text-slate-400 text-base">Select a role below to explore tailored permissions and UI capabilities.</p>

            {/* Role Tabs */}
            <div className="flex justify-center p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-md mx-auto mt-8">
              <button
                onClick={() => setActiveRoleTab('admin')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  activeRoleTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                👑 Admin Role
              </button>
              <button
                onClick={() => setActiveRoleTab('hr')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  activeRoleTab === 'hr'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                👔 HR Manager
              </button>
              <button
                onClick={() => setActiveRoleTab('employee')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
                  activeRoleTab === 'employee'
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                👤 Employee
              </button>
            </div>
          </div>

          {/* Role Content Card */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 border border-slate-800 p-8 sm:p-12 relative overflow-hidden">
            {activeRoleTab === 'admin' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <Building2 className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-white">Administrator Superpowers</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Admins hold full control over the system organization structure, employee directory, leave management, and security settings.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    'Create, update, and delete employee profiles',
                    'Review & approve/reject leave requests globally',
                    'Access full workforce analytics & reports',
                    'Configure role security & protected routes'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeRoleTab === 'hr' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center space-x-3 text-purple-400">
                  <UserCheck className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-white">HR Manager Permissions</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  HR managers focus on monitoring staff attendance, handling leave approvals, and reviewing department performance reports.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    'View employee lists and status profiles',
                    'Manage & process leave approval requests',
                    'Access team attendance trends & reports',
                    'Monitor daily clock-in compliance'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeRoleTab === 'employee' && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex items-center space-x-3 text-pink-400">
                  <Clock className="w-8 h-8" />
                  <h3 className="text-2xl font-bold text-white">Employee Self-Service Portal</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Employees enjoy a streamlined portal to log daily working hours, request time off, and monitor personal attendance logs.
                </p>
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    'One-click daily Clock-In & Clock-Out',
                    'Apply for leave & track approval status',
                    'View personal attendance log history',
                    'Manage personal profile & password'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Live Widget Demo Section */}
      <section id="demo" className="py-24 relative z-10 border-t border-slate-900 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase">Interactive Experience</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Try the Live Clock-In Widget</h2>
            <p className="text-slate-400 text-base">Test the clock-in button right here to see how fast timestamps are processed.</p>
          </div>

          <div className="max-w-xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl shadow-indigo-500/10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-indigo-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Ready • Live Demo</span>
            </div>

            <div className="mb-8">
              <span className="block text-xs uppercase text-slate-400 tracking-widest font-semibold mb-2">Current Session Status</span>
              <div className="text-4xl font-extrabold text-white font-mono">{demoTime}</div>
              <div className="mt-2 text-xs font-medium text-slate-400">
                Status: {demoClockedIn ? (
                  <span className="text-emerald-400 font-semibold">Logged In & Active</span>
                ) : (
                  <span className="text-amber-400 font-semibold">Clocked Out</span>
                )}
              </div>
            </div>

            <button
              onClick={handleDemoClockToggle}
              className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center space-x-3 transition-all duration-300 ${
                demoClockedIn
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
              }`}
            >
              {demoClockedIn ? (
                <>
                  <LogOut className="w-5 h-5" />
                  <span>Clock Out Demo Session</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>Clock In Demo Session</span>
                </>
              )}
            </button>

            <p className="text-xs text-slate-400 mt-6">
              To test real database storage and role controls, log into the web application.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 relative z-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-bold text-white">WorkPulse Systems</span>
            <span className="text-slate-400">© 2026. All rights reserved.</span>
          </div>

          <div className="flex space-x-6">
            <Link to="/login" className="hover:text-white transition-colors">Sign In</Link>
            <Link to="/register" className="hover:text-white transition-colors">Register Account</Link>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
