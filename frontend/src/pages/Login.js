import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Clock, 
  Shield, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  UserCheck, 
  Building2, 
  User 
} from 'lucide-react';
import useAuthStore from '../stores/useAuthStore';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { getDashboardRouteByRole } from '../utils/roleNavigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const userRole = useAuthStore((state) => state.role) || user?.role;

  useEffect(() => {
    if (isAuthenticated()) {
      navigate(getDashboardRouteByRole(userRole));
    }
  }, [isAuthenticated, navigate, userRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      toast.success('Welcome back!');
      const loggedUser = useAuthStore.getState().user;
      const loggedRole = useAuthStore.getState().role || loggedUser?.role;
      navigate(getDashboardRouteByRole(loggedRole));
    } else {
      toast.error(result.error || 'Login failed. Check your credentials.');
    }
  };

  const fillDemoAccount = (role) => {
    if (role === 'admin') {
      setEmail('admin@company.com');
      setPassword('admin123');
      toast.success('Filled Admin demo credentials!');
    } else if (role === 'hr') {
      setEmail('hr@company.com');
      setPassword('hr123456');
      toast.success('Filled HR demo credentials!');
    } else if (role === 'employee') {
      setEmail('employee@company.com');
      setPassword('employee123');
      toast.success('Filled Employee demo credentials!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-20 px-6 py-6 max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Clock className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <span className="text-lg font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            WorkPulse
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 my-auto py-8 px-4 sm:px-6 lg:px-8 max-w-6xl w-full mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Brand & Feature Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-8 hidden lg:block pr-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Enterprise Workforce Authentication</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Secure Access to Your <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Workforce Hub</span>
            </h1>

            <p className="text-slate-400 text-base leading-relaxed">
              Log in to manage attendance logs, approve leave requests, and view real-time department statistics with custom role permissions.
            </p>

            {/* Value Bullets */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">JWT Session Security</h4>
                  <p className="text-xs text-slate-400">Encrypted token authentication with client role validation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Live Attendance Logging</h4>
                  <p className="text-xs text-slate-400">Instant clock-in/out timestamps recorded directly to MongoDB.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Role-based Portals</h4>
                  <p className="text-xs text-slate-400">Tailored screens for Admin managers, HR team, and Employees.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Login Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 max-w-md mx-auto lg:max-w-none w-full"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/80 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-slate-400 text-xs">Enter your credentials to access your dashboard</p>
              </div>

              {/* Demo Account Quick-Fill Buttons */}
              <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400 mb-3 flex items-center justify-between">
                  <span>⚡ Quick Demo Credentials</span>
                  <span className="text-[10px] text-slate-400 font-normal">Click to fill</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => fillDemoAccount('admin')}
                    className="px-2.5 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1"
                  >
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span>Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fillDemoAccount('hr')}
                    className="px-2.5 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1"
                  >
                    <UserCheck className="w-4 h-4 text-purple-400" />
                    <span>HR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fillDemoAccount('employee')}
                    className="px-2.5 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-semibold transition-all flex flex-col items-center justify-center space-y-1"
                  >
                    <User className="w-4 h-4 text-pink-400" />
                    <span>Employee</span>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      placeholder="admin@company.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-slate-300">Password</label>
                    <span className="text-[11px] text-indigo-400 hover:underline cursor-pointer">Forgot password?</span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center space-x-2 text-xs text-slate-400 cursor-pointer">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900" 
                    />
                    <span>Keep me signed in</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
                </button>
              </form>

              {/* Google Sign-In Section */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-slate-800"></div>
                <span className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Or Continue with Google
                </span>
                <div className="flex-1 border-t border-slate-800"></div>
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    if (!credentialResponse.credential) return;
                    setLoading(true);
                    try {
                      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                      const res = await axios.post(`${API_BASE}/api/auth/google`, {
                        idToken: credentialResponse.credential,
                      });

                      if (res.data.success) {
                        localStorage.setItem('token', res.data.token);
                        useAuthStore.setState({ token: res.data.token, user: res.data.user, role: res.data.user?.role });
                        toast.success('Signed in with Google!');
                        navigate(getDashboardRouteByRole(res.data.user?.role));
                      }
                    } catch (err) {
                      const msg = err.response?.data?.message || 'Google authentication failed';
                      toast.error(msg);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  onError={() => {
                    toast.error('Google Sign-In failed');
                  }}
                  theme="filled_dark"
                  size="large"
                  text="continue_with"
                  shape="pill"
                />
              </div>

              <div className="mt-6 text-center text-xs text-slate-400">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors hover:underline"
                >
                  Register new user
                </button>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-400 border-t border-slate-900">
        © 2026 WorkPulse Systems. All rights reserved.
      </footer>

    </div>
  );
};

export default Login;
