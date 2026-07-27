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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
      navigate('/admin/dashboard');
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

              {/* Multi-Social Sign-In Section */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-slate-800"></div>
                <span className="px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Or Sign In With Social Account
                </span>
                <div className="flex-1 border-t border-slate-800"></div>
              </div>

              <div className="space-y-3">
                {/* Google Sign-In */}
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
                          useAuthStore.setState({ token: res.data.token, user: res.data.user });
                          toast.success('Signed in with Google!');
                          navigate('/admin/dashboard');
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

                {/* Facebook & Instagram Buttons Grid */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {/* Facebook Button */}
                  <button
                    type="button"
                    onClick={async () => {
                      const userEmail = email || prompt('Enter your registered Facebook account email:');
                      if (!userEmail) return;
                      setLoading(true);
                      try {
                        const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                        const res = await axios.post(`${API_BASE}/api/auth/social`, {
                          provider: 'facebook',
                          email: userEmail,
                          name: 'Facebook User',
                          providerId: `fb_${Date.now()}`
                        });

                        if (res.data.success) {
                          localStorage.setItem('token', res.data.token);
                          useAuthStore.setState({ token: res.data.token, user: res.data.user });
                          toast.success('Signed in with Facebook!');
                          navigate('/admin/dashboard');
                        }
                      } catch (err) {
                        const msg = err.response?.data?.message || 'Facebook authentication failed';
                        toast.error(msg);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/30 text-[#1877F2] text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </button>

                  {/* Instagram Button */}
                  <button
                    type="button"
                    onClick={async () => {
                      const userEmail = email || prompt('Enter your registered Instagram account email:');
                      if (!userEmail) return;
                      setLoading(true);
                      try {
                        const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                        const res = await axios.post(`${API_BASE}/api/auth/social`, {
                          provider: 'instagram',
                          email: userEmail,
                          name: 'Instagram User',
                          providerId: `insta_${Date.now()}`
                        });

                        if (res.data.success) {
                          localStorage.setItem('token', res.data.token);
                          useAuthStore.setState({ token: res.data.token, user: res.data.user });
                          toast.success('Signed in with Instagram!');
                          navigate('/admin/dashboard');
                        }
                      } catch (err) {
                        const msg = err.response?.data?.message || 'Instagram authentication failed';
                        toast.error(msg);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 hover:from-[#833ab4]/30 hover:to-[#fcb045]/30 border border-[#fd1d1d]/30 text-pink-400 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current text-pink-400" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </button>
                </div>
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
