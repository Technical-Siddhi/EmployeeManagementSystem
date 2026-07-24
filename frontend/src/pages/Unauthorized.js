import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Unauthorized</h1>
          <p className="text-slate-600">
            Your account doesn’t have permission to access this page.
          </p>
          <div className="mt-6">
            <Link to="/" className="inline-flex px-6 py-3 rounded-xl bg-primary-500 text-white font-semibold hover:bg-primary-600 transition">
              Go to dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;

