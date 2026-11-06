'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Copy } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function TopBanner() {
  const [copied, setCopied] = useState(false);
  const { applyCoupon } = useStore();

  const handleCopy = () => {
    navigator.clipboard?.writeText('AURA20');
    setCopied(true);
    applyCoupon('AURA20');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-navy-800 to-indigo-950 text-white text-xs sm:text-sm py-2 px-4 border-b border-blue-500/20 relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-slate-200 font-medium hidden sm:inline">
            AETHER Winter Release:
          </span>
          <span className="text-blue-200 font-semibold">
            Enjoy 20% OFF Sitewide with code
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/20 hover:bg-blue-500/30 text-cyan-300 font-mono font-bold text-xs border border-cyan-400/30 transition-all cursor-pointer"
            title="Click to copy & apply code"
          >
            AURA20
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-slate-300">
          <span className="flex items-center gap-1 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Free Global Express over $150
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">30-Day Risk-Free Trial</span>
        </div>
      </div>
    </div>
  );
}
