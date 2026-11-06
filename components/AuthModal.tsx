'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DEMO_USERS } from '@/lib/mockData';
import { validateCollegeEmail } from '@/lib/utils';
import { UserRole } from '@/types';
import {
  X,
  Compass,
  CheckCircle,
  AlertCircle,
  Mail,
  Lock,
  User as UserIcon,
  Building,
  Shield,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    closeAuthModal,
    login,
    signup,
    switchUser,
  } = useApp();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(authModalMode || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [studentId, setStudentId] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage({ text: 'Please enter your college email.', type: 'error' });
      return;
    }
    const res = login(email, role);
    if (res.success) {
      setStatusMessage({ text: 'Signed in successfully!', type: 'success' });
      setTimeout(() => {
        closeAuthModal();
      }, 700);
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setStatusMessage({ text: 'Name and email are required.', type: 'error' });
      return;
    }
    const emailCheck = validateCollegeEmail(email);
    if (!emailCheck.isValid) {
      setStatusMessage({ text: emailCheck.message || 'Invalid email address.', type: 'error' });
      return;
    }

    const res = signup({
      name,
      email,
      department,
      studentId,
      role,
    });

    if (res.success) {
      setStatusMessage({ text: 'Account created! Welcome to CampusFind.', type: 'success' });
      setTimeout(() => {
        closeAuthModal();
      }, 700);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage({ text: 'Please enter your registered email.', type: 'error' });
      return;
    }
    setStatusMessage({
      text: `Password reset link sent to ${email}. Please check your inbox.`,
      type: 'success',
    });
  };

  const handleQuickDemo = (demoUser: typeof DEMO_USERS[0]) => {
    switchUser(demoUser);
    setStatusMessage({
      text: `Logged in as ${demoUser.name} (${demoUser.role})`,
      type: 'success',
    });
    setTimeout(() => {
      closeAuthModal();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-navy-950 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Compass className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="font-bold text-base font-poppins">CampusFind Portal</h3>
              <p className="text-[11px] text-sky-200">College Identity &amp; Auth</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              setMode('login');
              setStatusMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              mode === 'login'
                ? 'bg-white text-navy-950 border-b-2 border-navy-950'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setStatusMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              mode === 'signup'
                ? 'bg-white text-navy-950 border-b-2 border-navy-950'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Student / Staff Sign Up
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {statusMessage && (
            <div
              className={`p-3 rounded-xl mb-4 text-xs font-medium flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Quick Demo Logins Bar */}
          <div className="mb-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              ⚡ Instant 1-Click Role Login:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => handleQuickDemo(demo)}
                  className="p-2 rounded-xl border border-slate-300 bg-white hover:bg-navy-50 hover:border-navy-950 transition-all text-center group"
                >
                  <div className="text-base mb-0.5">
                    {demo.role === 'student' ? '🎓' : demo.role === 'admin' ? '🛡️' : '🔍'}
                  </div>
                  <div className="text-[11px] font-bold text-slate-800 group-hover:text-navy-950 capitalize">
                    {demo.role}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate">{demo.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Mode */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sarah.chen@campus.edu"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Sign In to CampusFind</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Signup Mode */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jason Brooks"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jason@campus.edu"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="CS / Mech / Arts"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student / Staff ID
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. CS-2024-819"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Account Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950 bg-white"
                >
                  <option value="student">Student</option>
                  <option value="finder">Finder / Faculty Member</option>
                  <option value="admin">Campus Safety / Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Set Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Create Campus Account</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Forgot Password Mode */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">
                Enter your official university email address and we will send a password reset verification link.
              </p>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  College Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah.chen@campus.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-navy-950"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Send Password Reset Email
              </button>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="w-full text-xs text-slate-500 hover:text-navy-950 text-center font-medium block"
              >
                Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

