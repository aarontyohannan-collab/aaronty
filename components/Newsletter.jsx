'use client';

import React, { useState } from 'react';
import { Send, Sparkles, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Subscribed!', 'Welcome to AETHER Insiders. Use code VIP30 for 30% off!', 'success');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-950 via-navy-850 to-indigo-950 border border-blue-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-cyan-300 border border-cyan-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              AETHER Priority Club
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get 15% Off Your First Purchase
            </h2>

            <p className="text-slate-300 text-sm sm:text-base">
              Be the first to access limited-run titanium releases, firmware drops, and exclusive seasonal member rates.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
                <Check className="w-5 h-5 text-emerald-400" />
                <span>You're on the list! Check your inbox for your 15% VIP coupon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-navy-900/90 text-white placeholder-slate-400 text-sm px-4 py-3 rounded-xl border border-navy-700 focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>Join Club</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-400">
              Zero spam. Unsubscribe anytime with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
